/*
 * jQuery tabSwitch
 *
 * Light weight tab switch
 *
 * Copyright (c) 2012, lancee LY
 *
 * http://xrhy.me/
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
!(function($) {

  "use strict"

  $.tabSwitch = function(options) {

    // Initialization
    var init = function() {
      options = $.extend({}, $.tabSwitch.defaults, options);
      var tabs = $(options.tabSelector),
          page = $(options.tabPageSelector);

      if (options.isIdMode) {
        page = page.each(function(i) {
          var id = $(page[i]).attr('id');
          page[id] = page[i];
        });
      }

      page.each(function(i) {
        $(this).data('tab-page', i);
        if (!$(page[i]).hasClass('cur')) {
          $(page[i]).addClass('invisible');
        }
      });
      tabs.each(function(i) {
        $(this).data('tab', i);
      });

      tabs.on('click', function(e) {
        tabs.removeClass('cur').parent().removeClass('cur');
        page.addClass('invisible').removeClass('cur');
        var k = options.isIdMode ? $(this).attr('href').replace('#','') : $(this).data('tab');
        $(this).addClass('cur').parent().addClass('cur');
        $(page[k]).removeClass('invisible').addClass('cur');
        (e.preventDefault)?e.preventDefault():e.returnValue = false;
        if (options.click)
          options.click.call(this, e, k, options);
      });

    };

    init();

  };

  $.tabSwitch.defaults = {
    tabSelector : 'ul.tabs li a',
    tabPageSelector : '.tab_page',
    isIdMode : false,
    click: ''
  };

  $.fn.tabSwitch = function(options, callback) {
    return this.each(function(i) {
      if( (typeof(options) ).match('object|undefined')) {
        new $.tabSwitch(options);
        if ( callback )
          callback.call(this, i);
      }
    });
  };

})(jQuery);