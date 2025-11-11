package ma.enset.keynoteservice.service.impl;

import lombok.RequiredArgsConstructor;
import ma.enset.keynoteservice.dto.KeynoteRequestDto;
import ma.enset.keynoteservice.dto.KeynoteResponseDto;
import ma.enset.keynoteservice.entity.Keynote;
import ma.enset.keynoteservice.exception.ResourceNotFoundException;
import ma.enset.keynoteservice.mapper.KeynoteMapper;
import ma.enset.keynoteservice.repository.KeynoteRepository;
import ma.enset.keynoteservice.service.KeynoteService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class KeynoteServiceImpl implements KeynoteService {

    private final KeynoteRepository keynoteRepository;
    private final KeynoteMapper keynoteMapper;

    @Override
    @Transactional
    public KeynoteResponseDto createKeynote(KeynoteRequestDto keynoteRequestDto) {
        Keynote keynote = keynoteMapper.toEntity(keynoteRequestDto);
        return keynoteMapper.toDto(keynoteRepository.save(keynote));
    }

    @Override
    public KeynoteResponseDto getKeynoteById(UUID id) {
        Keynote keynote = keynoteRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Keynote with the id '" + id + "' was not found")
        );
        return keynoteMapper.toDto(keynote);
    }

    @Override
    public List<KeynoteResponseDto> getAllKeynotes() {
        List<Keynote> keynotes = keynoteRepository.findAll();
        return keynotes.stream().map(keynoteMapper::toDto).toList();
    }

    @Override
    @Transactional
    public KeynoteResponseDto updateKeynote(UUID id, KeynoteRequestDto keynoteRequestDto) {
        Keynote keynote = keynoteRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Keynote with the id '" + id + "' was not found")
        );

        keynoteMapper.updateEntityFromDto(keynoteRequestDto, keynote);
        Keynote updatedKeynote = keynoteRepository.save(keynote);
        return keynoteMapper.toDto(updatedKeynote);
    }

    @Override
    @Transactional
    public void deleteKeynoteById(UUID id) {
        if (!keynoteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Keynote with the id '" + id + "' was not found");
        }
        keynoteRepository.deleteById(id);
    }
}
