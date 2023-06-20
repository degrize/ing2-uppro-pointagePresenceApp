package com.uppro.pointagepresenceapp.service.mapper;

import com.uppro.pointagepresenceapp.domain.Presence;
import com.uppro.pointagepresenceapp.domain.User;
import com.uppro.pointagepresenceapp.domain.Zone;
import com.uppro.pointagepresenceapp.service.dto.PresenceDTO;
import com.uppro.pointagepresenceapp.service.dto.UserDTO;
import com.uppro.pointagepresenceapp.service.dto.ZoneDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Zone} and its DTO {@link ZoneDTO}.
 */
@Mapper(componentModel = "spring")
public interface ZoneMapper extends EntityMapper<ZoneDTO, Zone> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    ZoneDTO toDto(Zone s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    @Mapping(target = "matricule", source = "matricule")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "firstName", source = "firstName")
    UserDTO toDtoUserLogin(User user);
}
