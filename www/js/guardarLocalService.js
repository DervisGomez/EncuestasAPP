angular.module("ionium")
.factory("GuardarLocalService", function(AuthService) {
  return {

    abrirBD: function(){
        db = window.sqlitePlugin.openDatabase({name:'testsqlite.db', key:'test', iosDatabaseLocation:'Documents'});
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS respuesta (idpregunta,idcampaña,respuesta)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS sucursal (id,nombre)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS campana (id,nombre,cintillo,fecha_inicio,fecha_final,descripcion,instrucciones,agradecimiento,captar_infopersonal,calificacion,estatus,duplicado,idconfiguraciones_campania,cod_inicial,cod_final,idempresa,idusuario,tipo_campania,plantilla_caritas,imagenpromocion,participantes,participantes_formulario)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS campania (id,nombre,descripcion,instrucciones,agradecimiento,idsucursal)');
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           alert('Tablas Creadas');
           console.log('Tablas Creadas');
        });
    },

    insertarCampana: function(data){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO campana VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [data.id,data.nombre,data.cintillo,data.fecha_inicio,data.fecha_final,data.descripcion,data.instrucciones,data.agradecimiento,data.captar_infopersonal,data.calificacion,data.estatus,data.duplicado,data.idconfiguraciones_campania,data.cod_inicial,data.cod_final,data.idempresa,data.idusuario,data.tipo_campania,data.plantilla_caritas,data.imagenpromocion,data.participantes,data.participantes_formulario]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           alert('Campana guardados correctamente');
           console.log('Datos guardados correctamente');
        });
    },

    insertarCampania: function(id,nombre,descripcion,instrucciones,agradecimiento,idsucursal){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO campania VALUES (?,?,?,?,?,?)', [id,nombre,descripcion,instrucciones,agradecimiento,idsucursal]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
            alert('ERROR: ' + error.message);
        }, function() {
           alert('Campania guardados correctamente');
           console.log('Datos guardados correctamente');
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

    insertarDatos: function(pregunta,campaña,respuesta){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO respuesta VALUES (?,?,?)', [pregunta, campaña,respuesta]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           alert('Datos guardados correctamente');
           console.log('Datos guardados correctamente');
        });
    },

    listaDatos: function(){
      db.transaction(function(tx) {
            tx.executeSql('SELECT idpregunta,idcampaña,respuesta FROM respuesta', [], function(tx, rs) {
               console.log('Registros encontrados: ' + rs.rows.length);
               if (rs.rows.length>0) {
                  for (var i = 0; i < rs.rows.length; i++) {
                    //alert(rs.rows.item(i).idpregunta+" - "+rs.rows.item(i).idcampaña+" - "+rs.rows.item(i).respuesta);
                    AuthService.setRespuestas({idpreguntas:rs.rows.item(i).idpregunta, idcampania:rs.rows.item(i).idcampaña, respuesta:rs.rows.item(i).respuesta})
                  };
                  alert("Datos Sincronizados");
                  console.log("Datos Sincronizados");
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

    insertarSucursal: function(id,nombre){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO sucursal VALUES (?,?)', [id, nombre]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
            alert('ERROR: ' + error.message)
        }, function() {
           alert('sucursal guardados correctamente');
           console.log('Sucursal guardados correctamente');
        });
    },

    listaSucursal: function(){
      db.transaction(function(tx) {
            tx.executeSql('SELECT id, nombre FROM sucursal', [], function(tx, rs) {
               console.log('Registros encontrados: ' + rs.rows.length);
               if(rs.rows.length > 0){
                  var itemsColl = [];
                  for (var i = 0; i < rs.rows.length; i++) {
                    itemsColl[i].id = rs.rows.item(i).id;
                    itemsColl[i].nombre = rs.rows.item(i).nombre;
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
    }

  };
});