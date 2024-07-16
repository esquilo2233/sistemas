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
INSERT INTO users (email, password, role) VALUES ('admin@admin.com', '$2a$10$26DqlVIVfBDxxtWCqhykTOo7yD3Dy2NhlgkTXres3BvqHHKF7fcsi', 'admin');
INSERT INTO users (email,password, role) VALUES ('view@view.com','$2a$10$1b7YsdmGt8wTUlG8MhroiuVZNFkv1pyp3A38DubS..9QxeH9PXapy', 'view');
INSERT INTO users (email,password, role) VALUES ('edit@edit.com','$2a$10$0yIVutQblXr2X50gG0Ys9uRChJumJ5SsRnFVglR.6aqzaRU/45JBy', 'edit');