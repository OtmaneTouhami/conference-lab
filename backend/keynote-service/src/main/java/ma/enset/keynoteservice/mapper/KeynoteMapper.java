package ma.enset.keynoteservice.mapper;

import ma.enset.keynoteservice.dto.KeynoteRequestDto;
import ma.enset.keynoteservice.dto.KeynoteResponseDto;
import ma.enset.keynoteservice.entity.Keynote;
import org.springframework.stereotype.Component;

@Component
public class KeynoteMapper {

    public Keynote toEntity(KeynoteRequestDto keynoteRequestDto) {
        if (keynoteRequestDto == null) {
            return null;
        }
        return Keynote.builder()
                .email(keynoteRequestDto.getEmail())
                .firstName(keynoteRequestDto.getFirstName())
                .lastName(keynoteRequestDto.getLastName())
                .function(keynoteRequestDto.getFunction())
                .build();
    }

    public KeynoteResponseDto toDto(Keynote keynote) {
        if (keynote == null) {
            return null;
        }
        return KeynoteResponseDto.builder()
                .id(keynote.getId())
                .firstName(keynote.getFirstName())
                .lastName(keynote.getLastName())
                .email(keynote.getEmail())
                .function(keynote.getFunction())
                .build();
    }

    public void updateEntityFromDto(KeynoteRequestDto dto, Keynote entity) {
        if (dto == null || entity == null) {
            return;
        }
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setFunction(dto.getFunction());
    }
}
