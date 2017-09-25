angular.module('ionium').controller(
		'verEmpresaFotoController',
		function($scope, AuthService, $cordovaSocialSharing, $stateParams ,$http, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory) {

			$scope.refreshTasks = function() {
				$scope.loadData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}, 1250);
			};

			$scope.items = [];
			var data = {id:$stateParams.id};
			AuthService.verEmpresaFotos2(data).then(function(res) {
				// res holds your data
				$scope.data = res;

				var photos = res;
	        for(var i = 0;i<photos.length;i++){
	          $scope.items[i] = {
	            src: photos[i].src,
	            sub: "",

	          }
	        }
			});

			$scope.loadData = function() {
				$scope.items = [];
				var data = {id:$stateParams.id};
				AuthService.verEmpresaFotos(data).then(function(res) {
					// res holds your data
					$scope.data = res;

					var photos = res;
		        for(var i = 0;i<photos.length;i++){
		          $scope.items[i] = {
		            src: photos[i].src,
		            sub: "",

		          }
		        }
				});



			}








		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
