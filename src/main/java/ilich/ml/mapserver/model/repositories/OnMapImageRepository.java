package ilich.ml.mapserver.model.repositories;

import ilich.ml.mapserver.model.entities.OnMapImageEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author NotLebedev
 */
@Repository("OnMapImageRepository")
public interface OnMapImageRepository extends CrudRepository<OnMapImageEntity, Long> {

    List<OnMapImageEntity> findAllByXCoordinateBetweenAndYCoordinateBetween(final Long XCoordinate, final Long XCoordinate2, final Long YCoordinate, final Long YCoordinate2);

    default List<OnMapImageEntity> findBetween(Long XCoordinate, Long XCoordinate2, Long YCoordinate, Long YCoordinate2) {
        return findAllByXCoordinateBetweenAndYCoordinateBetween(XCoordinate, XCoordinate2, YCoordinate, YCoordinate2);
    }

    /**
     * Find all {@link OnMapImageEntity} intersecting with specified rectangle
     * @param x1 upper left corner x coordinate
     * @param y1 upper left corner y coordinate
     * @param x2 lower right corner x coordinate
     * @param y2 lower right corner y coordinate
     * @return {@link List} of {@link OnMapImageEntity} that intersect specified rectangle
     */
    //@Query("FROM OnMapImageEntity WHERE ((x1 BETWEEN ?1 AND ?3) OR (x2 BETWEEN ?1 AND ?3)) AND ((y1 BETWEEN ?2 AND ?4) OR (y2 BETWEEN ?2 AND ?4))")
    @Query("FROM  OnMapImageEntity WHERE NOT (x2 < ?1 OR y2 < ?2 OR x1 > ?3 OR y1 > ?4)")
    //Okay, maybe this query is slower (only ~5%), but it works perfectly well with view entirely inside of image
    List<OnMapImageEntity> findOverlappingRectangle(final Long x1, final Long y1, final Long x2, final Long y2);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE OnMapImageEntity SET x1 = :x1, y1 = :y1, x2 = :x2, y2 = :y2, X_Coordinate = :centerX, Y_Coordinate = :centerY, image_Url = :url WHERE id = :id")
    int updateImage(@Param("id") final Long id,
                    @Param("x1") final Long x1, @Param("y1") final Long y1, @Param("x2") final Long x2, @Param("y2") final Long y2,
                    @Param("centerX") final Long centerX, @Param("centerY") final Long centerY, @Param("url") final String url);

}
