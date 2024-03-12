const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
        'SELECT email, name FROM users WHERE email = ? OR name = ?',
        [email, username],
        async (error, result) => {
            if (error) {
                return res.status(400).json({ message: 'Error while registering' });
            }
            if (result.length > 0) {
                return res.status(200).json({ message: 'Email or username already exists' });
            }
            db.query(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 0)',
                [username, email, hashedPassword],
                (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(400).json({ message: 'Error while registering' });
                    } else {
                        return res.status(200).json({ message: 'Registered' });
                    }
                }
            );
        }
    );
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query(
        'SELECT * FROM users WHERE name = ?',
        [username],
        async (error, result) => {
            if (error) {
                return res.status(400).json({ message: 'Error while logging in' });
            }
            console.log(result);
            if (result.length > 0) {
                const user = result[0];
                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if (isPasswordCorrect) {
                    return res.status(200).json({
                        id: user.id,
                        username: user.name,
                        email: user.email,
                        role: user.role,
                        message: 'Logged in',
                    });
                } else {
                    return res.status(200).json({ message: 'Invalid password' });
                }
            } else {
                return res.status(200).json({ message: 'User not found' });
            }
        }
    );
});

app.post('/checkout', (req, res) => {
    const { user, cart } = req.body;
    const userId = user.id;
    const price = cart.reduce((acc, curr) => acc + curr.price, 0);
    console.log(userId, price);
    db.query(
        'INSERT INTO orders (user_id, product_list, price, order_date) VALUES (?, ?, ?, NOW())',
        [userId, JSON.stringify(cart), price],
        (error, result) => {
            if (error) {
                return res.status(400).json({ message: 'Error while checking out' });
            } else {
                return res.status(200).json({ message: 'Checked out' });
            }
        }
    );
});

app.get('/orders/:userId', (req, res) => {
    const userId = req.params.userId;
    db.query(
        'SELECT * FROM orders WHERE user_id = ?',
        [userId],
        (error, result) => {
            if (error) {
                return res.status(400).json({ message: 'Error while fetching orders' });
            } else {
                return res.status(200).json(result);
            }
        }
    );
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});