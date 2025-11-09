package ma.enset.keynoteservice.exception.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ValidationErrorDetails extends ErrorDetails {
    private Map<String, String> errors;

    public ValidationErrorDetails(
            int status,
            LocalDate timestamp,
            String message,
            String details,
            Map<String, String> errors
    ) {
        super(status, timestamp, message, details);
        this.errors = errors;
    }
}
