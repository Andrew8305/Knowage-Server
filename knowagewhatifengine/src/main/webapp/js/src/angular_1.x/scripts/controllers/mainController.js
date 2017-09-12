/*
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

var olapMod = angular.module('olap.controllers', [ 'olap.configuration',
		'olap.directives', 'olap.settings' ])
		
olapMod.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('knowage')
    $mdThemingProvider.setDefaultTheme('knowage');
 }]);

olapMod.controller("olapController", [ "$scope", "$timeout", "$window",
		"$mdDialog", "$http", '$sce', '$mdToast', '$mdSidenav', 'sbiModule_config',
		'sbiModule_messaging', 'sbiModule_restServices', 'sbiModule_translate','sbiModule_docInfo',
		'olapSharedSettings' ,olapFunction ]);

function olapFunction($scope, $timeout, $window, $mdDialog, $http, $sce,
		$mdToast, $mdSidenav, sbiModule_config, sbiModule_messaging, sbiModule_restServices,
		sbiModule_translate,sbiModule_docInfo, olapSharedSettings) {

	//VARIABLES
	var firstLoad = true;
	$scope.translate = sbiModule_translate;
	//selected members
	$scope.members = [];
	$scope.selectedMember = {};

	//templateRoot = "/knowagewhatifengine/html/template";
	templateRoot = sbiModule_config.contextName + "/html/template";
	$scope.sendMdxDial = "/main/toolbar/sendMdx.html";
	$scope.saveSubObjectDial = "/main/savesubobject/saving_subobject_dialog.html";
	$scope.showMdxDial = "/main/toolbar/showMdx.html";
	$scope.sortSetDial = "/main/toolbar/sortingSettings.html";
	$scope.filterDial = "/main/filter/filterDialog.html";
	$scope.saveAsNew = "/main/toolbar/saveAsNew.html";
	$scope.deleteVersionDialog = "/main/toolbar/deleteVersion.html";
	$scope.allocationAlgDialog = "/main/toolbar/allocationAlg.html";

	$scope.filterDialogWidth = olapSharedSettings.getSettings().filterDialogWidth;
	$scope.filterDialogHeight = olapSharedSettings.getSettings().filterDialogHeight;
	$scope.allowEditingCC = olapSharedSettings.getSettings().disableManualEditingCC;
	$scope.showWarningDT = olapSharedSettings.getSettings().showDTWarning;
		
	$scope.minNumOfLetters = olapSharedSettings.getSettings().minSearchLength;
	$scope.searchText = "";
	$scope.searchSucessText="";
	$scope.showSearchInput = false;

	$scope.rows;
	$scope.maxRows = 3;
	$scope.topSliderNeeded;
	$scope.topStart = 0;
	$scope.tableSubsets ={};
	$scope.columns;
	$scope.maxCols = 5;
	$scope.leftSliderNeeded;
	$scope.leftStart = 0;

	$scope.olapToolbarButtons = [];
	$scope.whatifToolbarButtons = [];
	$scope.tableToolbarButtons = [];

	$scope.filterCardList = [];
	$scope.filterSelected = [];
	$scope.usedOrdinal = "";
	$scope.dtData = [];
	$scope.dtTree = [];
	$scope.dtMaxRows = 0;
	$scope.dtAssociatedLevels = [];
	$scope.formulasData = [];
	$scope.valuesArray = [];
	$scope.selectedMDXFunction = {};
	$scope.selectedMDXFunctionName = "";
	$scope.selectedTab = 0;
	$scope.olapDocName = sbiModule_docInfo.label;
	$scope.selectedCrossNavigationDocument = null;
	$scope.cookieArray = [];
	$scope.propertiesArray = [];

	$scope.finalFormula = null;
	$scope.isFilterSelected = false;
	$scope.filterAxisPosition;
	$scope.showMdxVar = "";

	$scope.draggedFrom = "";
	$scope.dragIndex;
	
	$scope.doneonce = false;
	$scope.level;
	$scope.data = [];
	$scope.loadedData = [];
	$scope.dataPointers = [];
	$scope.numVisibleFilters = 5;
	$scope.shiftNeeded;

	$scope.modelConfig;
	$scope.filterDialogToolbarName;
	// flag for showing olap designer specific stuff
	$scope.olapMode = false;

	$scope.showSiblings = true;
	$scope.sortingSetting;
	$scope.ready = true;
	$scope.sortingEnabled = false;
	$scope.crossNavigationEnabled = false;
	$scope.sortingModes = [ {
		'label' : 'basic',
		'value' : 'basic'
	}, {
		'label' : 'breaking',
		'value' : 'breaking'
	}, {
		'label' : 'count',
		'value' : 'count'
	} ];
	$scope.selectedSortingMode = 'basic';
	$scope.sortingCount = 10;
	$scope.saveSortingSettings = function() {
		if($scope.sortingCount<1||!$scope.sortingCount){
			sbiModule_messaging.showErrorMessage(sbiModule_translate.load('sbi.olap.sortingSetting.count.error'), 'Error');
			
		}else{
			$mdDialog.hide();
			$scope.sortDisable();
		}
		
	}
	$scope.loadingNodes = false;
	$scope.activeaxis;

	$scope.member;
	$scope.selecetedMultiHierUN;
	$scope.selectedVersion = null;
	
	$scope.buffer = null;
	$scope.max =0;

	$scope.handleResponse = function(response) {
		$scope.buffer = {};
		
		$scope.tableSubsets=response.data.tables;
		for(var x in $scope.tableSubsets){
			$scope.buffer[x]=$scope.tableSubsets[x];
			var intx = parseInt(x);
			if(intx>$scope.max){
				$scope.max = intx;
			}
		}
		
		
		$scope.tableSubsets=null;
		source = response.data;
		$scope.modelConfig = source.modelConfig;
		$scope.table = $sce.trustAsHtml(source.table);
		$scope.tableSubsets=source.tables;
		
		$scope.columns = source.columns;
		$scope.rows = source.rows;
		$scope.columnsAxisOrdinal = source.columnsAxisOrdinal;
		$scope.filterCardList = source.filters;
		$scope.hasPendingTransformations = source.hasPendingTransformations;

		$scope.rowsAxisOrdinal = source.rowsAxisOrdinal;
		$scope.showMdxVar = source.mdxFormatted;
		$scope.formulasData = source.formulas;
		$scope.ready = false;
		
		$scope.selectedVersion = source.modelConfig.actualVersion;
		handleSlicers(source.filters);
		$scope.wiGridNeeded = response.data.modelConfig.whatIfScenario; //arsenije
		if(firstLoad && $scope.modelConfig != undefined){
			if(mode == 'full'){
				$scope.executeClicks();
				$scope.ready = true;
			}
			
			firstLoad = false;
		}
		source = null;
		$scope.ready = true;
	}
	
	handleSlicers = function(filters){
		$scope.filterSelected = [];
		for(var i=0; i<filters.length;i++){
			var hier = filters[i].hierarchies;
			var selPos = filters[i].selectedHierarchyPosition;
			var posInAx = filters[i].positionInAxis;
			var obj ={
					caption:"...",
					uniqueName:"",
					visible:false
					};
			if(hier[selPos].slicers.length > 0){
				obj.caption = hier[selPos].slicers[0].name;
				obj.uniqueName = hier[selPos].slicers[0].uniqueName;
				obj.visible = true;
				
				$scope.filterSelected[posInAx] = obj
			}
			else{
				$scope.filterSelected[posInAx] = obj;
			}
				
		}
	}
	
	$scope.sendModelConfig = function(modelConfig,noloading) {
		console.log("Sending model config" + " "+ modelConfig);
		if($scope.tableSubsets){
			$scope.tableSubsets.length = 0;
		}
		
		var sentStartRow = $scope.modelConfig.startRow;
		if ($scope.ready) {
			$scope.ready = false;
			sbiModule_restServices.promisePost("1.0/modelconfig?SBI_EXECUTION_ID=" + JSsbiExecutionID+"&NOLOADING="+noloading, "",
					modelConfig).then(
					
					function(response) {
						
						$scope.table = $sce.trustAsHtml(response.data.table);
						
						if(!$scope.buffer){
							$scope.buffer ={};
						}
						
						$scope.tableSubsets=response.data.tables;
						for(var x in $scope.tableSubsets){
							$scope.buffer[x]=$scope.tableSubsets[x];
							var intx = parseInt(x);
							if(intx>$scope.max){
								$scope.max = intx;
							}
						}
						
						$scope.modelConfig = response.data.modelConfig;
						
						
						$scope.ready = true;
						$scope.isScrolling = false;
						
					},
					function(response) {
						sbiModule_messaging.showErrorMessage(sbiModule_translate.load('sbi.olap.modelConfig.error'), 'Error');		
						$scope.ready = true;
					});

		}
			
	}

	$scope.startFrom = function(start) {
		if ($scope.ready) {
			$scope.ready = false;

			sbiModule_restServices.promiseGet(
					"1.0",
					'/member/start/1/' + start + '?SBI_EXECUTION_ID='
							+ JSsbiExecutionID).then(function(response) {
			
				angular.copy($sce.trustAsHtml(response.data.table),scope.table);
				$scope.ready = true;
				$scope.handleResponse(response);
			}, function(response) {
				sbiModule_messaging.showErrorMessage(sbiModule_translate.load('sbi.generic.error'), 'Error');

			});
		}
	}

	/**
	 *Function for opening dialogs
	 **/
	$scope.showDialog = function(ev, path) {
		$mdDialog.show({
			scope : $scope,
			preserveScope : true,
			controllerAs : 'olapCtrl',
			templateUrl : templateRoot + path,
			targetEvent : ev,
			clickOutsideToClose : false
		});
	};

	$scope.closeDialog = function(e) {
		$mdDialog.hide();
	};

	$scope.getVersions = function() {
		sbiModule_restServices.promiseGet("1.0",
				'/version/?SBI_EXECUTION_ID=' + JSsbiExecutionID).then(
				function(response) {
					console.log(response);
					$scope.outputVersions = response.data;
				},
				function(response) {
					sbiModule_messaging.showErrorMessage(sbiModule_translate.load('sbi.generic.error'), 'Error');
				});
	};
	
}