package com.uppro.pointagepresenceapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.uppro.pointagepresenceapp.domain.enumeration.Point;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Zone.
 */
@Entity
@Table(name = "zone")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Zone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "point_a")
    private Point pointA;

    @Enumerated(EnumType.STRING)
    @Column(name = "point_b")
    private Point pointB;

    @Enumerated(EnumType.STRING)
    @Column(name = "point_c")
    private Point pointC;

    @Enumerated(EnumType.STRING)
    @Column(name = "point_d")
    private Point pointD;

    @ManyToOne
    @JsonIgnoreProperties(value = { "travails", "zones", "presences" }, allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Zone id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Point getPointA() {
        return this.pointA;
    }

    public Zone pointA(Point pointA) {
        this.setPointA(pointA);
        return this;
    }

    public void setPointA(Point pointA) {
        this.pointA = pointA;
    }

    public Point getPointB() {
        return this.pointB;
    }

    public Zone pointB(Point pointB) {
        this.setPointB(pointB);
        return this;
    }

    public void setPointB(Point pointB) {
        this.pointB = pointB;
    }

    public Point getPointC() {
        return this.pointC;
    }

    public Zone pointC(Point pointC) {
        this.setPointC(pointC);
        return this;
    }

    public void setPointC(Point pointC) {
        this.pointC = pointC;
    }

    public Point getPointD() {
        return this.pointD;
    }

    public Zone pointD(Point pointD) {
        this.setPointD(pointD);
        return this;
    }

    public void setPointD(Point pointD) {
        this.pointD = pointD;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Zone user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Zone)) {
            return false;
        }
        return id != null && id.equals(((Zone) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Zone{" +
            "id=" + getId() +
            ", pointA='" + getPointA() + "'" +
            ", pointB='" + getPointB() + "'" +
            ", pointC='" + getPointC() + "'" +
            ", pointD='" + getPointD() + "'" +
            "}";
    }
}
