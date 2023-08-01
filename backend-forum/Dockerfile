FROM maven:3.9.1-eclipse-temurin-17-alpine AS build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN mvn clean package -DskipTests --no-transfer-progress

FROM openjdk:17-alpine
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=fullstackforum-build.jar
WORKDIR /opt/app
COPY --from=build /usr/src/app/target/${JAR_FILE} /opt/app/
ENTRYPOINT [ "java", "-jar", "fullstackforum-build.jar" ]