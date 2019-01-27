package ilich.ml.mapserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class MapserverApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(MapserverApplication.class, args);
    }

}

