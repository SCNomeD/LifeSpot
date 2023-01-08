// Конструктор, через который создаётся комментарий
function Comment() {
    // Запросим имя
    this.author = prompt("Как вас зовут ?")
    if (this.author == null) {
        this.empty = true
        return
    }

    // Запросим текст
    this.text = prompt("Оставьте отзыв")
    if (this.text == null) {
        this.empty = true
        return
    }

    // Сохраним текущее время
    this.date = new Date().toLocaleString()
}

// Оставить комментарий
function addComment() {
    let comment = new Comment()

    // проверяем, успешно ли юзер осуществил ввод
    if (comment.empty) {
        return;
    }

    // Запросим, хочет ли пользователь оставить полноценный отзыв или это будет обычный комментарий
    let enableLikes = confirm('Разрешить пользователям оценивать ваш отзыв?')

    if (enableLikes) {
        // Создадим для отзыва новый объект из прототипа - комментария
        let review = Object.create(comment)
        // и добавим ему нужное свойство
        review.rate = 0;

        // Добавляем отзыв с возможностью пользовательских оценок
        writeReview(review)
    } else {
        // Добавим простой комментарий без возможности оценки
        writeReview(comment)
    }
}

// Запишем объект на страницу
const writeReview = review => {
    let likeCounter = '';

    // Если публикуется отзыв - добавляем ему кнопку с лайками.
    if (review.hasOwnProperty('rate')) {

        // Генерим идентификатор комментария.
        let commentId = Math.random();
        // Для кнопки лайков добавляем: идентификатор, атрибут onclick для передачи идентификатора
        // в функцию, значок лайка, и само значение счётчика отделяем пробелом
        // Также мы добавили стиль, чтобы кнопка смотрелась лучше и не имела рамок
        likeCounter += '<button id="' + commentId + '" style="border: none" onclick="addLike(this.id)">' + `❤️ ${review.rate}</button>`
    }
    // Запишем результат 
    document.getElementsByClassName('reviews')[0].innerHTML += ' <div class="review-    text">\n' + `<p> <i> <b>${review['author']}</b> ${review['date']}${likeCounter}</i></p>` + `<p>${review['text']}</p>` + '</div>';
}

// Увеличивает счётчик лайков
function addLike(id) {
    // Найдём нужный элемент по id
    let element = document.getElementById(id);

    // Преобразуем текст элемента в массив, разбив его по пробелам (так как счётчик лайков у нас отделен от символа ❤️пробелом)
    let array = element.innerText.split(' ')

    // Вытащим искомое значение счётчика и сразу же преобразуем его в число, так как
    // при сложении любого значения со строкой в JS будет строка, а нам этого не требуется
    let resultNum = parseInt(array[array.length - 1], 10);

    // Увеличим счётчик
    resultNum += 1

    // Сохраним измененное значение обратно в массив
    array[array.length - 1] = `${resultNum}`

    // Обновим текст элемента
    element.innerText = array.join(' ')
}

// Slider
const slider = document.querySelector('#slider'); // Найдем элемент на странице по ID slider
const sliderItems = Array.from(slider.children); // Найдем все дочерние элементы того, что выше
const btnNext = document.querySelector('#btnNext'); // Найдем кнопку "Вперед"
const btnPrev = document.querySelector('#btnPrev'); // Найдем кнопку "Назад"

// Обходим все элементы коллекции переведенной в массив для того чтобы после их скрывать/отображать
sliderItems.forEach(function (slide, index) {
    console.log(slide); // Для проверки что все ок, выводим поэлементно в консоль

    if (index !==0) {
        slide.classList.add('hidden') // Скрываем все слайды кроме первого, применяя класс hidden
    }

    // Добавляем индексы слайдам
    slide.dataset.index = index;
    // Добавляем data атрибут active для первого/активного слайда
    sliderItems[0].setAttribute('data-active', '');

    // Добавим клик по слайдам
    slide.addEventListener('click', function () {
        // Скрываем первый слайд, применяя класс hidden
        slide.classList.add('hidden');

        // Удаляем атрибут data-active
        slide.removeAttribute('data-active');

        // Находим индекс след. слайда
        let nextSlideIndex;
        if (index + 1 === sliderItems.length) {
            nextSlideIndex = 0;
        } else {
            nextSlideIndex = index + 1;
        }

        // Находим элемент с индексом след. слайда
        const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);

        // Отображаем найденный слайд
        nextSlide.classList.remove('hidden');
        // Добавляем data атрибут active для след. слайда
        nextSlide.setAttribute('data-active', '')
    })
})

btnNext.onclick = function () {
    showNextSlide('next');
}

btnPrev.onclick = function () {
    showNextSlide('prev');
}

function showNextSlide(direction) {
    // Скроем текущий слайд
    const currentSlide = slider.querySelector('[data-active]') // Получаем элемент активного слайд
    const currentSlideIndex = +currentSlide.dataset.index; // Получаем индекс элемента активного слайда
    currentSlide.classList.add('hidden'); // Скрываем активный слайд через класс hidden
    currentSlide.removeAttribute('data-active') // Удаляем у активного слайда атрибут data-active

    // Находим след. индекс в зависимости от кнопки
    let nextSlideIndex;
    if (direction === 'next') {
        nextSlideIndex;
        if (currentSlideIndex + 1 === sliderItems.length) {
            nextSlideIndex = 0;
        } else {
            nextSlideIndex = currentSlideIndex + 1;
        }
    } else if (direction === 'prev') {
        nextSlideIndex;
        if (currentSlideIndex === 0) {
            nextSlideIndex = sliderItems.length - 1;
        } else {
            nextSlideIndex = currentSlideIndex - 1;
        }
    }

    const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`); // Находим элемент след. слайда по найденному индексу
    nextSlide.classList.remove('hidden'); // Отображаем след. слайд
    nextSlide.setAttribute('data-active', '') // Добавляем data атрибут active для след. слайда
}
