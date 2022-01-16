package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.*;


@SpringBootApplication
@EnableWebSocket
public class JerFase3v2Application implements  WebSocketConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(JerFase3v2Application.class, args);
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(echoHandler(), "/online").setAllowedOrigins("*");
		
	}
	
	@Bean
	public OnlineManager echoHandler() {
	return new OnlineManager();
	}


}
