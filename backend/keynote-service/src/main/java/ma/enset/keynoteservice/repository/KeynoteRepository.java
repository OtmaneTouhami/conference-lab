package ma.enset.keynoteservice.repository;

import ma.enset.keynoteservice.entity.Keynote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface KeynoteRepository extends JpaRepository<Keynote, UUID> {
}