package ilich.ml.mapserver.web.requests;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author NotLebedev
 */
@Getter @Setter @ToString
public class ModifyJsonRequest {

    private EntityAdded[] added;
    private EntityEdited[] edited;

    @JsonTypeInfo(
            use = JsonTypeInfo.Id.NAME,
            property = "type"
    )
    @JsonSubTypes(
            @JsonSubTypes.Type(value = ImageAdded.class, name = "image")
    )
    public interface EntityAdded {}

    @Getter @Setter @ToString
    public static class ImageAdded implements EntityAdded {

        private Long x1;
        private Long y1;

        private Long width;
        private Long height;

        private String url;
    }

    @JsonTypeInfo(
            use = JsonTypeInfo.Id.NAME,
            property = "type"
    )
    @JsonSubTypes(
            @JsonSubTypes.Type(value = ImageAdded.class, name="image")
    )
    public interface EntityEdited {}

    @Getter @Setter @ToString
    public static class ImageEdited implements EntityEdited {

        private Long id;

        private Long x1;
        private Long y1;

        private Long width;
        private Long height;

        private String url;

    }

}
