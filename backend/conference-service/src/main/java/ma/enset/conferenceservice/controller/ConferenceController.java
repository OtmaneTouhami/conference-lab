package ma.enset.conferenceservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.enset.conferenceservice.dto.ConferenceRequestDto;
import ma.enset.conferenceservice.dto.ConferenceResponseDto;
import ma.enset.conferenceservice.service.ConferenceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/conferences")
@RequiredArgsConstructor
public class ConferenceController {
    private final ConferenceService conferenceService;

    @PostMapping
    public ResponseEntity<?> createConference(@Valid @RequestBody ConferenceRequestDto conferenceRequestDto) {
        ConferenceResponseDto responseDto = conferenceService.createConference(conferenceRequestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllConferences() {
        return new ResponseEntity<>(conferenceService.getAllConferences(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getConferenceById(@PathVariable UUID id) {
        return new ResponseEntity<>(conferenceService.getConferenceById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateConference(
            @PathVariable UUID id,
            @Valid @RequestBody ConferenceRequestDto conferenceRequestDto) {
        return new ResponseEntity<>(conferenceService.updateConference(id, conferenceRequestDto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConferenceById(@PathVariable UUID id) {
        conferenceService.deleteConferenceById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
