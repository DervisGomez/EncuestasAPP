window.global = {
  Backand_AppName :'xxxxxxxxxx',
  Backand_Token   :'xxxxxxxxxx', // FROM Backand->Security & Auth->Configuration

  Facebook_APP_ID :'1387902817970005', // Get this from https://developers.facebook.com
  Google_OAUTH_ID :'629756077612-8gj2iv24aeb7b8qmcl8qv4tf8q7crp0k.apps.googleusercontent.com', // Get this from https://console.developers.google.com

  GCM_SENDER_ID   :'726460825027', // Get this from https://console.developers.google.com
  GCM_SERVER_KEY  :'AIzaSyAAyc2FAqwHwPI_hsrlNqg3FEYBYo_y0N8', // Get this from https://console.developers.google.com

  Admob_Unit_ID   :'xxxxxxxxxx'
}

angular.module('ionium', ['ionic', 'backand', 'topscroller', 'ngCordova', 'ngCordovaOauth', 'ionium.controllers', 'ionium.services', 'ngStorage', 'ionic-ratings', 'ngTwitter', 'ion-gallery', 'ksSwiper']).constant("BASE_URL", {
        //"urldecuria": "http://localhost/",
      //  "url":"http://www.decuria.com.mx/"
        "url": "http://www.sistemex.com/",
      //  "url":"http://web/"
    }).constant('SOCIAL', {
    	INVALID_PROVIDER: 'INVALID_PROVIDER',
    	LINKEDIN: {
    		PROVIDER: 'linkedin',
    		ID: '77xogkj2ldipkv',
    		SECRET: 'SByb7HF2jTkcaffF',
    		FB_SECRET: '8sjKdR5q1pxuZpBJHGn2114ttEiOX3ToJoTCrHMk',
    		SCOPE: ['r_basicprofile', 'r_emailaddress'], //Put here the others scopes that you want
    		STATE: 'ionicOAuthService'
    	},
    	FACEBOOK: {
    		PROVIDER: 'facebook',
    		ID: '1387902817970005',
    		SCOPE: ['public_profile', 'email', 'user_work_history', 'user_friends'] //Put here the others scopes that you want
    	},
    	GOOGLE: {
    		PROVIDER: 'google',
    		ID: '268125784328-um1ernorjqq19nt499300t51fa69ooh0.apps.googleusercontent.com',
    		SCOPE: ['email'] //Put here the others scopes that you want
    	},
    	TWITTER: {
    		PROVIDER: 'twitter',
    		KEY: 'Uoc2ptPB8YqPt9jrt0Hfphdoh',
    		SECRET: 'foVxkT42p04PG41iTMakc7H7eVAvkLiPfkyes6NhxWSKiPulYj'
    	}
    })

.run(function($ionicPlatform, BackandService, $ionicHistory, $ionicPopup, $cordovaNetwork, $rootScope, AuthService, $state, $localStorage, $ionicNavBarDelegate) {
  $ionicPlatform.ready(function() {


navigator.splashscreen.hide();
    if(window.Connection)
   {
                if (!$cordovaNetwork.isOnline()) {
                    $ionicPopup.confirm({
                        title: "Internet is not working",
                        content: "Internet is not working on your device."
                    }).then(function (res)
                    {
                            if (res) {
                                navigator.app.exitApp();
                            }
                    });
                }
            }






   if ($localStorage.currentUser) {
       $ionicNavBarDelegate.showBackButton(true);
       $ionicHistory.nextViewOptions({
disableBack: true
});
//alert($localStorage.currentUser);
		$state.go('app.home', null, {reoload:'app.home'});
	}else{
    $state.go('app.login', null, {reload:true});
  }





    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {


      if(toState.authenticate && !AuthService.onlyLoggedIn()){
        event.preventDefault();
        $state.go('app.login', null, {reload: true});
      }



    });

    $ionicPlatform.on('resume', function() {
        console.log('resume');

    });

    $ionicPlatform.on('pause', function() {
      console.log('pause');
    //$state.reload();
    });

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

      document.addEventListener("deviceready", function(){

        function onBackKeyDown(e) {
          e.preventDefault();
        }

        $ionicPlatform.registerBackButtonAction(function(){
          event.preventDefault();
        }, 100);


        var push = PushNotification.init({
              "android": {
                "senderID":  window.global.GCM_SENDER_ID,
                "icon": 'icon',  // Small icon file name without extension
                "iconColor": 'gray'
                //"icon": 'www/img/logo',
               //"color": '000000',
               //"smallIcon": 'res://cordova',
               //"sound": true,
              },
              "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

            push.on('registration', function(data) {
            console.log(data.registrationId);
            //alert('hola');
            AuthService.pushNotification({id:data.registrationId});
            //alert(data.registrationId);
            });

            push.on('notification', function(data) {
            console.log(data.message);
            //alert(data.title+" Message: " +data.message);
             //data.title,
             //data.message,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
            });

            push.on('error', function(e) {
            console.log(e.message);
            });
      /*  var push = PushNotification.init({
            android: {
                senderID: window.global.GCM_SENDER_ID
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });*/

      /*  push.on('registration', function(x) {
          console.log(x.registrationId);
          BackandService.read('push').then(function(y){
            //console.log(y);
            if(y.data.totalRows==0){
              var data = {
                device_id: x.registrationId,
                platform: ionic.Platform.platform()
              };
              BackandService.create('push', data).then(function(z) {
                //console.log(z);
              });
            }
            else{
              for(var i in y.data.data){
                if(y.data.data[i].device_id != x.registrationId){
                  var data = {
                    device_id: x.registrationId,
                    platform: ionic.Platform.platform()
                  };
                  BackandService.create('push', data).then(function(z) {
                    //console.log(z);
                  });
                  break;
                }
              }
            }
          }, function(err){
            console.log(err);
          });
        });
*/

/*push.on('registration', function(data){

console.log(data.registrationId);
alert(data.registrationId);

})
        push.on('notification', function(data) {
          alert(JSON.stringify(data));
          alert(data.message);
        });

        push.on('error', function(e) {
            console.log(err);
        });*/

      }, false);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

//fqz-x2gsldQ:APA91bFC5AnPDzUELnzYKVZvhdvpzAlli7aisg2KJgqCDr3tuHsyWuL_Gx5UYNmb8UzGjnQqs4QJbCbjlOub7AMno_pVjZ-wGwgZ5Cp5ZUqiMCjy7DLU6YEaGN7csDLNmYj_C6Oa1kSN

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, BackandProvider) {
  BackandProvider.setAppName(window.global.Backand_AppName);
  BackandProvider.setAnonymousToken(window.global.Backand_Token);

$ionicConfigProvider.backButton.text('');
$ionicConfigProvider.backButton.icon('ion-android-arrow-back');
$ionicConfigProvider.backButton.previousTitleText(false);
/*  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.icon('ion-android-arrow-back');*/

  $stateProvider.state('app', {
    url: '/app',
    cache: false,
    abstract: true,
    authenticate: true,
    templateUrl: 'templates/themes/menu.html',
    controller: 'AppCtrl'
  })

  // HOME

  .state('app.home', {
      url: '/home',
      cache: false,
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/themes/home.html',
          controller: 'inicioController'

        }
      }
    })
    .state('app.login', {
      url: '/login',
      authenticate: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/themes/login.html',
          controller: 'LoginController'
        }
      }
  })
  .state('app.red', {
    url: '/red',
    authenticate: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/themes/red.html',
        controller: 'GiroController'
      }
    }
  })
  .state('app.radio', {
    url: '/radio',
    authenticate: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/themes/socialmedia.html',
        controller: 'SoundController'
      }
    }
  })
  .state('app.fotos', {
    url: '/fotos/{id}',
    authenticate: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/themes/verEmpresaFoto.html',
        controller: 'verEmpresaFotoController'
      },
      resolve: {
        "entity": function($stateParams, AuthService) {
          return AuthService.verEmpresaFotos({id: $stateParams.id}).$promise;

        }

      //    "entity": ['$stateParams','AuthService', function($stateParams, AuthService) {

            //  return AuthService.getAviso({id: $stateParams.id}).$promise;
          //}],
    }
    }
  })
      .state('app.promociones', {
          url: '/promociones',
          authenticate: false,
          views: {
            'menuContent': {
              templateUrl: 'templates/themes/promocion.html',
              controller: 'promocionController'
            }
          }
        })
        .state('app.empresas', {
            url: '/empresas',
            authenticate: true,
            views: {
              'menuContent': {
                templateUrl: 'templates/themes/empresas.html',
                controller: 'empresaController'
              }
            }
          })

          .state('app.empresa', {
          url: '/empresa/{id}',
          authenticate: true,
          views: {
            'menuContent': {
              templateUrl: 'templates/themes/empresa.html',
              controller: 'empresaController',

            },
            resolve: {
              "entity": function($stateParams, AuthService) {
                return AuthService.getEmpresa({id: $stateParams.id}).$promise;

              }

            //    "entity": ['$stateParams','AuthService', function($stateParams, AuthService) {

                  //  return AuthService.getAviso({id: $stateParams.id}).$promise;
                //}],
          }
          }
          })

          .state('app.vercampania', {
          url: '/campania/{id}',
          cache: false,
          authenticate: true,
          views: {
            'menuContent': {
              templateUrl: 'templates/themes/vercampania.html',
              controller: 'vercampaniaController',

            },
            resolve: {
              "entity": function($stateParams, AuthService) {
                return AuthService.getPromocion({id: $stateParams.id}).$promise;

              }

            //    "entity": ['$stateParams','AuthService', function($stateParams, AuthService) {

                  //  return AuthService.getAviso({id: $stateParams.id}).$promise;
                //}],
          }
          }
          })

          .state('app.verpreguntas', {
          url: '/verpreguntas/{id}',
          cache: false,
          authenticate: false,
          views: {
            'menuContent': {
              templateUrl: 'templates/themes/verpreguntas.html',
              controller: 'verPreguntasController',

            },
            resolve: {
              "entity": function($stateParams, AuthService) {
                return AuthService.verEmpresa({id: $stateParams.id}).$promise;

              }

            //    "entity": ['$stateParams','AuthService', function($stateParams, AuthService) {

                  //  return AuthService.getAviso({id: $stateParams.id}).$promise;
                //}],
          }
          }
          })

          .state('app.verformulario', {
          url: '/verformulario/{id}',
          cache: false,
          authenticate: false,
          views: {
            'menuContent': {
              templateUrl: 'templates/themes/formulario.html',
              controller: 'formularioController',

            },
            resolve: {
              "entity": function($stateParams, AuthService) {
                return AuthService.verEmpresa({id: $stateParams.id}).$promise;

              }

            //    "entity": ['$stateParams','AuthService', function($stateParams, AuthService) {

                  //  return AuthService.getAviso({id: $stateParams.id}).$promise;
                //}],
          }
          }
          })
          .state('app.vergracias', {
          url: '/vergracias/{id}',
          cache: false,
          authenticate: false,
          views: {
            'menuContent': {
              templateUrl: 'templates/themes/gracias.html',
              controller: 'GraciasController',

            },
            resolve: {
              "entity": function($stateParams, AuthService) {
                return AuthService.verEmpresa({id: $stateParams.id}).$promise;

              }

            //    "entity": ['$stateParams','AuthService', function($stateParams, AuthService) {

                  //  return AuthService.getAviso({id: $stateParams.id}).$promise;
                //}],
          }
          }
          })
          .state('app.fbfeeds', {
            url: '/fb-feeds/{id}',
            views: {
              'menuContent': {
                templateUrl: 'templates/themes/social-login/facebook/feeds.html',
                controller: 'FbFeedsCtrl'
              },
              resolve: {
                "entity": function($stateParams, AuthService) {
                  return AuthService.verEmpresa({id: $stateParams.id}).$promise;

                }

            }
            }
          })

  .state('app.dashlist', {
      url: '/dash/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/themes/dashboard-list.html',
          controller: 'DashListCtrl'
        }
      }
    })








  /* SOCIAL LOGIN */

  .state('app.fblogin', {
    cache: false,
    url: '/fb-login',
    views: {
      'menuContent': {
        templateUrl: 'templates/social-login/facebook/index.html',
        controller: 'FbLoginCtrl'
      }
    }
  })

  .state('app.fbprofile', {
    cache: false,
    url: '/fb-profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/social-login/facebook/profile.html',
        controller: 'FbProfileCtrl'
      }
    }
  })

  .state('app.fbfriends', {
    url: '/fb-friends',
    views: {
      'menuContent': {
        templateUrl: 'templates/social-login/facebook/friends.html',
        controller: 'FbFriendsCtrl'
      }
    }
  })


  .state('app.nuestrared', {
    url: '/nuestrared',
    views: {
      'menuContent': {
        templateUrl: 'templates/themes/social-login/facebook/feedsConcreta.html',
        controller: 'FbFeedsCtrl2'
      }
    }
  })

  .state('app.gplogin', {
    cache: false,
    url: '/gp-login',
    views: {
      'menuContent': {
        templateUrl: 'templates/social-login/google/index.html',
        controller: 'GpLoginCtrl'
      }
    }
  })

  .state('app.gpprofile', {
    cache: false,
    url: '/gp-profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/social-login/google/profile.html',
        controller: 'GpProfileCtrl'
      }
    }
  })

  //  FEATURES

  .state('app.pull', {
    url: '/features/pull',
    views: {
      'menuContent': {
        templateUrl: 'templates/features/pull-to-refresh.html',
        controller: 'PullCtrl'
      }
    }
  })

  .state('app.infinite', {
    url: '/features/infinite',
    views: {
      'menuContent': {
        templateUrl: 'templates/features/infinite.html',
        controller: 'InfiniteCtrl'
      }
    }
  })

  .state('app.pinchzoom', {
    url: '/features/pinchzoom',
    views: {
      'menuContent': {
        templateUrl: 'templates/features/pinch-zoom.html',
        controller: 'PinchZoomCtrl'
      }
    }
  })

  .state('app.backtotop', {
    url: '/features/backtotop',
    views: {
      'menuContent': {
        templateUrl: 'templates/features/back-to-top.html',
        controller: 'BackToTopCtrl'
      }
    }
  })

  .state('app.youtube', {
    url: '/features/youtube',
    views: {
      'menuContent': {
        templateUrl: 'templates/features/youtube.html',
        controller: 'YoutubeCtrl'
      }
    }
  })

  .state('app.share', {
    url: '/features/share',
    views: {
      'menuContent': {
        templateUrl: 'templates/features/share.html',
        controller: 'SocialCtrl'
      }
    }
  })

  .state('app.callemailsms', {
    url: '/features/callemailsms',
    views: {
      'menuContent': {
        templateUrl: 'templates/features/call-email-sms.html',
        controller: 'CallEmailSmsCtrl'
      }
    }
  })

  .state('app.impicker', {
    url: '/features/impicker',
    views: {
      'menuContent': {
        templateUrl: 'templates/features/impicker.html',
        controller: 'ImgPickerCtrl'
      }
    }
  })

  .state('app.admob', {
    url: '/features/admob',
    views: {
      'menuContent': {
        templateUrl: 'templates/features/admob.html',
        controller: 'AdmobCtrl'
      }
    }
  })

  //  HARDWARE

  .state('app.vibra', {
    url: '/hardware/vibra',
    views: {
      'menuContent': {
        templateUrl: 'templates/hardware/vibra.html',
        controller: 'VibraCtrl'
      }
    }
  })

  .state('app.toast', {
    url: '/hardware/toast',
    views: {
      'menuContent': {
        templateUrl: 'templates/hardware/toast.html',
        controller: 'ToastCtrl'
      }
    }
  })

  .state('app.dialog', {
    url: '/hardware/dialog',
    views: {
      'menuContent': {
        templateUrl: 'templates/hardware/dialog.html',
        controller: 'DialogCtrl'
      }
    }
  })

  .state('app.devinfo', {
    url: '/hardware/devinfo',
    views: {
      'menuContent': {
        templateUrl: 'templates/hardware/devinfo.html',
        controller: 'DevInfoCtrl'
      }
    }
  })

  .state('app.flash', {
    url: '/hardware/flash',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/hardware/flashlight.html',
        controller: 'FlashCtrl'
      }
    }
  })

  .state('app.netinfo', {
    url: '/hardware/netinfo',
    views: {
      'menuContent': {
        templateUrl: 'templates/hardware/netinfo.html',
        controller: 'NetInfoCtrl'
      }
    }
  })

  //  MATERIAL DESIGN

  .state('app.component', {
    url: '/material/component',
    views: {
      'menuContent': {
        templateUrl: 'templates/material/components.html',
        controller: 'ComponentCtrl'
      }
    }
  })

  .state('app.nombre', {
    url: '/nombre',
    views: {
      'menuContent': {
        templateUrl: 'templates/themes/nombre-divice.html',
        controller: 'NombreController'
      }
    }
  })

  .state('app.motionlist', {
    cache: false,
    url: '/material/motion',
    views: {
      'menuContent': {
        templateUrl: 'templates/material/motion.html',
        controller: 'MotionCtrl'
      }
    }
  });;



  $urlRouterProvider.otherwise('/app/login');
}).service('UtilityService', ['$ionicPopup', function ($ionicPopup) {

	this.isNullOrBlank = function (value) {
		if (value === undefined || value === null || value === '' || (typeof value === 'string' && value.trim() === '')) {
			return true;
		}
		if (typeof value === 'object' && Object.keys(value).length === 0) {
			return true;
		}
		return false;
	};

	this.startsWith = function (fullValue, startsValue) {
		return fullValue.indexOf(startsValue) === 0;
	};

	this.showMsg = function(title, message) {
		$ionicPopup.alert({
			title: title,
			template: message
		});
	};
}])


// It is used to convert datetime into time ago format

moment.locale('en', {
    relativeTime : {
        future: " %s",
        past:   "%s",
        s:  "1s",
        m:  "1m",
        mm: "%dm",
        h:  "1h",
        hh: "%dh",
        d:  "1d",
        dd: "%dd",
        M:  "1m",
        MM: "%dm",
        y:  "1y",
        yy: "%dy"
    }
});
