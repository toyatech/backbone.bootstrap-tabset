/**
 * Bootstrap Tabs wrapper for use with Backbone.
 *
 * Takes care of instantiation, manages multiple tables,
 * adds several options
 *
 * @author Dusty Little <dlittle@toyatech.net>
 *
 * Events:
 */
(function($, _, Backbone) {
  
  // set custom template settings
  var _interpolateBackup = _.templateSettings;
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /<%([\s\S]+?)%>/g
  };

  var template = _.template('\
    <ul class="nav nav-tabs">\
    </ul>\
    <div class="tab-content">\
    </div>\
  ');

  var tabTemplate = _.template('<li><a href="#{{id}}" data-toggle="tab">{{title}}</a></li>');
  var tabContentTemplate = _.template('<div class="tab-pane" id="{{id}}"></div>');

  // reset to users' template settings
  _.templateSettings = _interpolateBackup;

  var Tabset = Backbone.View.extend({
    
    initialize: function(options) {
      this.options = _.extend({
        template: template,
        tabTemplate: tabTemplate,
        tabContentTemplate: tabContentTemplate
      }, options);
    },

    /**
     * Creates the DOM element
     *
     * @api private
     */
    render: function() {
      var $el = this.$el,
        options = this.options,
        tabs = options.tabs;

      //create the tabset container
      $el.html(options.template(options));

      var $tabs = $el.find('.nav-tabs')
        , $tabsContent = $el.find('.tab-content');

      //recreate the tabs and tabsContent
      $tabs.empty();
      $tabsContent.empty();

      _.each(tabs, function(tab) {
        var $tab = $tabs.append(options.tabTemplate(tab));
        var $tabContentContainer = $tabsContent.append(options.tabContentTemplate(tab));
        var content = tab.content;
        if (content && content.$el) {
          content.render();
          $tabContentContainer.html(content.$el);
        } else {
          $tab.addClass('disabled');
        }
      });

      this.isRendered = true;

      return this;
    }
  });

  //EXPORTS
  //CommonJS
  if (typeof require == 'function' && typeof module !== 'undefined' && exports) {
    module.exports = Tabset;
  }

  //AMD /RequireJS
  if (typeof define === 'function' && define.amd) {
    return define(function() {
      Backbone.BootstrapTabset = Tabset;
    })
  }

  //Regular; add to Backbone.BootstrapTabset
  else {
    Backbone.BootstrapTabset = Tabset;
  }

})(jQuery, _, Backbone);
    
  
