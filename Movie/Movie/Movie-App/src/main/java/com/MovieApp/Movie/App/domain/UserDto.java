package com.MovieApp.Movie.App.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class UserDto {
//    private String name;
//    private String email;
//    private String password;
//    private String phoneNo;
//    private String imagePath;

    private String name;
    private String email;
    private String password;
    private String phoneNo;
    private String imageName;
}
