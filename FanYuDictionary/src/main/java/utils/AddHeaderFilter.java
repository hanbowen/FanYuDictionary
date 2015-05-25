package utils;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class AddHeaderFilter implements Filter {  
        FilterConfig fc;   
      
        public void doFilter(ServletRequest req, ServletResponse res,  
                FilterChain chain) throws IOException, ServletException {  
            HttpServletResponse response = (HttpServletResponse) res;  
            System.out.println("AddHeaderFilter");
            // set the provided HTTP response parameters  
            for (Enumeration e = fc.getInitParameterNames(); e.hasMoreElements();) {  
                String headerName = (String) e.nextElement();  
                response.addHeader(headerName, fc.getInitParameter(headerName));  
            }  
            
            // pass the request/response on  
            chain.doFilter(req, response);  
        }   
      
        public void init(FilterConfig filterConfig) {  
            this.fc = filterConfig;  
        }   
      
        public void destroy() {  
            this.fc = null;  
        }   
      
    }  