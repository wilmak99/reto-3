package com.williammahecha.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
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

import com.williammahecha.models.Categoria;
import com.williammahecha.services.ServiciosCategoria;

@Controller
@RequestMapping("/api/Category")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class ControladorCategoria {
	@Autowired
	private ServiciosCategoria servicio;

	@GetMapping("/all")
	public List<Categoria> getCategories() {
		return servicio.getAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Categoria> getCategory(@PathVariable("id") int categoriaId) {
		return servicio.getCategory(categoriaId);
	}
	
	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public Categoria save(@RequestBody Categoria categoria) {
		return servicio.save(categoria);
	}
	
	@PutMapping("/update")
	@ResponseStatus(HttpStatus.CREATED)
	public Categoria update(@RequestBody Categoria categoria) {
		return servicio.update(categoria);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public boolean delete(@PathVariable("id") int categoriaId) {
		return servicio.delete(categoriaId);
	}
}
