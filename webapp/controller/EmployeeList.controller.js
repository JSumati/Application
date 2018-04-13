sap.ui.define([
	"Application/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("Application.controller.EmployeeList", {
		onInit: function(){
			
		},
			onListItemPressed: function(oEvent){
				var oItem = oEvent.getSource();
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var oCtx = oItem.getBindingContext("employeem").getPath().replace(/\D/g,'');
				oRouter.navTo("details", {
					employeeId: oCtx
				
			});
			},
			onFilterEmployees: function(oEvent){
			//build filter array
			var aFilter=[];
			var sQuery = oEvent.getParameter("query");
			if(sQuery){
				aFilter.push(new Filter("EMPLOYEENAME", FilterOperator.Contains, sQuery));
			}
			
			//filter binding
			var oTable = this.byId("list");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilter);
			
		}

	});
});