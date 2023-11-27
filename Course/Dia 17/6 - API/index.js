const express = require("express");
const cors = require("cors");
const app = express();

const mySQL = require("./connection");
const seguridad = require("./seguridad");

app.use(cors());
app.use(express.json());

app.post("/login", (pedido, respuesta) => {
    mySQL.connection.query('SELECT id FROM usuarios WHERE user = "' + pedido.body.user + '" AND pass = "' + pedido.body.pass + '"', function (error, resultados) {
        if (error) throw error;
        if (resultados.length === 0) {
            respuesta.send(undefined);
        } else {
            respuesta.send(seguridad.crearToken(resultados[0]['id'], pedido.body.user));
        }
    });
})

app.post("/validate", seguridad.validarToken, (pedido, respuesta) => {
    mySQL.connection.query('SELECT p.page FROM permisos p JOIN permisosxusuario u ON u.permiso_id = p.id ' +
        'WHERE u.usuario_id = "' + pedido.user.usuario_id + '" AND p.name = "' + pedido.body.permiso + '"', function (error, resultados) {
            if (error) throw error;
            if (resultados.length === 0) {
                respuesta.send(undefined)
            } else {
                respuesta.send(resultados[0]['page']);
            }
        });
})


app.listen(3000, () => {
    console.log("El servidor esta en línea")
})