package ma.enset.conferenceservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Conference {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConferenceType type;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false, name = "number_of_enrollments")
    private int numberOfEnrollments;

    @Column(nullable = false)
    private int score;
}