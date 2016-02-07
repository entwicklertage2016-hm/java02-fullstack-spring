package edu.hm.notes.notes;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import edu.hm.notes.core.entities.Category;
import edu.hm.notes.core.entities.Note;

public interface NotesRepository extends JpaRepository<Note, Integer> {

	public List<Note> findByCategory(@Param("category") Category category);
	
}
