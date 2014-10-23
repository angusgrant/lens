
var _ = require('underscore');

var Application = require("substance-application");
var $$ = Application.$$;
var View = Application.View;

var PanelView = function( doc, config ) {
  View.call(this);

  this.doc = doc;
  this.name = config.name;

  this.toggleEl = $$('a.context-toggle.' + this.name,
    {
      'href': '#',
      'title': config.title,
      'html': '<i class="' + config.icon + '"></i><span> '+config.label+'</span><div class="label">'+config.label+'</div>'
    } );
  this.$toggleEl = $(this.toggleEl);

  this.$el.addClass('panel').addClass(this.name);

  // For legacy add 'resource-view' class
  if (config.type === 'resource') {
    this.$el.addClass('resource-view');
  }

  this._onToggle = _.bind( this.onToggle, this );

  this.$toggleEl.click( this._onToggle );

};

PanelView.Prototype = function() {

  this.dispose = function() {
    this.$toggleEl.off('click', this._onClick);
    this.$el.off('scroll', this._onScroll);
    this.stopListening();
  };

  this.onToggle = function() {
    this.trigger( 'toggle', this.name );
  };

  this.getToggleControl = function() {
    return this.toggleEl;
  };

  // Jump to the given resource id
  // --------
  //

  this.jumpToResource = function(nodeId) {
    var $n = this.$el.find('#'+nodeId);
    if ($n.length > 0) {
      var topOffset = $n.position().top;
      this.$el.scrollTop(topOffset);
      // TODO: is it possible to detect this case and just do it in mobile?
      // Brute force for mobile
      $(document).scrollTop(topOffset);
    } else {
      console.log("PanelView.jumpToResource(): Unknown resource '%s'", nodeId);
    }
  };

  this.hasOutline = function() {
    return false;
  };

  this.updateOutline = function() {
  };

  this.show = function() {
    this.$el.removeClass('hidden');
  };

  this.hide = function() {
    this.$el.addClass('hidden');
  };

  this.showToggle = function() {
    this.$toggleEl.removeClass('hidden');
  };

  this.hideToggle = function() {
    this.$toggleEl.addClass('hidden');
  };

  this.getDocument = function() {
    return this.doc;
  };

};

PanelView.Prototype.prototype = View.prototype;
PanelView.prototype = new PanelView.Prototype();
PanelView.prototype.constructor = PanelView;

module.exports = PanelView;