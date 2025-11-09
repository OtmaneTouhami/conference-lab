package ma.enset.conferenceservice.service;

import ma.enset.conferenceservice.dto.ConferenceRequestDto;
import ma.enset.conferenceservice.dto.ConferenceResponseDto;

import java.util.List;
import java.util.UUID;

public interface ConferenceService {
    ConferenceResponseDto createConference(ConferenceRequestDto ConferenceRequestDto);
    ConferenceResponseDto getConferenceById(UUID id);
    List<ConferenceResponseDto> getAllConferences();
    ConferenceResponseDto updateConference(UUID id, ConferenceRequestDto ConferenceRequestDto);
    void deleteConferenceById(UUID id);
}
