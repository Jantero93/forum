<h1>Full stack forum project</h1>

<p>Project is a simple forum where you can register users, create topics and posts.
Boards, topics and posts can be readed by anyone, but you have to be registered to create new topics or posts.</p>
<br>

**Features coming:**
- Users can upvote posts
- Images can be attached to posts
- Long term goal: Put this application running on AWS or Azure

- - -

<h2>Techonologies:</h2>

<h3>Frontend</h3>

> - React + (TypeScript)
> - Tailwind CSS
> - React router V6
> - Nginx (only when dockerizing application)

<h3>Backend (REST API)</h3>

> - Spring Boot (Java 17)
> - Hibernate (PostgreSQL; using 15.1, other versions should be fine)
> - Controller - Service - Repository -pattern

<h3>Others</h3>

> - Docker (not needed for local developing)

- - -

<h3> Project includes</h3>

> - Authentication (JWT token) + roles for users
> - Frontend: Unit tests
> - Backend: API tests
> - Application is completely dockerized
> - Security configuration on backend

<h2>How to run project with docker (production mode)</h2>
In root folder run command

```docker-compose up```

**All needed configurations and env variables are in Git.**
Application is hosted on localhost port **80** (Nginx)

<h2>How to run project locally (development mode)</h2>
<p>Next tools need to be installed to run this locally:</p>

* Node 18
* Java 17
* PostgreSQL 15.1
* Maven

<h3>Frontend</h3>
<p>In web-app folder run command</p>

```npm run dev```

<h3>Backend (with Maven)</h3>
<p>In backend-forum folder run command</p>

```./mvnw spring-boot:run -Dspring-boot.run.profiles=dev```


<h3>Postgres</h3>

Create database called ```java-forum``` Hibernate will populate all needed database tables

- - -


<h2>Run tests</h2>

<h3>Frontend</h3>
<p>In web-app folder run command</p>

```npm test```

<h3>Backend</h3>
<p>Start Spring Boot instance on port 8080. After that in backend-forum folder run command</p>

```mvn test```
