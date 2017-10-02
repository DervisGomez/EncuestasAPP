angular.module('ionium').controller(
		'inicioController',
		function($scope, AuthService, GuardarLocalService, $cordovaNetwork, $cordovaSocialSharing, $http, $interval,$rootScope, $localStorage, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory) {
			if(window.Connection)
	   {
	                if (!$cordovaNetwork.isOnline()) {
	                    $ionicPopup.confirm({
	                        title: "Internet is not working",
	                        content: "Esta sección solo funciona con internet."
	                    }).then(function (res)
	                    {
	                            if (res) {
	                                //navigator.app.exitApp();
																	$state.go('app.red');
	                            }
	                    });
	                }
	            }


$ionicHistory.clearCache();
ionic.material.ink.displayEffect();
$scope.usuarioEmail=$localStorage.currentUser.mail;
			$scope.refreshTasks = function() {
				$scope.loadData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}, 1250);
			};

			$scope.loadData = function() {

				AuthService.getCintillo({idempresa:$localStorage.currentUser.rol}).then(function(res) {
					// res holds your data
					$scope.dataCintillo = res.data[0].cintillo;

				});

				AuthService.getSucursales ({correo:$localStorage.currentUser.mail}).then(function(res) {
						// res holds your data
						$scope.dataSucursales = res.data;
						console.log(res);

					});

			}




			AuthService.getCintillo({idempresa:$localStorage.currentUser.rol}).then(function(res) {
					// res holds your data
					$scope.dataCintillo = res.data[0].cintillo;

				});

			AuthService.getSucursales ({correo:$localStorage.currentUser.mail, idempresa:$localStorage.currentUser.rol, perfil:$localStorage.currentUser.perfil}).then(function(res) {
					// res holds your data
					$scope.dataSucursales = res.data;
					console.log(res);

				});
 $scope.loadData();

 ionic.material.ink.displayEffect();

 $scope.verCampania = function(ids){
console.log(ids);
	$localStorage.sucursal={id:ids};

	$state.go('app.vercampania',{id:ids});
 }

 $scope.showSincronizar = function(){
 	var confirmSincro = $ionicPopup.confirm({
		 title: 'Sincronizar datos',
		 template: '¿Desea sincronizar datos guardados localmente?'
	 });

 	confirmSincro.then(function(res){
 		if (res) {
 			if (window.cordova && window.SQLitePlugin) {  
		      //alert("Podemos usar SqlLITE !!");
		      GuardarLocalService.listaDatos();
		    }else {
		       // si no podemos usar el plugin sqlite
		       db = window.openDatabase("APSNetMobileDb", "1.0", "testsqlite.db", 100 * 1024 * 1024); 
		       //alert("usamos WebSQL(DB)");
		    }
 		}
 	});
 }

 $scope.showConfirmCerraSession = function() {

	 var confirmPopup = $ionicPopup.confirm({
		 title: 'Cerrar sesión',
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

		});
