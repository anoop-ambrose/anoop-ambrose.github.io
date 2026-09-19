/* =========================================================
   ANOOP AMBROSE — PORTFOLIO INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileMenu.style.display === "block";

            mobileMenu.style.display =
                isOpen ? "none" : "block";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );
        });

        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mobileMenu.style.display = "none";

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                });

            });
    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".focus-card, " +
        ".featured-project-content, " +
        ".featured-project-visual, " +
        ".certification-card, " +
        ".cta-content"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, obs) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        obs.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =========================
       SMOOTH INTERNAL LINKS
    ========================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* =========================
       ACTIVE NAVIGATION ON SCROLL
    ========================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks =
        document.querySelectorAll(".nav-link");

    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        const id =
                            entry.target.getAttribute("id");

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                    });

                },
                {
                    threshold: 0.4
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    /* =========================
       BUTTON RIPPLE
    ========================= */

    document
        .querySelectorAll(".btn")
        .forEach(button => {

            button.addEventListener("click", event => {

                const ripple =
                    document.createElement("span");

                const rect =
                    button.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                ripple.style.position = "absolute";
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;
                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;
                ripple.style.borderRadius = "50%";
                ripple.style.background =
                    "rgba(255,255,255,0.18)";
                ripple.style.pointerEvents = "none";
                ripple.style.transform = "scale(0)";
                ripple.style.animation =
                    "buttonRipple 0.55s ease-out";

                button.style.position = "relative";
                button.style.overflow = "hidden";

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);

            });

        });


    /* =========================
       HERO PHOTO PARALLAX
       Very subtle — professional,
       not distracting.
    ========================= */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (
        heroVisual &&
        window.matchMedia(
            "(prefers-reduced-motion: no-preference)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX / window.innerWidth - 0.5);

                const y =
                    (event.clientY / window.innerHeight - 0.5);

                const profile =
                    document.querySelector(".profile-frame");

                if (profile) {

                    profile.style.transform =
                        `translate(${x * 5}px, ${y * 5}px)`;

                }

            },
            { passive: true }
        );
    }

});


/* =========================
   RIPPLE ANIMATION
========================= */

const rippleStyle =
document.createElement("style");

rippleStyle.textContent = `
@keyframes buttonRipple {
    to {
        transform: scale(2.2);
        opacity: 0;
    }
}
`;

document.head.appendChild(rippleStyle);
