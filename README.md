<h1>Full stack forum project</h1>

<p>Project is a simple forum where you can register users, create topics and posts.
Boards, topics and posts can be readed by anyone, but you have to be registered to create new topics or posts.</p>
<br>

**Features coming:**

- ~~Users can upvote posts~~ **Done**
- ~~All tests run on pipeline~~ **Done**
- ~~Users can edit posts in one hour from creation~~ **Done**
- Images can be attached to posts
- Long term goal: Put this application running on AWS or Azure

**On dev and prod environments automatically is generated admin user for testing purposes**
Username: admin, password: root

---

<h2>Features</h2>

- Individual users with roles
- Admin can delete any posts
- Boards are predefined at the moment
- Users can delete only own posts
- Users can create topics
- Users can upvote posts (one upvote per post)
- Secure authentication with JSON Web Token

---

<h2>Techonologies:</h2>

<h3>Frontend</h3>

> - React + (TypeScript)
> - Tailwind CSS
> - React router V6
> - Nginx (only when dockerizing application)

<h3>Backend (REST API)</h3>

> - Spring Boot 3.1.2 (Java 17)
> - Hibernate (PostgreSQL; using 15.1, other versions should be fine)
> - Controller-Service-Repository -pattern

<h3>Testing</h3>

> - Frontend unit tests: Jest
> - Frontend E2E tests: Cypress
> - Backend unit tests JUnit 5
> - Backend API tests: Spring Boot RestTemplate

<h3>Others</h3>

> - Docker (not needed for local developing, only used for creating prodcution application and for testing on pipeline)
> - GitHub Actions pipeline

---

<h2>How to run project with docker (production mode)</h2>
In root folder run command

`docker-compose -f "docker-compose.yml" --env-file .env.production up --build`

**All needed configurations and env variables are in Git.**
Application will be hosted on localhost port **80** (Nginx)

<h2>How to run project locally (development mode)</h2>
<p>Next tools need to be installed to run this locally:</p>

- Node 18
- Java 17
- PostgreSQL 15.1 (some other version may be ok, not tested)
- Maven

<h3>Frontend</h3>

In folder `web-app`

Install packages
`npm install`

Or if you want exactly like package-lock.json, then
`npm ci`

Start frontend in development mode
`npm run dev`

Dev server starts on port 3000

<h3>Backend (with Maven)</h3>

In `backend-forum` folder run command next commands

Install packages
`mvn install -DskipTests=true`

And run project on development mode
`mvn spring-boot:run -Dspring-boot.run.profiles=dev`

Project starts on port 8080

<h3>Postgres</h3>

Create database called `java-forum`. Hibernate will automatically populate all needed database tables. Testing environment needs database `java-forum-test`

---

<h2>Testing</h2>

<p>All tests are run on pipeline (GitHub Actions) when pushing / making pull request on master branch</p>

<h3>Run tests locally</h3>

<h4>Frontend</h4>

Install packages if not already installed. In `web-app` folder run command

`npm ci`

Run unit tests with command
`npm test`

Run e2e tests with command `npm run test:e2e` Before that start dev server on port 3000
`npm run dev` or `npm run preview`

<h4>Backend</h4>

In folder `backend-forum` start Spring Boot instance on port 8080 (default). Api tests will be run against on this instance.

`mvn spring-boot:run -Dspring-boot.run.profiles=test`

After that run command

`mvn test -DargLine="-Dspring.profiles.active=test"`

Command runs all unit & api tests in test env
