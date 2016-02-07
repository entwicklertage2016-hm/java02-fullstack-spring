package edu.hm.notes.core.entities;

import javax.persistence.Entity;

@Entity
public class Tag extends AbstractEntity {

	private String title;
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
}
