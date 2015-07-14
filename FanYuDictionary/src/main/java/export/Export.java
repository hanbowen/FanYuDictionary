package export;

import java.io.InputStream;

public interface Export {

	/**
	 * 导出数据接口
	 * @param list
	 * @param names
	 * @param type
	 * @return
	 */
	public InputStream doExport(String inputStr);
	
	/**
	 * 导出文件名称
	 * @return
	 */
	public String exportFileName();
}
