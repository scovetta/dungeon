var App = Em.Application.create();

App.MyView = Em.View.extend({
  mouseDown: function() {
    window.alert("hello world!");
  }
});

App.MyView2 = Em.View.extend({
  mouseDown: function() {
    window.alert("goodbye world!");
  }
});
