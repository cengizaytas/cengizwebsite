(function ($) {
  $.fn.panel = function (userConfig) {
    var $this = $(this),
      $body = $("body"),
      $window = $(window),
      id = $this.attr("id"),
      config;

    config = $.extend(
      {
        delay: 0,

        hideOnClick: false,

        hideOnEscape: false,

        hideOnSwipe: false,

        resetScroll: false,

        resetForms: false,

        side: null,

        target: $this,

        visibleClass: "visible",
      },
      userConfig
    );

    if (typeof config.target != "jQuery") {
      config.target = $(config.target);
    }

    $this._hide = function (event) {
      if (!config.target.hasClass(config.visibleClass)) return;

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      config.target.removeClass(config.visibleClass);

      window.setTimeout(function () {
        if (config.resetScroll) $this.scrollTop(0);

        if (config.resetForms)
          $this.find("form").each(function () {
            this.reset();
          });
      }, config.delay);
    };

    if (config.hideOnClick) {
      $this.find("a").css("-webkit-tap-highlight-color", "rgba(0,0,0,0)");

      $this.on("click", "a", function (event) {
        var $a = $(this),
          href = $a.attr("href"),
          target = $a.attr("target");

        if (!href || href == "#" || href == "" || href == "#" + id) return;

        event.preventDefault();
        event.stopPropagation();

        $this._hide();

        window.setTimeout(function () {
          if (target == "_blank") window.open(href);
          else window.location.href = href;
        }, config.delay + 10);
      });
    }

    $this.on("click", 'a[href="#' + id + '"]', function (event) {
      event.preventDefault();
      event.stopPropagation();

      config.target.removeClass(config.visibleClass);
    });

    $body.on("click", 'a[href="#' + id + '"]', function (event) {
      event.preventDefault();
      event.stopPropagation();

      config.target.toggleClass(config.visibleClass);
    });

    if (config.hideOnEscape)
      $window.on("keydown", function (event) {
        if (event.keyCode == 27) $this._hide(event);
      });

    return $this;
  };

  $.fn.placeholder = function () {
    if (typeof document.createElement("input").placeholder != "undefined") {
      return $(this);
    }

    return $this;
  };
})(jQuery);
