-- Criação da tabela users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'view', 'edit')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de dados na tabela users
INSERT INTO users (email, password, role) VALUES ('admin@example.com', 'hashed_password', 'admin');
INSERT INTO users (email, password, role) VALUES ('viewer@example.com', 'hashed_password', 'view');
INSERT INTO users (email, password, role) VALUES ('editor@example.com', 'hashed_password', 'edit');
