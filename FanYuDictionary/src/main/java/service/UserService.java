package service;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import entity.User;

@Service
public class UserService extends GeneralService{


	/**
	 * @param name
	 * @return
	 */
	public User findUserByName(String name) {

		return mongoTemplate.findOne(
				new Query(Criteria.where("name").is(name)), User.class);

	}

}