package com.uppro.pointagepresenceapp.service;

import com.uppro.pointagepresenceapp.service.dto.ZoneDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.uppro.pointagepresenceapp.domain.Zone}.
 */
public interface ZoneService {
    /**
     * Save a zone.
     *
     * @param zoneDTO the entity to save.
     * @return the persisted entity.
     */
    ZoneDTO save(ZoneDTO zoneDTO);

    /**
     * Updates a zone.
     *
     * @param zoneDTO the entity to update.
     * @return the persisted entity.
     */
    ZoneDTO update(ZoneDTO zoneDTO);

    /**
     * Partially updates a zone.
     *
     * @param zoneDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ZoneDTO> partialUpdate(ZoneDTO zoneDTO);

    /**
     * Get all the zones.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ZoneDTO> findAll(Pageable pageable);

    /**
     * Get the "id" zone.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ZoneDTO> findOne(Long id);

    /**
     * Delete the "id" zone.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
