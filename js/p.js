/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        navClose.style.display = 'block'; // Show close button
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        navClose.style.display = 'none'; // Hide close button
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = ()=>{
    const header = document.getElementById('header')
    this.scrollY >=50 ? header.classList.add('bg-header')
                        :header.classList.remove('bg-header')
}
window.addEventListener('scroll', bgHeader)
bgHeader()

/*=============== PROJECTS MENU ===============*/

// Pre-defined project data
const projectData = {
    featured: [
        { title: "IDA Advance Building Solution, Waterford", image: "https://via.placeholder.com/300x150" },
        { title: "IDA Advance Office Building, Sligo", image: "https://via.placeholder.com/300x150" }
    ],
    current: [
        { title: "Thermo Fisher Scientific Extension", image: "https://via.placeholder.com/300x150" },
        { title: "One Le Pole Square", image: "https://via.placeholder.com/300x150" }
    ],
    retail: [
        { title: "Retail Center, Dublin", image: "https://via.placeholder.com/300x150" },
        { title: "Retail Park, Cork", image: "https://via.placeholder.com/300x150" }
    ],
    workplace: [
        { title: "Thermo Fisher Scientific Extension", image: "https://via.placeholder.com/300x150" },
        { title: "One Le Pole Square", image: "https://via.placeholder.com/300x150" }
    ],
    apartments: [
        { title: "Crown Square, Mixed Use Development", image: "https://via.placeholder.com/300x150" }
    ],
    houses: [
        { title: "Luxury Housing Estate, Galway", image: "https://via.placeholder.com/300x150" }
    ],
    education: [
        { title: "Primary School, Donegal", image: "https://via.placeholder.com/300x150" },
        { title: "University Building, Limerick", image: "https://via.placeholder.com/300x150" }
    ],
    healthcare: [
        { title: "City Hospital, Dublin", image: "https://via.placeholder.com/300x150" }
    ],
    hotel: [
        { title: "Luxury Hotel, Kerry", image: "https://via.placeholder.com/300x150" },
        { title: "Luxury Hotel, Kerry", image: "https://via.placeholder.com/300x150" }
    ]
};

// Function to display projects in a given category
function displayProjects(category = null) {
    const cardsContainer = document.getElementById('project-cards');
    cardsContainer.innerHTML = ''; // Clear previous cards

    const projects = category
        ? projectData[category] || []
        : Object.values(projectData).flat(); // Show all projects if no category is specified

    if (projects.length) {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="card-title">${project.title}</div>
            `;
            cardsContainer.appendChild(card);
        });
    } else {
        cardsContainer.innerHTML = '<p>No projects available for this category.</p>';
    }
}

// Dropdown toggle behavior
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
        e.preventDefault();

        // Close other dropdowns
        document.querySelectorAll('.dropdown-content').forEach(content => {
            if (content !== this.nextElementSibling) {
                content.style.display = 'none';
                content.parentElement.classList.remove('open');
            }
        });

        // Toggle the clicked dropdown
        const dropdownContent = this.nextElementSibling;
        const isOpen = dropdownContent.style.display === 'block';
        dropdownContent.style.display = isOpen ? 'none' : 'block';
        this.parentElement.classList.toggle('open', !isOpen);
    });
});

// Filter projects by category
document.querySelectorAll('.sidenav a[data-category]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const category = this.dataset.category;

        // Display projects for the selected category
        displayProjects(category);

        // Close the dropdown if inside one
        const dropdownContent = this.closest('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.style.display = 'none';
            dropdownContent.parentElement.classList.remove('open');
        }
    });
});

// Show All button functionality
document.getElementById('show-all').addEventListener('click', function () {
    displayProjects(); // Show all projects
});

// Display all projects by default on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProjects(); // Show all projects initially
});
