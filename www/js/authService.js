angular.module('ionium')
		.factory('AuthService', function($http, $cacheFactory, $templateCache, BASE_URL, $localStorage, $state, $q) {
					$cacheFactory.get('$http').removeAll();
					return {
						register : function(data) {
							$http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/register',
								data : data,
								headers : {
									'Content-Type' : 'application/json'
								}
							});
						},
						registerFacebook: function(data) {
							$http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/registerRedsocial',
								data : data,
								headers : {
									'Content-Type' : 'application/json'
								}
							});
						},

						registrarCalificacion: function(data) {
							$http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/registrarCalificacion',
								data : data,
								headers : {
									'Content-Type' : 'application/json'
								}
							});
						},

						login : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/login',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json',


								}
							});
						},
							getCintillo : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/cintillo',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json',


								}
							});
						},
						getCampania : function(data) {
						return $http({
							method : "POST",
							url : BASE_URL.url
									+ 'apps/jappyServices/public/api/consultaCampanias',
							data : data,
							headers : {
								'Content-Type' : 'application/json',
								'accept' : 'application/json',


							}
						});
					},
					getPreguntas : function(data) {
					return $http({
						method : "POST",
						url : BASE_URL.url
								+ 'apps/jappyServices/public/api/consultaPreguntas',
						data : data,
						headers : {
							'Content-Type' : 'application/json',
							'accept' : 'application/json',


						}
					});
				},

				setConteo: function(data) {
				return $http({
					method : "POST",
					url : BASE_URL.url
							+ 'apps/jappyServices/public/api/conteo',
					data : data,
					headers : {
						'Content-Type' : 'application/json',
						'accept' : 'application/json',


					}
				});
				},
				setFormulario: function(data) {
				return $http({
					method : "POST",
					url : BASE_URL.url
							+ 'apps/jappyServices/public/api/formulario',
					data : data,
					headers : {
						'Content-Type' : 'application/json',
						'accept' : 'application/json',


					}
				});
				},
				setRespuestas : function(data) {
				return $http({
					method : "POST",
					url : BASE_URL.url
							+ 'apps/jappyServices/public/api/consultaRespuestas',
					data : data,
					headers : {
						'Content-Type' : 'application/json',
						'accept' : 'application/json',


					}
				});
			},

						getSucursales : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/listaSucursales',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json',


								}
							});
						},


						logout : function() {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/logout'
							});
						},


						recovery : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/recovery',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json'
								}
							});
						},

						pushNotification: function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/pushNotification',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json'
								}
							});
						},

						confirmkey : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/confirmkey',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json'
								}
							});
						},
						restore : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/restore',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json'
								}
							});
						},

						allGiros : function() {

							return $http.get(
									BASE_URL.url
											+ 'asitez/redConcretaServices/public/api/giro').then(
									function(response) {
										$templateCache.removeAll();
										return response.data
									});
						},

						allEmpresas : function() {

							return $http.get(
									BASE_URL.url
											+ 'apps/jappyServices/public/api/empresas').then(
									function(response) {
										$templateCache.removeAll();
										return response.data
									});
						},

						getEmpresa : function(data) {
						return	$http({
								method : "GET",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/getempresas',
								 params :  data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json'
								}
							}).then(
					function(response) {
						$templateCache.removeAll();
						return response.data
					});
				},
				verEmpresa: function(data) {
				return	$http({
						method : "GET",
						url : BASE_URL.url
								+ 'apps/jappyServices/public/api/verempresa',
						 params :  data,
						headers : {
							'Content-Type' : 'application/json',
							'accept' : 'application/json'
						}
					}).then(
			function(response) {
				$templateCache.removeAll();
				return response.data
			});
		},verEmpresaFotos: function(data) {
		return	$http({
				method : "GET",
				url : BASE_URL.url
						+ 'apps/jappyServices/public/api/verempresafoto',
				 params :  data,
				headers : {
					'Content-Type' : 'application/json',
					'accept' : 'application/json'
				}
			}).then(
	function(response) {
		$templateCache.removeAll();
		return response.data
	});
},verEmpresaFotos2: function(data) {
return	$http({
		method : "GET",
		url : BASE_URL.url
				+ 'apps/jappyServices/public/api/verempresafoto2',
		 params :  data,
		headers : {
			'Content-Type' : 'application/json',
			'accept' : 'application/json'
		}
	}).then(
function(response) {
$templateCache.removeAll();
return response.data
});
},

getPromocionEmpresa: function(data) {
return	$http({
		method : "GET",
		url : BASE_URL.url
				+ 'apps/jappyServices/public/api/getpromocionempresa',
		 params :  data,
		headers : {
			'Content-Type' : 'application/json',
			'accept' : 'application/json'
		}
	}).then(
function(response) {
$templateCache.removeAll();
return response.data
});
},
		verEmpresa2: function(data) {
		return	$http({
				method : "GET",
				url : BASE_URL.url
						+ 'apps/jappyServices/public/api/verempresa2',
				 params :  data,
				headers : {
					'Content-Type' : 'application/json',
					'accept' : 'application/json'
				}
			}).then(
	function(response) {
		$templateCache.removeAll();
		return response.data
	});
},
				getPromocion : function(data) {
				return	$http({
						method : "GET",
						url : BASE_URL.url
								+ 'apps/jappyServices/public/api/getpromocion',
						 params :  data,
						headers : {
							'Content-Type' : 'application/json',
							'accept' : 'application/json'
						}
					}).then(
			function(response) {
				$templateCache.removeAll();
				return response.data
			});
		},

						allPromociones : function() {

							return $http.get(
									BASE_URL.url
											+ 'apps/jappyServices/public/api/promociones').then(
									function(response) {
										$templateCache.removeAll();
										return response.data
									});
						},

						isAuthenticate : function() {
							console.log($localStorage.currentUser);
							if ($localStorage.currentUser) {
								$state.go('app.home');
							}
						},

						onlyLoggedIn : function () {

						    if ($localStorage.currentUser)
						    	return true;
						     else
						        return false;

						},

						getCampañasAll : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/consultaTodasCampanias',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json',


								}
							});
						},

						getPreguntasAll : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/consultaTodasPreguntas',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json',


								}
							});
						},

						setSincronizar : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/sincronizarRespuestas',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json',


								}
							});
						},

						setNombre : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'apps/jappyServices/public/api/guardarEquipo',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json',


								}
							});
						},

					}
				});

/**
 * Created by SICEI_Ale on 21/01/2017.
 */
