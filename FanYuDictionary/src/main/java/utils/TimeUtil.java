package utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


public class TimeUtil {
	static public final String FORMAT_DATE_ONLY_CH = "yyyy年MM月dd日";
	static public final String FORMAT_MONTH_ONLY = "yyyy-MM";
	static public final String FORMAT_DATE_ONLY = "yyyy-MM-dd";
	static public final String FORMAT_DATE_HOUR = "yyyy-MM-dd HH:mm";
	static public final String FORMAT_TIME_ONLY = "HH:mm:ss";
	static public final String FORMAT_COMPACT = "yyMMddHHmmssSSS";
	static public final String FORMAT_NORMAL = "yyyy-MM-dd HH:mm:ss";
	static public final String FORMAT_DETAIL = "yyyy-MM-dd HH:mm:ss.SSS";
	static public final String FORMAT_NORMAL_1 = "yyyy-MM-dd-HH-mm-ss";
	
	static public final String FORMAT_YEAR = "yyyy";
	
	static public final String FORMAT_MONTH = "MM";
	
	
	static public final String FORMAT_TIME_HOUR = "HH";
	static public final String FORMAT_TIME_MINUTE ="mm";
	
	static public final long DATE_SECOND=86400;//一天有86400秒 
	static public final long DATE_MINUTE=1440;//一天有1440分
	static public final long MINUTE_SECOND=60;//一天有60分
	
	
	public static Date parse(String str, String format) {
		try {
			SimpleDateFormat sf = new SimpleDateFormat(format);
			return sf.parse(str);
		} catch (ParseException e) {
			//e.printStackTrace();
			return null;
		}
	}

	public static String format(String format) {
		
		return format(new Date(),format);
	}
	
	public static String format(Date date, String format) {
		try {
			SimpleDateFormat sf = new SimpleDateFormat(format);
			return sf.format(date);
		} catch (Exception e) {
			return null;
		}
	}

	public static boolean isExpire(String strTime, String strExpiredTime) {
		Date time = parse(strTime, FORMAT_NORMAL);
		Date expiredTime = parse(strExpiredTime, FORMAT_NORMAL);

		return (time.compareTo(expiredTime) >= 0);
	}

	/**
	 * 生成制定日期的Date对象，从0点开始
	 * 
	 * @param year
	 * @param month
	 * @param days
	 * @return
	 */
	public static Date createDate(int year, int month, int days) {
		Calendar cal = Calendar.getInstance();
		cal.set(year, month - 1, days, 0, 0, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}
	
	/**
	 * 计算时间差
	 * 
	 * @param beginTime
	 *            开始时间，格式：yyyy-MM-dd HH:mm:ss
	 * @param endTime
	 *            结束时间，格式：yyyy-MM-dd HH:mm:ss
	 * @return 从开始时间到结束时间之间的时间差（秒）
	 */
	public static long getTimeDifference(String beginTime, String endTime) {
		long between = 0;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		Date end = null;
		Date begin = null;
		try {// 将截取到的时间字符串转化为时间格式的字符串
			end = sdf.parse(endTime);
			begin = sdf.parse(beginTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		between = (end.getTime() - begin.getTime()) / 1000;// 除以1000是为了转换成秒

		return between;
	}
	
	
	public static String getTimeDifference(Date beginTime, Date endTime) {
		if(beginTime==null || endTime==null){
			return "未知";
		}
		long between  = endTime.getTime()  -beginTime.getTime() ;
		if(between<=0){
			return null;
			
		}
		between = between / 1000;// 除以1000是为了转换成秒
		long date = between / DATE_SECOND;
		long hour = (between - date * DATE_SECOND)/3600;
		long minute = (between -date * DATE_SECOND - hour*3600) / 60;
		long sec = (between -date * DATE_SECOND - hour*3600 - minute*60) ;
		
		return  date+"天"+hour + "小时" + minute + "分钟"+ sec + "秒";
	}
	
	private static boolean compareTo(Calendar datebegin ,Calendar dateend ){
		 return datebegin.get(Calendar.DAY_OF_MONTH)>dateend.get(Calendar.DAY_OF_MONTH);
	}
	
	/**
	 * 计算年的差
	 * @param begin 开始时间
	 * @param end 结束时间
	 * @param format 时间格式
	 * @return
	 */
	public static int  differenceYear(String begin ,String end,String format){
		SimpleDateFormat df= new SimpleDateFormat(format);
		Calendar datebegin = Calendar.getInstance();
		Calendar dateend = Calendar.getInstance();
		try {
			datebegin.setTime(df.parse(begin));
			dateend.setTime(df.parse(end));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return differenceYear(datebegin, dateend);
	}
	
	/**
	 * 计算月差
	 * @param begin 开始时间
	 * @param end 结束时间 
	 * @param format 时间格式
	 * @return
	 */
	public static int  differenceMonth(String begin ,String end,String format){
		SimpleDateFormat df= new SimpleDateFormat(format);
		Calendar datebegin = Calendar.getInstance();
		Calendar dateend = Calendar.getInstance();
		try {
			datebegin.setTime(df.parse(begin));
			dateend.setTime(df.parse(end));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return differenceMonth(datebegin, dateend);
	}
	
	/**
	 * 计算年的差
	 * @param datebegin
	 * @param dateend
	 * @return
	 */
	public static int  differenceYear(Calendar datebegin ,Calendar dateend){
		
		 int year1= datebegin.get(Calendar.YEAR);
		 int year2= dateend.get(Calendar.YEAR);
		 
		 int month1= datebegin.get(Calendar.MONTH);
		 int month2= dateend.get(Calendar.MONTH);
		 int year  =  year2 - year1;
		 if( compareTo(datebegin,dateend) )month2 -=1;
		 if( month1>month2)
			 year -=1;
		 return year;
	}
	
	/**
	 * 计算月差
	 * @param datebegin
	 * @param dateend
	 * @return
	 */
	public static int  differenceMonth(Calendar datebegin ,Calendar dateend){
		 int month1= datebegin.get(Calendar.MONTH);
		 int month2= dateend.get(Calendar.MONTH);
		 int month =0;
		 if( compareTo(datebegin,dateend) )month2 -=1;
		 if(month2 >= month1)
			 month = month2-month1;
		 else if(month2 < month1)
			 month = 12+ month2-month1;
		 
		 return month ;
	}
	
	/**
	 * 
	 * @param begin
	 * @param end
	 * @param format
	 * @return
	 */
	public static String getDifferenceDate(String begin ,String end,String format){
		int year = differenceYear(begin,end,format) ;
		int month = differenceMonth(begin,end,format) ;
		StringBuilder sb = new StringBuilder();
		if( year > 0 ){
			sb.append(year).append("年");
		}
		if( month > 0 ){
			sb.append(month).append("月");
		}
		return sb.toString();
	}
	
	/**
	 * 
	 * @param datebegin
	 * @param dateend
	 * @return
	 */
	public static String getDifferenceDate(Calendar datebegin ,Calendar dateend){
		int year = differenceYear(datebegin,dateend) ;
		int month = differenceMonth(datebegin,dateend) ;
		StringBuilder sb = new StringBuilder();
		if( year > 0 ){
			sb.append(year).append("年");
		}
		if( month > 0 ){
			sb.append(month).append("月");
		}
		return sb.toString();
	}
}
