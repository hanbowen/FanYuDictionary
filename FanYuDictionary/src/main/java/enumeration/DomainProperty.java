package enumeration;


public enum DomainProperty implements BaseEnum{

	
	DUIYINGCI( "duiyingci", "首" ),

	BIANXING( "bianxing", "中" ),
	
	LIJU( "liju", "尾 " ),
	
	DANCI( "danci", "尾 " ),

	QUANWEN( "quanwen", "精确" );
	

	private final String	value;

	private final String	show;

	/** 
	 * 
	 * @param  value {@code   String}
	 * 
	 * @see    String
	 */
	private DomainProperty(String value, String show)
	{
		this.value = value;
		this.show = show;
	}

	public static DomainProperty getInstance(String name)
	{
		DomainProperty answer = null;
		if ( name == null )
		{
			answer = null;
		}
		else if ( "duiyingci".equals( name ) )
		{
			answer = DUIYINGCI;
		}
		else if ( "bianxing".equals( name ) )
		{
			answer = BIANXING;
		}
		else if ( "liju".equals( name ) )
		{
			answer = LIJU;
		}
		else if ( "danci".equals( name ) )
		{
			answer = DANCI;
		}
		else if ( "quanwen".equals( name ) )
		{
			answer = QUANWEN;
		}
		return answer;
	}
	
	public static String getKey(DomainProperty name) {
		String answer = null;
		if(name == null) 
		{
			answer = null;
		}
		else if ( DUIYINGCI.equals( name ) )
		{
			answer = "duiyingciList.value";
		}
		else if ( BIANXING.equals( name ) )
		{
			answer = "bianxing";
		}
		else if ( LIJU.equals( name ) )
		{
			answer = "liju";
		}
		else if ( DANCI.equals( name ) )
		{
			answer = "word";
		}
		else if ( QUANWEN.equals( name ) )
		{
			answer = "quanwen";
		}
		
		return answer;
	}

	/** 
	 * 获取字段名称
	 * 
	 * @return {@code  Short}
	 */
	@Override
	public final String getValue()
	{
		return this.value;
	}

	/** 
	 * 获取前台显示名称
	 * 
	 * @return {@code  String}
	 */
	@Override
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
		
		String[] valueArray = new String[DomainProperty.values().length]; 
		int i = 0;
		for(DomainProperty property : DomainProperty.values()) {
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

		String[] showArray = new String[DomainProperty.values().length]; 
		int i = 0;
		for(DomainProperty property : DomainProperty.values()) {
			showArray[i] = property.getShow();
			i++;
		}
		
		return showArray;
	}
	
	

}
