// Конфигурация для Telegram (токен и чат сохранены из вашего исходника)
const TOKEN = '8698756172:AAEuBqw4fLXaS1wTjypSxtLOeGm6aUMYFRQ';
const CHAT_ID = '7048073193';
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

let burger = document.querySelector('.burger');
let menu = document.querySelector('.menu');
let tema = document.querySelector('.tema');
let form = document.querySelector('.forma');

form.addEventListener('submit', submitForm);
tema.addEventListener('change', toggleTheme);
burger.addEventListener('click', toggleMenu);

// Закрытие меню при клике на ссылку (удобно для мобилок)
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('show');
    });
});

// Бургер меню
function toggleMenu() {
    burger.classList.toggle('active');
    menu.classList.toggle('show');
}

// Изменение темы сайта
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Форма заявки для Telegram
function submitForm(e) {
    e.preventDefault();
    
    // Получаем значения из новых полей
    let nameVal = document.getElementById('name').value;
    let contactVal = document.getElementById('contact').value;
    let requestVal = document.getElementById('request').value || 'Не указан';

    // Формируем красивое сообщение для бота
    let message = `<b>🌿 Новая заявка на консультацию</b>\n\n`;
    message += `<b>Имя:</b> ${nameVal}\n`;
    message += `<b>Связь (TG/Email):</b> ${contactVal}\n`;
    message += `<b>Запрос:</b> ${requestVal}`;

    // Меняем текст кнопки во время загрузки
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.disabled = true;

    fetch(URL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message,
        })
    })
    .then((res) => {
        if (!res.ok) throw new Error('Ошибка HTTP: ' + res.status);
        return res.json();
    })
    .then(() => {
        alert('Спасибо! Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.');
        form.reset(); // Очищаем форму
    })
    .catch((err) => {
        console.warn(err);
        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте связаться через Telegram напрямую.');
    })
    .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
    });
}