angular.module('ionium').controller(
		'NombreController',function($scope,GuardarLocalService, $state, $ionicPopup) {

			$scope.nombr="";

			$scope.showAlert = function() {
				var alertPopup = $ionicPopup.alert({
					title : 'Verificar',
					template : 'Nombre ya utilizado'
				});
			};
			$scope.nombrarDivice = function(px) {
				if (px.length>0) {
					GuardarLocalService.abrirBD();
					GuardarLocalService.insertarDivice(px);
					$state.go('app.home', null, {reload:true});
				}else{
					$scope.showAlert();
				}			
			}
		});