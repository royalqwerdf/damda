package com.team_damda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TeamDamdaApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeamDamdaApplication.class, args);
    }

}
