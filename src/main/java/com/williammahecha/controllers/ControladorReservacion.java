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

import com.williammahecha.models.Reservacion;
import com.williammahecha.services.ServiciosReservacion;

@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class ControladorReservacion {
	@Autowired
	private ServiciosReservacion servicio;

	@GetMapping("/all")
	public List<Reservacion> getReservations() {
		return servicio.getAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Reservacion> getReservation(@PathVariable("id") int reservacionId) {
		return servicio.getReservation(reservacionId);
	}
	
	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public Reservacion save(@RequestBody Reservacion reservacion) {
		return servicio.save(reservacion);
	}
	
	@PutMapping("/update")
	@ResponseStatus(HttpStatus.CREATED)
	public Reservacion update(@RequestBody Reservacion reservacion) {
		return servicio.update(reservacion);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public boolean delete(@PathVariable("id") int reservacionId) {
		return servicio.delete(reservacionId);
	}
}
