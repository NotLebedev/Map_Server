package ilich.ml.mapserver.DatabaseTests;

import ilich.ml.mapserver.AppConfigTest;
import ilich.ml.mapserver.Model.Repositories.OnMapImageRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author NotLebedev
 */
public class DatabaseOnMapImageTest extends AppConfigTest {

    @Autowired
    OnMapImageRepository repository;

    @Test
    public void imageRepositoryCreationTest() {

        assertNotNull(repository);

    }



}
