<h2 style="color: #8348FF; font-size: 3rem; text-align: center;">Podbook</h2>

<br>

![](/front/ProjectImg.png)

Project that simulate audio studio for recording audiobooks. 

### Technologies 

##### Frontend

- Angular
- RxJS
- SASS
- Jest
- JWT
- TypeScript

##### Backend

- TypeScript
- TypeORM
- NodeJS
- Express
- Multer

#### Infra

- Docker
- Docker Compose
- MySQL

### Rising up Infra

1 - With Docker and Docker Compose already installed, navigate to `back/db` folder and type docker-compose up

2 - Type docker ps to check if the mysql container is up

The container will be running at PORT 3306 named as mysql-container

### Running Backend

Create a `.env` and set the two follow environment variables bellow:

- `SERVER_PORT=3333` - The PORT where the server will be running
- `TOKEN_KEY=secret_jwt` - The JWT secret key to your aplication

Set the database password defined at `docker-compose.yaml`

After, navigate to `back` folder and install project dependecies typing on your terminal the follow:

```console
npm install

// If you have yarn installed type
yarn
```

To start development server type

```console
npm run dev

// If you have yarn installed type
yarn dev
```

The server will be running at the port defined by the environment variable `SERVER_PORT`

### Running Front-end

Navigate to `front` folder and install project dependecies typing on your terminal the follow:

```console
npm install

// If you have yarn installed type
yarn
```

To start development server run
```console
npm start

// If you have yarn installed type
yarn start
```

#### Running unit tests

```console
npm run test

// If you have yarn installed type
yarn test
```

### Contribution

Feel free to contribute to this project, you can create an issue and/or submit your pull request. I'll really appreciate. 😉

### Requirements for running this project

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://www.docker.com/)

<hr>

Made with ❤️ by Danilo
