package com.williammahecha.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.williammahecha.models.Categoria;
import com.williammahecha.repositories.RepositorioCategoria;

@Service
public class ServiciosCategoria {
	@Autowired
	private RepositorioCategoria crud;
	
	public List<Categoria> getAll() {
		return crud.getAll();
	}
	
	public Optional<Categoria> getCategory(int id) {
		return crud.getCategory(id);
	}
	
	public Categoria save(Categoria categoria) {
		if(categoria.getId() == null) {
			return crud.save(categoria);
		} else {
			Optional<Categoria> e=crud.getCategory(categoria.getId());
			if(e.isEmpty()) {
				return crud.save(categoria);
			} else {
				return categoria;
			}
		}
		
	}
	
	public Categoria update(Categoria categoria) {
		if(categoria.getId() == null) {
			return categoria;
		} else {
			Optional<Categoria> e=crud.getCategory(categoria.getId());
			if(!e.isEmpty()) {
				if (categoria.getName() != null) {
					e.get().setName(categoria.getName());
				}
				if (categoria.getDescription() != null) {
					e.get().setDescription(categoria.getDescription());
				}
				crud.save(e.get());
				return e.get();
			} else {
				return categoria;
			}
		}
	}
	
	public boolean delete(int categoriaId) {
		Boolean bool = getCategory(categoriaId).map(categoria -> {
			crud.delete(categoria);
			return true;
		}).orElse(false);
		return bool;
	}
}
