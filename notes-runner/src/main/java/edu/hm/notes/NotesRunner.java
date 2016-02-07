package edu.hm.notes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import edu.hm.notes.notes.BeforeCreateNoteValidator;

@SpringBootApplication
public class NotesRunner extends RepositoryRestMvcConfiguration {
	
	@Autowired BeforeCreateNoteValidator beforeCreateNoteValidator;
	
	public static void main(String[] args) {
		SpringApplication.run(NotesRunner.class);
	}
	
	@Override
	protected void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
		validatingListener.addValidator("beforeCreate", beforeCreateNoteValidator);
	}
	
	@Override
	protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.setBasePath("/api");
	}
	
}
