document.addEventListener('DOMContentLoaded', function() {
    const workItems = document.querySelectorAll('.list-of-work h2');
    const secondContainer = document.querySelector('.second-container');
    const workContent = document.querySelector('.work-content');

    let activeId = null; // Отслеживаем ID текущего активного h2

    // Функция debounce (для стабильности)
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Функция для активации нового h2 (с плавной сменой)
    function activateWork(item) {
        const id = item.id;
        if (id === activeId) return; // Если тот же — ничего не делать

        // Сначала деактивируем старый (fade-out)
        secondContainer.classList.remove('active');

        // Ждём завершения fade-out (0.3s = 300ms), потом применяем новый
        setTimeout(() => {
            const image = item.getAttribute('data-image');
            const text = item.getAttribute('data-text');
            const link = item.getAttribute('data-link');
            const color = item.getAttribute('data-color');

            if (image && text) {
                secondContainer.style.setProperty('--background-image', `url(${image})`);
                
                // Формируем HTML: текст + кнопка (если есть link)
                let content = `<p>${text}</p>`;
                if (link) {
                    content += `<a href="${link}" class="project-button">Go to project</a>`;
                }
                
                workContent.innerHTML = content;
                workContent.style.color = color; // Меняем цвет текста по data-color
                secondContainer.classList.add('active');
                activeId = id; // Обновляем активный ID
            }
        }, 300); // Задержка = времени transition (0.3s)
    }

    workItems.forEach(item => {
        const handleMouseOver = debounce(function() {
            console.log('Mouse over on', item.id); // Отладка (удали после)
            activateWork(this);
        }, 200);

        item.addEventListener('mouseover', handleMouseOver);

        // Mouseleave на индивидуальном h2 игнорируем (не сбрасываем) — эффект липкий
    });
});