package edu.hm.notes.categories;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.hm.notes.core.entities.Category;

public interface CategoriesRepository extends JpaRepository<Category, Integer> {

}
