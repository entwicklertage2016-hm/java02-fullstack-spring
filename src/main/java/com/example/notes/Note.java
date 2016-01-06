package com.example.notes;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Note {

    @GeneratedValue
    @Id
    private Long id;

    private String title;

    private String text;

}
