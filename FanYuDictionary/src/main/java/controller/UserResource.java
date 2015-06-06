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
import javax.ws.rs.QueryParam;
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
import entity.Word;

@Path("/user")
public class UserResource {
	
	private static final Log LOGGER = LogFactory.getLog(UserResource.class);
	@Autowired  
    private UserService userService;
	
	
	/**
	 * 返回用户列表
	 * @return
	 */
	@GET
	@Produces("application/json")
	@RequiresRoles("Admin")
	@ExceptionHandler({UnauthorizedException.class})  
	public Response getUsers(@QueryParam("page") String page , @QueryParam("pageSize") String pageSize) {
		
		
		if(page == null || "".equals(page) || "undefined".equals(page)) {
			return Response.status(412).entity("HTTP HEADER 中的page参数不能为空").type("text/plain").build();
		}
		
		if(pageSize == null || "".equals(pageSize) || "undefined".equals(pageSize)) {
			return Response.status(412).entity("HTTP HEADER 中的pageSize参数不能为空").type("text/plain").build();
		}
		
		if( Integer.valueOf(page) <=0 || Integer.valueOf(pageSize) <= 0) {
			return Response.status(412).entity("HTTP HEADER 中的page 和 pageSize 必须大于0").type("text/plain").build();
		}
		
		// 总页数
		int pageCount = 0;
		
		Pagination<User> pagination = new Pagination<User>(0, Integer.valueOf(pageSize) , userService.queryCount());
		pageCount = pagination.getTotalPage();
		pagination = userService.getPageUser(Integer.valueOf(page), Integer.valueOf(pageSize));
		
		LOGGER.info("成功返回用户列表");
		return Response.status(200).header("pageCount", pageCount).entity(userService.listToJson(pagination.getDatas())).type("application/json").build();
	}
	
	
	/**
	 * Admin 注册新用户
	 * @param userJson
	 * @return
	 */
	@POST
	@Produces("text/plain")
	public Response saveUser(String userJson) {
		if(userJson == null || "".equals(userJson)) {
			return Response.status(412).entity("请输入要保存的user对象").type("text/plain").build();
		}
		User user = userService.jsonToEntity(userJson, User.class);
		// md5 编码 password
		user.setPassword(DigestUtils.md5Hex(user.getPassword()));
		userService.save(user);
		LOGGER.info("save user successfully");
		return Response.status(200).entity(user.toString()).type("text/plain").build();
		
	}
	
	/**
	 * 整体更新用户对象
	 * @param userId
	 * @param body
	 * @return
	 */
	@PUT
	@Produces("text/plain")
	@Path("{userid}")
	public Response updateUser(@PathParam("userid") String userId , String body) {
		if( userId == null || "".equals(userId) ) {
			return Response.status(412).entity("请输入userId").type("text/plain").build();
		}
		if( body == null || "".equals(body) ) {
			return Response.status(412).entity("请在HTTP BODY中输入要更新的对象").type("text/plain").build();
		}
		
		User user = userService.jsonToEntity(body, User.class);
		// md5 编码 password
		user.setPassword(DigestUtils.md5Hex(user.getPassword()));
		body = userService.entityToJson(user);
		userService.updateById(userId, body);
		LOGGER.info("update user successfully");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	/**
	 * 根据用户名字查询用户信息
	 * @param username
	 * @return
	 */
	@GET
	@Produces("application/json")
	@Path("{username}")
	public Response getUserByName(@PathParam("username") String username) {
		if( username == null || "".equals(username) ) {
			return Response.status(412).entity("请输入username").type("text/plain").build();
		}
		User user = userService.findUserByName(username);
		List<User> list = new ArrayList<User>();
		list.add(user);
		LOGGER.info("return userinfo successfully");
		return Response.status(200).entity(userService.listToJson(list)).type("application/json").build();
	}
	
	
	/**
	 * 根据用户ID删除用户信息
	 * @param userId
	 * @return
	 */
	@DELETE
	@Produces("text/plain")
	@Path("{userid}")
	public Response delUser(@PathParam("userid") String userId) {
		if(userId == null || "".equals(userId)) {
			return Response.status(412).entity("请输入userId").type("text/plain").build();
		}
		userService.removeById(userId);
		LOGGER.info("delete userinfo succesfully");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	
	
	

}
