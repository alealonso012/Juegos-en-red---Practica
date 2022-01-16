package com.example.demo;

import org.springframework.web.socket.WebSocketSession;

public class Sala {
	WebSocketSession usuario1;
	WebSocketSession usuario2;
	
	
	public WebSocketSession getUsuario1() {
		return usuario1;
	}
	public void setUsuario1(WebSocketSession usuario1) {
		this.usuario1 = usuario1;
	}
	public WebSocketSession getUsuario2() {
		return usuario2;
	}
	public void setUsuario2(WebSocketSession usuario2) {
		this.usuario2 = usuario2;
	}

	
}
