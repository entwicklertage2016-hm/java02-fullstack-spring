package com.example.category;

import com.example.drinks.Drink;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.io.Serializable;
import java.util.List;

@Entity
public class Category implements Serializable {

    @GeneratedValue
    @Id
    private Long id;
    private String title;

    @ManyToMany(mappedBy = "categories")
    List<Drink> drinks;

}
