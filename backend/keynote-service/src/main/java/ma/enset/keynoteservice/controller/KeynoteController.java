package ma.enset.keynoteservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.enset.keynoteservice.dto.KeynoteRequestDto;
import ma.enset.keynoteservice.dto.KeynoteResponseDto;
import ma.enset.keynoteservice.service.KeynoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/keynotes")
@RequiredArgsConstructor
public class KeynoteController {
    private final KeynoteService keynoteService;

    @PostMapping
    public ResponseEntity<?> createKeynote(@Valid @RequestBody KeynoteRequestDto keynoteRequestDto) {
        KeynoteResponseDto responseDto = keynoteService.createKeynote(keynoteRequestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllKeynotes() {
        return new ResponseEntity<>(keynoteService.getAllKeynotes(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getKeynoteById(@PathVariable UUID id) {
        return new ResponseEntity<>(keynoteService.getKeynoteById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateKeynote(
            @PathVariable UUID id,
            @Valid @RequestBody KeynoteRequestDto keynoteRequestDto) {
        return new ResponseEntity<>(keynoteService.updateKeynote(id, keynoteRequestDto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteKeynoteById(@PathVariable UUID id) {
        keynoteService.deleteKeynoteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
