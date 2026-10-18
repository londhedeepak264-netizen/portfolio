document.documentElement.classList.add("js-enabled");
document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile navigation menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector("#nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            navLinks.classList.toggle("open", !isOpen);
        });

        // Close when clicking outside the navigation.
        document.addEventListener("click", event => {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu using Escape key
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                if (document.activeElement && navLinks.contains(document.activeElement)) menuToggle.focus();
            }
        });
    }

    // 2. Scroll reveal animations
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });
    }

    // 3. Highlight the active navigation link while scrolling
    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(
        '#nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navigationLinks.forEach(link => {
                            const isActive =
                                link.getAttribute("href") ===
                                `#${entry.target.id}`;

                            link.classList.toggle("active", isActive);

                            if (isActive) {
                                link.setAttribute("aria-current", "location");
                            } else {
                                link.removeAttribute("aria-current");
                            }
                        });
                    }
                });
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // 4. Contact form: open the visitor's email application
    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;
            const name = contactForm.querySelector('[name="name"]')?.value.trim();
            const email = contactForm.querySelector('[name="email"]')?.value.trim();
            const subject = contactForm.querySelector('[name="subject"]')?.value.trim();
            const message = contactForm.querySelector('[name="message"]')?.value.trim();

            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields.");
                return;
            }

            const recipient = "londhedeepak264@gmail.com";
            const emailSubject = encodeURIComponent(subject);
            const emailBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            const note = document.querySelector("#form-note");
            if (note) note.textContent = "Opening your email app. Review and send the prepared message there; it has not been sent yet.";
            window.location.href =
                `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
        });
    }

    // 5. Automatically update the copyright year
    const yearElement = document.querySelector("#copyright-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 6. Smooth scrolling for internal navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });
                if (target.id === "main") target.focus({ preventScroll: true });
            }
        });
    });
});
