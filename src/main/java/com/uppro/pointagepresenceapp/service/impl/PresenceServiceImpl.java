package com.uppro.pointagepresenceapp.service.impl;

import com.uppro.pointagepresenceapp.domain.Presence;
import com.uppro.pointagepresenceapp.domain.User;
import com.uppro.pointagepresenceapp.repository.PresenceRepository;
import com.uppro.pointagepresenceapp.repository.UserRepository;
import com.uppro.pointagepresenceapp.service.PresenceService;
import com.uppro.pointagepresenceapp.service.dto.PresenceDTO;
import com.uppro.pointagepresenceapp.service.mapper.PresenceMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Presence}.
 */
@Service
@Transactional
public class PresenceServiceImpl implements PresenceService {

    private final Logger log = LoggerFactory.getLogger(PresenceServiceImpl.class);

    private final PresenceRepository presenceRepository;

    @Autowired
    private UserRepository userRepository;

    private final PresenceMapper presenceMapper;

    public PresenceServiceImpl(PresenceRepository presenceRepository, PresenceMapper presenceMapper) {
        this.presenceRepository = presenceRepository;
        this.presenceMapper = presenceMapper;
    }

    @Override
    public PresenceDTO save(PresenceDTO presenceDTO) {
        log.debug("Request to save Presence : {}", presenceDTO);
        Presence presence = presenceMapper.toEntity(presenceDTO);
        User user = userRepository.findByLogin(presenceDTO.getUser().getLogin());
        presence.setUser(user);
        presence = presenceRepository.save(presence);
        return presenceMapper.toDto(presence);
    }

    @Override
    public PresenceDTO update(PresenceDTO presenceDTO) {
        log.debug("Request to update Presence : {}", presenceDTO);
        Presence presence = presenceMapper.toEntity(presenceDTO);
        User user = userRepository.findByLogin(presenceDTO.getUser().getLogin());
        presence.setUser(user);
        presence = presenceRepository.save(presence);
        return presenceMapper.toDto(presence);
    }

    @Override
    public Optional<PresenceDTO> partialUpdate(PresenceDTO presenceDTO) {
        log.debug("Request to partially update Presence : {}", presenceDTO);

        return presenceRepository
            .findById(presenceDTO.getId())
            .map(existingPresence -> {
                presenceMapper.partialUpdate(existingPresence, presenceDTO);

                return existingPresence;
            })
            .map(presenceRepository::save)
            .map(presenceMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PresenceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Presences");
        return presenceRepository.findAll(pageable).map(presenceMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PresenceDTO> findOne(Long id) {
        log.debug("Request to get Presence : {}", id);
        return presenceRepository.findById(id).map(presenceMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Presence : {}", id);
        presenceRepository.deleteById(id);
    }
}
