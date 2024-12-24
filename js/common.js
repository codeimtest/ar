//core
//menu
$('.menu_button').click(function(){
	$('aside').toggleClass('active')
	$(this).toggleClass('active')
})
$('.aside_overlay').click(function(){
	$('aside,.menu_button').removeClass('active')
})

// popup
$('.contact').click(function(e){
	e.preventDefault();
	$('.for_contact').addClass('active')
	$('body').addClass('lock')
})
$('.btn_close').click(function(){
	$('.popup').removeClass('active');
	$('body').removeClass('lock')
})
//click on outside popup
$(document).mouseup(function (e) {
	var container = $(".popup_dialog");
	if (container.has(e.target).length === 0) {
		$('.popup').removeClass('active');
		$('body').removeClass('lock');
	}
});

$('.btn').click(function () {
  var getDataBtn = $(this).data('button');
  var dataBtnOut = $('.popup_output_text');
  dataBtnOut.text(getDataBtn);
});
//sliders
var swiper = new Swiper(".clients_slider", {
	slidesPerView: 4.8,
	initialSlide: 2,
	loop: true,
	spaceBetween: 16,
	autoplay:{
		delay: 4000,
	},
	breakpoints: {
    768: {
      slidesPerView: 4,
			spaceBetween: 20,
    },
		1200: {
			slidesPerView: 5,
			spaceBetween: 36,
		},
		1400: {
			slidesPerView: 7,
			spaceBetween: 50,
		}
	}
});
var swiper2 = new Swiper(".testimonials_carousel", {
	slidesPerView: 1.2,
	loop: false,
	spaceBetween: 8,
	navigation: {
		nextEl: ".next_btn",
		prevEl: ".prev_btn",
	},
	breakpoints: {
    768: {
      slidesPerView: 2,
			spaceBetween: 16,
    },

	}
});
var swiper3 = new Swiper(".service_carousel", {
	slidesPerView: 1.2,
	loop: false,
	spaceBetween: 8,
	navigation: {
		nextEl: ".service_next",
		prevEl: ".service_prev",
	},
	breakpoints: {
		768: {
      slidesPerView: 2,
			spaceBetween: 16,
    },
    992: {
      slidesPerView: 3,
			spaceBetween: 16,
    },
		1200: {
			slidesPerView: 4,
			spaceBetween: 16,
		},
	}
});
//mask input
$(".phone").mask("+7 (999) 999-99-99");

//cards cases
// const cards = gsap.utils.toArray(".card");
// const spacer = 20;
// const minScale = 0.8;

// const distributor = gsap.utils.distribute({ base: minScale, amount: 0.2 });

// cards.forEach((card, index) => {
  
//   const scaleVal = distributor(index, cards[index], cards);
  
//   const tween = gsap.to(card, {
//     scrollTrigger: {
//       trigger: card,
//       start: `top 100%`,
//       scrub: true,
//       markers: false,
//       invalidateOnRefresh: true,
			
//     },
//     ease: true,
// 		scale: () => 1 - (cards.length - index) * 0.025

//   });
//   ScrollTrigger.create({
//     trigger: card,
//     start: `top 140px`,
//     endTrigger: '.cards_end',
//     end: `bottom bottom`,
//     pin: true,
//     pinSpacing: false,
//     markers: true,
//     id: 'pin',
//     invalidateOnRefresh: true,
//   });
// });


// utility functions
if(!Util) function Util () {};

Util.osHasReducedMotion = function() {
  if(!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(matchMediaObj) return matchMediaObj.matches;
  return false; 
};

// File#: _1_stacking-cards
// Usage: codyhouse.co/license
(function() {
	
  var StackCards = function(element) {
    this.element = element;
    this.items = this.element.getElementsByClassName('js-stack-cards__item');
    this.scrollingFn = false;
    this.scrolling = false;
    initStackCardsEffect(this); 
    initStackCardsResize(this); 
  };

  function initStackCardsEffect(element) { // use Intersection Observer to trigger animation
    setStackCards(element); // store cards CSS properties
		var observer = new IntersectionObserver(stackCardsCallback.bind(element), { threshold: [0, 1] });
		observer.observe(element.element);
  };

  function initStackCardsResize(element) { // detect resize to reset gallery
    element.element.addEventListener('resize-stack-cards', function(){
      setStackCards(element);
      animateStackCards.bind(element);
    });
  };
  
  function stackCardsCallback(entries) { // Intersection Observer callback
    if(entries[0].isIntersecting) {
      if(this.scrollingFn) return; // listener for scroll event already added
      stackCardsInitEvent(this);
    } else {
      if(!this.scrollingFn) return; // listener for scroll event already removed
      window.removeEventListener('scroll', this.scrollingFn);
      this.scrollingFn = false;
    }
  };
  
  function stackCardsInitEvent(element) {
    element.scrollingFn = stackCardsScrolling.bind(element);
    window.addEventListener('scroll', element.scrollingFn);
  };

  function stackCardsScrolling() {
    if(this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateStackCards.bind(this));
  };

  function setStackCards(element) {
    // store wrapper properties
    element.marginY = getComputedStyle(element.element).getPropertyValue('--stack-cards-gap');
    getIntegerFromProperty(element); // convert element.marginY to integer (px value)
    element.elementHeight = element.element.offsetHeight;

    // store card properties
    var cardStyle = getComputedStyle(element.items[0]);
    element.cardTop = Math.floor(parseFloat(cardStyle.getPropertyValue('top')));
    element.cardHeight = Math.floor(parseFloat(cardStyle.getPropertyValue('height')));

    // store window property
    element.windowHeight = window.innerHeight;

    // reset margin + translate values
    if(isNaN(element.marginY)) {
      element.element.style.paddingBottom = '0px';
    } else {
      element.element.style.paddingBottom = (element.marginY*(element.items.length - 1))+'px';
    }

    for(var i = 0; i < element.items.length; i++) {
      if(isNaN(element.marginY)) {
        element.items[i].style.transform = 'none;';
      } else {
        element.items[i].style.transform = 'translateY('+element.marginY*i+'px)';
      }
    }
  };

  function getIntegerFromProperty(element) {
    var node = document.createElement('div');
    node.setAttribute('style', 'opacity:0; visbility: hidden;position: absolute; height:'+element.marginY);
    element.element.appendChild(node);
    element.marginY = parseInt(getComputedStyle(node).getPropertyValue('height'));
    element.element.removeChild(node);
  };

  function animateStackCards() {
    if(isNaN(this.marginY)) { // --stack-cards-gap not defined - do not trigger the effect
      this.scrolling = false;
      return; 
    }

    var top = this.element.getBoundingClientRect().top;

    if( this.cardTop - top + this.element.windowHeight - this.elementHeight - this.cardHeight + this.marginY + this.marginY*this.items.length > 0) { 
      this.scrolling = false;
      return;
    }

    for(var i = 0; i < this.items.length; i++) { // use only scale
      var scrolling = this.cardTop - top - i*(this.cardHeight+this.marginY);
      if(scrolling > 0) {  
        var scaling = i == this.items.length - 1 ? 1 : (this.cardHeight - scrolling*0.03)/this.cardHeight;
        this.items[i].style.transform = 'translateY('+this.marginY*i+'px) scale('+scaling+')';
      } else {
        this.items[i].style.transform = 'translateY('+this.marginY*i+'px)';
      }
    }

    this.scrolling = false;
  };

  // initialize StackCards object
  var stackCards = document.getElementsByClassName('js-stack-cards'),
    intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
    reducedMotion = Util.osHasReducedMotion();
    
	if(stackCards.length > 0 && intersectionObserverSupported && !reducedMotion) { 
    var stackCardsArray = [];
		for(var i = 0; i < stackCards.length; i++) {
			(function(i){
        stackCardsArray.push(new StackCards(stackCards[i]));
      })(i);
    }
    
    var resizingId = false,
      customEvent = new CustomEvent('resize-stack-cards');
    
    window.addEventListener('resize', function() {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
      for( var i = 0; i < stackCardsArray.length; i++) {
        (function(i){stackCardsArray[i].element.dispatchEvent(customEvent)})(i);
      };
    };
	}
}());