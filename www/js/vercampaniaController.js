angular.module('ionium').controller(
		'vercampaniaController',
		function($scope, AuthService, GuardarLocalService, $ionicPlatform, $cordovaSocialSharing,  $http, $interval, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $stateParams, $cordovaLaunchNavigator, $cordovaGeolocation, $rootScope, $localStorage) {
					// Active INK Effect
				    ionic.material.ink.displayEffect();



			$ionicLoading.show({
				content: 'Loading',
				template: 'Obteniendo campaña, espere...',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
			$scope.showAlert = function() {
				var alertPopup = $ionicPopup.alert({
					title : 'Verificar',
					template : 'Credenciales incorrectas'
				});

			};

			$timeout(function () {

			$ionicLoading.hide();
			if( $localStorage.campania == null || $localStorage.campania.campania.length == 0 ){
				var data = {idsucursal:$stateParams.id};
				AuthService.getCampania(data).then(function(res) {
					// res holds your data
					$scope.dataCampania2=res.data;
					$scope.dataCampania = res.data[0];

					$localStorage.campania= {campania:$scope.dataCampania2};
alert("1: "+$localStorage.campania.campania);
					console.log($localStorage.campania.campania);
				});

				if (window.cordova && window.SQLitePlugin) {

					$scope.dataCampania2=GuardarLocalService.listaCampania($stateParams.id);
					$scope.dataCampania =$scope.dataCampania [0];
					$localStorage.campania= {campania:$scope.dataCampania2};

				}else {							
						    // si no podemos usar el plugin sqlite
					db = window.openDatabase("APSNetMobileDb", "1.0", "testsqlite.db", 100 * 1024 * 1024); 
					console.log("usamos WebSQL(DB)");
				}

			}else{
				alert("2: "+JSON.stringify($localStorage.campania.campania));
				$scope.dataCampania =$localStorage.campania.campania[0];

			}

			}, 2000);

			$scope.refreshTasks = function() {
				$scope.loadData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}, 1250);
			};

			$scope.loadData = function() {
				if( $localStorage.campania == null || $localStorage.campania.campania.length == 0 ){
					var data = {idsucursal:$stateParams.id};
					AuthService.getCampania(data).then(function(res) {
						// res holds your data
						$scope.dataCampania2=res.data;
						$scope.dataCampania = res.data[0];

						$localStorage.campania= {campania:$scope.dataCampania2};

						console.log($localStorage.campania.campania);
					});

				}else{
					$scope.dataCampania =$localStorage.campania.campania[0];
					console.log($scope.dataCampania);
				}

			}





 //$scope.loadData();



		$scope.iniciarCampania = function(ids){
console.log(ids);
			$state.go('app.verpreguntas',{id:ids});
		}

		$scope.salirCampania = function() {
			$ionicPopup.prompt({
 title: 'Password Check',
 template: 'Ingresa tu contraseña',
 inputType: 'password',
 inputPlaceholder: 'Tu contraseña'
}).then(function(res) {
 console.log('Your password is', res);

 if(res== $localStorage.currentUser.codigo){
	 $state.go('app.home', null, {reload:true});
 }else{
	 $scope.showAlert();
 }
});

		};




		});
