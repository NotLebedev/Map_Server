package ilich.ml.mapserver.web.controllers;

import ilich.ml.mapserver.web.requests.AddEntitiesJsonRequest;
import ilich.ml.mapserver.web.responses.JsonResponse;
import ilich.ml.mapserver.web.responses.SuccessJsonResponse;
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
    public JsonResponse postAddEntities(@RequestBody AddEntitiesJsonRequest json) {

        System.out.println(json.toString());

        return new SuccessJsonResponse();

    }

}
