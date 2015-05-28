package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.google.gson.Gson;

public class GeneralService implements Service{

	@Autowired
	protected MongoTemplate mongoTemplate;
	
	@Override
	public <T> T getEntity(String jsonString, Class<T> clazz) {
		T t = null;
        try {
            Gson gson = new Gson();
            t = gson.fromJson(jsonString, clazz);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return t;
	}

	/**
	 * 
	 * @param user
	 */
	public void save(Object obj) {

		mongoTemplate.save(obj);

	}
	
}
