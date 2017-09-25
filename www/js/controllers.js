
var app = angular.module('ionium.controllers', []);

// This directive use to convert timestamp into time ago format
app.filter('ago', function() {
    return function(date) {
      return moment(date).fromNow();
    };
})

app.filter('trusted', function($sce){
	return function(url){
		return $sce.trustAsResourceUrl(url);
	}
})

app.controller('AppCtrl', function($ionicNavBarDelegate, $scope, $ionicModal, $http, $ionicSideMenuDelegate, $state, $cordovaOauth, DashList, $rootScope, $localStorage, AuthService, $ionicLoading, $timeout, $state, $ionicPopup) {


  $scope.isAuthenticated = AuthService.onlyLoggedIn();

  $scope.rol = $localStorage.currentRol;

 $scope.showConfirmCerraSession = function() {

   var confirmPopup = $ionicPopup.confirm({
     title: 'ListenTap - Cerrar sesión',
     template: '¿Desea cerrar la sesión del usuario?'
   });



   confirmPopup.then(function(res) {
     if(res) {
       AuthService.logout().then(function(response) {

       $ionicLoading.show({
         content: 'Loading',
         animation: 'fade-in',
         showBackdrop: true,
         maxWidth: 200,
         showDelay: 0
      });


     $timeout(function () {

       $scope.result = angular.fromJson(response.data);

       if($scope.result.Status == "Error"){
         $ionicLoading.hide();
         $scope.showAlert2();
       } else{
          delete $localStorage.currentUser;
          delete $localStorage.currentRol;
          delete $localStorage.campania;
          delete $localStorage.preguntas;
          window.localStorage.removeItem('ionium-fb');
          window.localStorage.removeItem('ionium-gp');
          window.localStorage.removeItem('twitterKey');
          KioskPlugin.exitKiosk();
            navigator.app.exitApp();
         // $http.defaults.headers.common.Authorization = ''
          $ionicLoading.hide();
          $state.go('app.login');
       }
     }, 2000);
   });
     }
   });

 };

 $scope.categorias = function(){
   $state.go('app.red', null, {reload:true});
 }

 $scope.promociones= function(){
$state.go('app.promociones', null, {reload:'pp.promociones'});

 }

 $scope.nuestrared= function(){
$state.go('app.nuestrared', null, {reload:true});

 }

 $scope.radio= function(){
$state.go('app.radio', null, {reload:true});

 }

	$scope.mainmenu = DashList.getAllMenu();

	// Active INK Effect
	ionic.material.ink.displayEffect();
})

app.controller('DashListCtrl', function($scope, $stateParams, $ionicModal, DashList, $ionicLoading, $timeout, $state, $ionicPopup) {
	$scope.data = DashList.getMenuById($stateParams.id);

    setTimeout(function() {
        ionic.material.motion.ripple();
    }, 500);



    // Active INK Effect
    ionic.material.ink.displayEffect();
})
