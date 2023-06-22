package com.niit.ContactEmail.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class EmailMessage {
    private String fullName;
    private String userEmail;
    private String text;
}