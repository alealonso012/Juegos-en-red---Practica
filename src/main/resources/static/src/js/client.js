export function crearUser(input) {
	$.ajax({
		method: "POST",
		url: "http://localhost:8080/usuarios",
		data: JSON.stringify({ nickname: input.nickname, password: input.password }),
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
		url: "http://localhost:8080/usuarios"
	}).done(function(data) {
		console.log(data);
		console.log(data[0].nickname)
		console.log(data[0].password)
		//for(var i=0; i<data.items.length; i++){
		//	$("body").append(
		//			"<p>"+data.items[i].volumeInfo.title+"</p>");
		//}
	});
}
