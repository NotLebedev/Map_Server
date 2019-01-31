package ilich.ml.mapserver.web.responses;

import lombok.Getter;

/**
 * @author NotLebedev
 */
public class RequestEntitiesJsonResponse {

    @Getter
    private Long centerX;
    @Getter
    private Long centerY;

    @Getter
    private Long width;
    @Getter
    private Long height;

    @Getter
    private Entity[] entities;

    public interface Entity {}

    public static class Image implements Entity {

        @Getter
        private final String type = "image";

        @Getter
        private Long centerX;
        @Getter
        private Long centerY;

        @Getter
        private Long width;
        @Getter
        private Long height;

        @Getter
        private String url;

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
