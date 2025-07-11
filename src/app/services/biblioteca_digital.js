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

// ----------- AUTORES
router.get('/autores', (req, res) => {
    db.query('SELECT * FROM biblioteca_autores', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/autores', (req, res) => {
    const { nombre, nacionalidad } = req.body;
    db.query('INSERT INTO biblioteca_autores (nombre, nacionalidad) VALUES (?, ?)',
        [nombre, nacionalidad], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, mensaje: 'Autor creado' });
    });
});

router.put('/autores/:id', (req, res) => {
    const { nombre, nacionalidad } = req.body;
    db.query('UPDATE biblioteca_autores SET nombre=?, nacionalidad=? WHERE id=?',
        [nombre, nacionalidad, req.params.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ mensaje: 'Autor actualizado' });
    });
});

router.delete('/autores/:id', (req, res) => {
    db.query('DELETE FROM biblioteca_autores WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Autor eliminado' });
    });
});

// ----------- LIBROS
router.get('/libros', (req, res) => {
    db.query('SELECT * FROM biblioteca_libros', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/libros', (req, res) => {
    const { titulo, id_autor } = req.body;
    db.query('INSERT INTO biblioteca_libros (titulo, id_autor) VALUES (?, ?)',
        [titulo, id_autor], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, mensaje: 'Libro creado' });
    });
});

router.put('/libros/:id', (req, res) => {
    const { titulo, id_autor } = req.body;
    db.query('UPDATE biblioteca_libros SET titulo=?, id_autor=? WHERE id=?',
        [titulo, id_autor, req.params.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ mensaje: 'Libro actualizado' });
    });
});

router.delete('/libros/:id', (req, res) => {
    db.query('DELETE FROM biblioteca_libros WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Libro eliminado' });
    });
});

// ----------- PRESTAMOS
router.get('/prestamos', (req, res) => {
    db.query('SELECT * FROM biblioteca_prestamos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/prestamos', (req, res) => {
    const { id_usuario, id_libro, fecha_prestamo, fecha_devolucion } = req.body;
    db.query('INSERT INTO biblioteca_prestamos (id_usuario, id_libro, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)',
        [id_usuario, id_libro, fecha_prestamo, fecha_devolucion], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, mensaje: 'Préstamo registrado' });
    });
});

router.put('/prestamos/:id', (req, res) => {
    const { id_usuario, id_libro, fecha_prestamo, fecha_devolucion } = req.body;
    db.query('UPDATE biblioteca_prestamos SET id_usuario=?, id_libro=?, fecha_prestamo=?, fecha_devolucion=? WHERE id=?',
        [id_usuario, id_libro, fecha_prestamo, fecha_devolucion, req.params.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ mensaje: 'Préstamo actualizado' });
    });
});

router.delete('/prestamos/:id', (req, res) => {
    db.query('DELETE FROM biblioteca_prestamos WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Préstamo eliminado' });
    });
});

module.exports = router;