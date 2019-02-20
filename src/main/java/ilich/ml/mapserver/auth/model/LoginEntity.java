package ilich.ml.mapserver.auth.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author NotLebedev
 */
@Entity
@Table(
        name = "LOGINS"
)
@Getter @Setter
public class LoginEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String salt;
    private String passwordHash;

}
