app.controller('RedCtrl', function($scope, $state) {
	setTimeout(function() {
            ionic.material.motion.blinds();
        }, 500);



    // Active INK Effect
    ionic.material.ink.displayEffect();
})
