import { loadAndSortTowns } from './index';
/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
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
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return loadAndSortTowns();
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return !!(~full.toLowerCase().indexOf(chunk.toLowerCase()));
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

/* Блок который появляется при неудачной попытке загрузки списка городов */
const xhrFailed = homeworkContainer.querySelector('#xhr-failed');
/* Кнопка повторной загрузки */
const getTownsListBtn = homeworkContainer.querySelector('#get-towns-list-btn');

getTownsListBtn.addEventListener('click', () => {
    loadingBlock.classList.remove('hide');
    xhrFailed.classList.add('hide');
    getTownsList();
});

const getTownsList = () => {
    loadTowns()
        .then(towns => {
            loadingBlock.classList.add('hide');
            filterBlock.classList.remove('hide');
            filterInput.addEventListener('keyup', () => {
                while (filterResult.firstChild) {
                    filterResult.removeChild(filterResult.firstChild);
                }

                let input = filterInput.value.trim();

                if (input) {
                    for (let town of towns) {
                        let name = town.name;

                        if (isMatching(name, input)) {
                            let item = document.createElement('div');

                            item.textContent = name;
                            filterResult.appendChild(item);
                        }
                    }
                }
            });
        })
        .catch(() => {
            loadingBlock.classList.add('hide');
            xhrFailed.classList.remove('hide');
        });
};

getTownsList();

export {
    loadTowns,
    isMatching
};
