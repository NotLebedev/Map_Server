package ilich.ml.mapserver.model;

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

}