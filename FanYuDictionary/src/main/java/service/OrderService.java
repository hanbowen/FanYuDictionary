package service;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import entity.WordOrder;

@Service
public class OrderService extends BaseService<WordOrder>{
	
	
	
	public List<String> getOrderedWords(List<String> words) {
		
		// 此处最终要将Order对象的word拿出来重新形成数组
		List<WordOrder> list = findOrderByWords(words);
		Collections.sort(list);
		List<String> typos = new ArrayList<String>();
		if (list == null) {
			return null;
		}
		
		// 取出所有未建立索引的单词（包含索引遗漏及索引笔误）
		Iterator<WordOrder> iter = list.iterator();
		while(iter.hasNext()) {
			WordOrder wordOrder = iter.next();
			if (!wordOrder.getOrder().equals(0L)) {
				break;
			}
			typos.add(wordOrder.getWord());
		}
		
		// 形成列表初稿（未对typo单词做重排）
		List<String> orderedWords = new LinkedList<String>();
		for(WordOrder word: list) {
			orderedWords.add(word.getWord());
		}
		
		List<String> cloneWords = new LinkedList<String>();
		// 用cloneWords形成按照字母顺序该有的排序
//		Collections.copy(cloneWords, orderedWords);
		cloneWords.addAll(orderedWords);
		Collections.sort(cloneWords);
		
		for(String typo : typos) {
			int index = cloneWords.indexOf(typo);
			if (index >= 1) {
				String beforeTypo = cloneWords.get(index-1);
				index = orderedWords.indexOf(beforeTypo);
				orderedWords.remove(typo);
				orderedWords.add(index, typo);
			}
		}
		
		return orderedWords;
	}
	
	/**
	 * 批量保存数据
	 */
	public void insertAll(Collection<WordOrder> objects) {
		super.insertAll(objects);
	}
	
	private List<WordOrder> findOrderByWords(List<String> words) {
		
		List<WordOrder> wordOrders = new LinkedList<WordOrder>();
		for(int i=0; i<words.size();i++) {
			// 此处有一个问题，是否有同样的词，如果没有同样的词，则只能查出一个，如果有同样的词，则能查出多个
			WordOrder wordOrder = findOneByWord(words.get(i));
			if( wordOrder == null) {
				wordOrder = new WordOrder();
				wordOrder.setWord(words.get(i));
				wordOrder.setOrder(0L);
			}
			wordOrders.add(wordOrder);
		}
		return wordOrders;
	}
	
	/**
	 * 根据word name取word信息 （一个）
	 * @param word
	 * @return
	 */
	private WordOrder findOneByWord(String word) {
		Map<String , Object> params = new HashMap<String , Object>();
		params.put("word", word);
		return super.findOne(params);
	}
	
	/**
	 * 根据word name取word信息列表 (一至多个)
	 * @param word
	 * @return
	 */
	private List<WordOrder> findMultiByWord(String word) {
		return super.find(query(where("word").is(word)));
	}
	
	
	@Override
	protected Class<WordOrder> getEntityClass() {
		// TODO Auto-generated method stub
		return WordOrder.class;
	}

}
