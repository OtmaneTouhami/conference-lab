package ma.enset.conferenceservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.enset.conferenceservice.dto.ReviewRequestDto;
import ma.enset.conferenceservice.dto.ReviewResponseDto;
import ma.enset.conferenceservice.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/conferences/{conferenceId}/reviews")
    public ResponseEntity<?> createReview(
            @PathVariable UUID conferenceId,
            @Valid @RequestBody ReviewRequestDto reviewRequestDto) {
        ReviewResponseDto responseDto = reviewService.createReview(conferenceId, reviewRequestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping("/conferences/{conferenceId}/reviews")
    public ResponseEntity<?> getReviewsByConferenceId(@PathVariable UUID conferenceId) {
        return new ResponseEntity<>(reviewService.getReviewsByConferenceId(conferenceId), HttpStatus.OK);
    }

    @GetMapping("/reviews/{reviewId}")
    public ResponseEntity<?> getReviewById(@PathVariable UUID reviewId) {
        return new ResponseEntity<>(reviewService.getReviewById(reviewId), HttpStatus.OK);
    }

    @PutMapping("/reviews/{reviewId}")
    public ResponseEntity<?> updateReview(
            @PathVariable UUID reviewId,
            @Valid @RequestBody ReviewRequestDto reviewRequestDto) {
        return new ResponseEntity<>(reviewService.updateReview(reviewId, reviewRequestDto), HttpStatus.OK);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable UUID reviewId) {
        reviewService.deleteReviewById(reviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
