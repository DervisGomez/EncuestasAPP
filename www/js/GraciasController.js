angular.module('ionium').controller(
		'GraciasController',
		function($scope, AuthService, $ionicPlatform, $cordovaSocialSharing, $cordovaNetwork, $stateParams ,$http, $ionicPopup, $state, $timeout, $interval, $ionicLoading, $rootScope, $localStorage, $ionicSlideBoxDelegate,$ionicHistory) {
			document.addEventListener("deviceready", onDeviceReady, false);
			function onDeviceReady() {
			    document.addEventListener("backbutton", function (e) {
			        e.preventDefault();
			    }, false );
			}

			console.log($localStorage.campania.campania);
			//var data = {id:$stateParams.id};
			$scope.dataCintillo=$localStorage.campania.campania[$localStorage.actual.numero].cintillo;
			$scope.gracias=$localStorage.campania.campania[$localStorage.actual.numero].agradecimiento;
			var updateTime = function(){

				if($localStorage.campania.campania.length != 0){
					//$localStorage.campania.campania.splice(0,1);
				 	$state.go('app.vercampania', {id:$localStorage.sucursal.id}, {reload:true});
				 }else{

					$state.go('app.vercampania', {id:$localStorage.sucursal.id}, {reload:true});

				 }
			}
			$timeout(function () {
				if($localStorage.campania.campania.length != 0){
					 //$localStorage.campania.campania.splice(0,1);
					$state.go('app.vercampania', {id:$localStorage.sucursal.id}, {reload:true});
				}else{
					$state.go('app.vercampania', {id:$localStorage.sucursal.id}, {reload:true});
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

			}

			$scope.guardarFormulario = function(){
				$scope.data ={idcampania:$stateParams.id, idempresa:$localStorage.campania.campania[$localStorage.actual.numero].idempresa};
				AuthService.setFormulario($scope.data);

				if($localStorage.campania.campania.length != 0){
					 //$localStorage.campania.campania.splice(0,1);
					$state.go('app.vercampania', {id:$localStorage.sucursal.id});
				}else{
					$state.go('app.vercampania', {id:$localStorage.sucursal.id});
				}
			}


		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
