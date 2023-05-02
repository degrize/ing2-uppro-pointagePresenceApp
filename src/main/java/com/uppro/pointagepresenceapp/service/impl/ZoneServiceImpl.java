package com.uppro.pointagepresenceapp.service.impl;

import com.uppro.pointagepresenceapp.domain.Zone;
import com.uppro.pointagepresenceapp.repository.ZoneRepository;
import com.uppro.pointagepresenceapp.service.ZoneService;
import com.uppro.pointagepresenceapp.service.dto.ZoneDTO;
import com.uppro.pointagepresenceapp.service.mapper.ZoneMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Zone}.
 */
@Service
@Transactional
public class ZoneServiceImpl implements ZoneService {

    private final Logger log = LoggerFactory.getLogger(ZoneServiceImpl.class);

    private final ZoneRepository zoneRepository;

    private final ZoneMapper zoneMapper;

    public ZoneServiceImpl(ZoneRepository zoneRepository, ZoneMapper zoneMapper) {
        this.zoneRepository = zoneRepository;
        this.zoneMapper = zoneMapper;
    }

    @Override
    public ZoneDTO save(ZoneDTO zoneDTO) {
        log.debug("Request to save Zone : {}", zoneDTO);
        Zone zone = zoneMapper.toEntity(zoneDTO);
        zone = zoneRepository.save(zone);
        return zoneMapper.toDto(zone);
    }

    @Override
    public ZoneDTO update(ZoneDTO zoneDTO) {
        log.debug("Request to update Zone : {}", zoneDTO);
        Zone zone = zoneMapper.toEntity(zoneDTO);
        // no save call needed as we have no fields that can be updated
        return zoneMapper.toDto(zone);
    }

    @Override
    public Optional<ZoneDTO> partialUpdate(ZoneDTO zoneDTO) {
        log.debug("Request to partially update Zone : {}", zoneDTO);

        return zoneRepository
            .findById(zoneDTO.getId())
            .map(existingZone -> {
                zoneMapper.partialUpdate(existingZone, zoneDTO);

                return existingZone;
            })
            // .map(zoneRepository::save)
            .map(zoneMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ZoneDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Zones");
        return zoneRepository.findAll(pageable).map(zoneMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ZoneDTO> findOne(Long id) {
        log.debug("Request to get Zone : {}", id);
        return zoneRepository.findById(id).map(zoneMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Zone : {}", id);
        zoneRepository.deleteById(id);
    }
}
