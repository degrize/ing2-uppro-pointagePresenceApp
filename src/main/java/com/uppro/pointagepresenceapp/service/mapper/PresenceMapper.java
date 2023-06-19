package com.uppro.pointagepresenceapp.service.mapper;

import com.uppro.pointagepresenceapp.domain.Presence;
import com.uppro.pointagepresenceapp.domain.User;
import com.uppro.pointagepresenceapp.service.dto.PresenceDTO;
import com.uppro.pointagepresenceapp.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Presence} and its DTO {@link PresenceDTO}.
 */
@Mapper(componentModel = "spring")
public interface PresenceMapper extends EntityMapper<PresenceDTO, Presence> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    PresenceDTO toDto(Presence s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    @Mapping(target = "matricule", source = "matricule")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "firstName", source = "firstName")
    UserDTO toDtoUserLogin(User user);
}
