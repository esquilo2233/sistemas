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
INSERT INTO users (email, password, role) VALUES ('admin@admin.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin');
INSERT INTO users (email,password, role) VALUES ('view@view.com','2bcb43cbc8f6b7ef66331532881143fcbae60a879db3a8fb853f645bb24c2b3c', 'view');
INSERT INTO users (email,password, role) VALUES ('edit@edit.com','262121c5372be8af3ae6ff0d3d138d9e6e1249335222c7f0e02535e35073bb0b', 'edit');