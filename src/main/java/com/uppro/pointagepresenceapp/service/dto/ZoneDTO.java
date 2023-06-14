package com.uppro.pointagepresenceapp.service.dto;

import com.uppro.pointagepresenceapp.domain.enumeration.Point;
import java.io.Serializable;
import java.util.Objects;

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
            "}";
    }
}
