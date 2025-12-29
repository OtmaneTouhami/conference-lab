package ma.enset.conferenceservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.enset.conferenceservice.client.KeynoteClient;
import ma.enset.conferenceservice.dto.ConferenceRequestDto;
import ma.enset.conferenceservice.dto.ConferenceResponseDto;
import ma.enset.conferenceservice.entity.Conference;
import ma.enset.conferenceservice.mapper.ConferenceMapper;
import ma.enset.conferenceservice.repository.ConferenceRepository;
import ma.enset.conferenceservice.service.ConferenceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ConferenceServiceImpl implements ConferenceService {
    private final ConferenceRepository conferenceRepository;
    private final ConferenceMapper conferenceMapper;
    private final KeynoteClient keynoteClient;

    @Override
    @Transactional
    public ConferenceResponseDto createConference(ConferenceRequestDto ConferenceRequestDto) {
        Conference conference = conferenceMapper.toEntity(ConferenceRequestDto);
        conference = conferenceRepository.save(conference);
        ConferenceResponseDto responseDto = conferenceMapper.toDto(conference);
        try {
            responseDto.setKeynote(keynoteClient.getKeynoteById(conference.getKeynoteId()));
        } catch (Exception e) {
             // Fallback handled by CircuitBreaker in a client, or ignore if service down
            log.error("Error fetching keynote data for conference {}: {}", conference.getId(), e.getMessage());
        }
        return responseDto;
    }

    @Override
    public ConferenceResponseDto getConferenceById(UUID id) {
        Conference conference = conferenceRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Conference with the id '" + id + "' was not found")
        );
        ConferenceResponseDto responseDto = conferenceMapper.toDto(conference);
        if (conference.getKeynoteId() != null) {
            responseDto.setKeynote(keynoteClient.getKeynoteById(conference.getKeynoteId()));
        }
        return responseDto;
    }

    @Override
    public List<ConferenceResponseDto> getAllConferences() {
        List<Conference> conferences = conferenceRepository.findAll();
        return conferences.stream().map(conference -> {
            ConferenceResponseDto responseDto = conferenceMapper.toDto(conference);
            if (conference.getKeynoteId() != null) {
                responseDto.setKeynote(keynoteClient.getKeynoteById(conference.getKeynoteId()));
            }
            return responseDto;
        }).toList();
    }

    @Override
    @Transactional
    public ConferenceResponseDto updateConference(UUID id, ConferenceRequestDto ConferenceRequestDto) {
        Conference conference = conferenceRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Conference with the id '" + id + "' was not found")
        );
        conferenceMapper.updateEntityFromDto(ConferenceRequestDto, conference);
        Conference updatedConference = conferenceRepository.save(conference);
        ConferenceResponseDto responseDto = conferenceMapper.toDto(updatedConference);
        if (updatedConference.getKeynoteId() != null) {
            responseDto.setKeynote(keynoteClient.getKeynoteById(updatedConference.getKeynoteId()));
        }
        return responseDto;
    }

    @Override
    @Transactional
    public void deleteConferenceById(UUID id) {
        if (!conferenceRepository.existsById(id)) {
            throw new RuntimeException("Conference with the id '" + id + "' was not found");
        }
        conferenceRepository.deleteById(id);
    }
}
