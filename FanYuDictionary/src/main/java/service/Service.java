package service;

public interface Service {
	// Json to JavaBean
	<T> T getEntity(String jsonString , Class<T> clazz);
	
	void save(Object obj);
}
