sap.ui.define([
	"Application/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/Dialog"
	
], function(BaseController, JSONModel, MessageToast, Dialog) {
	"use strict";

	return BaseController.extend("Application.controller.Login", {
		onInit: function(){
		},
		
//Log in Authentication using logic from xsjs
			onLoginTap: function(oEvent){
			// var value = oEvent.getSource();
			var UserName = this.byId("uname").getValue();
			var Password = this.byId("pasw").getValue();
			if (UserName == "") {
                 MessageToast.show("Please Enter UserName");
                 return false;
             } else if (Password == "") {
                 MessageToast.show("Please Enter Password");
                 return false;
             } else {
	             	var query = {};
					query.Name = UserName;
					query.Password = Password;
					var string = JSON.stringify(query);
					$.ajax({
		            	url: "/application/services/authenticate.xsjs",
		            	type: "POST",
		            	data: {JSON_DATA: string},
		            	success: function(data){
		            			MessageToast.show(data);
		            			document.location = "index.html#/home";
		            	},
		            	// will be called in case of any errors:
		            	error : function(e) {
		        				MessageToast.show("You are not an authorized Person! Who are you?");
		    			}
		            });
             }
			},
			
			
			
			
//Sign Up using logic from xsjs and data from Form
		onSignUpTap: function(oEvent){
			var oView = this.getView();
			var oDialog = oView.byId("helloDialog");
			// create dialog lazily
			if (!oDialog) {
				var oFragmentController = {
						onSignUp : function(oEve){
							var sTexts = this.getParameter();
							// var sText = sap.ui.getCore().byId("username").getValue();
							alert('Note is: ' + sTexts);
							// alert("Clicked");
							oDialog.close();
						}
				};
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "Application.Dialogs.SignUp",oFragmentController);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		
		
		
//Update Password
		onUpdateTap: function(oEvent){
			var oView = this.getView();
			var oDialog = oView.byId("helloDialogUpdate");
			// create dialog lazily
			if (!oDialog) {
				var oFragmentController = {
						onUpdate : function(oEve){
							var sTexts = oEve.getParameter('value');
							// var sText = sap.ui.getCore().byId("username").getValue();
							alert('Note is: ' + sTexts);
							// alert("Clicked");
							oDialog.close();
						}
				};
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "Application.Dialogs.UpdatePass",oFragmentController);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(oDialog);
			}
			oDialog.open();
			
		}

			
		
			
	});
});






//Authentication Using xsodata

//var oModel = new sap.ui.model.json.JSONModel();
// var credName;
// var credPasw;
// $.ajax({
// url: "/application/services/employees.xsodata/cred?$format=json",
// dataType: 'json',
// async: false,
// success: function(response){
// 	var data = response;
// 	var resultName = data.d.results.map(function(a) {return a.NAME || '';});
// 	var resultPasw = data.d.results.map(function(a) {return a.PASSWORD || '';});
// 	credName = resultName;
// 	credPasw = resultPasw;
// 	oModel.setData(data);
// }
// });
// if (UserName == "") {
//              MessageToast.show("Please Enter UserName");
//              return false;
//          } else if (Password == "") {
//              MessageToast.show("Please Enter Password");
//              return false;
//          } else{
//          	var name = credName.includes(UserName);
//          	var pass = credPasw.includes(Password);
         	
//          	if(name === true && pass === true ){
//          		MessageToast.show("Welcome :)");
//          		this.getRouter().navTo("home", null, true);
//          	}
//          	else{
//          		MessageToast.show("You are not an authorized Person! Who are you?");
//          	}
//          }