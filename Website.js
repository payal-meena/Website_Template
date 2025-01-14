document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');

  // Active link set on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-link.active')?.classList.remove('active');
      link.classList.add('active');
    });  
  });

  // Active link set based on current page
  const currentPath = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});
    // Select all collapsible buttons
    const collapsibles = document.querySelectorAll(".collapsible");

    collapsibles.forEach((collapsible) => {
      collapsible.addEventListener("click", function () {
        // Close all other sections
        collapsibles.forEach((item) => {
          if (item !== this) {
            item.classList.remove("active");
            item.nextElementSibling.style.maxHeight = null;
          }
        });

        // Toggle the current section
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null; // Collapse content
        } else {
          content.style.maxHeight = content.scrollHeight + "px"; // Expand content
        }
      });
    });


function animateCounters(speedMultiplier = 0.5, duration = 1000) {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"), 10); 
      let current = 0;
      const incrementSpeed = (duration / target) / speedMultiplier;
      function updateCounter() {
          if (current < target) {
              current++;
              if(target === 128){
                counter.textContent = current + "K+";
              }
              else{
                counter.textContent = current;
              }
              setTimeout(updateCounter, incrementSpeed);
          } else {
            counter.textContent = target === 128 ? target + "K+" : target;
        }
      }

      updateCounter();
  });
}

// Start the animation
animateCounters();

// Show/Hide Scroll to Top Button
window.addEventListener('scroll', function () {
  const scrollToTopButton = document.getElementById('scrollToTopBtn');
  if (window.scrollY > 20) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

// Scroll to Top Smoothly
document.getElementById('scrollToTopBtn')?.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});


// form validation
document.addEventListener('DOMContentLoaded', function () {
const form = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');
const submitBtn = document.getElementById('submitBtn');

const fnameError = document.getElementById('fnameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

submitBtn.addEventListener('click', function (event) {
    event.preventDefault(); 

    const fname = document.getElementById('fname');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let isValid = true;  

    fnameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    if (fname.value.trim() === '') {
        fnameError.textContent = 'Full Name is required.';
        isValid = false;
    }

    const emailValue = email.value.trim();
    if (emailValue === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) { // Check valid email format
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (message.value.trim() === '') {
        messageError.textContent = 'Message is required.';
        isValid = false;
    }

    if (isValid) {
        form.style.display = 'none';
        thankYouMessage.style.display = 'block';
    }
});
});


document.addEventListener("DOMContentLoaded", () => {
  const firstContent = document.querySelector(".content");
  // if (firstContent) {
  //   firstContent.style.display = "block"; 
  // }
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach((button, index) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
});

