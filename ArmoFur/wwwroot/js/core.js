"use strict";
var bilgins = {
        flocker: {
            field_changed: false,
            field_interract: false,
            form_interract: false
        }
    },
    $bilgins_html = jQuery('html'),
    bilgins_tns = [],
    $bilgins_body = jQuery('body'),
    $bilgins_window = jQuery(window),
    $bilgins_header = jQuery('header#bilgins-header'),
    $bilgins_footer = jQuery('footer#bilgins-footer'),
    $bilgins_main = jQuery('main.bilgins-content-wrap'),
    $bilgins_scroll = jQuery('.bilgins-content-scroll'),
    $bilgins_header_holder;
bilgins.config = {
    'smooth_ease': 0.1,
    'content_load_delay': 0.8
}
class bilgins_Before_After {
    constructor($obj) {
        if ($obj instanceof jQuery) {
            let this_class = this;
            this.$el = {
                $wrap: $obj,
                $before: jQuery('<div class="bilgins-before-after-img bilgins-before-img"/>').appendTo($obj),
                $after: jQuery('<div class="bilgins-before-after-img bilgins-after-img"/>').appendTo($obj),
                $divider: jQuery('<div class="bilgins-before-after-divider"><i class="la la-arrows-h"></i></div>').appendTo($obj),
            };
            this.offset = this.$el.$wrap.offset().left;
            this.size = this.$el.$wrap.width();
            this.current = 50;
            this.target = 50;
            this.isDown = false;
            this.$el.$before.css('background-image', 'url(' + this.$el.$wrap.data('img-before') + ')');
            this.$el.$after.css('background-image', 'url(' + this.$el.$wrap.data('img-after') + ')');
            this.$el.$wrap.on('mousedown', function(e) {
                e.preventDefault();
                this_class.isDown = true;
            }).on('mousemove', function(e) {
                e.preventDefault();
                if (this_class.isDown) {
                    let position = e.pageX - this_class.offset,
                        newTarget = position / this_class.size;
                    if (newTarget > 1)
                        newTarget = 1;
                    if (newTarget < 0)
                        newTarget = 0;
                    this_class.target = newTarget * 100;
                }
            }).on('mouseleave', function(e) {
                e.preventDefault();
                this_class.isDown = false;
            }).on('mouseup', function(e) {
                e.preventDefault();
                this_class.isDown = false;
            });
            this.$el.$wrap[0].addEventListener('touchstart', function(e) {
                e.preventDefault();
                this_class.isDown = true;
            }, false);
            this.$el.$wrap[0].addEventListener('touchmove', function(e) {
                e.preventDefault();
                if (this_class.isDown) {
                    let position = e.touches[0].clientX - this_class.offset,
                        newTarget = position / this_class.size;
                    if (newTarget > 1)
                        newTarget = 1;
                    if (newTarget < 0)
                        newTarget = 0;
                    this_class.target = newTarget * 100;
                }
            }, false);
            this.$el.$wrap[0].addEventListener('touchend', function(e) {
                e.preventDefault();
                this_class.isDown = false;
            }, false);
            $bilgins_window.on('resize', function() {
                this_class.layout();
                this_class.reset();
            }).on('load', function() {
                this_class.layout();
            });
            this.layout();
            this.requestAnimation();
        } else {
            return false;
        }
    }
    layout() {
        this.offset = this.$el.$wrap.offset().left;
        this.size = this.$el.$wrap.width();
    }
    reset() {
        this.current = 50;
        this.target = 50;
    }
    requestAnimation() {
        this.animation = requestAnimationFrame(() => this.animate());
    }
    animate() {
        this.current += ((this.target - this.current) * 0.1);
        this.$el.$after.css('width', parseFloat(this.current).toFixed(1) + '%');
        this.$el.$divider.css('left', parseFloat(this.current).toFixed(1) + '%');
        this.requestAnimation();
    }
}
bilgins.cursor = {
    $el: jQuery('.bilgins-cursor'),
    $el_main: jQuery('span.bilgins-cursor-circle'),
    targetX: $bilgins_window.width() / 2,
    targetY: $bilgins_window.height() / 2,
    currentX: $bilgins_window.width() / 2,
    currentY: $bilgins_window.height() / 2,
    easing: 0.2,
    init: function() {
        let $this_el = this.$el;
        $bilgins_window.on('mousemove', function(e) {
            bilgins.cursor.targetX = e.clientX - $this_el.width() / 2;
            bilgins.cursor.targetY = e.clientY - $this_el.height() / 2;
        });
        if ($this_el.length) {
            bilgins.cursor.animate();
        }
        $bilgins_window.on('mouseleave', function() {
            bilgins.cursor.$el.addClass('is-inactive');
        }).on('mouseenter', function() {
            bilgins.cursor.$el.removeClass('is-inactive');
        });
        jQuery(document).on('mouseenter', 'a', function() {
            if (jQuery(this).hasClass('bilgins-lightbox-link')) {
                bilgins.cursor.$el.addClass('int-lightbox');
            } else {
                bilgins.cursor.$el.addClass('int-link');
            }
            jQuery(this).on('mouseleave', function() {
                bilgins.cursor.$el.removeClass('int-link int-lightbox');
            });
        }).on('mouseenter', 'button', function() {
            bilgins.cursor.$el.addClass('int-link');
            jQuery(this).on('mouseleave', function() {
                bilgins.cursor.$el.removeClass('int-link');
            });
        }).on('mouseenter', 'input[type="submit"]', function() {
            bilgins.cursor.$el.addClass('int-link');
            jQuery(this).on('mouseleave', function() {
                bilgins.cursor.$el.removeClass('int-link');
            });
        }).on('mouseenter', '.bilgins-back', function() {
            jQuery('.bilgins-back').on('mouseenter', function() {
                bilgins.cursor.$el.addClass('int-link');
                jQuery(this).on('mouseleave', function() {
                    bilgins.cursor.$el.removeClass('int-link');
                });
            });
        }).on('mouseenter', '.is-link', function() {
            jQuery('.is-link').on('mouseenter', function() {
                bilgins.cursor.$el.addClass('int-link');
                jQuery(this).on('mouseleave', function() {
                    bilgins.cursor.$el.removeClass('int-link');
                });
            });
        }).on('mouseenter', '.bilgins-aside-overlay', function() {
            bilgins.cursor.$el.addClass('int-close');
            jQuery(this).on('mouseleave', function() {
                bilgins.cursor.$el.removeClass('int-close');
            });
        }).on('mouseenter', '.bilgins-before-after', function() {
            bilgins.cursor.$el.addClass('int-grab-h');
            jQuery(this).on('mouseleave', function() {
                bilgins.cursor.$el.removeClass('int-grab-h');
            });
        }).on('mouseenter', '.bilgins-testimonials-carousel .tns-ovh', function() {
            bilgins.cursor.$el.addClass('int-grab-h');
            jQuery(this).on('mouseleave', function() {
                bilgins.cursor.$el.removeClass('int-grab-h');
            });
        }).on('mouseenter', '.bilgins-albums-slider', function() {
            bilgins.cursor.$el.addClass('int-grab-h');
            jQuery(this).on('mouseleave', function() {
                bilgins.cursor.$el.removeClass('int-grab-h');
            });
        }).on('mouseenter', '.pswp__scroll-wrap', function() {
            bilgins.cursor.$el.addClass('int-grab-h');
            jQuery(this).on('mouseleave', function() {
                bilgins.cursor.$el.removeClass('int-grab-h');
            });
        }).on('mouseenter', '.bilgins-albums-carousel', function() {
            if (jQuery(this).hasClass('is-vertical')) {
                bilgins.cursor.$el.addClass('int-grab-v');
            } else {
                bilgins.cursor.$el.addClass('int-grab-h');
            }
            jQuery(this).on('mouseleave', function() {
                bilgins.cursor.$el.removeClass('int-grab-h int-grab-v');
            });
        });
    },
    animate: function() {
        let $this_el = bilgins.cursor.$el;
        bilgins.cursor.currentX += ((bilgins.cursor.targetX - bilgins.cursor.currentX) * bilgins.cursor.easing);
        bilgins.cursor.currentY += ((bilgins.cursor.targetY - bilgins.cursor.currentY) * bilgins.cursor.easing);
        $this_el.css('transform', 'translate3d(' + bilgins.cursor.currentX + 'px, ' + bilgins.cursor.currentY + 'px, 0)');
        requestAnimationFrame(bilgins.cursor.animate);
    }
};
bilgins.cursor.init();
if (jQuery('.bilgins-lightbox-link').length) {
    bilgins.pswp = {
        gallery: Array(),
        html: jQuery('\
		<!-- Root element of PhotoSwipe. Must have class pswp. -->\
		<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\
			<div class="pswp__bg"></div><!-- PSWP Background -->\
			\
			<div class="pswp__scroll-wrap">\
				<div class="pswp__container">\
					<div class="pswp__item"></div>\
					<div class="pswp__item"></div>\
					<div class="pswp__item"></div>\
				</div><!-- .pswp__container -->\
				\
				<div class="pswp__ui pswp__ui--hidden">\
					<div class="pswp__top-bar">\
						<!--  Controls are self-explanatory. Order can be changed. -->\
						<div class="pswp__counter"></div>\
						\
						<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\
						\
						<div class="pswp__preloader">\
							<div class="pswp__preloader__icn">\
							  <div class="pswp__preloader__cut">\
								<div class="pswp__preloader__donut"></div>\
							  </div><!-- .pswp__preloader__cut -->\
							</div><!-- .pswp__preloader__icn -->\
						</div><!-- .pswp__preloader -->\
					</div><!-- .pswp__top-bar -->\
					\
					<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\
						<div class="pswp__share-tooltip"></div>\
					</div><!-- .pswp__share-modal -->\
					\
					<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\
					<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\
					\
					<div class="pswp__caption">\
						<div class="pswp__caption__center"></div>\
					</div><!-- .pswp__caption -->\
				</div><!-- .pswp__ui pswp__ui--hidden -->\
			</div><!-- .pswp__scroll-wrap -->\
		</div><!-- .pswp -->').appendTo($bilgins_body)
    };
}
if (jQuery('.bilgins-kenburns-slider').length) {
    bilgins.kenburns = {
        init: function() {
            let this_f = this;
            this_f.$el = jQuery('.bilgins-kenburns-slider');
            this_f.items = this_f.$el.find('.bilgins-kenburns-slide').length;
            this_f.transition = parseInt(this_f.$el.data('transition'), 10);
            this_f.delay = parseInt(this_f.$el.data('delay'), 10) / 1000 + this_f.transition * 0.001;
            this_f.zoom = this_f.$el.data('zoom');
            this_f.from = this_f.zoom;
            this_f.to = 1;
            this_f.active = 0;
            let prev_offset_x = 0,
                prev_offset_y = 0;
            this_f.$el.find('.bilgins-kenburns-slide').each(function() {
                let offset_x = Math.random() * 100,
                    offset_y = Math.random() * 100;
                if (prev_offset_x > 50 && offset_x > 50) {
                    offset_x = offset_x - 50;
                } else if (prev_offset_x < 50 && offset_x < 50) {
                    offset_x = offset_x + 50;
                }
                if (prev_offset_y > 50 && offset_y > 50) {
                    offset_y = offset_y - 50;
                } else if (prev_offset_y < 50 && offset_y < 50) {
                    offset_y = offset_y + 50;
                }
                prev_offset_x = offset_x;
                prev_offset_y = offset_y;
                jQuery(this).css({
                    'transition': 'opacity ' + this_f.transition + 'ms',
                    'transform-origin': offset_x + '% ' + offset_y + '%',
                    'background-image': 'url(' + jQuery(this).data('src') + ')'
                });
            });
            bilgins.kenburns.change();
        },
        change: function() {
            let this_f = this,
                scale_from = this_f.from,
                scale_to = this_f.to;
            if (this_f.active >= this_f.items) {
                this_f.active = 0;
            }
            let current_slide = this_f.$el.find('.bilgins-kenburns-slide').eq(this_f.active);
            gsap.fromTo(current_slide, {
                scale: scale_from,
                onStart: function() {
                    current_slide.addClass('is-active');
                }
            }, {
                scale: scale_to,
                duration: this_f.delay,
                ease: 'none',
                onComplete: function() {
                    bilgins.kenburns.active++;
                    bilgins.kenburns.from = scale_to;
                    bilgins.kenburns.to = scale_from;
                    bilgins.kenburns.change();
                    bilgins.kenburns.$el.find('.is-active').removeClass('is-active');
                }
            });
        }
    };
}
bilgins.counter = function(this_el) {
    jQuery(this_el).prop('Counter', 0).animate({
        Counter: jQuery(this_el).text()
    }, {
        duration: parseInt(jQuery(this_el).parent().data('delay'), 10),
        easing: 'swing',
        step: function(now) {
            jQuery(this_el).text(Math.ceil(now));
        }
    });
}
bilgins.progress = {
    init: function(this_el) {
        let $this = jQuery(this_el),
            $bar_wrap = jQuery('<div class="bilgins-progress-item-wrap"/>').prependTo($this),
            this_size = this.getSize(this_el),
            $bar_svg = jQuery('\
				<svg width="' + this_size.svgSize + '" height="' + this_size.svgSize + '" viewPort="0 0 ' + this_size.barSize + ' ' + this_size.barSize + '" version="1.1" xmlns="http://www.w3.org/2000/svg">\
					<circle class="bilgins-progress-circle--bg" r="' + this_size.r + '" cx="' + this_size.barSize + '" cy="' + this_size.barSize + '" fill="transparent" stroke-dasharray="' + this_size.dashArray + '" stroke-dashoffset="0"></circle>\
					<circle class="bilgins-progress-circle--bar" transform="rotate(-90, ' + this_size.barSize + ', ' + this_size.barSize + ')" r="' + this_size.r + '" cx="' + this_size.barSize + '" cy="' + this_size.barSize + '" fill="transparent" stroke-dasharray="' + this_size.dashArray + '" stroke-dashoffset="' + this_size.dashArray + '"></circle>\
				</svg>').appendTo($bar_wrap);
        $bar_svg.find('.bilgins-progress-circle--bar').css('transition', 'stroke-dashoffset ' + $this.data('delay') + 'ms ease-in-out');
        $bar_wrap.append('<span class="bilgins-progress-counter">' + $this.data('percent') + '</span>');
        $bilgins_window.on('resize', this.layout(this_el));
    },
    layout: function(this_el) {
        let $this = jQuery(this_el);
        if ($this.find('svg').length) {
            let this_size = this.getSize(this_el),
                $svg = $this.find('svg'),
                $barBg = $this.find('.bilgins-progress-circle--bg'),
                $bar = $this.find('.bilgins-progress-circle--bar');
            $svg.attr('width', this_size.svgSize).attr('height', this_size.svgSize).attr('viewPort', '0 0 ' + this_size.barSize + ' ' + this_size.barSize);
            $barBg.css({
                'r': this_size.r,
                'cx': this_size.barSize,
                'cy': this_size.barSize,
                'stroke-dasharray': this_size.dashArray,
            });
            $bar.css({
                'r': this_size.r,
                'cx': this_size.barSize,
                'cy': this_size.barSize,
                'stroke-dasharray': this_size.dashArray,
            }).attr('transform', 'rotate(-90, ' + this_size.barSize + ', ' + this_size.barSize + ')');
            if ($this.hasClass('is-done')) {} else {
                $bar.css('stroke-dashoffset', this_size.dashArray);
            }
        }
    },
    getSize: function(this_el) {
        let $this = jQuery(this_el),
            $wrap = $this.find('.bilgins-progress-item-wrap'),
            sizes = {
                percent: parseInt($this.data('percent'), 10),
                svgSize: $wrap.width(),
                stroke: parseInt($wrap.css('stroke-width'), 10),
            }
        sizes.barSize = Math.floor(sizes.svgSize / 2);
        sizes.r = sizes.barSize - sizes.stroke;
        sizes.dashArray = parseFloat(Math.PI * (sizes.r * 2)).toFixed(2);
        sizes.dashOffset = parseFloat(sizes.dashArray - (sizes.dashArray * sizes.percent) / 100).toFixed(2);
        return sizes;
    },
    animate: function(this_el) {
        let $this = jQuery(this_el),
            $this_counter = $this.find('span.bilgins-progress-counter'),
            this_size = this.getSize(this_el),
            $bar = $this.find('.bilgins-progress-circle--bar');
        $bar.css('stroke-dashoffset', this_size.dashOffset);
        $this_counter.prop('Counter', 0).animate({
            Counter: $this_counter.text()
        }, {
            duration: parseInt($this_counter.parents('.bilgins-progress-item').data('delay'), 10),
            easing: 'swing',
            step: function(now) {
                $this_counter.text(Math.ceil(now) + '%');
            }
        });
    }
}
if ('IntersectionObserver' in window) {
    bilgins.progress.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!jQuery(entry.target).hasClass('is-done')) {
                if (entry.isIntersecting) {
                    jQuery(entry.target).addClass('is-done');
                    bilgins.progress.animate(jQuery(entry.target)[0]);
                }
            }
        });
    });
}
bilgins.count_down = {
    init: function() {
        let $dom = jQuery('#bilgins-coming-soon'),
            datetime = new Date($dom.find('time').text() + 'T00:00:00'),
            is_this;
        $dom.find('time').remove();
        this.labels = $dom.data('labels');
        this.days = jQuery('<h2>0</h2>').appendTo($dom).wrap('<div/>').after('<span>' + bilgins.count_down.labels[0] + '</span>');
        this.hours = jQuery('<h2>0</h2>').appendTo($dom).wrap('<div/>').after('<span>' + bilgins.count_down.labels[1] + '</span>');
        this.minutes = jQuery('<h2>0</h2>').appendTo($dom).wrap('<div/>').after('<span>' + bilgins.count_down.labels[2] + '</span>');
        this.seconds = jQuery('<h2>0</h2>').appendTo($dom).wrap('<div/>').after('<span>' + bilgins.count_down.labels[3] + '</span>');
        this.update(datetime);
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(function() {
            bilgins.count_down.update(datetime);
        }, 1000);
    },
    update: function(endDate) {
        let now = new Date();
        let difference = endDate.getTime() - now.getTime();
        if (difference <= 0) {
            clearInterval(this.interval);
        } else {
            let seconds = Math.floor(difference / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);
            hours %= 24;
            minutes %= 60;
            seconds %= 60;
            if (days < 10) {
                days = ("0" + days).slice(-2);
            }
            this.days.text(days);
            this.hours.text(("0" + hours).slice(-2));
            this.minutes.text(("0" + minutes).slice(-2));
            this.seconds.text(("0" + seconds).slice(-2));
        }
    }
};
bilgins.old_scroll_top = 0;
bilgins.sScroll = {
    target: 0,
    current: 0,
    animate: function() {
        bilgins.sScroll.current += ((bilgins.sScroll.target - bilgins.sScroll.current) * bilgins.config.smooth_ease);
        $bilgins_scroll.css('transform', 'translate3d(0, -' + bilgins.sScroll.current + 'px, 0)');
        if ($bilgins_scroll.height() !== $bilgins_body.height()) {
            bilgins.sScroll.layout();
        }
        requestAnimationFrame(bilgins.sScroll.animate);
    },
    layout: function() {
        if ($bilgins_scroll.length) {
            let this_content = $bilgins_scroll.children('.bilgins-content');
            this_content.css('min-height', '0px');
            if ($bilgins_scroll.height() <= $bilgins_window.height()) {
                let min_height = $bilgins_window.height() - $bilgins_footer.height();
                if (!$bilgins_body.hasClass('no-header-padding'))
                    min_height = min_height - $bilgins_scroll.children('.bilgins-header-holder').height();
                this_content.css('min-height', min_height + 'px');
                $bilgins_scroll.addClass('is-centered');
            } else {
                $bilgins_scroll.removeClass('is-centered');
            }
            if ($bilgins_body.hasClass('bilgins-smooth-scroll')) {
                $bilgins_body.height($bilgins_scroll.height());
            }
        }
    }
};
if ($bilgins_scroll.length || $bilgins_body.hasClass('bilgins-home-template')) {
    bilgins.sScroll.animate();
}
bilgins.init = function() {
    $bilgins_body.addClass('is-init');
    bilgins.old_scroll_top = $bilgins_window.scrollTop();
    if (jQuery('form.bilgins-contact-form').length) {
        jQuery('form.bilgins-contact-form').each(function() {
            let $this = jQuery(this),
                $response = $this.find('.bilgins-contact-form__response'),
                formData;
            $this.find('input').on('change', function() {
                bilgins.flocker.field_changed = true;
            }).on('keyup', function() {
                bilgins.flocker.field_interract = true;
            });
            $this.find('textarea').on('change', function() {
                bilgins.flocker.field_changed = true;
            }).on('keyup', function(e) {
                bilgins.flocker.field_interract = true;
            });
            $this.find('input')[0].addEventListener('touchenter', function(e) {
                bilgins.flocker.field_interract = true;
                bilgins.flocker.form_interract = true;
            }, false);
            $this.find('textarea')[0].addEventListener('touchenter', function(e) {
                bilgins.flocker.field_interract = true;
                bilgins.flocker.form_interract = true;
            }, false);
            this.addEventListener('touchenter', function(e) {
                bilgins.flocker.form_interract = true;
            }, false);
            $this.on('mouseenter', function() {
                bilgins.flocker.form_interract = true;
            });
            $this.submit(function(e) {
                e.preventDefault();
                if (bilgins.flocker.form_interract && bilgins.flocker.field_interract && bilgins.flocker.field_changed) {
                    $this.addClass('is-in-action');
                    formData = jQuery(this).serialize();
                    jQuery.ajax({
                        type: 'POST',
                        url: $this.attr('action'),
                        data: formData
                    }).done(function(response) {
                        $this.removeClass('is-in-action');
                        $response.empty().removeClass('alert-danger').addClass('alert-success');
                        $response.html('<span>' + response + '</span>');
                        $this.find('input:not([type="submit"]), textarea').val('');
                        bilgins.flocker.form_interract = false;
                        bilgins.flocker.field_interract = false;
                        bilgins.flocker.field_changed = false;
                    }).fail(function(data) {
                        $this.removeClass('is-in-action');
                        $response.empty().removeClass('alert-success').addClass('alert-danger');
                        $response.html('<span>' + data.responseText + '</span>');
                        bilgins.flocker.form_interract = false;
                        bilgins.flocker.field_interract = false;
                        bilgins.flocker.field_changed = false;
                    });
                } else {
                    if ($this.attr('data-spam-message')) {
                        var spam_message = '<span>' + $this.attr('data-spam-message') + '</span>';
                    } else {
                        var spam_message = '<span>No user actions detected. Look like a spam bot.</span>';
                    }
                    bilgins.flocker.form_interract = false;
                    bilgins.flocker.field_interract = false;
                    bilgins.flocker.field_changed = false;
                    $this.find('input:not([type="submit"]), textarea').val('');
                    $response.empty().removeClass('alert-success').addClass('alert-danger');
                    $response.html(spam_message);
                }
            });
        });
    }
    $bilgins_header_holder = jQuery('<div class="bilgins-header-holder"></div>');
    $bilgins_header_holder.height($bilgins_header.height()).prependTo($bilgins_scroll);
    if (jQuery('a.bilgins-logo').length) {
        jQuery('a.bilgins-logo').each(function() {
            let $this = jQuery(this),
                $img = $this.children('img'),
                w = $img.attr('width'),
                h = $img.attr('height');
            if ($this.hasClass('is-retina')) {
                $this.width(w / 2).height(h / 2);
            } else {
                $this.width(w).height(h);
            }
        });
    }
    if (jQuery('.current-menu-item').length) {
        jQuery('.current-menu-item').each(function() {
            jQuery(this).parents('li').addClass('current-menu-ancestor');
        });
    }
    if (jQuery('.bilgins-page-title-wrap').length) {
        if (jQuery('.bilgins-content-wrap .bilgins-content').length) {
            let bilgins_mobile_title = jQuery('<div class="bilgins-mobile-title-wrap">' + jQuery('.bilgins-page-title-wrap').html() + '</div>');
            jQuery('.bilgins-content-wrap .bilgins-content').prepend(bilgins_mobile_title);
        }
    }
    let bilgins_mobile_header = jQuery('<div class="bilgins-mobile-header">'),
        mobile_menu_button = jQuery('<a href="#" class="bilgins-mobile-menu-button"><i class="la la-bars"></i></a>').appendTo(bilgins_mobile_header),
        mobile_menu = jQuery('<nav class="bilgins-mobile-menu"></nav>').appendTo($bilgins_body),
        mobile_menu_close = jQuery('<a href="#" class="bilgins-mobile-menu-close"></a>').appendTo(mobile_menu);
    if (jQuery('.bilgins-aside-overlay').length) {
        bilgins_mobile_header.append('\
			<a class="bilgins-aside-toggler" href="#">\
				<span class="bilgins-aside-toggler__icon01"></span>\
				<span class="bilgins-aside-toggler__icon02"></span>\
				<span class="bilgins-aside-toggler__icon03"></span>\
			</a>');
    }
    if ($bilgins_body.hasClass('bilgins-maintenance-wrap')) {
        bilgins_mobile_header.prepend('<a class="bilgins-contacts-toggler" href="#"><i class="la la-envelope"></i></a>');
        jQuery(document).on('click', '.bilgins-contacts-toggler', function() {
            $bilgins_body.addClass('contacts-shown');
        });
        jQuery(document).on('click', '.bilgins-contacts-close', function() {
            $bilgins_body.removeClass('contacts-shown');
        });
    }
    $bilgins_header.find('.bilgins-nav-block').append(bilgins_mobile_header);
    if ($bilgins_header.find('.bilgins-nav').length) {
        mobile_menu.append('\
			<div class="bilgins-mobile-menu-inner">\
				<div class="bilgins-mobile-menu-content">\
					' + $bilgins_header.find('.bilgins-nav').html() + '\
				</div>\
			</div>\
		');
        mobile_menu.find('ul.main-menu a').on('click', function(e) {
            var $this = jQuery(this),
                $parent = $this.parent();
            if ($parent.hasClass('.menu-item-has-children') || $parent.find('ul').length) {
                e.preventDefault();
                $parent.children('ul').slideToggle(300).toggleClass('is-open');
            }
        });
        mobile_menu.find('ul.sub-menu').slideUp(1);
    }
    mobile_menu_button.on('click', function() {
        $bilgins_body.addClass('bilgins-mobile-menu-shown').addClass('is-locked');
        bilgins.old_scroll_top = $bilgins_window.scrollTop();
        gsap.fromTo('.bilgins-mobile-menu ul.main-menu > li', {
            x: 0,
            y: 40,
            opacity: 0,
        }, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.2,
            delay: 0.3,
            stagger: 0.1,
            onComplete: function() {
                $bilgins_body.removeClass('is-locked');
            }
        }, );
    });
    mobile_menu_close.on('click', function() {
        let setDelay = 0;
        $bilgins_body.addClass('is-locked');
        if (mobile_menu.find('.is-open').length) {
            mobile_menu.find('ul.sub-menu').slideUp(300);
            setDelay = 0.3;
        }
        gsap.fromTo('.bilgins-mobile-menu ul.main-menu > li', {
            x: 0,
            y: 0,
            opacity: 1
        }, {
            x: 0,
            y: -40,
            opacity: 0,
            duration: 0.2,
            delay: setDelay,
            stagger: 0.1,
            onComplete: function() {
                $bilgins_body.removeClass('bilgins-mobile-menu-shown').removeClass('is-locked');
            }
        }, );
    });
    jQuery('.bilgins-menu-overlay').on('click', function() {
        $bilgins_body.removeClass('bilgins-mobile-menu-shown').removeClass('is-locked');
    });
    jQuery(document).on('click', 'a.bilgins-aside-toggler', function(e) {
        e.preventDefault();
        $bilgins_body.addClass('bilgins-aside-shown').removeClass('bilgins-menu-fade');
        bilgins.old_scroll_top = $bilgins_window.scrollTop();
    });
    jQuery('a.bilgins-aside-close').on('click', function(e) {
        e.preventDefault();
        $bilgins_body.removeClass('bilgins-aside-shown');
    });
    jQuery('.bilgins-aside-overlay').on('click', function() {
        $bilgins_body.removeClass('bilgins-aside-shown');
    });
    jQuery('nav.bilgins-nav a').on('mouseenter', function() {
        $bilgins_body.addClass('bilgins-menu-fade');
    });
    jQuery('nav.bilgins-nav').on('mouseleave', function() {
        $bilgins_body.removeClass('bilgins-menu-fade');
    });
    jQuery('.bilgins-back').on('click', function(e) {
        e.preventDefault();
        var $this = jQuery(this);
        if ($this.hasClass('is-to-top')) {
            if ($bilgins_window.scrollTop() > $bilgins_window.height() / 2) {
                $bilgins_body.addClass('has-to-top');
            }
            $this.addClass('in-action');
            if (jQuery('.bilgins-albums-carousel').length) {
                bilgins_ribbon.target = 0;
                bilgins_ribbon.currentStep = 0;
                setTimeout(function() {
                    $bilgins_body.removeClass('has-to-top');
                    $this.removeClass('in-action');
                }, 300, $this);
            } else {
                jQuery('html, body').stop().animate({
                    scrollTop: 0
                }, 500, function() {
                    $bilgins_body.removeClass('has-to-top');
                    $this.removeClass('in-action');
                });
            }
        }
        if ($this.hasClass('is-message')) {
            $bilgins_body.addClass('is-locked in-message-mode');
            $this.parent().removeClass('is-loaded');
            gsap.to('.bilgins-content-wrap .bilgins-content', {
                opacity: 0,
                y: -150,
                duration: 0.7,
                onComplete: function() {
                    jQuery('.bilgins-back-wrap .is-message').hide();
                    jQuery('.bilgins-back-wrap .is-message-close').show();
                }
            });
            gsap.to('.bilgins-page-background', {
                opacity: 0,
                scale: 1.05,
                duration: 1,
            });
            gsap.to('#bilgins-contacts-wrap', {
                opacity: 1,
                y: 0,
                duration: 0.7,
                delay: 0.3,
                onComplete: function() {
                    $bilgins_body.removeClass('is-locked');
                    jQuery('.bilgins-back-wrap').addClass('is-loaded');
                }
            });
        }
        if ($this.hasClass('is-message-close')) {
            $bilgins_body.addClass('is-locked').removeClass('in-message-mode');
            $this.parent().removeClass('is-loaded');
            gsap.to('#bilgins-contacts-wrap', {
                opacity: 0,
                y: 150,
                duration: 0.7,
                onComplete: function() {
                    jQuery('.bilgins-back-wrap .is-message').show();
                    jQuery('.bilgins-back-wrap .is-message-close').hide();
                }
            });
            gsap.to('.bilgins-page-background', {
                opacity: 0.13,
                scale: 1,
                duration: 1,
            });
            gsap.to('.bilgins-content-wrap .bilgins-content', {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.3,
                onComplete: function() {
                    $bilgins_body.removeClass('is-locked');
                    jQuery('.bilgins-back-wrap').addClass('is-loaded');
                }
            });
        }
        if ($this.hasClass('is-home-return')) {
            $bilgins_body.addClass('is-locked');
            gsap.fromTo('.bilgins-content', 1, {
                y: 0,
                opacity: 1,
            }, {
                y: -100,
                opacity: 0,
                duration: 1,
                onComplete: function() {
                    if ($bilgins_scroll.find('#bilgins-home-works').length) {
                        var $current_content = jQuery('#bilgins-home-works');
                    }
                    if ($bilgins_scroll.find('#bilgins-home-contacts').length) {
                        var $current_content = jQuery('#bilgins-home-contacts');
                    }
                    for (var i = 0; i < 4; i++) {
                        $current_content.unwrap();
                    }
                    bilgins.sScroll.layout();
                    $bilgins_body.height($bilgins_window.height());
                }
            });
            if (jQuery('.bilgins-page-title-wrap').length) {
                jQuery('.bilgins-page-title-wrap').removeClass('is-loaded').addClass('is-inactive');
                gsap.to('.bilgins-page-title-wrap', 0.5, {
                    css: {
                        top: 0,
                    },
                    delay: 0.5,
                });
            }
            if (jQuery('.bilgins-back-wrap').length) {
                jQuery('.bilgins-back-wrap').removeClass('is-loaded').addClass('is-inactive');
                gsap.to('.bilgins-back-wrap', 0.5, {
                    css: {
                        top: '200%',
                    },
                    delay: 0.5,
                });
            }
            gsap.to('.bilgins-home-link--works', 0.5, {
                css: {
                    top: '100%',
                },
                delay: 1,
                onComplete: function() {
                    jQuery('.bilgins-home-link--works').addClass('is-loaded').removeClass('is-inactive');
                }
            });
            gsap.to('.bilgins-home-link--contacts', 0.5, {
                css: {
                    top: '100%',
                },
                delay: 1,
                onComplete: function() {
                    jQuery('.bilgins-home-link--contacts').addClass('is-loaded').removeClass('is-inactive');
                }
            });
            gsap.to('.bilgins-page-background', {
                opacity: 0.75,
                scale: 1,
                duration: 1,
                delay: 1,
                onComplete: function() {
                    $bilgins_body.removeClass('bilgins-content-shown');
                    $bilgins_body.removeClass('is-locked');
                }
            });
        }
    });
    if (jQuery('.bilgins-page-background[data-src]').length) {
        jQuery('.bilgins-page-background[data-src]').each(function() {
            jQuery(this).css('background-image', 'url(' + jQuery(this).data('src') + ')');
        });
    }
    if ($bilgins_body.hasClass('bilgins-home-template')) {
        jQuery('.bilgins-home-link').on('mouseenter', function() {
            $bilgins_body.addClass('is-faded');
        }).on('mouseleave', function() {
            $bilgins_body.removeClass('is-faded');
        }).on('click', function() {
            var $this = jQuery(this);
            bilgins.cursor.$el.removeClass('int-link');
            $bilgins_body.removeClass('is-faded').addClass('bilgins-content-shown');
            jQuery('.bilgins-home-link-wrap').addClass('is-inactive');
            gsap.to('.bilgins-page-background', {
                opacity: 0.1,
                scale: 1.05,
                duration: 1,
                delay: 0.5,
            });
            gsap.to('.bilgins-home-link--works', 0.5, {
                css: {
                    top: 0,
                },
                delay: 0.5,
            });
            gsap.to('.bilgins-home-link--contacts', 0.5, {
                css: {
                    top: '200%',
                },
                delay: 0.5,
            });
            jQuery('.bilgins-page-title').empty().append('<span>' + $this.find('span:first-child').text() + '</span>' + $this.find('span:last-child').text()).removeClass('is-inactive');
            jQuery('.bilgins-home-return').removeClass('is-inactive');
            gsap.to('.bilgins-page-title-wrap', 0.5, {
                css: {
                    top: '100%',
                },
                delay: 1,
                onComplete: function() {
                    jQuery('.bilgins-page-title-wrap').addClass('is-loaded').removeClass('is-inactive');
                }
            });
            gsap.to('.bilgins-back-wrap', 0.5, {
                css: {
                    top: '100%',
                },
                delay: 1,
                onComplete: function() {
                    jQuery('.bilgins-back-wrap').addClass('is-loaded').removeClass('is-inactive');
                }
            });
            if ($this.parent().hasClass('bilgins-home-link--works')) {
                var $current_content = jQuery('#bilgins-home-works');
            }
            if ($this.parent().hasClass('bilgins-home-link--contacts')) {
                var $current_content = jQuery('#bilgins-home-contacts');
            }
            $current_content.wrap('\
				<main class="bilgins-content-wrap">\
					<div class="bilgins-content-scroll">\
						<div class="bilgins-content">\
							<section class="bilgins-section"></section>\
						</div><!-- .bilgins-content -->\
					</div><!-- .bilgins-content-scroll -->\
				</main>\
			');
            if ($bilgins_body.hasClass('bilgins-smooth-scroll')) {
                $bilgins_scroll = $bilgins_body.find('.bilgins-content-scroll');
                $bilgins_body.height($bilgins_scroll.height());
            }
            bilgins.layout();
            gsap.fromTo('.bilgins-content', 1, {
                y: 100,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 1.2,
            });
        });
    }
    jQuery('a').on('click', function(e) {
        var $this = jQuery(this),
            this_href = $this.attr('href');
        if ($this.attr('target') && '_blank' == $this.attr('target')) {} else if ($this.is('[download]')) {} else if (this_href.indexOf('tel:') > -1 || this_href.indexOf('mailto:') > -1) {} else {
            if (this_href == '#') {
                e.preventDefault();
            } else if ($this.hasClass('bilgins-lightbox-link')) {
                e.preventDefault();
            } else if (this_href.length > 1 && this_href[0] !== '#' && !/\.(jpg|png|gif)$/.test(this_href)) {
                e.preventDefault();
                bilgins.change_location(this_href);
            }
        }
    }).on('mousedown', function(e) {
        e.preventDefault();
    });
    if (jQuery('.is-masonry').length) {
        jQuery('.is-masonry').each(function() {
            jQuery(this).masonry();
        });
    }
    if (jQuery('#bilgins-coming-soon').length) {
        bilgins.count_down.init();
    }
    if (jQuery('.bilgins-before-after').length) {
        jQuery('.bilgins-before-after').each(function() {
            new bilgins_Before_After(jQuery(this));
        });
    }
    if (jQuery('.bilgins-kenburns-slider').length) {
        bilgins.kenburns.init();
    }
    if (jQuery('.bilgins-tns-container').length) {
        jQuery('.bilgins-tns-container').each(function() {
            let $this = jQuery(this),
                $parent = $this.parent(),
                bilgins_tns_options = {
                    container: this,
                    items: 1,
                    axis: 'horizontal',
                    mode: 'carousel',
                    gutter: 0,
                    edgePadding: 0,
                    controls: false,
                    nav: false,
                    navPosition: 'bottom',
                    speed: 1000,
                    mouseDrag: true,
                };
            if ($parent.hasClass('bilgins-testimonials-carousel')) {
                bilgins_tns_options.autoHeight = true;
                bilgins_tns_options.center = true;
                bilgins_tns_options.nav = true;
                bilgins_tns_options.loop = true;
                bilgins_tns_options.gutter = 40;
            }
            bilgins_tns[$this.attr('id')] = tns(bilgins_tns_options);
            if ($parent.hasClass('bilgins-testimonials-carousel')) {
                bilgins_tns[$this.attr('id')].events.on('transitionEnd', bilgins.sScroll.layout);
            }
        });
    }
    if (jQuery('.bilgins-counter-item').length) {
        if ('IntersectionObserver' in window) {
            bilgins.counter_observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!jQuery(entry.target).hasClass('is-counted')) {
                        if (entry.isIntersecting) {
                            jQuery(entry.target).addClass('is-counted');
                            bilgins.counter(jQuery(entry.target).children('.bilgins-counter-value')[0]);
                        }
                    }
                });
            });
        } else {
            jQuery('.bilgins-counter-item').each(function() {
                jQuery(this).addClass('is-counted');
                bilgins.counter(jQuery(this).children('.bilgins-counter-value')[0]);
            });
        }
    }
    if (jQuery('.bilgins-progress-item').length) {
        jQuery('.bilgins-progress-item').each(function() {
            bilgins.progress.init(this);
        });
    }
    if (jQuery('.bilgins-gallery-bricks.is-2x3').length) {
        jQuery('.bilgins-gallery-bricks.is-2x3').each(function() {
            let $this = jQuery(this),
                count = 0;
            $this.find('.bilgins-gallery-item').each(function() {
                count++;
                if (count > 5) {
                    count = 1;
                }
                if (count == 1 || count == 2) {
                    jQuery(this).addClass('is-large');
                } else {
                    jQuery(this).addClass('is-small');
                }
            });
        });
    }
    if (jQuery('.lazy').length) {
        jQuery('.lazy').Lazy({
            scrollDirection: 'vertical',
            effect: 'fadeIn',
            visibleOnly: true,
            onError: function(element) {
                console.log('Error Loading ' + element.data('src'));
            },
            afterLoad: function(element) {
                bilgins.layout();
            },
        });
    }
    if (jQuery('.bilgins-justified-gallery').length) {
        jQuery('.bilgins-justified-gallery').justifiedGallery({
            rowHeight: 250,
            captions: false,
            lastRow: 'nojustify',
            margins: 10
        });
    }
    if (jQuery('.bilgins-lightbox-link').length) {
        jQuery('.bilgins-lightbox-link').each(function() {
            let $this = jQuery(this),
                this_item = {},
                this_gallery = 'default';
            if ($this.data('size')) {
                let item_size = $this.attr('data-size').split('x');
                this_item.w = item_size[0];
                this_item.h = item_size[1];
            }
            this_item.src = $this.attr('href');
            if ($this.data('caption')) {
                this_item.title = $this.data('caption');
            }
            if ($this.data('gallery')) {
                this_gallery = $this.data('gallery');
            }
            if (bilgins.pswp.gallery[this_gallery]) {
                bilgins.pswp.gallery[this_gallery].push(this_item);
            } else {
                bilgins.pswp.gallery[this_gallery] = [];
                bilgins.pswp.gallery[this_gallery].push(this_item);
            }
            $this.data('count', bilgins.pswp.gallery[this_gallery].length - 1);
        });
        jQuery(document).on('click', '.bilgins-lightbox-link', function(e) {
            e.preventDefault();
            let $this = jQuery(this),
                this_index = parseInt($this.data('count'), 10),
                this_gallery = 'default',
                this_options = {
                    index: this_index,
                    bgOpacity: 0.85,
                    showHideOpacity: true,
                    getThumbBoundsFn: function(index) {
                        var thumbnail = $this[0],
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();
                        return {
                            x: rect.left,
                            y: rect.top + pageYScroll,
                            w: rect.width
                        };
                    },
                };
            if ($this.data('gallery')) {
                this_gallery = $this.data('gallery');
            }
            bilgins.pswp.lightbox = new PhotoSwipe($bilgins_body.find('.pswp')[0], PhotoSwipeUI_Default, bilgins.pswp.gallery[this_gallery], this_options);
            bilgins.pswp.lightbox.init();
        });
    }
    jQuery('.bilgins-spacer').each(function() {
        jQuery(this).height(jQuery(this).data('size'));
    });
    bilgins.layout();
    bilgins.loading();
}
bilgins.layout = function() {
    if ($bilgins_window.width() > 760) {
        $bilgins_body.removeClass('bilgins-mobile-menu-shown');
    }
    if (typeof $bilgins_header_holder !== 'undefined') {
        $bilgins_header_holder.height($bilgins_header.height());
    }
    if (jQuery('#bilgins-home-works').length) {
        jQuery('#bilgins-home-works').css('padding-top', $bilgins_header.height() + 'px');
    }
    if (jQuery('#bilgins-home-contacts').length) {
        jQuery('#bilgins-home-contacts').css('padding-top', $bilgins_header.height() + 'px');
    }
    if (jQuery('.is-masonry').length) {
        jQuery('.is-masonry').each(function() {
            jQuery(this).masonry('layout');
        });
    }
    if (jQuery('.bilgins-service-item').length) {
        jQuery('.bilgins-service-item').each(function() {
            let $this = jQuery(this),
                $prev = $this.prev('.bilgins-service-item');
            if ($bilgins_window.width() > 1200) {
                if ($prev.length) {
                    var set_y = -1 * ($prev.height() - $prev.find('.bilgins-service-item__content').height()) / 2;
                    $this.css('margin-top', set_y + 'px');
                }
            } else {
                $this.css('margin-top', '0px');
            }
        });
    }
    if (jQuery('.bilgins-row-fullheight').length) {
        jQuery('.bilgins-row-fullheight').each(function() {
            var $this = jQuery(this),
                minHeight = $bilgins_window.height();
            if ($this.hasClass('exclude-header')) {
                minHeight = minHeight - $bilgins_header.height();
            }
            if ($this.hasClass('exclude-footer')) {
                minHeight = minHeight - $bilgins_footer.height();
            }
            $this.css('min-height', minHeight + 'px');
        });
    }
    $bilgins_header.find('.bilgins-menu-offset').removeClass('bilgins-menu-offset');
    $bilgins_header.find('.sub-menu').each(function() {
        var $this = jQuery(this),
            this_left = $this.offset().left,
            this_left_full = $this.offset().left + $this.width() + parseInt($this.css('padding-left'), 10) + parseInt($this.css('padding-right'), 10);
        if (this_left_full > $bilgins_window.width()) {
            $this.addClass('bilgins-menu-offset');
        }
    });
    if (jQuery('.bilgins-progress-item').length) {
        jQuery('.bilgins-progress-item.is-done').each(function() {
            bilgins.progress.layout(this);
        });
    }
    bilgins.old_scroll_top = $bilgins_window.scrollTop();
    bilgins.sScroll.layout();
}
bilgins.loading = function() {
    if (jQuery('.bilgins-page-title-wrap:not(.is-inactive)').length) {
        gsap.to('.bilgins-page-title-wrap:not(.is-inactive)', 0.5, {
            css: {
                top: '100%',
            },
            onComplete: function() {
                jQuery('.bilgins-page-title-wrap:not(.is-inactive)').addClass('is-loaded');
            }
        });
    }
    if (jQuery('.bilgins-back-wrap:not(.is-inactive)').length) {
        gsap.to('.bilgins-back-wrap:not(.is-inactive)', 0.5, {
            css: {
                top: '100%',
            },
            onComplete: function() {
                jQuery('.bilgins-back-wrap:not(.is-inactive)').addClass('is-loaded');
            }
        });
    }
    if ($bilgins_body.hasClass('bilgins-home-template')) {
        gsap.to('.bilgins-home-link--works:not(.is-inactive)', 0.5, {
            css: {
                top: '100%',
            },
            onComplete: function() {
                jQuery('.bilgins-home-link--works:not(.is-inactive)').addClass('is-loaded');
            }
        });
        gsap.to('.bilgins-home-link--contacts:not(.is-inactive)', 0.5, {
            css: {
                top: '100%',
            },
            onComplete: function() {
                jQuery('.bilgins-home-link--contacts:not(.is-inactive)').addClass('is-loaded');
            }
        });
    }
    let logoDelay = bilgins.config.content_load_delay;
    if ($bilgins_window.width() < 760) {
        logoDelay = 0.1;
    }
    gsap.from('.bilgins-logo', {
        x: '-50%',
        opacity: 0,
        duration: 0.5,
        delay: logoDelay
    });
    gsap.from('.bilgins-mobile-header > a', {
        x: 10,
        y: -10,
        opacity: 0,
        duration: 0.2,
        delay: 0.1,
        stagger: 0.1
    }, );
    gsap.from('.bilgins-nav ul.main-menu > li', {
        x: -10,
        y: -10,
        opacity: 0,
        duration: 0.2,
        delay: bilgins.config.content_load_delay,
        stagger: 0.1
    }, );
    if (jQuery('.bilgins-footer__socials').length) {
        if ($bilgins_window.width() < 760) {
            gsap.from('.bilgins-footer__socials li', {
                x: 0,
                y: 20,
                opacity: 0,
                duration: 0.2,
                delay: bilgins.config.content_load_delay,
                stagger: 0.1
            }, );
        } else {
            gsap.from('.bilgins-footer__socials li', {
                x: -10,
                y: -10,
                opacity: 0,
                duration: 0.2,
                delay: bilgins.config.content_load_delay,
                stagger: 0.1
            }, );
        }
    }
    if (jQuery('.bilgins-footer__copyright').length) {
        if ($bilgins_window.width() < 760) {
            gsap.from('.bilgins-footer__copyright', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                delay: bilgins.config.content_load_delay
            });
        } else {
            gsap.from('.bilgins-footer__copyright', {
                x: '50%',
                opacity: 0,
                duration: 0.5,
                delay: bilgins.config.content_load_delay
            });
        }
    }
    if (jQuery('.bilgins-page-background').length) {
        gsap.from('.bilgins-page-background', {
            scale: 1.05,
            opacity: 0,
            duration: 1,
            delay: bilgins.config.content_load_delay,
        });
    }
    if (jQuery('.bilgins-content').length) {
        let contentDelay = bilgins.config.content_load_delay * 1.7;
        if ($bilgins_window.width() < 760) {
            contentDelay = 0.5;
        }
        gsap.from('.bilgins-content', {
            opacity: 0,
            y: 100,
            duration: 1,
            delay: contentDelay,
            onStart: function() {
                bilgins.content_loaded();
            }
        });
    }
    if (jQuery('.bilgins-albums-carousel').length) {
        if (jQuery('.bilgins-albums-carousel').hasClass('is-vertical')) {
            gsap.from('.bilgins-album-item__inner', {
                opacity: 0,
                y: 100,
                duration: 1,
                stagger: 0.1,
                delay: bilgins.config.content_load_delay * 1.7
            });
        } else {
            gsap.from('.bilgins-album-item__inner', {
                opacity: 0,
                x: 100,
                duration: 1,
                stagger: 0.1,
                delay: bilgins.config.content_load_delay * 1.7
            });
        }
        if (bilgins_ribbon.$bar) {
            gsap.from(bilgins_ribbon.$bar[0], {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: bilgins.config.content_load_delay * 1.7
            });
        }
    }
    if (jQuery('.bilgins-albums-slider').length) {
        if (jQuery('.bilgins-album-item__title').length) {
            gsap.to('.bilgins-album-item__title', {
                css: {
                    top: '100%',
                },
                delay: 0.5,
                duration: 1,
                onComplete: function() {
                    jQuery('.bilgins-album-item__title').addClass('is-loaded');
                }
            });
        }
        if (jQuery('.bilgins-album-item__explore').length) {
            gsap.to('.bilgins-album-item__explore', {
                css: {
                    top: '100%',
                },
                delay: 0.5,
                duration: 1,
                onComplete: function() {
                    jQuery('.bilgins-album-item__explore').addClass('is-loaded');
                }
            });
        }
        gsap.fromTo('.bilgins-slider-prev', {
            x: -50,
        }, {
            x: 0,
            delay: bilgins.config.content_load_delay * 1.7,
            duration: 0.5,
            onStart: function() {
                jQuery('.bilgins-slider-prev').addClass('is-loaded');
            }
        });
        gsap.fromTo('.bilgins-slider-next', {
            x: 50,
        }, {
            x: 0,
            delay: bilgins.config.content_load_delay * 1.7,
            duration: 0.5,
            onStart: function() {
                jQuery('.bilgins-slider-next').addClass('is-loaded');
            }
        });
        gsap.from('.bilgins-album-item__image', {
            scale: 1.05,
            opacity: 0,
            duration: 1,
            delay: bilgins.config.content_load_delay * 1.7,
        });
    }
    setTimeout("$bilgins_body.addClass('is-loaded')", 1500);
}
bilgins.change_location = function(this_href) {
    bilgins.cursor.$el.addClass('is-unloading');
    $bilgins_body.addClass('is-locked');
    if ($bilgins_window.width() < 760 && $bilgins_body.hasClass('bilgins-mobile-menu-shown')) {
        let setDelay = 0;
        $bilgins_body.addClass('is-locked');
        if (jQuery('.bilgins-mobile-menu').find('.is-open').length) {
            jQuery('.bilgins-mobile-menu').find('ul.sub-menu').slideUp(300);
            setDelay = 0.3;
        }
        gsap.fromTo('.bilgins-mobile-menu ul.main-menu > li', {
            x: 0,
            y: 0,
            opacity: 1
        }, {
            x: 0,
            y: -40,
            opacity: 0,
            duration: 0.2,
            delay: setDelay,
            stagger: 0.1,
            onComplete: function() {
                window.location = this_href;
            }
        }, );
        return false;
    }
    $bilgins_body.removeClass('is-loaded');
    if ($bilgins_body.hasClass('bilgins-aside-shown')) {
        $bilgins_body.removeClass('bilgins-aside-shown');
    }
    if ($bilgins_body.hasClass('bilgins-mobile-menu-shown')) {
        $bilgins_body.removeClass('bilgins-mobile-menu-shown');
    }
    if (jQuery('.bilgins-content').length) {
        gsap.to('.bilgins-content', {
            css: {
                opacity: 0,
                y: -100,
            },
            duration: 0.6,
        });
    }
    if (jQuery('.bilgins-albums-carousel').length) {
        if (bilgins_ribbon.type == 'vertical') {
            gsap.to('.bilgins-album-item__inner.is-inview', {
                css: {
                    opacity: 0,
                    y: -100,
                },
                stagger: 0.1,
                delay: 0.5,
                duration: 0.6,
            });
        } else {
            gsap.to('.bilgins-album-item__inner.is-inview', {
                css: {
                    opacity: 0,
                    x: -100,
                },
                stagger: 0.1,
                delay: 0.5,
                duration: 0.6,
            });
        }
        if (bilgins_ribbon.$bar) {
            gsap.to(bilgins_ribbon.$bar[0], {
                opacity: 0,
                y: 20,
                duration: 1,
            });
        }
    }
    if (jQuery('.bilgins-albums-slider').length) {
        if (jQuery('.bilgins-album-item__title').length) {
            setTimeout("jQuery('.bilgins-album-item__title').removeClass('is-loaded')", 300);
            gsap.to('.bilgins-album-item__title', {
                css: {
                    top: '0%',
                },
                delay: 1.2,
                duration: 1,
            });
        }
        if (jQuery('.bilgins-album-item__explore').length) {
            setTimeout("jQuery('.bilgins-album-item__explore').removeClass('is-loaded')", 300);
            gsap.to('.bilgins-album-item__explore', {
                css: {
                    top: '200%',
                },
                delay: 1.2,
                duration: 1,
            });
        }
        gsap.fromTo('.bilgins-slider-prev', {
            x: 0,
        }, {
            x: -50,
            duration: 0.5,
            onStart: function() {
                jQuery('.bilgins-slider-prev').removeClass('is-loaded');
            }
        });
        gsap.fromTo('.bilgins-slider-next', {
            x: 0,
        }, {
            x: 50,
            duration: 0.5,
            onStart: function() {
                jQuery('.bilgins-slider-next').removeClass('is-loaded');
            }
        });
        gsap.to('.bilgins-album-item__image', {
            css: {
                scale: 1.05,
                opacity: 0,
            },
            duration: 1,
            delay: bilgins.config.content_load_delay * 1.7,
        });
    }
    gsap.to('.bilgins-logo', {
        css: {
            x: '-50%',
            opacity: 0,
        },
        duration: 0.5,
        delay: 0.5
    });
    gsap.to('.bilgins-nav ul.main-menu > li', {
        css: {
            x: -10,
            y: -10,
            opacity: 0,
        },
        duration: 0.2,
        delay: 0.5,
        stagger: 0.1
    }, );
    gsap.to('.bilgins-mobile-header > a', {
        x: -10,
        y: -10,
        opacity: 0,
        duration: 0.2,
        delay: 0.5,
        stagger: 0.1
    }, );
    if (jQuery('.bilgins-footer__socials').length) {
        gsap.to('.bilgins-footer__socials li', {
            css: {
                x: -10,
                y: -10,
                opacity: 0,
            },
            duration: 0.2,
            delay: 0.5,
            stagger: 0.1
        }, );
    }
    if (jQuery('.bilgins-footer__copyright').length) {
        gsap.to('.bilgins-footer__copyright', {
            css: {
                x: '50%',
                opacity: 0,
            },
            duration: 0.5,
            delay: 0.5
        });
    }
    if (jQuery('.bilgins-page-title-wrap').length) {
        setTimeout("jQuery('.bilgins-page-title-wrap:not(.is-inactive)').removeClass('is-loaded')", 600);
        gsap.to('.bilgins-page-title-wrap', 0.5, {
            css: {
                top: 0,
            },
            delay: 1.1,
        });
    }
    if (jQuery('.bilgins-back-wrap').length) {
        setTimeout("jQuery('.bilgins-back-wrap:not(.is-inactive)').removeClass('is-loaded')", 600);
        gsap.to('.bilgins-back-wrap', 0.5, {
            css: {
                top: '200%',
            },
            delay: 1.1,
        });
    }
    if ($bilgins_body.hasClass('bilgins-home-template')) {
        if (!$bilgins_body.hasClass('bilgins-home-state--contacts') && !$bilgins_body.hasClass('bilgins-home-state--works')) {
            var links_delay = 0.5,
                links_timeout = 0;
        } else {
            var links_delay = 1.1,
                links_timeout = 600;
        }
        setTimeout("jQuery('.bilgins-home-link--works:not(.is-inactive)').removeClass('is-loaded')", links_timeout);
        gsap.to('.bilgins-home-link--works:not(.is-inactive)', 0.5, {
            css: {
                top: 0,
            },
            delay: links_delay,
        });
        setTimeout("jQuery('.bilgins-home-link--contacts:not(.is-inactive)').removeClass('is-loaded')", links_timeout);
        gsap.to('.bilgins-home-link--contacts:not(.is-inactive)', 0.5, {
            css: {
                top: '200%',
            },
            delay: links_delay,
        });
    }
    if (jQuery('.bilgins-page-background').length) {
        gsap.to('.bilgins-page-background', {
            css: {
                scale: 1.05,
                opacity: 0,
            },
            duration: 1,
            delay: bilgins.config.content_load_delay * 1.7,
        });
    }
    setTimeout(function() {
        window.location = this_href;
    }, 2100, this_href);
}
jQuery(document).ready(function() {
    bilgins.init();
});
$bilgins_window.on('resize', function() {
    bilgins.layout();
    setTimeout(bilgins.layout(), 500);
}).on('load', function() {
    bilgins.layout();
}).on('scroll', function() {
    if ($bilgins_body.hasClass('bilgins-aside-shown')) {
        $bilgins_window.scrollTop(bilgins.old_scroll_top);
    }
    if ($bilgins_body.hasClass('bilgins-mobile-menu-shown')) {
        $bilgins_window.scrollTop(bilgins.old_scroll_top);
    }
    bilgins.sScroll.target = $bilgins_window.scrollTop();
    if (bilgins.sScroll.target > ($bilgins_scroll.height() - $bilgins_window.height())) {
        bilgins.sScroll.layout();
    }
    if (jQuery('.bilgins-back.is-to-top:not(.in-action)').length) {
        if ($bilgins_window.scrollTop() > $bilgins_window.height() / 2) {
            $bilgins_body.addClass('has-to-top');
        } else {
            $bilgins_body.removeClass('has-to-top');
        }
    }
});
jQuery(document).on('keyup', function(e) {
    switch (e.keyCode) {
        case 27:
            if ($bilgins_body.hasClass('bilgins-aside-shown')) {
                $bilgins_body.removeClass('bilgins-aside-shown');
            }
            break;
        default:
            break;
    }
});
bilgins.content_loaded = function() {
    if (jQuery('.bilgins-counter-item').length) {
        if ('IntersectionObserver' in window) {
            jQuery('.bilgins-counter-item').each(function() {
                bilgins.counter_observer.observe(this);
            });
        }
    }
    if (jQuery('.bilgins-progress-item').length) {
        if ('IntersectionObserver' in window) {
            jQuery('.bilgins-progress-item').each(function() {
                bilgins.progress.observer.observe(this);
            });
        }
    }
    bilgins.layout();
}
window.onunload = function() {};
jQuery(window).on('pageshow', function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload()
    }
});