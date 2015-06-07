package enumeration;


/**
 * match枚举
 */
public enum MatchProperty {

	
	SHOU( "shou", "首" ),

	ZHONG( "zhong", "中" ),
	
	WEI( "wei", "尾 " ),
	
	JINGQUE( "jingque", "精确" );
	

	private final String	value;

	private final String	show;

	/** 
	 * 
	 * @param  value {@code   String}
	 * 
	 * @see    String
	 */
	private MatchProperty(String value, String show)
	{
		this.value = value;
		this.show = show;
	}

	public static MatchProperty getInstance(String name)
	{
		MatchProperty answer = null;
		if ( name == null )
		{
			answer = null;
		}
		else if ( "shou".equals( name ) )
		{
			answer = SHOU;
		}
		else if ( "zhong".equals( name ) )
		{
			answer = ZHONG;
		}
		else if ( "wei".equals( name ) )
		{
			answer = WEI;
		}
		else if ( "jingque".equals( name ) )
		{
			answer = JINGQUE;
		}
		return answer;
	}
	
	/**
	 * 按照match类型获取相应word的正则表达式形式
	 * @param name
	 * @param in
	 * @return
	 */
	public static String getRegex(MatchProperty name , String word) 
	{
		String answer = null;
		
		if ( name == null ) {
			answer = null;
		}
		else if ( SHOU.equals( name ) )
		{
			answer = word + ".*";
		}
		else if ( ZHONG.equals( name ) )
		{
			answer = ".*" + word + ".*";
		}
		else if ( WEI.equals( name ) )
		{
			answer = ".*" + word;
		}
		else if ( JINGQUE.equals( name ) )
		{
			answer = word;
		}
		
		return answer;
	}

	/** 
	 * 获取字段名称
	 * 
	 * @return {@code  Short}
	 */
	public final String getValue()
	{
		return this.value;
	}

	/** 
	 * 获取前台显示名称
	 * 
	 * @return {@code  String}
	 */
	public final String getShow()
	{
		return this.show;
	}

	/** 
	 * 
	 * @return {@code  String}
	 */
	@Override
	public String toString()
	{
		return this.value;
	}
	
	
	
	/**
	 * 获取该enum类型的所有value
	 * @return
	 */
	public static String[] getValues() {
		
		String[] valueArray = new String[MatchProperty.values().length]; 
		int i = 0;
		for(MatchProperty property : MatchProperty.values()) {
			valueArray[i] = property.getValue();
			i++;
		}
		
		return valueArray;
	}
	
	/**
	 * 获取该enum类型的所有show
	 * @return
	 */
	public static String[] getShows() {

		String[] showArray = new String[MatchProperty.values().length]; 
		int i = 0;
		for(MatchProperty property : MatchProperty.values()) {
			showArray[i] = property.getShow();
			i++;
		}
		
		return showArray;
	}
	
	

}
