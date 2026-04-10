// GSAP Counter
      document.addEventListener("DOMContentLoaded", () => {
        const counters = document.querySelectorAll(".counter-val");
        const animateCounter = (el) => {
          const targetValue = parseInt(el.getAttribute("data-target"));
          gsap.to(el, {
            innerText: targetValue,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: "power2.out",
            onUpdate: function () {
              el.innerHTML = Math.ceil(this.targets()[0].innerText);
            },
          });
        };

        const observerOptions = { threshold: 0.7 };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);

        counters.forEach((counter) => observer.observe(counter));
      });