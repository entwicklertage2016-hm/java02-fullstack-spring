package edu.hm.notes.tags;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.hm.notes.core.entities.Tag;

public interface TagsRepository extends JpaRepository<Tag, Integer> {

}
