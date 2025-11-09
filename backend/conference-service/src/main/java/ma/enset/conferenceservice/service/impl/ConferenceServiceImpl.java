package ma.enset.conferenceservice.service.impl;

import lombok.RequiredArgsConstructor;
import ma.enset.conferenceservice.dto.ConferenceRequestDto;
import ma.enset.conferenceservice.dto.ConferenceResponseDto;
import ma.enset.conferenceservice.entity.Conference;
import ma.enset.conferenceservice.mapper.ConferenceMapper;
import ma.enset.conferenceservice.repository.ConferenceRepository;
import ma.enset.conferenceservice.service.ConferenceService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConferenceServiceImpl implements ConferenceService {
    private final ConferenceRepository conferenceRepository;
    private final ConferenceMapper conferenceMapper;

    @Override
    public ConferenceResponseDto createConference(ConferenceRequestDto ConferenceRequestDto) {
        Conference conference = conferenceMapper.toEntity(ConferenceRequestDto);
        return conferenceMapper.toDto(conferenceRepository.save(conference));
    }

    @Override
    public ConferenceResponseDto getConferenceById(UUID id) {
        Conference conference = conferenceRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Conference with the id '" + id + "' was not found")
        );
        return conferenceMapper.toDto(conference);
    }

    @Override
    public List<ConferenceResponseDto> getAllConferences() {
        List<Conference> conferences = conferenceRepository.findAll();
        return conferences.stream().map(conferenceMapper::toDto).toList();
    }

    @Override
    public ConferenceResponseDto updateConference(UUID id, ConferenceRequestDto ConferenceRequestDto) {
        Conference conference = conferenceRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Conference with the id '" + id + "' was not found")
        );
        conferenceMapper.updateEntityFromDto(ConferenceRequestDto, conference);
        Conference updatedConference = conferenceRepository.save(conference);
        return conferenceMapper.toDto(updatedConference);
    }

    @Override
    public void deleteConferenceById(UUID id) {
        if (!conferenceRepository.existsById(id)) {
            throw new RuntimeException("Conference with the id '" + id + "' was not found");
        }
        conferenceRepository.deleteById(id);
    }
}
