package ma.enset.conferenceservice.repository;

import ma.enset.conferenceservice.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findByConferenceId(UUID conferenceId);
}
