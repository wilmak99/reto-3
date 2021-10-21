package com.williammahecha.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.williammahecha.interfaces.InterfaceReservacion;
import com.williammahecha.models.Reservacion;

@Repository
public class RepositorioReservacion {
	@Autowired
	private InterfaceReservacion crud;
	
	public List<Reservacion> getAll() {
		return (List<Reservacion>) crud.findAll();
	}
	
	public Optional<Reservacion> getReservation(int id) {
		return crud.findById(id);
	}
	
	public Reservacion save(Reservacion reservacion) {
		return crud.save(reservacion);
	}
	
	public void delete(Reservacion reservacion) {
		crud.delete(reservacion);
	}
}
