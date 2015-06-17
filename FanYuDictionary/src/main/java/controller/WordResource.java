package controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;

import service.DictionaryService;
import service.WordService;
import utils.Context;
import utils.Pagination;
import entity.Dictionary;
import entity.Word;

@Path("/word")
public class WordResource {
	
	@Autowired
	private WordService wordService;
	@Autowired
	private DictionaryService dictionaryService;
	private static final Log LOGGER = LogFactory.getLog(WordResource.class);
	
	
	@GET
	public Response getWords(@QueryParam("search") String word, @QueryParam("match") String match, @QueryParam("domain") String domain,  @QueryParam("period") String period, @QueryParam("periodCount") String periodCount, @QueryParam("userId") String userId, @QueryParam("page") String page , @QueryParam("pageSize") String pageSize) {
		
		// 按照名字查询时不需要分页
		if(word == null || "".equals(word)) {
			if(page == null || "".equals(page) || "undefined".equals(page)) {
				return Response.status(412).entity("HTTP HEADER 中的page参数不能为空").type("text/plain").build();
			}
			
			if(pageSize == null || "".equals(pageSize) || "undefined".equals(pageSize)) {
				return Response.status(412).entity("HTTP HEADER 中的pageSize参数不能为空").type("text/plain").build();
			}
			
			if( Integer.valueOf(page) <=0 || Integer.valueOf(pageSize) <= 0) {
				return Response.status(412).entity("HTTP HEADER 中的page 和 pageSize 必须大于0").type("text/plain").build();
			}
		} else {
			
			if(match == null || "".equals(match)) {
				return Response.status(412).entity("match 参数不允许为空").type("text/plain").build();
			}
			
			if(domain == null || "".equals(domain)) {
				return Response.status(412).entity("domain 参数不允许为空").type("text/plain").build();
			}
			
			// 判断match参数是否超出规定的范围， 规定的范围是 shou/zhong/wei/jingque
			if( !Arrays.asList(enumeration.MatchProperty.getValues()).contains(match) ) {
				return Response.status(412).entity("match参数已超出规定的范围，请在以下查询范围中选择一种查询方式" + Arrays.asList(enumeration.MatchProperty.getShows())).type("text/plain").build();
			}
			
			// 判断domain参数是否超出规定的范围， 规定的范围是 duiyingci/bianxing/liju/danci/quanwen
			if( !Arrays.asList(enumeration.DomainProperty.getValues()).contains(domain) ) {
				return Response.status(412).entity("domain参数已超出规定的范围，请在以下查询范围中选择一种查询方式" + Arrays.asList(enumeration.DomainProperty.getShows())).type("text/plain").build();
			}
			
			List<String> list = wordService.findByParams(word , match, domain);
			LOGGER.info("成功返回词条列表");
			return Response.status(200).entity(wordService.listToJson(list)).type("application/json").build();
		}
		
		
		Pagination<Word> pagination = null;
		// 总页数
		int pageCount = 0;
		// 新词条
		if(period != null && !"".equals(period) && periodCount != null && !"".equals(periodCount)) {
			// 想办法加缓存   ***********************
			pagination = new Pagination<Word>(0 , Integer.valueOf(pageSize) ,wordService.queryCount(period, periodCount));
			pageCount = pagination.getTotalPage();
			pagination = wordService.findByDate(period, periodCount, Integer.valueOf(page), Integer.valueOf(pageSize));
			LOGGER.info("成功返回新词条列表");
			return Response.status(200).header("Access-Control-Expose-Headers", "pageCount").header("pageCount", pageCount).header("Access-Control-Expose-Headers", "page").header("page", page).header("Access-Control-Expose-Headers", "pageSize").header("pageSize", pageSize).entity(wordService.listToJson(pagination.getDatas())).type("application/json").build();
		}
		
		// 我的词条
		if(userId != null && !"".equals(userId)) {
			pagination = new Pagination<Word>(0, Integer.valueOf(pageSize) , wordService.queryCount(userId));
			pageCount = pagination.getTotalPage();
			pagination = wordService.findWordByUserId(userId, Integer.valueOf(page) , Integer.valueOf(pageSize));
			LOGGER.info("成功按照用户ID返回词条");
			return Response.status(200).header("Access-Control-Expose-Headers", "pageCount").header("pageCount", pageCount).header("Access-Control-Expose-Headers", "page").header("Access-Control-Expose-Headers", "pageSize").header("page", page).header("pageSize", pageSize).entity(wordService.listToJson(pagination.getDatas())).type("application/json").build();
		}
		
		return Response.status(412).entity("您输入的参数不合法").type("text/plain").build();
	}
	
	
	@POST
	@Produces("text/plain")
	public Response saveWord(String wordJson) {
		
		Word word = wordService.jsonToEntity(wordJson, Word.class);
		Date date = new Date();
		word.setCreateDateTime(date.getTime());;
		word.setLastEditDateTime(date.getTime());;;
		word.setStatus("created");
		wordService.save(word);
		LOGGER.info("成功保存词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@PUT
	@RequiresRoles("Admin")
	@ExceptionHandler({UnauthorizedException.class})
	@Path("{wordId}/publish")
	public Response publishWord(@PathParam("wordId") String wordId) {
//		wordService.updateById(wordId, body);
		if(wordId == null || "".equals(wordId)) {
			return Response.status(412).entity("请传入wordId").type("text/plain").build();
		}
		
		Word word = wordService.findWordById(wordId);
		Word publishedWord = wordService.findWordByMultipleParam(word.getWord(), word.getDictionary(), "published");
		if(publishedWord != null && !"".equals(publishedWord.getId())) {
			return Response.status(200).entity("该词条已被发布，不允许再次发布").type("text/plain").build();
		}
		
		word.setAuthor(new HashMap<String , Object>());
		word.setId("");
		word.setStatus("published");
		wordService.save(word);
		
		wordService.publishWord(wordId);
		LOGGER.info("成功发布词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@PUT
	@Produces("text/plain")
	@Path("{wordId}")
	@RequiresRoles(value = { "Editor", "Admin" }, logical = Logical.OR)
	public Response updateWord(@PathParam("wordId") String wordId , String body) {
		if(wordId == null || "".equals(wordId)) {
			return Response.status(412).entity("请传入wordId").type("text/plain").build();
		}
		Word word = wordService.jsonToEntity(body, Word.class);
		word.setStatus("updated");
		body = wordService.entityToJson(word);
		wordService.updateById(wordId, body);
		LOGGER.info("成功更新词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	@GET
	@Path("{wordName}")
	public Response getWordByName(@PathParam("wordName") String wordName) {
		
		if( wordName == null || "".equals(wordName) ) {
			return Response.status(200).entity("").type("text/plain").build();
		}
		List<Word> list = wordService.findWordByName(wordName);
		
		LOGGER.info("成功返回词条详情");
		return Response.status(200).entity(wordService.listToJson(list)).type("application/json").build();
	}
	
	@DELETE
	@Consumes("application/json")
	public Response delWords(String body) {
		
		
		LOGGER.info("成功批量删除词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}

	@DELETE
	@Path("{wordId}")
	public Response delWord(@PathParam("wordId") String wordId) {
		if(wordId == null || "".equals(wordId)) {
			Response.status(412).entity("请输入正确的wordId").type("text/plain").build();
		}
		wordService.removeById(wordId);
		LOGGER.info("成功删除词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	@GET
	@Path("import/{dictionaryName}")
	public Response inport(@PathParam("dictionaryName") String dictionaryName) {
		if(dictionaryName == null || "".equals(dictionaryName)) {
			return Response.status(404).entity("字典名称不允许为空").type("text/plain").build(); 
		}
		
		Dictionary dictionary = dictionaryService.findByDisplayName(dictionaryName);
		if( dictionary == null || "".equals(dictionary.getId()) ) {
			return Response.status(404).entity("字典名称不存在,请核对字典名称后再导入").type("text/plain").build(); 
		}
		
		Map<String , Object> dicMap = new HashMap<String , Object>();
 		dicMap.put("id", dictionary.getId());
 		dicMap.put("dicGroup", dictionary.getDicGroup());
 		dicMap.put("displayName", dictionary.getDisplayName());
 		dicMap.put("status", dictionary.getStatus());
 		dicMap.put("createDateTime", dictionary.getCreateDateTime());
 		List<Word> jsonList = new ArrayList<Word>();
 		Map<String , JSONObject> map = Context.getInstance().getInport();
		
		for(Map.Entry<String, JSONObject> entry : map.entrySet()) {
			JSONObject jsonObject = entry.getValue();
			jsonObject.put("dictionary", dicMap);
			Word word = wordService.jsonToEntity(jsonObject.toString(), Word.class);
			jsonList.add(word);
		}
		
		wordService.insertAll(jsonList);;
		return Response.status(200).entity("成功导入" + jsonList.size() + "条数据").type("text/plain").build(); 
	}

}