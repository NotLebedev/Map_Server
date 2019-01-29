package ilich.ml.mapserver.Model.Repositories;

import ilich.ml.mapserver.Model.Entities.OnMapImageEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * @author NotLebedev
 */
public interface OnMapImageRepository extends CrudRepository<OnMapImageEntity, Long> {

    List<OnMapImageEntity> findAllByXCoordinateBetweenAndYCoordinateBetween(final Long XCoordinate, final Long XCoordinate2, final Long YCoordinate, final Long YCoordinate2);

    default List<OnMapImageEntity> findBetween(Long XCoordinate, Long XCoordinate2, Long YCoordinate, Long YCoordinate2) {
        return findAllByXCoordinateBetweenAndYCoordinateBetween(XCoordinate, XCoordinate2, YCoordinate, YCoordinate2);
    }

    @Query("FROM OnMapImageEntity WHERE ((x1 BETWEEN ?1 AND ?3) OR (x2 BETWEEN ?1 AND ?3)) AND ((y1 BETWEEN ?2 AND ?4) OR (y2 BETWEEN ?2 AND ?4))")
    //@Query("FROM  OnMapImageEntity WHERE NOT (x2 < ?1 OR y2 < ?2 OR x1 > ?3 OR y1 > ?4)") This query seems to work ~5% slower, however additional investigation should be preformed
    List<OnMapImageEntity> findOverlappingRectangle(final Long x3, final Long y3, final Long x4, final long y4);

}
