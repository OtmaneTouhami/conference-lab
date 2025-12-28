package ma.enset.conferenceservice.service;

import ma.enset.conferenceservice.dto.ReviewRequestDto;
import ma.enset.conferenceservice.dto.ReviewResponseDto;

import java.util.List;
import java.util.UUID;

public interface ReviewService {
    ReviewResponseDto createReview(UUID conferenceId, ReviewRequestDto reviewRequestDto);
    ReviewResponseDto getReviewById(UUID reviewId);
    List<ReviewResponseDto> getReviewsByConferenceId(UUID conferenceId);
    ReviewResponseDto updateReview(UUID reviewId, ReviewRequestDto reviewRequestDto);
    void deleteReviewById(UUID reviewId);
}
