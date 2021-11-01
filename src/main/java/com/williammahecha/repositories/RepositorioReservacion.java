package com.williammahecha.repositories;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.williammahecha.interfaces.InterfaceReservacion;
import com.williammahecha.models.Cliente;
import com.williammahecha.models.Reservacion;
import com.williammahecha.reports.CountClient;

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
	
	public List<Reservacion> getReservationByStatus(String status){
        return crud.findAllByStatus(status);
    }
	
	public List<Reservacion> getReservationPeriod(Date dateOne, Date dateTwo){
        return crud.findAllByStartDateAfterAndStartDateBefore(dateOne,dateTwo);
    }

    public List<CountClient> getTopClient(){
        List<CountClient> clientList = new ArrayList<>();
        List<Object[]> report = crud.countTotalReservationByClient();
        for(int i=0;i<report.size();i++){
        	clientList.add(new CountClient((Long) report.get(i)[1], (Cliente)report.get(i)[0]));
        }
        return clientList;
    }
}
