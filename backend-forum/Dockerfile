FROM maven:3.8.3 AS build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN mvn clean package -DskipTests

FROM openjdk:17
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=fullstackforum-build.jar
WORKDIR /opt/app
COPY --from=build /usr/src/app/target/${JAR_FILE} /opt/app/
ENTRYPOINT [ "java", "-jar", "fullstackforum-build.jar" ]