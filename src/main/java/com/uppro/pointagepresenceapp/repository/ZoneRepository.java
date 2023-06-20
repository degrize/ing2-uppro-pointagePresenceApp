package com.uppro.pointagepresenceapp.repository;

import com.uppro.pointagepresenceapp.domain.Zone;
import com.uppro.pointagepresenceapp.service.dto.ZoneDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Zone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {
    Zone findTopByOrderByIdDesc();
}
