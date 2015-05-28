package entity;

import java.util.Map;

   
   
public class User extends Entity {  
   
      
    private String username;  
    
    private String password;  
    
    private String displayName;
    
    private String role;
    
    private Map<String, Object> dicSequence;   
       
    public String getUsername() {
		return username;
	}
    
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getDisplayName() {
		return displayName;
	}
	
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	
	public String getRole() {
		return role;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	
	@Override  
    public String toString() {  
        return "{\"USER\":{\"id\":\""+this.id+"\",\"username\":\""+this.username+"\",\"displayName\":\""+this.displayName+"\",\"role\":\"" +this.role +"\"}}";  
    }
	
       
}