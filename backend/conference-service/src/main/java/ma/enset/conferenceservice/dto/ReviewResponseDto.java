package ma.enset.conferenceservice.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponseDto {
    private UUID id;
    private LocalDate date;
    private String text;
    private int stars;
    private UUID conferenceId;
}
