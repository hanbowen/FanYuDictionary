package entity;

import java.util.Map;

public class Dictionary extends Entity{
	private String dicGroup;  
	    
	private String displayName;
	  
	private Map<String , Object> author; 
	  
	private String status;
	  
	private long createDateTime;

	public String getDicGroup() {
		return dicGroup;
	}

	public void setDicGroup(String dicGroup) {
		this.dicGroup = dicGroup;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public Map<String, Object> getAuthor() {
		return author;
	}

	public void setAuthor(Map<String, Object> author) {
		this.author = author;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public long getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(long createDateTime) {
		this.createDateTime = createDateTime;
	} 

	  
}
