var app = angular.module("UsersManagementModule",["ngMaterial","angular_list","angular_table","sbiModule","angular_2_col"]);
app.controller("UsersManagementController",["sbiModule_translate","sbiModule_restServices", "$scope","$mdDialog","$mdToast","$timeout",UsersManagementFunction]);
function UsersManagementFunction(sbiModule_translate, sbiModule_restServices, $scope, $mdDialog, $mdToast,$timeout){
	
	//VARIABLES
	
	$scope.showme = false; // flag for showing right side 
	$scope.tempPwd = "";
	$scope.dirtyForm = false; // flag to check for modification
	$scope.showUpdate=false;
	$scope.translate = sbiModule_translate;
	$scope.selectedUser = {}; // main item
	$scope.usersList = []; // array that hold list of users
	$scope.usersRoles = []; // array that hold list of roles
	$scope.usersAttributes = [];
	
	$scope.showActionOK = function(msg) {
		  var toast = $mdToast.simple() 
		  .content(msg)
		  .action('OK')
		  .highlightAction(false)
		  .hideDelay(3000)
		  .position('top')

		  $mdToast.show(toast).then(function(response) {

		   if ( response == 'ok' ) {


		   }
		  });
		 };
		 
		 $scope.umSpeedMenu= [
		                         {
		                            label:sbiModule_translate.load("sbi.generic.delete"),
		                            icon:'fa fa-trash-o fa-lg',
		                            color:'#153E7E',
		                            action:function(item,event){
		                                
		                            	$scope.deleteUser(item);
		                            }
		                         }
		                        ];
		 
		 
		 $scope.confirm = $mdDialog
		    .confirm()
		    .title(sbiModule_translate.load("sbi.catalogues.generic.modify"))
		    .content(
		            sbiModule_translate
		            .load("sbi.catalogues.generic.modify.msg"))
		            .ariaLabel('toast').ok(
		                    sbiModule_translate.load("sbi.general.continue")).cancel(
		                            sbiModule_translate.load("sbi.general.cancel"));
 
		 
		 
		
	 
	//FUNCTIONS	
		 
	angular.element(document).ready(function () { // on page load function
		$scope.getUsers();
		$scope.getRoles();
		$scope.getAttributes();
		    });
	
	$scope.setDirty=function(){ 
		  $scope.dirtyForm=true;
	}
	
	
	
	$scope.loadUser=function(item){  // this function is called when item from custom table is clicked
		
		 if($scope.dirtyForm){
			   $mdDialog.show($scope.confirm).then(function(){
				$scope.dirtyForm=false;   
				$scope.selectedUser=angular.copy(item);
				$scope.showme=true;
				$scope.showUpdate=true;
				$scope.letUpdate= true;
      
			   },function(){
			    
				$scope.showme = true;
				$scope.showUpdate=true;
				$scope.letUpdate= true;
				
			   });
			   
			  }else{
			 
			  $scope.selectedUser=angular.copy(item);
			  $scope.showme=true;
			  $scope.showUpdate=true;
			  $scope.letUpdate= true;
			  }
	} 	                
	
	$scope.cancel = function() { // on cancel button
		$scope.selectedUser={};
		$scope.showme = false;
		$scope.dirtyForm=false;
		$scope.showUpdate=false;
		$scope.letUpdate= true;
	}
	
	$scope.updatePass = function() { // on update password button
		
		$scope.letUpdate= false;
	}

	$scope.createUser=function(){ // this function is called when clicking on plus button
		 if($scope.dirtyForm){
			   $mdDialog.show($scope.confirm).then(function(){
				$scope.dirtyForm=false;   
				$scope.selectedUser={};
				$scope.showme=true;
				$scope.showUpdate=false;
			           
			   },function(){
			    
				$scope.showme = true;
				$scope.showUpdate=false;
			   });
			   
			  }else{
			 
			$scope.selectedUser={};
			  $scope.showme=true;
			  $scope.showUpdate=false;
			  }
	}
	
	$scope.saveUser= function(){  // this function is called when clicking on save button
		
		if($scope.selectedUser.hasOwnProperty("checkId")){ // if item already exists do update PUT
			
			sbiModule_restServices
		    .put("2.0/customChecks",$scope.selectedUser.checkId,$scope.selectedUser).success(
					function(data, status, headers, config) {
						console.log(data);
						if (data.hasOwnProperty("errors")) {
							console.log(sbiModule_translate.load("sbi.glossary.load.error"));
						} else {
							$scope.usersList=[];
							$timeout(function(){								
								$scope.getCustom();
							}, 1000);
							$scope.showActionOK(sbiModule_translate.load("sbi.catalogues.toast.updated"));
							$scope.selectedUser={};
							$scope.showme=false;
							$scope.dirtyForm=false;	
						}
					}).error(function(data, status, headers, config) {
						console.log(sbiModule_translate.load("sbi.glossary.load.error"));

					})	
			
		}else{ // create new item in database POST
			console.log($scope.selectedUser);
			sbiModule_restServices
		    .post("2.0/customChecks","",angular.toJson($scope.selectedUser)).success(
					function(data, status, headers, config) {
						console.log(data);
						if (data.hasOwnProperty("errors")) {
							console.log(sbiModule_translate.load("sbi.glossary.load.error"));
						} else {
							$scope.usersList=[];
							$timeout(function(){								
								$scope.getUsers();
							}, 1000);
							$scope.showActionOK(sbiModule_translate.load("sbi.catalogues.toast.created"));
							$scope.selectedUser={};
							$scope.showme=false;
							$scope.dirtyForm=false;
						}
					}).error(function(data, status, headers, config) {
						console.log(sbiModule_translate.load("sbi.glossary.load.error"));

					})	
			
			
		}
		
	}

	$scope.getUsers = function(){ // service that gets list of users GET
		sbiModule_restServices.get("2.0", "users").success(
				function(data, status, headers, config) {
					console.log(data);
					if (data.hasOwnProperty("errors")) {
						console.log(sbiModule_translate.load("sbi.glossary.load.error"));
					} else {
						$scope.usersList = data;
					}
				}).error(function(data, status, headers, config) {
					console.log(sbiModule_translate.load("sbi.glossary.load.error"));

				})	
	}
	$scope.getRoles = function(){ // service that gets list of roles GET
		sbiModule_restServices.get("2.0", "users/roles").success(
				function(data, status, headers, config) {
					console.log(data);
					if (data.hasOwnProperty("errors")) {
						console.log(sbiModule_translate.load("sbi.glossary.load.error"));
					} else {
						$scope.usersRoles = data;
					}
				}).error(function(data, status, headers, config) {
					console.log(sbiModule_translate.load("sbi.glossary.load.error"));

				})	
	}
	$scope.getAttributes = function(){ // service that gets list of roles GET
		sbiModule_restServices.get("2.0", "users/attributes").success(
				function(data, status, headers, config) {
					console.log(data);
					if (data.hasOwnProperty("errors")) {
						console.log(sbiModule_translate.load("sbi.glossary.load.error"));
					} else {
						$scope.usersAttributes = data;
					}
				}).error(function(data, status, headers, config) {
					console.log(sbiModule_translate.load("sbi.glossary.load.error"));

				})	
	}
	$scope.deleteUser = function(item){ // this function is called when clicking on delete button
		sbiModule_restServices.delete("2.0/users",item.id).success(
				function(data, status, headers, config) {
					console.log(data);
					if (data.hasOwnProperty("errors")) {
						console.log(sbiModule_translate.load("sbi.glossary.load.error"));
					} else {
						$scope.usersList=[];
						$timeout(function(){								
							$scope.getUsers();
						}, 1000);
						$scope.showActionOK(sbiModule_translate.load("sbi.catalogues.toast.deleted"));
						$scope.selectedUser={};
						$scope.showme=false;
						$scope.dirtyForm=false;
					}
				}).error(function(data, status, headers, config) {
					console.log(sbiModule_translate.load("sbi.glossary.load.error"));

				})	
	}
};
