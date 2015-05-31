package service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.mongodb.BasicDBObject;

import entity.Word;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

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
	
	public List<String> findByParams(String word, String match , String domain) {
//		Map<String , String> map = new HashMap<String , String> ();
//		map.put("word", search);
//		map.put(key, value)
		if(word != null && !"".equals(word)) {
			return mongoTemplate.getCollection("word").distinct("word", new BasicDBObject("word", word));
		}
		return null;
	}
	
	public List<Word> findByDate(String period , String pCount) {
		Calendar cal = Calendar.getInstance();
		Date now = new Date();
		cal.setTime(now);
		if(period != null && !"".equals(period) && pCount != null && !"".equals(pCount)) {
			if(period.equals("Week")) {
				cal.add(Calendar.DAY_OF_MONTH, -Integer.valueOf(pCount));
			}else if(period.equals("Month")) {
				cal.add(Calendar.MONTH, -Integer.valueOf(pCount));
			}else if(period.equals("Year")) {
				cal.add(Calendar.YEAR, -Integer.valueOf(pCount));
			}
			return mongoTemplate.find(query(where("lastEditDateTime").gte(cal.getTimeInMillis())), getEntityClass());
		}
		return null;
	}
	
	public List<Word> findWordByName(String word) {
		return super.find(query(where("word").is(word)));
	}
	
	@Override
	protected Class<Word> getEntityClass() {
		return Word.class;
	}

}
