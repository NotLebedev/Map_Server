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

    private Long centerX = null;
    private Long centerY = null;
    private Long width = null;
    private Long height = null;
    private List<RequestEntitiesJsonResponse.Entity> entities = null;

    public JsonResponseBuilder centerX(Long centerX) {

        this.centerX = centerX;
        return this;

    }

    public JsonResponseBuilder centerY(Long centerY) {

        this.centerY = centerY;
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
            Long centerX = image.getXCoordinate();
            Long centerY = image.getYCoordinate();

            Long width = Math.abs(image.getX1() - image.getX2());
            Long height = Math.abs(image.getY1() - image.getY2());

            String url = image.getImageUrl();

            entities.add(new RequestEntitiesJsonResponse.Image(
                    centerX, centerY, width, height, url));
        });

        return this;

    }

    public RequestEntitiesJsonResponse build() {

        centerX = setNull(centerX, 0L);
        centerY = setNull(centerY, 0L);
        height = setNull(height, 0L);
        width = setNull(width, 0L);
        entities = setNull(entities, new ArrayList<>(0));

        return new RequestEntitiesJsonResponse(centerX, centerY, width, height,
                entities.toArray(new RequestEntitiesJsonResponse.Entity[0]));

    }

    private static <T> T setNull(T test, T value) {

        return test == null ? value : test;

    }

}
