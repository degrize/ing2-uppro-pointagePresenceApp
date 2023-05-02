package com.uppro.pointagepresenceapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.uppro.pointagepresenceapp.IntegrationTest;
import com.uppro.pointagepresenceapp.domain.Travail;
import com.uppro.pointagepresenceapp.domain.enumeration.TypeTravail;
import com.uppro.pointagepresenceapp.repository.TravailRepository;
import com.uppro.pointagepresenceapp.service.dto.TravailDTO;
import com.uppro.pointagepresenceapp.service.mapper.TravailMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TravailResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TravailResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final TypeTravail DEFAULT_TYPE_TRAVAIL = TypeTravail.JOURNALIER;
    private static final TypeTravail UPDATED_TYPE_TRAVAIL = TypeTravail.HEBDOMADAIRE;

    private static final String ENTITY_API_URL = "/api/travails";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TravailRepository travailRepository;

    @Autowired
    private TravailMapper travailMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTravailMockMvc;

    private Travail travail;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Travail createEntity(EntityManager em) {
        Travail travail = new Travail().date(DEFAULT_DATE).typeTravail(DEFAULT_TYPE_TRAVAIL);
        return travail;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Travail createUpdatedEntity(EntityManager em) {
        Travail travail = new Travail().date(UPDATED_DATE).typeTravail(UPDATED_TYPE_TRAVAIL);
        return travail;
    }

    @BeforeEach
    public void initTest() {
        travail = createEntity(em);
    }

    @Test
    @Transactional
    void createTravail() throws Exception {
        int databaseSizeBeforeCreate = travailRepository.findAll().size();
        // Create the Travail
        TravailDTO travailDTO = travailMapper.toDto(travail);
        restTravailMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(travailDTO)))
            .andExpect(status().isCreated());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeCreate + 1);
        Travail testTravail = travailList.get(travailList.size() - 1);
        assertThat(testTravail.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTravail.getTypeTravail()).isEqualTo(DEFAULT_TYPE_TRAVAIL);
    }

    @Test
    @Transactional
    void createTravailWithExistingId() throws Exception {
        // Create the Travail with an existing ID
        travail.setId(1L);
        TravailDTO travailDTO = travailMapper.toDto(travail);

        int databaseSizeBeforeCreate = travailRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTravailMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(travailDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTravails() throws Exception {
        // Initialize the database
        travailRepository.saveAndFlush(travail);

        // Get all the travailList
        restTravailMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(travail.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].typeTravail").value(hasItem(DEFAULT_TYPE_TRAVAIL.toString())));
    }

    @Test
    @Transactional
    void getTravail() throws Exception {
        // Initialize the database
        travailRepository.saveAndFlush(travail);

        // Get the travail
        restTravailMockMvc
            .perform(get(ENTITY_API_URL_ID, travail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(travail.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.typeTravail").value(DEFAULT_TYPE_TRAVAIL.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTravail() throws Exception {
        // Get the travail
        restTravailMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTravail() throws Exception {
        // Initialize the database
        travailRepository.saveAndFlush(travail);

        int databaseSizeBeforeUpdate = travailRepository.findAll().size();

        // Update the travail
        Travail updatedTravail = travailRepository.findById(travail.getId()).get();
        // Disconnect from session so that the updates on updatedTravail are not directly saved in db
        em.detach(updatedTravail);
        updatedTravail.date(UPDATED_DATE).typeTravail(UPDATED_TYPE_TRAVAIL);
        TravailDTO travailDTO = travailMapper.toDto(updatedTravail);

        restTravailMockMvc
            .perform(
                put(ENTITY_API_URL_ID, travailDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(travailDTO))
            )
            .andExpect(status().isOk());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeUpdate);
        Travail testTravail = travailList.get(travailList.size() - 1);
        assertThat(testTravail.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTravail.getTypeTravail()).isEqualTo(UPDATED_TYPE_TRAVAIL);
    }

    @Test
    @Transactional
    void putNonExistingTravail() throws Exception {
        int databaseSizeBeforeUpdate = travailRepository.findAll().size();
        travail.setId(count.incrementAndGet());

        // Create the Travail
        TravailDTO travailDTO = travailMapper.toDto(travail);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTravailMockMvc
            .perform(
                put(ENTITY_API_URL_ID, travailDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(travailDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTravail() throws Exception {
        int databaseSizeBeforeUpdate = travailRepository.findAll().size();
        travail.setId(count.incrementAndGet());

        // Create the Travail
        TravailDTO travailDTO = travailMapper.toDto(travail);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTravailMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(travailDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTravail() throws Exception {
        int databaseSizeBeforeUpdate = travailRepository.findAll().size();
        travail.setId(count.incrementAndGet());

        // Create the Travail
        TravailDTO travailDTO = travailMapper.toDto(travail);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTravailMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(travailDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTravailWithPatch() throws Exception {
        // Initialize the database
        travailRepository.saveAndFlush(travail);

        int databaseSizeBeforeUpdate = travailRepository.findAll().size();

        // Update the travail using partial update
        Travail partialUpdatedTravail = new Travail();
        partialUpdatedTravail.setId(travail.getId());

        partialUpdatedTravail.date(UPDATED_DATE);

        restTravailMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTravail.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTravail))
            )
            .andExpect(status().isOk());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeUpdate);
        Travail testTravail = travailList.get(travailList.size() - 1);
        assertThat(testTravail.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTravail.getTypeTravail()).isEqualTo(DEFAULT_TYPE_TRAVAIL);
    }

    @Test
    @Transactional
    void fullUpdateTravailWithPatch() throws Exception {
        // Initialize the database
        travailRepository.saveAndFlush(travail);

        int databaseSizeBeforeUpdate = travailRepository.findAll().size();

        // Update the travail using partial update
        Travail partialUpdatedTravail = new Travail();
        partialUpdatedTravail.setId(travail.getId());

        partialUpdatedTravail.date(UPDATED_DATE).typeTravail(UPDATED_TYPE_TRAVAIL);

        restTravailMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTravail.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTravail))
            )
            .andExpect(status().isOk());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeUpdate);
        Travail testTravail = travailList.get(travailList.size() - 1);
        assertThat(testTravail.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTravail.getTypeTravail()).isEqualTo(UPDATED_TYPE_TRAVAIL);
    }

    @Test
    @Transactional
    void patchNonExistingTravail() throws Exception {
        int databaseSizeBeforeUpdate = travailRepository.findAll().size();
        travail.setId(count.incrementAndGet());

        // Create the Travail
        TravailDTO travailDTO = travailMapper.toDto(travail);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTravailMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, travailDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(travailDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTravail() throws Exception {
        int databaseSizeBeforeUpdate = travailRepository.findAll().size();
        travail.setId(count.incrementAndGet());

        // Create the Travail
        TravailDTO travailDTO = travailMapper.toDto(travail);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTravailMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(travailDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTravail() throws Exception {
        int databaseSizeBeforeUpdate = travailRepository.findAll().size();
        travail.setId(count.incrementAndGet());

        // Create the Travail
        TravailDTO travailDTO = travailMapper.toDto(travail);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTravailMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(travailDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Travail in the database
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTravail() throws Exception {
        // Initialize the database
        travailRepository.saveAndFlush(travail);

        int databaseSizeBeforeDelete = travailRepository.findAll().size();

        // Delete the travail
        restTravailMockMvc
            .perform(delete(ENTITY_API_URL_ID, travail.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Travail> travailList = travailRepository.findAll();
        assertThat(travailList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
