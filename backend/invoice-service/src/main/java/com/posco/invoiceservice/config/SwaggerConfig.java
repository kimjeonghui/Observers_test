package com.posco.invoiceservice.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI(){
        List<Server> serverList = new ArrayList<>();

        Server server = new Server();
        server.setUrl("http://localhost:8081");

        serverList.add(server);

        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer").bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER).name("Authorization");
        SecurityRequirement securityRequirement = new SecurityRequirement();

        return new OpenAPI().servers(serverList)
                .components(new Components().addSecuritySchemes("bearAuth", securityScheme))
                .security(Arrays.asList(securityRequirement))
                .info(new Info().title("Pobservers").description("API"));
    }
}
