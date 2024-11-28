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

/*============ SERVICES MODAL =========*/
//SERVICES MODAL//
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
  }
  
  // Function to close modal
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  
  // Close modal when clicking outside of it
  window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
  }