const activeHome = document.getElementById("homeLink");
activeHome.classList.add("active");
if (!localStorage.username) {
    localStorage.username = prompt('Enter a username:');
}