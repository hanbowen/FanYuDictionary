package utils;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import service.UserService;
import entity.User;

public class MongoRealm extends AuthorizingRealm{

	@Autowired
	private UserService userService;
	
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
		System.out.println("doGetAuthorizationInfo");
		String username = (String) principals.getPrimaryPrincipal();
		System.out.println(username);
		User currentUser = userService.findUserByName(username);
		
		//search user db collection by username and get roles;
		info.addRole(currentUser.getRole());
		
		return info;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {
		System.out.println("doGetAuthenticationInfo");
		UsernamePasswordToken authToken=(UsernamePasswordToken) token;
//		authToken.setRememberMe(true);
		return new SimpleAuthenticationInfo(authToken.getUsername(),authToken.getPassword(),getName());
	}

}
