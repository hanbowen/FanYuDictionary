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

public class MongoRealm extends AuthorizingRealm{

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
		System.out.println("doGetAuthorizationInfo");
		String username = (String) principals.getPrimaryPrincipal();
		System.out.println(username);
		//search user db collection by username and get roles;
		if(username.equals("hanbowen")){
			info.addRole("Admin");
		}
		else
			info.addRole("Reader");
		return info;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {
		System.out.println("doGetAuthenticationInfo");
		UsernamePasswordToken authToken=(UsernamePasswordToken) token;
		return new SimpleAuthenticationInfo(authToken.getUsername(),authToken.getPassword(),getName());
	}

}
