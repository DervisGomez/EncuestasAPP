angular.module('ionium').controller(
		'NombreController',function($scope,AuthService,$ionicLoading, $localStorage,GuardarLocalService, $state, $ionicPopup) {

			$scope.nombr="";
			$scope.estatus="";

			$scope.showAlert = function() {
				var alertPopup = $ionicPopup.alert({
					title : 'Verificar',
					template : 'Nombre ya utilizado'
				});
			};
			$scope.showAlertError = function(data) {
				var alertPopup = $ionicPopup.alert({
					title : 'Nombre Dispositivo',
					template : data
				});
			};
			$scope.nombrarDivice = function(px) {
				$ionicLoading.show({
							content: 'Loading',
							animation: 'fade-in',
							showBackdrop: true,
							maxWidth: 200,
							showDelay: 0
						});
				if (px.length>0) {
					AuthService.setNombre ({idempresa:$localStorage.currentUser.rol, nombreequipo:px}).then(function(res) {
						console.log(res.data);
						if (res.data!="Ya existe el nombre") {
							GuardarLocalService.abrirBD();
							GuardarLocalService.insertarDivice(px);
							$state.go('app.home', null, {reload:true});
						}else{
							$scope.estatus=res.data;
							$scope.showAlertError(res.data);
						}
						$ionicLoading.hide();
					});
					
				}else{
					$scope.showAlert();
					
				}			
			}
		});