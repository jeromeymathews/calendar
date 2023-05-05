const activeGallery = document.getElementById('galleryLink');
activeGallery.classList.add('active');

if (!localStorage.username) {
    localStorage.username = prompt('Enter a username:');
}