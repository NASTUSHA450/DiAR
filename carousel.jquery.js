(function ($) {
    var methods = {
        init: function (options) {
            var defaults = {
                arrows: false,   // Show arrow controls
                indicators: false,   // Show position indicators / controls
                animation: 'slide', // Animation to use for moving between slides
                speed: 100,     // Speed in milliseconds for the animation
                interval: false,   // Interval in milliseconds for automatically moving between slides
                flexible: true,    // Determines whether the carousel has a flexible width

                onReady: false, // Callback for when the plugin is initialised
                onChangeStart: false, // Callback for the start of the slide change animation
                onChangeEnd: false, // Callback for the end of the slide change animation
                onComplete: false, // Callback for the end of the slides being reached
                onInteraction: false  // Callback for when a user interacts with any controls
            },
                settings = $.extend({}, defaults, options);

            function isArrowControlObject(input) {
                if (typeof input !== 'object') {
                    return false;
                }

                if (!input.hasOwnProperty('next') || !(input.next instanceof jQuery)) {
                    return false;
                }

                if (!input.hasOwnProperty('previous') || !(input.previous instanceof jQuery)) {
                    if (!input.hasOwnProperty('prev') || !(input.prev instanceof jQuery)) {
                        return false;
                    }
                }

                return true;
            }

            return this.each(function () {
                var self = $(this),
                    state = {
                        settings: settings,
                        indicators: false,
                        arrows: {
                            previous: false,
                            next: false
                        },
                        interval: false,
                        width: false,
                        slideCount: self.children().length,
                        current: 0
                    };

                if (settings.animation !== 'slide') {
                    $.error('Unsupported animation type for jQuery.carousel: ' + settings.animation);
                }

                self.wrap($('<div>'));

                var wrap = self.parent();
                wrap.css({
                    width: '100%',
                    overflow: 'hidden'
                });

                self.children().css({
                    float: 'left'
                });

                self.children(':first').addClass('carousel-active');

                if (settings.arrows !== false) {
                    if (isArrowControlObject(settings.arrows)) {
                        state.arrows.next = settings.arrows.next;
                        state.arrows.previous = (settings.arrows.hasOwnProperty('previous')) ? settings.arrows.previous : settings.arrows.prev;
                    }
                    else if (typeof settings.arrows === 'object' && settings.arrows.length === 2) {
                        state.arrows.next = settings.arrows[1];
                        state.arrows.previous = settings.arrows[0];
                    }
                    else if (settings.arrows === true) {
                        state.arrows.next = $('<button class="arrow next backgound-set"></button>').insertAfter(wrap);
                        state.arrows.previous = $('<button class="arrow previous backgound-set"></button>').insertAfter(wrap);
                    }

                    state.arrows.next.on('click.carousel', function () {
                        methods.goToNext.call(self);
                    });
                    state.arrows.previous.on('click.carousel', function () {
                        methods.goToPrevious.call(self);
                    });
                }

                self.data('carousel', state);

                methods.setWidth.call(self, wrap.width());

                methods.updateState.call(self);

            });
        },
        detectWidthChange: function () {
            return this.each(function () {
                var self = $(this),
                    wrapWidth = self.parent().width();

                if (wrapWidth !== self.data('carousel').width) {
                    methods.setWidth.call(self, wrapWidth);
                }
            });
        },
        setWidth: function (slideWidth) {
            width = Number(slideWidth);

            if (isNaN(width) || width < 0) {
                $.error('Invalid width set on jQuery.carousel.setWidth: ' + slideWidth);
            }

            return this.each(function () {
                var self = $(this),
                    state = self.data('carousel');

                if (width !== state.width) {
                    state.width = width;

                    self.css('width', width * state.slideCount)
                        .children().css('width', width);
                }
            });
        },

        goTo: function (slideIndex) {
            index = Number(slideIndex);

            return this.each(function () {
                var self = $(this),
                    state = self.data('carousel'),
                    offset = (100 / state.slideCount) * index;

                if (isNaN(index) || index < 0 || index >= state.slideCount) {
                    $.error('Invalid slide reference on jQuery.carousel.goTo: ' + slideIndex);
                }
                state.current = index;
                self.children().removeClass('carousel-active').eq(index).addClass('carousel-active');
                if (typeof state.settings.onChangeStart === 'function') {
                    state.settings.onChangeStart(self);
                }

                self.animate({ marginLeft: '-' + (100 * index) + '%' }, {
                    duration: state.settings.speed,
                    complete: function () {

                        if (typeof state.settings.onChangeEnd === 'function') {
                            state.settings.onChangeEnd(self);
                        }

                        if (index + 1 === state.slideCount && typeof state.settings.onComplete === 'function') {
                            state.settings.onComplete(self);
                        }
                    }
                });

                methods.updateState.call(self);
            });
        },

        updateState: function () {
            return this.each(function () {
                var state = $(this).data('carousel');


                if (state.indicators !== false) {
                    state.indicators
                        .children().removeClass('active')
                        .filter(':eq(' + state.current + ')').addClass('active');
                }


                if (state.arrows.previous !== false) {
                    state.arrows.previous.toggleClass('disabled', (state.current === 0));
                }

                if (state.arrows.next !== false) {
                    state.arrows.next.toggleClass('disabled', (state.current + 1 === state.slideCount));
                }
            });
        },


        goToStart: function () {
            return methods.goTo.call(this, 0);
        },

        goToEnd: function () {
            return this.each(function () {
                var self = $(this);

                return methods.goTo.call(self, self.data('carousel').slideCount - 1);
            });
        },
        goToNext: function () {
            return this.each(function () {
                var self = $(this);

                try {
                    return methods.goTo.call(self, self.data('carousel').current + 1);
                }
                catch (e) {
                    return false;
                }
            });
        },

        goToPrevious: function () {
            return this.each(function () {
                var self = $(this);

                try {
                    return methods.goTo.call(self, self.data('carousel').current - 1);
                }
                catch (e) {
                    return false;
                }
            });
        },

        cycle: function () {
            return this.each(function () {
                var self = $(this),
                    state = self.data('carousel');
                if (state.current + 1 === state.slideCount) {
                    methods.goToStart.call(self);
                }
                else {
                    methods.goToNext.call(self);
                }
            });
        },


        start: function () {
            return this.each(function () {
                var self = $(this),
                    state = self.data('carousel');

                if (state.settings.interval !== false) {
                    var speed = Number(state.settings.interval);

                    if (isNaN(speed) || speed <= 0) {
                        $.error('Invalid interval speed set on jQuery.carousel: ' + state.settings.interval);
                    }

                    state.interval = setInterval(function () {
                        return methods.cycle.call(self);
                    }, speed);
                }
            });
        },

        stop: function () {
            return this.each(function () {
                var state = $(this).data('carousel');

                if (state.interval !== false) {
                    clearInterval(state.interval);
                }
            });
        }
    };

    $.fn.carousel = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.carousel');
        }
    };
})(jQuery);