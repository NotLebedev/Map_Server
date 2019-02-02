package ilich.ml.mapserver.model;

import ilich.ml.mapserver.JsonResponseBuilder;

/**
 * @author NotLebedev
 */
public class DatabaseProxy {

    private DatabaseProxy() {
    }

    private static class DatabaseProxyLazyHolder {
        static final DatabaseProxy INSTANCE = new DatabaseProxy();
    }

    public static DatabaseProxy getInstance() {
        return DatabaseProxyLazyHolder.INSTANCE;
    }

    public JsonResponseBuilder getImages(JsonResponseBuilder builder, Long centerX, Long centerY, Long width, Long height) {

        return builder;

    }

}