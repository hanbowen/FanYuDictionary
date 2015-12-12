package controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

import service.DictionaryService;
import service.UserService;
import service.WordService;
import entity.Dictionary;
import entity.User;

@Path("/dictionary")
public class DictionaryResource {

	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
	private WordService wordService;
	@Autowired
	private UserService userService;
	private static final Log LOGGER = LogFactory
			.getLog(DictionaryResource.class);

	@GET
	@Produces("application/json")
	//@RequiresRoles(value = { "Reader", "Admin" }, logical = Logical.OR)
	public Response getDictionaries() {
		List<Dictionary> dictionaryList = dictionaryService.findAll();

		LOGGER.info("成功返回字典列表");
		return Response.status(200).entity(dictionaryService.listToJson(dictionaryList))
				.type("application/json").build();
	}

	@POST
	@Produces("text/plain")
	public Response saveDictionary(String dictionaryJson) {
		Dictionary dictionary = dictionaryService.jsonToEntity(dictionaryJson,
				Dictionary.class);
		
		if (dictionary == null) {
			return Response.status(404).entity("HTTP Body 中传入的数据有误").type("text/plain").build();
		}
		String displayName = dictionary.getDisplayName();
		Dictionary persistedDic1 = dictionaryService.findByDisplayName(displayName);
		// 判断是否有重复的Dictionary displayName
		if(persistedDic1 != null && persistedDic1.getId() != null && !"".equals(persistedDic1.getId())) {
			return Response.status(200).entity("error-displayName").type("text/plain").build();
		}
		
		String shortName = dictionary.getShortName();
		Dictionary persistedDic2 = dictionaryService.findByShortName(shortName);
		// 判断是否有重复的Dictionary shortName
		if(persistedDic2 != null && persistedDic2.getId() != null && !"".equals(persistedDic2.getId())) {
			return Response.status(200).entity("error-shortName").type("text/plain").build();
		}
		
		
		Date date = new Date();
		dictionary.setCreateDateTime(date.getTime());
		dictionary.setStatus("active");
		dictionaryService.save(dictionary);
		LOGGER.info("成功保存字典信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}

	@PUT
	//@Consumes("application/json")
	@Produces("text/plain")
	@Path("{dictionaryId}")
	public Response updateDictionary(
			@PathParam("dictionaryId") String dictionaryId, String body) {
		if( dictionaryId == null || "".equals(dictionaryId) ) {
			return Response.status(412).entity("dictionaryId 不允许为空").type("text/plain").build();
		}
		if( body == null || "".equals(body) ) {
			return Response.status(412).entity("HTTP BODY 不允许为空").type("text/plain").build();
		}
		dictionaryService.updateById(dictionaryId, body);
		LOGGER.info("成功更新词典信息");
		return Response.status(200).entity("success").type("text/plain")
				.build();
	}

	@DELETE
	@Produces("text/plain")
	@Path("{dictionaryId}")
	public Response delDictionary(@PathParam("dictionaryId") String dictionaryId) {
		if( dictionaryId == null || "".equals(dictionaryId) ) {
			return Response.status(412).entity("dictionaryId 不允许为空").type("text/plain").build();
		}
		
		Dictionary dictionary = dictionaryService.findById(dictionaryId);
		if( dictionary != null && "梵汉词汇表".equals(dictionary.getDisplayName()) ) {
			return Response.status(200).entity("error").type("text/plain").build();
		}
		
		dictionaryService.removeById(dictionaryId);
		LOGGER.info("成功删除词典信息");
		wordService.removeByDictionaryId(dictionaryId);
		LOGGER.info("成功删除字典所关联的词条");
		List<User> users = userService.findUsersByAllowedDictionary(dictionaryId);
		if (users != null && users.size() != 0) {
			for (User user: users) {
				List<Map<String, String>> allowedDictionaries = user.getAllowedDictionaries();
				for(Map<String , String> map: allowedDictionaries) {
					if (map.get("id").equals(dictionaryId)) {
						allowedDictionaries.remove(map);
						break;
					}
				}
				userService.updateById(user.getId(), userService.entityToJson(user));
			}
		}
		
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@DELETE
	@Produces("text/plain")
	@Path("delwords/{dictionaryId}")
	/**
	 * 清空词条
	 * @param dictionaryId
	 * @return
	 */
	public Response delDictionaryWords(@PathParam("dictionaryId") String dictionaryId) {
		if( dictionaryId == null || "".equals(dictionaryId) ) {
			return Response.status(412).entity("dictionaryId 不允许为空").type("text/plain").build();
		}
		wordService.removeByDictionaryId(dictionaryId);
		LOGGER.info("成功删除字典所关联的词条");
		
		return Response.status(200).entity("success").type("text/plain").build();
	}

}
