package controller;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;

import service.UserService;
import utils.Pagination;
import entity.User;

@Path("/user")
public class UserResource {
	
	private static final Log LOGGER = LogFactory.getLog(UserResource.class);
	@Autowired  
    private UserService userService;
	
	@GET
	@Produces("application/json")
	@RequiresRoles("Admin")
	@ExceptionHandler({UnauthorizedException.class})  
	public Response getUsers() {
		
		//if(***)   // 返回总页数
		Pagination<User> pagination = new Pagination<User>(userService.queryCount());
		int totalPages = pagination.getTotalPage();
		
		// else 按 pageNo, pageSize查询， 也可以只按pageNo查询
//		Pagination<User> page = userService.getPageUser(pageNo, pageSize)
		Pagination<User> page = userService.getPageUser(1, 20);
		LOGGER.info("return userlist successfully");
//		return Response.status(200).entity(userService.list2Json(page.getDatas())).type("application/json").build();
//		String json = "{\"totalPages\":" +totalPages +"}"; 
		return Response.status(200).header("totalPages", totalPages).entity(userService.listToJson(page.getDatas())).type("application/json").build();
	}
	
	@POST
	@Produces("text/plain")
	public Response saveUser(String userJson) {
		
		User user = userService.jsonToEntity(userJson, User.class);
		// md5 编码 password
		user.setPassword(DigestUtils.md5Hex(user.getPassword()));
		userService.save(user);
		LOGGER.info("save user successfully");
		return Response.status(200).entity(user.toString()).type("text/plain").build();
		
	}
	
	@PUT
	@Produces("text/plain")
	@Path("{userid}")
	public Response updateUser(@PathParam("userid") String userId , String body) {
		userService.updateById(userId, body);
		LOGGER.info("update user successfully");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	@GET
	@Produces("application/json")
	@Path("{username}")
	public Response getUserByName(@PathParam("username") String username) {
		
		User user = userService.findUserByName(username);
		List<User> list = new ArrayList<User>();
		list.add(user);
		LOGGER.info("return userinfo successfully");
		return Response.status(200).entity(userService.listToJson(list)).type("application/json").build();
	}
	
	@DELETE
	@Produces("text/plain")
	@Path("{userid}")
	public Response delUser(@PathParam("userid") String userId) {
		userService.removeById(userId);
		LOGGER.info("delete userinfo succesfully");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	
	
	

}
