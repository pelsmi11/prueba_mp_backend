## variable de entorno

- en vase a .env.example crear el .env
- crear cuenta en [https://mailtrap.io/es/](https://mailtrap.io/es/)
- en .env colocar claves MAIL_USER y MAIL_PASSWORD

## contenedor base de datos

```
docker-compose up
```

## crear base de datos

```
CasosDB
```

## migrar base de datos

```
npm i
npm run migrations:run
npm run migrations:generate
npm run migrations:seed
```

## comandos crear contenedor backend

```
docker build -t node-application .
docker run -p 3000:3000 --env-file .env -d node-application
```
