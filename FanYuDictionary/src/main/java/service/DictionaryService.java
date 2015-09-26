package service;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.List;

import org.springframework.stereotype.Service;

import entity.Dictionary;

@Service
public class DictionaryService  extends BaseService<Dictionary>{

	public Dictionary save(Dictionary dictionary) {
		return super.save(dictionary);
	}
	
	public List<Dictionary> findAll() {
		return this.mongoTemplate.findAll(getEntityClass());
	}
	
	public void removeById(String id) {
		super.findAndRemove(query(where("id").is(id)));
	}
	
	public Dictionary findById(String id) {
		return super.findOne(query(where("id").is(id)));
	}
	
	public void updateById(String id , String jsonToUpdate) {
		super.updateById(id, jsonToUpdate);
	}
	
	public Dictionary findByDisplayName(String displayName) {
		
		return super.findOne(query(where("displayName").is(displayName)));
	}
	
	public Dictionary findByShortName(String shortName) {
		
		return super.findOne(query(where("shortName").is(shortName)));
	}
	
	@Override
	protected Class<Dictionary> getEntityClass() {
		return Dictionary.class;
	}

}
