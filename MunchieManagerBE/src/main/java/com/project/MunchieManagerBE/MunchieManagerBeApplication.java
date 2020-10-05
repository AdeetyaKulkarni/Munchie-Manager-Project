package com.project.MunchieManagerBE;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.project"})
public class MunchieManagerBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(MunchieManagerBeApplication.class, args);
	}

}
