document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    // Синхронизируем toggle меню с onclick button
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
});