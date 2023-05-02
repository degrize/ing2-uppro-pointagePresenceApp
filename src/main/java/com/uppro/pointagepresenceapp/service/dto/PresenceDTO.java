package com.uppro.pointagepresenceapp.service.dto;

import com.uppro.pointagepresenceapp.domain.enumeration.HoraireType;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.uppro.pointagepresenceapp.domain.Presence} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PresenceDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant date;

    @NotNull
    private HoraireType horaire;

    private String bilan;

    @NotNull
    private Double longitude;

    @NotNull
    private Double lattitude;

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

    public HoraireType getHoraire() {
        return horaire;
    }

    public void setHoraire(HoraireType horaire) {
        this.horaire = horaire;
    }

    public String getBilan() {
        return bilan;
    }

    public void setBilan(String bilan) {
        this.bilan = bilan;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLattitude() {
        return lattitude;
    }

    public void setLattitude(Double lattitude) {
        this.lattitude = lattitude;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PresenceDTO)) {
            return false;
        }

        PresenceDTO presenceDTO = (PresenceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, presenceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PresenceDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", horaire='" + getHoraire() + "'" +
            ", bilan='" + getBilan() + "'" +
            ", longitude=" + getLongitude() +
            ", lattitude=" + getLattitude() +
            "}";
    }
}
