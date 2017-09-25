




angular.module('ionium').controller(
		'SoundController',
		function($scope, AuthService, $cordovaSocialSharing, $ionicModal, $stateParams ,$http, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $cordovaNativeAudio) {







      var audioUrl = "http://64.56.64.94:8008/";

var audioUrlFormula="http://144.217.228.52:8000/merida1";
     $scope.playAudio = function(){

       var options = {
         bgColor: "#ffffff",
         bgImage: "http://sona893.fm/wp-content/uploads/2015/11/xsona-logo2.png.pagespeed.ic.3rSsECri8V.png",
         bgImageScale: "fit", // other valid values: "stretch"
         initFullscreen: false,
         orientation: "landscape", // true(default)/false iOS only
         successCallback: function() {
           console.log("Player closed without error.");
         },
         errorCallback: function(errMsg) {
           console.log("Error! " + errMsg);
         }
       };
       window.plugins.streamingMedia.playAudio(audioUrl, options);

     }

     $scope.playAudioFormula = function(){

       var options = {
         bgColor: "#ffffff",
         bgImage: "http://hoy.lasalle.mx/wp-content/uploads/2014/05/radio_formula_2.png",
         bgImageScale: "fit", // other valid values: "stretch"
         initFullscreen: false,
         orientation: "landscape", // true(default)/false iOS only
         successCallback: function() {
           console.log("Player closed without error.");
         },
         errorCallback: function(errMsg) {
           console.log("Error! " + errMsg);
         }
       };
       window.plugins.streamingMedia.playAudio(audioUrlFormula, options);

     }

     $scope.stopAudio = function(){

       window.plugins.streamingMedia.stopAudio();
     }

     $scope.pauseAudio = function(){
       window.plugins.streamingMedia.pauseAudio();

     }


		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
