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

// vars for active navlink
const navLinks = document.querySelectorAll('#navLinks a');
const sections = document.querySelectorAll('section');


// close mobile menu when user clicks outside of it
document.addEventListener('click', function(e) {
    const clickedNavMenu = e.composedPath().includes(mobileMenu.target);
    const clickedButton = button.contains(e.target);
    if (!clickedNavMenu && !clickedButton && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        button.children[2].classList.toggle('hidden');
        button.children[3].classList.toggle('hidden');
    }
})

// close mobile menu when user clicks on a link
navLinks.forEach((link, i) => {
    link.addEventListener('click', function () {
        activeMenu(i);
        mobileMenu.classList.add('hidden');
        button.children[2].classList.toggle('hidden');
        button.children[3].classList.toggle('hidden');
    });
});

// function to set the active navlink
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
    mobileMenu.classList.toggle('flex');
    mobileMenu.classList.toggle('flex-col');

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
    1: 'Crucial phase before embarking on any technological transformation. Empathetically understanding the business, core concepts, process\', information flows, and the people involved; are pillars of a successful approach to any project. These concepts and abstractions are then translated into clear quantifiable and measurable objectives.',
    2: 'With a comprehensive understanding of our processes and their intrinsic operations, we can effectively define priorities, abstractions, and modularity. These elements coalesce into a concise roadmap that equips the team to navigate changes with flexibility and agility.',
    3: 'Having segmented and strategized, our strategy provides the framework for the design phase. It includes essential concepts like process flows, information flows, data models, and user stories. These notions are subsequently transformed into wireframes, mockups, and prototypes. Crucially, all these design representations undergo thorough reviews and receive approval from stakeholders before any development commences.',
    4: 'After meticulous and strategic planning, we\'re poised to construct the solution. This phase is characterized by its iterations. At the conclusion of each iteration (for instance, a Sprint in SCRUM or Agile), we deploy the developed functionality to production. This not only offers immediate value to the business but also furnishes us with the flexibility to adapt; a common necessity in real-world projects. We repeat this process until every module is deployed, culminating in a comprehensive solution.'
};

// function to toggle thought details based on clicked/hovered thought
function toggleThoughts(thought) {
    const thoughtText = thought.textContent.trim();
    if (titles.hasOwnProperty(thoughtText)) {
        detailTitle.innerText = titles[thoughtText];
        detailText.innerText = texts[thoughtText];
    }

}

// vars for resume timeline
const resumeTimeline = document.querySelectorAll('#resume-timeline .date');
const title = document.querySelector('#resume-content #title');
const subTitle = document.querySelector('#resume-content #subTitle');
const content = document.querySelector('#resume-content #content');
const resume = {
    '2022-present': {
        title: 'Entrepreneurship & personal projects',
        subTitle: 'Gray Beard Labs, San Diego',
        content: `<p class="text-md xl:text-xl">Actively expanding my development & DevOps skills through the creation of a multi-tenant SaaS web application designed to streamline operations for online shops, including those involved in physical product manufacturing. This involves developing key features such as:</p><br>
            <ul class="list-disc list-inside indent-3 text-justify">
                <li>
                    Amazon & Shopify integration for order management
                </li>
                <li>
                    End-to-end operations management (from purchase orders to inventory control and production scheduling)
                </li>
                <li>
                    Integrating with payment processors for in-app ticket purchasing
                </li>
            </ul>`
    },
    '2018-2022': {
        title: 'Technology Director',
        subTitle: 'ABC Aluminum Solutions, Tijuana',
        content: `
        <ul class="list-inside list-disc space-y-2">
            <li>
                Led a team of 2 managers (IT-Ops / DevOps - ERP-Ops) & 12 Engineers across the Tech departments. Leveraging tech & business analytics to best align Initiatives.
            </li>
            <li>
                Achieved 100% visibility of Tech Ops workloads / requirements, by deploying an Initiatives strategy, leveraging tools like Docker / Swarm, AWS, Git, SCRUM, Kanban, amongst others, to enable real time collaboration and visibility.
            </li>
            <li>
                Achieved 80% digital transformation by deploying platforms such as: G-Suite, Salesforce, Lucidchart, Slack, Atlassian Stack (Jira, Bitbucket, JSM), ERP-EDI integrations.
            </li>
            <li>
                Orchestrated network architecture, achieving 99% up-time MoM across 15 facilities throughout the Tijuana area, using Cisco Meraki cloud managed infrastructure. Full dual band WiFi coverage in all facilities (exterior / interior coverage at our campus site). Full WiFi 6 coverage at our new 500,000ft2 facility.
            </li>
            <li>
                Engineered cloud infrastructure & DevOps pipelines for ABC’s in house micro-services, via Docker & Docker swarm, as well as AWS ECS & ECR, via CloudFormation or Copilot.
            </li>
            <li>
                Achieved 100% code deployment automation by engineering CI/CD pipelines via Bitbucket, integrated with Docker HUB and AWS ECR.
            </li>
            <li>
                Engineered a RoR REST API, that integrates ABC's Cisco Meraki dashboard with our Jira Service Management deployment, enabling real time incident management when a network or IoT device fails, aligning with ITSM best practices.
            </li>
            <li>
                Design & deploy Technology strategies in alignment with CEO's vision & Organizational road map. Managed over $1m invested in tech projects.
            </li>
            <li>
                Achieved 100% visibility & security control via SentinelOne & Meraki systems manager MDM, on all endpoints, mobile devices & servers.
            </li>
        </ul>`
    },
    '2014-2018': {
        title: 'Innovative Technology Manager',
        subTitle: 'Southwest Manufacturing Services, Tijuana',
        content: `
        <ul class="list-inside list-disc space-y-2">
            <li>
                Engineered network infrastructure for our new 100,000ft2 building in LV NV. Provisioned a 1Gpbs fiber uplink, deployed network using Cisco Meraki cloud managed hardware (this on both our LV and TJ facilities)
            </li>
            <li>
                Deployed a cloud based Field Service Ops platform, enabling real time data for all work orders, as well as field service Tech tracking via LTE iPads
            </li>
            <li>
                Automated the Field Service invoicing process by integrating the cloud platform with an in house developed middleware, which then produced an ERP upload ready file, streamlining the sales order / invoicing process (field service value stream) automating 100% of the process.
            </li>
            <li>
                During my tenure, I built and mentored a team of five engineers, successfully developing two of them into managerial roles in other Companies.
            </li>
            <li>
                Designed IT-Ops/DevOps strategies aligned with the Company’s overall strategic goals.
            </li>
            <li>
                Led software development operations managing several parallel projects, utilizing technologies / platforms such as Ruby on Rails, Javascript, Swift, Git, Jira, PostgreSQL, MySQL, SCRUM, Docker, Linux.
            </li>
            <li>
                Served as liaison between Executives and team members establishing clear requirements, mitigating ambiguity & troubleshooting.
            </li>
            <li>
                Implemented SDLC (Software Development Life Cycle), via the SCRUM methodology conducting daily stand up meetings to facilitate issue resolution and road block removal.
            </li>
            <li>
                Reported results in monthly Staff meeting (Balanced Scorecard), including KPI results to CEO & Executive staff, as well as actions taken to seize improvement opportunities
            </li>
            <li>
                Led digital transformation transitioning from traditional MS Office workflow to Google Apps, cutting licensing costs, enabling productivity / real-time collaboration across administrative and operation processes, also leveraging G-Script’s automation capabilities
            </li>
        </ul>
            `

    },
    '2013-2014': {
        title: 'Customer Quality Engineer',
        subTitle: 'Southwest Manufacturing Services, Tijuana',
        content: `
        <ul class="space-y-2 list-disc list-inside">
            <li>
                Responsible for direct Customer interactions regarding quality issues / events.
            </li>
            <li>
                Led Root Cause analysis across the organization using tools like: 8D, PDCA, Ishikawa, 5 Why’s, A3, CAPA. Hands on involvement at production lines implementing corrective and preventive actions via Kaizen events
            </li>
            <li>
                Immediate presence at Customer facilities whenever quality issues arose, or when required. (Containment, analysis, resolution & preventive action)
            </li>
            <li>
                Responsible for organizing and presenting QBR meetings with Customers
            </li>
            <li>
                Implemented SPC on some products to ensure tolerance levels.
            </li>
            <li>
                Hosted ISO audits.
            </li>
            <li>
                Responsible for supplier quality performance (SCAR’s)
            </li>
        </ul>`

    },
    '2011-2012': {
        title: 'Project Manager',
        subTitle: 'Southwest Manufacturing Services, Tijuana',
        content: `
        <ul class="list-inside list-disc space-y-2">
            <li>
                Responsible for introducing potential Customer projects via the Phase Gate methodology.
            </li>
            <li>
                Participated in technical reviews with both Customer and SMS Engineering Director, in order to determine product manufacturability at pre-prototype / concept stage
            </li>
            <li>
                Managed scheduling for operations & resources in order to manufacture prototype units.
            </li>
            <li>
                Responsible for facilitating requirements to the manufacturing Engineering team, as well as coordinating design changes with the Customer (MFG Eng Handoff)
            </li>
        </ul>
        `

    },
    '2010-2011': {
        title: 'Continuous Improvement Engineer',
        subTitle: 'Southwest Manufacturing Services, Tijuana',
        content: `
        <ul class="list-inside list-disc space-y-2">
            <li>
                Direct support to manufacturing operations
            </li>
            <li>
                Fixture design.
            </li>
            <li>
                Detected Customer design flaws on products and provided solutions via deviation requests and ECRs.
            </li>
            <li>
                Turret Punch Press programming (CNC) via FabriWIN
            </li>
            <li>
                Participated in root Cause Analysis, 8Ds.
            </li>
            <li>
                Created Engineering drawings for shop floor operations, maintained revisions and document control.
            </li>
        </ul>
        `

    },
    '2008-2009': {
        title: 'IT Manager',
        subTitle: 'DSG, Tijuana',
        content: `
        <ul class="list-inside list-disc space-y-2">
            <li>
                Responsible of IT operations.
            </li>
            <li>
                Network architecture, implementation & maintenance.
            </li>
            <li>
                Implemented predictive dialers to maximize call flow productivity.
            </li>
            <li>
                Managed suppliers, negotiations & services.
            </li>
            <li>
                Implemented Windows Server with Active Directory & Group Policy for user management and compliance.
            </li>
            <li>
                Implemented Asterisk based IP PBX systems like: Trixbox, Elastix.
            </li>
        </ul>
        `
    },
}

// function to toggle resume experience details
function toggleExperience () {
    resumeTimeline.forEach((date, i) => {
        date.addEventListener('mouseover', function () {
            const dateString = date.innerText.trim();
            const resumeItem = resume[dateString];

            resumeTimeline.forEach((date) => {
                const circle = date.querySelector('.circle');
                date.classList.remove('text-blue-800', 'text-lg', 'font-bold');
                circle.classList.remove('active');
            });

            const circle = date.querySelector('.circle');
            if (resumeItem) {
                title.innerHTML = resumeItem.title;
                subTitle.innerHTML = resumeItem.subTitle;
                content.innerHTML = resumeItem.content;
                date.classList.add('text-blue-800', 'text-lg', 'font-bold');
                circle.classList.add('active');
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
const modalContainer = document.querySelector('#modalContainer');
const closeBtn = document.querySelector('#close');

// create objects for project details
const projectDetails = {
    card1: {
        title: 'Professional Portfolio',
        detail: `
            <p>My approach with this website was to mainly encapsulate my professional journey, not as a simple Resume, but as an interactive concise, but comprehensive redaction of my experience, at the same time showcasing my hands on skills, in a tangible, usable product. Aside from the main objective, I also include the GitHub repository link with the full source code.</p> <br>
        `,
    },
    card2: {
        title: 'SaaS Mfg Ops Management',
        detail: "Imagine the power of merging the capabilities of titans like Amazon and Shopify into a singular, cohesive tool. That's precisely what this platform offers. But its prowess isn't confined to mere integration; it’s a symphony of streamlined operations. From the granular aspects of inventory management, where each item is tracked and accounted for, to the vast realm of production processes, ensuring quality and timeliness—every step is refined. Add to this the layered complexities of order management, where every client interaction, transaction, and fulfillment process is overseen with unparalleled attention to detail. It’s not just a tool; it's an operational revolution.",
    },
    card3: {
        title: 'E-commerce Solution',
        detail: "Welcome to an e-commerce platform that believes in harmonizing form with function. While its visual appeal captivates users with sleek, intuitive designs, the underlying technology propels them into an advanced digital marketplace. This isn't just about buying and selling; it’s about experiencing commerce in its finest form. Seamless integrations with powerhouses like Amazon and Shopify open doors to vast markets, while the platform’s proprietary features enhance user navigation, product discovery, and transaction efficiency. The end goal? To not just facilitate sales but to amplify the user's journey, making every interaction meaningful, swift, and rewarding.",
    },
}
// check cards for click event and render modal with appropriate details
projects.forEach(project => {
    project.addEventListener('click', function () {
       if (projectDetails.hasOwnProperty(project.id)) {
              const projectDetail = projectDetails[project.id];
              toggleModal(projectDetail.title, projectDetail.detail);
       }
    });
});

function toggleModal(title, content) {
    modal.classList.toggle('hidden');
    modalTitle.innerHTML = title;
    modalContent.innerHTML = content;
}

closeBtn.addEventListener('click', function () {
    modal.classList.add('hidden');
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        modal.classList.add('hidden');
    }
});

// close modal if user clicks out
document.addEventListener('mousedown', function (e) {
    let clickedInside = e.composedPath().includes(modalContainer);
    if (!clickedInside) {
        modal.classList.add('hidden');
    }
});

// function to send contact form info via email using EmailJS & gmail personal account
(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init('rVR89QCzAgwW0ruDs');
})();

const contactForm = document.getElementById('contactForm');
window.onload = function() {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // validate all fields are filled out
        if (this.fullName.value && this.email && this.phoneNumber && this.message && this.reason) {
            // validate email convention using regex
            if (isValidEmail(this.email.value)) {
                emailjs.sendForm('gmail', 'template_sekp0xt', this)
                    .then(function() {
                        console.log('SUCCESS!');
                        contactForm.reset();
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
                window.alert('Message sent successfully!');
            } else {
                window.alert('Please enter a valid email address.');
            }
        } else {
            window.alert('Please fill out all fields.');
        }

    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}