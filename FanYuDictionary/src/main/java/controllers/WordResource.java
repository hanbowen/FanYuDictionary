package controllers;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;

import Utils.FileUtil;

@Path("/word")
public class WordResource {
	
	private final static String CLASS_NAME = WordResource.class.toString();
	static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	private DefaultResourceLoader defaultResourceLoader = new DefaultResourceLoader();
	
	
	@GET
	@Produces("application/json")
	public Response getWords(@QueryParam("search") String search, @QueryParam("match") String match, @QueryParam("domain") String domain ) {
		
		String jsonContext = "";
		try {
			Resource resource = defaultResourceLoader.getResource("config-context/words.json");
			jsonContext = FileUtil.getInstance().readFile(resource.getFile());
		} catch (Exception e) {
			e.printStackTrace();
		}

		LOGGER.info("成功返回词条列表");
		return Response.status(200).entity(jsonContext).type("application/json").build();
	}
	
	@POST
	@Consumes("application/json")
	@Produces("text/plain")
	public Response saveWord(String body) {
		
		LOGGER.info("成功保存词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@PUT
	@Consumes("application/json")
	@Produces("text/plain")
	@Path("{wordId}")
	public Response updateWord(@PathParam("wordId") String wordId , String body) {
		
		LOGGER.info("成功更新词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	@GET
	@Consumes("application/json")
	@Produces("application/json")
	@Path("{wordName}")
	public Response getWordByName(@PathParam("wordName") String wordName , String body) {
		
		String jsonContext = "";
		try {
			Resource resource = defaultResourceLoader.getResource("config-context/word.json");
			jsonContext = FileUtil.getInstance().readFile(resource.getFile());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		LOGGER.info("成功返回词条详情");
		return Response.status(200).entity(jsonContext).type("application/json").build();
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
