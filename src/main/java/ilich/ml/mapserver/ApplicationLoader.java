package ilich.ml.mapserver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.PropertiesPropertySource;

import java.io.*;
import java.util.Properties;

/**
 * @author NotLebedev
 */
public class ApplicationLoader implements ApplicationListener<ApplicationEnvironmentPreparedEvent> {

    private Logger log = LoggerFactory.getLogger(ApplicationLoader.class);

    @Override
    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {

        log.info("Starting pre boot phase");
        File directory = getWorkingDirectory();
        log.info("Looking for configuration in working directory (" + directory.getAbsolutePath() + ")");

        File[] configs = directory.listFiles((dir, name) -> name.matches("^app.config$"));
        File config;

        if(configs != null && configs.length > 0) {

            if(configs.length > 1)
                log.warn("Multiple configs found, running with first one");

            config = configs[0];

        }else {

            log.warn("No config file found, running with default settings");
            return;

        }

        BufferedReader in;

        try {
            in = new BufferedReader(new FileReader(config));
        } catch (FileNotFoundException e) {
            log.warn("No config file found, running with default settings");
            return;
        }

        Properties props = new Properties();

        try {
            String st;
            while ((st = in.readLine()) != null) {

                String[] kv = st.split("=", 2);

                if(kv.length < 2)
                    continue;

                log.info("Found key : " + kv[0] + "|| with value : " + kv[1]);

                props.put(kv[0], kv[1]);

            }
        }catch (Exception e) {
            log.warn("File reading failed, running with default settings");
            return;
        }

        event.getEnvironment().getPropertySources().addFirst(
                new PropertiesPropertySource("loadedProperties", props));

    }

    private File getWorkingDirectory() {

        return new File(System.getProperty("user.dir"));

    }

}
