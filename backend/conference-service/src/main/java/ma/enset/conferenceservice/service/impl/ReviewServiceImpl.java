package ma.enset.conferenceservice.service.impl;

import lombok.RequiredArgsConstructor;
import ma.enset.conferenceservice.dto.ReviewRequestDto;
import ma.enset.conferenceservice.dto.ReviewResponseDto;
import ma.enset.conferenceservice.entity.Conference;
import ma.enset.conferenceservice.entity.Review;
import ma.enset.conferenceservice.exception.ResourceNotFoundException;
import ma.enset.conferenceservice.mapper.ReviewMapper;
import ma.enset.conferenceservice.repository.ConferenceRepository;
import ma.enset.conferenceservice.repository.ReviewRepository;
import ma.enset.conferenceservice.service.ReviewService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ConferenceRepository conferenceRepository;
    private final ReviewMapper reviewMapper;

    @Override
    @Transactional
    public ReviewResponseDto createReview(UUID conferenceId, ReviewRequestDto reviewRequestDto) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new ResourceNotFoundException("Conference with id '" + conferenceId + "' was not found"));
        
        Review review = reviewMapper.toEntity(reviewRequestDto, conference);
        Review savedReview = reviewRepository.save(review);
        return reviewMapper.toDto(savedReview);
    }

    @Override
    public ReviewResponseDto getReviewById(UUID reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review with id '" + reviewId + "' was not found"));
        return reviewMapper.toDto(review);
    }

    @Override
    public List<ReviewResponseDto> getReviewsByConferenceId(UUID conferenceId) {
        if (!conferenceRepository.existsById(conferenceId)) {
            throw new ResourceNotFoundException("Conference with id '" + conferenceId + "' was not found");
        }
        List<Review> reviews = reviewRepository.findByConferenceId(conferenceId);
        return reviews.stream().map(reviewMapper::toDto).toList();
    }

    @Override
    @Transactional
    public ReviewResponseDto updateReview(UUID reviewId, ReviewRequestDto reviewRequestDto) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review with id '" + reviewId + "' was not found"));
        
        reviewMapper.updateEntityFromDto(reviewRequestDto, review);
        Review updatedReview = reviewRepository.save(review);
        return reviewMapper.toDto(updatedReview);
    }

    @Override
    @Transactional
    public void deleteReviewById(UUID reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            throw new ResourceNotFoundException("Review with id '" + reviewId + "' was not found");
        }
        reviewRepository.deleteById(reviewId);
    }
}
