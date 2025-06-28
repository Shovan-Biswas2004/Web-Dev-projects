document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-section');
  const cards = document.querySelectorAll('.floating-card');

  if (!hero || cards.length === 0) {
    console.error("Element not found");
    return;
  }

  hero.addEventListener('mouseenter', () => {
    cards.forEach(card => {
      card.style.background = '#FFFDF6';
      card.style.borderColor = 'rgba(255, 255, 255, 0.5)';
      card.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)';
      card.style.color = '#000';

      const paragraph = card.querySelector('p');
      if (paragraph) paragraph.style.color = '#000';
    });
  });

  hero.addEventListener('mouseleave', () => {
    cards.forEach(card => {
      card.style.background = 'rgba(255, 255, 255, 0.15)';
      card.style.borderColor = 'rgba(255, 255, 255, 0.18)';
      card.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.37)';
      card.style.color = '#FFF1CA';

      const paragraph = card.querySelector('p');
      if (paragraph) paragraph.style.color = '#FAF6E9';
    });
  });
});

const iconContainer = document.getElementById("iconContainer");

const iconClasses = [
  "fab fa-facebook-f",
  "fab fa-twitter",
  "fab fa-instagram",
  "fab fa-linkedin-in",
  "fab fa-youtube",
  "fab fa-github",
  "fab fa-reddit-alien",
  "fab fa-pinterest-p"
];

let currentIndex = 0;

function updateIcons() {
  iconContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const icon = document.createElement("i");
    icon.className = iconClasses[(currentIndex + i) % iconClasses.length] + " social-icon icon-pop";
    
    icon.addEventListener("animationend", () => {
      icon.classList.remove("icon-pop");
    });

    iconContainer.appendChild(icon);
  }

  currentIndex = (currentIndex + 1) % iconClasses.length;
}

// Initial load
updateIcons();

// Change icons every 5 seconds
setInterval(updateIcons, 5000);
