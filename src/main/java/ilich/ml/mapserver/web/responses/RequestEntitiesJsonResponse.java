package ilich.ml.mapserver.web.responses;

import lombok.Getter;

/**
 * @author NotLebedev
 */
@Getter
public class RequestEntitiesJsonResponse implements JsonResponse {

    private final String responseType = "RequestEntitiesSuccess";

    private final Long centerX;
    private final Long centerY;

    private final Long width;
    private final Long height;

    private final Entity[] entities;

    public interface Entity {}

    @Getter
    public static class Image implements Entity {

        private final String type = "image";

        private final Long centerX;
        private final Long centerY;

        private final Long width;
        private final Long height;

        private final String url;

        public Image(Long centerX, Long centerY, Long width, Long height, String url) {
            this.centerX = centerX;
            this.centerY = centerY;
            this.width = width;
            this.height = height;
            this.url = url;
        }
    }

    public RequestEntitiesJsonResponse(Long centerX, Long centerY, Long width, Long height, Entity[] entities) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.height = height;
        this.entities = entities;
    }

}
