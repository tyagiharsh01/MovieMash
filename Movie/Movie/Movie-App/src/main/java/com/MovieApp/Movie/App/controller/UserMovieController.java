package com.MovieApp.Movie.App.controller;

import com.MovieApp.Movie.App.domain.Movie;
import com.MovieApp.Movie.App.domain.User;
import com.MovieApp.Movie.App.exception.MovieAlreadyExist;
import com.MovieApp.Movie.App.exception.MovieException;
import com.MovieApp.Movie.App.exception.UserAlreadyException;
import com.MovieApp.Movie.App.exception.UserException;
import com.MovieApp.Movie.App.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/movie/api/v1")
public class UserMovieController {
    private  UserService userService;

    @Autowired
    public UserMovieController(UserService userService) {
        this.userService = userService;
    }

//    @PostMapping(value = "/upload")
//    public ResponseEntity<?> fileUpload(@RequestParam("image")MultipartFile image){
//        try {
//            String name = userService.uploadImage(image);
//            System.out.println(name);
//
//            return new ResponseEntity<>(name, HttpStatus.OK);
//
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    //http://localhost:8804/movie/api/v1/addUser
//    @PostMapping("/addUser")
//    public ResponseEntity<?> addUser( @RequestBody User user) throws UserAlreadyException {
//        if(user.getFavouriteMovielist()==null)
//            user.setFavouriteMovielist(new ArrayList<>());
//        try {
//            return new ResponseEntity<>(userService.addUser(user), HttpStatus.OK);
//        } catch (UserAlreadyException userAlreadyException) {
//            throw  userAlreadyException;
//        }
//
//    }







    //http://localhost:8804/movie/api/v1/addUser
    @PostMapping("/addUser")
    public ResponseEntity<?> fileUpload(@RequestParam("image")MultipartFile image,@RequestParam("UserData") String user) throws IOException, UserAlreadyException {
        User user1 = new ObjectMapper().readValue(user,User.class);
        user1.setImagePath(image.getBytes());
        String fileName = image.getOriginalFilename();
        String newFileName = FilenameUtils.getBaseName(fileName)+"$"+System.currentTimeMillis()+"."+ FilenameUtils.getExtension(fileName);
        user1.setImageName(newFileName);
        if(user1.getFavouriteMovielist()==null)
            user1.setFavouriteMovielist(new ArrayList<>());
        return new ResponseEntity<>(userService.addUser(user1), HttpStatus.OK);

    }
    // http://localhost:8804/movie/api/v1/get/profile
    @GetMapping("/get/profile")
    public ResponseEntity<?> getUserImg(HttpServletRequest request){

        String email = (String)request.getAttribute("email");
        System.out.println("email->"+email);
        byte[] imageData = userService.getUserProfileImg(email);
        if(imageData==null){
            return new ResponseEntity<>("Not found",HttpStatus.NOT_FOUND);
        }
        String base64Image = Base64.getEncoder().encodeToString(imageData);
        Map<String,Object> response = new HashMap<>();
        response.put("imageData",base64Image);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    //http://localhost:8804/movie/api/v1/deleteUser
    @DeleteMapping("/deleteUser")
    public ResponseEntity<?> deleteUser(HttpServletRequest httpServletRequest) throws UserException {
        String email = (String) httpServletRequest.getAttribute("email");
        try {
            return  new ResponseEntity<>(userService.deleteUser(email),HttpStatus.OK);
        } catch (UserException userException) {
            throw userException;
        }
    }
    @GetMapping("/get")
    public ResponseEntity<?>getUser(HttpServletRequest httpServletRequest) throws UserException {
        String email = (String) httpServletRequest.getAttribute("email");
        System.out.println(email);
        return new ResponseEntity<>(userService.getUser(email),HttpStatus.OK);
    }


    @GetMapping("/getBy/{email}")
    public ResponseEntity<?>getUser(@PathVariable String email) throws UserException {
        return new ResponseEntity<>(userService.getUser(email),HttpStatus.OK);
    }

    //http://localhost:4040/movie/api/v1/update
    @PostMapping("/update")
    public ResponseEntity<?>update(HttpServletRequest httpServletRequest,@RequestBody User user) throws UserException {
        String email = (String) httpServletRequest.getAttribute("email");
        System.out.println(email);
        return new ResponseEntity<>(userService.updateUser(email, user),HttpStatus.OK);
    }


    //http://localhost:4040/movie/api/v1/updatePassword
    @PostMapping("/updatePassword/{email}/{password}")
    public ResponseEntity<?> updatePassword(@PathVariable String email,@PathVariable String password) throws UserException {
        try {
            return new ResponseEntity<>(userService.updatePassword(email,password),HttpStatus.OK);
        } catch (UserException userException) {
            throw userException;
        }
    }
    //http://localhost:8804/movie/api/v1/getFavouriteMovies

    @GetMapping("/getFavouriteMovies")
    public ResponseEntity<?> getAllFavorite(HttpServletRequest httpServletRequest) throws UserException {
        String email =(String) httpServletRequest.getAttribute("email");
        System.out.println(email);
        try {
            return new ResponseEntity<>(userService.getAllFavouriteMovie(email),HttpStatus.OK);
        } catch (UserException userException) {
            throw  userException;
        }
    }
    //http://localhost:8804/movie/api/v1/addMovie
    @PostMapping("/addMovie")
    public ResponseEntity<?> addMovie(@RequestBody Movie movie, HttpServletRequest httpServletRequest) throws MovieAlreadyExist, UserException {
        String email =(String) httpServletRequest.getAttribute("email");
        System.out.println(email);
        try {
            return new ResponseEntity<>(userService.addMovieToFavorite(email, movie), HttpStatus.OK);
        }catch (UserException userException){
            throw userException;
        }
        catch (MovieAlreadyExist movieAlreadyExist) {
            throw movieAlreadyExist;
        }

    }

    //http://localhost:8804/movie/api/v1/deleteMovie
    @PostMapping("/deleteMovie")
    public  ResponseEntity<?> deleteMovie(HttpServletRequest httpServletRequest,@RequestBody Movie movie) throws MovieException,UserException {
        String email = (String) httpServletRequest.getAttribute("email");
        System.out.println(email);
        try {
            return new ResponseEntity(userService.deleteFavoriteMovie(email, movie), HttpStatus.OK);
        } catch (UserException userException) {
            throw userException;
        } catch (MovieException movieException) {
            throw movieException;
        }
    }
}
