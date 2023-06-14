package com.uppro.pointagepresenceapp.service.dto;

import com.uppro.pointagepresenceapp.domain.enumeration.TypeTravail;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.uppro.pointagepresenceapp.domain.Travail} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TravailDTO implements Serializable {

    private Long id;

    private Instant date;

    private TypeTravail typeTravail;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public UserDTO getUser() {
        return user;
    }

    public TypeTravail getTypeTravail() {
        return typeTravail;
    }

    public void setTypeTravail(TypeTravail typeTravail) {
        this.typeTravail = typeTravail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TravailDTO)) {
            return false;
        }

        TravailDTO travailDTO = (TravailDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, travailDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TravailDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", typeTravail='" + getTypeTravail() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
