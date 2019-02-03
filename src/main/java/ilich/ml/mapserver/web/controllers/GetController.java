package ilich.ml.mapserver.web.controllers;

import ilich.ml.mapserver.web.RequestProxy;
import ilich.ml.mapserver.web.responses.RequestEntitiesJsonResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author NotLebedev
 */
@RestController
public class GetController {

    private RequestProxy requestProxy = RequestProxy.getInstance();

    @RequestMapping("/requestEntities")
    public RequestEntitiesJsonResponse requestEntities(Long x, Long y, Long width, Long height) {

        return requestProxy.requestEntitiesInView(x, y, width, height);

    }

}
