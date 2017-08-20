$('#dashboard-nav').responsiveTabs({
  setHash: true,
  startCollapsed: 'accordion',
  activate: function(event, tab) {
    tab.anchor.addClass('active');
  },
  deactivate: function(event, tab) {
    tab.anchor.removeClass('active');
  }
});
