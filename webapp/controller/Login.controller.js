sap.ui.define([
	"Application/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, MessageToast) {
	"use strict";

	return BaseController.extend("Application.controller.Login", {
		onInit: function(){
		},
	
			onLoginTap: function(oEvent){
			// var value = oEvent.getSource();
			var UserName = this.byId("uname").getValue();
            var Password = this.byId("pasw").getValue();
			
			var oModel = new sap.ui.model.json.JSONModel();
			var credName;
			var credPasw;
			$.ajax({
			url: "/application/services/employees.xsodata/cred?$format=json",
			dataType: 'json',
			async: false,
			success: function(response){
				var data = response;
				var resultName = data.d.results.map(function(a) {return a.NAME || '';});
				var resultPasw = data.d.results.map(function(a) {return a.PASSWORD || '';});
				credName = resultName;
				credPasw = resultPasw;
				oModel.setData(data);
			}
			});
			if (UserName == "") {
                 MessageToast.show("Please Enter UserName");
                 return false;
             } else if (Password == "") {
                 MessageToast.show("Please Enter Password");
                 return false;
             } else{
             	var name = credName.includes(UserName);
             	var pass = credPasw.includes(Password);
             	
             	if(name === true && pass === true ){
             		MessageToast.show("Welcome :)");
             		this.getRouter().navTo("home", null, true);
             	}
             	else{
             		MessageToast.show("You are not an authorized Person! Who are you?");
             	}
             }
             	
              
		}
	});
});