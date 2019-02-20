package ilich.ml.mapserver.auth;

import ilich.ml.mapserver.auth.model.LoginEntity;
import ilich.ml.mapserver.auth.model.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

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

    public boolean loginValid(String username, String password) {

        LoginEntity loginEntity = repository.findByUsername(username);

        if(loginEntity == null)
            return false;


        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 expected to be valid algorithm");
        }

        String hash = new String(digest.digest(
                (password + loginEntity.getSalt()).getBytes(StandardCharsets.UTF_8)));

        return loginEntity.getPasswordHash().equals(hash);

    }

}