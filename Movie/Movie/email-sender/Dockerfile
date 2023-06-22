FROM openjdk
WORKDIR user/lib
ADD ./target/email-sender-0.0.1-SNAPSHOT.jar /user/lib/email-sender-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","email-sender-0.0.1-SNAPSHOT.jar"]