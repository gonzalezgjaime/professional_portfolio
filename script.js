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

// call observer on profile section
profileObserver.observe(profile);

// TODO create stagger animation for thought process section left to right

// create dynamic thought detail based on clicked thought
const detailTitle = document.querySelector('#timeline-detail h2');
const detailText = document.querySelector('#timeline-detail p');
const thoughts = document.querySelectorAll('#timeline .circle');

thoughts.forEach(thought => {
    // thought.addEventListener('click', function () {
    //     toggleThoughts(this);
    //     this.classList.remove('active-thought');
    //     this.classList.add('active-thought');
    // });
    thought.addEventListener('mouseover', function () {
        toggleThoughts(this);
    });
});

// create objects for thought details
const titles = {
    1: 'Discover',
    2: 'Strategy',
    3: 'Design',
    4: 'Build'
};

const texts = {
    1: 'Crucial phase before embarking any technological transformation. Empathically understanding the business, core concepts and processes, information flows, and the people involved; are pillars of a successful approach to any project. These concepts and abstractions are then translated into clear quantifiable and measurable objectives.',
    2: 'Once the objectives are clear, the strategy is defined. This is the phase where the solution is designed, the technologies are selected, and the project is planned. The strategy is the roadmap to the solution.',
    3: 'The design phase is where the solution is materialized. The solution is designed, developed, and tested. The solution is then deployed and the users are trained. The solution is then monitored and maintained.',
    4: 'The design phase is where the solution is materialized. The solution is designed, developed, and tested. The solution is then deployed and the users are trained. The solution is then monitored and maintained.'
};

// function to toggle thought details based on clicked/hovered thought
function toggleThoughts(thought) {
    const thoughtText = thought.textContent.trim();
    if (titles.hasOwnProperty(thoughtText)) {
        detailTitle.innerText = titles[thoughtText];
        detailText.innerText = texts[thoughtText];
    }

}

// function to toggle resume experience details
const resumeTimeline = document.querySelectorAll('#resume-timeline .date');
const title = document.querySelector('#resume-content #title');
const subTitle = document.querySelector('#resume-content #subTitle');
const content = document.querySelector('#resume-content #content');
const resume = {
    '2022 - present': {
        title: 'Entrepreneurship & personal projects',
        subTitle: 'Gray Beard Labs, San Diego',
        content: 'Actively expanding my development & DevOps skills through the creation of a multi-tenant SaaS web application designed to streamline operations for online shops, including those involved in physical product manufacturing. This involves developing key features such as: Amazon & Shopify integration for order management End-to-end operations management (from purchase orders to inventory control and production scheduling) Integrating with shipping companies for in-app label purchasing.'
    },
    '2018 - 2022': {
        title: 'Senior Software Engineer',
        subTitle: 'Cubic Transportation Systems, San Diego',
        content: 'Developed and maintained a multi-tenant SaaS web application designed to streamline operations for public transportation agencies. This involved developing key features such as: Integration with third-party systems for real-time data collection and processing. End-to-end operations management (from scheduling to fare collection and reporting). Integrating with payment processors for in-app ticket purchasing.'
    },
    '2014 - 2018': {
        title: 'Software Engineer 4',
        subTitle: 'Cubic Transportation Systems, San Diego',
        content: 'Developed and maintained a multi-tenant SaaS web application designed to streamline operations for public transportation agencies. This involved developing key features such as: Integration with third-party systems for real-time data collection and processing. End-to-end operations management (from scheduling to fare collection and reporting). Integrating with payment processors for in-app ticket purchasing.'
    },
    '2013 - 2014': {
        title: 'Software Engineer 3',
        subTitle: 'Cubic Transportation Systems, San Diego',
        content: 'Developed and maintained a multi-tenant SaaS web application designed to streamline operations for public transportation agencies. This involved developing key features such as: Integration with third-party systems for real-time data collection and processing. End-to-end operations management (from scheduling to fare collection and reporting). Integrating with payment processors for in-app ticket purchasing.'
    },
    '2011 - 2012': {
        title: 'Software Engineer 2',
        subTitle: 'Cubic Transportation Systems, San Diego',
        content: 'Developed and maintained a multi-tenant SaaS web application designed to streamline operations for public transportation agencies. This involved developing key features such as: Integration with third-party systems for real-time data collection and processing. End-to-end operations management (from scheduling to fare collection and reporting). Integrating with payment processors for in-app ticket purchasing.'
    },
    '2010 - 2011': {
        title: 'Software Engineer 1',
        subTitle: 'Cubic Transportation Systems, San Diego',
        content: 'Developed and maintained a multi-tenant SaaS web application designed to streamline operations for public transportation agencies. This involved developing key features such as: Integration with third-party systems for real-time data collection and processing. End-to-end operations management (from scheduling to fare collection and reporting). Integrating with payment processors for in-app ticket purchasing.'
    },
    '2008 - 2009': {
        title: 'Software Engineer Intern',
        subTitle: 'Cubic Transportation Systems, San Diego',
        content: 'Developed and maintained a multi-tenant SaaS web application designed to streamline operations for public transportation agencies. This involved developing key features such as: Integration with third-party systems for real-time data collection and processing. End-to-end operations management (from scheduling to fare collection and reporting). Integrating with payment processors for in-app ticket purchasing.'
    },
}

// console.log(resumeTimeline);
function toggleExperience () {
    resumeTimeline.forEach((date, i) => {
        date.addEventListener('mouseover', function () {
            const dateString = date.innerText.trim();
            const resumeItem = resume[dateString];
            console.log(resumeItem);
            if (resumeItem) {
                console.log('hello');
                title.innerText = resumeItem.title;
                subTitle.innerText = resumeItem.subTitle;
                content.innerText = resumeItem.content;
            }
        });
    });
}

toggleExperience();

// create function to toggle project modal
const projects = document.querySelectorAll('#cards-container .card');
const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modalTitle');
const modalContent = document.querySelector('#modalContent');

const closeBtn = document.querySelector('#close');

// create objects for project details
const projectDetails = {
    card1: {
        title: 'Personal Portfolio',
        detail: '',
    },
    card2: {
        title: 'SaaS Mfg Ops Management',
        detail: '',
    },
    card3: {
        title: 'E-commerce Solution',
        detail: '',
    },
}
// check cards for click event and render modal with appropriate details
projects.forEach((project, i) => {
    console.log(project);
    project.addEventListener('click', function () {
       if (projectDetails.hasOwnProperty(project.id)) {
              const projectDetail = projectDetails[project.id];
              toggleModal(projectDetail.title, projectDetail.detail);
       }
    });
});

function toggleModal(title, content) {
    modal.classList.toggle('hidden');
    modalTitle.innerText = title;
    modalContent.innerText = content;
}

closeBtn.addEventListener('click', function () {
    modal.classList.add('hidden');
});
