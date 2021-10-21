package com.williammahecha.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.williammahecha.models.Mensaje;
import com.williammahecha.services.ServiciosMensaje;

@RestController
@RequestMapping("/api/Message")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class ControladorMensaje {
	@Autowired
	private ServiciosMensaje servicio;

	@GetMapping("/all")
	public List<Mensaje> getMessages() {
		return servicio.getAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Mensaje> getMessage(@PathVariable("id") int mensajeId) {
		return servicio.getMessage(mensajeId);
	}
	
	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public Mensaje save(@RequestBody Mensaje mensaje) {
		return servicio.save(mensaje);
	}
	
	@PutMapping("/update")
	@ResponseStatus(HttpStatus.CREATED)
	public Mensaje update(@RequestBody Mensaje mensaje) {
		return servicio.update(mensaje);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public boolean delete(@PathVariable("id") int mensajeId) {
		return servicio.delete(mensajeId);
	}
}
