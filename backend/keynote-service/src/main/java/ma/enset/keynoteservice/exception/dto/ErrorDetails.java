package ma.enset.keynoteservice.exception.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetails {
    private int status;
    private LocalDate timeStamp;
    private String message;
    private String details;
}
