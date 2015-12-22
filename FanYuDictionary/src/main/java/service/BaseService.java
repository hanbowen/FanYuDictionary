package service;

import java.lang.reflect.InvocationTargetException;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Order;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import utils.JsonKit;
import utils.Pagination;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.mongodb.BasicDBObject;
import com.mongodb.WriteResult;

import entity.Word;

@SuppressWarnings("deprecation")
public abstract class BaseService<T> {

	@Autowired
	protected MongoTemplate mongoTemplate;
	
	public T jsonToEntity(String jsonString, Class<T> clazz) {
		T t = null;
        try {
            Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
            t = gson.fromJson(jsonString, clazz);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return t;
	}
	
	public String entityToJson(Object entity) {
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		String str = gson.toJson(entity);
		return str;
	}
	
	public void ensureIndex(Class<T> clazz, String key, Order order) {
		mongoTemplate.indexOps(clazz).ensureIndex(new Index().on(key, order));
	}
	
	/**
	 * keys为序列化对象排除属性
	 * @param entity
	 * @param keys
	 * @return
	 */
	public String entityToJson(Object entity , String[] keys) {
		Gson gson = new GsonBuilder().setExclusionStrategies(new JsonKit(keys)).create();
		String str = gson.toJson(entity);
		return str;
	}
	
	public String entityToJsonWithoutAnnotation(Object entity) {
		Gson gson = new Gson();
		String str = gson.toJson(entity);
		return str;
	}
	
	public String listToJson(List<?> list) {
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		return gson.toJson(list);
	}
	
	public List<T> jsonToList(String json) {
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		List<T> list = gson.fromJson(json, new TypeToken<List<T>>(){}.getType());
		return list;
	}
	
	/**
	 * keys为序列化对象排除属性
	 * @param entity
	 * @param keys
	 * @return
	 */
	public String listToJson(List<?> list ,String[] keys) {
		Gson gson = new GsonBuilder().setExclusionStrategies(new JsonKit(keys)).create();
		return gson.toJson(list);
	}
	
	/**
	 * 以pretty方式返回json字符串
	 * @param list
	 * @param keys
	 * @return
	 */
	public String listToJsonPretty(List<?> list ,String[] keys) {
		Gson gson = new GsonBuilder().setExclusionStrategies(new JsonKit(keys)).disableHtmlEscaping().setPrettyPrinting().create();
		JsonParser jp = new JsonParser();
		JsonElement je = jp.parse(gson.toJson(list));
		return gson.toJson(je);
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
	protected T findOne(Map<String, ? extends Object> params) {
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
	 * 按条件进行删除
	 * @param query
	 */
	protected void removeByProperty(Query query) {
		this.mongoTemplate.remove(query, getEntityClass());
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
	 * 根据多个属性进行更新
	 * @param keys
	 * @param word
	 */
	protected void updateMulti(Map<String, Object> map,  T bean) {

		
		boolean start = true;
		Criteria criteria = new Criteria();
		Update update = new Update();
		for (Entry<String , Object> KV : map.entrySet()) {
			char[] array = KV.getKey().toCharArray();
			array[0] -= 32;
			String methodName = "get" + String.valueOf(array);
			Object value = new Object();
			try {
				value = getEntityClass().getDeclaredMethod(methodName)
						.invoke(bean);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (start) {
				// 构造查询条件
				criteria = Criteria.where(KV.getKey()).is(KV.getValue());
				// 构造更新 K V
				update = Update.update(KV.getKey(), value);
				start = false;
			} else {
				// 构造查询条件
				criteria = criteria.and(KV.getKey()).is(KV.getValue());
				// 构造更新 K V
				update = update.set(KV.getKey(), value);
			}
		}
		Query query = new Query(criteria);

		mongoTemplate.updateMulti(query, update, getEntityClass());
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
	 * 用原生的mongodb API去update 一条entry
	 * @param id
	 */
	@SuppressWarnings("unchecked")
	protected void updateById(String id , String jsonToUpdate) {
		@SuppressWarnings("rawtypes")
		Map map = new Gson().fromJson(jsonToUpdate, Map.class);
		StringBuilder sb = new StringBuilder(getCollectionName());
		sb.setCharAt(0, Character.toUpperCase(sb.charAt(0)));
		String str = sb.toString();
		map.put("_class", "entity." + str );
		if (id.contains("-")) {
			mongoTemplate.getCollection(getCollectionName()).update(new BasicDBObject("id",id), new BasicDBObject(map));
		}else{
			mongoTemplate.getCollection(getCollectionName()).update(new BasicDBObject("_id",new ObjectId(id)), new BasicDBObject(map));
		}
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
	 * 根据条件删除对象
	 * @param query
	 */
	protected void removeByCriteria(Query query) {
		mongoTemplate.remove(query, this.getEntityClass());
	}
	
	/**
	 * 删除所有对象
	 */
	protected void removeAll() {
		mongoTemplate.dropCollection(getEntityClass());
	}
	
	/**
	 * 一次保存多条数据
	 * @param objects
	 */
	protected void insertAll(Collection<T> objects) {
		mongoTemplate.insertAll(objects);
	}
	
	/**
	 * 一次保存多条数据
	 * @param batchToSave
	 */
	protected void insert(List<T> batchToSave) {
		mongoTemplate.insert(batchToSave, getEntityClass());
	}
	
	public WriteResult updateMulti(Query query, Update update) {
		return mongoTemplate.updateMulti(query, update, getEntityClass());
	}
	
	/**
	 * 获取需要操作的实体类class
	 * 
	 * @return
	 */
	protected abstract Class<T> getEntityClass();
	
	protected String getCollectionName() {
		return getEntityClass().getSimpleName().toLowerCase();
	}
	
	
}
