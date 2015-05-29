package service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import utils.Pagination;
import entity.User;

@Service
public class UserService extends BaseService<User>{


	/**
	 * 存储用户信息
	 * @param user
	 * @return
	 */
	public User save(User user) {
		return super.save(user);
	}
	
	/**
	 * 根据名字查询指定用户
	 * @param name
	 * @return
	 */
	public User findUserByName(String name) {
		Map<String , String> criteria = new HashMap<String , String> ();
		criteria.put("username", name);
		return super.findOne(criteria);
	}
	
	/**
	 * 根据ID查询指定用户
	 * @param name
	 * @return
	 */
	public User findUserById(String id) {
		Map<String , String> criteria = new HashMap<String , String> ();
		criteria.put("id", id);
		return super.findOne(criteria);
	}
	
	/**
	 * 根据pageNo 及 pageSize 查询每页信息
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	public Pagination<User> getPageUser(int pageNo, int pageSize) {
		return super.getPage(pageNo, pageSize);
	}
	
	
	/**
	 * 获取总共数据条数
	 * @return
	 */
	public long queryCount() {
		return super.queryCount(new Query());
	}
	
	/**
	 * 根据id删除对象
	 */
	public void removeById(String id) {
		super.removeById(id);
	}
	
	/**
	 * 根据ID更新对象
	 */
	public void updateById(String id , Map<String , Object> params) {
		super.updateById(id, params);
	}

	@Override
	protected Class<User> getEntityClass() {
		return User.class;
	}
}