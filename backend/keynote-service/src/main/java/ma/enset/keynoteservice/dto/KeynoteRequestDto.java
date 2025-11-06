package ma.enset.keynoteservice.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KeynoteRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String function;
}
