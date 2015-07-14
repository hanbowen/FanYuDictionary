package utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;

public class CompressUtil {
	
	private static final int BUFFER = 2048;

	/**
	 * 压缩输入流
	 * @param name
	 * @param src
	 * @return
	 */
	public static ByteArrayOutputStream compress(Map<String , InputStream> map){
		ByteArrayOutputStream answer = new ByteArrayOutputStream() ;
		ZipOutputStream zout = null;
		try{
			zout = new ZipOutputStream(new BufferedOutputStream( answer ));
			byte[] data  = new byte[BUFFER];
			for(Map.Entry<String , InputStream> en : map.entrySet() ){
				final BufferedInputStream origin = new BufferedInputStream(en.getValue(),BUFFER);
				zout.putNextEntry(new ZipEntry(en.getKey()));
				int count ;
				while((count = origin.read(data,0,BUFFER))!=-1 ){
					zout.write(data,0,count);
				}
				origin.close();
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if( zout != null ){
				try {
					zout.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return answer;
	}
}
