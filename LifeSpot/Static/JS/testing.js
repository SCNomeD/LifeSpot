// Получим пользовательский ввод
let userName = prompt("Пожалуйста, введите ваше имя");
alert(`Приветствуем, ${userName}. В вашем имени ${userName.length} символов`)

// Получим коллекцию всех элементов страницы
let elements = document.getElementsByTagName('*');

// Выведем результат в уведомление
alert(`Количество элементов на странице:  ${elements.length}`);
