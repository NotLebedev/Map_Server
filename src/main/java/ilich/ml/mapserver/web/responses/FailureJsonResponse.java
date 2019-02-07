package ilich.ml.mapserver.web.responses;

import lombok.Getter;

/**
 * @author NotLebedev
 */
@Getter
public class FailureJsonResponse implements JsonResponse {
    private final String responseType = "failure";
}
