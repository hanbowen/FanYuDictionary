package controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;

import utils.FileUtil;

@Path("/user")
public class UserResource {
	
	private final static String CLASS_NAME = UserResource.class.toString();
	static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	private DefaultResourceLoader defaultResourceLoader = new DefaultResourceLoader();
	
	
	@GET
	@Produces("application/json")
	public Response getUsers() {
		
		String jsonContext = "";
		try {
			Resource resource = defaultResourceLoader.getResource("config-context/users.json");
			jsonContext = FileUtil.getInstance().readFile(resource.getFile());
		} catch (Exception e) {
			e.printStackTrace();
		}

		LOGGER.info("成功返回用户列表");
		return Response.status(200).entity(jsonContext).type("application/json").build();
	}
	
	@POST
	@Consumes("application/json")
	@Produces("text/plain")
	public Response saveUser(String body) {
		
		LOGGER.info("成功保存用户信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@PUT
	@Consumes("application/json")
	@Produces("text/plain")
	@Path("{userid}")
	public Response updateUser(@PathParam("userid") String userId , String body) {
		
		LOGGER.info("成功更新用户信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	@GET
	@Produces("application/json")
	@Path("{userid}")
	public Response getUserById(@PathParam("userid") String userId) {
		
		String jsonContext = "";
		try {
			Resource resource = defaultResourceLoader.getResource("config-context/user.json");
			jsonContext = FileUtil.getInstance().readFile(resource.getFile());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		LOGGER.info("成功返回个人用户信息");
		return Response.status(200).entity(jsonContext).type("application/json").build();
	}
	
	@DELETE
	@Produces("text/plain")
	@Path("{userid}")
	public Response delUser(@PathParam("userid") String userId) {
		
		LOGGER.info("成功删除用户信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@POST
	@Produces("text/plain")
	public Response login(@HeaderParam("Authenrization") String authenrization) {
		
		LOGGER.info("用户登录成功");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	@POST
	@Path("/logout/{userId}")
	@Produces("text/plain")
	public Response logout(@PathParam("userid") String userId) {
		
		LOGGER.info("用户退出成功");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	
	

}
