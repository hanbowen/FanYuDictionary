package controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.json.JSONArray;
import org.json.JSONObject;
//import org.json.JSONArray;
//import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Order;
import org.springframework.web.bind.annotation.ExceptionHandler;

import service.DictionaryService;
import service.OrderService;
import service.WordService;
import utils.CompressUtil;
import utils.Context;
import utils.Pagination;
import utils.RequestUtil;
import entity.Dictionary;
import entity.Word;
import entity.WordOrder;
import export.Export;
import export.StringExport;

@SuppressWarnings("deprecation")
@Path("/word")
public class WordResource {
	
	@Autowired
	private WordService wordService;
	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
	private OrderService orderService;
	private static final Log LOGGER = LogFactory.getLog(WordResource.class);
	
	
	
	@GET
	public Response getWords(@QueryParam("search") String word, @QueryParam("match") String match, @QueryParam("domain") String domain, @QueryParam("dictionaries") String dictionaries, @QueryParam("logon") String logon, @QueryParam("period") String period, @QueryParam("periodCount") String periodCount, @QueryParam("userId") String userId, @QueryParam("page") String page , @QueryParam("pageSize") String pageSize) {
		
		// 按照名字查询时不需要分页
		if(word == null || "".equals(word)) {
			if(page == null || "".equals(page) || "undefined".equals(page)) {
				return Response.status(412).entity("HTTP HEADER 中的page参数不能为空").type("text/plain").build();
			}
			
			if(pageSize == null || "".equals(pageSize) || "undefined".equals(pageSize)) {
				return Response.status(412).entity("HTTP HEADER 中的pageSize参数不能为空").type("text/plain").build();
			}
			
			if( Integer.valueOf(page) <=0 || Integer.valueOf(pageSize) <= 0) {
				return Response.status(412).entity("HTTP HEADER 中的page 和 pageSize 必须大于0").type("text/plain").build();
			}
		} else {
			
			if(match == null || "".equals(match)) {
				return Response.status(412).entity("match 参数不允许为空").type("text/plain").build();
			}
			
			if(domain == null || "".equals(domain)) {
				return Response.status(412).entity("domain 参数不允许为空").type("text/plain").build();
			}
			
			if(dictionaries == null || "".equals(dictionaries)) {
				return Response.status(412).entity("dictionaries 参数不允许为空").type("text/plain").build();
			}
			
			if(logon == null || "".equals(logon)) {
				return Response.status(412).entity("logon 参数不允许为空").type("text/plain").build();
			}
			
			// 判断match参数是否超出规定的范围， 规定的范围是 shou/zhong/wei/jingque
			if( !Arrays.asList(enumeration.MatchProperty.getValues()).contains(match) ) {
				return Response.status(412).entity("match参数已超出规定的范围，请在以下查询范围中选择一种查询方式" + Arrays.asList(enumeration.MatchProperty.getShows())).type("text/plain").build();
			}
			
			// 判断domain参数是否超出规定的范围， 规定的范围是 duiyingci/bianxing/liju/danci/quanwen
			if( !Arrays.asList(enumeration.DomainProperty.getValues()).contains(domain) ) {
				return Response.status(412).entity("domain参数已超出规定的范围，请在以下查询范围中选择一种查询方式" + Arrays.asList(enumeration.DomainProperty.getShows())).type("text/plain").build();
			}
			
			List<String> list = wordService.findByParams(word , match, domain , dictionaries, logon);
			
			// 获取所选词典的区块，并获得对应索引前缀
			String[] dictionaryArray = dictionaries.split("@");
			String dicGroup = "";
			if (dictionaryArray != null && dictionaryArray.length !=0) {
				Dictionary dictionary = dictionaryService.findById(dictionaryArray[0]);
				dicGroup = dictionary.getDicGroup();
			}
			String blockName = orderService.getBlockName(dicGroup);
			list = orderService.getOrderedWords(list , blockName);
			LOGGER.info("成功返回词条列表");
			return Response.status(200).entity(wordService.listToJson(list)).type("application/json").build();
		}
		
		
		Pagination<Word> pagination = null;
		// 总页数
		int pageCount = 0;
		// 新词条
		if(period != null && !"".equals(period) && periodCount != null && !"".equals(periodCount)) {
			// 想办法加缓存   ***********************
			pagination = new Pagination<Word>(0 , Integer.valueOf(pageSize) ,wordService.queryCount(period, periodCount));
			pageCount = pagination.getTotalPage();
			pagination = wordService.findByDate(period, periodCount, Integer.valueOf(page), Integer.valueOf(pageSize));
			LOGGER.info("成功返回新词条列表");
			return Response.status(200).header("Access-Control-Expose-Headers", "pageCount").header("pageCount", pageCount).header("Access-Control-Expose-Headers", "page").header("page", page).header("Access-Control-Expose-Headers", "pageSize").header("pageSize", pageSize).entity(wordService.listToJson(pagination.getDatas())).type("application/json").build();
		}
		
		// 我的词条
		if(userId != null && !"".equals(userId)) {
			pagination = new Pagination<Word>(0, Integer.valueOf(pageSize) , wordService.queryCount(userId));
			pageCount = pagination.getTotalPage();
			pagination = wordService.findWordByUserId(userId, Integer.valueOf(page) , Integer.valueOf(pageSize));
			LOGGER.info("成功按照用户ID返回词条");
			return Response.status(200).header("Access-Control-Expose-Headers", "pageCount").header("pageCount", pageCount).header("Access-Control-Expose-Headers", "page").header("Access-Control-Expose-Headers", "pageSize").header("page", page).header("pageSize", pageSize).entity(wordService.listToJson(pagination.getDatas())).type("application/json").build();
		}
		
		return Response.status(412).entity("您输入的参数不合法").type("text/plain").build();
	}
	
	@POST
	@Produces("application/json")
	public Response saveWord(String wordJson) {
//		wordService.ensureIndex(Word.class, "word", Order.ASCENDING);
		Word word = wordService.jsonToEntity(wordJson, Word.class);
		Date date = new Date();
		String id = UUID.randomUUID().toString();
		word.setId(id);
		word.setCreateDateTime(date.getTime());
		word.setLastEditDateTime(date.getTime());
		word.setStatus("created");
		wordService.save(word);
		LOGGER.info("成功保存词条信息");
		word = wordService.findWordById(id);
		LOGGER.info("成功返回词条信息");
		return Response.status(200).entity(wordService.entityToJson(word)).type("application/json").build();
	}
	
	@PUT
	@RequiresRoles("Admin")
	@ExceptionHandler({UnauthorizedException.class})
	@Path("{wordId}/publish")
	public Response publishWord(@PathParam("wordId") String wordId) {
//		wordService.updateById(wordId, body);
		if(wordId == null || "".equals(wordId)) {
			return Response.status(412).entity("请传入wordId").type("text/plain").build();
		}
		
		Word word = wordService.findWordById(wordId);
		Word publishedWord = wordService.findWordByMultipleParam(word.getWord(), word.getDictionary(), "published");
		if(publishedWord != null && !"".equals(publishedWord.getId())) {
			return Response.status(409).entity("该词条已被发布，不允许再次发布").type("text/plain").build();
		}
		
		word.setAuthor(new HashMap<String , Object>());
		String id = UUID.randomUUID().toString();
		word.setId(id);
		word.setStatus("published");
		wordService.save(word);
		
		wordService.publishWord(wordId);
		LOGGER.info("成功发布词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	@PUT
	@Produces("text/plain")
	@Path("{wordId}")
	@RequiresRoles(value = { "Editor", "Admin" }, logical = Logical.OR)
	public Response updateWord(@PathParam("wordId") String wordId , String body) {
		if(wordId == null || "".equals(wordId)) {
			return Response.status(412).entity("请传入wordId").type("text/plain").build();
		}
		Word word = wordService.jsonToEntity(body, Word.class);
		word.setStatus("updated");
		body = wordService.entityToJson(word);
		wordService.updateById(wordId, body);
		LOGGER.info("成功更新词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	
	@GET
	@Path("{wordName}/{logon}")
	public Response getWordByName(@PathParam("wordName") String wordName, @PathParam("logon") String logon) {
		
		if( wordName == null || "".equals(wordName) ) {
			return Response.status(200).entity("").type("text/plain").build();
		}
		List<Word> list = wordService.findWordByName(wordName, logon);
		
		LOGGER.info("成功返回词条详情");
		return Response.status(200).entity(wordService.listToJson(list)).type("application/json").build();
	}
	
	@PUT
	@Path("/delete")
	@RequiresRoles("Admin")
	@ExceptionHandler({UnauthorizedException.class})
	public Response delWords(String deleteList) {
		if(deleteList == null || "".equals(deleteList)) {
			return Response.status(412).entity("请传入deleteList").type("text/plain").build();
		}
		
		String[] ids = deleteList.substring(1, deleteList.length()-1).split(",");
		for(String id : ids) {
			id = id.replaceAll("\"", "");
			wordService.removeById(id);
		}
		
		LOGGER.info("成功批量删除词条信息");
		// 我要给你返回什么？
		// FIXME
		return Response.status(200).entity("success").type("text/plain").build();
	}

	@DELETE
	@Path("{wordId}")
	public Response delWord(@PathParam("wordId") String wordId) {
		if(wordId == null || "".equals(wordId)) {
			Response.status(412).entity("请输入正确的wordId").type("text/plain").build();
		}
		wordService.removeById(wordId);
		LOGGER.info("成功删除词条信息");
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	
	@GET
	@Path("import/{dictionaryName}")
	public Response inport(@PathParam("dictionaryName") String dictionaryName) {
		if(dictionaryName == null || "".equals(dictionaryName)) {
			return Response.status(404).entity("DICTIONARY NAME CAN NOT BE EMPTY").type("text/plain").build(); 
		}
		
		if (dictionaryName.contains("_")) {
			dictionaryName = dictionaryName.replace("_", " ");
		}
		
		Dictionary dictionary = dictionaryService.findByDisplayName(dictionaryName);
		if( dictionary == null || "".equals(dictionary.getId()) ) {
			return Response.status(404).entity("THE DICTIONARY NAME OF " +dictionaryName+ " IS NOT IN THE DATABASE, PLEASE DOUBLE CHECK THE DICTIONARY NAME AND IMPORT LATER").type("text/plain").build(); 
		}
		
		List<Word> oldWords = wordService.findWordsByDictionaryName(dictionaryName);
		if (oldWords != null && oldWords.size() !=0 ){
			return Response.status(409).entity("PLEASE CLEAN ALL THE VOCABULARY ENTRIES AND THEN IMPORT AGAIN.").type("text/plain").build();
		}
		
		JSONArray jsonArray = new JSONArray();
 		
 		Context context = new Context();
// 		Collection<Word> con = null;
 		try {
 			long t1 = System.currentTimeMillis();
// 			con = context.parseImport(dictionaryName + ".json");
 			jsonArray = context.parseImport(dictionaryName + ".json");
			long t2 = System.currentTimeMillis();
			System.out.println(t2-t1);
		} catch (IOException e) {
			e.printStackTrace();
			return Response.status(404).entity("PLEASE MAKE SURE THE FILE OF " +dictionaryName+ ".JSON IS UPLOADED TO THE SERVER").type("text/plain").build();
		}
 		boolean syntax_error = context.isSyntax_error();
 		
 		if( syntax_error ) {
 			return Response.status(412).entity("THE DATA TO BE IMPORTED DOES NOT CONFORM TO THE JSON SPECIFICATION, PLEASE CHECK AND RE - IMPORT, ERROR MESSAGE: " + context.getErrorMessage()).type("text/plain").build(); 
 		}
// 		System.gc();
 		
 		Worker worker = new Worker(jsonArray, dictionary);
 		Thread t = new Thread(worker);
 		t.start();
 		
 		
// 		Map<String , Object> dicMap = new HashMap<String , Object>();
//		dicMap.put("id", dictionary.getId());
//		dicMap.put("dicGroup", dictionary.getDicGroup());
//		dicMap.put("displayName", dictionary.getDisplayName());
//		dicMap.put("shortName", dictionary.getShortName());
//		dicMap.put("status", dictionary.getStatus());
//		dicMap.put("createDateTime", dictionary.getCreateDateTime());
//		List<Word> jsonList = new ArrayList<Word>();
//		
//		for(int i=0; i< jsonArray.length();i ++) {
//			Date date = new Date();
//			JSONObject jsonObject = jsonArray.getJSONObject(i);
//			jsonObject.put("dictionary", dicMap);
//			Word word = wordService.jsonToEntity(jsonObject.toString(), Word.class);
//			word.setStatus("published");
//			word.setImportflag(true);
//			word.setCreateDateTime(date.getTime());
//			word.setLastEditDateTime(date.getTime());
//			jsonList.add(word);
//		}
//		
//		int limit = 10000;
//		Integer size = jsonList.size();
//		
//		if ( limit < size ) {
//			int part = size / limit;
//			System.out.println("共有:" + size +"条， ！" + "分为: "+part+ "批");
//			
//			for(int i=0;i<part;i++ ) {
//				List<Word> listPage = jsonList.subList(0, limit);
//				wordService.insertAll(listPage);
//				jsonList.subList(0, limit).clear();
//			}
//			
//			if(!jsonList.isEmpty()) {
//				wordService.insertAll(jsonList);
//			}
//		} else {
//			wordService.insertAll(jsonList);
//		}
		
//		wordService.ensureIndex(Word.class, "word", Order.ASCENDING);
//		long i = jsonList.size();
		System.gc();
		return Response.status(200).entity(jsonArray.length() + " ITEMS HAVE BEEN IMPORTED SUCCESSFULLY").type("text/plain").build(); 
	}
	
	@GET
	@Path("import/order/{fileName}")
	public Response importOrder(@PathParam("fileName") String fileName) {
		if(fileName == null || "".equals(fileName)) {
			return Response.status(404).entity("FILE NAME CAN NOT BE EMPTY").type("text/plain").build(); 
		}
		
		String blockName = "";
		if (!fileName.contains("_")) {
			return Response.status(404).entity("FILE NAME format IS WRONG, IT MUST START WITH THE BLOCK NAME, FOR EXAMPLE FAN_INDEX.TXT").type("text/plain").build(); 
		} else {
			String[] arr = fileName.split("_");
			blockName = arr[0];
			blockName = blockName.trim();
		}
		Context context = new Context();
		List<String> words = new LinkedList<String>();
		try {
			long t1 = System.currentTimeMillis();
			words = context.parseOrder(fileName + ".txt");
			long t2 = System.currentTimeMillis();
			System.out.println(t2-t1);
		} catch (IOException e) {
			e.printStackTrace();
			return Response.status(404).entity("PLEASE MAKE SURE THE FILE OF " +fileName+ ".TXT IS UPLOADED TO THE SERVER").type("text/plain").build();
		}
		
		
		
		Worker worker = new Worker( true, words, blockName);
		Thread t = new Thread(worker);
		t.start();
		
		long i = words.size();
		System.gc();
		return Response.status(200).entity(i + " ITEMS HAVE BEEN IMPORTED SUCCESSFULLY").type("text/plain").build(); 
	}
	
	@GET
	@Path("export/{dictionaryName}")
	public void export(@PathParam("dictionaryName") String dictionaryName , @javax.ws.rs.core.Context HttpServletRequest request, @javax.ws.rs.core.Context HttpServletResponse response) {
		
		Context context = new Context();
		context.parseExport(context.getProperties().getProperty("export"));
		Map<String, JSONObject> mapConfig = context.getExport();
		Map<String , InputStream> inmap = new HashMap<String, InputStream>();
		
		try {
			JSONObject config = mapConfig.get("word");
			JSONArray ignoredArray = null;
			if( !config.isNull("exportIgnored")){
				ignoredArray = config.getJSONArray("exportIgnored");
			}

			String[] keys = null;
			if( ignoredArray != null ) {
				int len = ignoredArray.length();
				keys = new String[len];
				for(int i=0;i<len;i++) {
					keys[i] = ignoredArray.get(i).toString();
				}
			}
			
			List<Word> list = wordService.findWordsByDictionaryName(dictionaryName);
			String json = wordService.listToJsonPretty(list, keys);
			inmap.put(config.getString("name").trim()+".json",exportInputStream(json));
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		ByteArrayOutputStream out = CompressUtil.compress(inmap);
		InputStream in = null;
		try {
			byte [] b = out.toByteArray();
			in = new ByteArrayInputStream(b);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(out != null ){
				try {
					out.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		RequestUtil.outStream( request ,response ,"export" + new Date().getTime()+ ".zip" ,in );
		
	}
	
	
	@GET
	@Path("delete/all/indexes")
	public void removeAllTheIndex() {
		this.orderService.removeAll();
		
	}
	
	
	private InputStream exportInputStream(String inputStr){
		InputStream answer =  null;
		Export export = new StringExport();
		answer= export.doExport(inputStr);
		return answer;
	}

	@PUT
	@Path("/publish")
	@RequiresRoles("Admin")
	@ExceptionHandler({UnauthorizedException.class})
	public Response publishAll(String publishList) {
		if(publishList == null || "".equals(publishList)) {
			return Response.status(412).entity("请传入publishList").type("text/plain").build();
		}
		
		String[] ids = publishList.substring(1, publishList.length()-1).split(",");
		
		// 如果存在已经发布过的词条，我是让所有词条都不发布，打回，还是只发布其他符合规则的，而不去发布该条信息
		for( String id : ids ) {
			id = id.replaceAll("\"", "");
			Word word = wordService.findWordById(id);
			Word publishedWord = wordService.findWordByMultipleParam(word.getWord(), word.getDictionary(), "published");
			if(publishedWord != null && !"".equals(publishedWord.getId())) {
				return Response.status(409).entity("该词条已被发布，不允许再次发布").type("text/plain").build();
			}
			
			word.setAuthor(new HashMap<String , Object>());
			word.setId("");
			word.setStatus("published");
			wordService.save(word);
			
			wordService.publishWord(id);
		}
		// FIXME
		LOGGER.info("成功发布信息");
		
		// 我要给你返回什么？
		return Response.status(200).entity("success").type("text/plain").build();
	}
	
	class Worker implements Runnable{

		private JSONArray jsonArray;
		private Dictionary dictionary;
		private boolean isOrder = false;
		private List<String> words = new LinkedList<String>();
		private String blockName ;
		
		public Worker(JSONArray jsonArray, Dictionary dictionary) {
			this.jsonArray = jsonArray;
			this.dictionary = dictionary;
		}
		
		public Worker(boolean isOrder, List<String> words, String blockName) {
			this.isOrder = isOrder;
			this.words = words;
			this.blockName = blockName;
		}
		
		@Override
		public void run() {

			if ( !isOrder ) {
		 		Map<String , Object> dicMap = new HashMap<String , Object>();
				dicMap.put("id", dictionary.getId());
				dicMap.put("dicGroup", dictionary.getDicGroup());
				dicMap.put("displayName", dictionary.getDisplayName());
				dicMap.put("shortName", dictionary.getShortName());
				dicMap.put("status", dictionary.getStatus());
				dicMap.put("createDateTime", dictionary.getCreateDateTime());
				List<Word> jsonList = new ArrayList<Word>();
				
				for(int i=0; i< jsonArray.length();i ++) {
					Date date = new Date();
					JSONObject jsonObject = jsonArray.getJSONObject(i);
					jsonObject.put("dictionary", dicMap);
					Word word = wordService.jsonToEntity(jsonObject.toString(), Word.class);
					word.setStatus("published");
					word.setImportflag(true);
					word.setCreateDateTime(date.getTime());
					word.setLastEditDateTime(date.getTime());
					jsonList.add(word);
				}
				
				int limit = 10000;
				Integer size = jsonList.size();
				
				if ( limit < size ) {
					int part = size / limit;
					System.out.println("共有:" + size +"条， ！" + "分为: "+part+ "批");
					
					for(int i=0;i<part;i++ ) {
						List<Word> listPage = jsonList.subList(0, limit);
						wordService.insertAll(listPage);
						jsonList.subList(0, limit).clear();
					}
					
					if(!jsonList.isEmpty()) {
						wordService.insertAll(jsonList);
					}
				} else {
					wordService.insertAll(jsonList);
				}
			} else{
				orderService.removeByBlockName(blockName);
				Iterator<String> iter = words.iterator();
				Long index = 1L;
				List<WordOrder> orders = new LinkedList<WordOrder>();
				while( iter.hasNext() ) {
					String word = iter.next();
					WordOrder order = new WordOrder();
					order.setOrder(index);
					order.setWord(word);
					order.setBlockName(blockName);
					index++;
					orders.add(order);
				}
				orderService.ensureIndex(WordOrder.class, "word", Order.ASCENDING);
				orderService.insertAll(orders);
			}
			System.gc();
		}
		
	}
}