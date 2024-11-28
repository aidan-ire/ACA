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

/*=============== LEAFLET.JS ===============*/
/*=============== MAP ===============*/
function myMap() {  
    var mapOptions = {  
        center: new google.maps.LatLng(54.9486, -7.7207),  // Letterkenny coordinates
        zoom: 12,  // Adjust zoom for better view of Letterkenny
        mapTypeId: google.maps.MapTypeId.HYBRID  
    };  
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);  
}   

// Initialize the map
var map = L.map('map').setView([54.9531, -7.7350], 13); // Coordinates for Letterkenny, Donegal

// Add a tile layer (you can use different map styles here)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

// Add a marker at Letterkenny, Donegal
L.marker([54.9520, -7.7350]).addTo(map)
.bindPopup("<b>Letterkenny, Donegal</b><br>Welcome to our location.")
.openPopup();


document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = new URLSearchParams(formData).toString(); // Convert FormData to URLSearchParams

  try {
      const response = await fetch('/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // Change header to match server expectation
          },
          body: data, // Send URL-encoded data
      });

      if (response.ok) {
          alert('Thank you for your message! We will get back to you soon.');
          document.getElementById('contactForm').reset();
      } else {
          alert('An error occurred. Please try again later.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
  }
});
