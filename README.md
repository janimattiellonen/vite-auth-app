# AuthApp

A React application with TypeScript, PostgreSQL, Prisma ORM, and Auth0 authentication.

## Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- npm or yarn

## Project Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Auth0 credentials (see README-AUTH.md for details)

## Development Server

Start the development server:

```bash
npm run dev
```

This will start:
- Frontend at https://localhost:5199
- Backend at https://localhost:3001
- PostgreSQL database at localhost:5432

## Database Migrations

This project uses Prisma ORM for database management. Here's how to work with migrations:

### Initial Setup

1. Generate the initial migration:
```bash
npx prisma migrate dev --name init
```

2. Push the schema to the database:
```bash
npx prisma db push
```

### Working with Migrations

1. After modifying `schema.prisma`, create a new migration:
```bash
npx prisma migrate dev --name your_migration_name
```

2. View the migration status:
```bash
npx prisma migrate status
```

3. Reset the database (caution: this will delete all data):
```bash
npx prisma migrate reset
```

### Prisma Studio

To view and edit your data through a GUI:
```bash
npx prisma studio
```
This will open Prisma Studio at http://localhost:5555

### Common Prisma Commands

- Generate Prisma Client: `npx prisma generate`
- Format Schema: `npx prisma format`
- Validate Schema: `npx prisma validate`

## Docker Container Management

### Start PostgreSQL Container

```bash
docker-compose up -d
```

### Stop Container

```bash
docker-compose down
```

### Access Container Shell

```bash
docker exec -it authapp-postgres bash
```

## Database Access

### Connect to PostgreSQL from Host Machine

```bash
psql postgresql://authapp:authpass@localhost:5432/authapp
```

### Connect from Inside Container

```bash
docker exec -it authapp-postgres psql -U authapp -d authapp
```

### Useful PostgreSQL Commands

Once connected to psql:
- List all tables: `\dt`
- Show table structure: `\d tablename`
- List all schemas: `\dn`
- Exit psql: `\q`

## Additional Documentation

- [Auth0 Setup Guide](./README-AUTH.md)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Auth0 Documentation](https://auth0.com/docs/)
