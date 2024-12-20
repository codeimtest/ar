//core
$('.menu_button').click(function(){
	$('aside').toggleClass('active')
	$(this).toggleClass('active')
})
$('.aside_overlay').click(function(){
	$('aside,.menu_button').removeClass('active')
})

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
//cards
const cards = gsap.utils.toArray(".card");
const spacer = 20;
const minScale = 0.8;

const distributor = gsap.utils.distribute({ base: minScale, amount: 0.2 });

cards.forEach((card, index) => {
  
  const scaleVal = distributor(index, cards[index], cards);
  
  const tween = gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: `top top`,
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
			
    },
    ease: true,
  });

  ScrollTrigger.create({
    trigger: card,
    start: `top-=${index * spacer} top`,
    endTrigger: '.cards',
    end: `bottom top+=${720 + (cards.length * spacer)}`,
    pin: true,
    pinSpacing: false,
    markers: false,
    id: 'pin',
    invalidateOnRefresh: true,
  });

});