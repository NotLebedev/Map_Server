package ilich.ml.mapserver.model;

import ilich.ml.mapserver.JsonResponseBuilder;
import ilich.ml.mapserver.model.repositories.OnMapImageRepository;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * @author NotLebedev
 */
public class DatabaseProxy implements ApplicationContextAware {

    private OnMapImageRepository imageRepository;
    
    private DatabaseProxy() {
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        imageRepository = (OnMapImageRepository) applicationContext.getBean("RepositoryManager");
    }

    private static class DatabaseProxyLazyHolder {
        static final DatabaseProxy INSTANCE = new DatabaseProxy();
    }

    public static DatabaseProxy getInstance() {
        return DatabaseProxyLazyHolder.INSTANCE;
    }

    public JsonResponseBuilder getImages(JsonResponseBuilder builder, Long centerX, Long centerY, Long width, Long height) {

        Long x1 = centerX - width/2;
        Long x2 = centerX + width/2;
        Long y1 = centerY - height/2;
        Long y2 = centerY + height/2;
        
        return builder;

    }

}