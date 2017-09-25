angular.module('ionium').controller(
		'GiroController',
		function($scope, AuthService, $http, $ionicPopup, $ionicPlatform, $interval, $cordovaNetwork, $rootScope, $localStorage, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory) {





			if(window.Connection)
		 {
									if (!$cordovaNetwork.isOnline()) {
											$ionicPopup.confirm({
													title: "Internet is not working",
													content: "Usted no tiene internet. No todas las funciones vana  estar disponibles."
											}).then(function (res)
											{
															if (res) {
																	$scope.giros = $localStorage.Guardargiros.giros;
															}
											});
									}
							}


							AuthService.allGiros().then(function(res) {
								// res holds your data
								$scope.giros = res;

								$localStorage.giros = {
										giros:res
								};


							});


						var autoRefresh=	$interval(function () {


								AuthService.allGiros().then(function(res) {
									// res holds your data
									$scope.giros = res;
									delete $localStorage.giros;
									$localStorage.Guardargiros = {
											giros:res
									};


								});

							}, 7000);


							$ionicPlatform.on('pause', function() {
								console.log('pause');
							//$state.reload();

							$scope.stopRefresh();
							});

							$scope.stopRefresh = function() {
					 $interval.cancel(autoRefresh);
					 };



			$scope.refreshTasks = function() {
				$scope.loadData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}, 1250);
			};

			$scope.loadData = function() {
				AuthService.allGiros().then(function(res) {
					// res holds your data
					$scope.giros = res;

					$localStorage.giros = {
							giros:res
					};


				});
			}

			$scope.empresa = function(ids){
				$state.go('app.empresa',{id:ids});
			}


		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
