package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;




@RestController
public class UserController {
	 private List<Usuario> usuarios = new ArrayList<>();
	
@PostMapping(value="/usuarios")
@ResponseStatus(HttpStatus.CREATED)
public ResponseEntity<Boolean> addUsuario(@RequestBody Usuario u){
   	usuarios.add(u);
    return new ResponseEntity<>(true, HttpStatus.CREATED);
}

@RequestMapping(value="/usuarios", method = RequestMethod.GET)
public List<Usuario> getUsuarios(){
    return usuarios;
}
	
}
