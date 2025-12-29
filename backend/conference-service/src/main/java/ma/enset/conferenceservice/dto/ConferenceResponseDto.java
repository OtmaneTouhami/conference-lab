package ma.enset.conferenceservice.dto;

import lombok.*;
import ma.enset.conferenceservice.entity.ConferenceType;

import java.time.LocalDate;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConferenceResponseDto {
    private UUID id;
    private String title;
    private ConferenceType type;
    private LocalDate date;
    private int duration;
    private int numberOfEnrollments;
    private int score;
    private KeynoteResponseDto keynote;
}
