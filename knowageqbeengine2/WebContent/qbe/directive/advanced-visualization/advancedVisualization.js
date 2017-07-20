/**
 * Knowage, Open Source Business Intelligence suite
 * Copyright (C) 2016 Engineering Ingegneria Informatica S.p.A.
 * 
 * Knowage is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Knowage is distributed in the hope that it will be useful, 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function() {
	var scripts = document.getElementsByTagName("script");
	var currentScriptPath = scripts[scripts.length - 1].src;
	currentScriptPath = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1);

angular.module('qbe_advanced_visualization', ['ngMaterial'])
.directive('qbeAdvancedVisualization', function() {
	return {
		templateUrl:  currentScriptPath +'advanced-visualization.html',
		controller:advancedVisualizationControllerFunction,
		priority: 10,
		scope: {
			ngModel:"="
		},
		link: function (scope, elem, attrs) { 

		}
	}
});

function advancedVisualizationControllerFunction($scope,sbiModule_translate, sbiModule_config, $mdDialog){
	
	$scope.openMenu = function($mdOpenMenu, ev) {
		originatorEv = ev;
		$mdOpenMenu(ev);
	};
	
	$scope.linkFunction = function (booleanConnector,id) {
		for ( var index in $scope.ngModel.childNodes) {
			if($scope.ngModel.childNodes[index].id==id){
				$scope.ngModel.childNodes[index].booleanConnector = booleanConnector;
			}
		}
	}
		
	$scope.sbiModule_config = sbiModule_config;
	$scope.translate = sbiModule_translate;
	
	$scope.clickDocument=function(item){		
		 $scope.selectDocumentAction({doc: item});
	}
	
	$scope.removeFilter = function () {
		for ( var index in $scope.ngModel.childNodes) {
			if($scope.ngModel.childNodes[index].selected==true){
				$scope.ngModel.childNodes.splice(index,1);
			}
		}
	}
	
	$scope.groupFilters = function () {
		for ( var index in $scope.ngModel.childNodes) {
			if($scope.ngModel.childNodes[index].selected==true){
				$scope.ngModel.childNodes[index].backgroundColor="#D3D3D3";
			}
		}
	}
}
})();