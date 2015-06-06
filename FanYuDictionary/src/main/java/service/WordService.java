package service;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import utils.Pagination;

import com.mongodb.BasicDBObject;
import com.mongodb.Bytes;
import com.mongodb.DBCursor;

import entity.Word;

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
	
	@SuppressWarnings("unchecked")
	public List<String> findByParams(String word, String match , String domain) {
//		Map<String , String> map = new HashMap<String , String> ();
//		map.put("word", search);
//		map.put(key, value)
		// 此处需要详细讨论所有情况
		if(word != null && !"".equals(word)) {
			return mongoTemplate.getCollection("word").distinct("word", new BasicDBObject("word", word));
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
		super.findAndModify(query(where("id").is(id)) , Update.update("status", "published"));
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
	
	public List<String> test(String word) {
		BasicDBObject keys = new BasicDBObject();
		keys.put("word", 1);
		List<String> words = new ArrayList<String>();
		DBCursor cursor = mongoTemplate.getCollection("word").find(new BasicDBObject("word" , word), keys).addOption(Bytes.QUERYOPTION_NOTIMEOUT);
		
		while(cursor.hasNext()) {
			String w = (String) cursor.next().get("word");
			words.add(w);
		}
		
		return words;
	}
	
	/**
	 * 获取总共数据条数
	 * @return
	 */
	public long queryCount(Query query) {
		return super.queryCount(query);
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
