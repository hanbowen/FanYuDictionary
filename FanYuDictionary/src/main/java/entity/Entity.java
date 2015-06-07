package entity;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

import com.google.gson.annotations.Expose;

public class Entity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id  
    @Expose String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
}
