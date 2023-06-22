package com.MovieApp.Movie.App;

import com.MovieApp.Movie.App.filter.MovieFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class MovieAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieAppApplication.class, args);
	}
	@Bean
	public FilterRegistrationBean filterUrl(){
		FilterRegistrationBean filterRegistrationBean=new FilterRegistrationBean<>();
		filterRegistrationBean.setFilter(new MovieFilter());

		filterRegistrationBean.addUrlPatterns("/movie/api/v1/addMovie","/movie/api/v1/deleteMovie",
				"/movie/api/v1/getFavouriteMovies","/movie/api/v1/deleteUser","/movie/api/v1/get",
				"/movie/api/v1/update", "/movie/api/v1/get/profile");
		return filterRegistrationBean;
	}
//	@Bean
//	public FilterRegistrationBean filterRegistrationBean(){
//
//		final CorsConfiguration corsConfiguration = new CorsConfiguration();
//		corsConfiguration.setAllowCredentials(true);
//		corsConfiguration.addAllowedOrigin("http://localhost:4200");
//		corsConfiguration.addAllowedHeader("*");
//		corsConfiguration.addAllowedMethod("*");
//		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**",corsConfiguration);
//		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
//		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//
//		return bean;
//	}




}
