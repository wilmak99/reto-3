package com.williammahecha.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.williammahecha.interfaces.InterfaceMotocicleta;
import com.williammahecha.models.Motocicleta;

@Repository
public class RepositorioMotocicleta {
	@Autowired
	private InterfaceMotocicleta crud;
	
	public List<Motocicleta> getAll() {
		return (List<Motocicleta>) crud.findAll();
	}
	
	public Optional<Motocicleta> getMotorbike(int id) {
		return crud.findById(id);
	}
	
	public Motocicleta save(Motocicleta motocicleta) {
		return crud.save(motocicleta);
	}
	
	public void delete(Motocicleta motocicleta) {
		crud.delete(motocicleta);
	}
}
