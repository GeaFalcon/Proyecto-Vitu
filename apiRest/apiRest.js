let express = require("express");
let bodyParser = require('body-parser');
let app = express();
let cors = require('cors')
let mysql = require("mysql");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: null,
        database: "vitu"   //DDBB LIBROS
    });    

//conectando la ddbb
connection.connect(function(error){
    if(error){
       console.log(error);
    }else{
       console.log('Conexion correcta.');
    }
 });
//----------------------------------------------------------------------//

//Mostrar todos los Usuarios;
app.get("/user",(request,response)=>{
    let myUser=new Array(''+request.query.user_id+'')
    console.log(myUser)
    let sql;
    if (myUser=='undefined'){
        sql="SELECT * FROM user" 
    }else{
        sql="SELECT * FROM user WHERE user_id =?"
    }
    connection.query(sql,myUser,(err,result)=>{
        if (err){
            console.log(err)
        }else{
            response.send(result)
            console.log("GET de user");
        }
    })
});

//Mostrar un usuario pasando su id;
app.get("/user/:user_id",(request, response)=>{
    let myUser=new Array(''+request.params.user_id+'');
    console.log(myUser)
    let sql;
    sql="SELECT * FROM user WHERE user_id=?"
    
    connection.query(sql,myUser,(err,result)=>{
        if (err){
            console.log(err)
        }else{
            response.send(result)
            console.log("GET de user");
        }
    })
});

//Crear un nuevo Usuario;
app.post("/user",(request,response)=>{
    let sql;
    let myUser=new Array(
        request.body.nickname,
        request.body.name,
        request.body.email,
        request.body.password,
        // request.body.aboutYou,
        // request.body.photo,
        request.body.place);
    console.log(myUser)
    sql="INSERT INTO user (nickname, name, email, password, place) VALUES(?,?,?,?,?)";
    connection.query(sql,myUser,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            response.send(result)
            console.log("POST de user");
        }
    })
});

//Actualizar un usuario
app.put("/user",(request,response)=>{
    let sql;
    let myUser=new Array(
        request.body.name,
        request.body.nickname,
        request.body.place,
        request.body.password,
        request.body.email,
        request.body.photo, 
        request.body.aboutYou,        
        request.body.user_id);
    sql="UPDATE user SET name=?, nickname=?, place=?, password=?, email=?, photo=?, aboutYou=? WHERE user_id=?"
    connection.query(sql,myUser,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            response.send(result);
            console.log(myUser)
            console.log("PUT de user");
        }
    })
});

//Eliminar un usuario
app.delete("/user",(request,response)=>{
    let sql;
    let myUser=new Array(''+request.body.user_id+'');
    sql="DELETE FROM user WHERE user_id=?";
    connection.query(sql,myUser,(err,result)=>{
        if(err){
        console.log(err);
        }else{
            response.send(result);
            console.log("DELETE de user");
        }
    })
});

//Api para el login
app.post("/user/login",(request,respose)=>{
    let sql;
    let login=new Array(request.body.nickname, request.body.password);
    sql="SELECT user_id FROM user WHERE nickname=? && password=?";
    connection.query(sql,login,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            respose.send(result)
            console.log("GET de user para login");
        }
    })
})


//----------------------------------- API para favoritos -----------------------------------//


app.get("/favorites/:user_id", function(req, res, next)
    { let fav=new Array(''+req.params.user_id+'')
        connection.query("SELECT book.book_id, book.photo, book.type, book.description, book.author, book.title, user.nickname, user.place, favorites_id FROM favorites JOIN user ON (favorites.user_id = user.user_id) JOIN book ON (favorites.book_id = book.book_id) WHERE favorites.user_id=?",fav, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("GET de favoritos");
                }
            }
        );
    }
);

app.post("/favorites", function(req, res, next)
    {
        let variable = "INSERT INTO favorites (user_id, book_id) VALUES (?,?)";
        let variable2 = [req.body.user_id, req.body.book_id];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("POST de favoritos");
                }
            }
        );
    }
);

app.delete("/favorites", function(req, res, next)
    {
        let fav=new Array(''+req.body.favorites_id+'')
        let variable = "DELETE FROM favorites WHERE favorites_id = ?"

        connection.query(variable,fav, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    console.log(fav)
                    res.send(result);
                    console.log("DELETE de favoritos");
                }
            }
        );
    }
);


//----------------------------------- API para libros -----------------------------------//

app.get("/book", function(request, response) {
    let sql;
    if (request.query.id == null) sql = "SELECT * FROM book";
    else sql = "SELECT * FROM book WHERE book_id =" + request.query.id;
    connection.query(sql, function(err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
        console.log("GET de libros(query)");
      }
    });
  });
  
  app.get("/book/:id", function(request, response) {
    let sql = "SELECT * FROM book WHERE book_id =" + request.params.id;
    connection.query(sql, function(err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
        console.log("GET de libros(params)");
      }
    });
  });
 
app.get("/books/:type", function (request, response) {
    let sql = "SELECT * FROM book WHERE type ='" + request.params.type + "'";
    connection.query(sql, function (err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
        console.log("GET de libros/type");
      }
    });
  });

  app.get("/books/title/:title", function (request, response) {
    let sql = "SELECT * FROM book WHERE title ='" + request.params.title + "'";
    connection.query(sql, function (err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
        console.log("GET de libros/title");
      }
    });
  });

  app.get("/books/author/:author", function (request, response) {
    let sql = "SELECT * FROM book WHERE author ='" + request.params.author + "'";
    connection.query(sql, function (err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
        console.log("GET de libros/author");
      }
    });
  });

 //mostrar el libro del usuario logueado 
  app.get("/mybook/:id", function(request, response) {
    let sql = "SELECT * FROM book JOIN user_book ON(book.book_id=user_book.book_id) WHERE user_book.user_id=" + request.params.id;
    connection.query(sql, function(err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
        console.log("GET de mis-libros");
      }
    });
  });
//Pedir libro

  app.get("/userbook/:id",(request,response)=>{
      let varible=[request.params.id]
    let sql="SELECT user.user_id,user.nickname,user.place,user_book.book_id FROM user JOIN user_book ON(user_book.user_id=user.user_id) WHERE user_book.book_id=?";
    connection.query(sql,varible,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            response.send(result)
        }
    })
  })


  app.post("/book", function(request, response) {
    let sentencia = new Array(
      request.body.title,
      request.body.author,
      request.body.year,
      request.body.editorial,
      request.body.type,
      request.body.description,
      request.body.photo,
      //request.body.available
    );

    let sql =
      "INSERT INTO book (title,author,year,editorial,type,description,photo) VALUES (?,?,?,?,?,?,?)";
    console.log(sql);
    connection.query(sql, sentencia, function(err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
        let variable1 = result.insertId;
        let variable2 = [request.body.user_id, variable1];
        let sql2="INSERT INTO user_book (user_id, book_id) VALUES (?,?)"
        connection.query(sql2, variable2, function(err,result){
            if (err) console.log(err);
            else{
                console.log(result)
                console.log("POST de book con relacion a user_book");
            }
        })
      }
    });
  });
  
  app.post("/userbook",(request,response)=>{
    let variable2 = [request.body.user_id, request.body.book_id];
    let sql2="INSERT INTO user_book (user_id, book_id) VALUES (?,?)"
    connection.query(sql2, variable2, function(err,result){
        if (err) console.log(err);
        else{
            response.send(result)
            console.log("POST de book con relacion a user_book");
        }
    })
  })

  app.put("/book", function(request, response) {
    console.log(request.body);
    let cambio = new Array(
      request.body.title,
      request.body.author,
      request.body.year,
      request.body.editorial,
      request.body.type,
      request.body.description,
      request.body.photo,
      //request.body.available,
      request.body.book_id
    );
    let sql =
      "UPDATE book SET title=?,author=?,year=?,editorial=?,type=?,description=?,photo=? WHERE book_id=?";
    console.log(sql);
    connection.query(sql, cambio, function(err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
        console.log("PUT de libros");
      }
    });
  });
  
  // QUERY ES PARA CUANDO USAS EL ?ID= Y PARAMS CUANDO SOLO USAS EL /ID
  app.delete("/book", function(request, response) {
    let bookId=[request.body.book_id]
    let sql = "DELETE FROM book WHERE book_id = ?" ;
    console.log(sql);
    connection.query(sql, bookId, function(err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
        console.log("DELETE de libros");
      }
    });
  });


//----------------------------------- API para solucitudes -----------------------------------//

app.get("/requested/:id", function(req, res, next)
    {   let variable= [req.params.id]
        connection.query("SELECT requested_id ,status, book.photo, book.title, book.author, requested.user_id, user.nickname, user.place, user.email FROM requested JOIN book ON (requested.book_id = book.book_id) JOIN user ON (requested.user_id = user.user_id) WHERE requested.user_idRequest = ? && (requested.status='Aceptada' || requested.status='Pendiente')",variable, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("GET de solicitudes");
                }
            }
        );
    }
);


// app.post("/requested", function(req, res, next)
//     {
//         let variable = "INSERT INTO requested (user_idRequest, book_id, user_id, status) VALUES (?,?,?,?)";
//         let variable2 = [req.body.user_idRequest, req.body.book_id, req.body.user_id, req.body.status];

//         connection.query(variable, variable2, function(err, result)
//             {
//                 if(err){
//                     console.log(err);
//                 }else{
//                     res.send(result);
//                     console.log("POST de solicitudes");
//                 }
//             }
//         );
//     }
// );


app.put("/requested", function(req, res, next)
    {
        let variable = "UPDATE requested SET status = ? WHERE requested_id = ?" ;
        let variable2 = [req.body.status,req.body.requested_id];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("PUT de solicitudes");
                }
            }
        );
    }
);


app.delete("/requested", function(req, res, next)
    {
        let variable = "DELETE FROM requested WHERE requested_id = ?";
        let variable2 = [req.body.requested_id];
        connection.query(variable,variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("DELETE de solicitudes");
                }
            }
        );
    }
);



//----------------------------------- API para peticiones -----------------------------------//

app.get("/petition/:user_id", function(req, res, next)
{
    let variable = "SELECT requested_id, book.photo, book.book_id, book.title, book.type, book.description, book.author, requested.user_id, requested.user_idRequest, user.nickname, user.place,user.email, status FROM requested JOIN book ON (requested.book_id = book.book_id) JOIN user ON (requested.user_idRequest = user.user_id) WHERE requested.user_id = ?";
    let variable2 = new Array ('' + req.params.user_id + '')

    connection.query(variable, variable2, function(err, result)
        {
            if(err){
                console.log(err);
            }else{
                res.send(result);
                console.log("GET de peticiones");
            }
        }
    );
}
);


app.post("/petition", function(req, res, next)
{
    let variable = "INSERT INTO requested (user_idRequest, book_id, user_id, status) VALUES (?,?,?,?)";
    let variable2 = [req.body.user_idRequest, req.body.book_id, req.body.user_id, req.body.status];

    connection.query(variable, variable2, function(err, result)
        {
            if(err){
                console.log(err);
            }else{
                res.send(result);
                console.log("POST de peticiones");
            }
        }
    );
}
);


// app.put("/petition", function(req, res, next)
// {
//     let variable = "UPDATE requested SET status = ? WHERE requested_id = " + [req.query.id];
//     let variable2 = [req.body.status];

//     connection.query(variable, variable2, function(err, result)
//         {
//             if(err){
//                 console.log(err);
//             }else{
//                 res.send(result);
//                 console.log("PUT de solicitudes");
//             }
//         }
//     );
// }
// );


app.delete("/petition", function(req, res, next)
{
    let variable = "DELETE FROM requested WHERE requested_id = ?"
    let variable2 = [req.body.requested_id];

    connection.query(variable, variable2, function(err, result)
        {
            if(err){
                console.log(err);
            }else{
                res.send(result);
                console.log("DELETE de peticiones");
            }
        }
    );
}
);

app.listen(3000);