package ilich.ml.mapserver.model.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

/**
 * @author NotLebedev
 */
@Service("RepositoryManager")
public class RepositoryManagerBean {

    private final OnMapImageRepository onMapImageRepository;

    @Autowired
    public RepositoryManagerBean(@Qualifier("OnMapImageRepository") OnMapImageRepository imageRepository) {
        this.onMapImageRepository = imageRepository;
    }

    @Bean
    public OnMapImageRepository getOnMapImageRepository() {
        return onMapImageRepository;
    }
}
