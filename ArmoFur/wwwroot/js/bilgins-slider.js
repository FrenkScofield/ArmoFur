/** 
 * Author: Shadow Themes
 * Author URL: http://shadow-themes.com
 */
"use strict";

let bilgins_slider = {
    isDown: false,
    isAnimate: false,
    $el: jQuery('.bilgins-albums-slider'),
    type: 'simple',
    indexPrev: 0,
    indexActive: 1,
    indexNext: 2,
    target: 0,
    direction: 'init',
    isTouch: false,
    drag: {
        start: 0,
        start_pos: 0,
        current: 0,
        path: 0,
        imgPrev: 0,
        imgActive: 0,
        imgNext: 0,
        percent: 0
    },
    init: function() {
        // Update Options
        if (bilgins_slider.$el.hasClass('is-parallax'))
            bilgins_slider.type = 'parallax';
        if (bilgins_slider.$el.hasClass('is-fade')) {
            bilgins_slider.type = 'fade';
            bilgins_slider.itemsCount = (bilgins_slider.$el.find('.bilgins-album-item').length - 1);
            bilgins_slider.indexPrev = bilgins_slider.itemsCount;
            bilgins_slider.indexActive = 0;
            bilgins_slider.indexNext = 1;
        } else {
            bilgins_slider.itemsCount = (bilgins_slider.$el.find('.bilgins-album-item').length + 1);
        }

        // Set Images
        bilgins_slider.$el.find('[data-src]').each(function() {
            jQuery(this).css('background-image', 'url(' + jQuery(this).data('src') + ')');
        });

        // Append Last slide as First
        if (bilgins_slider.type !== 'fade') {
            var $first_slide = bilgins_slider.$el.find('.bilgins-album-item:first-child').clone(),
                $last_slide = bilgins_slider.$el.find('.bilgins-album-item:last-child').clone();
            $first_slide.addClass('is-copy').appendTo(bilgins_slider.$el);
            $last_slide.addClass('is-copy').prependTo(bilgins_slider.$el);
            bilgins_slider.$el.css('transform', 'translate(-' + $bilgins_window.width() + 'px, 0px)');
        } else {
            bilgins_slider.$el.find('.bilgins-album-item__image').css('transform', 'scale(1.05)');
            bilgins_slider.$el.find('.bilgins-album-item').css('opacity', '0');
        }

        // Layout
        bilgins_slider.layout();

        // Bind Mouse Actions
        bilgins_slider.$el.on('mousedown', function(e) {
            e.preventDefault();
            if (bilgins_slider.isTouch) {
                bilgins_slider.isTouch = false;
            }
            if (!bilgins_slider.isAnimate) {
                bilgins_slider.isDown = true;
                bilgins_slider.drag.start = e.clientX;
                if (bilgins_slider.type !== 'fade') {
                    let posMatrix = bilgins_slider.$el.css('transform').split(',');
                    bilgins_slider.drag.start_pos = parseInt(posMatrix[4], 10);
                }
            }
        }).on('mouseup', function() {
            bilgins_slider.isDown = false;
            bilgins_slider.action.dragBreak();
        }).on('mouseleave', function() {
            bilgins_slider.isDown = false;
            bilgins_slider.action.dragBreak();
        }).on('mousemove', function(e) {
            e.preventDefault();
            if (bilgins_slider.isDown) {
                if (bilgins_slider.type == 'fade') {
                    // Fade Movement
                    bilgins_slider.drag.current = bilgins_slider.drag.start - e.clientX;
                    bilgins_slider.drag.percent = parseFloat(bilgins_slider.drag.current / $bilgins_window.width()).toFixed(2);
                    if (bilgins_slider.drag.percent < 0) {
                        bilgins_slider.drag.path = 'prev';
                        bilgins_slider.drag.percent = -1 * bilgins_slider.drag.percent;
                        let zoom_prev = 1.05 - (bilgins_slider.drag.percent * 0.05);
                        bilgins_slider.$el_prev.css('opacity', bilgins_slider.drag.percent);
                        bilgins_slider.$prevImage.css('transform', 'scale(' + zoom_prev + ')');
                    } else {
                        bilgins_slider.drag.path = 'next';
                        let zoom_next = 1.05 - (bilgins_slider.drag.percent * 0.05);
                        bilgins_slider.$el_next.css('opacity', bilgins_slider.drag.percent);
                        bilgins_slider.$nextImage.css('transform', 'scale(' + zoom_next + ')');
                    }
                    let zoom_active = 1 + (bilgins_slider.drag.percent * 0.05);
                    bilgins_slider.$el_active.css('opacity', 1 - bilgins_slider.drag.percent);
                    bilgins_slider.$activeImage.css('transform', 'scale(' + zoom_active + ')');
                } else {
                    // Slide Movement
                    bilgins_slider.drag.current = bilgins_slider.drag.start - e.clientX;
                    bilgins_slider.drag.path = bilgins_slider.drag.start_pos - bilgins_slider.drag.current;

                    if (bilgins_slider.type == 'parallax') {
                        bilgins_slider.drag.imgPrev = $bilgins_window.width() / 2 + bilgins_slider.drag.current / 2,
                            bilgins_slider.drag.imgActive = bilgins_slider.drag.current / 2,
                            bilgins_slider.drag.imgNext = -1 * ($bilgins_window.width() / 2 - bilgins_slider.drag.current / 2);

                        bilgins_slider.$prevImage.css('transform', 'translateX(' + bilgins_slider.drag.imgPrev + 'px)');
                        bilgins_slider.$activeImage.css('transform', 'translateX(' + bilgins_slider.drag.imgActive + 'px)');
                        bilgins_slider.$nextImage.css('transform', 'translateX(' + bilgins_slider.drag.imgNext + 'px)');
                    }

                    bilgins_slider.$el.css('transform', 'translate(' + bilgins_slider.drag.path + 'px, 0px)');
                }
            }
        });

        // Bind Touch Events
        bilgins_slider.$el[0].addEventListener('touchstart', function(e) {
            if (!bilgins_slider.isTouch) {
                bilgins_slider.isTouch = true;
            }
            if (!bilgins_slider.isAnimate) {
                bilgins_slider.isDown = true;
                bilgins_slider.drag.start = e.touches[0].clientX;
                if (bilgins_slider.type !== 'fade') {
                    let posMatrix = bilgins_slider.$el.css('transform').split(',');
                    bilgins_slider.drag.start_pos = parseInt(posMatrix[4], 10);
                }
            }
        }, false);
        bilgins_slider.$el[0].addEventListener('touchmove', function(e) {
            e.preventDefault();
            if (bilgins_slider.isDown) {
                if (bilgins_slider.type == 'fade') {
                    // Fade Movement
                    bilgins_slider.drag.current = bilgins_slider.drag.start - e.touches[0].clientX;
                    bilgins_slider.drag.percent = parseFloat(bilgins_slider.drag.current / $bilgins_window.width()).toFixed(2);
                    if (bilgins_slider.drag.percent < 0) {
                        bilgins_slider.drag.path = 'prev';
                        bilgins_slider.drag.percent = -1 * bilgins_slider.drag.percent;
                        let zoom_prev = 1.05 - (bilgins_slider.drag.percent * 0.05);
                        bilgins_slider.$el_prev.css('opacity', bilgins_slider.drag.percent);
                        bilgins_slider.$prevImage.css('transform', 'scale(' + zoom_prev + ')');
                    } else {
                        bilgins_slider.drag.path = 'next';
                        let zoom_next = 1.05 - (bilgins_slider.drag.percent * 0.05);
                        bilgins_slider.$el_next.css('opacity', bilgins_slider.drag.percent);
                        bilgins_slider.$nextImage.css('transform', 'scale(' + zoom_next + ')');
                    }
                    let zoom_active = 1 + (bilgins_slider.drag.percent * 0.05);
                    bilgins_slider.$el_active.css('opacity', 1 - bilgins_slider.drag.percent);
                    bilgins_slider.$activeImage.css('transform', 'scale(' + zoom_active + ')');
                } else {
                    // Slide Movement
                    bilgins_slider.drag.current = bilgins_slider.drag.start - e.touches[0].clientX;
                    bilgins_slider.drag.path = bilgins_slider.drag.start_pos - bilgins_slider.drag.current;

                    if (bilgins_slider.type == 'parallax') {
                        bilgins_slider.drag.imgPrev = $bilgins_window.width() / 2 + bilgins_slider.drag.current / 2,
                            bilgins_slider.drag.imgActive = bilgins_slider.drag.current / 2,
                            bilgins_slider.drag.imgNext = -1 * ($bilgins_window.width() / 2 - bilgins_slider.drag.current / 2);

                        bilgins_slider.$prevImage.css('transform', 'translateX(' + bilgins_slider.drag.imgPrev + 'px)');
                        bilgins_slider.$activeImage.css('transform', 'translateX(' + bilgins_slider.drag.imgActive + 'px)');
                        bilgins_slider.$nextImage.css('transform', 'translateX(' + bilgins_slider.drag.imgNext + 'px)');
                    }

                    bilgins_slider.$el.css('transform', 'translate(' + bilgins_slider.drag.path + 'px, 0px)');
                }
            }
        }, false);
        bilgins_slider.$el[0].addEventListener('touchend', function(e) {
            bilgins_slider.isDown = false;
            bilgins_slider.action.dragBreak();
        }, false);

        // Bind Button Events
        bilgins_slider.$el.parent().find('a.bilgins-slider-prev').on('click', function() {
            if (!bilgins_slider.isAnimate) {
                bilgins_slider.action.from = 'button';
                bilgins_slider.action.prev();
            }
        });
        bilgins_slider.$el.parent().find('a.bilgins-slider-next').on('click', function() {
            if (!bilgins_slider.isAnimate) {
                bilgins_slider.action.from = 'button';
                bilgins_slider.action.next();
            }
        });
    },
    layout: function() {
        if (bilgins_slider.type !== 'fade') {
            let setWidth = $bilgins_window.width() * bilgins_slider.itemsCount;
            bilgins_slider.$el.width(setWidth);
        }
        bilgins_slider.action.from = 'layout';
        bilgins_slider.action.set();
    },
    action: {
        from: '',
        dragBreak: function() {
            if (bilgins_slider.type == 'fade') {
                if (bilgins_slider.drag.percent > 0.25) {
                    bilgins_slider.action.from = 'slide';
                    if (bilgins_slider.drag.path == 'prev') {
                        bilgins_slider.action.prev();
                    } else {
                        bilgins_slider.action.next();
                    }
                } else if (bilgins_slider.drag.percent !== 0) {
                    bilgins_slider.action.from = 'layout';
                    bilgins_slider.action.set();
                }
                bilgins_slider.drag.percent = 0;
            } else {
                if (bilgins_slider.drag.current > 100) {
                    bilgins_slider.action.from = 'slide';
                    bilgins_slider.action.next();
                } else if (bilgins_slider.drag.current < -100) {
                    bilgins_slider.action.from = 'slide';
                    bilgins_slider.action.prev();
                } else if (bilgins_slider.drag.current !== 0) {
                    bilgins_slider.action.from = 'layout';
                    bilgins_slider.action.set();
                }
            }
            bilgins_slider.drag.percent = bilgins_slider.drag.current = 0;

        },
        next: function() {
            bilgins_slider.indexPrev++,
                bilgins_slider.indexActive++,
                bilgins_slider.indexNext++;
            bilgins_slider.direction = 'next';

            if (bilgins_slider.indexPrev > bilgins_slider.itemsCount) {
                bilgins_slider.indexPrev = 0;
            }
            if (bilgins_slider.indexActive > bilgins_slider.itemsCount) {
                bilgins_slider.indexActive = 0;
            }
            if (bilgins_slider.indexNext > bilgins_slider.itemsCount) {
                bilgins_slider.indexNext = 0;
            }
            bilgins_slider.action.set();
        },
        prev: function() {
            bilgins_slider.indexPrev--,
                bilgins_slider.indexActive--,
                bilgins_slider.indexNext--;
            bilgins_slider.direction = 'prev';

            if (bilgins_slider.indexPrev < 0) {
                bilgins_slider.indexPrev = bilgins_slider.itemsCount;
            }
            if (bilgins_slider.indexActive < 0) {
                bilgins_slider.indexActive = bilgins_slider.itemsCount;
            }
            if (bilgins_slider.indexNext < 0) {
                bilgins_slider.indexNext = bilgins_slider.itemsCount;
            }
            bilgins_slider.action.set();
        },
        set: function() {
            bilgins_slider.isAnimate = true;

            if (bilgins_slider.type == 'fade') {
                // Fading Layout Set
                bilgins_slider.$el_prev = bilgins_slider.$el.find('.bilgins-album-item').eq(bilgins_slider.indexPrev);
                bilgins_slider.$el_active = bilgins_slider.$el.find('.bilgins-album-item').eq(bilgins_slider.indexActive);
                bilgins_slider.$el_next = bilgins_slider.$el.find('.bilgins-album-item').eq(bilgins_slider.indexNext);

                bilgins_slider.$prevImage = bilgins_slider.$el_prev.find('.bilgins-album-item__image');
                bilgins_slider.$activeImage = bilgins_slider.$el_active.find('.bilgins-album-item__image');
                bilgins_slider.$nextImage = bilgins_slider.$el_next.find('.bilgins-album-item__image');

                bilgins_slider.$el.find('.is-prev').removeClass('is-prev');
                bilgins_slider.$el.find('.is-active').removeClass('is-active');
                bilgins_slider.$el.find('.is-next').removeClass('is-next');

                bilgins_slider.$el_prev.addClass('is-prev');
                bilgins_slider.$el_active.addClass('is-active');
                bilgins_slider.$el_next.addClass('is-next');

                let slideEasing = Power1.easeInOut,
                    startOpacity = 0,
                    startOpacityInactive = 1,
                    startScale = 1.05,
                    startScaleInactive = 1,
                    $inActive = (bilgins_slider.direction == 'next' ? bilgins_slider.$el_prev : bilgins_slider.$el_next),
                    $inActiveImage = (bilgins_slider.direction == 'next' ? bilgins_slider.$prevImage : bilgins_slider.$nextImage);

                if (bilgins_slider.action.from == 'slide') {
                    slideEasing = Power1.easeOut;
                    startOpacity = parseFloat(bilgins_slider.$el_active.css('opacity'));
                    startOpacityInactive = parseFloat($inActive.css('opacity'));
                    let scaleMatrix = bilgins_slider.$activeImage.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
                    startScale = parseFloat(scaleMatrix[0]);
                    scaleMatrix = $inActiveImage.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
                    startScaleInactive = parseFloat(scaleMatrix[0]);
                }
                if (bilgins_slider.action.from == 'layout') {
                    $inActive = (bilgins_slider.drag.path == 'next' ? bilgins_slider.$el_next : bilgins_slider.$el_prev),
                        $inActiveImage = (bilgins_slider.drag.path == 'next' ? bilgins_slider.$nextImage : bilgins_slider.$prevImage);
                    startOpacity = parseFloat(bilgins_slider.$el_active.css('opacity'));
                    startOpacityInactive = parseFloat($inActive.css('opacity'));
                    let scaleMatrix = bilgins_slider.$activeImage.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
                    startScale = parseFloat(scaleMatrix[0]);
                    scaleMatrix = $inActiveImage.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
                    startScaleInactive = parseFloat(scaleMatrix[0]);
                }

                gsap.fromTo(bilgins_slider.$el_active, {
                    css: {
                        opacity: startOpacity
                    }
                }, {
                    css: {
                        opacity: 1
                    },
                    duration: 1,
                    ease: slideEasing,
                    onComplete: function() {
                        bilgins_slider.action.from = '';
                        bilgins_slider.isAnimate = false;
                    }
                });
                gsap.fromTo(bilgins_slider.$activeImage, {
                    scale: startScale
                }, {
                    scale: 1,
                    duration: 1,
                    ease: slideEasing,
                });
                gsap.fromTo($inActive, {
                    css: {
                        opacity: startOpacityInactive
                    }
                }, {
                    css: {
                        opacity: 0,
                    },
                    duration: 1,
                    ease: slideEasing
                });
                gsap.fromTo($inActiveImage, {
                    scale: startScaleInactive
                }, {
                    scale: 1.05,
                    duration: 1,
                    ease: slideEasing
                });
            } else {
                // Sliding Layout Set
                if (bilgins_slider.action.from == 'button') {
                    if (bilgins_slider.direction == 'next' && bilgins_slider.indexActive == bilgins_slider.itemsCount) {
                        bilgins_slider.indexPrev = 0;
                        bilgins_slider.indexActive = 1;
                        bilgins_slider.indexNext = 2;
                        bilgins_slider.$el.css('transform', 'translate(0px, 0px)');
                    }
                    if (bilgins_slider.direction == 'prev' && bilgins_slider.indexActive == 0) {
                        bilgins_slider.indexPrev = bilgins_slider.itemsCount - 2;
                        bilgins_slider.indexActive = bilgins_slider.itemsCount - 1;
                        bilgins_slider.indexNext = bilgins_slider.itemsCount;
                        bilgins_slider.$el.css('transform', 'translate(-' + $bilgins_window.width() * bilgins_slider.itemsCount + 'px, 0px)');
                    }
                }

                bilgins_slider.target = $bilgins_window.width() * bilgins_slider.indexActive;

                bilgins_slider.$el_prev = bilgins_slider.$el.find('.bilgins-album-item').eq(bilgins_slider.indexPrev);
                bilgins_slider.$el_active = bilgins_slider.$el.find('.bilgins-album-item').eq(bilgins_slider.indexActive);
                bilgins_slider.$el_next = bilgins_slider.$el.find('.bilgins-album-item').eq(bilgins_slider.indexNext);

                if (bilgins_slider.type == 'parallax') {
                    bilgins_slider.$prevImage = bilgins_slider.$el_prev.find('.bilgins-album-item__image');
                    bilgins_slider.$activeImage = bilgins_slider.$el_active.find('.bilgins-album-item__image');
                    bilgins_slider.$nextImage = bilgins_slider.$el_next.find('.bilgins-album-item__image');
                }

                let posMatrix = bilgins_slider.$el.css('transform').split(',');

                let slideEasing = Power2.easeInOut;
                if (bilgins_slider.action.from == 'slide') {
                    slideEasing = Power2.easeOut
                }
                if (bilgins_slider.type == 'parallax') {
                    // Images Parallax Effect
                    if (bilgins_slider.direction == 'next' && bilgins_slider.action.from !== 'layout') {
                        if (bilgins_slider.drag.imgNext !== 0) {
                            var active_from = bilgins_slider.drag.imgNext;
                        } else {
                            var active_from = -1 * $bilgins_window.width() / 2;
                        }
                        if (bilgins_slider.drag.imgActive !== 0) {
                            var prev_from = bilgins_slider.drag.imgActive;
                        } else {
                            var prev_from = 0;
                        }
                        gsap.fromTo(bilgins_slider.$activeImage, {
                            x: active_from,
                            duration: 1,
                            ease: slideEasing
                        }, {
                            x: 0,
                            duration: 1,
                            ease: slideEasing,
                        });
                        gsap.fromTo(bilgins_slider.$prevImage, {
                            x: prev_from,
                            duration: 1,
                            ease: slideEasing,
                        }, {
                            x: $bilgins_window.width() / 2,
                            duration: 1,
                            ease: slideEasing
                        });
                    }
                    if (bilgins_slider.direction == 'prev' && bilgins_slider.action.from !== 'layout') {
                        if (bilgins_slider.drag.imgNext !== 0) {
                            var active_from = bilgins_slider.drag.imgPrev;
                        } else {
                            var active_from = $bilgins_window.width() / 2;
                        }
                        if (bilgins_slider.drag.imgActive !== 0) {
                            var next_from = bilgins_slider.drag.imgActive;
                        } else {
                            var next_from = 0;
                        }
                        gsap.fromTo(bilgins_slider.$activeImage, {
                            x: active_from,
                            duration: 1,
                            ease: slideEasing
                        }, {
                            x: 0,
                            duration: 1,
                            ease: slideEasing,
                        });
                        gsap.fromTo(bilgins_slider.$nextImage, {
                            x: next_from,
                            duration: 1,
                            ease: slideEasing
                        }, {
                            x: -$bilgins_window.width() / 2,
                            duration: 1,
                            ease: slideEasing,
                        });
                    }
                    if (bilgins_slider.action.from == 'layout') {
                        gsap.to(bilgins_slider.$prevImage, {
                            x: $bilgins_window.width() / 2,
                            duration: 1,
                            ease: slideEasing,
                        });
                        gsap.to(bilgins_slider.$activeImage, {
                            x: 0,
                            duration: 1,
                            ease: slideEasing,
                        });
                        gsap.to(bilgins_slider.$nextImage, {
                            x: -$bilgins_window.width() / 2,
                            duration: 1,
                            ease: slideEasing,
                        });
                    }
                }
                gsap.fromTo(bilgins_slider.$el, {
                    x: parseInt(posMatrix[4], 10)
                }, {
                    x: -bilgins_slider.target,
                    duration: 1,
                    ease: slideEasing,
                    onComplete: function() {
                        if (bilgins_slider.action.from == 'slide') {
                            if (bilgins_slider.direction == 'next' && bilgins_slider.indexActive == bilgins_slider.itemsCount) {
                                bilgins_slider.indexPrev = 0;
                                bilgins_slider.indexActive = 1;
                                bilgins_slider.indexNext = 2;
                                bilgins_slider.$el.css('transform', 'translate(-' + $bilgins_window.width() + 'px, 0px)');
                                bilgins_slider.isAnimate = false;
                            }
                            if (bilgins_slider.direction == 'prev' && bilgins_slider.indexActive == 0) {
                                bilgins_slider.indexPrev = bilgins_slider.itemsCount - 2;
                                bilgins_slider.indexActive = bilgins_slider.itemsCount - 1;
                                bilgins_slider.indexNext = bilgins_slider.itemsCount;
                                bilgins_slider.$el.css('transform', 'translate(-' + $bilgins_window.width() * (bilgins_slider.itemsCount - 1) + 'px, 0px)');
                            }
                        }

                        bilgins_slider.$el_prev = bilgins_slider.$el.find('.bilgins-album-item').eq(bilgins_slider.indexPrev);
                        bilgins_slider.$el_active = bilgins_slider.$el.find('.bilgins-album-item').eq(bilgins_slider.indexActive);
                        bilgins_slider.$el_next = bilgins_slider.$el.find('.bilgins-album-item').eq(bilgins_slider.indexNext);

                        if (bilgins_slider.type == 'parallax') {
                            bilgins_slider.$prevImage = bilgins_slider.$el_prev.find('.bilgins-album-item__image');
                            bilgins_slider.$activeImage = bilgins_slider.$el_active.find('.bilgins-album-item__image');
                            bilgins_slider.$nextImage = bilgins_slider.$el_next.find('.bilgins-album-item__image');

                            bilgins_slider.$prevImage.css('transform', 'translateX(0)');
                            bilgins_slider.$activeImage.css('transform', 'translateX(0)');
                            bilgins_slider.$nextImage.css('transform', 'translateX(0)');
                        }

                        bilgins_slider.$el.find('.is-prev').removeClass('is-prev');
                        bilgins_slider.$el.find('.is-active').removeClass('is-active');
                        bilgins_slider.$el.find('.is-next').removeClass('is-next');

                        bilgins_slider.$el_prev.addClass('is-prev');
                        bilgins_slider.$el_active.addClass('is-active');
                        bilgins_slider.$el_next.addClass('is-next');

                        bilgins_slider.action.from = '';
                        bilgins_slider.isAnimate = false;
                    }
                });

                if (bilgins_slider.type == 'parallax') {
                    bilgins_slider.drag.imgPrev = 0,
                        bilgins_slider.drag.imgActive = 0,
                        bilgins_slider.drag.imgNext = 0;
                }
            }
        }
    },
};

jQuery(document).ready(function() {
    if (bilgins_slider.$el) {
        bilgins_slider.init();
    }
});

jQuery(window).on('load', function() {
    bilgins_slider.layout();
}).on('resize', function() {
    bilgins_slider.layout();
});

// Bind Keyboard Controls
jQuery(document).on('keyup', function(e) {
    switch (e.keyCode) {
        case 39: // 'Right Arrow' Key
            if (!bilgins_slider.isAnimate) {
                bilgins_slider.action.from = 'button';
                bilgins_slider.action.next();
            }
            break;
        case 37: // 'Left Arrow' Key
            if (!bilgins_slider.isAnimate) {
                bilgins_slider.action.from = 'button';
                bilgins_slider.action.prev();
            }
            break;

        default:
            break;
    }
});

// Bind Mouse Wheel Control
bilgins_slider.$el[0].addEventListener('wheel', bilginsMouseWheel);

function bilginsMouseWheel(e) {
    if (!bilgins_slider.isAnimate) {
        if (e.deltaY > 0) {
            bilgins_slider.action.from = 'button';
            bilgins_slider.action.next();
        }
        if (e.deltaY < 0) {
            bilgins_slider.action.from = 'button';
            bilgins_slider.action.prev();
        }
    }
}