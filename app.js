const express=require('express');
const mysql=require('mysql2');
var bodyParser=require('body-parser');
var app=express();



var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'bebo1802',
    database:'mydb'
})

app.use(express.static('public'))

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:true
}))

app.post('/addUser',(req,res)=>{
    let nombre=req.body.nombre

    con.query('insert into usuarios values("'+correo+'")',(err,respuesta,fields)=>{

        if (err)return console.log("Error",err)

        return res.send(`<h1>Nombre: ${nombre}</h1>`)


    })

})

app.get('/getUsers',(req,res)=>{
    
    con.query('SELECT * FROM usuarios',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        var userHTML=``
        var i=0
        console.log(respuesta)
        respuesta.forEach(user=>{
            i++
            userHTML+=`<tr><td>${i}</td><td>${correo}</td></tr>`
        })

        return res.send(`<table>
            <tr>
                <th>id </th>
                <th>Nombre: </th>
            </tr>
            ${userHTML}
            </table>`)
    })
})

app.delete('/deleteUsers',(req,res)=>{
    
    con.query('DELETE FROM usuarios WHERE correo="'+correo+'"',(err,respuesta,field)=>{
 
        if(err) return console.log('ERROR:',err)

        var userHTML=``
        var i=0
        console.log(respuesta)
        respuesta.forEach(user=>{
            i++
            userHTML+=`<tr><td>${i}</td><td>${correo}</td></tr>`
        })

        return res.send(`<table>
            <tr>
                <th>id </th>
                <th>Nombre eliminado: </th>
            </tr>
            ${userHTML}
            </table>`)
    })
})

app.listen(9000,()=>{
    console.log("Servidor escuchando en el puerto 9000")
})