package com.williammahecha.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.williammahecha.models.Reservacion;
import com.williammahecha.reports.CountClient;
import com.williammahecha.reports.ReservationStatus;
import com.williammahecha.repositories.RepositorioReservacion;

@Service
public class ServiciosReservacion {
	@Autowired
	private RepositorioReservacion crud;
	
	public List<Reservacion> getAll() {
		return crud.getAll();
	}
	
	public Optional<Reservacion> getReservation(int id) {
		return crud.getReservation(id);
	}
	
	public Reservacion save(Reservacion reservacion) {
		if(reservacion.getIdReservation() == null) {
			return crud.save(reservacion);
		} else {
			Optional<Reservacion> e=crud.getReservation(reservacion.getIdReservation());
			if(e.isEmpty()) {
				return crud.save(reservacion);
			} else {
				return reservacion;
			}
		}
		
	}
	
	public Reservacion update(Reservacion reservacion) {
		if(reservacion.getIdReservation() == null) {
			return reservacion;
		} else {
			Optional<Reservacion> e=crud.getReservation(reservacion.getIdReservation());
			if(!e.isEmpty()) {
				if (reservacion.getStartDate() != null) {
					e.get().setStartDate(reservacion.getStartDate());
				}
				if (reservacion.getDevolutionDate() != null) {
					e.get().setDevolutionDate(reservacion.getDevolutionDate());
				}
				if (reservacion.getStatus() != null) {
					e.get().setStatus(reservacion.getStatus());
				}
				crud.save(e.get());
				return e.get();
			} else {
				return reservacion;
			}
		}
	}
	
	public boolean delete(int reservacionId) {
		Boolean bool = getReservation(reservacionId).map(reservacion -> {
			crud.delete(reservacion);
			return true;
		}).orElse(false);
		return bool;
	}
	
	public ReservationStatus getReservationStatusReport() {
        List<Reservacion> completed=crud.getReservationByStatus("completed");
        List<Reservacion> cancelled=crud.getReservationByStatus("cancelled");
        return new ReservationStatus(completed.size(),cancelled.size());
    }

    public List<Reservacion> getReservationPeriod(String dateOne,String dateTwo){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date startDate = dateFormat.parse(dateOne);
            Date endDate = dateFormat.parse(dateTwo);
            if(startDate.before(endDate)){
                return crud.getReservationPeriod(startDate,endDate);
            }
        }catch (Exception exception){
               exception.printStackTrace();
        }
        return new ArrayList<>();
    }

    public List<CountClient> getTopClients(){
       return crud.getTopClient();
    }
}
