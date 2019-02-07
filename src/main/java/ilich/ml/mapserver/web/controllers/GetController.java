package ilich.ml.mapserver.web.controllers;

import ilich.ml.mapserver.web.RequestProxy;
import ilich.ml.mapserver.web.responses.FailureJsonResponse;
import ilich.ml.mapserver.web.responses.JsonResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author NotLebedev
 */
@RestController
public class GetController {

    private RequestProxy requestProxy = RequestProxy.getInstance();

    @RequestMapping("/requestEntities")
    public JsonResponse requestEntities(Long x, Long y, Long width, Long height) {

        if(x == null || y == null || width == null || height == null)
            return new FailureJsonResponse();

        return requestProxy.requestEntitiesInView(x, y, width, height);

    }

}
