package com.uppro.pointagepresenceapp.domain;

import com.uppro.pointagepresenceapp.domain.enumeration.TypeTravail;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Travail.
 */
@Entity
@Table(name = "travail")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Travail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_travail")
    private TypeTravail typeTravail;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Travail id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return this.date;
    }

    public Travail date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public TypeTravail getTypeTravail() {
        return this.typeTravail;
    }

    public Travail typeTravail(TypeTravail typeTravail) {
        this.setTypeTravail(typeTravail);
        return this;
    }

    public void setTypeTravail(TypeTravail typeTravail) {
        this.typeTravail = typeTravail;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Travail)) {
            return false;
        }
        return id != null && id.equals(((Travail) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Travail{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", typeTravail='" + getTypeTravail() + "'" +
            "}";
    }
}
