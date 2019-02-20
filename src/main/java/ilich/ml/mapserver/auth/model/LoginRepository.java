package ilich.ml.mapserver.auth.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author NotLebedev
 */
@Repository("LoginRepository")
public interface LoginRepository extends CrudRepository<LoginEntity, Long> {
}
