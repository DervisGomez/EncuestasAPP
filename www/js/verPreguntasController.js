angular.module('ionium').controller(
		'verPreguntasController',
		function($scope, AuthService, GuardarLocalService, $rootScope, $localStorage, $cordovaSocialSharing, $stateParams ,$http, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $ionicSideMenuDelegate, $ionicModal, $window, $ionicScrollDelegate, $cordovaLaunchNavigator, $cordovaGeolocation, $interval, $ionicPlatform) {


      // Active INK Effect
        ionic.material.ink.displayEffect();
if(  $localStorage.preguntas == null || $localStorage.preguntas.preguntas.length ==0){
  var data = {idcampania:$stateParams.id};
  AuthService.getPreguntas(data).then(function(res) {
    // res holds your data
    $scope.dataPreguntas = res.data[0];
    $localStorage.preguntas = {preguntas:res.data};
  console.log($scope.dataPreguntas);
  });

}else{
  $scope.dataPreguntas = $localStorage.preguntas.preguntas[0];
  console.log($scope.dataPreguntas);

}
console.log($localStorage.campania.campania[0].plantilla_caritas);
      if($localStorage.campania.campania[0].plantilla_caritas == 1){
        $scope.CaritaUrl="img/plantillas/plantilla1/";
      }
      if($localStorage.campania.campania[0].plantilla_caritas == 2){
        $scope.CaritaUrl="img/plantillas/azul/";

      }
      if($localStorage.campania.campania[0].plantilla_caritas ==3 ){
        $scope.CaritaUrl="img/plantillas/verde/";
      }
      if($localStorage.campania.campania[0].plantilla_caritas == 4){
        $scope.CaritaUrl="img/plantillas/rojo/";
      }
      if($localStorage.campania.campania[0].plantilla_caritas ==5 ){
        $scope.CaritaUrl="img/plantillas/violeta/";
      }
      if($localStorage.campania.campania[0].plantilla_caritas ==6 ){
        $scope.CaritaUrl="img/plantillas/naranja/";
      }
      if($localStorage.campania.campania[0].plantilla_caritas ==7 ){
        $scope.CaritaUrl="img/plantillas/amarillo/";
      }
      if($localStorage.campania.campania[0].plantilla_caritas ==8 ){
        $scope.CaritaUrl="img/plantillas/azul/blanco";
      }




      $scope.refreshTasks = function() {
        $scope.loadData();
        $timeout(function() {
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.refreshComplete');
        }, 1250);
      };

      $scope.loadData = function() {
        var data = {idcampania:$stateParams.id};
        AuthService.getPreguntas(data).then(function(res) {
          // res holds your data
          $scope.dataPreguntas = res.data;

        });



			}


$scope.guardarRespuesta = function(idpregunta, respuesta){
  //AuthService.setRespuestas({idpreguntas:idpregunta, idcampania:$stateParams.id, respuesta:respuesta})
  if (window.cordova && window.SQLitePlugin) {  
      //alert("Podemos usar SqlLITE !!");
      GuardarLocalService.abrirBD();
      //GuardarLocalService.crearTablas();
      GuardarLocalService.insertarDatos(idpregunta,$stateParams.id,respuesta);
    }else {
       // si no podemos usar el plugin sqlite
       db = window.openDatabase("APSNetMobileDb", "1.0", "testsqlite.db", 100 * 1024 * 1024); 
       //alert("usamos WebSQL(DB)");
    }

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
  AuthService.setConteo({idcampania:ids, fecha_hoy:$scope.fechaActual});
  console.log($localStorage.campania.campania[0].captar_infopersonal);
  if($localStorage.campania.campania[0].captar_infopersonal == null){
    $state.go('app.vergracias', {id:ids}, {reload:'app.vergracias'});

  }else{
    $state.go('app.verformulario',{id:ids}, {reload:'app.formulario'});
  }
  //$state.go('app.verformulario',{id:ids}, {reload:'app.formulario'});
}


}







		});
