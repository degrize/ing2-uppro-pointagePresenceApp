package com.uppro.pointagepresenceapp.web.rest;

import com.uppro.pointagepresenceapp.repository.PresenceRepository;
import com.uppro.pointagepresenceapp.service.PresenceService;
import com.uppro.pointagepresenceapp.service.dto.PresenceDTO;
import com.uppro.pointagepresenceapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.uppro.pointagepresenceapp.domain.Presence}.
 */
@RestController
@RequestMapping("/api")
public class PresenceResource {

    private final Logger log = LoggerFactory.getLogger(PresenceResource.class);

    private static final String ENTITY_NAME = "presence";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PresenceService presenceService;

    private final PresenceRepository presenceRepository;

    public PresenceResource(PresenceService presenceService, PresenceRepository presenceRepository) {
        this.presenceService = presenceService;
        this.presenceRepository = presenceRepository;
    }

    /**
     * {@code POST  /presences} : Create a new presence.
     *
     * @param presenceDTO the presenceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new presenceDTO, or with status {@code 400 (Bad Request)} if the presence has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/presences")
    public ResponseEntity<PresenceDTO> createPresence(@Valid @RequestBody PresenceDTO presenceDTO) throws URISyntaxException {
        log.debug("REST request to save Presence : {}", presenceDTO);
        if (presenceDTO.getId() != null) {
            throw new BadRequestAlertException("A new presence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PresenceDTO result = presenceService.save(presenceDTO);
        return ResponseEntity
            .created(new URI("/api/presences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /presences/:id} : Updates an existing presence.
     *
     * @param id the id of the presenceDTO to save.
     * @param presenceDTO the presenceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated presenceDTO,
     * or with status {@code 400 (Bad Request)} if the presenceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the presenceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/presences/{id}")
    public ResponseEntity<PresenceDTO> updatePresence(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PresenceDTO presenceDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Presence : {}, {}", id, presenceDTO);
        if (presenceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, presenceDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!presenceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PresenceDTO result = presenceService.update(presenceDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, presenceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /presences/:id} : Partial updates given fields of an existing presence, field will ignore if it is null
     *
     * @param id the id of the presenceDTO to save.
     * @param presenceDTO the presenceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated presenceDTO,
     * or with status {@code 400 (Bad Request)} if the presenceDTO is not valid,
     * or with status {@code 404 (Not Found)} if the presenceDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the presenceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/presences/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PresenceDTO> partialUpdatePresence(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PresenceDTO presenceDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Presence partially : {}, {}", id, presenceDTO);
        if (presenceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, presenceDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!presenceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PresenceDTO> result = presenceService.partialUpdate(presenceDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, presenceDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /presences} : get all the presences.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of presences in body.
     */
    @GetMapping("/presences")
    public ResponseEntity<List<PresenceDTO>> getAllPresences(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Presences");
        Page<PresenceDTO> page = presenceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /presences/:id} : get the "id" presence.
     *
     * @param id the id of the presenceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the presenceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/presences/{id}")
    public ResponseEntity<PresenceDTO> getPresence(@PathVariable Long id) {
        log.debug("REST request to get Presence : {}", id);
        Optional<PresenceDTO> presenceDTO = presenceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(presenceDTO);
    }

    /**
     * {@code DELETE  /presences/:id} : delete the "id" presence.
     *
     * @param id the id of the presenceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/presences/{id}")
    public ResponseEntity<Void> deletePresence(@PathVariable Long id) {
        log.debug("REST request to delete Presence : {}", id);
        presenceService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
