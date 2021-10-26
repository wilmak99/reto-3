package com.williammahecha.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.williammahecha.models.Motocicleta;
import com.williammahecha.repositories.RepositorioMotocicleta;

@Service
public class ServiciosMotocicleta {
	@Autowired
	private RepositorioMotocicleta crud;
	
	public List<Motocicleta> getAll() {
		return crud.getAll();
	}
	
	public Optional<Motocicleta> getMotorbike(int id) {
		return crud.getMotorbike(id);
	}
	
	public Motocicleta save(Motocicleta motocicleta) {
		if(motocicleta.getId() == null) {
			return crud.save(motocicleta);
		} else {
			Optional<Motocicleta> e=crud.getMotorbike(motocicleta.getId());
			if(e.isEmpty()) {
				return crud.save(motocicleta);
			} else {
				return motocicleta;
			}
		}
		
	}
	
	public Motocicleta update(Motocicleta motocicleta) {
		if(motocicleta.getId() == null) {
			return motocicleta;
		} else {
			Optional<Motocicleta> e=crud.getMotorbike(motocicleta.getId());
			if(!e.isEmpty()) {
				if (motocicleta.getName() != null) {
					e.get().setName(motocicleta.getName());
				}
				if (motocicleta.getBrand() != null) {
					e.get().setBrand(motocicleta.getBrand());
				}
				if (motocicleta.getYear() != null) {
					e.get().setYear(motocicleta.getYear());
				}
				if (motocicleta.getDescription() != null) {
					e.get().setDescription(motocicleta.getDescription());
				}
				if (motocicleta.getCategory() != null) {
					e.get().setCategory(motocicleta.getCategory());
				}
				crud.save(e.get());
				return e.get();
			} else {
				return motocicleta;
			}
		}
	}
	
	public boolean delete(int motocicletaId) {
		Boolean bool = getMotorbike(motocicletaId).map(motocicleta -> {
			crud.delete(motocicleta);
			return true;
		}).orElse(false);
		return bool;
	}
}
