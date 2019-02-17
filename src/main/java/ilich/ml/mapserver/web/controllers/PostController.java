package ilich.ml.mapserver.web.controllers;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author NotLebedev
 */
@RestController
public class PostController {

    @RequestMapping(value = "/addEntities" , method = RequestMethod.POST)
    public String postAddEntities(@RequestBody String json) {

        return "{\"status\":\"success\"}";

    }

}
