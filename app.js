import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} from './config.js'

import {PORT} from './config.js'
import bodyParser from 'body-parser';
import express from 'express';
import mysql from "mysql2";

var app=express()


//const path=require('path');
// const { response } = require('express');

var con=mysql.createConnection({
    host: DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database: DB_NAME
})

// response.sendFile(path.resolve(__dirname,'pagOrder.html'));
//INSERT INTO pedido (nombre,correo,producto) VALUES("Carlos","carlos@gmail.com","Sandwich de Pollo");

app.use(express.static('public'))

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:true
}))

app.post('/addOrder',(req,res)=>{
    let nombre=req.body.nombre
    let correo=req.body.email
    let producto=req.body.producto

    con.query('INSERT INTO pedido(nombre,correo,producto) VALUES("'+nombre+'","'+correo+'","'+producto+'")',(respuesta,fields)=>{

        console.log(nombre,correo,producto)
        
        //return res.sendFile(path.resolve(__dirname,'public/pagOrder.html'));
        return res.send(`<a href="index.html">Inicio</a>
        <h1>El pedido de ${nombre} es: ${producto}</h1>`)

    })

})


app.post('/delOrder',(req,res)=>{
    let nomCustomer=req.body.nomClient;
    let nomProduct=req.body.nomProduct;

    con.query('DELETE FROM pedido WHERE nombre=("'+nomCustomer+'") AND producto=("'+nomProduct+'")',(respuesta,field)=>{

        

        return res.send(`
        <a href="pagOrder.html">Inicio</a>
        <h1>Pedido de ${nomCustomer} eliminado... ${nomProduct}</h1>`)
    })
})

app.get('/getOrders',(req,res)=>{
    
    con.query('SELECT *FROM pedido',(err,respuesta,field)=>{

        var userHTML=``
        var i=0
        console.log(respuesta)
        userHTML+=`
        <a href="pagOrder.html">Get Back</a>
        `
        respuesta.forEach(user=>{
            i++
            userHTML+=`
            <tr><td>${i}  </td> <td>  ${user.nombre}</td> <td>${user.correo}</td> <td>${user.producto}</td> </tr>
            `
        })

        return res.send(`<table>
            <tr>
                <th>id </th>
                <th>Nombre: </th>
                <th>Correo</th>
                <th>Producto </th>
            </tr>
            ${userHTML}
            </table>`)
    })
})

app.post('/upOrder',(req,res)=>{
    let nameUser=req.body.nombreCliente;
    let nomPedido=req.body.editProduct


    con.query('UPDATE pedido SET producto=("'+nomPedido+'") WHERE nombre=("'+nameUser+'")',(respuesta,field)=>{

        return res.send(`
        <a href="pagOrder.html">Inicio</a>
        <h1>Pedido de ${nameUser} cambiado a: ${nomPedido}</h1>
        `)
    })
})


app.listen(PORT,()=>{
    console.log("Servidor escuchando en el puerto 5000")
})