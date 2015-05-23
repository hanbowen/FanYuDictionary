package controller;

import java.text.SimpleDateFormat;

import javax.print.attribute.standard.DateTimeAtCompleted;
import javax.xml.crypto.Data;


import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/welcome")
public class TestController {
	@RequestMapping(method = RequestMethod.GET)
    public String printWelcome(ModelMap model) {
 
        model.addAttribute("message", "Spring3 MVC ����");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy��MM��dd��");
        model.addAttribute("date", dateFormat.format(new java.util.Date()));
        return "hello";
    }

}
