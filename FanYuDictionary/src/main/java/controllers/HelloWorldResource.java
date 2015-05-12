package controllers;

import javax.ws.rs.GET;  
import javax.ws.rs.Path;  
  
import org.apache.wink.common.annotations.Workspace;  
  
@Workspace(workspaceTitle = "Workspace Title", collectionTitle = "Collection Title")  
@Path("/helloworld")  
public class HelloWorldResource {  
  
	// liubingchuan join
    @GET  
    public String getMessage() {  
        return "Hello Rest API";  
    }  
}  
