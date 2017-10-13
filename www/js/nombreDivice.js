angular.module('ionium').controller(
		'NombreController',function($scope,AuthService,$cordovaNetwork,$ionicLoading,$ionicSideMenuDelegate, $localStorage,GuardarLocalService, $state, $ionicPopup) {

			$scope.nombr="";
			$scope.estatus="";

			$ionicSideMenuDelegate.canDragContent(false);

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

			$scope.showAlert3 = function() {
				var alertPopup = $ionicPopup.alert({
					title : 'ListenTap - Verificar',
					template : 'Para asignar nombre al equipo debes tener conexión a internet'
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
					if(window.Connection){
						console.log("entro");
						if ($cordovaNetwork.isOnline()){
							$scope.asignarnombre(px);
						}else{
							$scope.showAlert3();
						}
					}else{
						$scope.asignarnombre(px);
					}				
					
				}else{
					$scope.showAlert();
					
				}			
			}

			$scope.asignarnombre=function(px){
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
			}

		});