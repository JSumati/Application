sap.ui.define([
	"Application/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("Application.controller.Resume", {
		onInit: function(){
		},
		
	//Resume of Particular Employee
		onFlipResume: function(oEvent){
			var oCtx = this.getView().getElementBinding().getBoundContext();

			this.getRouter().navTo("employeeResume", {
				employeeId : oCtx.getProperty("EmployeeID")
			});
		}
	});
});
		