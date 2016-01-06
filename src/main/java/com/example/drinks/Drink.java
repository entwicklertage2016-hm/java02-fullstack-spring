package com.example.drinks;

import com.example.category.Category;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
public class Drink {

    @GeneratedValue
    @Id
    private Long id;
    private String name;
    private BigDecimal alcoholPercentage;

    @ManyToMany
    @JoinTable(name="category_drink")
    public List<Category> categories;


    public BigDecimal getAlcoholPercentage() {
        return alcoholPercentage;
    }

    public void setAlcoholPercentage(BigDecimal alcoholPercentage) {
        this.alcoholPercentage = alcoholPercentage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
