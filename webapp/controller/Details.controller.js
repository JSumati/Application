sap.ui.define([
	"Application/controller/BaseController",
	"sap/m/MessageToast"
], function(BaseController, MessageToast) {
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
		_onBindingChange: function(oEvent){
			if(!this.getView().getBindingContext()){
				// this.getRouter().getTargets().display("notFound");
				this.getRouter.navTo("notFound");
			}
		},
		
		onUpDetail: function(oEvent){
			this._Dialog = sap.ui.xmlfragment("myIdd","Application.Dialogs.UpdateDetail",this);
			 this._Dialog.open();
		},
		onSubmit: function(oEvent){
			var values = sap.ui.core.Fragment.byId("myIdd","upaddress").getValue();
			var insertEntry = {};
			insertEntry.Id = values;
				var string = JSON.stringify(insertEntry);
					$.ajax({
		            	url: "/application/services/updateEmp.xsjs",
		            	type: "POST",
		            	data: {JSON_DATA: string},
		            	success: function(data){
		            			MessageToast.show("Details Updated");
		            			console.log(values);
		            			document.location = "index.html#/employeelist";
		            	},
		            	// will be called in case of any errors:
		            	error : function(e) {
		        				MessageToast.show("Error Removing Employee from the list" + " " + e);
		    			}
		            });
			
			this._Dialog.close();
		}
		
			
		
		

		
	});
});




















