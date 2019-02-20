package ilich.ml.mapserver.web.controllers;

import ilich.ml.mapserver.auth.Authenticator;
import ilich.ml.mapserver.web.RequestProxy;
import ilich.ml.mapserver.web.requests.ModifyJsonRequest;
import ilich.ml.mapserver.web.responses.FailureJsonResponse;
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

    private final RequestProxy requestProxy = RequestProxy.getInstance();
    private final Authenticator auth = Authenticator.getInstance();

    @RequestMapping(value = "/addEntities" , method = RequestMethod.POST)
    public JsonResponse postAddEntities(@RequestBody ModifyJsonRequest json) {

        if(auth.loginValid(json.getLogin(), json.getPassword())) {
            requestProxy.modifyEntities(json);
            return new SuccessJsonResponse();
        }else
            return new FailureJsonResponse();

    }

}
