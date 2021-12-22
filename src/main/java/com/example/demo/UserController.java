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
	boolean correctLog;
	boolean correctReg;
	
	
	
	
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
		for(int i=0;i<usuarios.size();i++) {
			UsuarioReducido user= new UsuarioReducido(usuarios.get(i).getNickname(), usuarios.get(i).getPartidas(), usuarios.get(i).getGanadas());
			leaderboard.add(user);
		}
		return leaderboard;
	}
	
	@PostMapping(value = "/login")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Boolean> checkLogin(@RequestBody Usuario u) {
		for(int i = 0; i < usuarios.size(); i++ ) {
			if((u.getNickname()==usuarios.get(i).getNickname()) && (u.getPassword()==usuarios.get(i).getPassword())){
				correctLog=true;
			}else {
				correctLog=false;
			}
		}
		return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public boolean getCorrectLog() {
		return correctLog;
	}
	
	
	
	@PostMapping(value = "/register")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Boolean> checkReg(@RequestBody Usuario u) {
		int i = 0;
		boolean keep=true;
		while(i<usuarios.size() && keep == true) {
			if(u.getNickname()==usuarios.get(i).getNickname()) {
				keep =false;
			}
		}
		if(keep==true) {
			correctReg=true;
			usuarios.add(u);
			writetxt();
		}else {
			correctReg=false;
		}
		return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public boolean getCorrectReg() {
		return correctReg;
	}
	
	
	@PostConstruct
	public void user1() {
		readtxt();
		/*
		 * Usuario a = new Usuario(null, null); a.setNickname("Paco");
		 * a.setPassword("Contraseña"); usuarios.add(a);
		 */
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
			System.out.println("File not found");
		} catch (IOException e) {
			System.out.println("Error initializing stream READ");
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
			System.out.println("File not found");
		} catch (IOException e) {
			System.out.println("Error initializing stream WRITE");
			e.printStackTrace();
		}

	}
}
