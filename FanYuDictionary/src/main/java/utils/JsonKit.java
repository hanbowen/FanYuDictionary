package utils;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

/**
 *  Gson序列化对象排除属性 
 *
 */
public class JsonKit implements ExclusionStrategy{

	private String[] keys;
	
	public JsonKit(String[] keys) {
		this.keys = keys;
	}
	
	@Override  
    public boolean shouldSkipClass(Class<?> arg0) {  
        return false;  
    }  
  
    @Override  
    public boolean shouldSkipField(FieldAttributes arg0) {  
        for (String key : keys) {  
            if (key.equals(arg0.getName())) {  
                return true;  
            }  
        }  
        return false;  
    }
}
