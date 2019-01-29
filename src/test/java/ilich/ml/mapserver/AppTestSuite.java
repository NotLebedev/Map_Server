package ilich.ml.mapserver;

import ilich.ml.mapserver.DatabaseTests.DatabaseOnMapImageTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * @author NotLebedev
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({
        MapserverApplicationTests.class,
        DatabaseOnMapImageTest.class
})
public class AppTestSuite {
}
