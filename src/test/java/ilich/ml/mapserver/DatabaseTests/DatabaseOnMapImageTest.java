package ilich.ml.mapserver.DatabaseTests;

import ilich.ml.mapserver.AppConfigTest;
import ilich.ml.mapserver.model.entities.OnMapImageEntity;
import ilich.ml.mapserver.model.repositories.OnMapImageRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.awt.*;
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
            repository.save(new OnMapImageEntity((long) (-10 * i), (long) (-5 * i), "image" + i + ".jpg", 5L, 5L));
        }
    }

    @Test
    public void getAllTest() {

        repository.deleteAll();
        saveTest();

        Iterable<OnMapImageEntity> result = repository.findAll();
        assertTrue(result.spliterator().getExactSizeIfKnown() > 0);

    }

    @Test
    public void getBetweenTest() {

        repository.deleteAll();
        saveTest();

        List<OnMapImageEntity> result = repository.findBetween(-50L, 0L, -200L, 200L);

        assertEquals(result.size(), 6);

    }

    @Test
    public void getByRectangleTest() {

        Rectangle view = new Rectangle(-100, -100, 200, 200);
        Rectangle rect = new Rectangle();

        for (int i = -501; i < 500; i+=50) {
            for (int j = -501; j < 500; j+=50) {

                rect.setBounds(i, j, 100, 100);
                repository.deleteAll();
                repository.save(new OnMapImageEntity((long)rect.getCenterX(), (long)rect.getCenterY(), "q", (long)rect.getWidth(), (long)rect.getHeight()));

                boolean doIntersect = !repository.findOverlappingRectangle(-100L, -100L, 100L, 100L).isEmpty();
                if(rect.intersects(view) != doIntersect){

                    System.out.println("Failed on : " + i + " " + j);
                    assertEquals(rect.intersects(view), doIntersect);
                }

            }
        }



    }

}
