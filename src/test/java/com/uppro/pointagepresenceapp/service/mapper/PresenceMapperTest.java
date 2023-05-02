package com.uppro.pointagepresenceapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PresenceMapperTest {

    private PresenceMapper presenceMapper;

    @BeforeEach
    public void setUp() {
        presenceMapper = new PresenceMapperImpl();
    }
}
