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

    public RequestEntitiesJsonResponse requestEntitiesInView(Long centerX, Long centerY, Long width, Long height) {

        JsonResponseBuilder builder = new JsonResponseBuilder();

        return builder.build();

    }

}