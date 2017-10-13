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
          console.log("usamos WebSQL(DB)");
        }
        
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS respuesta (idpregunta,idcampaña,respuesta,idsucursal,nombre,fecha)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS sucursal (id,nombre)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS campana (id,nombre,cintillo,fecha_inicio,fecha_final,descripcion,instrucciones,agradecimiento,captar_infopersonal,calificacion,estatus,duplicado,idconfiguraciones_campania,cod_inicial,cod_final,idempresa,idusuario,tipo_campania,plantilla_caritas,imagenpromocion,participantes,participantes_formulario)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS campania (id,nombre,descripcion,instrucciones,agradecimiento,idsucursal,plantilla_caritas,captar_infopersonal,imagenpromocion,cintillo)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS divice (nombre)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS pregunta (id,idempresa,pregunta,idcampania)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS formulario (idcampania,idempresa,nombreCompleto,celular,correo,fecha_nacimiento)');
          
          
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           //alert('Tablas Creadas');
           console.log('Tablas Creadas');
        });
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

                  alert("Datos Sincronizados");
                  console.log("formulario Sincronizados");
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
            tx.executeSql('INSERT INTO campana VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [data.id,data.nombre,data.cintillo,data.fecha_inicio,data.fecha_final,data.descripcion,data.instrucciones,data.agradecimiento,data.captar_infopersonal,data.calificacion,data.estatus,data.duplicado,data.idconfiguraciones_campania,data.cod_inicial,data.cod_final,data.idempresa,data.idusuario,data.tipo_campania,data.plantilla_caritas,data.imagenpromocion,data.participantes,data.participantes_formulario]);
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
           console.log('Datos guardados correctamente');
        });
    },

    insertarCampania: function(id,nombre,descripcion,instrucciones,agradecimiento,idsucursal,plantilla_caritas,captar_infopersonal,imagenpromocion,cintillo){
        db.transaction(function(tx) {
          tx.executeSql("SELECT id, nombre FROM campania where id='"+id+"'  AND idsucursal='"+id+"'", [], function(tx, rs) {
            if (rs.rows.length>0) {
              alert("no guardado"+id);
            }else{
              tx.executeSql('INSERT INTO campania VALUES (?,?,?,?,?,?,?,?,?,?)', [id,nombre,descripcion,instrucciones,agradecimiento,idsucursal,plantilla_caritas,captar_infopersonal,imagenpromocion,cintillo]);
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