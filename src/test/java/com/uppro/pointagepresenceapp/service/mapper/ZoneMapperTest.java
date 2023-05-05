package com.uppro.pointagepresenceapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ZoneMapperTest {

    private ZoneMapper zoneMapper;

    @BeforeEach
    public void setUp() {
        zoneMapper = new ZoneMapperImpl();
    }
}
