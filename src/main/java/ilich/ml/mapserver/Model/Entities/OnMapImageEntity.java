package ilich.ml.mapserver.Model.Entities;

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
                @Index(name = "IMAGES_FULL_COORDINATE_INDEX", columnList = "xCoordinate,yCoordinate")
        })
public class OnMapImageEntity {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private Long xCoordinate;
    @Getter
    @Setter
    private Long yCoordinate;

    @Getter
    @Setter
    private String imageUrl;

    public OnMapImageEntity() {
    }

    public OnMapImageEntity(Long xCoordinate, Long yCoordinate, String imageUrl) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.imageUrl = imageUrl;
    }
}
