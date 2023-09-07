const express = require('express');
const mysql = require('mysql');
const mycon = require('express-myconnection');
const app = express();
const dboptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'confeccion'
};

const raoutes = require('./routes');


app.set('port', process.env.PORT || 10000);

//CONNECCION A LA BASA DE DATOS-----------------------------------------
app.use(mycon(mysql, dboptions, 'single'));
app.use(express.json());

//RUTAS-----------------------------------------------------------------
app.get('/', (req, res)=>{
    res.send('Bienvenido')
});

app.use('/api', raoutes)

/* CORRER EL SERVIDOS -------------------------------------------------- */
app.listen(app.get('port'), ()=>{
    console.log('Run server', app.get('port'))
})