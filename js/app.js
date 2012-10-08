var App = Em.Application.create();

App.MyView = Em.View.extend({
  mouseDown: function() {
    bootbox.alert("Hello world!", function() {
                console.log("Alert Callback");
            });
  }
});

App.MyView2 = Em.View.extend({
  mouseDown: function() {
    GameCreation.init();
  }
});
