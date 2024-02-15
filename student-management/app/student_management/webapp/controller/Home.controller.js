sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, BusyIndicator, MessageBox) {
        "use strict";

        return Controller.extend("capm.studentmanagement.controller.Home", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteHome").attachPatternMatched(this._onObjectMatched, this);
            },

            _onObjectMatched: function (oEvent) {

                this.fnGetStudentList();
            },

            fnGetStudentList() {

                BusyIndicator.show();
                var that = this;
                var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

                $.ajax({
                    url: "/StudentService/StudentList",
                    method: "GET",
                    contentType: "application/json",
                    dataType: "json",
                    success: function (oSucess) {
                        var oJsonStudentListModel = that.getView().getModel("jsonStudentListModel");
                        oJsonStudentListModel.setData(oSucess.value);
                        BusyIndicator.hide();
                    },
                    error: function (oError) {
                        BusyIndicator.hide();
                        MessageBox.error(
                            "Please contact administrator", {
                            styleClass: bCompact ? "sapUiSizeCompact" : ""
                        }
                        );
                        return;
                    }
                });
            },

            onPressCreate: function () {

                if (!this.createStudentDialog) {
                    this.createStudentDialog = sap.ui.xmlfragment(
                        "capm.studentmanagement.view.fragments.CreateStudentDialog", this);
                    this.getView().addDependent(this.createStudentDialog);
                }
                this.createStudentDialog.open();
            },

            onPressLineItem: function (oEvent) {
                var oClicked = this.getView().getModel("jsonStudentListModel").getProperty(oEvent.getSource().getBindingContextPath());
                var Id = oClicked.id;
                console.log(Id);


                if (!this.basicInfoDialog) {
                    this.basicInfoDialog = sap.ui.xmlfragment(
                        "capm.studentmanagement.view.fragments.BasicInfoDialog", this);
                    this.getView().addDependent(this.basicInfoDialog);
                }

                BusyIndicator.show();
                var that = this;
                var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

                $.ajax({
                    url: "/StudentService/StudentList/" + Id,
                    method: "GET",
                    contentType: "application/json",
                    dataType: "json",
                    success: function (oSucess) {
                        var oJsonStudentInfoModel = that.getView().getModel("jsonStudentInfoModel");
                        oJsonStudentInfoModel.setData(oSucess);
                        BusyIndicator.hide();

                        that.basicInfoDialog.open();
                    },
                    error: function (oError) {
                        BusyIndicator.hide();
                        MessageBox.error(
                            "Please contact administrator", {
                            styleClass: bCompact ? "sapUiSizeCompact" : ""
                        }
                        );
                        return;
                    }
                });
            },
            onPressCancel: function () {
                this.basicInfoDialog.close();
            },

            onPressCancelCreate: function () {

                sap.ui.getCore().byId("idStudentId").setValue("");
                sap.ui.getCore().byId("idStudentName").setValue("");
                sap.ui.getCore().byId("idStudentAge").setValue("");
                sap.ui.getCore().byId("idStudentAdd").setValue("");

                this.createStudentDialog.close();
            },

            onPressCreateStudent: function () {

                var id = sap.ui.getCore().byId("idStudentId").getValue();
                sap.ui.getCore().byId("idStudentId").setValue("");

                var name = sap.ui.getCore().byId("idStudentName").getValue();
                sap.ui.getCore().byId("idStudentName").setValue("");

                var age = sap.ui.getCore().byId("idStudentAge").getValue();
                sap.ui.getCore().byId("idStudentAge").setValue("");

                var address = sap.ui.getCore().byId("idStudentAdd").getValue();
                sap.ui.getCore().byId("idStudentAdd").setValue("");

                debugger

                this.createStudentDialog.close();

                var oPayloadCreate =  {
                    id : id,
                    name : name,
                    age : age,
                    address : address
                };

                var that = this;
                var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

                BusyIndicator.show();
                debugger;
                $.ajax({
                    url: "/StudentService/StudentList",
                    method: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(oPayloadCreate),
                    success: function (oSucess) {
                        BusyIndicator.hide();
                        debugger;
                        MessageBox.success(
                            "Created Successfully", {
                            styleClass: bCompact ? "sapUiSizeCompact" : ""
                        }
                        );
                    },
                    error: function (oError) {
                        BusyIndicator.hide();
                        MessageBox.error(
                            "Please contact administrator", {
                            styleClass: bCompact ? "sapUiSizeCompact" : ""
                        }
                        );
                        return;
                    }
                });

            }
        });
    });
