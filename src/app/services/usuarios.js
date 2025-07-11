const express = require('express');
const router = express.Router();
const db = require('../db');

// ----------- USUARIOS
router.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM biblioteca_usuarios', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/usuarios', (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    db.query('INSERT INTO biblioteca_usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)',
        [nombre, correo, contraseña], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, mensaje: 'Usuario creado' });
    });
});

router.put('/usuarios/:id', (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    db.query('UPDATE biblioteca_usuarios SET nombre=?, correo=?, contraseña=? WHERE id=?',
        [nombre, correo, contraseña, req.params.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ mensaje: 'Usuario actualizado' });
    });
});

router.delete('/usuarios/:id', (req, res) => {
    db.query('DELETE FROM biblioteca_usuarios WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Usuario eliminado' });
    });
});

module.exports = router;