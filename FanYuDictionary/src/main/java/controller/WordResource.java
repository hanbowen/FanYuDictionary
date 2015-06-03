package controller;

import java.util.Date;
import java.util.List;

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
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.web.bind.annotation.ExceptionHandler;

import service.WordService;
import entity.Word;

@Path("/word")
public class WordResource {
	
	@Autowired
	private WordService wordService;
	private static final Log LOGGER = LogFactory.getLog(WordResource.class);
	
	
	@GET
	@Produces("application/json")
	public Response getWords(@QueryParam("search") String word, @QueryParam("match") String match, @QueryParam("domain") String domain,  @QueryParam("period") String period, @QueryParam("periodCount") String periodCount) {
		
		if(word != null && !"".equals(word)) {
			List<String> list = wordService.findByParams(word , match, domain);
			LOGGER.info("成功返回词条列表");
			return Response.status(200).entity(wordService.listToJson(list)).type("application/json").build();
		}
		
		if(period != null && !"".equals(period) && periodCount != null && !"".equals(periodCount)) {
			List<Word> list = wordService.findByDate(period, periodCount);
			LOGGER.info("成功返回新词条列表");
			return Response.status(200).entity(wordService.listToJson(list)).type("application/json").build();
		}
		
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@POST
	@Produces("text/plain")
	public Response saveWord(String wordJson) {
		
		Word word = wordService.jsonToEntity(wordJson, Word.class);
		Date date = new Date();
		word.setCreateDateTime(date.getTime());;
		word.setLastEditDateTime(date.getTime());;;
		wordService.save(word);
		LOGGER.info("成功保存词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@PUT
	@Produces("text/plain")
	@RequiresRoles("Editor")
	@ExceptionHandler({UnauthorizedException.class})
	@Path("{wordId}/publish")
	public Response publishWord(@PathParam("wordId") String wordId) {
//		wordService.updateById(wordId, body);
		LOGGER.info("成功更新词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	@PUT
	@Produces("text/plain")
	@Path("{wordId}")
	public Response updateWord(@PathParam("wordId") String wordId , String body) {
		wordService.updateById(wordId, body);
		LOGGER.info("成功更新词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	@GET
	@Produces("application/json")
	@Path("{wordName}")
	public Response getWordByName(@PathParam("wordName") String wordName) {
		
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
		
		LOGGER.info("成功删除词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	
	
	

}
