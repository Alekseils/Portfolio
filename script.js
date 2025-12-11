document.addEventListener('DOMContentLoaded', function() {
    // Элементы для навигации
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    // Элементы для табов достижений
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Модальное окно для изображений
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close');
    
    // Кнопка "Наверх"
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    // Функции из первого примера
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU');
        document.getElementById('currentTime').textContent = timeString;
    }
    
    // 1. Навигация между разделами
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех элементов
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.add('hidden'));
            
            // Добавляем активный класс текущему элементу
            this.classList.add('active');
            
            // Показываем выбранный раздел
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                // Плавная прокрутка к секции
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Закрываем мобильное меню
            navLinks.classList.remove('active');
        });
    });
    
    // 2. Мобильное меню
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // 3. Табы для достижений
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех кнопок и контента
            tabBtns.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и соответствующему контенту
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Плавная прокрутка к началу таба
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                window.scrollTo({
                    top: tabContent.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 4. Модальное окно для изображений - ТОЛЬКО ФОТО БЕЗ ТЕКСТА
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('achievement-item') || 
            e.target.classList.contains('gallery-item') ||
            e.target.classList.contains('my-photo')) {
            
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
            
            // Убираем заголовок из модального окна
            document.getElementById('caption').style.display = 'none';
            
            // Предотвращаем прокрутку основного контента
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Закрытие модального окна
    function closeImageModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeModal.addEventListener('click', closeImageModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-content')) {
            closeImageModal();
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeImageModal();
        }
    });
    
    // 5. Часы
    setInterval(updateTime, 1000);
    updateTime();
    
    // 6. Кнопка "Наверх"
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 7. Обработка загрузки страницы с хэшем в URL
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetNav = document.querySelector(`.nav-item[href="#${hash}"]`);
        
        if (targetNav) {
            // Даем время на загрузку страницы
            setTimeout(() => {
                targetNav.click();
            }, 100);
        }
    } else {
        // Показываем первый раздел по умолчанию
        const firstNav = document.querySelector('.nav-item[href="#about"]');
        if (firstNav) {
            firstNav.click();
        }
    }
    
    // 8. Закрытие мобильного меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links') && 
            !e.target.closest('.menu-button') && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
    
    // 9. Загрузка изображений с обработкой ошибок
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle" dominant-baseline="middle">Изображение не найдено</text></svg>';
            this.alt = 'Изображение не загружено';
        });
    });
});