package ma.enset.conferenceservice.mapper;

import ma.enset.conferenceservice.dto.ReviewRequestDto;
import ma.enset.conferenceservice.dto.ReviewResponseDto;
import ma.enset.conferenceservice.entity.Conference;
import ma.enset.conferenceservice.entity.Review;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    public Review toEntity(ReviewRequestDto dto, Conference conference) {
        if (dto == null) {
            return null;
        }
        return Review.builder()
                .date(dto.getDate())
                .text(dto.getText())
                .stars(dto.getStars())
                .conference(conference)
                .build();
    }

    public ReviewResponseDto toDto(Review review) {
        if (review == null) {
            return null;
        }
        return ReviewResponseDto.builder()
                .id(review.getId())
                .date(review.getDate())
                .text(review.getText())
                .stars(review.getStars())
                .conferenceId(review.getConference().getId())
                .build();
    }

    public void updateEntityFromDto(ReviewRequestDto dto, Review entity) {
        if (dto == null || entity == null) {
            return;
        }
        entity.setDate(dto.getDate());
        entity.setText(dto.getText());
        entity.setStars(dto.getStars());
    }
}
