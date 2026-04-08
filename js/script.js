// index nav
document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Elements for Services
    const servicesBtn = document.getElementById('services-btn');
    const servicesMenu = document.getElementById('services-menu');
    const servicesArrow = document.getElementById('services-arrow');

    // 2. Get Elements for Offer
    const offerBtn = document.getElementById('offer-btn');
    const offerMenu = document.getElementById('offer-menu');
    const offerArrow = document.getElementById('offer-arrow');

    /**
     * Helper function to toggle a specific menu
     */
    function toggleDropdown(menu, arrow, otherMenu, otherArrow) {
        const isHidden = menu.classList.contains('invisible');

        // Close the other menu if it's open
        if (otherMenu) {
            closeSpecificMenu(otherMenu, otherArrow);
        }

        if (isHidden) {
            // Show requested menu
            menu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
            menu.classList.add('opacity-100', 'visible', 'translate-y-0');
            arrow.classList.add('rotate-180');
        } else {
            // Hide requested menu
            closeSpecificMenu(menu, arrow);
        }
    }

    /**
     * Helper function to close a specific menu
     */
    function closeSpecificMenu(menu, arrow) {
        if (menu && arrow) {
            menu.classList.add('opacity-0', 'invisible', 'translate-y-2');
            menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
            arrow.classList.remove('rotate-180');
        }
    }

    // --- Event Listeners ---

    // Click for Services
    servicesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(servicesMenu, servicesArrow, offerMenu, offerArrow);
    });

    // Click for Offer
    offerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(offerMenu, offerArrow, servicesMenu, servicesArrow);
    });

    // Close all menus when clicking anywhere else on the page
    window.addEventListener('click', () => {
        closeSpecificMenu(servicesMenu, servicesArrow);
        closeSpecificMenu(offerMenu, offerArrow);
    });
});

// about nav


// index script
window.addEventListener("load", () => {
    const textTrack = document.querySelector("#smooth-marquee");

    if (textTrack) {
        // Initialize the GSAP animation
        const loop = gsap.to(textTrack, {
            xPercent: -50,   // Move left by exactly half the total width
            ease: "none",    // Constant speed (no slowing down)
            duration: 10,    // Time for one full cycle (increase for slower motion)
            repeat: -1       // Loop forever
        });

        // Pause when the user hovers over the text
        textTrack.addEventListener("mouseenter", () => loop.pause());
        
        // Resume when the mouse leaves
        textTrack.addEventListener("mouseleave", () => loop.play());
    }
});
// Register GSAP ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Design for Startups',
        description: "We host and maintain our own solutions & offer on-going analysis & ideas sessions plus design retainers to accelerate your growth.",
        bgImage: 'https://picsum.photos/id/1/800/1200'
    },
    {
        title: 'Web Technology',
        description: "We develop scalable websites & applications that work. Whether it is powerful content management, e-commerce or a killer app.",
        bgImage: 'https://picsum.photos/id/2/800/1200'
    },
    {
        title: 'Apps Development',
        description: "Our discovery processes are designed to get under the hood of your brand & empathise with your audience to build winning mobile solutions.",
        bgImage: 'https://picsum.photos/id/3/800/1200'
    },
    {
        title: 'Cyber Security',
        description: "The digital world has various types of insecurities. Security is paramount to protect the data linked to our daily applications and infrastructure.",
        bgImage: 'https://picsum.photos/id/4/800/1200'
    },
    {
        title: 'Digital Marketing',
        description: "Social media marketing has become the greatest source to brand. We offer high-quality SEO, PPC campaigns, and holistic branding strategies.",
        bgImage: 'https://picsum.photos/id/5/800/1200'
    }
];

const buttonsContainer = document.getElementById('buttons-container');
const activeIndicator = document.getElementById('active-indicator');
const serviceBg = document.getElementById('service-bg');

let activeIndex = 0;

function initServices() {
    services.forEach((service, index) => {
        const item = document.createElement('div');
        
        // Vertical line styling from your image
        item.className = `feature-item group cursor-pointer border-l-[3px] md:border-l-0 pl-10 md:pl-12 py-8 transition-all duration-500 
                         ${index === 0 ? 'border-blue-600' : 'border-slate-100 hover:border-blue-200'}`;
        
        item.innerHTML = `
            <h3 class="text-2xl md:text-4xl font-bold tracking-[0.15em] text-slate-400 uppercase transition-all duration-300 group-hover:text-slate-800">
                ${service.title}
            </h3>
            <div class="feature-details overflow-hidden transition-all duration-500 max-h-0 opacity-0 mt-4 md:block">
                <p class="text-slate-500 text-lg leading-relaxed mb-6 max-w-md">${service.description}</p>
                <a href="#" class="inline-block text-blue-600 font-bold uppercase text-xs tracking-[0.2em] border-b-2 border-transparent hover:border-blue-600 transition-all">read more</a>
            </div>
        `;
        
        item.addEventListener('click', () => {
            if (activeIndex === index) return;
            activeIndex = index;
            updateUI(item, service, index);
        });

        buttonsContainer.appendChild(item);
    });

    // Set initial state
    serviceBg.style.backgroundImage = `url('${services[0].bgImage}')`;
    const firstItem = buttonsContainer.children[1]; // children[0] is the indicator
    if(window.innerWidth < 768) toggleMobileDetails(0);
}

function updateUI(clickedItem, service, index) {
    // 1. Move Desktop Indicator
    if (window.innerWidth >= 768) {
        gsap.to(activeIndicator, {
            y: clickedItem.offsetTop,
            height: clickedItem.offsetHeight,
            duration: 0.6,
            ease: "expo.out"
        });
    }

    // 2. Update Text Colors & Borders
    const items = buttonsContainer.querySelectorAll('.feature-item');
    items.forEach((item, i) => {
        const title = item.querySelector('h3');
        if (i === index) {
            item.classList.replace('border-slate-100', 'border-blue-600');
            title.classList.replace('text-slate-400', 'text-slate-900');
        } else {
            item.classList.replace('border-blue-600', 'border-slate-100');
            title.classList.replace('text-slate-900', 'text-slate-400');
        }
    });

    // 3. Mobile Details Accordion
    toggleMobileDetails(index);

    // 4. Desktop Image Swap (GSAP)
    gsap.to(serviceBg, {
        opacity: 0,
        scale: 1.1,
        duration: 0.3,
        onComplete: () => {
            serviceBg.style.backgroundImage = `url('${service.bgImage}')`;
            gsap.to(serviceBg, { opacity: 1, scale: 1.05, duration: 0.6 });
        }
    });
}

function toggleMobileDetails(index) {
    const allDetails = buttonsContainer.querySelectorAll('.feature-details');
    allDetails.forEach((detail, i) => {
        if (i === index) {
            detail.style.maxHeight = "300px";
            detail.style.opacity = "1";
        } else {
            detail.style.maxHeight = "0";
            detail.style.opacity = "0";
        }
    });
}

document.addEventListener('DOMContentLoaded', initServices);



// GSAP

const tween1 = gsap.to(".track", {
  xPercent: -50,
  duration: 20,
  ease: "none",
  repeat: -1,
});

const track2 = document.querySelector(".track2");
gsap.set(track2, { xPercent: -50 });
const tween2 = gsap.to(track2, {
  xPercent: 0,
  duration: 20,
  ease: "none",
  repeat: -1,
});

function pauseMarquee(tween) {
  gsap.to(tween, { timeScale: 0, duration: 0.4, ease: "power2.out" });
}
function resumeMarquee(tween) {
  gsap.to(tween, { timeScale: 1, duration: 0.6, ease: "power2.inOut" });
}
document.querySelector(".marquee").addEventListener("mouseenter", () => pauseMarquee(tween1));
document.querySelector(".marquee").addEventListener("mouseleave", () => resumeMarquee(tween1));
document.querySelector(".marquee2").addEventListener("mouseenter", () => pauseMarquee(tween2));
document.querySelector(".marquee2").addEventListener("mouseleave", () => resumeMarquee(tween2));

// index script swiper
// var swiper = new Swiper(".testimonial", {
//   pagination: {
//     el: ".swiper-pagination",
//   },
//   navigation: {
//     nextEl: ".next",
//     prevEl: ".prev",
//   },
//   centeredSlides: true,
//   autoplay: {
//     delay: 4500,
//     disableOnInteraction: false,
//   },
//   slidesPerView: 3,
//   spaceBetween: 30,
//   loop: true,
// });

// var swiper = new Swiper(".v2Testimonials", {
//   pagination: {
//     el: ".swiper-pagination",
//     dynamicBullets: true,
//   },
//   spaceBetween: 30,
//   centeredSlides: true,
//   autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
//   },
// });
// // v2 script
// document.addEventListener("DOMContentLoaded", () => {
//     const items = document.querySelectorAll('.feature-item');
//     const mainImg = document.getElementById('main-img');
//     let currentIndex = 0;
//     let autoPlay;

//     function activate(index) {
//         clearInterval(autoPlay);
        
//         // Remove active from all
//         items.forEach(item => item.classList.remove('active'));
        
//         // Set new active
//         currentIndex = index;
//         const activeItem = items[currentIndex];
//         activeItem.classList.add('active');

//         // Swap Image
//         mainImg.style.opacity = '0';
//         setTimeout(() => {
//             mainImg.src = activeItem.getAttribute('data-img');
//             mainImg.style.opacity = '1';
//         }, 300);

//         // Auto move to next after 5 seconds
//         autoPlay = setInterval(() => {
//             let next = (currentIndex + 1) % items.length;
//             activate(next);
//         }, 5000);
//     }

//     // Manual Click
//     items.forEach((item, index) => {
//         item.addEventListener('click', () => activate(index));
//     });

//     activate(0);
// });


// var swiper = new Swiper(".mySwiperTestimonials", {
//     slidesPerView: 1,
//     spaceBetween: 20,
//     centeredSlides: true,
//     loop: true,
//     autoplay: {
//         delay: 2500,
//         disableOnInteraction: false,
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },

//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//   });
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Header Entrance
    gsap.from(".header-animate", {
        duration: 1.2,
        y: -30,
        opacity: 0,
        ease: "power3.out"
    });

    // Bento Grid Reveal
    gsap.from(".bento-card", {
        scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        duration: 0.8,
        y: 40,
        opacity: 0,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all"
    });
});