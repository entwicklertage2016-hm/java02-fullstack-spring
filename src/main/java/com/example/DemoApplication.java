package com.example;

import com.example.drinks.Drink;
import com.example.drinks.DrinkRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.SQLException;

@SpringBootApplication
@EnableTransactionManagement
public class DemoApplication {

	@PersistenceContext
	private EntityManager em;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	//@Autowired
	public void initializeTestDataJdbc(JdbcTemplate template) throws SQLException {
		template.execute("INSERT INTO drink (name) VALUES ('whiskey')");
		template.execute("INSERT INTO drink (name) VALUES ('wodka')");
	}

	//@Autowired
	public void initializeTestDataSpringRepositories(DrinkRepository repository) {
		Drink wodka = new Drink();
		wodka.setName("wodka");

		Drink whiskey = new Drink();
		whiskey.setName("whiskey");

		repository.save(wodka);
		repository.save(whiskey);
	}

}
