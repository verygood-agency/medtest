// noinspection JSUnusedLocalSymbols,JSUnresolvedFunction,JSUnresolvedVariable

'use strict';
// Scroll util
(function () {
	window.scroller = {
		prevScroll: 0,
		saveScroll: function () {
			this.prevScroll = window.scrollY;
		},
		returnToPrevScroll: function () {
			window.scrollTo(0, this.prevScroll);
		},
	}
})();


// Footer year
window.addEventListener('DOMContentLoaded', function () {
	if (document.querySelector(".footer-year")) {
		document.querySelectorAll(".footer-year").forEach(el => el.textContent = new Date().getFullYear().toString());
	}
});


// Offcanvas
// Click handler
(function () {
	function closeOffcanvasMenus() {
		// document.querySelector('.offcanvas-overlay').remove();
		document.body.classList.remove('offcanvas-body');
		document.querySelectorAll('.offcanvas').forEach((el) => {
			el.classList.remove('offcanvas_active');
		});
		window.scroller.returnToPrevScroll();
	}

	function openOffcanvasMenu(id) {
		window.scroller.saveScroll();
		const overlay = document.createElement('div');
		overlay.classList.add('offcanvas-overlay');
		document.body.classList.add('offcanvas-body');
		// document.body.prepend(overlay);
		document.querySelector(id).classList.add('offcanvas_active');
		overlay.addEventListener('click', closeOffcanvasMenus);
	}

	document.querySelectorAll('.offcanvas-open').forEach((el) => {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			openOffcanvasMenu(el.dataset.id);
		});
	});

	document.querySelectorAll('.offcanvas-close').forEach((el) => {
		el.addEventListener('click', closeOffcanvasMenus);
	})
})();

// Multilevel menu
(function () {
	const multilevelOffcanvas = document.querySelector('.offcanvas-multilevel');
	if (multilevelOffcanvas) {
		multilevelOffcanvas.querySelectorAll('.offcanvas__subnav')
			.forEach((el) => {
				el.parentElement.classList.add('offcanvas__has-subnav');

				const backTrack = document.createElement('li');
				backTrack.innerHTML = `
                <a class='offcanvas__back-track'>
                    <div class="offcanvas__back-track-title">${el.previousElementSibling.textContent}</div>
                    <canvas width="24" height="24"></canvas>
                </a>`;

				el.prepend(backTrack);

				backTrack.addEventListener('click', function () {
					el.classList.remove('offcanvas__subnav_active');
					const prevList = el.previousElementSibling.closest('.offcanvas__list');
					prevList.classList.remove('overflow-hidden');
				});

				el.previousElementSibling.addEventListener('click', function (e) {
					e.preventDefault();
					el.classList.add('offcanvas__subnav_active');
					const prevList = this.closest('.offcanvas__list');
					prevList.classList.add('overflow-hidden');
					prevList.scrollTop = 0;
				});
			});
	}
})();


// Custom select
if (document.querySelector(".custom-select-field")) {
	for (const dropdown of document.querySelectorAll(".custom-select-field")) {
		dropdown.addEventListener('click', function () {
			this.closest('[data-select]').classList.toggle('open');
		})
	}

	for (const option of document.querySelectorAll(".custom-select-options ul > li")) {
		option.addEventListener('click', function () {
			if (!this.classList.contains('selected')) {
				let select = this.closest('[data-select]');
				let selectInput = select.querySelector('input[type=hidden]');
				let selected = this.getAttribute('data-value');
				this.parentNode.querySelector('li.selected').classList.remove('selected');
				this.classList.add('selected');
				select.querySelector('.custom-select-field div').textContent = this.textContent;
				select.querySelector('.custom-select-field').classList.add('selected');
				select.setAttribute('data-select', selected);
				selectInput.value = selected;
				if (this.getAttribute('data-activity')) {
					UIkit.switcher('.activity-tabs').show(selected);
				}

				if (this.getAttribute('data-alternate')) {
					let currentSelected = parseInt(this.getAttribute('data-alternate'));
					let targetInput = document.querySelector('#other-area');

					if (currentSelected !== 1) {
						targetInput.classList.add('active');
					} else {
						targetInput.classList.remove('active');
					}
				}

				if (this.getAttribute('data-info')) {
					document.querySelector('#role-info').textContent = this.getAttribute('data-info');

					if (selected === '1') {
						document.querySelectorAll('.form-additional').forEach(el => el.classList.add('d-none'));
					} else {
						document.querySelectorAll('.form-additional').forEach(el => el.classList.remove('d-none'));
					}

					if (selected !== '0') {
						document.querySelector('.form-registration-fields').classList.add('show');
					} else {
						document.querySelector('.form-registration-fields').classList.remove('show');
					}
				}
				select.classList.remove('open');
			}
		})
	}

	window.addEventListener('click', function (e) {
		for (const select of document.querySelectorAll('[data-select]')) {
			select.classList.remove('error');
			if (!select.contains(e.target)) {
				select.classList.remove('open');
			}
		}
	});
}


// Sliders
if (document.querySelector('.doctors-index-slider')) {
	let doctorsIndexSlider = new Swiper(".doctors-index-slider", {
		navigation: {
			nextEl: ".doctors-index-next",
			prevEl: ".doctors-index-prev",
		},
		slidesPerView: 'auto',
		spaceBetween: 20,
		width: 290,
		centeredSlides: true,
		initialSlide: 0,
		watchOverflow: true,
		pagination: {
			el: ".doctors-index-pagination",
			type: "fraction",
		},
		breakpoints: {
			992: {
				width: 989,
				spaceBetween: 32,
				centeredSlides: true,
				initialSlide: 1,
			},
		},
	});
}

if (document.querySelector('.services-index-slider')) {
	let servicesIndexSlider = new Swiper(".services-index-slider", {
		navigation: {
			nextEl: ".services-index-next",
			prevEl: ".services-index-prev",
		},
		slidesPerView: 'auto',
		spaceBetween: 20,
		watchOverflow: true,
		breakpoints: {
			992: {
				spaceBetween: 32,
			},
		},
	});
}

if (document.querySelector('.gallery-index-slider')) {
	let galleryIndexSlider = new Swiper(".gallery-index-slider", {
		slidesPerView: 'auto',
		spaceBetween: 20,
		grabCursor: true,
		breakpoints: {
			992: {
				slidesPerView: 'auto',
				spaceBetween: 32,
			},
		},
	});
}

if (document.querySelector('.licenses-slider')) {
	let licensesSlider = new Swiper(".licenses-slider", {
		slidesPerView: 'auto',
		spaceBetween: 20,
		grabCursor: true,
		breakpoints: {
			992: {
				slidesPerView: 'auto',
				spaceBetween: 32,
			},
		},
	});
}

if (document.querySelector('.reviews-slider')) {
	let reviewsSlider = new Swiper(".reviews-slider", {
		slidesPerView: 'auto',
		spaceBetween: 23,
		grabCursor: true,
		navigation: {
			nextEl: ".reviews-slider-next",
			prevEl: ".reviews-slider-prev",
		},
		breakpoints: {
			992: {
				slidesPerView: 'auto',
				spaceBetween: 32,
			},
		},
	});
}

if (document.querySelector('.compare-slider')) {
	let compareSlider = new Swiper(".compare-slider", {
		navigation: {
			nextEl: ".compare-slider-next",
			prevEl: ".compare-slider-prev",
		},
		slidesPerView: 1,
		spaceBetween: 20,
		watchOverflow: true,
		breakpoints: {
			992: {
				slidesPerView: 'auto',
				spaceBetween: 32,
			},
		},
	});
}

if (document.querySelector('.works-slider')) {
	let worksSlider = new Swiper(".works-slider", {
		navigation: {
			nextEl: ".works-slider-next",
			prevEl: ".works-slider-prev",
		},
		slidesPerView: 1,
		spaceBetween: 20,
		autoHeight: true,
		watchOverflow: true,
		breakpoints: {
			768: {
				slidesPerView: 'auto',
				spaceBetween: 32,
			},
		},
	});
}

if (document.querySelector('.docs-slider')) {
	let docsSlider = new Swiper(".docs-slider", {
		navigation: {
			nextEl: ".docs-slider-next",
			prevEl: ".docs-slider-prev",
		},
		slidesPerView: 1,
		initialSlide: 1,
		spaceBetween: 20,
		autoHeight: true,
		watchOverflow: true,
		breakpoints: {
			992: {
				slidesPerView: 'auto',
				spaceBetween: 32,
			},
		},
	});
}

if (document.querySelector('.doctor-photos-slider')) {
	let compareSlider = new Swiper(".doctor-photos-slider", {
		navigation: {
			nextEl: ".doctor-photos-slider-next",
			prevEl: ".doctor-photos-slider-prev",
		},
		slidesPerView: 1,
		spaceBetween: 20,
		autoHeight: true,
		grabCursor: true,
		watchOverflow: true,
		breakpoints: {
			768: {
				slidesPerView: 'auto',
				spaceBetween: 32,
			},
		},
	});
}

if (document.querySelector('.insta-slider')) {
	let mql = window.matchMedia('(max-width: 992px)');
	let instaSlider;

	function initInstaSlider() {
		if (mql.matches) {
			instaSlider = new Swiper('.insta-slider', {
				slidesPerView: 1.3,
				centeredSlides: true,
				spaceBetween: 20,
				width: 300,
				initialSlide: 1,
				init: true,
			});
		} else {
			instaSlider ? instaSlider.destroy() : null;
		}
	}

	window.addEventListener('resize', initInstaSlider);
	window.addEventListener('load', initInstaSlider);
}


// Sliders - specialists on categories
if (document.querySelector('.doctors-surgery-slider')) {
	let doctorsSurgerySlider = new Swiper(".doctors-surgery-slider", {
		navigation: {
			nextEl: ".doctors-surgery-next",
			prevEl: ".doctors-surgery-prev",
		},
		slidesPerView: 'auto',
		spaceBetween: 20,
		width: 290,
		centeredSlides: true,
		initialSlide: 0,
		watchOverflow: true,
		pagination: {
			el: ".doctors-surgery-pagination",
			type: "fraction",
		},
		breakpoints: {
			992: {
				width: 989,
				spaceBetween: 32,
				centeredSlides: true,
				initialSlide: 1,
			},
		},
	});
}

if (document.querySelector('.doctors-cosmetology-slider')) {
	let doctorsCosmetologySlider = new Swiper(".doctors-cosmetology-slider", {
		navigation: {
			nextEl: ".doctors-cosmetology-next",
			prevEl: ".doctors-cosmetology-prev",
		},
		slidesPerView: 'auto',
		spaceBetween: 20,
		width: 290,
		centeredSlides: true,
		initialSlide: 0,
		watchOverflow: true,
		pagination: {
			el: ".doctors-cosmetology-pagination",
			type: "fraction",
		},
		breakpoints: {
			992: {
				width: 989,
				spaceBetween: 32,
				centeredSlides: true,
				initialSlide: 1,
			},
		},
	});
}

if (document.querySelector('.doctors-medicine-slider')) {
	let doctorsMedicineSlider = new Swiper(".doctors-medicine-slider", {
		navigation: {
			nextEl: ".doctors-medicine-next",
			prevEl: ".doctors-medicine-prev",
		},
		slidesPerView: 'auto',
		spaceBetween: 20,
		width: 290,
		centeredSlides: true,
		initialSlide: 0,
		watchOverflow: true,
		pagination: {
			el: ".doctors-medicine-pagination",
			type: "fraction",
		},
		breakpoints: {
			992: {
				width: 989,
				spaceBetween: 32,
				centeredSlides: true,
				initialSlide: 1,
			},
		},
	});
}


// DateTime picker
if (document.getElementById('datetimepicker') && window.innerWidth >= 992) {
	document.getElementById('datetimepicker').type = 'text';
	$('#datetimepicker').datetimepicker();
	$.datetimepicker.setLocale('ru');
}


// ScrollFade
if (document.querySelector('.scrollFade')) {
	let fadeElements = document.getElementsByClassName('scrollFade');

	function scrollFade() {
		let viewportBottom = window.scrollY + window.innerHeight;

		for (let index = 0; index < fadeElements.length; index++) {
			let element = fadeElements[index];
			let rect = element.getBoundingClientRect();

			let elementFourth = rect.height / 4;
			let fadeInPoint = window.innerHeight - elementFourth;
			let fadeOutPoint = -(rect.height / 2);

			if (rect.top <= fadeInPoint) {
				element.classList.add('scrollFade--visible');
				element.classList.add('scrollFade--animate');
				element.classList.remove('scrollFade--hidden');
			} else {
				element.classList.remove('scrollFade--visible');
				element.classList.add('scrollFade--hidden');
			}
		}
	}

	document.addEventListener('scroll', scrollFade);
	window.addEventListener('resize', scrollFade);
	document.addEventListener('DOMContentLoaded', function () {
		scrollFade();
	});
}


// Lightbox
if (document.querySelector('.magnify-items')) {
	$('.magnify-items').magnificPopup({
		delegate: 'a',
		type: 'image',
	});
}


// Schedule datepicker (zabuto_calendar)
if (document.getElementById('signup-calendar')) {
	let options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		timezone: 'UTC'
	};

	$(document).ready(function () {
		$("#signup-calendar").zabuto_calendar({
			language: 'ru',
			show_days: true,
			classname: 'table table-bordered clickable lightgrey-weekends',
			navigation_markup: {
				prev: `<svg width="42" height="12" viewBox="0 0 42 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.470509 6.53033C0.177616 6.23744 0.177616 5.76256 0.470509 5.46967L5.24348 0.696699C5.53637 0.403806 6.01125 0.403806 6.30414 0.696699C6.59703 0.989593 6.59703 1.46447 6.30414 1.75736L2.0615 6L6.30414 10.2426C6.59703 10.5355 6.59703 11.0104 6.30414 11.3033C6.01125 11.5962 5.53637 11.5962 5.24348 11.3033L0.470509 6.53033ZM41.5723 6.75H1.00084V5.25H41.5723V6.75Z" fill="#1E1E1E"/>
</svg>`,
				next: `<svg width="42" height="12" viewBox="0 0 42 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M41.5295 6.53033C41.8224 6.23744 41.8224 5.76256 41.5295 5.46967L36.7565 0.696699C36.4636 0.403806 35.9888 0.403806 35.6959 0.696699C35.403 0.989593 35.403 1.46447 35.6959 1.75736L39.9385 6L35.6959 10.2426C35.403 10.5355 35.403 11.0104 35.6959 11.3033C35.9888 11.5962 36.4636 11.5962 36.7565 11.3033L41.5295 6.53033ZM0.427734 6.75H40.9992V5.25H0.427734V6.75Z" fill="#1E1E1E"/>
</svg>`
			},
		});
	});

	$("#signup-calendar").on('zabuto:calendar:day', function (e) {
		$("td.zabuto-calendar__day--today").removeClass('zabuto-calendar__day--today');
		$(e.element).addClass('zabuto-calendar__day--today');
		document.getElementById('selected-date').textContent = new Date(e.value).toLocaleString("ru", options);
	});

	document.getElementById('selected-date').textContent = new Date().toLocaleString("ru", options);
}


// Schedule timepicker
const timepickerLayouts = document.querySelector('.timepicker-layouts');
if (timepickerLayouts) {
	let items = [...timepickerLayouts.querySelectorAll('.time-item')];
	const timeElm = document.getElementById('selected-time');

	const selectTime = (evt) => {
		evt.preventDefault();
		timeElm.textContent = evt.currentTarget.textContent;
		evt.currentTarget.classList.add('time-selected');
	}

	items.forEach((el, _, arr) => {
		el.addEventListener('click', (evt) => {
			arr.forEach(el => el.classList.remove('time-selected'))
			selectTime(evt);
		});
	});

	// Change layout pages
	const activeClassName = 'active';
	const btnPrev = document.getElementById('btn-prev');
	const btnNext = document.getElementById('btn-next');

	btnPrev.addEventListener('click', handleButtonClick);
	btnNext.addEventListener('click', handleButtonClick);

	function handleButtonClick(evt) {
		evt.preventDefault();
		let current = timepickerLayouts.querySelector('.timepicker.active');
		let target = evt.currentTarget === btnPrev ? current.previousElementSibling : current.nextElementSibling;
		if (target) {
			current.classList.remove(activeClassName);
			target.classList.add(activeClassName);
		}
	}
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9scyxKU1VucmVzb2x2ZWRGdW5jdGlvbixKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXG4ndXNlIHN0cmljdCc7XG4vLyBTY3JvbGwgdXRpbFxuKGZ1bmN0aW9uICgpIHtcblx0d2luZG93LnNjcm9sbGVyID0ge1xuXHRcdHByZXZTY3JvbGw6IDAsXG5cdFx0c2F2ZVNjcm9sbDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5wcmV2U2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XG5cdFx0fSxcblx0XHRyZXR1cm5Ub1ByZXZTY3JvbGw6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLCB0aGlzLnByZXZTY3JvbGwpO1xuXHRcdH0sXG5cdH1cbn0pKCk7XG5cblxuLy8gRm9vdGVyIHllYXJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXIteWVhclwiKSkge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZm9vdGVyLXllYXJcIikuZm9yRWFjaChlbCA9PiBlbC50ZXh0Q29udGVudCA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpKTtcblx0fVxufSk7XG5cblxuLy8gT2ZmY2FudmFzXG4vLyBDbGljayBoYW5kbGVyXG4oZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBjbG9zZU9mZmNhbnZhc01lbnVzKCkge1xuXHRcdC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vZmZjYW52YXMtb3ZlcmxheScpLnJlbW92ZSgpO1xuXHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnb2ZmY2FudmFzLWJvZHknKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub2ZmY2FudmFzJykuZm9yRWFjaCgoZWwpID0+IHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ29mZmNhbnZhc19hY3RpdmUnKTtcblx0XHR9KTtcblx0XHR3aW5kb3cuc2Nyb2xsZXIucmV0dXJuVG9QcmV2U2Nyb2xsKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBvcGVuT2ZmY2FudmFzTWVudShpZCkge1xuXHRcdHdpbmRvdy5zY3JvbGxlci5zYXZlU2Nyb2xsKCk7XG5cdFx0Y29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnb2ZmY2FudmFzLW92ZXJsYXknKTtcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ29mZmNhbnZhcy1ib2R5Jyk7XG5cdFx0Ly8gZG9jdW1lbnQuYm9keS5wcmVwZW5kKG92ZXJsYXkpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpLmNsYXNzTGlzdC5hZGQoJ29mZmNhbnZhc19hY3RpdmUnKTtcblx0XHRvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPZmZjYW52YXNNZW51cyk7XG5cdH1cblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub2ZmY2FudmFzLW9wZW4nKS5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdG9wZW5PZmZjYW52YXNNZW51KGVsLmRhdGFzZXQuaWQpO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub2ZmY2FudmFzLWNsb3NlJykuZm9yRWFjaCgoZWwpID0+IHtcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT2ZmY2FudmFzTWVudXMpO1xuXHR9KVxufSkoKTtcblxuLy8gTXVsdGlsZXZlbCBtZW51XG4oZnVuY3Rpb24gKCkge1xuXHRjb25zdCBtdWx0aWxldmVsT2ZmY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9mZmNhbnZhcy1tdWx0aWxldmVsJyk7XG5cdGlmIChtdWx0aWxldmVsT2ZmY2FudmFzKSB7XG5cdFx0bXVsdGlsZXZlbE9mZmNhbnZhcy5xdWVyeVNlbGVjdG9yQWxsKCcub2ZmY2FudmFzX19zdWJuYXYnKVxuXHRcdFx0LmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHRcdGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb2ZmY2FudmFzX19oYXMtc3VibmF2Jyk7XG5cblx0XHRcdFx0Y29uc3QgYmFja1RyYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRcdFx0YmFja1RyYWNrLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8YSBjbGFzcz0nb2ZmY2FudmFzX19iYWNrLXRyYWNrJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9mZmNhbnZhc19fYmFjay10cmFjay10aXRsZVwiPiR7ZWwucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGNhbnZhcyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj48L2NhbnZhcz5cbiAgICAgICAgICAgICAgICA8L2E+YDtcblxuXHRcdFx0XHRlbC5wcmVwZW5kKGJhY2tUcmFjayk7XG5cblx0XHRcdFx0YmFja1RyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ29mZmNhbnZhc19fc3VibmF2X2FjdGl2ZScpO1xuXHRcdFx0XHRcdGNvbnN0IHByZXZMaXN0ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZy5jbG9zZXN0KCcub2ZmY2FudmFzX19saXN0Jyk7XG5cdFx0XHRcdFx0cHJldkxpc3QuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmZsb3ctaGlkZGVuJyk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdvZmZjYW52YXNfX3N1Ym5hdl9hY3RpdmUnKTtcblx0XHRcdFx0XHRjb25zdCBwcmV2TGlzdCA9IHRoaXMuY2xvc2VzdCgnLm9mZmNhbnZhc19fbGlzdCcpO1xuXHRcdFx0XHRcdHByZXZMaXN0LmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93LWhpZGRlbicpO1xuXHRcdFx0XHRcdHByZXZMaXN0LnNjcm9sbFRvcCA9IDA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdH1cbn0pKCk7XG5cblxuLy8gQ3VzdG9tIHNlbGVjdFxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VzdG9tLXNlbGVjdC1maWVsZFwiKSkge1xuXHRmb3IgKGNvbnN0IGRyb3Bkb3duIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3VzdG9tLXNlbGVjdC1maWVsZFwiKSkge1xuXHRcdGRyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5jbG9zZXN0KCdbZGF0YS1zZWxlY3RdJykuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xuXHRcdH0pXG5cdH1cblxuXHRmb3IgKGNvbnN0IG9wdGlvbiBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN1c3RvbS1zZWxlY3Qtb3B0aW9ucyB1bCA+IGxpXCIpKSB7XG5cdFx0b3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCF0aGlzLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuXHRcdFx0XHRsZXQgc2VsZWN0ID0gdGhpcy5jbG9zZXN0KCdbZGF0YS1zZWxlY3RdJyk7XG5cdFx0XHRcdGxldCBzZWxlY3RJbnB1dCA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWhpZGRlbl0nKTtcblx0XHRcdFx0bGV0IHNlbGVjdGVkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKTtcblx0XHRcdFx0dGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJ2xpLnNlbGVjdGVkJykuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcblx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuXHRcdFx0XHRzZWxlY3QucXVlcnlTZWxlY3RvcignLmN1c3RvbS1zZWxlY3QtZmllbGQgZGl2JykudGV4dENvbnRlbnQgPSB0aGlzLnRleHRDb250ZW50O1xuXHRcdFx0XHRzZWxlY3QucXVlcnlTZWxlY3RvcignLmN1c3RvbS1zZWxlY3QtZmllbGQnKS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuXHRcdFx0XHRzZWxlY3Quc2V0QXR0cmlidXRlKCdkYXRhLXNlbGVjdCcsIHNlbGVjdGVkKTtcblx0XHRcdFx0c2VsZWN0SW5wdXQudmFsdWUgPSBzZWxlY3RlZDtcblx0XHRcdFx0aWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2aXR5JykpIHtcblx0XHRcdFx0XHRVSWtpdC5zd2l0Y2hlcignLmFjdGl2aXR5LXRhYnMnKS5zaG93KHNlbGVjdGVkKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1hbHRlcm5hdGUnKSkge1xuXHRcdFx0XHRcdGxldCBjdXJyZW50U2VsZWN0ZWQgPSBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1hbHRlcm5hdGUnKSk7XG5cdFx0XHRcdFx0bGV0IHRhcmdldElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI290aGVyLWFyZWEnKTtcblxuXHRcdFx0XHRcdGlmIChjdXJyZW50U2VsZWN0ZWQgIT09IDEpIHtcblx0XHRcdFx0XHRcdHRhcmdldElucHV0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5mbycpKSB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JvbGUtaW5mbycpLnRleHRDb250ZW50ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5mbycpO1xuXG5cdFx0XHRcdFx0aWYgKHNlbGVjdGVkID09PSAnMScpIHtcblx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLWFkZGl0aW9uYWwnKS5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0tYWRkaXRpb25hbCcpLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJykpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzZWxlY3RlZCAhPT0gJzAnKSB7XG5cdFx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1yZWdpc3RyYXRpb24tZmllbGRzJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1yZWdpc3RyYXRpb24tZmllbGRzJykuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGZvciAoY29uc3Qgc2VsZWN0IG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNlbGVjdF0nKSkge1xuXHRcdFx0c2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG5cdFx0XHRpZiAoIXNlbGVjdC5jb250YWlucyhlLnRhcmdldCkpIHtcblx0XHRcdFx0c2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5cbi8vIFNsaWRlcnNcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZG9jdG9ycy1pbmRleC1zbGlkZXInKSkge1xuXHRsZXQgZG9jdG9yc0luZGV4U2xpZGVyID0gbmV3IFN3aXBlcihcIi5kb2N0b3JzLWluZGV4LXNsaWRlclwiLCB7XG5cdFx0bmF2aWdhdGlvbjoge1xuXHRcdFx0bmV4dEVsOiBcIi5kb2N0b3JzLWluZGV4LW5leHRcIixcblx0XHRcdHByZXZFbDogXCIuZG9jdG9ycy1pbmRleC1wcmV2XCIsXG5cdFx0fSxcblx0XHRzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG5cdFx0c3BhY2VCZXR3ZWVuOiAyMCxcblx0XHR3aWR0aDogMjkwLFxuXHRcdGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuXHRcdGluaXRpYWxTbGlkZTogMCxcblx0XHR3YXRjaE92ZXJmbG93OiB0cnVlLFxuXHRcdHBhZ2luYXRpb246IHtcblx0XHRcdGVsOiBcIi5kb2N0b3JzLWluZGV4LXBhZ2luYXRpb25cIixcblx0XHRcdHR5cGU6IFwiZnJhY3Rpb25cIixcblx0XHR9LFxuXHRcdGJyZWFrcG9pbnRzOiB7XG5cdFx0XHQ5OTI6IHtcblx0XHRcdFx0d2lkdGg6IDk4OSxcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAzMixcblx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0XHRcdGluaXRpYWxTbGlkZTogMSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSk7XG59XG5cbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VydmljZXMtaW5kZXgtc2xpZGVyJykpIHtcblx0bGV0IHNlcnZpY2VzSW5kZXhTbGlkZXIgPSBuZXcgU3dpcGVyKFwiLnNlcnZpY2VzLWluZGV4LXNsaWRlclwiLCB7XG5cdFx0bmF2aWdhdGlvbjoge1xuXHRcdFx0bmV4dEVsOiBcIi5zZXJ2aWNlcy1pbmRleC1uZXh0XCIsXG5cdFx0XHRwcmV2RWw6IFwiLnNlcnZpY2VzLWluZGV4LXByZXZcIixcblx0XHR9LFxuXHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcblx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdHdhdGNoT3ZlcmZsb3c6IHRydWUsXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDk5Mjoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IDMyLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcbn1cblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LWluZGV4LXNsaWRlcicpKSB7XG5cdGxldCBnYWxsZXJ5SW5kZXhTbGlkZXIgPSBuZXcgU3dpcGVyKFwiLmdhbGxlcnktaW5kZXgtc2xpZGVyXCIsIHtcblx0XHRzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG5cdFx0c3BhY2VCZXR3ZWVuOiAyMCxcblx0XHRncmFiQ3Vyc29yOiB0cnVlLFxuXHRcdGJyZWFrcG9pbnRzOiB7XG5cdFx0XHQ5OTI6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDMyLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcbn1cblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saWNlbnNlcy1zbGlkZXInKSkge1xuXHRsZXQgbGljZW5zZXNTbGlkZXIgPSBuZXcgU3dpcGVyKFwiLmxpY2Vuc2VzLXNsaWRlclwiLCB7XG5cdFx0c2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuXHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0Z3JhYkN1cnNvcjogdHJ1ZSxcblx0XHRicmVha3BvaW50czoge1xuXHRcdFx0OTkyOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAzMixcblx0XHRcdH0sXG5cdFx0fSxcblx0fSk7XG59XG5cbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3cy1zbGlkZXInKSkge1xuXHRsZXQgcmV2aWV3c1NsaWRlciA9IG5ldyBTd2lwZXIoXCIucmV2aWV3cy1zbGlkZXJcIiwge1xuXHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcblx0XHRzcGFjZUJldHdlZW46IDIzLFxuXHRcdGdyYWJDdXJzb3I6IHRydWUsXG5cdFx0bmF2aWdhdGlvbjoge1xuXHRcdFx0bmV4dEVsOiBcIi5yZXZpZXdzLXNsaWRlci1uZXh0XCIsXG5cdFx0XHRwcmV2RWw6IFwiLnJldmlld3Mtc2xpZGVyLXByZXZcIixcblx0XHR9LFxuXHRcdGJyZWFrcG9pbnRzOiB7XG5cdFx0XHQ5OTI6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDMyLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcbn1cblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wYXJlLXNsaWRlcicpKSB7XG5cdGxldCBjb21wYXJlU2xpZGVyID0gbmV3IFN3aXBlcihcIi5jb21wYXJlLXNsaWRlclwiLCB7XG5cdFx0bmF2aWdhdGlvbjoge1xuXHRcdFx0bmV4dEVsOiBcIi5jb21wYXJlLXNsaWRlci1uZXh0XCIsXG5cdFx0XHRwcmV2RWw6IFwiLmNvbXBhcmUtc2xpZGVyLXByZXZcIixcblx0XHR9LFxuXHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0c3BhY2VCZXR3ZWVuOiAyMCxcblx0XHR3YXRjaE92ZXJmbG93OiB0cnVlLFxuXHRcdGJyZWFrcG9pbnRzOiB7XG5cdFx0XHQ5OTI6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDMyLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcbn1cblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3Jrcy1zbGlkZXInKSkge1xuXHRsZXQgd29ya3NTbGlkZXIgPSBuZXcgU3dpcGVyKFwiLndvcmtzLXNsaWRlclwiLCB7XG5cdFx0bmF2aWdhdGlvbjoge1xuXHRcdFx0bmV4dEVsOiBcIi53b3Jrcy1zbGlkZXItbmV4dFwiLFxuXHRcdFx0cHJldkVsOiBcIi53b3Jrcy1zbGlkZXItcHJldlwiLFxuXHRcdH0sXG5cdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdGF1dG9IZWlnaHQ6IHRydWUsXG5cdFx0d2F0Y2hPdmVyZmxvdzogdHJ1ZSxcblx0XHRicmVha3BvaW50czoge1xuXHRcdFx0NzY4OiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAzMixcblx0XHRcdH0sXG5cdFx0fSxcblx0fSk7XG59XG5cbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZG9jcy1zbGlkZXInKSkge1xuXHRsZXQgZG9jc1NsaWRlciA9IG5ldyBTd2lwZXIoXCIuZG9jcy1zbGlkZXJcIiwge1xuXHRcdG5hdmlnYXRpb246IHtcblx0XHRcdG5leHRFbDogXCIuZG9jcy1zbGlkZXItbmV4dFwiLFxuXHRcdFx0cHJldkVsOiBcIi5kb2NzLXNsaWRlci1wcmV2XCIsXG5cdFx0fSxcblx0XHRzbGlkZXNQZXJWaWV3OiAxLFxuXHRcdGluaXRpYWxTbGlkZTogMSxcblx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdGF1dG9IZWlnaHQ6IHRydWUsXG5cdFx0d2F0Y2hPdmVyZmxvdzogdHJ1ZSxcblx0XHRicmVha3BvaW50czoge1xuXHRcdFx0OTkyOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAzMixcblx0XHRcdH0sXG5cdFx0fSxcblx0fSk7XG59XG5cbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZG9jdG9yLXBob3Rvcy1zbGlkZXInKSkge1xuXHRsZXQgY29tcGFyZVNsaWRlciA9IG5ldyBTd2lwZXIoXCIuZG9jdG9yLXBob3Rvcy1zbGlkZXJcIiwge1xuXHRcdG5hdmlnYXRpb246IHtcblx0XHRcdG5leHRFbDogXCIuZG9jdG9yLXBob3Rvcy1zbGlkZXItbmV4dFwiLFxuXHRcdFx0cHJldkVsOiBcIi5kb2N0b3ItcGhvdG9zLXNsaWRlci1wcmV2XCIsXG5cdFx0fSxcblx0XHRzbGlkZXNQZXJWaWV3OiAxLFxuXHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0YXV0b0hlaWdodDogdHJ1ZSxcblx0XHRncmFiQ3Vyc29yOiB0cnVlLFxuXHRcdHdhdGNoT3ZlcmZsb3c6IHRydWUsXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDc2ODoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogMzIsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0pO1xufVxuXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluc3RhLXNsaWRlcicpKSB7XG5cdGxldCBtcWwgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogOTkycHgpJyk7XG5cdGxldCBpbnN0YVNsaWRlcjtcblxuXHRmdW5jdGlvbiBpbml0SW5zdGFTbGlkZXIoKSB7XG5cdFx0aWYgKG1xbC5tYXRjaGVzKSB7XG5cdFx0XHRpbnN0YVNsaWRlciA9IG5ldyBTd2lwZXIoJy5pbnN0YS1zbGlkZXInLCB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEuMyxcblx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0XHRcdHdpZHRoOiAzMDAsXG5cdFx0XHRcdGluaXRpYWxTbGlkZTogMSxcblx0XHRcdFx0aW5pdDogdHJ1ZSxcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbnN0YVNsaWRlciA/IGluc3RhU2xpZGVyLmRlc3Ryb3koKSA6IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXRJbnN0YVNsaWRlcik7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaW5pdEluc3RhU2xpZGVyKTtcbn1cblxuXG4vLyBTbGlkZXJzIC0gc3BlY2lhbGlzdHMgb24gY2F0ZWdvcmllc1xuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kb2N0b3JzLXN1cmdlcnktc2xpZGVyJykpIHtcblx0bGV0IGRvY3RvcnNTdXJnZXJ5U2xpZGVyID0gbmV3IFN3aXBlcihcIi5kb2N0b3JzLXN1cmdlcnktc2xpZGVyXCIsIHtcblx0XHRuYXZpZ2F0aW9uOiB7XG5cdFx0XHRuZXh0RWw6IFwiLmRvY3RvcnMtc3VyZ2VyeS1uZXh0XCIsXG5cdFx0XHRwcmV2RWw6IFwiLmRvY3RvcnMtc3VyZ2VyeS1wcmV2XCIsXG5cdFx0fSxcblx0XHRzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG5cdFx0c3BhY2VCZXR3ZWVuOiAyMCxcblx0XHR3aWR0aDogMjkwLFxuXHRcdGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuXHRcdGluaXRpYWxTbGlkZTogMCxcblx0XHR3YXRjaE92ZXJmbG93OiB0cnVlLFxuXHRcdHBhZ2luYXRpb246IHtcblx0XHRcdGVsOiBcIi5kb2N0b3JzLXN1cmdlcnktcGFnaW5hdGlvblwiLFxuXHRcdFx0dHlwZTogXCJmcmFjdGlvblwiLFxuXHRcdH0sXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDk5Mjoge1xuXHRcdFx0XHR3aWR0aDogOTg5LFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDMyLFxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcblx0XHRcdFx0aW5pdGlhbFNsaWRlOiAxLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcbn1cblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kb2N0b3JzLWNvc21ldG9sb2d5LXNsaWRlcicpKSB7XG5cdGxldCBkb2N0b3JzQ29zbWV0b2xvZ3lTbGlkZXIgPSBuZXcgU3dpcGVyKFwiLmRvY3RvcnMtY29zbWV0b2xvZ3ktc2xpZGVyXCIsIHtcblx0XHRuYXZpZ2F0aW9uOiB7XG5cdFx0XHRuZXh0RWw6IFwiLmRvY3RvcnMtY29zbWV0b2xvZ3ktbmV4dFwiLFxuXHRcdFx0cHJldkVsOiBcIi5kb2N0b3JzLWNvc21ldG9sb2d5LXByZXZcIixcblx0XHR9LFxuXHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcblx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdHdpZHRoOiAyOTAsXG5cdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0aW5pdGlhbFNsaWRlOiAwLFxuXHRcdHdhdGNoT3ZlcmZsb3c6IHRydWUsXG5cdFx0cGFnaW5hdGlvbjoge1xuXHRcdFx0ZWw6IFwiLmRvY3RvcnMtY29zbWV0b2xvZ3ktcGFnaW5hdGlvblwiLFxuXHRcdFx0dHlwZTogXCJmcmFjdGlvblwiLFxuXHRcdH0sXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDk5Mjoge1xuXHRcdFx0XHR3aWR0aDogOTg5LFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDMyLFxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcblx0XHRcdFx0aW5pdGlhbFNsaWRlOiAxLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcbn1cblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kb2N0b3JzLW1lZGljaW5lLXNsaWRlcicpKSB7XG5cdGxldCBkb2N0b3JzTWVkaWNpbmVTbGlkZXIgPSBuZXcgU3dpcGVyKFwiLmRvY3RvcnMtbWVkaWNpbmUtc2xpZGVyXCIsIHtcblx0XHRuYXZpZ2F0aW9uOiB7XG5cdFx0XHRuZXh0RWw6IFwiLmRvY3RvcnMtbWVkaWNpbmUtbmV4dFwiLFxuXHRcdFx0cHJldkVsOiBcIi5kb2N0b3JzLW1lZGljaW5lLXByZXZcIixcblx0XHR9LFxuXHRcdHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcblx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdHdpZHRoOiAyOTAsXG5cdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0aW5pdGlhbFNsaWRlOiAwLFxuXHRcdHdhdGNoT3ZlcmZsb3c6IHRydWUsXG5cdFx0cGFnaW5hdGlvbjoge1xuXHRcdFx0ZWw6IFwiLmRvY3RvcnMtbWVkaWNpbmUtcGFnaW5hdGlvblwiLFxuXHRcdFx0dHlwZTogXCJmcmFjdGlvblwiLFxuXHRcdH0sXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDk5Mjoge1xuXHRcdFx0XHR3aWR0aDogOTg5LFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDMyLFxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcblx0XHRcdFx0aW5pdGlhbFNsaWRlOiAxLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcbn1cblxuXG4vLyBEYXRlVGltZSBwaWNrZXJcbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZXRpbWVwaWNrZXInKSAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+PSA5OTIpIHtcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGV0aW1lcGlja2VyJykudHlwZSA9ICd0ZXh0Jztcblx0JCgnI2RhdGV0aW1lcGlja2VyJykuZGF0ZXRpbWVwaWNrZXIoKTtcblx0JC5kYXRldGltZXBpY2tlci5zZXRMb2NhbGUoJ3J1Jyk7XG59XG5cblxuLy8gU2Nyb2xsRmFkZVxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGxGYWRlJykpIHtcblx0bGV0IGZhZGVFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Njcm9sbEZhZGUnKTtcblxuXHRmdW5jdGlvbiBzY3JvbGxGYWRlKCkge1xuXHRcdGxldCB2aWV3cG9ydEJvdHRvbSA9IHdpbmRvdy5zY3JvbGxZICsgd2luZG93LmlubmVySGVpZ2h0O1xuXG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZhZGVFbGVtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRcdGxldCBlbGVtZW50ID0gZmFkZUVsZW1lbnRzW2luZGV4XTtcblx0XHRcdGxldCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0bGV0IGVsZW1lbnRGb3VydGggPSByZWN0LmhlaWdodCAvIDQ7XG5cdFx0XHRsZXQgZmFkZUluUG9pbnQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBlbGVtZW50Rm91cnRoO1xuXHRcdFx0bGV0IGZhZGVPdXRQb2ludCA9IC0ocmVjdC5oZWlnaHQgLyAyKTtcblxuXHRcdFx0aWYgKHJlY3QudG9wIDw9IGZhZGVJblBvaW50KSB7XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsRmFkZS0tdmlzaWJsZScpO1xuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbEZhZGUtLWFuaW1hdGUnKTtcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxGYWRlLS1oaWRkZW4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsRmFkZS0tdmlzaWJsZScpO1xuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbEZhZGUtLWhpZGRlbicpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbEZhZGUpO1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2Nyb2xsRmFkZSk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0c2Nyb2xsRmFkZSgpO1xuXHR9KTtcbn1cblxuXG4vLyBMaWdodGJveFxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWduaWZ5LWl0ZW1zJykpIHtcblx0JCgnLm1hZ25pZnktaXRlbXMnKS5tYWduaWZpY1BvcHVwKHtcblx0XHRkZWxlZ2F0ZTogJ2EnLFxuXHRcdHR5cGU6ICdpbWFnZScsXG5cdH0pO1xufVxuXG5cbi8vIFNjaGVkdWxlIGRhdGVwaWNrZXIgKHphYnV0b19jYWxlbmRhcilcbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnVwLWNhbGVuZGFyJykpIHtcblx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0eWVhcjogJ251bWVyaWMnLFxuXHRcdG1vbnRoOiAnbnVtZXJpYycsXG5cdFx0ZGF5OiAnbnVtZXJpYycsXG5cdFx0dGltZXpvbmU6ICdVVEMnXG5cdH07XG5cblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdCQoXCIjc2lnbnVwLWNhbGVuZGFyXCIpLnphYnV0b19jYWxlbmRhcih7XG5cdFx0XHRsYW5ndWFnZTogJ3J1Jyxcblx0XHRcdHNob3dfZGF5czogdHJ1ZSxcblx0XHRcdGNsYXNzbmFtZTogJ3RhYmxlIHRhYmxlLWJvcmRlcmVkIGNsaWNrYWJsZSBsaWdodGdyZXktd2Vla2VuZHMnLFxuXHRcdFx0bmF2aWdhdGlvbl9tYXJrdXA6IHtcblx0XHRcdFx0cHJldjogYDxzdmcgd2lkdGg9XCI0MlwiIGhlaWdodD1cIjEyXCIgdmlld0JveD1cIjAgMCA0MiAxMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0wLjQ3MDUwOSA2LjUzMDMzQzAuMTc3NjE2IDYuMjM3NDQgMC4xNzc2MTYgNS43NjI1NiAwLjQ3MDUwOSA1LjQ2OTY3TDUuMjQzNDggMC42OTY2OTlDNS41MzYzNyAwLjQwMzgwNiA2LjAxMTI1IDAuNDAzODA2IDYuMzA0MTQgMC42OTY2OTlDNi41OTcwMyAwLjk4OTU5MyA2LjU5NzAzIDEuNDY0NDcgNi4zMDQxNCAxLjc1NzM2TDIuMDYxNSA2TDYuMzA0MTQgMTAuMjQyNkM2LjU5NzAzIDEwLjUzNTUgNi41OTcwMyAxMS4wMTA0IDYuMzA0MTQgMTEuMzAzM0M2LjAxMTI1IDExLjU5NjIgNS41MzYzNyAxMS41OTYyIDUuMjQzNDggMTEuMzAzM0wwLjQ3MDUwOSA2LjUzMDMzWk00MS41NzIzIDYuNzVIMS4wMDA4NFY1LjI1SDQxLjU3MjNWNi43NVpcIiBmaWxsPVwiIzFFMUUxRVwiLz5cbjwvc3ZnPmAsXG5cdFx0XHRcdG5leHQ6IGA8c3ZnIHdpZHRoPVwiNDJcIiBoZWlnaHQ9XCIxMlwiIHZpZXdCb3g9XCIwIDAgNDIgMTJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNDEuNTI5NSA2LjUzMDMzQzQxLjgyMjQgNi4yMzc0NCA0MS44MjI0IDUuNzYyNTYgNDEuNTI5NSA1LjQ2OTY3TDM2Ljc1NjUgMC42OTY2OTlDMzYuNDYzNiAwLjQwMzgwNiAzNS45ODg4IDAuNDAzODA2IDM1LjY5NTkgMC42OTY2OTlDMzUuNDAzIDAuOTg5NTkzIDM1LjQwMyAxLjQ2NDQ3IDM1LjY5NTkgMS43NTczNkwzOS45Mzg1IDZMMzUuNjk1OSAxMC4yNDI2QzM1LjQwMyAxMC41MzU1IDM1LjQwMyAxMS4wMTA0IDM1LjY5NTkgMTEuMzAzM0MzNS45ODg4IDExLjU5NjIgMzYuNDYzNiAxMS41OTYyIDM2Ljc1NjUgMTEuMzAzM0w0MS41Mjk1IDYuNTMwMzNaTTAuNDI3NzM0IDYuNzVINDAuOTk5MlY1LjI1SDAuNDI3NzM0VjYuNzVaXCIgZmlsbD1cIiMxRTFFMUVcIi8+XG48L3N2Zz5gXG5cdFx0XHR9LFxuXHRcdH0pO1xuXHR9KTtcblxuXHQkKFwiI3NpZ251cC1jYWxlbmRhclwiKS5vbignemFidXRvOmNhbGVuZGFyOmRheScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0JChcInRkLnphYnV0by1jYWxlbmRhcl9fZGF5LS10b2RheVwiKS5yZW1vdmVDbGFzcygnemFidXRvLWNhbGVuZGFyX19kYXktLXRvZGF5Jyk7XG5cdFx0JChlLmVsZW1lbnQpLmFkZENsYXNzKCd6YWJ1dG8tY2FsZW5kYXJfX2RheS0tdG9kYXknKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0ZWQtZGF0ZScpLnRleHRDb250ZW50ID0gbmV3IERhdGUoZS52YWx1ZSkudG9Mb2NhbGVTdHJpbmcoXCJydVwiLCBvcHRpb25zKTtcblx0fSk7XG5cblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGVkLWRhdGUnKS50ZXh0Q29udGVudCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoXCJydVwiLCBvcHRpb25zKTtcbn1cblxuXG4vLyBTY2hlZHVsZSB0aW1lcGlja2VyXG5jb25zdCB0aW1lcGlja2VyTGF5b3V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lcGlja2VyLWxheW91dHMnKTtcbmlmICh0aW1lcGlja2VyTGF5b3V0cykge1xuXHRsZXQgaXRlbXMgPSBbLi4udGltZXBpY2tlckxheW91dHMucXVlcnlTZWxlY3RvckFsbCgnLnRpbWUtaXRlbScpXTtcblx0Y29uc3QgdGltZUVsbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RlZC10aW1lJyk7XG5cblx0Y29uc3Qgc2VsZWN0VGltZSA9IChldnQpID0+IHtcblx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblx0XHR0aW1lRWxtLnRleHRDb250ZW50ID0gZXZ0LmN1cnJlbnRUYXJnZXQudGV4dENvbnRlbnQ7XG5cdFx0ZXZ0LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgndGltZS1zZWxlY3RlZCcpO1xuXHR9XG5cblx0aXRlbXMuZm9yRWFjaCgoZWwsIF8sIGFycikgPT4ge1xuXHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuXHRcdFx0YXJyLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgndGltZS1zZWxlY3RlZCcpKVxuXHRcdFx0c2VsZWN0VGltZShldnQpO1xuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBDaGFuZ2UgbGF5b3V0IHBhZ2VzXG5cdGNvbnN0IGFjdGl2ZUNsYXNzTmFtZSA9ICdhY3RpdmUnO1xuXHRjb25zdCBidG5QcmV2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1wcmV2Jyk7XG5cdGNvbnN0IGJ0bk5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5leHQnKTtcblxuXHRidG5QcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQnV0dG9uQ2xpY2spO1xuXHRidG5OZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQnV0dG9uQ2xpY2spO1xuXG5cdGZ1bmN0aW9uIGhhbmRsZUJ1dHRvbkNsaWNrKGV2dCkge1xuXHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCBjdXJyZW50ID0gdGltZXBpY2tlckxheW91dHMucXVlcnlTZWxlY3RvcignLnRpbWVwaWNrZXIuYWN0aXZlJyk7XG5cdFx0bGV0IHRhcmdldCA9IGV2dC5jdXJyZW50VGFyZ2V0ID09PSBidG5QcmV2ID8gY3VycmVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIDogY3VycmVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cdFx0aWYgKHRhcmdldCkge1xuXHRcdFx0Y3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZUNsYXNzTmFtZSk7XG5cdFx0XHR0YXJnZXQuY2xhc3NMaXN0LmFkZChhY3RpdmVDbGFzc05hbWUpO1xuXHRcdH1cblx0fVxufVxuXG4iXSwiZmlsZSI6Im1haW4uanMifQ==