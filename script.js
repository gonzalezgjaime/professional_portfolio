// function to smooth scroll to the navlinks, avoiding overlap w/ navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        let targetPos = document.querySelector(this.getAttribute('href')).offsetTop;
        let navbarHeight = document.querySelector('nav').offsetHeight;

        window.scrollTo({
            top: targetPos - navbarHeight,
            behavior: 'smooth',
        });

    });


});

// set active navlink on click
const navLinks = document.querySelectorAll('#navLinks a');
const sections = document.querySelectorAll('section');
// console.log(sections);

navLinks.forEach((link, i) => {
    link.addEventListener('click', function () {
        activeMenu(i);
    });
});

function activeMenu(i) {
    navLinks.forEach((link, id) => {
        if (id === i) {
            link.classList.add(('border-b-4'));
            link.classList.add('border-b-blue-800');
        } else {
            link.classList.remove('border-b-blue-800');
            link.classList.remove(('border-b-4'));
        }
    });

}

// set active navlink on scroll
let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let sectionId = entry.target.getAttribute('id');
            let corrNavLink = document.querySelector(`#navLinks a[href="#${sectionId}"]`);
            let index = Array.from(navLinks).indexOf(corrNavLink);
            activeMenu(index);
        }
    });
}, { threshold: 0.5 }); //section is 50% visible

sections.forEach(section => {
    observer.observe(section);
});

// display mobile menu and toggle icon
const mobileMenu = document.querySelector('#navMenu');
const button = document.querySelector('button');
button.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
    // change mobile menu icon on click
    button.children[2].classList.toggle('hidden');
    button.children[3].classList.toggle('hidden');
});

// create typing effect for landing page text
const text = "Hello, I’m Jaime\n" +
    "Empowering your journey with tailored solutions,\n" +
    "streamlining processes, one automation at a time.";

document.addEventListener('DOMContentLoaded', animateText);
function animateText() {
    const introText = document.querySelector('#introText');
    introText.innerHTML = '';

    // Iterate over each character in the string
    for(let i = 0; i < text.length; i++) {
        setTimeout(() => {
            // Check if the character is a newline or a space
            if(text[i] === '\n') {
                // If it's a newline, append a <br> tag to innerHTML
                introText.innerHTML += '<br>';
            } else if(text[i] === ' ') {
                // If it's a space, append a &nbsp; to innerHTML
                introText.innerHTML += '&nbsp;';
            } else {
                introText.innerHTML += text[i];
            }
        }, 50 * i);
    }
}

// create slide in and out animations for profile section
const profile = document.querySelector('#profile');
const profileImg = document.querySelector('#profileImg');
const profileText = document.querySelector('#profileContent');
console.log(profileImg);

let profileObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
        if (entry.isIntersecting) {
            profileImg.classList.remove('-translate-x-[100%]');
            profileImg.classList.add('translate-x-0');
            profileText.classList.remove('translate-x-[100%]');
            profileText.classList.add('translate-x-0');
        }else {
            profileImg.classList.remove('translate-x-0');
            profileImg.classList.add('-translate-x-[100%]');
            profileText.classList.remove('translate-x-0');
            profileText.classList.add('translate-x-[100%]');
        }
    });
}, { threshold: 0.7 }); //section is 70% visible

profileObserver.observe(profile);
