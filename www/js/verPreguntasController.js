angular.module('ionium').controller(
		'verPreguntasController',
		function($scope, AuthService, GuardarLocalService, DatosService, $rootScope, $localStorage, $cordovaSocialSharing, $stateParams ,$http, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $ionicSideMenuDelegate, $ionicModal, $window, $ionicScrollDelegate, $cordovaLaunchNavigator, $cordovaGeolocation, $interval, $ionicPlatform) {
      console.log($stateParams.id);

      // Active INK Effect
      ionic.material.ink.displayEffect();
      var audio = new Audio('sound/tap.mp3');
      $timeout(function () {
        $scope.cintillo=$localStorage.cintillo.cintillo;
        if(  $localStorage.preguntas == null || $localStorage.preguntas.preguntas.length ==0){
          $scope.validarNombre();
          $scope.listaPreguntas();
        }else{
          $scope.dataPreguntas = $localStorage.preguntas.preguntas[0];
          console.log($scope.dataPreguntas);
          $scope.validarNombre();
        }
      }, 100);

      $scope.listaPreguntas = function(){
        GuardarLocalService.abrirBD();
        //db = window.sqlitePlugin.openDatabase({name:'testsqlite.db', key:'test', iosDatabaseLocation:'Documents'});
        db.transaction(function(tx) {
          tx.executeSql("SELECT id,idempresa,pregunta,idcampania FROM pregunta where idcampania='"+$stateParams.id+"'", [], function(tx, rs) {
            console.log('Registros encontrados: ' + rs.rows.length);
            var itemsColl = [];
            //alert("lista: "+JSON.stringify(rs.rows.item(0).nombre));
            if(rs.rows.length > 0){
              for (var i = 0; i < rs.rows.length; i++) {
                var miItem = new Object();
                  miItem.idpreguntas = rs.rows.item(i).id;
                  miItem.idempresa = rs.rows.item(i).idempresa;
                  miItem.pregunta = rs.rows.item(i).pregunta;
                  miItem.idcampania = rs.rows.item(i).idcampania;
                  itemsColl.push(miItem);
              };
              items3 = JSON.stringify(itemsColl);
              //$scope.dataSucursales=itemsColl;
              $scope.dataPreguntas = itemsColl[0];
              $localStorage.preguntas = {preguntas:itemsColl};
              console.log($scope.dataPreguntas);
              console.log("scope of items is " + items3);
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


      console.log($localStorage.campania.campania[$localStorage.actual.numero].plantilla_caritas);
      if($localStorage.campania.campania[$localStorage.actual.numero].plantilla_caritas == 1){
        $scope.CaritaUrl="img/plantillas/plantilla1/";
      }
      if($localStorage.campania.campania[$localStorage.actual.numero].plantilla_caritas == 2){
        $scope.CaritaUrl="img/plantillas/azul/";

      }
      if($localStorage.campania.campania[$localStorage.actual.numero].plantilla_caritas ==3 ){
        $scope.CaritaUrl="img/plantillas/verde/";
      }
      if($localStorage.campania.campania[$localStorage.actual.numero].plantilla_caritas == 4){
        $scope.CaritaUrl="img/plantillas/rojo/";
      }
      if($localStorage.campania.campania[$localStorage.actual.numero].plantilla_caritas ==5 ){
        $scope.CaritaUrl="img/plantillas/violeta/";
      }
      if($localStorage.campania.campania[$localStorage.actual.numero].plantilla_caritas ==6 ){
        $scope.CaritaUrl="img/plantillas/naranja/";
      }
      if($localStorage.campania.campania[$localStorage.actual.numero].plantilla_caritas ==7 ){
        $scope.CaritaUrl="img/plantillas/amarillo/";
      }
      if($localStorage.campania.campania[$localStorage.actual.numero].plantilla_caritas ==8 ){
        $scope.CaritaUrl="img/plantillas/azul/blanco";
      }

      $scope.validarNombre= function(){
        GuardarLocalService.abrirBD();
        db.transaction(function(tx) {
          tx.executeSql('SELECT nombre FROM divice', [], function(tx, rs) {
            console.log('Registros encontrados: ' + rs.rows.length);
            if(rs.rows.length > 0){
              $scope.nombre = rs.rows.item(0).nombre;
            }
          }, function(tx, error) {
            console.log('Error: ' + error.message);
          });
        });
      }

      $scope.guardarRespuesta = function(idpregunta, respuesta){
        audio.play();
        //AuthService.setRespuestas({idpreguntas:idpregunta, idcampania:$stateParams.id, respuesta:respuesta})
          //alert("Podemos usar SqlLITE !!");
        GuardarLocalService.abrirBD();

        var dt = new Date()
        var month = dt.getMonth()+1;
        var day = dt.getDate();
        var year = dt.getFullYear();
        $scope.fechaActual= year + '-' + month + '-' + day;
        //alert(idpregunta+" - "+$stateParams.id+" - "+respuesta+" - "+$localStorage.campania.campania[0].idsucursal+" - "+$scope.nombre+" - "+$scope.fechaActual);
        GuardarLocalService.insertarDatos(idpregunta,$stateParams.id,respuesta,$localStorage.campania.campania[$localStorage.actual.numero].idsucursal,$scope.nombre,$scope.fechaActual);

        $localStorage.preguntas.preguntas.splice(0,1);
        if($localStorage.preguntas.preguntas.length != 0){
          var ids=$stateParams.id;
          console.log($localStorage.preguntas.preguntas.length);
          $scope.dataPreguntas = $localStorage.preguntas.preguntas[0];
          //$state.go('app.verpreguntas',{id:ids}, {reload:'app.preguntas'});
        }else{
          var ids=$stateParams.id;
          var dt = new Date();
          // Display the month, day, and year. getMonth() returns a 0-based number.
          var month = dt.getMonth()+1;
          var day = dt.getDate();
          var year = dt.getFullYear();
          $scope.fechaActual= year + '-' + month + '-' + day;
          //AuthService.setConteo({idcampania:ids, fecha_hoy:$scope.fechaActual});
          console.log($localStorage.campania.campania[0].captar_infopersonal);

          GuardarLocalService.abrirBD
          console.log($localStorage.campania.campania[$localStorage.actual.numero].participantes_formulario);
          GuardarLocalService.insertarConteo($scope.fechaActual,$localStorage.campania.campania[$localStorage.actual.numero].idsucursal,ids,$localStorage.campania.campania[$localStorage.actual.numero].participantes_formulario)

          if($localStorage.campania.campania[0].captar_infopersonal == null){
            $state.go('app.vergracias', {id:ids}, {reload:'app.vergracias'});
          }else{
            $state.go('app.verformulario',{id:ids}, {reload:'app.formulario'});
          }
         //$state.go('app.verformulario',{id:ids}, {reload:'app.formulario'});
        }
      }
});
