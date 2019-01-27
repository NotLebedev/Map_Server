package ilich.ml.mapserver.Model.Repositories;

import ilich.ml.mapserver.Model.Entities.OnMapImageEntity;
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
}
