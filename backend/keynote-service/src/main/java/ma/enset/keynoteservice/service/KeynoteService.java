package ma.enset.keynoteservice.service;

import ma.enset.keynoteservice.dto.KeynoteRequestDto;
import ma.enset.keynoteservice.dto.KeynoteResponseDto;

import java.util.List;
import java.util.UUID;

public interface KeynoteService {
    KeynoteResponseDto createKeynote(KeynoteRequestDto keynoteRequestDto);
    KeynoteResponseDto getKeynoteById(UUID id);
    List<KeynoteResponseDto> getAllKeynotes();
    KeynoteResponseDto updateKeynote(UUID id, KeynoteRequestDto keynoteRequestDto);
    void deleteKeynoteById(UUID id);
}
