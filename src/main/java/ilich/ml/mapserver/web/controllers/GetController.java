package ilich.ml.mapserver.web.controllers;

import ilich.ml.mapserver.web.responses.RequestEntitiesJsonResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author NotLebedev
 */
@RestController
public class GetController {

    @RequestMapping("/requestEntities")
    public RequestEntitiesJsonResponse requestEntities(Long x, Long y, Long width, Long height) {

        return new RequestEntitiesJsonResponse(x, y, width, height, new RequestEntitiesJsonResponse.Entity[] {
                new RequestEntitiesJsonResponse.Image(100L, 100L, 50L, 50L, "qwe.jpg"),
                new RequestEntitiesJsonResponse.Image(100L, 100L, 50L, 50L, "qwe.jpg")
        });

    }

}
