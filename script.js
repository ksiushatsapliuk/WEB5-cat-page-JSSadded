// ============================================
// ЗАВДАННЯ 1: Поміняти місцями тексти "2" та "6"
// ============================================
function swapTexts() {
  const item2 = document.querySelector('.item2');
  const item6 = document.querySelector('.item6');
  
  if (item2 && item6) {
    // Зберігаємо innerHTML обох блоків
    const temp2 = item2.innerHTML;
    const temp6 = item6.innerHTML;
    
    // Міняємо місцями
    item2.innerHTML = temp6;
    item6.innerHTML = temp2;
  }
}

// ============================================
// ЗАВДАННЯ 2: Обчислення площі ромба
// ============================================
function calculateRhombusArea() {
  // Діагоналі ромба (в умовних одиницях)
  const diagonal1 = 12;
  const diagonal2 = 8;
  
  // Формула площі ромба: S = (d1 * d2) / 2
  const area = (diagonal1 * diagonal2) / 2;
  
  // Виводимо результат в кінці блоку item5
  const item5 = document.querySelector('.item5');
  if (item5) {
    const resultDiv = document.createElement('div');
    resultDiv.style.marginTop = '20px';
    resultDiv.style.padding = '15px';
    resultDiv.style.background = 'rgba(26, 13, 38, 0.1)';
    resultDiv.style.borderRadius = '6px';
    resultDiv.style.border = '2px solid rgba(26, 13, 38, 0.2)';
    resultDiv.innerHTML = `<strong>Площа ромба:</strong> При діагоналях d₁ = ${diagonal1} та d₂ = ${diagonal2}, площа S = ${area} кв. од.`;
    item5.appendChild(resultDiv);
  }
}

// ============================================
// ЗАВДАННЯ 3: Мін/макс числа з cookies
// ============================================
function checkCookies() {
  const cookies = document.cookie.split(';').map(c => c.trim());
  const resultCookie = cookies.find(c => c.startsWith('minMaxResult='));
  
  if (resultCookie) {
    // а) При оновленні виводиться діалог з питанням
    const result = decodeURIComponent(resultCookie.split('=')[1]);
    const shouldDelete = confirm(`Збережені дані в cookies:\n${result}\n\nВидалити ці дані з cookies?`);
    
    if (shouldDelete) {
      // б) При підтвердженні - видаляємо cookies і оновлюємо сторінку
      document.cookie = 'minMaxResult=; max-age=0; path=/';
      location.reload();
    } else {
      // в) При відмові - інформуємо про наявність cookies
      alert('Дані залишаються в cookies.\n\nДля нового розрахунку необхідно перезавантажити веб-сторінку або видалити cookies.');
      return true; // НЕ показувати форму
    }
  }
  
  return false; // Показати форму
}

function createMinMaxForm() {
  const item5 = document.querySelector('.item5');
  if (!item5) return;
  
  const formDiv = document.createElement('div');
  formDiv.id = 'minMaxForm';
  formDiv.style.marginTop = '25px';
  formDiv.style.padding = '20px';
  formDiv.style.background = 'rgba(255, 255, 255, 0.9)';
  formDiv.style.borderRadius = '8px';
  formDiv.style.border = '2px solid rgba(26, 13, 38, 0.2)';
  
  formDiv.innerHTML = `
    <h3 style="margin: 0 0 15px 0; color: #1A0D26;">Знайти мінімум та максимум</h3>
    <p style="margin-bottom: 10px; font-weight: 600;">Введіть 10 чисел через кому:</p>
    <input type="text" id="numbersInput" placeholder="наприклад: 5, 12, 3, 45, 7, 23, 1, 89, 34, 15" 
           style="width: 100%; padding: 10px; margin-bottom: 10px; border: 2px solid #1A0D26; border-radius: 6px; font-size: 14px;">
    <button id="calculateBtn" style="padding: 12px 24px; background: #1A0D26; color: white; border: none; 
            border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 14px;">
      Обчислити
    </button>
  `;
  
  item5.appendChild(formDiv);
  
  document.getElementById('calculateBtn').addEventListener('click', calculateMinMax);
}

function calculateMinMax() {
  const input = document.getElementById('numbersInput').value;
  const numbers = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
  
  if (numbers.length !== 10) {
    alert('Будь ласка, введіть рівно 10 чисел!');
    return;
  }
  
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  
  const result = `Мінімальне число: ${min}\nМаксимальне число: ${max}`;
  
  // Зберігаємо в cookies (термін дії - 24 години)
  document.cookie = `minMaxResult=${encodeURIComponent(result)}; max-age=86400; path=/`;
  
  // Виводимо результат в діалоговому вікні
  alert(result);
  
  // Перезавантажуємо сторінку
  location.reload();
}

// ============================================
// ЗАВДАННЯ 4: Зміна кольору рамок з localStorage
// ============================================
function setupBorderColorChanger() {
  // Створюємо інпут для вибору кольору в item3
  const item3 = document.querySelector('.item3');
  if (!item3) return;
  
  const colorDiv = document.createElement('div');
  colorDiv.style.marginTop = '15px';
  colorDiv.innerHTML = `
    <label style="color: white; display: block; margin-bottom: 8px; font-weight: 600;">Колір рамок блоків:</label>
    <input type="color" id="borderColorPicker" value="#2D1B4E" 
           style="width: 80px; height: 45px; border: 2px solid white; border-radius: 6px; cursor: pointer; background: transparent;">
  `;
  item3.appendChild(colorDiv);
  
  const colorPicker = document.getElementById('borderColorPicker');
  
  // Завантажуємо збережений колір при завантаженні сторінки
  const savedColor = localStorage.getItem('borderColor');
  if (savedColor) {
    applyBorderColor(savedColor);
    colorPicker.value = savedColor;
  }
  
  // При настанні події focus змінюємо колір
  colorPicker.addEventListener('focus', function() {
    const color = this.value;
    applyBorderColor(color);
    localStorage.setItem('borderColor', color);
  });
  
  // Також при зміні кольору
  colorPicker.addEventListener('input', function() {
    const color = this.value;
    applyBorderColor(color);
    localStorage.setItem('borderColor', color);
  });
}

function applyBorderColor(color) {
  // Застосовуємо колір до всіх номерних блоків (1-6)
  const blocks = ['.navbar', '.item2', '.item3', '.item4', '.item5', '.item6'];
  blocks.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.style.borderColor = color;
    });
  });
}

// ============================================
// ЗАВДАННЯ 5: Додавання зображень
// Блок 1 = navbar, Блок 4 = item4, Блок 5 = item5, Блок у = item6
// ============================================
function setupImageAdder() {
  const itemY = document.querySelector('.item6'); // Блок "у"
  if (!itemY) return;
  
  // а) Додаємо обробник виділення тексту в блоці "у"
  itemY.addEventListener('mouseup', function() {
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
      showImageForm();
    }
  });
  
  // Для мобільних пристроїв
  itemY.addEventListener('touchend', function() {
    setTimeout(() => {
      const selection = window.getSelection().toString();
      if (selection.length > 0) {
        showImageForm();
      }
    }, 100);
  });
}

function showImageForm() {
  // Перевіряємо, чи форма вже існує
  if (document.getElementById('imageForm')) return;
  
  const item5 = document.querySelector('.item5');
  if (!item5) return;
  
  // а) Форма появляється в блоці 5 одразу після наявного контенту
  const formDiv = document.createElement('div');
  formDiv.id = 'imageForm';
  formDiv.style.marginTop = '25px';
  formDiv.style.padding = '20px';
  formDiv.style.background = 'rgba(255, 255, 255, 0.9)';
  formDiv.style.borderRadius = '8px';
  formDiv.style.border = '2px solid rgba(26, 13, 38, 0.2)';
  
  formDiv.innerHTML = `
    <h3 style="margin: 0 0 15px 0; color: #1A0D26;">Керування зображеннями</h3>
    <div style="margin-bottom: 10px;">
      <label style="display: block; margin-bottom: 5px; font-weight: 600;">URL зображення:</label>
      <input type="text" id="imageUrl" placeholder="https://example.com/image.jpg" 
             style="width: 100%; padding: 10px; border: 2px solid #1A0D26; border-radius: 6px; font-size: 14px;">
    </div>
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-weight: 600;">Опис зображення:</label>
      <input type="text" id="imageAlt" placeholder="Опис зображення" 
             style="width: 100%; padding: 10px; border: 2px solid #1A0D26; border-radius: 6px; font-size: 14px;">
    </div>
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <button id="addToBlock1Btn" style="padding: 12px 20px; background: #6B4C8A; color: white; border: none; 
              border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 13px; flex: 1; min-width: 140px;">
        Додати в блок 1
      </button>
      <button id="saveToBlock4Btn" style="padding: 12px 20px; background: #1A0D26; color: white; border: none; 
              border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 13px; flex: 1; min-width: 140px;">
        Зберегти + блок 4
      </button>
      <button id="clearFromBlock1Btn" style="padding: 12px 20px; background: #8C64AA; color: white; border: none; 
              border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 13px; flex: 1; min-width: 140px;">
        Видалити з блоку 1
      </button>
    </div>
  `;
  
  item5.appendChild(formDiv);
  
  // Кнопка 1: Додати зображення в блок 1 (тимчасово, без збереження)
  document.getElementById('addToBlock1Btn').addEventListener('click', addImageToBlock1Temp);
  
  // в) Кнопка 2: Зберегти в localStorage + додати в блок 4
  document.getElementById('saveToBlock4Btn').addEventListener('click', saveImageToLocalStorageAndBlock4);
  
  // г) Кнопка 3: Видалити з localStorage і з блоку 1
  document.getElementById('clearFromBlock1Btn').addEventListener('click', clearImagesFromBlock1);
  
  // Завантажуємо збережені зображення з localStorage
  loadImagesFromLocalStorage();
}

// Кнопка 1: Додати зображення тимчасово в блок 1
function addImageToBlock1Temp() {
  const url = document.getElementById('imageUrl').value.trim();
  const alt = document.getElementById('imageAlt').value.trim();
  
  if (!url) {
    alert('Будь ласка, введіть URL зображення!');
    return;
  }
  
  const tempImage = {
    url,
    alt: alt || 'Тимчасове зображення',
    id: 'temp_' + Date.now(),
    isTemp: true
  };
  
  displayImageInBlock1(tempImage);
  
  // Очищаємо форму
  document.getElementById('imageUrl').value = '';
  document.getElementById('imageAlt').value = '';
  
  alert('Зображення додано в блок 1 (тимчасово)');
}

// в) Кнопка 2: Зберегти в localStorage + додати в блок 4
function saveImageToLocalStorageAndBlock4() {
  const url = document.getElementById('imageUrl').value.trim();
  const alt = document.getElementById('imageAlt').value.trim();
  
  if (!url) {
    alert('Будь ласка, введіть URL зображення!');
    return;
  }
  
  // б) Кількість зображень необмежена
  let images = JSON.parse(localStorage.getItem('addedImages') || '[]');
  
  const newImage = { 
    url, 
    alt: alt || 'Збережене зображення',
    id: Date.now()
  };
  
  images.push(newImage);
  
  // в) Зберігаємо в localStorage
  localStorage.setItem('addedImages', JSON.stringify(images));
  
  // Додаємо зображення в кінець початкового вмісту блоку 4
  displayImageInBlock4(newImage);
  
  // Також додаємо в блок 1
  displayImageInBlock1(newImage);
  
  // Очищаємо форму
  document.getElementById('imageUrl').value = '';
  document.getElementById('imageAlt').value = '';
  
  alert('Зображення збережено в localStorage та додано в блок 4!');
}

// г) Кнопка 3: Видалити всі зображення з localStorage і блоку 1
function clearImagesFromBlock1() {
  // Видаляємо з localStorage
  localStorage.removeItem('addedImages');
  
  // г) Видаляємо зображення з блоку 1 без перезавантаження
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const addedImages = navbar.querySelectorAll('.added-image-block1');
    addedImages.forEach(img => img.remove());
  }
  
  alert('Всі зображення видалено з блоку 1 та localStorage!');
}

function displayImageInBlock1(imageData) {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  // Перевіряємо, чи зображення вже не додане
  const existing = navbar.querySelector(`[data-image-id="${imageData.id}"]`);
  if (existing) return;
  
  const imgDiv = document.createElement('div');
  imgDiv.className = 'added-image-block1';
  imgDiv.dataset.imageId = imageData.id;
  imgDiv.style.marginTop = '15px';
  imgDiv.style.textAlign = 'center';
  imgDiv.style.padding = '10px';
  imgDiv.style.background = 'rgba(255, 255, 255, 0.1)';
  imgDiv.style.borderRadius = '8px';
  imgDiv.style.border = '2px solid #4A3366';
  
  imgDiv.innerHTML = `
    <img src="${imageData.url}" alt="${imageData.alt}" 
         style="max-width: 100%; border-radius: 8px; border: 2px solid #4A3366; 
                box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-bottom: 8px;"
         onerror="this.parentElement.innerHTML='<p style=color:white;>Помилка завантаження</p>'">
    <p style="color: white; margin: 0; font-size: 13px; font-weight: 500;">${imageData.alt}</p>
    ${imageData.isTemp ? '<p style="color: #FFD700; margin: 5px 0 0 0; font-size: 11px;">(Тимчасове)</p>' : ''}
  `;
  
  navbar.appendChild(imgDiv);
}

function displayImageInBlock4(imageData) {
  const item4 = document.querySelector('.item4');
  if (!item4) return;
  
  // Перевіряємо, чи зображення вже не додане
  const existing = item4.querySelector(`[data-image-id="${imageData.id}"]`);
  if (existing) return;
  
  const imgDiv = document.createElement('div');
  imgDiv.className = 'added-image-block4';
  imgDiv.dataset.imageId = imageData.id;
  imgDiv.style.marginTop = '15px';
  imgDiv.style.textAlign = 'center';
  imgDiv.style.padding = '12px';
  imgDiv.style.background = 'rgba(255, 255, 255, 0.4)';
  imgDiv.style.borderRadius = '8px';
  imgDiv.style.border = '2px solid #1A0D26';
  
  imgDiv.innerHTML = `
    <img src="${imageData.url}" alt="${imageData.alt}" 
         style="max-width: 100%; border-radius: 8px; border: 2px solid #1A0D26; 
                box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-bottom: 8px;"
         onerror="this.parentElement.innerHTML='<p style=color:#1A0D26;>Помилка завантаження зображення</p>'">
    <p style="color: #1A0D26; margin: 0; font-size: 14px; font-weight: 600;">${imageData.alt}</p>
    <p style="color: #6B4C8A; margin: 5px 0 0 0; font-size: 12px;">(Збережено в localStorage)</p>
  `;
  
  item4.appendChild(imgDiv);
}

function loadImagesFromLocalStorage() {
  const images = JSON.parse(localStorage.getItem('addedImages') || '[]');
  
  // Завантажуємо збережені зображення в обидва блоки
  images.forEach(img => {
    // Додаємо в блок 4
    const item4 = document.querySelector('.item4');
    const existingInBlock4 = item4?.querySelector(`[data-image-id="${img.id}"]`);
    if (!existingInBlock4) {
      displayImageInBlock4(img);
    }
    
    // Додаємо в блок 1
    displayImageInBlock1(img);
  });
}

// ============================================
// ІНІЦІАЛІЗАЦІЯ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Завдання 1: Міняємо місцями тексти
  swapTexts();
  
  // Завдання 2: Обчислюємо площу ромба
  calculateRhombusArea();
  
  // Завдання 3: Перевіряємо cookies і створюємо форму
  const hasCookies = checkCookies();
  if (!hasCookies) {
    createMinMaxForm();
  }
  
  // Завдання 4: Налаштовуємо зміну кольору рамок
  setupBorderColorChanger();
  
  // Застосовуємо збережений колір рамок при завантаженні
  const savedColor = localStorage.getItem('borderColor');
  if (savedColor) {
    applyBorderColor(savedColor);
  }
  
  // Завдання 5: Налаштовуємо додавання зображень
  setupImageAdder();
  
  // Завантажуємо збережені зображення при завантаженні сторінки
  loadImagesFromLocalStorage();
});