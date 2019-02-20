package ilich.ml.mapserver.auth;

import ilich.ml.mapserver.auth.model.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 * @author NotLebedev
 */
@Service
public class Authenticator {

    @Qualifier("LoginRepository")
    @Autowired
    private LoginRepository repository;

    private Authenticator() {
    }

    private static class AuthenticatorLazyHolder {
        static final Authenticator INSTANCE = new Authenticator();
    }

    public static Authenticator getInstance() {
        return AuthenticatorLazyHolder.INSTANCE;
    }

    public boolean loginValid(String username, String hash) {

        return false;

    }

    public String getSalt(String username) {

        return null;

    }

}