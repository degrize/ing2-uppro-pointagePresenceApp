package com.uppro.pointagepresenceapp.service.impl;

import com.uppro.pointagepresenceapp.domain.Travail;
import com.uppro.pointagepresenceapp.repository.TravailRepository;
import com.uppro.pointagepresenceapp.service.TravailService;
import com.uppro.pointagepresenceapp.service.dto.TravailDTO;
import com.uppro.pointagepresenceapp.service.mapper.TravailMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Travail}.
 */
@Service
@Transactional
public class TravailServiceImpl implements TravailService {

    private final Logger log = LoggerFactory.getLogger(TravailServiceImpl.class);

    private final TravailRepository travailRepository;

    private final TravailMapper travailMapper;

    public TravailServiceImpl(TravailRepository travailRepository, TravailMapper travailMapper) {
        this.travailRepository = travailRepository;
        this.travailMapper = travailMapper;
    }

    @Override
    public TravailDTO save(TravailDTO travailDTO) {
        log.debug("Request to save Travail : {}", travailDTO);
        Travail travail = travailMapper.toEntity(travailDTO);
        travail = travailRepository.save(travail);
        return travailMapper.toDto(travail);
    }

    @Override
    public TravailDTO update(TravailDTO travailDTO) {
        log.debug("Request to update Travail : {}", travailDTO);
        Travail travail = travailMapper.toEntity(travailDTO);
        travail = travailRepository.save(travail);
        return travailMapper.toDto(travail);
    }

    @Override
    public Optional<TravailDTO> partialUpdate(TravailDTO travailDTO) {
        log.debug("Request to partially update Travail : {}", travailDTO);

        return travailRepository
            .findById(travailDTO.getId())
            .map(existingTravail -> {
                travailMapper.partialUpdate(existingTravail, travailDTO);

                return existingTravail;
            })
            .map(travailRepository::save)
            .map(travailMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TravailDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Travails");
        return travailRepository.findAll(pageable).map(travailMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TravailDTO> findOne(Long id) {
        log.debug("Request to get Travail : {}", id);
        return travailRepository.findById(id).map(travailMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Travail : {}", id);
        travailRepository.deleteById(id);
    }
}
