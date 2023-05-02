package com.uppro.pointagepresenceapp.domain;

import com.uppro.pointagepresenceapp.domain.enumeration.HoraireType;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Presence.
 */
@Entity
@Table(name = "presence")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Presence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private Instant date;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "horaire", nullable = false)
    private HoraireType horaire;

    @Column(name = "bilan")
    private String bilan;

    @NotNull
    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @NotNull
    @Column(name = "lattitude", nullable = false)
    private Double lattitude;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Presence id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return this.date;
    }

    public Presence date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public HoraireType getHoraire() {
        return this.horaire;
    }

    public Presence horaire(HoraireType horaire) {
        this.setHoraire(horaire);
        return this;
    }

    public void setHoraire(HoraireType horaire) {
        this.horaire = horaire;
    }

    public String getBilan() {
        return this.bilan;
    }

    public Presence bilan(String bilan) {
        this.setBilan(bilan);
        return this;
    }

    public void setBilan(String bilan) {
        this.bilan = bilan;
    }

    public Double getLongitude() {
        return this.longitude;
    }

    public Presence longitude(Double longitude) {
        this.setLongitude(longitude);
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLattitude() {
        return this.lattitude;
    }

    public Presence lattitude(Double lattitude) {
        this.setLattitude(lattitude);
        return this;
    }

    public void setLattitude(Double lattitude) {
        this.lattitude = lattitude;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Presence)) {
            return false;
        }
        return id != null && id.equals(((Presence) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Presence{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", horaire='" + getHoraire() + "'" +
            ", bilan='" + getBilan() + "'" +
            ", longitude=" + getLongitude() +
            ", lattitude=" + getLattitude() +
            "}";
    }
}
