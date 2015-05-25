package controller;

import javax.ws.rs.Consumes;
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
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;

import utils.FileUtil;

@Path("/dictionary")
public class DictionaryResource {
	
	private static final Log LOGGER = LogFactory.getLog(DictionaryResource.class);
	private DefaultResourceLoader defaultResourceLoader = new DefaultResourceLoader();
	
	
	@GET
	@Produces("application/json")
	@RequiresRoles(value={"Reader","Admin"},logical=Logical.OR)
	public Response getDictionaries() {
		
		String jsonContext = "";
		try {
			Resource resource = defaultResourceLoader.getResource("config-context/dictionaries.json");
			jsonContext = FileUtil.getInstance().readFile(resource.getFile());
		} catch (Exception e) {
			e.printStackTrace();
		}

		LOGGER.info("成功返回字典列表");
		return Response.status(200).entity(jsonContext).type("application/json").build();
	}
	
	@POST
	@Consumes("application/json")
	@Produces("text/plain")
	public Response saveDictionary(String body) {
		
		LOGGER.info("成功保存字典信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@PUT
	@Consumes("application/json")
	@Produces("text/plain")
	@Path("{dictionaryId}")
	public Response updateDictionary(@PathParam("dictionaryId") String dictionaryId , String body) {
		
		LOGGER.info("成功更新词典信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	@DELETE
	@Produces("text/plain")
	@Path("{dictionaryId}")
	public Response delDictionary(@PathParam("dictionaryId") String dictionaryId) {
		
		LOGGER.info("成功删除词典信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	

}
