package entity;

import java.util.Map;

import com.google.gson.annotations.Expose;

public class Dictionary extends Entity{
	
	@Expose private String dicGroup;  
	    
	@Expose private String displayName;
	  
	@Expose private Map<String , Object> author; 
	  
	@Expose private String status;
	  
	@Expose private long createDateTime;
	
	@Expose private String shortName;
	
	@Expose private int copyRight;

	
	
	public int getCopyRight() {
		return copyRight;
	}

	public void setCopyRight(int copyRight) {
		this.copyRight = copyRight;
	}

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

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
