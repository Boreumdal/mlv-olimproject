const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'olim_users'
})

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, data) => {
        if (err){
            console.log(err);
        } else {
            res.json(data)
        }
    })
})

app.post('/register', (req, res) => {
    const fname = req.body.fname
    const lname = req.body.lname
    const age = req.body.age

    db.query('INSERT INTO users (fname, lname, age) VALUES (?,?,?)', [fname, lname, age], (err) => {
        if (err){
            console.log(err);
        } else {
            res.send('values inserted')
        }
    })
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params

    db.query(`DELETE FROM users WHERE id=${id}`, err => {
        if (err){
            console.log(err);
        } else {
            res.json({message: `ID ${id} has been susccesfully deleted`})
        }
    })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server runnig at port ${PORT}`))