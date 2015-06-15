package service;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import utils.Pagination;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;

import entity.Word;
import enumeration.DomainProperty;
import enumeration.MatchProperty;

@Service
public class WordService extends BaseService<Word>{

	
	/**
	 * 存储词条信息
	 * @param word
	 * @return
	 */
	public Word save(Word word) {
		return super.save(word);
	}
	
	
	/**
	 * 模糊查询
	 * @param word 查询关键词
	 * @param match 匹配位置
	 * @param domain 查询范围
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<String> findByParams(String word, String match , String domain) {
		// word match domain 的非空性已在controller层校验过
		
		for(enumeration.MatchProperty matchEnum : enumeration.MatchProperty.values()) {
			if(match.equals(matchEnum.getValue())) {
				for(enumeration.DomainProperty domainEnum : enumeration.DomainProperty.values()) {
					if(domain.equals(domainEnum.getValue())) {
						String key = "";
						BasicDBObject queryCondition = new BasicDBObject();
						// 全文检索需要重新构造查询key
						if("quanwen".equals(domain)) {
							BasicDBList values = new BasicDBList();
							key = DomainProperty.getKey(domainEnum);
							for(String item : key.split("-")) {
//								values.add(new BasicDBObject(item,new BasicDBObject("$regex",MatchProperty.getRegex(matchEnum, word))));
								values.add(new BasicDBObject(item,new BasicDBObject("$regex",".*" + word + ".*")));
								
							}
							queryCondition.put("$or", values);
						} else {
							queryCondition = new BasicDBObject(DomainProperty.getKey(domainEnum), new BasicDBObject("$regex",MatchProperty.getRegex(matchEnum, word)));
						}
						return mongoTemplate.getCollection(getCollectionName()).distinct("word", queryCondition);
					}
				}
			}
		}
		
		return null;
	}
	
	/**
	 * 根据年月日分页查询
	 * @param period
	 * @param pCount
	 * @param page
	 * @param pageSize
	 * @return
	 */
	public Pagination<Word> findByDate(String period, String pCount, int page, int pageSize) {
		
		Query query = queryByDate(period, pCount);
		
		if( query != null ) {
			return getPageWord(page, pageSize,query);
		}
		return null;
	}
	
	/**
	 * 根据用户Id 返回词条信息
	 * @param userId
	 * @return
	 */
	public Pagination<Word> findWordByUserId(String userId, int page , int pageSize) {
		return getPageWord(page , pageSize , query(where("author.id").is(userId)).with(new Sort(Direction.DESC, "lastEditDateTime")));
	}
	
	/**
	 * 根据年月日查询 构造Query对象
	 * @param period
	 * @param pCount
	 * @return
	 */
	private Query queryByDate(String period, String pCount) {
		Calendar cal = Calendar.getInstance();
		Date now = new Date();
		cal.setTime(now);
		if(period != null && !"".equals(period) && pCount != null && !"".equals(pCount)) {
			if(period.equals("Week")) {
				cal.add(Calendar.DAY_OF_WEEK_IN_MONTH, -Integer.valueOf(pCount));
			}else if(period.equals("Month")) {
				cal.add(Calendar.MONTH, -Integer.valueOf(pCount));
			}else if(period.equals("Year")) {
				cal.add(Calendar.YEAR, -Integer.valueOf(pCount));
			}
			return query(where("lastEditDateTime").gte(cal.getTimeInMillis())).with(new Sort(Direction.DESC, "lastEditDateTime"));
		}
		return null;
	}
	
	
	/**
	 * 查出所有符合年月日过滤条件的总数
	 * @param period
	 * @param pCount
	 * @return
	 */
	public long queryCount(String period, String pCount) {
		Query query = queryByDate(period , pCount);
		
		if( query != null ) {
			return queryCount(query);
		}
		
		return 0;
	}
	
	/**
	 * 根据用户ID查出总条数
	 * @param period
	 * @param pCount
	 * @return
	 */
	public long queryCount(String userId) {
		return queryCount(query(where("author.id").is(userId)));
	}
	
	
	
	/**
	 * 根据pageNo 及 pageSize 查询每页信息
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	public Pagination<Word> getPageWord(int pageNo, int pageSize, Query query) {
		return super.getPage(pageNo, pageSize, query);
	}
	
	/**
	 * 根据word Id 直接更新json对象
	 */
	public void updateById(String id , String jsonToUpdate) {
		super.updateById(id, jsonToUpdate);
	}
	
	/**
	 * 发布对象
	 * @param id
	 */
	public void publishWord(String id) {
		super.findAndModify(query(where("id").is(id)) , Update.update("status", "checked"));
	}
	
	/**
	 * 根据word id 返回word信息
	 * @param id
	 * @return
	 */
	public Word findWordById(String id) {
		return super.findById(id);
	}
	
	/**
	 * 根据word name取word信息列表
	 * @param word
	 * @return
	 */
	public List<Word> findWordByName(String word) {
		return super.find(query(where("word").is(word)));
	}
	
	
	/**
	 * 获取总共数据条数
	 * @return
	 */
	public long queryCount(Query query) {
		return super.queryCount(query);
	}
	
	/**
	 * 批量保存数据
	 */
	public void insertAll(List<Word> objects) {
		super.insertAll(objects);
	}
	
	/**
	 * 根据Id删除对象
	 * @param id
	 */
	public void removeById(String id) {
		super.removeByCriteria(query(where("id").is(id)));
	}
	
	@Override
	protected Class<Word> getEntityClass() {
		return Word.class;
	}

}
