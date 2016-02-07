package edu.hm.notes.notes;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import edu.hm.notes.core.entities.Note;

@Component
public class BeforeCreateNoteValidator implements Validator {

	public BeforeCreateNoteValidator() {
		System.out.println("instantiating");
	}
	
	@Override
	public boolean supports(Class<?> clazz) {
		return Note.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		Note note = (Note)target;
		System.out.println(note.getTitle());
	}

}
