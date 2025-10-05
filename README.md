# Application setup

## Create .env file

Create a .env file in the backend root folder and put the following line:

```bash
NODE_ENV=development
NODE_PORT=3000
MONGODB_URI=mongodb://mongodb:27017/test-angular
JWT_SECRET=AAAAB3NzaC1yc2EAAAABJQAAAQEArwH/4e8E7YiosdOdNxJ0iwxqynG2+UE7uMrE
JWT_EXPIRATION=172800
```

## Build docker

Make sure you are in the test-angular root folder then run the following command line:

```bash
docker compose up --build
```

## Run application

Open your browser and go to the following URL:

```bash
http://localhost:4200
```

## Credentials

```bash
email: admin@admin.com
password: Admin1234!
```
