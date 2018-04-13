sap.ui.define([
	"Application/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("Application.controller.Chart", {
		onInit: function(){
			var oVizFrame = this.byId("idcolumn");
			var oModel = new sap.ui.model.json.JSONModel();
			$.ajax({
			url: "/application/services/employees.xsodata/saldescription?$format=json",
			dataType: 'json',
			success: function(response){
				var data = response;
				oModel.setData(data);
			}
			});
		
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: 'Employee',
					value: "{NAME}"}],
				measures: [{
					name: 'Salary(Rs.)',
					value: "{SALARY}"},
					{
						name: 'Bonus(Rs.)',
						value: "{BONUS}"
					},
					{
						name: 'Total',
						value: "{Total_income}"
					}],
				data: {
					path: "/d/results"
				}
			});
			oVizFrame.setDataset(oDataset);
			oVizFrame.setModel(oModel);
			oVizFrame.setVizType('column');
			oVizFrame.setVizProperties({
				plotArea:{
					colorPalette: d3.scale.category20().range()
				},
				title: {
					visible: "true",
					text: "VizFrame Chart"
				}
			});
			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "valueAxis",
				'type': "Measure",
				'values': ["Salary(Rs.)", "Bonus(Rs.)", "Total"]
			}),
			feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "categoryAxis",
				'type': "Dimension",
				'values': ["Employee"]
			});
			oVizFrame.addFeed(feedValueAxis);
			oVizFrame.addFeed(feedCategoryAxis);
		}
	});
});