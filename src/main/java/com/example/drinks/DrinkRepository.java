package com.example.drinks;

import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;

public interface DrinkRepository extends JpaRepository<Drink, Long>, Serializable {
}
