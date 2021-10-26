package com.williammahecha.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.williammahecha.models.Cliente;
import com.williammahecha.repositories.RepositorioCliente;

@Service
public class ServiciosCliente {
	@Autowired
	private RepositorioCliente crud;
	
	public List<Cliente> getAll() {
		return crud.getAll();
	}
	
	public Optional<Cliente> getClient(int id) {
		return crud.getClient(id);
	}
	
	public Cliente save(Cliente cliente) {
		if(cliente.getIdClient() == null) {
			return crud.save(cliente);
		} else {
			Optional<Cliente> e=crud.getClient(cliente.getIdClient());
			if(e.isEmpty()) {
				return crud.save(cliente);
			} else {
				return cliente;
			}
		}
		
	}
	
	public Cliente update(Cliente cliente) {
		if(cliente.getIdClient() == null) {
			return cliente;
		} else {
			Optional<Cliente> e=crud.getClient(cliente.getIdClient());
			if(!e.isEmpty()) {
				if (cliente.getName() != null) {
					e.get().setName(cliente.getName());
				}
				if (cliente.getEmail() != null) {
					e.get().setEmail(cliente.getEmail());
				}
				if (cliente.getPassword() != null) {
					e.get().setPassword(cliente.getPassword());
				}
				if (cliente.getAge() != null) {
					e.get().setAge(cliente.getAge());
				}
				crud.save(e.get());
				return e.get();
			} else {
				return cliente;
			}
		}
	}
	
	public boolean delete(int clienteId) {
		Boolean bool = getClient(clienteId).map(cliente -> {
			crud.delete(cliente);
			return true;
		}).orElse(false);
		return bool;
	}
}
