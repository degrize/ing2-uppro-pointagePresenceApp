package com.uppro.pointagepresenceapp.repository;

import com.uppro.pointagepresenceapp.domain.Travail;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Travail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TravailRepository extends JpaRepository<Travail, Long> {}
