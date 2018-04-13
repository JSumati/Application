sap.ui.define([
	"Application/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("Application.controller.Description", {
		onInit: function(){
			
		},
		onFilterEmployees: function(oEvent){
			//build filter array
			var aFilter=[];
			var sQuery = oEvent.getParameter("query");
			if(sQuery){
				aFilter.push(new Filter("NAME", FilterOperator.Contains, sQuery));
			}
			
			//filter binding
			var oTable = this.byId("table");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilter);
			
		}
		
	});
});