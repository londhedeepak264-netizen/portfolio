const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open and close the mobile navigation
menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    const menuIsOpen = navLinks.classList.contains("open");

    menuToggle.textContent = menuIsOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", menuIsOpen);
    menuToggle.setAttribute(
        "aria-label",
        menuIsOpen ? "Close navigation" : "Open navigation"
    );
});

// Close the menu when a navigation link is clicked
const navItems = navLinks.querySelectorAll("a");

navItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});

// Show elements when they enter the screen
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealItems.forEach(function (item) {
        revealObserver.observe(item);
    });
} else {
    // Fallback for browsers without IntersectionObserver
    revealItems.forEach(function (item) {
        item.classList.add("visible");
    });
}

// Contact form demo
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const visitorName = document.getElementById("name").value.trim();

    if (!visitorName) {
        formStatus.textContent = "Please enter your name.";
        return;
    }

    formStatus.textContent =
        "Thanks, " + visitorName +
        "! The demo form was submitted successfully.";

    contactForm.reset();
});