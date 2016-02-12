package edu.hm.notes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.stereotype.Component;

import edu.hm.notes.categories.CategoriesRepository;
import edu.hm.notes.core.entities.Category;
import edu.hm.notes.core.entities.Note;
import edu.hm.notes.notes.BeforeCreateNoteValidator;
import edu.hm.notes.notes.NotesRepository;

@SpringBootApplication
@EnableJpaAuditing
@Component
public class NotesRunner extends RepositoryRestMvcConfiguration {
	
	@Autowired BeforeCreateNoteValidator beforeCreateNoteValidator;
	
	public static void main(String[] args) {
		SpringApplication.run(NotesRunner.class, args);
	}
	
	@Override
	protected void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
		validatingListener.addValidator("beforeCreate", beforeCreateNoteValidator);
	}
	
	@Override
	protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.setBasePath("/api");
	}
	
	@Autowired 
	public void insertSampleEntities(CategoriesRepository categoriesRepository, NotesRepository notesRepository) {
		Category category = new Category();
		category.setTitle("Private Notizen");
		categoriesRepository.save(category);
		
		Note note = new Note();
		note.setTitle("Testnotiz");
		note.setContent("Hier könnte ihr Inhalt stehen");
		note.setCategory(category);
		notesRepository.save(note);
	}
	
}
