package com.williammahecha.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.williammahecha.interfaces.InterfaceCliente;
import com.williammahecha.models.Cliente;

@Repository
public class RepositorioCliente {
	@Autowired
	private InterfaceCliente crud;
	
	public List<Cliente> getAll() {
		return (List<Cliente>) crud.findAll();
	}
	
	public Optional<Cliente> getClient(int id) {
		return crud.findById(id);
	}
	
	public Cliente save(Cliente cliente) {
		return crud.save(cliente);
	}
	
	public void delete(Cliente cliente) {
		crud.delete(cliente);
	}
}
