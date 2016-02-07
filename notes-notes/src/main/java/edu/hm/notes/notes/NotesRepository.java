package edu.hm.notes.notes;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.hm.notes.core.entities.Note;

public interface NotesRepository extends JpaRepository<Note, Integer> {

}
