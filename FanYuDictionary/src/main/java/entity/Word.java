package entity;

import java.util.List;
import java.util.Map;

public class Word extends Entity{

	private Map<String , Object> dictionary;
	
	private List<Map<String , String>> duiyingciList;
	
	private String shiyi;
	
	private List<String> guanlianciList;
	
	private String baike;
	
	private boolean importflag;
	
	private String word;
	
	private String bianxing;
	
	private String xici;
	
	private Map<String , Object> author;
	
	private long lastEditDateTime;
	
	private String liju;
	
	private long createDateTime;
	
	private String states;   //created updated checked published

	private String cixing;
	
	private String template;
	

	public String getCixing() {
		return cixing;
	}

	public void setCixing(String cixing) {
		this.cixing = cixing;
	}

	public String getStates() {
		return states;
	}

	public void setStates(String states) {
		this.states = states;
	}

	public Map<String, Object> getDictionary() {
		return dictionary;
	}

	public void setDictionary(Map<String, Object> dictionary) {
		this.dictionary = dictionary;
	}

	public List<Map<String, String>> getDuiyingciList() {
		return duiyingciList;
	}

	public void setDuiyingciList(List<Map<String, String>> duiyingciList) {
		this.duiyingciList = duiyingciList;
	}

	public String getShiyi() {
		return shiyi;
	}

	public void setShiyi(String shiyi) {
		this.shiyi = shiyi;
	}

	public List<String> getGuanlianciList() {
		return guanlianciList;
	}

	public void setGuanlianciList(List<String> guanlianciList) {
		this.guanlianciList = guanlianciList;
	}

	public String getBaike() {
		return baike;
	}

	public void setBaike(String baike) {
		this.baike = baike;
	}

	public boolean isImportflag() {
		return importflag;
	}

	public void setImportflag(boolean importflag) {
		this.importflag = importflag;
	}


	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

	public String getBianxing() {
		return bianxing;
	}

	public void setBianxing(String bianxing) {
		this.bianxing = bianxing;
	}

	public String getXici() {
		return xici;
	}

	public void setXici(String xici) {
		this.xici = xici;
	}

	public Map<String, Object> getAuthor() {
		return author;
	}

	public void setAuthor(Map<String, Object> author) {
		this.author = author;
	}

	public long getLastEditDateTime() {
		return lastEditDateTime;
	}

	public void setLastEditDateTime(long lastEditDateTime) {
		this.lastEditDateTime = lastEditDateTime;
	}

	public String getLiju() {
		return liju;
	}

	public void setLiju(String liju) {
		this.liju = liju;
	}

	public long getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(long createDateTime) {
		this.createDateTime = createDateTime;
	}
	
	
	
	
}
