package edu.hm.notes.users;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.hm.notes.core.entities.User;

public interface UsersRepository extends JpaRepository<User, Integer> {

}
