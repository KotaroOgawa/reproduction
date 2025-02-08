package user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {

    @RequestMapping("/home")
    public String home() {
        return "home.html";
    }

    @RequestMapping("/search")
    public String search() {
        return "search.html";
    }

//    @RequestMapping("/output")
//    public String result(@RequestParam("number") String number, Model model) {
//        String name = "コントローラー太郎";
//        model.addAttribute("number", number);
//        model.addAttribute("name", name);
//    return "output.html";
//    }
}
