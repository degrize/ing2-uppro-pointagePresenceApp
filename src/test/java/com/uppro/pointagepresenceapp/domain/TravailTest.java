package com.uppro.pointagepresenceapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.uppro.pointagepresenceapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TravailTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Travail.class);
        Travail travail1 = new Travail();
        travail1.setId(1L);
        Travail travail2 = new Travail();
        travail2.setId(travail1.getId());
        assertThat(travail1).isEqualTo(travail2);
        travail2.setId(2L);
        assertThat(travail1).isNotEqualTo(travail2);
        travail1.setId(null);
        assertThat(travail1).isNotEqualTo(travail2);
    }
}
