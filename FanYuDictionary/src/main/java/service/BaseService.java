package service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import utils.Pagination;

import com.google.gson.Gson;

public abstract class BaseService<T> {

	@Autowired
	protected MongoTemplate mongoTemplate;
	
	public T jsonToEntity(String jsonString, Class<T> clazz) {
		T t = null;
        try {
            Gson gson = new Gson();
            t = gson.fromJson(jsonString, clazz);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return t;
	}
	
	public String entityToJson(Object entity) {
		Gson gson = new Gson();
		String str = gson.toJson(entity);
		return str;
	}
	
	public String listToJson(List<?> list) {
		Gson gson = new Gson();
		return gson.toJson(list);
	}

	
	/**
	 * 通过条件查询,查询分页结果
	 * 
	 * @param pageNo
	 * @param pageSize
	 * @param query
	 * @return
	 */
	protected Pagination<T> getPage(int pageNo, int pageSize, Query query) {
		long totalCount = queryCount(query);
		Pagination<T> page = new Pagination<T>(pageNo, pageSize, totalCount);
		query.skip(page.getFirstResult());// skip相当于从那条记录开始
		query.limit(pageSize);// 从skip开始,取多少条记录
		List<T> datas = this.find(query);
		page.setDatas(datas);
		return page;
	}
	
	/**
	 * 查询分页结果
	 * 
	 * @param pageNo
	 * @param pageSize
	 * @param query
	 * @return
	 */
	protected Pagination<T> getPage(int pageNo, int pageSize) {
		return getPage(pageNo, pageSize, new Query());
	}
	
	/**
	 * 获取集合中的总数
	 * @return
	 */
	public long queryCount(Query query) {
		return this.mongoTemplate.count(query, this.getEntityClass());
	}
	
	/**
	 * 通过条件查询实体(集合)
	 * 
	 * @param query
	 */
	protected List<T> find(Query query) {
		return mongoTemplate.find(query, this.getEntityClass());
	}
	
	/**
	 * 通过一定的条件查询一个实体
	 * 
	 * @param query
	 * @return
	 */
	protected T findOne(Query query) {
		return mongoTemplate.findOne(query, this.getEntityClass());
	}
	
	/**
	 * 通过多个条件and查询
	 * 
	 * @return
	 */
	@SuppressWarnings("static-access")
	public T findOne(Map<String, ? extends Object> params) {
		Query query = new Query();
		Criteria criteria = new Criteria();
		boolean OK = false;
		for(Map.Entry<String, ? extends Object> entry : params.entrySet()) {
			if( OK ) {
				criteria = criteria.and(entry.getKey()).is(entry.getValue());
			} else {
				criteria = criteria.where(entry.getKey()).is(entry.getValue());
				OK = true;
			} 
		}
		query.addCriteria(criteria);
		return findOne(query);
	}
	
	/**
	 * 查询出所有数据
	 * 
	 * @return
	 */
	protected List<T> findAll() {
		return this.mongoTemplate.findAll(getEntityClass());
	}
	
	/**
	 * 查询并且修改记录
	 * 
	 * @param query
	 * @param update
	 * @return
	 */
	protected T findAndModify(Query query, Update update) {

		return this.mongoTemplate.findAndModify(query, update, this.getEntityClass());
	}
	
	/**
	 * 按条件查询,并且删除记录
	 * 
	 * @param query
	 * @return
	 */
	protected T findAndRemove(Query query) {
		return this.mongoTemplate.findAndRemove(query, this.getEntityClass());
	}

	/**
	 * 通过条件查询更新数据
	 * 
	 * @param query
	 * @param update
	 * @return
	 */
	protected void updateFirst(Query query, Update update) {
		mongoTemplate.updateFirst(query, update, this.getEntityClass());
	}
	
	/**
	 * 根据ID更新对象
	 * @param id
	 * @param params
	 */
	@SuppressWarnings("static-access")
	protected void updateById(String id , Map<String, Object> params) {
		
		Update update = new Update();
		for(Map.Entry<String, ? extends Object> entry : params.entrySet()) {
			update.update(entry.getKey(), entry.getValue());
		}
		this.updateFirst(Query.query(Criteria.where("id").is(id)), update);
	}
	
	/**
	 * 保存一个对象到mongodb
	 * 
	 * @param bean
	 * @return
	 */
	protected T save(T bean) {
		mongoTemplate.save(bean);
		return bean;
	}

	/**
	 * 通过ID获取记录
	 * 
	 * @param id
	 * @return
	 */
	protected T findById(String id) {
		return mongoTemplate.findById(id, this.getEntityClass());
	}

	/**
	 * 通过ID获取记录,并且指定了集合名
	 * 
	 * @param id
	 * @param collectionName
	 *            集合名
	 * @return
	 */
	protected T findById(String id, String collectionName) {
		return mongoTemplate.findById(id, this.getEntityClass(), collectionName);
	}	
	
	/**
	 * 根据id删除对象
	 * @param id
	 */
	protected void removeById(String id) {
		mongoTemplate.remove(findById(id));
	}
	
	/**
	 * 获取需要操作的实体类class
	 * 
	 * @return
	 */
	protected abstract Class<T> getEntityClass();
	
}