package ilich.ml.mapserver.DatabaseTests;

import ilich.ml.mapserver.AppConfigTest;
import ilich.ml.mapserver.JsonResponseBuilder;
import ilich.ml.mapserver.model.DatabaseProxy;
import ilich.ml.mapserver.model.entities.OnMapImageEntity;
import ilich.ml.mapserver.model.repositories.OnMapImageRepository;
import ilich.ml.mapserver.web.responses.RequestEntitiesJsonResponse;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.Arrays;

/**
 * @author NotLebedev
 */
public class DatabaseProxyTest extends AppConfigTest {

    @Qualifier("OnMapImageRepository")
    @Autowired
    OnMapImageRepository repository;

    @Test
    public void creationTest() {
        assertNotNull(DatabaseProxy.getInstance());
    }

    @Test
    public void getImagesTest() {

        flushRepository();
        fillTestData();

        var proxy = DatabaseProxy.getInstance();

        for (long i = -501; i < 500; i+=100) {
            for (long j = -501; j < 500; j+=100) {

                String[] expected = repository
                        .findOverlappingRectangle(i, j, i + 100L, j + 100L).stream()
                        .map(OnMapImageEntity::getImageUrl)
                        .toArray(String[]::new);

                JsonResponseBuilder builder = new JsonResponseBuilder();
                builder = proxy.getImages(builder, i + 50L, j + 50L, 100L, 100L);
                String[] actual = Arrays.stream(builder.build().getEntities())
                        .map(entity -> ((RequestEntitiesJsonResponse.Image) entity).getUrl())
                        .toArray(String[]::new);

                assertArrayEquals(expected, actual);

            }
        }

    }

    private void flushRepository() {
        repository.deleteAll();
    }

    private void fillTestData() {
        for (int i = 0; i < 100; i++) {
            repository.save(new OnMapImageEntity((long) (-10 * i), (long) (-5 * i), "image" + i + ".jpg", 5L, 5L));
        }
    }

}
