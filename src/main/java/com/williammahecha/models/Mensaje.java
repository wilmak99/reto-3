package com.williammahecha.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "message")
public class Mensaje implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idMessage;
	private String messageText;
	
	@ManyToOne
	@JoinColumn(name = "id")
	@JsonIgnoreProperties({"messages", "client", "reservations"})
	private Motocicleta motorbike;
	
	@ManyToOne
	@JoinColumn(name = "clientId")
	@JsonIgnoreProperties({"messages", "reservations", "client"})
	private Cliente client;

	public Integer getIdMessage() {
		return idMessage;
	}

	public void setIdMessage(Integer idMessage) {
		this.idMessage = idMessage;
	}

	public String getMessageText() {
		return messageText;
	}

	public void setMessageText(String messageText) {
		this.messageText = messageText;
	}

	public Motocicleta getMotorbike() {
		return motorbike;
	}

	public void setMotorbike(Motocicleta motorbike) {
		this.motorbike = motorbike;
	}

	public Cliente getClient() {
		return client;
	}

	public void setClient(Cliente client) {
		this.client = client;
	}
}
