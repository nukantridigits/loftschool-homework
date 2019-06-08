/* eslint-disable guard-for-in */
/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const min = 0;
    const client = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };

    let element = {
        width: randomInteger(min, client.width),
        height: randomInteger(min, client.height)
    };

    let css = {
        backgroundColor: randColor(),
        width: element.width,
        height: element.height,
        top: element.height,
        left: element.width
    };

    const div = document.createElement('div');

    div.classList.add('draggable-div');

    for (let rule in css) {
        div.style[rule] = css[rule];
    }

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('dragstart', handleDragStart, false);
    target.addEventListener('dragenter', handleDragEnter, false);
    target.addEventListener('dragover', handleDragOver, false);
    target.addEventListener('dragleave', handleDragLeave, false);
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);

    rand = Math.round(rand);

    return rand + 'px';
}

function randColor() {
    let r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));

    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

let handleDragStart = e => e;
let handleDragEnter = e => e;
let handleDragOver = e => e;
let handleDragLeave = e => e;

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};