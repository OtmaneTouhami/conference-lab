package ma.enset.conferenceservice.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ConferenceType {
    ACADEMIC("Academic"),
    COMMERCIAL("Comercial");

    private final String type;
}
