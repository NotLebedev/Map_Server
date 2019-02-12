package ilich.ml.mapserver.web.responses;

import lombok.Getter;

/**
 * @author NotLebedev
 */
@Getter
public class RequestEntitiesJsonResponse implements JsonResponse {

    private final String responseType = "RequestEntitiesSuccess";

    private final Long x1;
    private final Long y1;

    private final Long width;
    private final Long height;

    private final Entity[] entities;

    public interface Entity {}

    @Getter
    public static class Image implements Entity {

        private final String type = "image";
        private final Long id;

        private final Long x1;
        private final Long y1;

        private final Long width;
        private final Long height;

        private final String url;

        public Image(Long id, Long x1, Long y1, Long width, Long height, String url) {
            this.id = id;
            this.x1 = x1;
            this.y1 = y1;
            this.width = width;
            this.height = height;
            this.url = url;
        }
    }

    public RequestEntitiesJsonResponse(Long x1, Long y1, Long width, Long height, Entity[] entities) {
        this.x1 = x1;
        this.y1 = y1;
        this.width = width;
        this.height = height;
        this.entities = entities;
    }

}
