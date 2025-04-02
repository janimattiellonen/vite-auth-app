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
