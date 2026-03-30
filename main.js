/* ══════════════════════════════════════════════════════
   STIV TECH SOLUTIONS — main.js
   Author : Stephen Ikumbu Njenga
   File   : js/main.js
   Role   : All interactivity — nav, scroll, animations,
            cursor, form handling
   ══════════════════════════════════════════════════════ */

/* ─── 1. WAIT FOR DOM TO BE FULLY LOADED ─── */
document.addEventListener('DOMContentLoaded', () => {

  /* ─── 2. HAMBURGER / MOBILE NAV ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');       // show/hide menu panel
    });

    // Close menu when any nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ─── 3. NAV SCROLL SHRINK ─── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      // Add 'scrolled' class after scrolling 50px — triggers smaller padding via CSS
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ─── 4. CUSTOM CURSOR DOT ─── */
  const cursorDot = document.getElementById('cursorDot');
  if (cursorDot) {
    document.addEventListener('mousemove', e => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top  = e.clientY + 'px';
    });
  }

  /* ─── 5. SCROLL REVEAL ANIMATIONS ─── */
  // IntersectionObserver watches .reveal elements
  // When they enter the viewport → add .visible class → CSS transition plays
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay per card for a cascade effect
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 120);
        revealObserver.unobserve(entry.target); // animate once only
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ─── 6. SMOOTH ANCHOR SCROLL (#projects etc.) ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});/* end DOMContentLoaded */

/* ─── 7. CONTACT FORM HANDLER ─── */
// Called by onsubmit="handleSubmit(event)" in contact.html
function handleSubmit(e) {
  e.preventDefault(); // stop default browser form submit

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span>';

  // Collect field values
  const firstName = document.getElementById('firstName').value;
  const lastName  = document.getElementById('lastName').value;
  const email     = document.getElementById('email').value;
  const phone     = document.getElementById('phone').value;
  const subject   = document.getElementById('subject').value;
  const message   = document.getElementById('message').value;

  // Build a pre-filled mailto: link → opens user's email client
  const body = encodeURIComponent(
    `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n` +
    `Project Type: ${subject}\n\nMessage:\n${message}`
  );

  const mailtoUrl =
    `mailto:ikumbustephen39@gmail.com` +
    `?subject=${encodeURIComponent('Project Inquiry: ' + subject)}` +
    `&body=${body}`;

  // Small delay for UX feedback, then trigger mailto
  setTimeout(() => {
    window.location.href = mailtoUrl;
    // Show success state, hide form
    document.getElementById('contactForm').style.display   = 'none';
    document.getElementById('formSuccess').classList.add('show');
  }, 800);
}
