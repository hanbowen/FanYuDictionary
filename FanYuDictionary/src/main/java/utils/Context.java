package utils;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;



/**
 * 
 * 系统配置上下文
 */
public class Context {

	private static Context context;
	
	private Properties properties = null;
	
	// import 是关键字, 所以起名为inport
	private Map<String, JSONObject> inport= null;
	
	private boolean syntax_error = false;
	
	public boolean isSyntax_error() {
		return syntax_error;
	}


	public void setSyntax_error(boolean syntax_error) {
		this.syntax_error = syntax_error;
	}


	private String jsonText;
	
	public static Context getInstance() {
		if(context == null){
			context = new Context();
		}
		return context;
	}
	
	
	private Context(){
		Resource resource = null;
		try {
			DefaultResourceLoader defaultResourceLoader = new DefaultResourceLoader();
			resource = defaultResourceLoader.getResource("config-context/framework.properties.xml");
			properties = loadFile(resource.getFile());
			parseImport(properties.getProperty("import"));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void  parseImport(String string){
		String sjson = null;
		// 给导入扩展留口，按照prefix读取多个文件
		if(string.contains("import.json")){
			try {
				string = string.trim();
				DefaultResourceLoader defaultResourceLoader = new DefaultResourceLoader();
				File file = defaultResourceLoader.getResource("config-context/"+string).getFile();
				BufferedReader reader = new BufferedReader(  new InputStreamReader( new FileInputStream(file))); 
				String line = null;
				StringBuilder sb = new StringBuilder();
				while( (line = reader.readLine())!= null ){
					sb.append(line).append("\n");
				}
				reader.close();
				sjson =  sb.toString();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}else{
			sjson = string;
		}
		
		// 判断格式合法性 以及判重
		if(sjson != null ){
			
			// 判断json数据中是否有 
			inport = new LinkedHashMap<String, JSONObject>();
			JSONTokener jt = null;
			JSONArray ja = null;
			try{
				jt = new JSONTokener(sjson);
				ja = new JSONArray( jt );
			}catch( Exception e) {
				e.printStackTrace();
				this.syntax_error = true;
			}
			
			for(int i=0,size = ja.length(); i < size ;i++ ){
				JSONObject json = ja.getJSONObject(i);
				String id = null ;
				if(json.has("id")){
					id  = json.getString("id");
				}else{
					id =json.hashCode() +"";
				}
				json.put("id", id);
				inport.put(id, json);
			}
		}
		
		this.jsonText = sjson;
		
	}
	
	
	private static Properties loadFile(File path) throws Exception{
	     Properties prop=null;
	     BufferedInputStream inBuff=null;
	     try{
	    	 inBuff =new BufferedInputStream(new FileInputStream(path));
	         prop=new Properties();
	         if(path.getName().endsWith(".xml"))
	             prop.loadFromXML(inBuff);
	         else
	             prop.load(inBuff);
	         
	     }finally{
 		 if(inBuff!=null){
 			 inBuff.close();
 		 }
	     }
	     return prop;
	}
	
	
	public void appendProperties(Properties properties){
		this.properties.putAll(properties);
	}

	/**
	 *  获取配置
	 * @param key
	 * @return
	 */
	public String getEntryValue(String key) {
		
		return properties.getProperty(key) ;
	}
	
	public int getIntEntryValue(String key) {
		int answer = -1 ;
		String tmp = properties.getProperty(key) ;
		if(tmp != null && tmp.length() > 0){
			try{
				answer = Integer.parseInt(tmp);		
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		return answer ;
	}
	
	public String getEntryValue(String key,String defaultValue) {
		
		return properties.getProperty(key,defaultValue) ;
	}
	
	public Map<String, JSONObject> getInport() {
		return inport;
	}


	public String getJsonText() {
		return jsonText;
	}


}
