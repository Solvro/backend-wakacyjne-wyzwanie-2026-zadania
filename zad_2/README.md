# Zad 2

## Running the project

1. Install dependencies

2. Create .env

```
# For prisma
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/nestjs_db?schema=public"

# For docker
POSTGRES_USER="myuser"
POSTGRES_PASSWORD="mypassword"
POSTGRES_DB="nestjs_db"
```

1. Wake docker up

```bash
sudo docker-compose up -d
```

## Seeding the database

```bash
pnpm dlx prisma db seed
```
