package com.williammahecha.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.williammahecha.models.Mensaje;
import com.williammahecha.repositories.RepositorioMensaje;

@Service
public class ServiciosMensajes {
	@Autowired
	private RepositorioMensaje crud;
	
	public List<Mensaje> getAll() {
		return crud.getAll();
	}
	
	public Optional<Mensaje> getMessage(int id) {
		return crud.getMessage(id);
	}
	
	public Mensaje save(Mensaje mensaje) {
		if(mensaje.getIdMessage() == null) {
			return crud.save(mensaje);
		} else {
			Optional<Mensaje> e=crud.getMessage(mensaje.getIdMessage());
			if(e.isEmpty()) {
				return crud.save(mensaje);
			} else {
				return mensaje;
			}
		}
		
	}
	
	public Mensaje update(Mensaje mensaje) {
		if(mensaje.getIdMessage() == null) {
			return mensaje;
		} else {
			Optional<Mensaje> e=crud.getMessage(mensaje.getIdMessage());
			if(e.isEmpty()) {
				if (mensaje.getMessageText() != null) {
					e.get().setMessageText(mensaje.getMessageText());
				}
				crud.save(e.get());
				return e.get();
			} else {
				return mensaje;
			}
		}
	}
	
	public boolean delete(int mensajeId) {
		Boolean bool = getMessage(mensajeId).map(mensaje -> {
			crud.delete(mensaje);
			return true;
		}).orElse(false);
		return bool;
	}

}
