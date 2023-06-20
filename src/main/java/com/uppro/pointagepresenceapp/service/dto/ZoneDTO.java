package com.uppro.pointagepresenceapp.service.dto;

import com.uppro.pointagepresenceapp.domain.enumeration.Point;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;

/**
 * A DTO for the {@link com.uppro.pointagepresenceapp.domain.Zone} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ZoneDTO implements Serializable {

    private Long id;

    private Point pointA;

    private Point pointB;

    private Point pointC;

    private Point pointD;

    private UserDTO user;

    private String nom;

    private Double ax;
    private Double ay;

    private Double bx;
    private Double by;

    private Double cx;
    private Double cy;

    private Double dx;
    private Double dy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Point getPointA() {
        return pointA;
    }

    public void setPointA(Point pointA) {
        this.pointA = pointA;
    }

    public Point getPointB() {
        return pointB;
    }

    public void setPointB(Point pointB) {
        this.pointB = pointB;
    }

    public Point getPointC() {
        return pointC;
    }

    public void setPointC(Point pointC) {
        this.pointC = pointC;
    }

    public Point getPointD() {
        return pointD;
    }

    public void setPointD(Point pointD) {
        this.pointD = pointD;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Double getAx() {
        return ax;
    }

    public void setAx(Double ax) {
        this.ax = ax;
    }

    public Double getAy() {
        return ay;
    }

    public void setAy(Double ay) {
        this.ay = ay;
    }

    public Double getBx() {
        return bx;
    }

    public void setBx(Double bx) {
        this.bx = bx;
    }

    public Double getBy() {
        return by;
    }

    public void setBy(Double by) {
        this.by = by;
    }

    public Double getCx() {
        return cx;
    }

    public void setCx(Double cx) {
        this.cx = cx;
    }

    public Double getCy() {
        return cy;
    }

    public void setCy(Double cy) {
        this.cy = cy;
    }

    public Double getDx() {
        return dx;
    }

    public void setDx(Double dx) {
        this.dx = dx;
    }

    public Double getDy() {
        return dy;
    }

    public void setDy(Double dy) {
        this.dy = dy;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public UserDTO getUser() {
        return user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ZoneDTO)) {
            return false;
        }

        ZoneDTO zoneDTO = (ZoneDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, zoneDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ZoneDTO{" +
            "id=" + getId() +
            ", pointA='" + getPointA() + "'" +
            ", pointB='" + getPointB() + "'" +
            ", pointC='" + getPointC() + "'" +
            ", pointD='" + getPointD() + "'" +
            ", user=" + getUser() +
            ", nom=" + getNom() +
            ", ax='" + getAx() + "'" +
            ", ay='" + getAy() + "'" +
            ", bx='" + getBx() + "'" +
            ", by='" + getBy() + "'" +
            ", cx='" + getCx() + "'" +
            ", cy='" + getCy() + "'" +
            ", dx='" + getDx() + "'" +
            ", dy='" + getDy() + "'" +
            "}";
    }
}
