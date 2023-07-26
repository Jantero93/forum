<h1>Full stack forum project</h1>

<p>Project is a simple forum where you can register users, create topics and posts.
Boards, topics and posts can be readed by anyone, but you have to be registered to create new topics or posts.</p>
<br>

**Features coming:**
- Users can upvote posts
- Images can be attached to posts
- Long term goal: Put this application running on AWS or Azure


**On dev and prod environments automatically is generated admin user for testing purposes**
**NOTE: Username: admin, password: root**

- - -

<h2>Techonologies:</h2>

<h3>Frontend</h3>

> - React + (TypeScript)
> - Tailwind CSS
> - React router V6
> - Nginx (only when dockerizing application)

<h3>Backend (REST API)</h3>

> - Spring Boot 3.1.2 (Java 17)
> - Hibernate (PostgreSQL; using 15.1, other versions should be fine)
> - Controller - Service - Repository -pattern

<h3>Others</h3>

> - Docker (not needed for local developing, only used for settings prodcution application)

- - -

<h3> Project includes</h3>

> - Authentication (JWT token) + roles for users
> - Frontend: Unit tests
> - Backend: API tests
> - Application is completely dockerized (production only)
> - Security configuration on backend

<h2>How to run project with docker (production mode)</h2>
In root folder run command

```docker-compose up```

**All needed configurations and env variables are in Git.**
Application will be hosted on localhost port **80** (Nginx)

<h2>How to run project locally (development mode)</h2>
<p>Next tools need to be installed to run this locally:</p>

* Node 18
* Java 17
* PostgreSQL 15.1 (some other version may be ok, not testest)
* Maven

<h3>Frontend</h3>

Install packages
```npm install```

(or if you want exactly like package-lock.json, then)
```npm ci```

Start frontend in development mode
```npm run dev```

Project should be started on port 3000

<h3>Backend (with Maven)</h3>
<p>In backend-forum folder run command</p>

Install packages
```mvn install -DskipTests=true```
And run project on development mode
```mvn spring-boot:run -Dspring-boot.run.profiles=dev```
Project should be started on port 8080

<h3>Postgres</h3>

Create database called ```java-forum``` Hibernate will populate all needed database tables

- - -


<h2>Run tests</h2>

<h3>Frontend</h3>
<p>In web-app folder run command</p>

Install packages if not already installed
```npm ci```

Run tests with command
```npm test```

<h3>Backend</h3>
<p>Start Spring Boot instance on port 8080. After that in backend-forum folder run command. Api tests will be run against on instance on port 800</p>

Start Spring boot instance with command
```mvn spring-boot:run -Dspring-boot.run.profiles=test```

Run tests with command
```mvn test```
