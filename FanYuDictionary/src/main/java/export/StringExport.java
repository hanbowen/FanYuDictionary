package export;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

public class StringExport extends AbstractExport{

	@Override
	public InputStream doExport(String inputStr) {
		InputStream answer = null;
		try
		{
			answer = new ByteArrayInputStream( inputStr.getBytes( "UTF-8" ) );
		}
		catch ( UnsupportedEncodingException e )
		{
			e.printStackTrace();
		}
		
		return answer ;
	}

	@Override
	public String fileSuffixName() {
		return "export_data";
	}
	
	
	
}
