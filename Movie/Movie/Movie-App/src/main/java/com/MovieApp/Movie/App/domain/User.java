package com.MovieApp.Movie.App.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.List;
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@Document
//public class User {
//   private String name;
//    @Id
//    private String email;
//    private String password;
//    private String phoneNo;
//    private byte[] imagePath;
//
//    private List<Movie> favouriteMovielist;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
 private String name;
 @Id
 private String email;
 private String password;
 private String phoneNo;
 private byte[] imagePath;
 private String imageName;
 private List<Movie> favouriteMovielist;
}
