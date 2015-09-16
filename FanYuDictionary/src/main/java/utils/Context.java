package utils;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;



/**
 * 
 * 系统配置上下文
 */
public class Context {

//	private static Context context;
	
	private Properties properties = null;
	
	public Properties getProperties() {
		return properties;
	}


	public void setProperties(Properties properties) {
		this.properties = properties;
	}


	// import 是关键字, 所以起名为inport
	private Map<String, JSONObject> inport= null;
	
	private Map<String , JSONObject> export = null;
	
	private boolean syntax_error = false;
	
	public boolean isSyntax_error() {
		return syntax_error;
	}

	private String errorMessage;
	

	public String getErrorMessage() {
		return errorMessage;
	}


	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}


	public void setSyntax_error(boolean syntax_error) {
		this.syntax_error = syntax_error;
	}


	private String jsonText;
	
	/*public static Context getInstance() {
		if(context == null){
			context = new Context();
		}
		return context;
	}*/
	
	
	public Context(){
		Resource resource = null;
		try {
			DefaultResourceLoader defaultResourceLoader = new DefaultResourceLoader();
			resource = defaultResourceLoader.getResource("config-context/framework.properties.xml");
			properties = loadFile(resource.getFile());
//			parseImport(properties.getProperty("import"));
//			parseExport(properties.getProperty("export"));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void  parseImport(String string) throws IOException{
		String sjson = null;
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
		
		// 判断格式合法性 以及判重
		if(sjson != null ){
			
			// 判断json数据中是否有 
			inport = new LinkedHashMap<String, JSONObject>();
			JSONTokener jt = null;
			JSONArray ja = null;
			try{
				jt = new JSONTokener(sjson);
				ja = new JSONArray( jt );
			}catch( JSONException e) {
				e.printStackTrace();
				this.syntax_error = true;
				this.setErrorMessage(e.getMessage());
				return;
			}
			
			for(int i=0,size = ja.length(); i < size ;i++ ){
				JSONObject json = ja.getJSONObject(i);
				String id = null ;
				if(json.has("id")){
					id  = json.getString("id");
				}else{
					id =json.hashCode() +"";
				}
				inport.put(id, json);
			}
		}
		
		this.jsonText = sjson;
		
	}
	
	public void  parseExport(String string){
		String sjson = null;
		if(string.contains("export.json")){
			try {
				string = string.trim();
				DefaultResourceLoader defaultResourceLoader = new DefaultResourceLoader();
				File file = defaultResourceLoader.getResource("config-context/"+string).getFile();
				BufferedReader reader = new BufferedReader(  new InputStreamReader( new FileInputStream(file),"UTF-8" )); 
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
		if(sjson != null ){
			export = new LinkedHashMap<String, JSONObject>();
			JSONTokener jt = new JSONTokener(sjson);
			JSONArray  ja = new JSONArray( jt );
			for(int i=0,size = ja.length(); i < size ;i++ ){
				JSONObject json = ja.getJSONObject(i);
				String id = null ;
				if(json.has("id")){
					id  = json.getString("id");
				}else{
					id =json.hashCode() +"";
				}
				json.put("id", id);
				export.put(id, json);
			}
		}
		
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
	
	public Map<String , JSONObject> getExport() {
		return export;
	}


	public String getJsonText() {
		return jsonText;
	}


}
