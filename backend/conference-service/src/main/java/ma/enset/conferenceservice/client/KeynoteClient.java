package ma.enset.conferenceservice.client;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import ma.enset.conferenceservice.dto.KeynoteResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "keynote-service")
public interface KeynoteClient {

    @GetMapping("/api/v1/keynotes")
    @CircuitBreaker(name = "keynoteService", fallbackMethod = "getAllKeynotesFallback")
    List<KeynoteResponseDto> getAllKeynotes();

    @GetMapping("/api/v1/keynotes/{id}")
    @CircuitBreaker(name = "keynoteService", fallbackMethod = "getKeynoteByIdFallback")
    KeynoteResponseDto getKeynoteById(@PathVariable UUID id);

    // Fallback methods
    default List<KeynoteResponseDto> getAllKeynotesFallback(Exception e) {
        return List.of();
    }

    default KeynoteResponseDto getKeynoteByIdFallback(UUID id, Exception e) {
        return KeynoteResponseDto.builder()
                .id(id)
                .firstName("Unknown")
                .lastName("Unknown")
                .email("unknown@example.com")
                .function("Unknown")
                .build();
    }
}
