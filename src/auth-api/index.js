require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

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

// Middleware para verificar token JWT no cookie e nos headers
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    const email = req.cookies.email;
    const role = req.cookies.role;

    if (!token || !email || !role) {
        console.log('No token or user information provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403);
        }
        req.user = { id: user.id, email, role };
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

app.post('/register', authenticateToken, isAdmin, async (req, res) => {
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
            role
        }).returning('*');

        res.status(201).json('User registred');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se o user existe
        const user = await knex('users').where({ email }).first();
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Verificar a senha
        const hashedPassword = await crypto.createHash('sha256').update(password).digest('hex');
        if (hashedPassword !== user.password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Gera o token JWT
        const token = generateToken(user);

        // Definir o cookie com o token JWT e outras informações
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV, // Usar cookies seguros em produção
            sameSite: 'strict', // ou 'lax'
            maxAge: 3600000 // 1 hora em milissegundos
        });

        // Retornar os dados do usuário (sem o token no corpo da resposta)
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

// Rota protegida para verificar sessão
app.get('/session', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

// Nova rota para administradores registrarem usuários com qualquer função
app.post('/registeradmin', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Verificar se o usuário já existe
        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Encriptação da password
        const hashedPassword = await crypto.createHash('sha256').update(password).digest('hex');
        console.log(hashedPassword)
        // Inserir o novo usuário
        const [newUser] = await knex('users').insert({
            email,
            password: hashedPassword,
            role
        }).returning('*');

        res.status(201).json('User is now registed');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
