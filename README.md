Backbone.BootstrapTabset
======================

- Takes care of instantiation and opening/closing tabs
- Manages multiple tab sets
- Adds several options

##Usage

    var tab1 = new Backbone.View({});
    var tab2 = new Backbone.View({});

    var tabset = new Backbone.BootstrapTabset({ 
      tabs: [ 
        { id: 'tab1' title: 'Tab1', content: tab1, active: true }, 
        { id: 'tab2' title: 'Tab2', content: tab2 } 
      ] 
    });

##Events

##Methods

###tabset.show(id)
Show a tab within a tabset
