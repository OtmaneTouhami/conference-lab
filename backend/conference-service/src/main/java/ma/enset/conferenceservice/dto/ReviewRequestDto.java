package ma.enset.conferenceservice.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewRequestDto {
    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotBlank(message = "Review text is required")
    @Size(min = 10, max = 1000, message = "Review text must be between 10 and 1000 characters")
    private String text;

    @NotNull(message = "Stars rating is required")
    @Min(value = 1, message = "Stars must be at least 1")
    @Max(value = 5, message = "Stars must be at most 5")
    private Integer stars;
}
