package com.uppro.pointagepresenceapp.service.mapper;

import com.uppro.pointagepresenceapp.domain.Zone;
import com.uppro.pointagepresenceapp.service.dto.ZoneDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Zone} and its DTO {@link ZoneDTO}.
 */
@Mapper(componentModel = "spring")
public interface ZoneMapper extends EntityMapper<ZoneDTO, Zone> {}
