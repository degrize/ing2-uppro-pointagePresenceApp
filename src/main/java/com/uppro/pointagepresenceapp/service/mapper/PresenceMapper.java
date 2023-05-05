package com.uppro.pointagepresenceapp.service.mapper;

import com.uppro.pointagepresenceapp.domain.Presence;
import com.uppro.pointagepresenceapp.service.dto.PresenceDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Presence} and its DTO {@link PresenceDTO}.
 */
@Mapper(componentModel = "spring")
public interface PresenceMapper extends EntityMapper<PresenceDTO, Presence> {}
