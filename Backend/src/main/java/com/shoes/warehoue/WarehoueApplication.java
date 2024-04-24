package com.shoes.warehoue;

import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WarehoueApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(WarehoueApplication.class, args);
	}

	@Bean
	public ModelMapper creatMapper() {
		ModelMapper mapper = new ModelMapper();
		Configuration config = mapper.getConfiguration();
		config.setSkipNullEnabled(true);
		return mapper;
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(WarehoueApplication.class).properties("spring.config.name: test-api");
	}
}
