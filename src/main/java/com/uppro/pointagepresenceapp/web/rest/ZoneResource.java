package com.uppro.pointagepresenceapp.web.rest;

import com.uppro.pointagepresenceapp.domain.Zone;
import com.uppro.pointagepresenceapp.repository.ZoneRepository;
import com.uppro.pointagepresenceapp.service.ZoneService;
import com.uppro.pointagepresenceapp.service.dto.ZoneDTO;
import com.uppro.pointagepresenceapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
 * REST controller for managing {@link com.uppro.pointagepresenceapp.domain.Zone}.
 */
@RestController
@RequestMapping("/api")
public class ZoneResource {

    private final Logger log = LoggerFactory.getLogger(ZoneResource.class);

    private static final String ENTITY_NAME = "zone";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ZoneService zoneService;

    private final ZoneRepository zoneRepository;

    public ZoneResource(ZoneService zoneService, ZoneRepository zoneRepository) {
        this.zoneService = zoneService;
        this.zoneRepository = zoneRepository;
    }

    /**
     * {@code POST  /zones} : Create a new zone.
     *
     * @param zoneDTO the zoneDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new zoneDTO, or with status {@code 400 (Bad Request)} if the zone has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/zones")
    public ResponseEntity<ZoneDTO> createZone(@RequestBody ZoneDTO zoneDTO) throws URISyntaxException {
        log.debug("REST request to save Zone : {}", zoneDTO);
        if (zoneDTO.getId() != null) {
            throw new BadRequestAlertException("A new zone cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ZoneDTO result = zoneService.save(zoneDTO);
        return ResponseEntity
            .created(new URI("/api/zones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /zones/:id} : Updates an existing zone.
     *
     * @param id the id of the zoneDTO to save.
     * @param zoneDTO the zoneDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated zoneDTO,
     * or with status {@code 400 (Bad Request)} if the zoneDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the zoneDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/zones/{id}")
    public ResponseEntity<ZoneDTO> updateZone(@PathVariable(value = "id", required = false) final Long id, @RequestBody ZoneDTO zoneDTO)
        throws URISyntaxException {
        log.debug("REST request to update Zone : {}, {}", id, zoneDTO);
        if (zoneDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, zoneDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!zoneRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ZoneDTO result = zoneService.update(zoneDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, zoneDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /zones/:id} : Partial updates given fields of an existing zone, field will ignore if it is null
     *
     * @param id the id of the zoneDTO to save.
     * @param zoneDTO the zoneDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated zoneDTO,
     * or with status {@code 400 (Bad Request)} if the zoneDTO is not valid,
     * or with status {@code 404 (Not Found)} if the zoneDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the zoneDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/zones/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ZoneDTO> partialUpdateZone(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ZoneDTO zoneDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Zone partially : {}, {}", id, zoneDTO);
        if (zoneDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, zoneDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!zoneRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ZoneDTO> result = zoneService.partialUpdate(zoneDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, zoneDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /zones} : get all the zones.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of zones in body.
     */
    @GetMapping("/zones")
    public ResponseEntity<List<ZoneDTO>> getAllZones(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Zones");
        Page<ZoneDTO> page = zoneService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /zones/:id} : get the "id" zone.
     *
     * @param id the id of the zoneDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the zoneDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/zones/{id}")
    public ResponseEntity<ZoneDTO> getZone(@PathVariable Long id) {
        log.debug("REST request to get Zone : {}", id);
        Optional<ZoneDTO> zoneDTO = zoneService.findOne(id);
        return ResponseUtil.wrapOrNotFound(zoneDTO);
    }

    /**
     * {@code DELETE  /zones/:id} : delete the "id" zone.
     *
     * @param id the id of the zoneDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/zones/{id}")
    public ResponseEntity<Void> deleteZone(@PathVariable Long id) {
        log.debug("REST request to delete Zone : {}", id);
        zoneService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/zones/last-zone")
    public ResponseEntity<Zone> getLastZone() {
        log.debug("REST request to get the Last Zone");
        Zone lastZone = zoneService.getLastZone();
        return ResponseEntity.ok().body(lastZone);
    }
}
