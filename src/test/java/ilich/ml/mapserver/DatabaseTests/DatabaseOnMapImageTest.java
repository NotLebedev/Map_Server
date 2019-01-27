package ilich.ml.mapserver.DatabaseTests;

import ilich.ml.mapserver.AppConfigTest;
import ilich.ml.mapserver.Model.Entities.OnMapImageEntity;
import ilich.ml.mapserver.Model.Repositories.OnMapImageRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @author NotLebedev
 */
public class DatabaseOnMapImageTest extends AppConfigTest {

    @Autowired
    OnMapImageRepository repository;

    @Test
    public void creationTest() {
        assertNotNull(repository);
    }

    @Test
    public void saveTest() {
        for (int i = 0; i < 100; i++) {
            repository.save(new OnMapImageEntity((long) (-10 * i), (long) (-5 * i), "image" + i + ".jpg"));
        }
    }

    @Test
    public void getAllTest() {

        Iterable<OnMapImageEntity> result = repository.findAll();
        assertTrue(result.spliterator().getExactSizeIfKnown() > 0);

    }

    @Test
    public void getBetweenTest() {

        List<OnMapImageEntity> result = repository.findBetween(-50L, 0L, -200L, 200L);

        assertEquals(result.size(), 6);

    }

}
