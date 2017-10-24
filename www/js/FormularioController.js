angular.module('ionium').controller(
		'formularioController',
		function($scope, AuthService, GuardarLocalService, $ionicPlatform, $cordovaSocialSharing, $cordovaNetwork, $stateParams ,$http, $ionicPopup, $state, $timeout, $interval, $ionicLoading, $rootScope, $localStorage, $ionicSlideBoxDelegate,$ionicHistory) {

			document.addEventListener("deviceready", onDeviceReady, false);
			    function onDeviceReady() {
			        document.addEventListener("backbutton", function (e) {
			            e.preventDefault();
			        }, false );
			}

			console.log($localStorage.campania.campania);
						//var data = {id:$stateParams.id};
			$scope.promocion=$localStorage.campania.campania[0].imagenpromocion;
			console.log($scope.promocion);
			$scope.refreshTasks = function() {
				$scope.loadData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}, 1250);
			};

			$scope.loadData = function() {

			}

			$scope.showAlert = function() {
				var alertPopup = $ionicPopup.alert({
					template : 'Por favor de llenar todos los datos'
				});
			};

			$scope.nombreCompleto="";
			$scope.celular="";
			$scope.correo="";
			$scope.fecha_nacimiento="";

			$scope.guardarFormulario = function(nombreCompleto,celular, correo,fecha_nacimiento){

				if (nombreCompleto.length>0&&celular.length>0&&correo!=""&&fecha_nacimiento.length>0) {
					$scope.data2 ={idcampania:$stateParams.id, idempresa:$localStorage.campania.campania[$localStorage.actual.numero].idempresa, nombreCompleto:nombreCompleto, celular:celular, correo:correo, fecha_nacimiento:fecha_nacimiento};
					console.log($localStorage.campania.campania[$localStorage.actual.numero].idempresa);
					GuardarLocalService.insertarFormulario($stateParams.id,$localStorage.campania.campania[0].idempresa,nombreCompleto,celular,correo,fecha_nacimiento);
					//AuthService.setFormulario($scope.data2);
					$state.go('app.vergracias',{id:$stateParams.id}, {reload:'app.vergracias'});
				}else{
					$scope.showAlert();
				}
			}

			$scope.salir = function(){
				$state.go('app.vergracias',{id:$stateParams.id}, {reload:'app.vergracias'});
			}

			$scope.prueba=true;
			$scope.condiciones=function(){
				$scope.prueba=!$scope.prueba;
			}
		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
