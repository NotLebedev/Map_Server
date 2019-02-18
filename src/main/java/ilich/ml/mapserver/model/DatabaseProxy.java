package ilich.ml.mapserver.model;

import ilich.ml.mapserver.JsonResponseBuilder;
import ilich.ml.mapserver.model.entities.OnMapImageEntity;
import ilich.ml.mapserver.model.repositories.OnMapImageRepository;
import ilich.ml.mapserver.model.repositories.RepositoryManagerBean;
import ilich.ml.mapserver.web.requests.ModifyJsonRequest;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

/**
 * @author NotLebedev
 */
@Component
public class DatabaseProxy {

    private static OnMapImageRepository imageRepository;
    
    private DatabaseProxy() {
    }

    @Autowired
    public void context(ApplicationContext applicationContext) {
        imageRepository = ((RepositoryManagerBean) applicationContext.getBean("RepositoryManager")).getOnMapImageRepository();
    }

    private static class DatabaseProxyLazyHolder {
        static final DatabaseProxy INSTANCE = new DatabaseProxy();
    }

    public static DatabaseProxy getInstance() {
        return DatabaseProxyLazyHolder.INSTANCE;
    }

    public JsonResponseBuilder getImages(JsonResponseBuilder builder, Long x1, Long y1, Long width, Long height) {

        Long x2 = x1 + width;
        Long y2 = y1 + height;

        builder.addEntities(imageRepository.findOverlappingRectangle(x1, y1, x2, y2));

        return builder;

    }

    public void addImage(ModifyJsonRequest.ImageAdded image) {

        OnMapImageEntity entity = new OnMapImageEntity(
                image.getX1(), image.getY1(),
                image.getWidth(), image.getHeight(),
                image.getUrl()
        );

        imageRepository.save(entity);

    }

    public void updateImage(ModifyJsonRequest.ImageEdited image) {

        imageRepository.updateImage(image.getId(),
                image.getX1(), image.getY1(),
                image.getX1() + image.getWidth(), image.getY1() + image.getHeight(),
                image.getX1() + image.getWidth()/2, image.getY1() + image.getHeight()/2,
                image.getUrl());

    }

}