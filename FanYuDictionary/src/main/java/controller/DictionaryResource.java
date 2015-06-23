package controller;

import java.util.Date;
import java.util.List;

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
import service.WordService;
import entity.Dictionary;

@Path("/dictionary")
public class DictionaryResource {

	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
	private WordService wordService;
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
		
		String displayName = dictionary.getDisplayName();
		Dictionary persistedDic = dictionaryService.findByDisplayName(displayName);
		// 判断是否有重复的Dictionary displayName
		if(persistedDic != null && persistedDic.getId() != null && !"".equals(persistedDic.getId())) {
			return Response.status(409).entity("数据库中已经存在该displayName，不允许重复保存").type("text/plain").build();
		}
		
		Date date = new Date();
		dictionary.setCreateDateTime(date.getTime());
		dictionary.setStatus("active");
		dictionaryService.save(dictionary);
		LOGGER.info("成功保存字典信息");
		return Response.status(200).entity("success").type("text/plain")
				.build();
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
		if( dictionary != null && "梵汉大字典".equals(dictionary.getDisplayName()) ) {
			return Response.status(403).entity("梵汉大字典不允许删除").type("text/plain").build();
		}
		
		dictionaryService.removeById(dictionaryId);
		LOGGER.info("成功删除词典信息");
		wordService.removeByDictionaryId(dictionaryId);
		LOGGER.info("成功删除字典所关联的词条");
		
		return Response.status(200).entity("success").type("text/plain").build();
	}

}
