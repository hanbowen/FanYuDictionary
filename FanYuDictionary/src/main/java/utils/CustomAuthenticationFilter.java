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
		
				//从URL中获取token
				String tokenString=request.getParameter("token");
				System.out.println("CustomAuthenticationFilter token:"+tokenString);
				
				//解密token
				String decodedToken = DESEncrypt.decrypt(tokenString, ConfigurableParameters.TOKEN_SECRET_KEY);
				System.out.println("CustomAuthenticationFilter decode token:"+decodedToken);
				if(decodedToken == null){
					return false;
				}
				
				//剥离token信息
				String username = decodedToken.split(" ")[0];
				String password = decodedToken.split(" ")[1];
				long expireTime = Long.parseLong(decodedToken.split(" ")[2]);
				long currentTime = new Date().getTime();
				
				//验证token是否过期
				System.out.println("CustomAuthenticationFilter currentTime:"+currentTime+" expireTime:"+expireTime);
				if(currentTime > expireTime ){
					return false;
				}else{
					//没过期则演唱token有效时间
					HttpServletResponse res = (HttpServletResponse) response;  
					String newToken = username+" "+password+" "+ (currentTime+ConfigurableParameters.TOKEN_EXPIRE_TIME);
					res.setHeader("token", DESEncrypt.encrypt(newToken, ConfigurableParameters.TOKEN_SECRET_KEY));
					res.setHeader("Access-Control-Expose-Headers", "token");
					System.out.println("CustomAuthenticationFilter NewToken:"+newToken);
				}
				
				//执行shiro登录
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
				
				System.out.println("CustomAuthenticationFilter return true.");
				return true;
	}

}
