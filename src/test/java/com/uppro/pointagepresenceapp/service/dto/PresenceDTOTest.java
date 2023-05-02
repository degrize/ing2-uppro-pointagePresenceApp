package com.uppro.pointagepresenceapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.uppro.pointagepresenceapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PresenceDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PresenceDTO.class);
        PresenceDTO presenceDTO1 = new PresenceDTO();
        presenceDTO1.setId(1L);
        PresenceDTO presenceDTO2 = new PresenceDTO();
        assertThat(presenceDTO1).isNotEqualTo(presenceDTO2);
        presenceDTO2.setId(presenceDTO1.getId());
        assertThat(presenceDTO1).isEqualTo(presenceDTO2);
        presenceDTO2.setId(2L);
        assertThat(presenceDTO1).isNotEqualTo(presenceDTO2);
        presenceDTO1.setId(null);
        assertThat(presenceDTO1).isNotEqualTo(presenceDTO2);
    }
}
