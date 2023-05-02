package com.uppro.pointagepresenceapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.uppro.pointagepresenceapp.IntegrationTest;
import com.uppro.pointagepresenceapp.domain.Presence;
import com.uppro.pointagepresenceapp.domain.enumeration.HoraireType;
import com.uppro.pointagepresenceapp.repository.PresenceRepository;
import com.uppro.pointagepresenceapp.service.dto.PresenceDTO;
import com.uppro.pointagepresenceapp.service.mapper.PresenceMapper;
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
 * Integration tests for the {@link PresenceResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PresenceResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final HoraireType DEFAULT_HORAIRE = HoraireType.MATIN;
    private static final HoraireType UPDATED_HORAIRE = HoraireType.SOIR;

    private static final String DEFAULT_BILAN = "AAAAAAAAAA";
    private static final String UPDATED_BILAN = "BBBBBBBBBB";

    private static final Double DEFAULT_LONGITUDE = 1D;
    private static final Double UPDATED_LONGITUDE = 2D;

    private static final Double DEFAULT_LATTITUDE = 1D;
    private static final Double UPDATED_LATTITUDE = 2D;

    private static final String ENTITY_API_URL = "/api/presences";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PresenceRepository presenceRepository;

    @Autowired
    private PresenceMapper presenceMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPresenceMockMvc;

    private Presence presence;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Presence createEntity(EntityManager em) {
        Presence presence = new Presence()
            .date(DEFAULT_DATE)
            .horaire(DEFAULT_HORAIRE)
            .bilan(DEFAULT_BILAN)
            .longitude(DEFAULT_LONGITUDE)
            .lattitude(DEFAULT_LATTITUDE);
        return presence;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Presence createUpdatedEntity(EntityManager em) {
        Presence presence = new Presence()
            .date(UPDATED_DATE)
            .horaire(UPDATED_HORAIRE)
            .bilan(UPDATED_BILAN)
            .longitude(UPDATED_LONGITUDE)
            .lattitude(UPDATED_LATTITUDE);
        return presence;
    }

    @BeforeEach
    public void initTest() {
        presence = createEntity(em);
    }

    @Test
    @Transactional
    void createPresence() throws Exception {
        int databaseSizeBeforeCreate = presenceRepository.findAll().size();
        // Create the Presence
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);
        restPresenceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(presenceDTO)))
            .andExpect(status().isCreated());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeCreate + 1);
        Presence testPresence = presenceList.get(presenceList.size() - 1);
        assertThat(testPresence.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testPresence.getHoraire()).isEqualTo(DEFAULT_HORAIRE);
        assertThat(testPresence.getBilan()).isEqualTo(DEFAULT_BILAN);
        assertThat(testPresence.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testPresence.getLattitude()).isEqualTo(DEFAULT_LATTITUDE);
    }

    @Test
    @Transactional
    void createPresenceWithExistingId() throws Exception {
        // Create the Presence with an existing ID
        presence.setId(1L);
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        int databaseSizeBeforeCreate = presenceRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPresenceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(presenceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = presenceRepository.findAll().size();
        // set the field null
        presence.setDate(null);

        // Create the Presence, which fails.
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        restPresenceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(presenceDTO)))
            .andExpect(status().isBadRequest());

        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkHoraireIsRequired() throws Exception {
        int databaseSizeBeforeTest = presenceRepository.findAll().size();
        // set the field null
        presence.setHoraire(null);

        // Create the Presence, which fails.
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        restPresenceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(presenceDTO)))
            .andExpect(status().isBadRequest());

        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLongitudeIsRequired() throws Exception {
        int databaseSizeBeforeTest = presenceRepository.findAll().size();
        // set the field null
        presence.setLongitude(null);

        // Create the Presence, which fails.
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        restPresenceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(presenceDTO)))
            .andExpect(status().isBadRequest());

        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLattitudeIsRequired() throws Exception {
        int databaseSizeBeforeTest = presenceRepository.findAll().size();
        // set the field null
        presence.setLattitude(null);

        // Create the Presence, which fails.
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        restPresenceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(presenceDTO)))
            .andExpect(status().isBadRequest());

        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPresences() throws Exception {
        // Initialize the database
        presenceRepository.saveAndFlush(presence);

        // Get all the presenceList
        restPresenceMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(presence.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].horaire").value(hasItem(DEFAULT_HORAIRE.toString())))
            .andExpect(jsonPath("$.[*].bilan").value(hasItem(DEFAULT_BILAN)))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].lattitude").value(hasItem(DEFAULT_LATTITUDE.doubleValue())));
    }

    @Test
    @Transactional
    void getPresence() throws Exception {
        // Initialize the database
        presenceRepository.saveAndFlush(presence);

        // Get the presence
        restPresenceMockMvc
            .perform(get(ENTITY_API_URL_ID, presence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(presence.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.horaire").value(DEFAULT_HORAIRE.toString()))
            .andExpect(jsonPath("$.bilan").value(DEFAULT_BILAN))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.lattitude").value(DEFAULT_LATTITUDE.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingPresence() throws Exception {
        // Get the presence
        restPresenceMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPresence() throws Exception {
        // Initialize the database
        presenceRepository.saveAndFlush(presence);

        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();

        // Update the presence
        Presence updatedPresence = presenceRepository.findById(presence.getId()).get();
        // Disconnect from session so that the updates on updatedPresence are not directly saved in db
        em.detach(updatedPresence);
        updatedPresence
            .date(UPDATED_DATE)
            .horaire(UPDATED_HORAIRE)
            .bilan(UPDATED_BILAN)
            .longitude(UPDATED_LONGITUDE)
            .lattitude(UPDATED_LATTITUDE);
        PresenceDTO presenceDTO = presenceMapper.toDto(updatedPresence);

        restPresenceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, presenceDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(presenceDTO))
            )
            .andExpect(status().isOk());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
        Presence testPresence = presenceList.get(presenceList.size() - 1);
        assertThat(testPresence.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPresence.getHoraire()).isEqualTo(UPDATED_HORAIRE);
        assertThat(testPresence.getBilan()).isEqualTo(UPDATED_BILAN);
        assertThat(testPresence.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testPresence.getLattitude()).isEqualTo(UPDATED_LATTITUDE);
    }

    @Test
    @Transactional
    void putNonExistingPresence() throws Exception {
        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();
        presence.setId(count.incrementAndGet());

        // Create the Presence
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPresenceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, presenceDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(presenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPresence() throws Exception {
        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();
        presence.setId(count.incrementAndGet());

        // Create the Presence
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPresenceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(presenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPresence() throws Exception {
        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();
        presence.setId(count.incrementAndGet());

        // Create the Presence
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPresenceMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(presenceDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePresenceWithPatch() throws Exception {
        // Initialize the database
        presenceRepository.saveAndFlush(presence);

        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();

        // Update the presence using partial update
        Presence partialUpdatedPresence = new Presence();
        partialUpdatedPresence.setId(presence.getId());

        partialUpdatedPresence.date(UPDATED_DATE).horaire(UPDATED_HORAIRE).bilan(UPDATED_BILAN).lattitude(UPDATED_LATTITUDE);

        restPresenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPresence.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPresence))
            )
            .andExpect(status().isOk());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
        Presence testPresence = presenceList.get(presenceList.size() - 1);
        assertThat(testPresence.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPresence.getHoraire()).isEqualTo(UPDATED_HORAIRE);
        assertThat(testPresence.getBilan()).isEqualTo(UPDATED_BILAN);
        assertThat(testPresence.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testPresence.getLattitude()).isEqualTo(UPDATED_LATTITUDE);
    }

    @Test
    @Transactional
    void fullUpdatePresenceWithPatch() throws Exception {
        // Initialize the database
        presenceRepository.saveAndFlush(presence);

        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();

        // Update the presence using partial update
        Presence partialUpdatedPresence = new Presence();
        partialUpdatedPresence.setId(presence.getId());

        partialUpdatedPresence
            .date(UPDATED_DATE)
            .horaire(UPDATED_HORAIRE)
            .bilan(UPDATED_BILAN)
            .longitude(UPDATED_LONGITUDE)
            .lattitude(UPDATED_LATTITUDE);

        restPresenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPresence.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPresence))
            )
            .andExpect(status().isOk());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
        Presence testPresence = presenceList.get(presenceList.size() - 1);
        assertThat(testPresence.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPresence.getHoraire()).isEqualTo(UPDATED_HORAIRE);
        assertThat(testPresence.getBilan()).isEqualTo(UPDATED_BILAN);
        assertThat(testPresence.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testPresence.getLattitude()).isEqualTo(UPDATED_LATTITUDE);
    }

    @Test
    @Transactional
    void patchNonExistingPresence() throws Exception {
        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();
        presence.setId(count.incrementAndGet());

        // Create the Presence
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPresenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, presenceDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(presenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPresence() throws Exception {
        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();
        presence.setId(count.incrementAndGet());

        // Create the Presence
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPresenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(presenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPresence() throws Exception {
        int databaseSizeBeforeUpdate = presenceRepository.findAll().size();
        presence.setId(count.incrementAndGet());

        // Create the Presence
        PresenceDTO presenceDTO = presenceMapper.toDto(presence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPresenceMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(presenceDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Presence in the database
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePresence() throws Exception {
        // Initialize the database
        presenceRepository.saveAndFlush(presence);

        int databaseSizeBeforeDelete = presenceRepository.findAll().size();

        // Delete the presence
        restPresenceMockMvc
            .perform(delete(ENTITY_API_URL_ID, presence.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Presence> presenceList = presenceRepository.findAll();
        assertThat(presenceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
