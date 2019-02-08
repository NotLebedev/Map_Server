package ilich.ml.mapserver.web.controllers;

import ilich.ml.mapserver.web.RequestProxy;
import ilich.ml.mapserver.web.responses.FailureJsonResponse;
import ilich.ml.mapserver.web.responses.JsonResponse;
import ilich.ml.mapserver.web.responses.RequestEntitiesJsonResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

/**
 * @author NotLebedev
 */
@RestController
public class GetController {

    private final RequestProxy requestProxy = RequestProxy.getInstance();

    /**
     * Get request mapping
     * @param x upper left corner of view
     * @param y upper left corner of view
     * @param width full width
     * @param height full height
     * @return {@link JsonResponse} response container type of
     * {@link RequestEntitiesJsonResponse}
     * or {@link FailureJsonResponse}
     */
    @RequestMapping("/requestEntities")
    public JsonResponse requestEntities(Long x, Long y, Long width, Long height) {

        if(x == null || y == null || width == null || height == null)
            return new FailureJsonResponse();

        return requestProxy.requestEntitiesInView(x, y, width, height);

    }

    @ExceptionHandler({ Exception.class })
    public JsonResponse handleAll(Exception ex, WebRequest request) {
        return new FailureJsonResponse();
    }

}
