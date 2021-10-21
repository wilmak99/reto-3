package com.williammahecha.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.williammahecha.models.Cliente;

public interface InterfaceCliente extends CrudRepository<Cliente, Integer>{

}
