package com.uppro.pointagepresenceapp.service.mapper;

import com.uppro.pointagepresenceapp.domain.Travail;
import com.uppro.pointagepresenceapp.service.dto.TravailDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Travail} and its DTO {@link TravailDTO}.
 */
@Mapper(componentModel = "spring")
public interface TravailMapper extends EntityMapper<TravailDTO, Travail> {}
