package controller;

import java.util.Date;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.xml.bind.DatatypeConverter;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;

import service.UserService;
import utils.ConfigurableParameters;
import utils.DESEncrypt;
import utils.FileUtil;
import entity.User;

@Path("/login")
public class LoginResource {
	private static final Log LOGGER = LogFactory.getLog(UserResource.class);
	@Autowired
	private UserService userService;
	private DefaultResourceLoader defaultResourceLoader = new DefaultResourceLoader();
	@POST
	@Produces("text/plain")
	public Response login(@QueryParam("authentication") String authentication) {

		System.out.println("LoginResource auth: " + authentication);
		byte[] decoded = DatatypeConverter.parseBase64Binary(authentication);

		String decodedString = new String(decoded);
		String username = decodedString.split(" ")[0];
		String password = DigestUtils.md5Hex(decodedString.split(" ")[1]);
		
		System.out.println("userService username:"+username);
		User loginUser = userService.findUserByName(username);
		
		if(!password.equals(loginUser.getPassword())){
			LOGGER.info("login failed: password not correct");
			return Response.status(301).entity("failed").type("text/plain").build();
		}
			
		System.out.println("username:" + username + " password:" + password);
		Date currentTime = new Date();
		long currentLongTime = currentTime.getTime();
		long expireLongTime = currentLongTime + ConfigurableParameters.TOKEN_EXPIRE_TIME;
		String tokenEncrypted = "";
		String tokenUncode = username + " "+ password +" "+ expireLongTime;
		// DigestUtils.md5Hex
		try {
			tokenEncrypted = DESEncrypt.encrypt(tokenUncode,
					ConfigurableParameters.TOKEN_SECRET_KEY);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String jsonContext = loginUser.toString();
	
		LOGGER.info("login successfully");
		return Response.status(200).entity(jsonContext).header("Access-Control-Expose-Headers", "token").header("token",tokenEncrypted).type("text/plain")
				.build();
	}

}
