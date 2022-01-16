export function crearUser(input) {
	$.ajax({
		method: "POST",
		url: "./usuarios",
		data: JSON.stringify(input),
		processData: false,
		headers: {
			"Content-type": "application/json"
		}
	}).done(function(data, textStatus, jqXHR) {
		console.log("Usuario creado correctamente")
		console.log(textStatus+" "+jqXHR.statusCode());
	}).fail(function(data, textStatus, jqXHR) {
		console.log(textStatus+" "+jqXHR.statusCode());
		console.log("Error al crear usuario")
	});
}

export function leerUser() {
	$.ajax({
		url: "./usuarios"
	}).done(function(data) {
		console.log(data);
	});
}

export function loginUser(input) {
	var temp = false;
	$.ajax({
		method: "POST",
		url: "./login",
		async: false,
		data: JSON.stringify({ nickname: input.nickname, password: input.password }),
		processData: false,
		headers: {
			"Content-type": "application/json"
		}
	}).done(function(data, textStatus, jqXHR) {
		console.log("Usuario logeado correctamente");
		//console.log(textStatus+" "+jqXHR.statusCode());
		temp = true;
	}).fail(function(data, textStatus, jqXHR) {
		//console.log(textStatus+" "+jqXHR.statusCode());
		console.log("Error al logear usuario");
		temp = false;
	});
	return temp;
}

export function registerUser(input) {
	var temp = false;
	$.ajax({
		method: "POST",
		url: "./register",
		async: false,
		data: JSON.stringify({ nickname: input.nickname, password: input.password }),
		processData: false,
		headers: {
			"Content-type": "application/json"
		}
	}).done(function(data, textStatus, jqXHR) {
		//console.log("Usuario registrado correctamente")
		console.log(textStatus+" "+jqXHR.statusCode());
		temp = true;
	}).fail(function(data, textStatus, jqXHR) {
		//console.log(textStatus+" "+jqXHR.statusCode());
		console.log("Error al registrar usuario");
		temp = false;
	});
	return temp;
}

export function victoria(input){
	$.ajax({
		method: "PUT",
		url: "./victoria",
		async: false,
		data: input,
		processData: false,
		headers: {
			"Content-type": "application/json"
		}
	}).done(function(data, textStatus, jqXHR) {
		console.log("Puntuacion aumentada correctamente")
		//console.log(textStatus+" "+jqXHR.statusCode());
	}).fail(function(data, textStatus, jqXHR) {
		//console.log(textStatus+" "+jqXHR.statusCode());
		console.log("Error al aumentar puntuacion");
	});
}
