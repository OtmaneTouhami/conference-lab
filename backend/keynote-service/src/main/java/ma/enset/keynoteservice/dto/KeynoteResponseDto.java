package ma.enset.keynoteservice.dto;

import lombok.*;

import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KeynoteResponseDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String function;
}
