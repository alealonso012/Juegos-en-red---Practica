package com.example.demo;

import java.util.*;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class OnlineManager extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private Queue<String> busquedas = new LinkedList<>();
	private Map<String, String> parejas = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	// salas.put(conexion1.getId(), sala)
	// salas.put(conexion2.getId(), sala)

	@Override
	public void afterConnectionEstablished(WebSocketSession conexion) throws Exception {
		System.out.println("Se ha conectado el usuario de ID: " + conexion.getId());
		sessions.put(conexion.getId(), conexion);
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("tipo", "Conexion");
		newNode.put("mensaje", "Establecida");
		conexion.sendMessage(new TextMessage(newNode.toString()));
	}

	@Override
	public void afterConnectionClosed(WebSocketSession conexion, CloseStatus status) throws Exception {
		
		ObjectNode newNode = mapper.createObjectNode();
					newNode.put("tipo", "Desconectado");

		sessions.get(parejas.get(conexion.getId())).sendMessage(new TextMessage(newNode.toString()));
		// parejas.remove(conexion.getId());
		// sessions.remove(conexion.getId());

		System.out.println("El usuario de ID: " + conexion.getId() + " ha cerrado la conexión con el estado " + status);
	}

	@Override
	protected void handleTextMessage(WebSocketSession conexion, TextMessage message) throws Exception {

		JsonNode node = mapper.readTree(message.getPayload());
		String tipo = node.get("tipo").asText();
		if (tipo.equals("Busqueda")) {
			String mensaje = node.get("mensaje").asText();
			// Introducir al usuario a la lista de usuarios buscando
			if (mensaje.equals("Abrir")) {
				ObjectNode abierto = mapper.createObjectNode();
				abierto.put("tipo", "Busqueda");
				abierto.put("mensaje", "Abierta");
				conexion.sendMessage(new TextMessage(abierto.toString()));
				busquedas.add(conexion.getId());
				if (busquedas.size() > 1) {
					String s1 = busquedas.remove();
					String s2 = busquedas.remove();
					parejas.put(s1, s2);
					parejas.put(s2, s1);

					ObjectNode newNode = mapper.createObjectNode();
					newNode.put("tipo", node.get("tipo").asText());
					newNode.put("mensaje", "Terminada");

					ObjectNode newNode2 = newNode.deepCopy();

					newNode.put("jugador", 1);
					newNode2.put("jugador", 2);

					sessions.get(s1).sendMessage(new TextMessage(newNode.toString()));
					sessions.get(s2).sendMessage(new TextMessage(newNode2.toString()));
				}
			} else if (mensaje.equals("Cerrar")) {
				busquedas.remove(conexion.getId());
			}

		} else if (tipo.equals("Seleccion")) {
			sessions.get(parejas.get(conexion.getId())).sendMessage(message); // ESTO QUIZA DA PROBLEMAS SOLUCION: new
																				// TextMessage(messsage.getPayload())
			// ObjectNode newNode = mapper.createObjectNode();
			// newNode.put("tipo", node.get("tipo").asText());
			// newNode.put("mensaje", node.get("mensaje").asText());

			// sessions.get(parejas.get(conexion.getId())).sendMessage(new
			// TextMessage(newNode.toString()));

		} else if (tipo.equals("Ingame") || tipo.equals("IngameStance")) {
			sessions.get(parejas.get(conexion.getId())).sendMessage(message); //

		} else if (tipo.equals("Revancha")) {
			sessions.get(parejas.get(conexion.getId())).sendMessage(message); //

			// if (mensaje.equals("Aceptar")) {
			// // Comprobar si la otra persona ha aceptado la revancha o no. Si se ha
			// aceptado,
			// // empezar otra partida.
			// } else if (mensaje.equals("Rechazar")) {
			// // Mandar de vuelta a ambas personas sobre partida rechazada.

			// }
		}
		// If según el tipo
		// Campo 2: Información extra?????
		// String msg = message.getPayload();
	}

	// @Override
	// protected void handleTextMessage(WebSocketSession session, TextMessage
	// message) throws Exception {

	// System.out.println("Message received: " + message.getPayload());
	// JsonNode node = mapper.readTree(message.getPayload());

	// sendOtherParticipants(session, node);
	// }

	// protected void ingameMessage(TextMessage message) {

	// }
}
