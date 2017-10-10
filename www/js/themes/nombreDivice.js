angular.module('ionium').controller(
		'NombreController',function($scope, AuthService, SOCIAL, $ionicSideMenuDelegate, $ionicModal, $rootScope, $localStorage, $ionicLoading, $state, $ionicPopup, $http, $ionicHistory, $ionicModal, $timeout, $cordovaOauth) {



			$ionicSideMenuDelegate.canDragContent(false);
			$scope.showAlert = function() {
				var alertPopup = $ionicPopup.alert({
					title : 'Verificar',
					template : 'Nombre ya utilizado'
				});
			};
			$scope.nombrarDivice = function() {
				if ($scope.nombre!=null) {

				}else{
					$scope.showAlert();
				}			
			}
		});