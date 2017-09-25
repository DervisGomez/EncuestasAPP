// file info: controller.js
//

app.controller('FbFriendsCtrl', function($scope, $http, $ionicLoading) {
	var user = window.localStorage.getItem("ionium-fb");
	var next;
	$scope.more = false;

	if (user)
    	user = JSON.parse(user);

    $scope.loadFriends = function(){
    	$ionicLoading.show();
    	$http.get("https://graph.facebook.com/me/taggable_friends", {params: {access_token: user.access_token, format: "json" }}).then(function(result) {
	        $scope.friends = result.data.data;
    		next = result.data.paging.next;
	    	$scope.$broadcast('scroll.refreshComplete');
	    	$scope.more = true;
	    	$ionicLoading.hide();
	    }, function(error) {
	        alert("Error: " + error);
	    });
    };

	$scope.loadMoreFriends = function(){
    	$http.get(next).then(function(result) {
	   		$scope.friends = $scope.friends.concat(result.data.data);
	   		if(result.data.paging.next){
	   			$scope.more = true;
	   			next = result.data.paging.next;
	   		}else
	   			$scope.more = false;
	   		$scope.$broadcast('scroll.infiniteScrollComplete');
	   	});
    };

    $scope.loadFriends();
    // Active INK Effect
    ionic.material.ink.displayEffect();
})

app.controller('FbFeedsCtrl', function($scope, $http,AuthService, $ionicLoading, $cordovaOauth, $rootScope, $state,  $localStorage, $stateParams) {
	var user = window.localStorage.getItem("ionium-fb");
	var next;
	$scope.more = false;
	var data = {id:$stateParams.id};
	AuthService.verEmpresa(data).then(function(res) {
		// res holds your data
		$scope.data2 = res;
		

    	user = JSON.parse(user);
			//user =JSON.stringify(user);

    $scope.loadFeeds = function(){
    	$ionicLoading.show();
    	$http.get("https://graph.facebook.com/"+$scope.data2.facebook+"/feed", {params: {access_token: user.access_token, fields: "from,full_picture,message,created_time,icon,to,id,caption,link,picture,shares,likes.limit(1).summary(true),comments.limit(1).summary(true)", format: "json" }}).then(function(result) {
	        $scope.feeds = result.data.data;
    		next = result.data.paging.next;
	    	$scope.$broadcast('scroll.refreshComplete');
	    	$scope.more = true;
	    	$ionicLoading.hide();
	    }, function(error) {
	        alert("Error: " + error);
	    });
    };

	$scope.loadMoreFeeds = function(){
    	$http.get(next).then(function(result) {
	   		$scope.feeds = $scope.feeds.concat(result.data.data);
	   		if(result.data.paging.next){
	   			$scope.more = true;
	   			next = result.data.paging.next;
	   		}else
	   			$scope.more = false;
	   		$scope.$broadcast('scroll.infiniteScrollComplete');
	   	});
    };
		if(user != null){

$scope.loadFeeds();

		}else{
			$cordovaOauth.facebook(window.global.Facebook_APP_ID, ["email", "public_profile", "user_hometown", "user_posts", "user_friends", "user_about_me"]).then(function(result) {
					displayData(result.access_token);



			}, function(error) {
					alert("Error: " + error);
			});

		}
	});

		function displayData(access_token){
				$http.get("https://graph.facebook.com/v2.6/me", {params: {access_token: access_token, fields: "cover,email,name,about,gender,birthday,picture,taggable_friends,feed", format: "json" }}).then(function(result) {
						result.data.access_token = access_token;
						result.data.picture = 'https://graph.facebook.com/'+result.data.id+'/picture?type=large';
					window.localStorage.setItem("ionium-fb", JSON.stringify(result.data));
					$localStorage.currentUser = {
							mail: result.data.email,
							token: null,
							rol: "Admin"
					};

					//$state.go('app.verempresa',{id:emp});
					$state.go("app.fbfeeds", {}, {reload:true});
				}, function(error) {
						alert("Error: " + error);
				});
		}

})

app.controller('FbFeedsCtrl2', function($scope, $http, $ionicLoading, $cordovaOauth, $rootScope, $state,  $localStorage) {
	var user = window.localStorage.getItem("ionium-fb");
	var next;
	$scope.more = false;


    	user = JSON.parse(user);

    $scope.loadFeeds = function(){
    	$ionicLoading.show();
    	$http.get("https://graph.facebook.com/redconcretamerida/feed", {params: {access_token: user.access_token, fields: "from,full_picture,message,created_time,icon,to,id,caption,link,picture,shares,likes.limit(1).summary(true),comments.limit(1).summary(true)", format: "json" }}).then(function(result) {
	        $scope.feeds = result.data.data;
    		next = result.data.paging.next;
	    	$scope.$broadcast('scroll.refreshComplete');
	    	$scope.more = true;
	    	$ionicLoading.hide();
	    }, function(error) {
	        alert("Error: " + error);
	    });
    };

	$scope.loadMoreFeeds = function(){
    	$http.get(next).then(function(result) {
	   		$scope.feeds = $scope.feeds.concat(result.data.data);
	   		if(result.data.paging.next){
	   			$scope.more = true;
	   			next = result.data.paging.next;
	   		}else
	   			$scope.more = false;
	   		$scope.$broadcast('scroll.infiniteScrollComplete');
	   	});
    };
		if(window.localStorage.getItem("ionium-fb")!==null){
$scope.loadFeeds();

		}else{
			$cordovaOauth.facebook(window.global.Facebook_APP_ID, ["email", "public_profile", "user_hometown", "user_posts", "user_friends", "user_about_me"]).then(function(result) {
					displayData(result.access_token);



			}, function(error) {
					alert("Error: " + error);
			});

		}


		function displayData(access_token){
				$http.get("https://graph.facebook.com/v2.6/me", {params: {access_token: access_token, fields: "cover,email,name,about,gender,birthday,picture,taggable_friends,feed", format: "json" }}).then(function(result) {
						result.data.access_token = access_token;
						result.data.picture = 'https://graph.facebook.com/'+result.data.id+'/picture?type=large';
					window.localStorage.setItem("ionium-fb", JSON.stringify(result.data));
					$localStorage.currentUser = {
							mail: result.data.email,
							token: null,
							rol: "Admin"
					};

					$state.go("app.nuestrared", null, {reload:true});
				}, function(error) {
						alert("Error: " + error);
				});
		}

})

app.controller('FbLoginCtrl', function($scope, $http, $state, $ionicModal, $timeout, $cordovaOauth) {
	$scope.isFBlogin = false;

	var user = window.localStorage.getItem("ionium-fb");
	if (user)
		$scope.isFBlogin = true;

	$scope.FBlogin = function(){
		$cordovaOauth.facebook(window.global.Facebook_APP_ID, ["email", "public_profile", "user_hometown", "user_posts", "user_friends", "user_about_me"]).then(function(result) {
		    displayData(result.access_token);
		    $state.go("app.fbprofile", {}, {reload: true});

		}, function(error) {
		    console.log("Error papu");
		});
	};

	function displayData(access_token){
	    $http.get("https://graph.facebook.com/v2.6/me", {params: {access_token: access_token, fields: "cover,email,name,about,gender,birthday,picture,taggable_friends,feed", format: "json" }}).then(function(result) {
	        result.data.access_token = access_token;
	        result.data.picture = 'https://graph.facebook.com/'+result.data.id+'/picture?type=large';
		    window.localStorage.setItem("ionium-fb", JSON.stringify(result.data));
	    }, function(error) {
	        alert("Error: " + error);
	    });
	}
})

app.controller('FbProfileCtrl', function($scope, $http, $state, $cordovaDialogs) {
	var user = window.localStorage.getItem("ionium-fb");
    if (user)
    	$scope.me = JSON.parse(user);

    $scope.fbLogout = function(){
    	$cordovaDialogs.confirm('Do you want to logout Facebook?', 'Confirm to Logout', ['Yes','No'])
          .then(function(buttonIndex) {
            // no button = 0, 'OK' = 1, 'Cancel' = 2
            if(buttonIndex==1){
            	window.localStorage.removeItem("ionium-fb");
    			$state.go("app.fblogin");
            }else
              return false;
		});
    };
    // Active INK Effect
    ionic.material.ink.displayEffect();
})
