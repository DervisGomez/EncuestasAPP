angular.module('ionium').controller(
		'inicioController',
		function($scope, AuthService, GuardarLocalService, DatosService, $cordovaNetwork, $cordovaSocialSharing, $http, $interval,$rootScope, $localStorage, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory) {
				
			//$ionicHistory.clearCache();
			//ionic.material.ink.displayEffect();
			$scope.usuarioEmail=$localStorage.currentUser.mail;


	       	$timeout(function () {
	       		$ionicLoading.show({
									content: 'Loading',
									animation: 'fade-in',
									showBackdrop: true,
									maxWidth: 200,
									showDelay: 0
								});
			  if(window.Connection){
					console.log("entro");
					if ($cordovaNetwork.isOnline()){
						GuardarLocalService.abrirBD();
						GuardarLocalService.elimanarRegistros();
						$scope.cargarDatos();
					}else{						
						$scope.listaSucursal();
						//$scope.showAlert3();
					}
				}else{
					GuardarLocalService.abrirBD();
					GuardarLocalService.elimanarRegistros();
					$scope.cargarDatos();
				}
			}, 2000);

			$scope.cargarDatos=function(){
				AuthService.getCintillo({idempresa:$localStorage.currentUser.rol}).then(function(res) {
					// res holds your data
					$scope.dataCintillo = res.data[0].cintillo;
				});

				AuthService.getSucursales ({correo:$localStorage.currentUser.mail, idempresa:$localStorage.currentUser.rol, perfil:$localStorage.currentUser.perfil}).then(function(res) {
						// res holds your data
					$scope.dataSucursales = res.data;			
					GuardarLocalService.abrirBD();
					for (var i = res.data.length - 1; i >= 0; i--) {
						GuardarLocalService.insertarSucursal(res.data[i].id,res.data[i].nombre);
					}
					
				});
				AuthService.getCampañasAll ({idempresa:$localStorage.currentUser.rol}).then(function(res) {
					//$scope.dataSucursales = res.data;
					console.log("campania: "+JSON.stringify(res.data));
					
					GuardarLocalService.abrirBD();
					for (var i = res.data.length - 1; i >= 0; i--) {
						GuardarLocalService.insertarCampania(res.data[i].id,res.data[i].nombre,res.data[i].descripcion,res.data[i].instrucciones,res.data[i].agradecimiento,res.data[i].idsucursal,res.data[i].plantilla_caritas,res.data[i].captar_infopersonal,res.data[i].imagenpromocion,res.data[i].cintillo);
					}
				});
				AuthService.getPreguntasAll ({idempresa:$localStorage.currentUser.rol}).then(function(res) {
						// res holds your data
						//$scope.dataSucursales = res.data;
					console.log("preguntas: "+JSON.stringify(res.data));
						GuardarLocalService.abrirBD();
						for (var i = res.data.length - 1; i >= 0; i--) {
							GuardarLocalService.insertarPregunta(res.data[i].id,res.data[i].idempresa,res.data[i].pregunta,res.data[i].idcampanias);
						}
						$scope.verificarDatos();
				});
				$ionicLoading.hide();
			}			

			$scope.refreshTasks = function() {
				$scope.loadData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}, 1250);
			};

			$scope.loadData = function() {
				alert("load");
				AuthService.getCintillo({idempresa:$localStorage.currentUser.rol}).then(function(res) {
					// res holds your data
					$scope.dataCintillo = res.data[0].cintillo;
					console.log("cintillo: "+res.data[0].cintillo);

				});
				AuthService.getSucursales ({correo:$localStorage.currentUser.mail}).then(function(res) {
						// res holds your data
					$scope.dataSucursales = res.data;
					console.log("sucursal: "+res.data[0].nombre);

				});
			}

			

			$scope.verificarDatos= function(){
				GuardarLocalService.abrirBD();
			    db.transaction(function(tx) {
			        tx.executeSql('SELECT idpregunta FROM respuesta', [], function(tx, rs) {
			            console.log('Registros encontrados: ' + rs.rows.length);
			  			var itemsColl = [];
			               //alert("lista: "+JSON.stringify(rs.rows.item(0).nombre));
			            if(rs.rows.length > 0){
			            	$scope.showSincronizar();
			            }else{

			            }              
			        }, function(tx, error) {
			            console.log('Error: ' + error.message);
			            alert('error: '+error.message);
			        });
			    });
			}


 $scope.listaSucursal= function(){
 	GuardarLocalService.abrirBD();
 	//db = window.sqlitePlugin.openDatabase({name:'testsqlite.db', key:'test', iosDatabaseLocation:'Documents'});
      db.transaction(function(tx) {
            tx.executeSql('SELECT id, nombre FROM sucursal', [], function(tx, rs) {
               console.log('Registros encontrados: ' + rs.rows.length);
  				var itemsColl = [];
               //alert("lista: "+JSON.stringify(rs.rows.item(0).nombre));
               if(rs.rows.length > 0){
                  for (var i = 0; i < rs.rows.length; i++) {
                    var miItem = new Object();
                    miItem.id = rs.rows.item(i).id;
                    miItem.nombre = rs.rows.item(i).nombre;
                    itemsColl.push(miItem);
                  };
                  items = JSON.stringify(itemsColl);
                  $scope.dataSucursales=itemsColl;
                  console.log("scope of items is " + items);
                  //alert("scope of items is; " +items);
                  //alert("scope; " +JSON.stringify($scope.dataSucursales));                  
                }else{
                  //alert("No hay datos guardados localmente");
                  console.log("No hay datos guatdados localmente");
                }              
            }, function(tx, error) {
               console.log('Error: ' + error.message);
               alert('error: '+error.message);
            });
        });
      $ionicLoading.hide();
    }

 $scope.getCampania2 =function(data,id){
 	AuthService.getCampania(data).then(function(rs) {
								//alert(rs.data.length+"---")
		for (var y = rs.data.length - 1; y >= 0; y--) {
			alert("6- "+id);
			GuardarLocalService.insertarCampania(rs.data[y].id,rs.data[y].nombre,rs.data[y].descripcion,rs.data[y].instrucciones,rs.data[y].agradecimiento,id);
		//GuardarLocalService.insertarCampania("1","2","3","4","5","6");
		}								
	});
 }

 function consultasql(callbackPaso1, callbackPaso2){
    //algo aca
    callbackPaso1('paso 1');

    //sigo... algo aca
    callbackPaso2('paso 2');
}

 ionic.material.ink.displayEffect();

 $scope.verCampania = function(ids){
	console.log(ids);
	$localStorage.sucursal={id:ids};
	$state.go('app.vercampania',{id:ids});
 }

 $scope.showSincronizar = function(){
 	var confirmSincro = $ionicPopup.confirm({
		 title: 'Sincronizar datos',
		 template: '¿Desea sincronizar datos guardados localmente?'
	 });

 	confirmSincro.then(function(res){
 		if (res) { 
		      //alert("Podemos usar SqlLITE !!");
		      GuardarLocalService.listaDatos();
		      GuardarLocalService.listaFormulario();
		    
 		}
 	});
 }

 $scope.showConfirmCerraSession = function() {
	 var confirmPopup = $ionicPopup.confirm({
		 title: 'Cerrar sesión',
		 template: '¿Desea cerrar la sesión del usuario?'
	 });
	 confirmPopup.then(function(res) {
		 if(res) {
			 AuthService.logout().then(function(response) {
				 $ionicLoading.show({
					 content: 'Loading',
					 animation: 'fade-in',
					 showBackdrop: true,
					 maxWidth: 200,
					 showDelay: 0
				});
				 $timeout(function () {
					 $scope.result = angular.fromJson(response.data);

					 if($scope.result.Status == "Error"){
						 $ionicLoading.hide();
						 $scope.showAlert2();
					 } else{
							delete $localStorage.currentUser;
							delete $localStorage.currentRol;
							delete $localStorage.campania;
							delete $localStorage.preguntas;
							window.localStorage.removeItem('ionium-fb');
							window.localStorage.removeItem('ionium-gp');
							window.localStorage.removeItem('twitterKey');
							KioskPlugin.exitKiosk();
							navigator.app.exitApp();
						 // $http.defaults.headers.common.Authorization = ''
							$ionicLoading.hide();
							$state.go('app.login');
					 }
		 		}, 2000);
	 		});
		}
	 });

 };
});
