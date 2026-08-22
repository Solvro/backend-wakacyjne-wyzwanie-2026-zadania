# Zad 2

## Running the project

<<<<<<< ours
<<<<<<< ours
### 1. Install dependencies

=======
1. Install dependencies
### 1. Install dependencies

2. Create .env
>>>>>>> theirs
=======
### 1. Install dependencies

>>>>>>> theirs
### 2. Create .env

```
# For prisma
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/nestjs_db?schema=public"

# For docker
POSTGRES_USER="myuser"
POSTGRES_PASSWORD="mypassword"
POSTGRES_DB="nestjs_db"
```

<<<<<<< ours
<<<<<<< ours
<<<<<<< HEAD
1. Wake docker up
=======
### 3. Wake docker up
>>>>>>> 37d8d9d (docs: add seeder info to README)
=======
3. Wake docker up
### 3. Wake docker up
>>>>>>> theirs
=======
### 3. Wake docker up
>>>>>>> theirs

```bash
sudo docker-compose up -d
```

## Seeding the database

```bash
pnpm dlx prisma db seed
```
