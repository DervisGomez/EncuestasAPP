angular.module("ionium")
.factory("GuardarLocalService", function(AuthService, DatosService) {
  return {

    abrirBD: function(){
        if (window.cordova && window.SQLitePlugin) {
          db = window.sqlitePlugin.openDatabase({name:'testsqlite.db', key:'test', iosDatabaseLocation:'Documents'});
              //$scope.listaSucursal();             
        }else {             
            // si no podemos usar el plugin sqlite
          db = window.openDatabase("APSNetMobileDb", "1.0", "testsqlite.db", 100 * 1024 * 1024); 
          //openDatabase('documents', '1.0', 'Offline document storage', 5*1024*1024, function (db)
          console.log("usamos WebSQL(DB)");
        }
        
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS respuesta (idpregunta,idcampaña,respuesta,idsucursal,nombre,fecha)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS sucursal (id,nombre)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS campania (id,nombre,descripcion,instrucciones,agradecimiento,idsucursal,plantilla_caritas,captar_infopersonal,imagenpromocion,cintillo,idempresa,participantes_formulario,background,no_preguntas)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS divice (nombre)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS pregunta (id,idempresa,pregunta,idcampania)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS formulario (idcampania,idempresa,nombreCompleto,celular,correo,fecha_nacimiento)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS cantidadcompania (nombre)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS user (mail,token,rol,perfil,codigo,ver)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS conteo (fecha,idsucursal,idcampania,participantes_conteo)');
          
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           //alert('Tablas Creadas');
           console.log('Tablas Creadas');
        });
    },

    listaConteo: function(){
      db.transaction(function(tx) {
            tx.executeSql('SELECT fecha,idsucursal,idcampania,participantes_conteo FROM conteo', [], function(tx, rs) {
               console.log('Registros encontrados: ' + rs.rows.length);
               if (rs.rows.length>0) {
                  for (var i = 0; i < rs.rows.length; i++) {
                    console.log(rs.rows.item(i).fecha+" - "+rs.rows.item(i).idsucursal+" - "+rs.rows.item(i).idcampania+" - "+rs.rows.item(i).participantes_conteo);
                    AuthService.setConteo({fecha:rs.rows.item(i).fecha,idsucursal:rs.rows.item(i).idsucursal, idcampania:rs.rows.item(i).idcampania, participantes_conteo:rs.rows.item(i).participantes_conteo});
                    //AuthService.setSincronizar({idpreguntas:rs.rows.item(i).idpregunta, idcampania:rs.rows.item(i).idcampaña, respuesta:rs.rows.item(i).respuesta,idsucursal:rs.rows.item(i).idsucursal,nombreequipo:rs.rows.item(i).nombre,fecha:rs.rows.item(i).fecha})
                  };

                  tx.executeSql('DELETE FROM conteo', [], function(tx, res) {

                  });
                  console.log("Datos Sincronizados");
                }else{
                  //alert("No hay datos guatdados localmente");
                  console.log("No hay datos guatdados localmente");
                }
              
            }, function(tx, error) {
               console.log('Error: ' + error.message);
               //alert('error: '+error.message);
            });
        });
    },

    insertarConteo: function(fecha,idsucursal,idcampania,participantes_conteo){

        db.transaction(function(tx) {
                tx.executeSql("SELECT fecha,idsucursal,idcampania,participantes_conteo FROM conteo where fecha='"+fecha+"' AND idcampania='"+idcampania+"' AND idsucursal='"+idsucursal+"'", [], function(tx, rs) {
                   console.log('Registros encontrados: ' + rs.rows.length);
                   //alert("lista: "+JSON.stringify(rs.rows.item(0).nombre));
                  if(rs.rows.length > 0){
                    var miItem = new Object();
                    miItem.fecha = rs.rows.item(0).fecha;
                    miItem.idsucursal = rs.rows.item(0).idsucursal;
                    miItem.idcampania = rs.rows.item(0).idcampania;
                    miItem.participantes_conteo = rs.rows.item(0).participantes_conteo;

                    tx.executeSql("DELETE FROM conteo where fecha='"+miItem.fecha+"' AND idcampania='"+miItem.idcampania+"' AND idsucursal='"+miItem.idsucursal+"'", [], function(tx, res) {

                    }, function(tx, error) {
                       console.log('Error: ' + error.message);
                       alert('errorS: '+error.message);
                    });
                    var cont=parseInt(miItem.participantes_conteo)+1;
                    console.log("Conteo "+cont);
                    tx.executeSql('INSERT INTO conteo VALUES (?,?,?,?)', [miItem.fecha,miItem.idsucursal,miItem.idcampania,cont]);
                               
                  }else{
                      tx.executeSql('INSERT INTO conteo VALUES (?,?,?,?)', [fecha,idsucursal,idcampania,"1"]);
                  }              
                }, function(tx, error) {
                   console.log('Error: ' + error.message);
                   alert('error: '+error.message);
                });
            });
    },

    insertarUser: function(mail,token,rol,perfil,codigo,ver){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO user VALUES (?,?,?,?,?,?)', [mail,token,rol,perfil,codigo,ver]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           //alert('Datos guardados correctamente');
           console.log('formlario guardados correctamente');
        });
    },

    elimanarUser: function(){
      db.transaction(function(tx) {
        tx.executeSql('DELETE FROM user', [], function(tx, res) {

        }, function(tx, error) {
           console.log('Error: ' + error.message);
           alert('errorS: '+error.message);
        });
      })
    },

    listaFormulario: function(){
      db.transaction(function(tx) {
            tx.executeSql('SELECT idcampania,idempresa,nombreCompleto,celular,correo,fecha_nacimiento FROM formulario', [], function(tx, rs) {
               console.log('Registros encontrados: ' + rs.rows.length);
               if (rs.rows.length>0) {
                  for (var i = 0; i < rs.rows.length; i++) {
                    data2 ={idcampania:rs.rows.item(i).idcampania, idempresa:rs.rows.item(i).idempresa, nombreCompleto:rs.rows.item(i).nombreCompleto, celular:rs.rows.item(i).celular, correo:rs.rows.item(i).correo, fecha_nacimiento:rs.rows.item(i).fecha_nacimiento};
                    AuthService.setFormulario(data2);
                    //alert(rs.rows.item(i).idpregunta+" - "+rs.rows.item(i).idcampaña+" - "+rs.rows.item(i).respuesta);
                  };
                  tx.executeSql('DELETE FROM formulario', [], function(tx, res) {

                  });
                  //alert("Datos Sincronizados");
                  console.log("formulario Sincronizados");
                }else{
                  //alert("No hay datos guatdados localmente");
                  console.log("No hay datos guatdados localmente");
                }
              
            }, function(tx, error) {
               console.log('Error: ' + error.message);
               alert('error: '+error.message);
            });
        });
    },

    insertarFormulario: function(idcampania,idempresa,nombreCompleto,celular,correo,fecha_nacimiento){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO formulario VALUES (?,?,?,?,?,?)', [idcampania,idempresa,nombreCompleto,celular,correo,fecha_nacimiento]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           //alert('Datos guardados correctamente');
           console.log('formlario guardados correctamente');
        });
    },

    insertarCantidadCompania: function(data){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO cantidadcompania VALUES (?)', [data]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           //alert('Campana divice correctamente');
           console.log('Index guardados correctamente');
        });
    },
    eliminarCantidadCompania: function(){
      db.transaction(function(tx) {
        tx.executeSql('DELETE FROM cantidadcompania', [], function(tx, res) {

        }, function(tx, error) {
           console.log('Error: ' + error.message);
           alert('errorS: '+error.message);
        });
      })
    },

    insertarDivice: function(data){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO divice VALUES (?)', [data]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           //alert('Campana divice correctamente');
           console.log('Datos guardados correctamente');
        });
    },

    insertarCampana: function(data){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO campana VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [data.id,data.nombre,data.cintillo,data.fecha_inicio,data.fecha_final,data.descripcion,data.instrucciones,data.agradecimiento,data.captar_infopersonal,data.calificacion,data.estatus,data.duplicado,data.idconfiguraciones_campania,data.cod_inicial,data.cod_final,data.idempresa,data.idusuario,data.tipo_campania,data.plantilla_caritas,data.imagenpromocion,data.participantes,data.participantes_formulario,no_preguntas]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           //alert('Campana guardados correctamente');
           console.log('Datos guardados correctamente');
        });
    },

    insertarPregunta: function(id,idempresa,pregunta,idcampania){
        db.transaction(function(tx) {
          tx.executeSql("SELECT id FROM pregunta where id='"+id+"'", [], function(tx, rs) {
            if (rs.rows.length>0) {
              //alert("no guardado");
            }else{              
              tx.executeSql('INSERT INTO pregunta VALUES (?,?,?,?)', [id,idempresa,pregunta,idcampania]);
            }
          });
        }, function(error) {
            console.log('ERROR: ' + error.message);
            alert('ERROR: ' + error.message);
        }, function() {
           //alert('pregunta guardados correctamente');
           console.log('Preguntas guardados correctamente');
        });
    },

    insertarCampania: function(id,nombre,descripcion,instrucciones,agradecimiento,idsucursal,plantilla_caritas,captar_infopersonal,imagenpromocion,cintillo,idempresa,participantes_formulario,background,no_preguntas){
        db.transaction(function(tx) {
          tx.executeSql("SELECT id, nombre FROM campania where id='"+id+"'  AND idsucursal='"+idsucursal+"'", [], function(tx, rs) {
            if (rs.rows.length>0) {
              //alert("no guardado"+id);
            }else{
              tx.executeSql('INSERT INTO campania VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [id,nombre,descripcion,instrucciones,agradecimiento,idsucursal,plantilla_caritas,captar_infopersonal,imagenpromocion,cintillo,idempresa,participantes_formulario,background,no_preguntas]);
            }
          });
        }, function(error) {
            console.log('ERROR: ' + error.message);
            alert('ERROR1: ' + error.message);
        }, function() {
           //alert('Campania guardados correctamente');
           console.log('Campania guardados correctamente'+id);
        });
    },

    listaCampania: function(data){
      db.transaction(function(tx) {
            tx.executeSql('SELECT id,nombre,descripcion,instrucciones,agradecimiento FROM campania where='+data, [], function(tx, rs) {
               console.log('Registros encontrados: ' + rs.rows.length);
               if(rs.rows.length > 0){
                  var itemsColl = [];
                  for (var i = 0; i < rs.rows.length; i++) {
                    itemsColl[i].id = rs.rows.item(i).id;
                    itemsColl[i].nombre = rs.rows.item(i).nombre;
                    itemsColl[i].descripcion= rs.rows.item(i).descripcion;
                    itemsColl[i].instrucciones = rs.rows.item(i).instrucciones;
                    itemsColl[i].agradecimiento = rs.rows.item(i).agradecimiento;
                  };

                  items = JSON.stringify(itemsColl);
                  console.log("scope of items is " + items);
                  alert("scope of items is; " +items);

                  return itemsColl;
                }else{
                  alert("No hay datos guatdados localmente");
                  console.log("No hay datos guatdados localmente");
                }
              
            }, function(tx, error) {
               console.log('Error: ' + error.message);
               alert('error: '+error.message);
            });
        });
    },

    insertarDatos: function(pregunta, campaña,respuesta,idsucursal,nombre,fecha){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO respuesta VALUES (?,?,?,?,?,?)', [pregunta, campaña,respuesta,idsucursal,nombre,fecha]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           //alert('Datos guardados correctamente');
           console.log('Datos guardados correctamente');
        });
    },

    elimanarRegistros: function(){
      db.transaction(function(tx) {
        tx.executeSql('DELETE FROM sucursal', [], function(tx, res) {

        }, function(tx, error) {
           console.log('Error: ' + error.message);
           alert('errorS: '+error.message);
        });
        tx.executeSql('DELETE FROM campania', [], function(tx, res) {

        }, function(tx, error) {
           console.log('Error: ' + error.message);
           alert('errorC: '+error.message);
        });
        tx.executeSql('DELETE FROM pregunta', [], function(tx, res) {

        }, function(tx, error) {
           console.log('Error: ' + error.message);
           alert('errorP: '+error.message);
        });
      })
    },

    listaDatos: function(){
      db.transaction(function(tx) {
            tx.executeSql('SELECT idpregunta,idcampaña,respuesta,idsucursal,nombre,fecha FROM respuesta', [], function(tx, rs) {
               console.log('Registros encontrados: ' + rs.rows.length);
               if (rs.rows.length>0) {
                  for (var i = 0; i < rs.rows.length; i++) {
                    //alert(rs.rows.item(i).idpregunta+" - "+rs.rows.item(i).idcampaña+" - "+rs.rows.item(i).respuesta);
                    AuthService.setSincronizar({idpreguntas:rs.rows.item(i).idpregunta, idcampania:rs.rows.item(i).idcampaña, respuesta:rs.rows.item(i).respuesta,idsucursal:rs.rows.item(i).idsucursal,nombreequipo:rs.rows.item(i).nombre,fecha:rs.rows.item(i).fecha})
                  };

                  tx.executeSql('DELETE FROM respuesta', [], function(tx, res) {

                  });

                  //alert("Datos Sincronizados");
                  console.log("Datos Sincronizados");
                }else{
                  //alert("No hay datos guatdados localmente");
                  console.log("No hay datos guatdados localmente");
                }
              
            }, function(tx, error) {
               console.log('Error: ' + error.message);
               alert('error: '+error.message);
            });
        });
    },

    insertarSucursal: function(id,nombre){
        db.transaction(function(tx) {
          tx.executeSql("SELECT id, nombre FROM sucursal where id='"+id+"'", [], function(tx, rs) {
            if (rs.rows.length>0) {
              //alert("no guardado");
            }else{
              tx.executeSql('INSERT INTO sucursal VALUES (?,?)', [id, nombre]);
            }
          });    

        }, function(error) {
            console.log('ERROR: ' + error.message);
            alert('ERROR: ' + error.message)
        }, function() {
           //alert('sucursal guardados correctamente');
           console.log('Sucursal guardados correctamente');
        });
    },

    listaSucursal: function(){
      return db.transaction(function(tx) {
            return tx.executeSql('SELECT id, nombre FROM sucursal', [], function(tx, rs) {
               console.log('Registros encontrados: ' + rs.rows.length);
               //alert("lista: "+JSON.stringify(rs.rows.item(0).nombre));
                var itemsColl = [];
               if(rs.rows.length > 0){
                  for (var i = 0; i < rs.rows.length; i++) {
                    var miItem = new Object();
                    miItem.id = rs.rows.item(i).id;
                    miItem.nombre = rs.rows.item(i).nombre;
                    itemsColl.push(miItem);
                  };

                  items = JSON.stringify(itemsColl);
                  console.log("scope of items is " + items);
                  alert("scope of items is; " +items);

                  DatosService.sucursal=itemsColl;
                  //alert("scope; " +DatosService.sucursal);
                  return items;
                }else{
                  alert("No hay datos guatdados localmente");
                  console.log("No hay datos guatdados localmente");
                }
                return "hola";              
            }, function(tx, error) {
               console.log('Error: ' + error.message);
               alert('error: '+error.message);
               return "dd";
            });
        });
    },

    prueba: function(){
      return "JSON.stringify(itemsColl)";
    }

  };
});