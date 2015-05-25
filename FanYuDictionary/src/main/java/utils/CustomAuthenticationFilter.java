package utils;

import java.util.Date;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authz.AuthorizationFilter;


public class CustomAuthenticationFilter extends AuthorizationFilter{

	@Override
	protected boolean isAccessAllowed(ServletRequest request,
			ServletResponse response, Object mappedValue) throws Exception {
				HttpServletResponse res = (HttpServletResponse) response;  
				String tokenString=request.getParameter("token");
				System.out.println("CustomAuthenticationFilter token:"+tokenString);
				String decodedToken = DESEncrypt.decrypt(tokenString, ConfigurableParameters.TOKEN_SECRET_KEY);
				System.out.println("CustomAuthenticationFilter decode token:"+decodedToken);
				String username = decodedToken.split(" ")[0];
				String password = decodedToken.split(" ")[1];
				long expireTime = Long.parseLong(decodedToken.split(" ")[2]);
				
				long currentTime = new Date().getTime();
				System.out.println("CustomAuthenticationFilter currentTime:"+currentTime+" expireTime:"+expireTime);
				if(currentTime > expireTime ){
					return false;
				}else{
					String newToken = username+" "+password+" "+ (expireTime+ConfigurableParameters.TOKEN_EXPIRE_TIME);
					res.setHeader("token", DESEncrypt.encrypt(newToken, ConfigurableParameters.TOKEN_SECRET_KEY));
					res.setHeader("Access-Control-Expose-Headers", "token");
					System.out.println("CustomAuthenticationFilter NewToken:"+newToken);

				}
				
				System.out.println("CustomAuthenticationFilter username:"+username+" password:"+password);
				
				UsernamePasswordToken token = new UsernamePasswordToken( username, password );
				
				Subject currentUser = SecurityUtils.getSubject();
				
				System.out.println("CustomAuthenticationFilter Subject created");
				try {
				    currentUser.login(token);
				} catch ( UnknownAccountException uae ) { 
					return false;
				} catch ( IncorrectCredentialsException ice ) { 
					return false;
				} catch ( LockedAccountException lae ) { 
					return false;
				} catch ( ExcessiveAttemptsException eae ) { 
					return false;
				} 
				
				
				if ( currentUser.hasRole( "reader" ) ) {
				    System.out.println("This is reader!");
				} else {
					System.out.println("no reader!");
				}
				System.out.println("CustomAuthenticationFilter return true.");
				return true;
	}

}
