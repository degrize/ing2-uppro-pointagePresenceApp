package com.uppro.pointagepresenceapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.uppro.pointagepresenceapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ZoneDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ZoneDTO.class);
        ZoneDTO zoneDTO1 = new ZoneDTO();
        zoneDTO1.setId(1L);
        ZoneDTO zoneDTO2 = new ZoneDTO();
        assertThat(zoneDTO1).isNotEqualTo(zoneDTO2);
        zoneDTO2.setId(zoneDTO1.getId());
        assertThat(zoneDTO1).isEqualTo(zoneDTO2);
        zoneDTO2.setId(2L);
        assertThat(zoneDTO1).isNotEqualTo(zoneDTO2);
        zoneDTO1.setId(null);
        assertThat(zoneDTO1).isNotEqualTo(zoneDTO2);
    }
}
