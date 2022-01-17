package com.example.demo;
import java.util.*;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class OnlineManager extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private Queue<String> busquedas = new LinkedList<>();
	private Map<String, Sala> salas = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	//salas.put(conexion1.getId(), sala)
	//salas.put(conexion2.getId(), sala)
	
	@Override
	public void afterConnectionEstablished(WebSocketSession conexion) throws Exception {
		System.out.println("Se ha conectado el usuario de ID: " + conexion.getId());
		sessions.put(conexion.getId(), conexion);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession conexion, CloseStatus status) throws Exception{
		System.out.println("El usuario de ID: " + conexion.getId() + " ha cerrado la conexión con el estado " +status);
		sessions.remove(conexion.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession conexion, TextMessage message) throws Exception{
		//Handle mensajes y sus opciones (Esto)
		//Campo 1: Tipo - Ingame, Busqueda, Revancha
		JsonNode node = mapper.readTree(message.getPayload());
		String tipo = node.get("tipo").asText();
		String mensaje = node.get("mensaje").asText();
		if(tipo.equals("Busqueda")) {
			//Introducir al usuario a la lista de usuarios buscando
			if(mensaje.equals("Abrir")) {
				busquedas.add(conexion.getId());
			}else if (mensaje.equals("Cerrar")) {
				busquedas.remove(conexion.getId());
			}
		}else if(tipo.equals("Ingame")){
			int posX = node.get("posicionX").asInt(); //Equivale a X, se manda al otro jugador para sobreescribir
			int posY = node.get("posicionY").asInt(); //Equivale a Y, se manda al otro jugador para sobreescribir
			//Mensaje equivale a la nueva posición de la stateMachine. 
			//Se envia "mensaje" al otro jugador para que cambie la stateMachine de su otro jugador
			
		}else if(tipo.equals("Revancha")) {
			if(mensaje.equals("Aceptar")) {
				//Comprobar si la otra persona ha aceptado la revancha o no. Si se ha aceptado, empezar otra partida.
			}else if (mensaje.equals("Rechazar")) {
				//Mandar de vuelta a ambas personas sobre partida rechazada.
				
			}
		}
		//If según el tipo
		//Campo 2: Información extra?????
		//String msg = message.getPayload();
	}
	
	protected void ingameMessage(TextMessage message) {
		
	}
}
