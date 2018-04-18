sap.ui.define([
	"Application/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function(BaseController, Filter, FilterOperator, MessageToast) {
	"use strict";

	return BaseController.extend("Application.controller.EmployeeList", {
		onInit: function(){
			
		},
		//Add Employee to list
		addEmp: function(oEvent){
			this.getRouter().navTo("insertEmp",null,true);
		},
		onAdd: function(oEvent){
			var insertEntry = {};
			var valuesfName = this.byId("addusername").getValue();
			var valueslName = this.byId("adduserlastname").getValue();
			var valuesAddress = this.byId("addaddress").getValue();
			var valuesRegion = this.byId("addregion").getValue();
			var valuescityName = this.byId("addcity").getValue();
			var valuespostalV = this.byId("addpostal").getValue();
			var valuescountryName = this.byId("addcountry").getValue();
			var valuesphoneV = this.byId("addphone").getValue();
			insertEntry.firstName = valuesfName;
			insertEntry.lastName = valueslName;
			insertEntry.Address = valuesAddress;
			insertEntry.City = valuescityName;
			insertEntry.Region = valuesRegion;
			insertEntry.Postal = valuespostalV;
			insertEntry.Country = valuescountryName;
			insertEntry.Phone = valuesphoneV;
			var string = JSON.stringify(insertEntry);
					$.ajax({
		            	url: "/application/services/addEmp.xsjs",
		            	type: "POST",
		            	data: {JSON_DATA: string},
		            	complete: function(data){
		            			MessageToast.show("Employee Added");
		            			document.location = "index.html#/employeelist";
		            	},context: this,
		            	// will be called in case of any errors:
		            	error : function(e) {
		        				MessageToast.show("Error adding Employee to the list" + " " + e);
		    			}
		            });
		},
		
		
		//Remove Employee
		remEmp: function(){
			 this._Dialog = sap.ui.xmlfragment("myId1","Application.Dialogs.RemEmpFromList",this);
			 this._Dialog.open();
		},
		onRem: function(oEvent){
			var values = sap.ui.core.Fragment.byId("myId1","remusername").getValue();
			var insertEntry = {};
			insertEntry.Id = values;
				var string = JSON.stringify(insertEntry);
					$.ajax({
		            	url: "/application/services/delEmp.xsjs",
		            	type: "POST",
		            	data: {JSON_DATA: string},
		            	success: function(data){
		            			MessageToast.show("Employee Removed");
		            			document.location = "index.html#/employeelist";
		            	},
		            	// will be called in case of any errors:
		            	error : function(e) {
		        				MessageToast.show("Error Removing Employee from the list" + " " + e);
		    			}
		            });
			
			this._Dialog.close();
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