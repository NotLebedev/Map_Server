package ilich.ml.mapserver.model.repositories;

import ilich.ml.mapserver.model.entities.OnMapImageEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

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
    @Query("FROM OnMapImageEntity WHERE ((x1 BETWEEN ?1 AND ?3) OR (x2 BETWEEN ?1 AND ?3)) AND ((y1 BETWEEN ?2 AND ?4) OR (y2 BETWEEN ?2 AND ?4))")
    //@Query("FROM  OnMapImageEntity WHERE NOT (x2 < ?1 OR y2 < ?2 OR x1 > ?3 OR y1 > ?4)") This query seems to work ~5% slower, however additional investigation should be preformed
    List<OnMapImageEntity> findOverlappingRectangle(final Long x1, final Long y1, final Long x2, final long y2);

}
