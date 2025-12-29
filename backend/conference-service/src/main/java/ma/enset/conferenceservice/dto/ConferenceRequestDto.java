package ma.enset.conferenceservice.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import ma.enset.conferenceservice.entity.ConferenceType;
import ma.enset.conferenceservice.validation.EnumValue;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConferenceRequestDto {
    @NotBlank(message = "Title is required")
    private String title;
    @NotNull(message = "Type is required")
    @EnumValue(
            enumClass = ConferenceType.class,
            message = "Invalid conference type. Must be ACADEMIC or COMMERCIAL."
    )
    private String type;
    @NotNull(message = "Date is required")
    private LocalDate date;
    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be greater than 0")
    private int duration;
    @NotNull(message = "Number of enrollments is required")
    @Min(value = 1, message = "Number of enrollments must be greater than 0")
    private int numberOfEnrollments;
    @NotNull(message = "Score is required")
    @Min(value = 1, message = "Score must be at least 1")
    @Max(value = 5, message = "Score must be at most 5")
    private int score;
    @NotNull(message = "Keynote ID is required")
    private java.util.UUID keynoteId;
}
