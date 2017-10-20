angular.module('ionium').controller(
		'vercampaniaController',
		function($scope, AuthService, DatosService, GuardarLocalService, $ionicPlatform, $cordovaSocialSharing,  $http, $interval, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $stateParams, $cordovaLaunchNavigator, $cordovaGeolocation, $rootScope, $localStorage) {
					// Active INK Effect
			ionic.material.ink.displayEffect();

			$ionicLoading.show({
				content: 'Loading',
				template: 'Obteniendo campaña, espere...',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
			$scope.showAlert = function() {
				var alertPopup = $ionicPopup.alert({
					title : 'Verificar',
					template : 'Credenciales incorrectas'
				});

			};

			$timeout(function () {
				//$scope.cantidaIndex();
				if( $localStorage.campania == null || $localStorage.campania.campania.length == 0 ){
					/*var data = {idsucursal:$stateParams.id};
					AuthService.getCampania(data).then(function(res) {
						// res holds your data
						$scope.dataCampania2=res.data;
						$scope.dataCampania = res.data[0];

						$localStorage.campania= {campania:$scope.dataCampania2};
						alert("1: "+$localStorage.campania.campania);
						console.log($localStorage.campania.campania);
					});*/

					console.log("nombre")

					$scope.numero=0;

					$scope.listaCampania();

				}else{
					
					//alert("2: "+JSON.stringify($localStorage.campania.campania));
					/*$scope.dataNumero=$localStorage.campania.numero;
					console.log($scope.dataNumero+" campania");	
					$scope.dataNumero++;

					if ($scope.dataNumero<$localStorage.campania.campania.length) {
						console.log($scope.dataNumero+" campania2");	
						$scope.dataCampania =$localStorage.campania.campania[$scope.dataNumero];
					}else{
						console.log($scope.dataNumero+" campania0");	
						$scope.dataNumero=0;
						$scope.dataCampania =$localStorage.campania.campania[$scope.dataNumero];
					}
					$localStorage.campania.numero=$scope.dataNumero;*/
								
					//$scope.listaCampania();
					$scope.numero= $localStorage.siguiente.numero;
					$scope.dataCampania =$localStorage.campania.campania[$scope.numero];
					
									

				}

				$ionicLoading.hide();

			}, 2000);

			$scope.cantidaIndex=function(){
				GuardarLocalService.abrirBD();
		 		//db = window.sqlitePlugin.openDatabase({name:'testsqlite.db', key:'test', iosDatabaseLocation:'Documents'});
		      	db.transaction(function(tx) {
		            tx.executeSql("SELECT nombr FROM ind", [], function(tx, rs) {
		               console.log('Registros encontrados: ' + rs.rows.length);
		               //alert("lista: "+JSON.stringify(rs.rows.item(0).nombre));
		               //$scope.inde=rs.rows.length;
		               $localStorage.numero={id:rs.rows.length}
		            }, function(tx, error) {
		               console.log('Error: ' + error.message);
		               alert('error: '+error.message);
		            });
		        });
			}

			$scope.listaCampania= function(){
				GuardarLocalService.abrirBD();
		 		//db = window.sqlitePlugin.openDatabase({name:'testsqlite.db', key:'test', iosDatabaseLocation:'Documents'});
		      	db.transaction(function(tx) {
		            tx.executeSql("SELECT id,nombre,descripcion,instrucciones,agradecimiento,idsucursal,plantilla_caritas,captar_infopersonal,imagenpromocion,cintillo,idempresa,participantes_formulario FROM campania where idsucursal='"+$stateParams.id+"'", [], function(tx, rs) {
		               console.log('Registros encontrados: ' + rs.rows.length);
		  				var itemsColl = [];
		               //alert("lista: "+JSON.stringify(rs.rows.item(0).nombre));
		               if(rs.rows.length > 0){
		                  for (var i = 0; i < rs.rows.length; i++) {
		                    var miItem = new Object();
		                    miItem.id = rs.rows.item(i).id;
		                    miItem.nombre = rs.rows.item(i).nombre;
		                    miItem.descripcion = rs.rows.item(i).descripcion;
		                    miItem.instrucciones = rs.rows.item(i).instrucciones;
		                    miItem.agradecimiento = rs.rows.item(i).agradecimiento;
		                    miItem.idsucursal= rs.rows.item(i).idsucursal;
		                    miItem.plantilla_caritas=rs.rows.item(i).plantilla_caritas;
		                    miItem.captar_infopersonal=rs.rows.item(i).captar_infopersonal;
		                    miItem.imagenpromocion=rs.rows.item(i).imagenpromocion;
		                    miItem.cintillo=rs.rows.item(i).cintillo;
		                    miItem.idempresa=rs.rows.item(i).idempresa;
		                    rs.rows.item(i).participantes_formulario=rs.rows.item(i).participantes_formulario
		                    itemsColl.push(miItem);
		                  };
		                  items2 = JSON.stringify(itemsColl);
		                  //$scope.dataSucursales=itemsColl;
		                  $scope.dataCampania2=itemsColl;
							$scope.dataCampania = itemsColl[$scope.numero];
							$localStorage.campania= {campania:$scope.dataCampania2};
		                  console.log("scope of items is " + items2);
		                  //alert("scope of items is; " +items2);
		                  //alert("scope; " +JSON.stringify($scope.dataCampania2));                  
		                }else{
		                  alert("No hay datos guatdados localmente");
		                  console.log("No hay datos guatdados localmente");
		                }              
		            }, function(tx, error) {
		               console.log('Error: ' + error.message);
		               alert('error: '+error.message);
		            });
		        });
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
				if( $localStorage.campania == null || $localStorage.campania.campania.length == 0 ){
					var data = {idsucursal:$stateParams.id};
					AuthService.getCampania(data).then(function(res) {
						// res holds your data
						$scope.dataCampania2=res.data;
						$scope.dataCampania = res.data[0];

						$localStorage.campania= {campania:$scope.dataCampania2};

						console.log($localStorage.campania.campania);
					});

				}else{
					$scope.dataCampania =$localStorage.campania.campania[0];
					console.log($scope.dataCampania);
				}

			}
 //$scope.loadData();
		$scope.iniciarCampania = function(ids){
			console.log(ids);
			GuardarLocalService.abrirBD();			
			GuardarLocalService.insertarCantidadCompania("h");
			$localStorage.cintillo={cintillo:$scope.dataCampania.cintillo} ;
			if (($scope.numero+1)<$localStorage.campania.campania.length) {
				console.log("entro");
				$localStorage.actual={numero:$scope.numero} ;
				var siguiente=$scope.numero+1;
				$localStorage.siguiente={numero:siguiente} ;
				
			}else{
				console.log("eliminar");
				$localStorage.actual={numero:$scope.numero} ;
				var siguiente=0;
				$localStorage.siguiente={numero:siguiente} ;
			}
			$state.go('app.verpreguntas',{id:ids});
		}

		$scope.salirCampania = function() {
			$ionicPopup.prompt({
				 title: 'Password Check',
				 template: 'Ingresa tu contraseña',
				 inputType: 'password',
				 inputPlaceholder: 'Tu contraseña'
			}).then(function(res) {
			 	console.log('Your password is', res);
				 if(res== $localStorage.currentUser.codigo){
				 	$localStorage.campania = null;
				 	//GuardarLocalService.eliminarIndex();
					$state.go('app.home', null, {reload:true});
				 }else{
					$scope.showAlert();
				 }
			});
		};
	});
