package ilich.ml.mapserver.model.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Database entity representing an image placed on map
 * @author NotLebedev
 */
@Entity
@Table(
        name = "ON_MAP_IMAGES",
        indexes = {
                @Index(name = "IMAGES_FULL_COORDINATE_INDEX", columnList = "xCoordinate,yCoordinate"),
                @Index(name = "IMAGES_RECTANGLE_INDEX", columnList = "x1,y1,x2,y2")
        })
public class OnMapImageEntity {

    @Id
    @GeneratedValue
    @Getter @Setter
    private Long id;

    @Getter @Setter
    private Long xCoordinate;//Center of the image
    @Getter @Setter
    private Long yCoordinate;//Center of the image

    //Image bounding box
    @Getter @Setter
    private Long x1;
    @Getter @Setter
    private Long y1;
    @Getter @Setter
    private Long x2;
    @Getter @Setter
    private Long y2;

    @Getter @Setter
    private String imageUrl;

    @SuppressWarnings("unused")
    public OnMapImageEntity() {
    }

    public OnMapImageEntity(Long xCoordinate, Long yCoordinate, String imageUrl, Long imageSizeX, Long imageSizeY) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.imageUrl = imageUrl;

        this.x1 = xCoordinate - imageSizeX/2;
        this.x2 = xCoordinate + imageSizeX/2;
        this.y1 = yCoordinate - imageSizeY/2;
        this.y2 = yCoordinate + imageSizeY/2;
    }
}
