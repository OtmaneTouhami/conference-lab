package ma.enset.conferenceservice.mapper;

import ma.enset.conferenceservice.dto.ConferenceRequestDto;
import ma.enset.conferenceservice.dto.ConferenceResponseDto;
import ma.enset.conferenceservice.entity.Conference;
import ma.enset.conferenceservice.entity.ConferenceType;
import org.springframework.stereotype.Component;

@Component
public class ConferenceMapper {
    public Conference toEntity(ConferenceRequestDto conferenceRequestDto) {
        if (conferenceRequestDto == null) {
            return null;
        }
        return Conference.builder()
                .title(conferenceRequestDto.getTitle())
                .type(ConferenceType.valueOf(conferenceRequestDto.getType().toUpperCase()))
                .score(conferenceRequestDto.getScore())
                .date(conferenceRequestDto.getDate())
                .duration(conferenceRequestDto.getDuration())
                .numberOfEnrollments(conferenceRequestDto.getNumberOfEnrollments())
                .keynoteId(conferenceRequestDto.getKeynoteId())
                .build();
    }

    public ConferenceResponseDto toDto(Conference conference) {
        if (conference == null) {
            return null;
        }
        return ConferenceResponseDto.builder()
                .id(conference.getId())
                .title(conference.getTitle())
                .type(conference.getType())
                .score(conference.getScore())
                .date(conference.getDate())
                .duration(conference.getDuration())
                .numberOfEnrollments(conference.getNumberOfEnrollments())
                .build();
    }

    public void updateEntityFromDto(ConferenceRequestDto dto, Conference entity) {
        if (dto == null || entity == null) {
            return;
        }
        entity.setTitle(dto.getTitle());
        entity.setType(ConferenceType.valueOf(dto.getType().toUpperCase()));
        entity.setScore(dto.getScore());
        entity.setDate(dto.getDate());
        entity.setDuration(dto.getDuration());
        entity.setNumberOfEnrollments(dto.getNumberOfEnrollments());
        entity.setKeynoteId(dto.getKeynoteId());
    }
}
