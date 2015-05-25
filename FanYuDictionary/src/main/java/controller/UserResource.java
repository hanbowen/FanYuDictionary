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
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;

import service.UserService;
import utils.FileUtil;

@Path("/user")
public class UserResource {
	
	private static final Log LOGGER = LogFactory.getLog(UserResource.class);
	private DefaultResourceLoader defaultResourceLoader = new DefaultResourceLoader();
	@Autowired  
    UserService userService;
	
	@GET
	@Produces("application/json")
	@RequiresRoles("Admin")
	public Response getUsers() {
		
		String jsonContext = "";
		try {
			Resource resource = defaultResourceLoader.getResource("config-context/users.json");
			jsonContext = FileUtil.getInstance().readFile(resource.getFile());
		} catch (Exception e) {
			e.printStackTrace();
		}

		LOGGER.info("return userlist successfully");
		return Response.status(200).entity(jsonContext).type("application/json").build();
	}
	
	@POST
	@Consumes("application/json")
	@Produces("text/plain")
	public Response saveUser(String body) {
		
		LOGGER.info("save user successfully");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@PUT
	@Consumes("application/json")
	@Produces("text/plain")
	@Path("{userid}")
	public Response updateUser(@PathParam("userid") String userId , String body) {
		LOGGER.info("update user successfully");
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
		
		LOGGER.info("return userinfo successfully");
		return Response.status(200).entity(jsonContext).type("application/json").build();
	}
	
	@DELETE
	@Produces("text/plain")
	@Path("{userid}")
	public Response delUser(@PathParam("userid") String userId) {
		
		LOGGER.info("delete userinfo succesfully");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
/*	@POST
	@Produces("text/plain")
	@Path("/login")
	public Response login(@HeaderParam("Authenrization") String authenrization) {
		
		LOGGER.info("login successfully");
		return Response.status(200).entity("success").type("text/plain").build();
	}*/
	
	
/*	@POST
	@Path("/logout/{userId}")
	@Produces("text/plain")
	public Response logout(@PathParam("userid") String userId) {
		
		LOGGER.info("logout successfully");
		return Response.status(200).entity("success").type("text/plain").build();
	}*/
	
	
	
	
	

}
