package export;

import utils.TimeUtil;


public abstract class AbstractExport implements Export{

	
	@Override
	public String exportFileName() {
		return fileName()+fileSuffixName() ;
	}
	
	public  String fileName(){
		return TimeUtil.format( TimeUtil.FORMAT_DATE_ONLY ) + "_ExportData.";
	}
	
	/**
	 * 文件后缀名称
	 * @return
	 */
	public abstract String fileSuffixName();
}
