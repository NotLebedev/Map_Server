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
public class AddEntitiesJsonRequest {

    private Entity[] added;

    @JsonTypeInfo(
            use = JsonTypeInfo.Id.NAME,
            property = "type"
    )
    @JsonSubTypes(
            @JsonSubTypes.Type(value = AddEntitiesJsonRequest.Image.class, name = "image")
    )
    public interface Entity {}

    @Getter @Setter @ToString
    public static class Image implements Entity {

        private Long x1;
        private Long y1;

        private Long width;
        private Long height;

        private String url;
    }

}
