package controller;

import java.io.Serializable;  

import org.springframework.data.annotation.Id;  
   
   
public class User implements Serializable{  
   
   
    private static final long serialVersionUID = 1L;  
       
    @Id  
    String uid;  
    String name;  
    int age;  
       
       
    public String getUid() {  
        return uid;  
    }  
    public void setUid(String uid) {  
        this.uid = uid;  
    }  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public int getAge() {  
        return age;  
    }  
    public void setAge(int age) {  
        this.age = age;  
    }  
       
    @Override  
    public String toString() {  
        return "{USER:{uid:"+this.uid+",name:"+this.name+",age:"+this.age+"}}";  
    }  
       
}