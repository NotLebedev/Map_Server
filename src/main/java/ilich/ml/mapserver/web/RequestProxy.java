package ilich.ml.mapserver.web;

import ilich.ml.mapserver.JsonResponseBuilder;
import ilich.ml.mapserver.model.DatabaseProxy;
import ilich.ml.mapserver.web.responses.RequestEntitiesJsonResponse;

/**
 * @author NotLebedev
 */
public class RequestProxy {

    private DatabaseProxy db = DatabaseProxy.getInstance();

    private RequestProxy() {
    }

    private static class RequestProxyLazyHolder {
        static final RequestProxy INSTANCE = new RequestProxy();
    }

    public static RequestProxy getInstance() {
        return RequestProxyLazyHolder.INSTANCE;
    }

    /**
     * Get json response container with all entities in specified view
     * @param x1 upper left corner of view
     * @param y1 upper left corner of view
     * @param width full width of view
     * @param height full height of view
     * @return {@link RequestEntitiesJsonResponse} container with entities found
     */
    public RequestEntitiesJsonResponse requestEntitiesInView(Long x1, Long y1, Long width, Long height) {

        JsonResponseBuilder builder = new JsonResponseBuilder();

        builder.centerX(x1).centerY(y1).width(width).height(height);

        builder = db.getImages(builder, x1, y1, width, height);

        return builder.build();

    }

}