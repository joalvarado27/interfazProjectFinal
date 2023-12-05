const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"termopaipa",
});

app.post("/create",(req,res) => {
    const usu_id = req.body.usu_id;
    const usu_contraseña = req.body.usu_contraseña;
    const usu_nombre = req.body.usu_nombre;
    const usu_direccion = req.body.usu_direccion;
    const usu_telefono = req.body.usu_telefono;
    const usu_salario = req.body.usu_salario;
    const rel_id = req.body.rel_id;

    db.query('call sp_insertarEmpleado(?, ?, ?, ?, ?, ?, ?)',[usu_id, usu_contraseña, usu_nombre,usu_direccion,usu_telefono,usu_salario,rel_id],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send("Empleado registrado con exito!");
        }
    });
});

app.get("/usuario",(req,res) => {
    
    db.query('SELECT usu_id, usu_nombre, usu_direccion, usu_telefono, usu_salario, rel_id FROM usuario',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/usuariodos",(req,res) => {
    
    db.query('SELECT usu_id, usu_contraseña FROM usuario',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/update",(req,res) => {
    const usu_id = req.body.usu_id;
    const usu_constraseña = req.usu_constraseña;
    const usu_nombre = req.body.usu_nombre;
    const usu_direccion = req.body.usu_direccion;
    const usu_telefono = req.body.usu_telefono;
    const usu_salario = req.body.usu_salario;
    const rel_id = req.body.rel_id;

    db.query('UPDATE usuario SET usu_id=?,usu_constraseña=?,usu_nombre=?,usu_direccion=?,usu_telefono=?,usu_salario=?,rel_id=? WHERE usu_id=?',[usu_id,usu_constraseña,usu_nombre,usu_direccion,usu_telefono,usu_salario,rel_id,usu_id],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.delete("/delete/:usu_id",(req,res) => {
    const usu_id = req.params.usu_id;

    db.query('DELETE FROM usuario WHERE usu_id=?',usu_id,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.post("/createarea",(req,res) => {
    const are_id = req.body.are_id;
    const are_nombre = req.body.are_nombre;
    const usu_id = req.body.usu_id;

    db.query('INSERT INTO area(are_id, are_nombre, usu_id) VALUES(?,?,?)',[are_id,are_nombre,usu_id],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send("Area registrada con exito!");
        }
    });
});

app.get("/getarea",(req,res) => {
    
    db.query('SELECT are_id, are_nombre, usu_id FROM area',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updatearea",(req,res) => {
    const are_id = req.body.are_id;
    const are_nombre = req.body.are_nombre;
    const usu_id = req.body.usu_id;

    db.query('UPDATE area SET are_id=?,are_nombre=?,usu_id=? WHERE are_id=?',[are_id,are_nombre,usu_id,are_id],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.delete("/deletearea/:are_id",(req,res) => {
    const are_id = req.params.are_id;

    db.query('DELETE FROM area WHERE are_id=?',are_id,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.post("/createareados",(req,res) => {
    const usu_idDos = req.body.usu_idDos;
    const are_idDos = req.body.are_idDos;

    db.query('INSERT INTO usuario_has_area(usu_id,are_id) VALUES(?,?)',[usu_idDos,are_idDos],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send("Usuario en area registrado con exito!");
        }
    });
});

app.get("/getareados",(req,res) => {
    
    db.query('SELECT usu_id,are_id FROM usuario_has_area',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updateareados",(req,res) => {
    const usu_id = req.body.usu_id;
    const are_id = req.body.are_id;

    db.query('UPDATE usuario_has_area SET usu_id=?,are_id=? WHERE usu_id=?',[usu_id,are_id,usu_id],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.delete("/deleteareados/:usu_id",(req,res) => {
    const usu_id = req.params.usu_id;

    db.query('DELETE FROM usuario_has_area WHERE usu_id=?',usu_id,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.post("/createdepartamento",(req,res) => {
    const dep_id = req.body.dep_id;
    const dep_nombre = req.body.dep_nombre;
    const are_id = req.body.are_id;
    const usu_id = req.body.usu_id;

    db.query('INSERT INTO departamento(dep_id, dep_nombre, are_id, usu_id) VALUES(?,?,?,?)',[dep_id,dep_nombre,are_id,usu_id],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send("Area registrada con exito!");
        }
    });
});

app.get("/getdepartamento",(req,res) => {
    
    db.query('SELECT dep_id, dep_nombre, are_id, usu_id FROM departamento',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updatedepartamento",(req,res) => {
    const dep_id = req.body.dep_id;
    const dep_nombre = req.body.dep_nombre;
    const are_id = req.body.are_id;
    const usu_id = req.body.usu_id;

    db.query('UPDATE departamento SET dep_id=?,dep_nombre=?,are_id=?,usu_id=? WHERE dep_id=?',[dep_id,dep_nombre,are_id,usu_id,dep_id],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.delete("/deletedepartamento/:dep_id",(req,res) => {
    const dep_id = req.params.dep_id;

    db.query('DELETE FROM departamento WHERE dep_id=?',dep_id,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.post("/createsolicitar",(req,res) => {
    const dep_id = req.body.dep_id;
    const pro_id = req.body.pro_id;
    const sol_fecha = req.body.sol_fecha;
    const sol_cantidad = req.body.sol_cantidad;
    const sol_confirmacion = req.body.sol_confirmacion;

    db.query('INSERT INTO departamento_solicita_producto(dep_id, pro_id, sol_fecha, sol_cantidad, sol_confirmacion) VALUES(?,?,?,?,?)',[dep_id,pro_id,sol_fecha,sol_cantidad,sol_confirmacion],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send("Area registrada con exito!");
        }
    });
});

app.get("/getsolicitar",(req,res) => {
    
    db.query('SELECT dep_id, pro_id, sol_fecha, sol_cantidad, sol_confirmacion FROM departamento_solicita_producto',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updatesolicitar",(req,res) => {
    const dep_id = req.body.dep_id;
    const pro_id = req.body.pro_id;
    const sol_fecha = req.body.sol_fecha;
    const sol_cantidad = req.body.sol_cantidad;
    const sol_confirmacion = req.body.sol_confirmacion;

    db.query('UPDATE departamento_solicita_producto SET dep_id=?,pro_id=?,sol_fecha=?,sol_cantidad=?,sol_confirmacion=? WHERE dep_id=?',[dep_id,pro_id,sol_fecha,sol_cantidad,sol_confirmacion,dep_id],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.delete("/deletesolicitar/:dep_id",(req,res) => {
    const dep_id = req.params.dep_id;

    db.query('DELETE FROM departamento_solicita_producto WHERE dep_id=?',dep_id,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.post("/createproducto",(req,res) => {
    const pro_id = req.body.pro_id;
    const pro_nombre = req.body.pro_nombre;
    const pro_precio = req.body.pro_precio;

    db.query('INSERT INTO producto(pro_id,pro_nombre,pro_precio) VALUES(?,?,?)',[pro_id,pro_nombre,pro_precio],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send("Producto registrado con exito!");
        }
    });
});

app.get("/getproducto",(req,res) => {
    
    db.query('SELECT pro_id,pro_nombre,pro_precio FROM producto',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updateproducto",(req,res) => {
    const pro_idDos = req.body.pro_idDos;
    const pro_nombreDos = req.body.pro_nombreDos;
    const pro_precioDos = req.body.pro_precioDos;

    db.query('UPDATE producto SET pro_id=?,pro_nombre=?,pro_precio=? WHERE pro_id=?',[pro_idDos,pro_nombreDos,pro_precioDos,pro_idDos],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.delete("/deleteproducto/:pro_id",(req,res) => {
    const pro_id = req.params.pro_id;

    db.query('DELETE FROM producto WHERE pro_id=?',pro_id,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.post("/createtipogasto",(req,res) => {
    const tip_id = req.body.tip_id;
    const tip_nombre = req.body.tip_nombre;

    db.query('INSERT INTO tipo_gasto(tip_id,tip_nombre) VALUES(?,?)',[tip_id,tip_nombre],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send("Tipo de gasto registrado con exito!");
        }
    });
});

app.get("/gettipogasto",(req,res) => {
    
    db.query('SELECT tip_id,tip_nombre FROM tipo_gasto',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updatetipogasto",(req,res) => {
    const tip_id = req.body.tip_id;
    const tip_nombre = req.body.tip_nombre;

    db.query('UPDATE tipo_gasto SET tip_id=?,tip_nombre=? WHERE tip_id=?',[tip_id,tip_nombre,tip_id],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.delete("/deletetipogasto/:tip_id",(req,res) => {
    const tip_id = req.params.tip_id;

    db.query('DELETE FROM tipo_gasto WHERE tip_id=?',tip_id,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.post("/createrelacion",(req,res) => {
    const rel_idDos = req.body.rel_idDos;
    const rel_tipoDos = req.body.rel_tipoDos;

    db.query('INSERT INTO relacion_empresa(rel_id,rel_tipo) VALUES(?,?)',[rel_idDos,rel_tipoDos],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send("Tipo de gasto registrado con exito!");
        }
    });
});

app.get("/getrelacion",(req,res) => {
    
    db.query('SELECT rel_id,rel_tipo FROM relacion_empresa',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updaterelacion",(req,res) => {
    const rel_idDos = req.body.rel_idDos;
    const rel_tipoDos = req.body.rel_tipoDos;

    db.query('UPDATE relacion_empresa SET rel_id=?,rel_tipo=? WHERE rel_id=?',[rel_idDos,rel_tipoDos,rel_idDos],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.delete("/deleterelacion/:rel_id",(req,res) => {
    const rel_id = req.params.rel_id;

    db.query('DELETE FROM relacion_empresa WHERE rel_id=?',rel_id,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.post("/createprivilegios",(req,res) => {
    const id_usuario = req.body.id_usuario;
    const id_rol = req.body.id_rol;
    const usu_contrasena = req.body.usu_contrasena;

    db.query('INSERT INTO usuario_rol(id_usuario,id_rol,usu_contrasena) VALUES(?,?,?)',[id_usuario,id_rol,usu_contrasena],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send("Tipo de gasto registrado con exito!");
        }
    });
});

app.get("/getprivilegios",(req,res) => {
    
    db.query('SELECT id_usuario,id_rol,usu_contrasena FROM usuario_rol',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updateprivilegios",(req,res) => {
    const id_usuario = req.body.id_usuario;
    const id_rol = req.body.id_rol;
    const usu_contrasena = req.body.usu_contrasena;

    db.query('UPDATE usuario_rol SET id_usuario=?,id_rol=?,usu_contrasena=? WHERE id_usuario=?',[id_usuario,id_rol,usu_contrasena,id_usuario],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.delete("/deleteprivilegios/:id_usuario",(req,res) => {
    const id_usuario = req.params.id_usuario;

    db.query('DELETE FROM usuario_rol WHERE id_usuario=?',id_usuario,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/getenergia",(req,res) => {
    
    db.query('SELECT ene_fecha,ene_precio_mercado,ene_precio_venta,ene_cantidad_producto,ene_porcentaje_energia,ene_generada,pro_id,are_id FROM energia',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/getgastos",(req,res) => {
    
    db.query('SELECT gas_id,gas_cantidad,gas_fecha,tip_id FROM gasto',
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/getroluser/:usu_id",(req,res) => {
    const usu_id = req.params.usu_id;
    
    db.query('SELECT u.usu_id, u.usu_nombre, r.nombre_rol FROM usuario u JOIN usuario_rol ur ON u.usu_id = ur.id_usuario JOIN rol r ON ur.id_rol = r.id_rol WHERE u.usu_id = ?',[usu_id],
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updatenuevousuario",(req,res) => {
    const id_usuario = req.body.id_usuario;
    //const id_rol = req.body.id_rol;
    const usu_contrasena = req.body.usu_contrasena;

    db.query(`CREATE USER '${id_usuario}'@'localhost' IDENTIFIED BY '${usu_contrasena}';`,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updatenuevousuariogrant",(req,res) => {
    const id_rol = req.body.id_rol;
    const id_usuario = req.body.id_usuario;

    db.query(`grant '${id_rol}' to '${id_usuario}'@'localhost';`,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.put("/updatenuevousuariodos",(req,res) => {
    const id_usuario = req.body.id_usuario;
    //const id_rol = req.body.id_rol;

    db.query(`set default role all to '${id_usuario}'@'localhost';`,
    (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Run in port 3001")
});