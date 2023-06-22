package com.MovieApp.Movie.App.service;

import com.MovieApp.Movie.App.config.MovieDTO;
import com.MovieApp.Movie.App.domain.Movie;
import com.MovieApp.Movie.App.domain.User;
import com.MovieApp.Movie.App.domain.UserDto;
import com.MovieApp.Movie.App.exception.MovieAlreadyExist;
import com.MovieApp.Movie.App.exception.MovieException;
import com.MovieApp.Movie.App.exception.UserAlreadyException;
import com.MovieApp.Movie.App.exception.UserException;
import com.MovieApp.Movie.App.proxy.MovieProxy;
import com.MovieApp.Movie.App.repository.UserRepository;
import jdk.jshell.spi.ExecutionControl;
import org.bson.json.JsonObject;
import org.json.simple.JSONObject;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private MovieProxy movieProxy;
    private RabbitTemplate rabbitTemplate;
    private DirectExchange directExchange;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, MovieProxy movieProxy, RabbitTemplate rabbitTemplate, DirectExchange directExchange) {
        this.userRepository = userRepository;
        this.movieProxy = movieProxy;
        this.rabbitTemplate = rabbitTemplate;
        this.directExchange = directExchange;
    }

//    @Override
//    public String uploadImage(MultipartFile file) throws IOException {
//        // Check if the file is empty
//        System.out.println(file.getOriginalFilename());
//        if (file.isEmpty()) {
//            throw new IllegalArgumentException("File is empty.");
//        }
//
//        // Construct the complete path to store the file
//        String directoryPath = "\\usr\\share\\nginx\\html\\assets";
//        String fileName = file.getOriginalFilename();
//        String filePath = directoryPath + File.separator + fileName;
//
//        // Create the directory if it does not exist
//        File directory = new File(directoryPath);
//        if (!directory.exists()) {
//            if (!directory.mkdirs()) {
//                throw new IOException("Failed to create directory: " + directoryPath);
//            }
//        }
//
//        try (InputStream inputStream = file.getInputStream();
//             OutputStream outputStream = new FileOutputStream(filePath)) {
//            // Copy the file to the specified directory
//            byte[] buffer = new byte[8192];
//            int bytesRead;
//            while ((bytesRead = inputStream.read(buffer)) != -1) {
//                outputStream.write(buffer, 0, bytesRead);
//            }
//        } catch (IOException e) {
//            // Handle any exceptions that occur during file copying
//            throw new IOException("Failed to save the file: " + filePath, e);
//        }
//
//        // Return the complete path of the saved file
//        return filePath;
//    }
//
//    @RabbitListener(queues = "EmailQueue")
//    @Override
//    public User addUser(User user) throws UserAlreadyException {
//        if(userRepository.findById(user.getEmail()).isEmpty()) {
//            UserDto userDto = new UserDto(user.getName(), user.getEmail(),
//                    user.getPassword(), user.getPhoneNo(), user.getImagePath());
//            movieProxy.registerUser(userDto);
//            String Message =  "Dear " + user.getName() + ",\n\n" +
//                    "Thank you for joining MovieMash! We are delighted to have you as a participant in our event.\n\n" +
//                    user.getName() + ", we are excited to have you on our participant list and can't wait to see your contributions.\n\n" +
//                    "If you have any questions or need assistance, feel free to reach out to our support team.\n\n" +
//                    "Once again, welcome to MovieMash!\n\n" +
//                    "Best regards,\n" +
//                    "Team MovieMash\n";
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("to",user.getEmail());
//            jsonObject.put("subject", "Welcome to MovieMash!");
//            jsonObject.put("message",Message);
//            MovieDTO movieDTO = new MovieDTO();
//            movieDTO.setJsonObject(jsonObject);
//            rabbitTemplate.convertAndSend(directExchange.getName(),"Movie_routing",movieDTO);
//            System.out.println("Success: "+directExchange.getName()+movieDTO);
//            return userRepository.save(user);
//        }
//        else{
//            throw new UserAlreadyException();
//        }
//    }


    @Override
    public String uploadImage(MultipartFile file) throws IOException {

        // Check if the file is empty
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty.");
        }

        // Construct the complete path to store the file
        String directoryPath = "D:\\NIIT\\Final Project\\MovieAppFrontend\\MovieApplication\\src\\assets";
        String fileName = file.getOriginalFilename();
        String filePath = directoryPath + File.separator + fileName;

        // Create the directory if it does not exist
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdir();
        }

        // Save the file to the specified directory
        Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

        // Return the complete path of the saved file
        System.out.println(fileName);
        return fileName;
    }

    @RabbitListener(queues = "EmailQueue")
    @Override
    public User addUser(User user) throws UserAlreadyException {
        if (userRepository.findById(user.getEmail()).isEmpty()) {
            UserDto userDto = new UserDto(user.getName(), user.getEmail(),
                    user.getPassword(), user.getPhoneNo(), user.getImageName());
            movieProxy.registerUser(userDto);
            String Message = "Dear " + user.getName() + ",\n\n" +
                    "Thank you for joining MovieMash! We are delighted to have you as a participant in our event.\n\n" +
                    user.getName() + ", we are excited to have you on our participant list and can't wait to see your contributions.\n\n" +
                    "If you have any questions or need assistance, feel free to reach out to our support team.\n\n" +
                    "Once again, welcome to MovieMash!\n\n" +
                    "Best regards,\n" +
                    "Team MovieMash\n";
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("to", user.getEmail());
            jsonObject.put("subject", "Welcome to MovieMash!");
            jsonObject.put("message", Message);
            MovieDTO movieDTO = new MovieDTO();
            movieDTO.setJsonObject(jsonObject);
            rabbitTemplate.convertAndSend(directExchange.getName(), "Movie_routing", movieDTO);
            System.out.println("Success: " + directExchange.getName() + movieDTO);
            return userRepository.save(user);
        } else {
            throw new UserAlreadyException();
        }
    }


    @Override
    public boolean deleteUser(String id) throws UserException {
        if (!userRepository.findById(id).isEmpty()) {
            movieProxy.deleteUser(id);
            userRepository.deleteById(id);
            return true;
        } else {
            throw new UserException();
        }
    }

    @Override
    public List<Movie> getAllFavouriteMovie(String id) throws UserException {
        if (userRepository.findById(id).isPresent()) {
            return userRepository.findById(id).get().getFavouriteMovielist();
        } else {
            throw new UserException();
        }
    }

    @Override
    public User addMovieToFavorite(String email, Movie movie) throws MovieAlreadyExist, UserException {
        Optional<User> optionalUser = userRepository.findById(email);
        if (!optionalUser.isPresent()) {
            throw new UserException();
        }

        User user = optionalUser.get();
        if (user.getFavouriteMovielist() != null) {
            List<Movie> movieList = user.getFavouriteMovielist();
            for (Movie movieIterator : movieList) {
                if (movieIterator.getId() == movie.getId()) {
                    throw new MovieAlreadyExist();
                }
            }

            movieList.add(movie);
            user.setFavouriteMovielist(movieList);
        }
        return userRepository.save(user);
    }


    @Override
    public boolean deleteFavoriteMovie(String email, Movie movie) throws MovieException, UserException {
        Optional<User> optionalUser = userRepository.findById(email);
        if (!optionalUser.isPresent()) {
            throw new UserException();
        }

        User user = optionalUser.get();
        List<Movie> movieList = user.getFavouriteMovielist();

        boolean movieFound = false;
        for (Movie movieIterator : movieList) {
            if (movieIterator.getId() == movie.getId()) {
                movieList.remove(movieIterator);
                user.setFavouriteMovielist(movieList);
                userRepository.save(user);
                movieFound = true;
                break;
            }
        }

        if (!movieFound) {
            throw new MovieException();
        }

        return true;
    }

    @Override
    public User getUser(String email) throws UserException {
        if (userRepository.findById(email).isPresent()) {
            return userRepository.findById(email).get();
        } else {
            throw new UserException();
        }
    }


    @Override
    public byte[] getUserProfileImg(String email) {
        User user = userRepository.findById(email).get();
        if (user.getEmail() != null) {
            System.out.println(user.getImagePath());
            return user.getImagePath();
        } else {
            return null;
        }
    }

    @Override
    public String updatePassword(String email, String password) throws UserException {
        Optional<User> userOptional = userRepository.findById(email);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            if (password != null) {
                existingUser.setPassword(password);
                movieProxy.updatePassword(email, password);
                userRepository.save(existingUser);

                return "Password updated Successfully.";
            } else {
                return "Please provide a valid password.";
            }

        } else {
            throw new UserException();
        }
    }

    @Override
    public User updateUser(String email, User user) throws UserException {
        if (userRepository.findById(email).isPresent()) {
            User existingUser = userRepository.findById(email).get();
            existingUser.setName(user.getName());
            existingUser.setPassword(user.getPassword());
            existingUser.setPhoneNo(user.getPhoneNo());
            if (user.getImagePath() != null) {
                byte[] imageBytes = Base64.getDecoder().decode(user.getImagePath());
                existingUser.setImagePath(imageBytes);
            }
            UserDto userDto = new UserDto(user.getName(), user.getEmail(), user.getPassword(),user.getPhoneNo(),user.getImageName());
            movieProxy.updateUser(email,userDto);
            return userRepository.save(existingUser);
        }
        else{
            throw new  UserException();
        }
    }
}
