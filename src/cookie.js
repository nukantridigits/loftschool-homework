/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    renderCookies();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let cookieName = addNameInput.value;
    let cookieValue = addValueInput.value;

    if (cookieName.length && cookieValue.length) {
        return setCookie(cookieName, cookieValue);
    }

    return false;
});

document.addEventListener('click', event => {
    let target = event.target;

    if (target.classList.contains('cookie-delete-btn')) {
        let cookieName = target.parentNode.previousSibling.previousSibling.textContent;

        return deleteCookie(cookieName);
    }
});

const isMatching = (full, chunk) => !!(~full.indexOf(chunk));

const parseCookies = () => {
    let cookies = document.cookie;

    if (cookies.length) {
        let filter = filterNameInput.value;

        return cookies.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');

            if (filter.length && !isMatching(name, filter) && !isMatching(value, filter)) {
                return prev;
            }
            prev[name] = value;

            return prev;
        }, {});
    }

    return {};
};

const renderCookies = () => {
    clearList(listTable);
    let cookies = parseCookies();

    if (Object.keys(cookies).length !== 0) {
        for (let cookie in cookies) {
            if (cookies.hasOwnProperty(cookie)) {
                createTr(cookie, cookies[cookie]);
            }
        }
    }

    return true;
};

const createTr = (cookie, cookieValue) => {
    const deleteText = 'Удалить cookie';
    let tr = document.createElement('tr');
    let name = document.createElement('td');
    let value = document.createElement('td');
    let deleteCell = document.createElement('td');
    let cookieDeleteBtn = document.createElement('button');

    tr.id = cookie;
    name.textContent = cookie;
    value.textContent = cookieValue;
    cookieDeleteBtn.classList.add('cookie-delete-btn');
    cookieDeleteBtn.textContent = deleteText;
    deleteCell.appendChild(cookieDeleteBtn);

    listTable.appendChild(tr);
    for (let cell of [name, value, deleteCell]) {
        tr.appendChild(cell);
    }

    return true;
};

const setCookie = (name, value, days = 14) => {
    let date = new Date();

    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';path=/; expires=' + date.toUTCString();

    return renderCookies();
};

const deleteCookie = name => setCookie(name, '', -1);

const clearList = element => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    return true;
};

renderCookies();
