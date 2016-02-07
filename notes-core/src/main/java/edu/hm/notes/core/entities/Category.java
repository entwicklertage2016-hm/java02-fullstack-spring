package edu.hm.notes.core.entities;

import javax.persistence.Entity;

@Entity
public class Category extends AbstractEntity {

	private String title;
	private boolean isPublic;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public boolean isPublic() {
		return isPublic;
	}
	
	public void setPublic(boolean isPublic) {
		this.isPublic = isPublic;
	}
	
}
