angular.module('ionium').controller(
		'formularioController',
		function($scope, AuthService, $ionicPlatform, $cordovaSocialSharing, $cordovaNetwork, $stateParams ,$http, $ionicPopup, $state, $timeout, $interval, $ionicLoading, $rootScope, $localStorage, $ionicSlideBoxDelegate,$ionicHistory) {

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
					title : 'Terminos y Condiciones',
					template : 'Para enviar los datos debe aceptar los terminos y condiciones'
				});
			};

			$scope.guardarFormulario = function(nombreCompleto,celular, correo,fecha_nacimiento){

				if (!$scope.prueba) {
					$scope.data2 ={idcampania:$stateParams.id, idempresa:$localStorage.campania.campania[0].idempresa, nombreCompleto:nombreCompleto, celular:celular, correo:correo, fecha_nacimiento:fecha_nacimiento};
					console.log($scope.data2);
					AuthService.setFormulario($scope.data2);
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
