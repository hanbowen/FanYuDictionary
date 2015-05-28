package entity;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

public class Entity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id  
    String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
}
