angular.module("ionium")
.factory("GuardarLocalService", function() {
  return {

    abrirBD: function(){
        db = window.sqlitePlugin.openDatabase({name:'testsqlite.db', key:'test', iosDatabaseLocation:'Documents'});
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS respuesta (idpregunta,idcampaña,respuesta)');
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           //alert('Tablas Creadas');
           console.log('Tablas Creadas');
        });
    },

    cantidadRegistros: function(){
        db.transaction(function(tx) {
            tx.executeSql('SELECT count(*) AS contador FROM respuesta', [], function(tx, rs) {
               console.log('Registros encontrados: ' + rs.rows.item(0).contador);
               alert('Registros encontrados: ' + rs.rows.item(0).contador);
            }, function(tx, error) {
               console.log('Error: ' + error.message);
            });
        });
    },

    insertarDatos: function(pregunta,campaña,respuesta){
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO respuesta VALUES (?,?,?)', [pregunta, campaña,respuesta]);
        }, function(error) {
            console.log('ERROR: ' + error.message);
        }, function() {
           //alert('Datos guardados correctamente');
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
                }else{
                  alert("No hay datos guatdados localmente");
                }
              }
            }, function(tx, error) {
               console.log('Error: ' + error.message);
               alert('error: '+error.message);
            });
        });
    }
  };
});