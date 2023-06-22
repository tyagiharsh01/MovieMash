package com.MovieApp.Movie.App.repository;

import com.MovieApp.Movie.App.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,String> {


}
