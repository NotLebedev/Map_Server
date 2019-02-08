package ilich.ml.mapserver;

import ilich.ml.mapserver.model.entities.OnMapImageEntity;
import ilich.ml.mapserver.web.responses.RequestEntitiesJsonResponse;

import java.util.ArrayList;
import java.util.List;


/**
 * Class creating web.responses classes from database queries
 *
 * @author NotLebedev
 */
public class JsonResponseBuilder {

    private Long x1 = null;
    private Long y1 = null;
    private Long width = null;
    private Long height = null;
    private List<RequestEntitiesJsonResponse.Entity> entities = null;

    public JsonResponseBuilder x1(Long x1) {

        this.x1 = x1;
        return this;

    }

    public JsonResponseBuilder y1(Long y1) {

        this.y1 = y1;
        return this;

    }

    public JsonResponseBuilder width(Long width) {

        this.width = width;
        return this;

    }

    public JsonResponseBuilder height(Long height) {

        this.height = height;
        return this;

    }

    public JsonResponseBuilder addEntities(List<OnMapImageEntity> images) {

        if(entities == null) {
            entities = new ArrayList<>(images.size());
        }

        images.forEach(image -> {
            Long x1 = image.getX1();
            Long y1 = image.getY1();

            Long width = Math.abs(image.getX1() - image.getX2());
            Long height = Math.abs(image.getY1() - image.getY2());

            String url = image.getImageUrl();

            entities.add(new RequestEntitiesJsonResponse.Image(
                    x1, y1, width, height, url));
        });

        return this;

    }

    public RequestEntitiesJsonResponse build() {

        x1 = setNull(x1, 0L);
        y1 = setNull(y1, 0L);
        height = setNull(height, 0L);
        width = setNull(width, 0L);
        entities = setNull(entities, new ArrayList<>(0));

        return new RequestEntitiesJsonResponse(x1, y1, width, height,
                entities.toArray(new RequestEntitiesJsonResponse.Entity[0]));

    }

    private static <T> T setNull(T test, T value) {

        return test == null ? value : test;

    }

}
