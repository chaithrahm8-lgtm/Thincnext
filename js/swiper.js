var swiper = new Swiper(".testimonial", {
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  centeredSlides: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 20,allowTouchMove: true,
  loop: true,
   breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    }
  }
});

// service section script
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.feature-item');
    const mainImg = document.getElementById('main-img');
    let currentIndex = 0;
    let autoPlay;

    function activate(index) {
        clearInterval(autoPlay);
        
        // Remove active from all
        items.forEach(item => item.classList.remove('active'));
        
        // Set new active
        currentIndex = index;
        const activeItem = items[currentIndex];
        activeItem.classList.add('active');

        // Swap Image
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = activeItem.getAttribute('data-img');
            mainImg.style.opacity = '1';
        }, 300);

        // Auto move to next after 5 seconds
        autoPlay = setInterval(() => {
            let next = (currentIndex + 1) % items.length;
            activate(next);
        }, 5000);
    }

    // Manual Click
    items.forEach((item, index) => {
        item.addEventListener('click', () => activate(index));
    });

    activate(0);
});


// Continuous Marquee Swiper Loop Initialization
    document.addEventListener('DOMContentLoaded', () => {
        new Swiper('.marquee-swiper', {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 3000, 
            autoplay: {
                delay: 0, 
                disableOnInteraction: false,
            },
            allowTouchMove: false, 
        });
    });

