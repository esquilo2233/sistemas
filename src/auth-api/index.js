require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const knexConfig = require('./knexfile').db;
const knex = require('knex')(knexConfig);
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const generateToken = (user) => {
    console.log('Generating token for user:', user);
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

// Middleware para verificar token JWT no cookie
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        console.log('Authenticated user:', req.user); // Adicionar log para verificar o usuário autenticado
        next();
    });
};

// Middleware para verificar se o usuário é administrador
const isAdmin = (req, res, next) => {
    console.log('Checking if user is admin:', req.user); // Adicionar log para verificar o usuário
    if (req.user.role !== 'admin') {
        console.log('User is not admin:', req.user);
        return res.status(403).json({ error: 'Access denied: Admins only' });
    }
    next();
};

// Rota para registrar novos usuários (aberta)
app.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Verificar se o usuário já existe
        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Encriptação da password
        const hashedPassword = await crypto.createHash('sha256').update(password).digest('hex');

        // Inserir o novo usuário
        const [newUser] = await knex('users').insert({
            email,
            password: hashedPassword,
            role : 'view'
        }).returning('*');

        res.status(201).json({ user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Rota para obter todos os usuários (apenas administradores)
app.get('/users', authenticateToken, isAdmin, async (req, res) => {
    try {
        const users = await knex('users').select('id', 'email', 'role');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving users');
    }
});

// Rota para excluir um usuário pelo ID (apenas administradores)
app.delete('/users/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const user = await knex('users').where({ id }).first();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await knex('users').where({ id }).del();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await knex('users').where({ email }).first();
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const hashedPassword = await crypto.createHash('sha256').update(password).digest('hex');
        if (hashedPassword !== user.password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 3600000 
        });

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

// Rota para administradores registrarem usuários com qualquer função (apenas administradores)
app.post('/registeradmin', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await crypto.createHash('sha256').update(password).digest('hex');
        console.log(hashedPassword)

        const [newUser] = await knex('users').insert({
            email,
            password: hashedPassword,
            role
        }).returning('*');

        res.status(201).json({ user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Rota para retornar a sessão do usuário autenticado
app.get('/session', authenticateToken, (req, res) => {
    const token = req.cookies.token;
    res.status(200).json({ user: req.user,token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});