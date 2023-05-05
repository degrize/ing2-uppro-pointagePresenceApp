package com.uppro.pointagepresenceapp.service;

import com.uppro.pointagepresenceapp.service.dto.TravailDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.uppro.pointagepresenceapp.domain.Travail}.
 */
public interface TravailService {
    /**
     * Save a travail.
     *
     * @param travailDTO the entity to save.
     * @return the persisted entity.
     */
    TravailDTO save(TravailDTO travailDTO);

    /**
     * Updates a travail.
     *
     * @param travailDTO the entity to update.
     * @return the persisted entity.
     */
    TravailDTO update(TravailDTO travailDTO);

    /**
     * Partially updates a travail.
     *
     * @param travailDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TravailDTO> partialUpdate(TravailDTO travailDTO);

    /**
     * Get all the travails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TravailDTO> findAll(Pageable pageable);

    /**
     * Get the "id" travail.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TravailDTO> findOne(Long id);

    /**
     * Delete the "id" travail.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
