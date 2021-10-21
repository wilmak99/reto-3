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

import com.williammahecha.models.Motocicleta;
import com.williammahecha.services.ServiciosMotocicleta;

@RestController
@RequestMapping("/api/Motorbike")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class ControladorMotocicleta {
	@Autowired
	private ServiciosMotocicleta servicio;

	@GetMapping("/all")
	public List<Motocicleta> getMotorbikes() {
		return servicio.getAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Motocicleta> getMotorbike(@PathVariable("id") int motocicletaId) {
		return servicio.getMotorbike(motocicletaId);
	}
	
	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public Motocicleta save(@RequestBody Motocicleta motocicleta) {
		return servicio.save(motocicleta);
	}
	
	@PutMapping("/update")
	@ResponseStatus(HttpStatus.CREATED)
	public Motocicleta update(@RequestBody Motocicleta motocicleta) {
		return servicio.update(motocicleta);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public boolean delete(@PathVariable("id") int motocicletaId) {
		return servicio.delete(motocicletaId);
	}
}
