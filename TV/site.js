// script.js
const tvList = document.getElementById('tvList');
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');

// Добавляем обработчик события на кнопку "Добавить ТВ"
const addTvButton = document.getElementById("addTvButton");
addTvButton.addEventListener("click", function() {
  const tv = document.createElement("div");
  tv.textContent = "Новое ТВ";
  screen.appendChild(tv);
});

// Функция для отправки запроса к API телевизора
async function sendRequest(ipAddress, endpoint, method, data) {
  const url = 'http://${ipAddress}/${endpoint}';
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Ошибка при обращении к API');
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Произошла ошибка при обращении к телевизору');
  }
}

// Функция для добавления нового телевизора по IP адресу
function addTV(ipAddress) {
  // Реализация добавления телевизора по IP адресу
}

// Функция для отправки команды на включение телевизора
async function turnOnTV(ipAddress) {
  await sendRequest(ipAddress, 'power/on', 'POST', {});
}

// Функция для отправки команды на выключение телевизора
async function turnOffTV(ipAddress) {
  await sendRequest(ipAddress, 'power/off', 'POST', {});
}

// Обработчик события загрузки файла на телевизор
uploadButton.addEventListener('click', async () => {
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    await sendRequest(ipAddress, 'upload/file', 'POST', formData);
    alert('Файл успешно загружен на телевизор');
  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Произошла ошибка при загрузке файла на телевизор');
  }
});


// Создаем конструктор экрана
function ScreenConstructor() {
  this.screen = document.getElementById("screen");
}

// Метод для добавления бегущей строки
ScreenConstructor.prototype.addWelcomeMessage = function(message) {
  const welcomeMessage = document.createElement("marquee");
  welcomeMessage.textContent = message;
  this.screen.appendChild(welcomeMessage);
}

// Метод для добавления даты и времени
ScreenConstructor.prototype.addDateTime = function() {
  const dateTime = document.createElement("div");
  dateTime.textContent = new Date().toLocaleString();
  this.screen.appendChild(dateTime);
}

// Метод для добавления информации о погоде
ScreenConstructor.prototype.addWeatherInfo = function(weatherInfo) {
  const weather = document.createElement("div");
  weather.textContent = weatherInfo;
  this.screen.appendChild(weather);
}

// Метод для добавления экрана с загруженными файлами
ScreenConstructor.prototype.addLoadedFilesScreen = function(loadedFiles) {
  const filesScreen = document.createElement("div");
  filesScreen.textContent = "Loaded Files:";
  
  loadedFiles.forEach(file => {
    const fileElement = document.createElement("p");
    fileElement.textContent = file;
    filesScreen.appendChild(fileElement);
  });
  
  this.screen.appendChild(filesScreen);
}

// Использование конструктора
const screenConstructor = new ScreenConstructor();
screenConstructor.addWelcomeMessage("Добро пожаловать");
screenConstructor.addDateTime();
screenConstructor.addWeatherInfo("Солнечно, +25°C");
screenConstructor.addLoadedFilesScreen(["file1.txt", "image.jpg"]);

// Получаем все контейнеры
const containers = document.querySelectorAll('.draggable');

// Добавляем обработчики событий для перемещения контейнеров
containers.forEach(container => {
  container.addEventListener('mousedown', startDragging);

  function startDragging(e) {
    let offsetX = e.clientX - container.getBoundingClientRect().left;
    let offsetY = e.clientY - container.getBoundingClientRect().top;

    document.onmousemove = function(e) {
      container.style.left = e.clientX - offsetX + 'px';
      container.style.top = e.clientY - offsetY + 'px';
    }

    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
});

// Добавляем обработчики событий для изменения размера контейнеров
const resizableContainers = document.querySelectorAll('.resizable');
resizableContainers.forEach(resizableContainer => {
  resizableContainer.addEventListener('mousedown', startResizing);

  function startResizing(e) {
    let initialWidth = resizableContainer.offsetWidth;
    let initialHeight = resizableContainer.offsetHeight;
    let startX = e.clientX;
    let startY = e.clientY;

    document.onmousemove = function(e) {
      resizableContainer.style.width = initialWidth + e.clientX - startX + 'px';
      resizableContainer.style.height = initialHeight + e.clientY - startY + 'px';
    }

    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
});

// Функционал для контейнера "Погода"
const weatherContainer = document.getElementById('weather');
weatherContainer.addEventListener('click', () => {
  // Здесь можно добавить код для получения и отображения данных о погоде
  weatherContainer.innerText = 'Погода: Солнечно';
});

// Функционал для контейнера "Дата и время"
const dateTimeContainer = document.getElementById('dateTime');
dateTimeContainer.addEventListener('click', () => {
  const currentDate = new Date();
  dateTimeContainer.innerText = 'Дата и время: ' + currentDate.toLocaleString();
});

// Функционал для контейнера "Бегущая строка"
const runningTextContainer = document.getElementById('runningText');
runningTextContainer.addEventListener('click', () => {
  const newText = prompt('Введите текст для бегущей строки:');
  if (newText) {
    runningTextContainer.innerText = newText;
  }
});

// Функционал для кнопки "Погода"
const weatherButton = document.getElementById('weatherButton');
weatherButton.addEventListener('click', () => {
  // Здесь можно добавить код для получения и отображения данных о погоде на экране телевизора
});

// Функционал для кнопки "Дата и время"
const dateTimeButton = document.getElementById('dateTimeButton');
dateTimeButton.addEventListener('click', () => {
  // Здесь можно добавить код для отображения текущей даты и времени на экране телевизора
});

// Функционал для кнопки "Бегущая строка"
const runningTextButton = document.getElementById('runningTextButton');
runningTextButton.addEventListener('click', () => {
  const newText = prompt('Введите текст для бегущей строки:');
  if (newText) {
    // Здесь можно добавить код для отображения бегущей строки с введенным текстом на экране телевизора
  }
});
