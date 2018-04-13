sap.ui.define([
	"Application/controller/BaseController",
	"sap/ui/model/json/JSONModel"

], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("Application.controller.Home", {
		onInit: function(){
		var oModel = new sap.ui.model.json.JSONModel();
		var data = {
				"items":[ {
					"key": "key1",
					"text": "Take me to the List",
					"id": "myId1"
					},
					{
					"key": "key2",
					"text": "{i18n>iWantToNavigatetoDescription}",
					"id": "myId2"
					},
					{
					"key": "key3",
					"text": "{i18n>iWantToNavigatetoChart}",
					"id": "myId3"
					}
					]};
					oModel.setData(data);
					this.getView().setModel(oModel);
		},
		// onpress: function(oEvent){
			// var keys = this.getKey(oEvent);
		
			// var oInput = oEvent.getParameters();
			// var pressedId = oInput.valueOf(".selectedItem.mProperties.key");
			// var oInput = oEvent.getParameters();
			// var valab = oEvent.getKey();
			// console.log(valab);
			// if(oInput.valueOf("selectedItem.key")="secondKey2"){
			// this.getRouter().navTo("employeelist");
			// }
		// },
		
		showList: function(oEvent){
			this.getRouter().navTo("employeelist", null, true);
		},
		showDescription: function(oEvent){
			this.getRouter().navTo("description", null, true);
		},
		showChart: function(oEvent){
			this.getRouter().navTo("chart", null, true);
		}

	});
});