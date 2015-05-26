package exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.apache.shiro.authz.UnauthorizedException;


@Provider
public class UnauthorizedExceptionMapper implements ExceptionMapper<UnauthorizedException> {
	@Override
	public Response toResponse(
			UnauthorizedException exception) {
		System.err.println("UnauthorizedExceptionMapper Occured.");
		return Response.status(403).
	            entity(exception.getMessage()).
	            type("text/plain").
	            build();
	}
}
