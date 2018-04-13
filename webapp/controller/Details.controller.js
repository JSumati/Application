sap.ui.define([
	"Application/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("Application.controller.Details", {
		onInit: function(){
			var oRouter = this.getRouter();
			oRouter.getRoute("details").attachMatched(this._oRouteMatched, this);                         
		},
	
	
		_oRouteMatched: function(oEvent){
			this.getView().bindElement({
						path: "/employeesdetails" + "(" + oEvent.getParameter("arguments").employeeId + ")",
						model: "employeem"
					});
		},
		
		//Not Found on wrong ID 
		// _onBindingChange: function(oEvent){
		// 	if(!this.getView().getBindingContext()){
		// 		// this.getRouter().getTargets().display("notFound");
		// 		this.getRouter.navTo("notFound");
		// 	}
		// }
		
		//Navigate to Resume
		onShowResume: function(oEvent){
			this.getRouter().navTo("resume",{
				employeeId : oEvent.getSource().getBindingContext("employeem").getPath().replace(/\D/g,'')
				
			});
		}
	});
});