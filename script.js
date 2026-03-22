$(document).ready(function() {
  console.log('jQuery загружен:', typeof $ !== 'undefined');

  // Переменные для удобства
  const $list = $('#list');
  const $input = $('#taskInput');
  const $output = $('#output');
  const $form = $('#taskForm');

  let taskIdCounter = 1;

  // 2. Добавление задачи
  $('#btnAdd').on('click', function() {
    const text = $input.val().trim();
    if (!text) {
      $output.text('⚠️ Поле не может быть пустым!');
      return;
    }
    const $newItem = $(`
      <li class="item" data-id="${taskIdCounter}">
        ${text}
      </li>
    `);
    $list.append($newItem);
    $input.val('');
    $output.text(`✅ Задача "${text}" добавлена!`);
    taskIdCounter++;
  });

  // 3. Делегирование: клик по задаче
  $list.on('click', '.item', function() {
    $list.find('.item').removeClass('active');
    $(this).addClass('active');
    $output.text(`✅ Выбрана задача: "${$(this).text()}"`);
  });

  // 4. Навигация по DOM (при клике на задачу)
  $list.on('click', '.item', function() {
    const $item = $(this);
    const $siblings = $item.siblings();

    $siblings.css('opacity', '0.6');
    setTimeout(() => $siblings.css('opacity', '1'), 1000);

    const $children = $item.find('*');
    if ($children.length > 0) {
      $children.css('color', '#d32f2f');
      setTimeout(() => $children.css('color', ''), 1000);
    }

    $output.text(`🔍 Найден родитель: ${$item.parent()[0].tagName}, соседей: ${$siblings.length}`);
  });

  // 5. Работа с содержимым
  $('#btnShowText').on('click', function() {
    const $active = $list.find('.item.active');
    if (!$active.length) {
      $output.text('⚠️ Нет активной задачи для отображения.');
      return;
    }
    $output.text(`📝 Текст активной задачи: "${$active.text()}"`);
  });

  $('#btnSetHTML').on('click', function() {
    const $active = $list.find('.item.active');
    if (!$active.length) {
      $output.text('⚠️ Нет активной задачи для изменения.');
      return;
    }
    $active.html('<strong>✨ Изменено через .html() ✨</strong>');
    $output.text('🔧 HTML задачи обновлён!');
  });

  $('#btnClear').on('click', function() {
    $list.empty();
    $output.text('🗑️ Список задач очищен!');
  });

  // 6. Работа с атрибутами
  $('#btnRemoveAttr').on('click', function() {
    const $active = $list.find('.item.active');
    if (!$active.length) {
      $output.text('⚠️ Нет активной задачи для удаления data-id.');
      return;
    }
    const id = $active.data('id');
    $active.removeAttr('data-id');
    $output.text(`❌ Удалён data-id="${id}"`);
  });

  // 7. Работа со стилями
  $('#btnSetCSS').on('click', function() {
    const $active = $list.find('.item.active');
    if (!$active.length) {
      $output.text('⚠️ Нет активной задачи для стилизации.');
      return;
    }
    $active.css({
      'background-color': '#fff3e0',
      'border-left': '5px solid #ff9800',
      'padding': '12px',
      'font-weight': 'bold'
    });
    $output.text('🎨 Стиль активной задачи изменён через .css()');
  });

  $('#btnToggleClass').on('click', function() {
    const $active = $list.find('.item.active');
    if (!$active.length) {
      $output.text('⚠️ Нет активной задачи для переключения.');
      return;
    }
    $active.toggleClass('animated');
    const hasClass = $active.hasClass('animated');
    $output.text(`🔄 Класс "animated" ${hasClass ? 'добавлен' : 'удалён'}`);
  });

  // 8. Размеры и позиционирование
  $('#btnGetSize').on('click', function() {
    const $active = $list.find('.item.active');
    if (!$active.length) {
      $output.text('⚠️ Нет активной задачи для измерения.');
      return;
    }
    const width = $active.width();
    const outerWidth = $active.outerWidth();
    $output.text(`📏 Ширина: ${width}px | Внешняя ширина: ${outerWidth}px`);
  });

  $('#btnGetPosition').on('click', function() {
    const $active = $list.find('.item.active');
    if (!$active.length) {
      $output.text('⚠️ Нет активной задачи для позиционирования.');
      return;
    }
    const offset = $active.offset();
    const position = $active.position();
    $output.text(`📍 offset: (${Math.round(offset.left)}, ${Math.round(offset.top)}) | position: (${Math.round(position.left)}, ${Math.round(position.top)})`);
  });

  // 9. События клавиатуры
  $input.on('keydown', function(e) {
    $output.text(`⌨️ Нажата клавиша: ${e.key}`);
  });

  // 10. Работа с формой
  $form.on('submit', function(e) {
    e.preventDefault();
    const value = $(this).find('input[name="task"]').val().trim();
    if (!value) {
      $output.text('⚠️ Форма не может быть пустой!');
      return;
    }
    $output.text(`📬 Форма отправлена: "${value}"`);
    $list.append(`<li class="item" data-id="${taskIdCounter++}">${value}</li>`);
    $(this).find('input[name="task"]').val('');
  });

  // 11. .one() — сработает один раз
  $('#btnOneTime').one('click', function() {
    $output.text('🎉 Эта кнопка сработала только один раз! (больше не сработает)');
    $(this).addClass('hidden');
  });

  // .off() — отключить обработчик добавления
  $('#btnOff').on('click', function() {
    $('#btnAdd').off('click');
    $output.text('🛑 Обработчик "Добавить задачу" отключён. Кнопка больше не работает.');
    $(this).addClass('hidden');
  });

  // Инициализация: вывод количества задач
  $output.text(`📋 Всего задач: ${$list.find('.item').length}`);
});
