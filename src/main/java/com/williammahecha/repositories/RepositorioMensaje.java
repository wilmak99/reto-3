package com.williammahecha.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.williammahecha.interfaces.InterfaceMensaje;
import com.williammahecha.models.Mensaje;

@Repository
public class RepositorioMensaje {
	@Autowired
	private InterfaceMensaje crud;
	
	public List<Mensaje> getAll() {
		return (List<Mensaje>) crud.findAll();
	}
	
	public Optional<Mensaje> getMessage(int id) {
		return crud.findById(id);
	}
	
	public Mensaje save(Mensaje mensaje) {
		return crud.save(mensaje);
	}
	
	public void delete(Mensaje mensaje) {
		crud.delete(mensaje);
	}
}
