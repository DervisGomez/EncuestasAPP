app.controller('NewsCtrl', function($scope, $state) {
	setTimeout(function() {
            ionic.material.motion.fadeSlideInRight();
        }, 500);

				$scope.actividadesyucatan = function(){

					$state.go('app.actividadesyucatan', null, {reload:true})
				}

    // Active INK Effect
    ionic.material.ink.displayEffect();


})
