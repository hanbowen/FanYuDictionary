package entity;

import java.util.Map;

import com.google.gson.annotations.Expose;

   
   
public class User extends Entity {  
   
      
    @Expose private String username;  
    
    @Expose(deserialize = false) private String password;  
    
    @Expose private String displayName;
    
    @Expose private String role;
    
    @Expose private Map<String, Object> dicSequence;
    
    @Expose private Dictionary dictionary;
       
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
	
	
	public Map<String, Object> getDicSequence() {
		return dicSequence;
	}

	public void setDicSequence(Map<String, Object> dicSequence) {
		this.dicSequence = dicSequence;
	}

	
	public Dictionary getDictionary() {
		return dictionary;
	}

	public void setDictionary(Dictionary dictionary) {
		this.dictionary = dictionary;
	}

	
       
}