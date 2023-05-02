package com.uppro.pointagepresenceapp.service;

import com.uppro.pointagepresenceapp.service.dto.PresenceDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.uppro.pointagepresenceapp.domain.Presence}.
 */
public interface PresenceService {
    /**
     * Save a presence.
     *
     * @param presenceDTO the entity to save.
     * @return the persisted entity.
     */
    PresenceDTO save(PresenceDTO presenceDTO);

    /**
     * Updates a presence.
     *
     * @param presenceDTO the entity to update.
     * @return the persisted entity.
     */
    PresenceDTO update(PresenceDTO presenceDTO);

    /**
     * Partially updates a presence.
     *
     * @param presenceDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<PresenceDTO> partialUpdate(PresenceDTO presenceDTO);

    /**
     * Get all the presences.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PresenceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" presence.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PresenceDTO> findOne(Long id);

    /**
     * Delete the "id" presence.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
