package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

@RestController
public class UserController {
	private List<Usuario> usuarios = new ArrayList<Usuario>();

	@PostMapping(value = "/usuarios")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Boolean> addUsuario(@RequestBody Usuario u) {
		usuarios.add(u);
		writeUsuario();
		return new ResponseEntity<>(true, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/usuarios", method = RequestMethod.GET)
	public List<Usuario> getUsuarios() {
		return usuarios;
	}

	@RequestMapping(value = "/leaderboard", method = RequestMethod.GET)
	public List<UsuarioReducido> getLeaderboard() {
		List<UsuarioReducido> leaderboard = new ArrayList<UsuarioReducido>();
		for (int i = 0; i < usuarios.size(); i++) {
			UsuarioReducido user = new UsuarioReducido(usuarios.get(i).getNickname(), usuarios.get(i).getPartidas(),
					usuarios.get(i).getGanadas());
			leaderboard.add(user);
		}
		return leaderboard;
	}

	@PostMapping(value = "/login")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Boolean> checkLogin(@RequestBody Usuario u) {
		boolean correctLog = false;
		for (int i = 0; i < usuarios.size() && !correctLog; i++) {
			if (u.getNickname().equals(usuarios.get(i).getNickname())
					&& u.getPassword().equals(usuarios.get(i).getPassword())) {
				correctLog = true;
			} else {
				correctLog = false;
			}
		}
		if (correctLog == true) {
			println("El usuario " + u.getNickname() + " ha iniciado sesión correctamente.");
			return new ResponseEntity<>(true, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(true, HttpStatus.FORBIDDEN);
		}
	}

	@PostMapping(value = "/register")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Boolean> checkReg(@RequestBody Usuario u) {
		boolean correctReg = false;
		int i = 0;
		boolean keep = true;
		while (i < usuarios.size() && keep) {
			if (u.getNickname().equals(usuarios.get(i).getNickname())) {
				keep = false;
			}
			i++;
		}
		if (keep) {
			correctReg = true;
			usuarios.add(u);
			writeUsuario();
		} else {
			correctReg = false;
		}
		if (correctReg == true) {
			return new ResponseEntity<>(true, HttpStatus.CREATED);
			println("El usuario " + u.getNickname() + " se ha creado correctamente.");
		} else {
			return new ResponseEntity<>(true, HttpStatus.FORBIDDEN);
		}
	}

	@PutMapping(value = "/victoria")
	public ResponseEntity<String> actuVictoria(@RequestBody String usuario) {
		boolean correctName = false;
		for (int i = 0; i < usuarios.size() && !correctName; i++) {
			if (usuario.equals(usuarios.get(i).getNickname())) {
				correctName = true;
				usuarios.get(i).setGanadas(usuarios.get(i).getGanadas() + 1);
				usuarios.get(i).setPartidas(usuarios.get(i).getPartidas() + 1);
			}
		}
		if (correctName) {
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostConstruct
	public void readUsuario() {
		try {
			FileInputStream fi = new FileInputStream(new File("Usuarios.txt"));
			ObjectInputStream oi = new ObjectInputStream(fi);

			while (true) {
				try {
					usuarios.add((Usuario) oi.readObject());
				} catch (EOFException e) {
					break;
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
					break;
				}
			}
			oi.close();
			fi.close();
		} catch (FileNotFoundException e) {
			System.out.println("Archivo no encontrado");
		} catch (IOException e) {
			System.out.println("Error inicializando stream READ");
		}
	}

	public void writeUsuario() {
		try {
			FileOutputStream f = new FileOutputStream(new File("Usuarios.txt"));
			ObjectOutputStream o = new ObjectOutputStream(f);

			// Write objects to file
			for (int i = 0; i < usuarios.size(); i++) {
				o.writeObject(usuarios.get(i));
			}
			o.close();
			f.close();
		} catch (FileNotFoundException e) {
			System.out.println("Archivo no encontrado");
		} catch (IOException e) {
			System.out.println("Error inicializando stream WRITE");
			e.printStackTrace();
		}
	}
}
