document.addEventListener('DOMContentLoaded', () => {
  const externalHello = document.querySelector('#externalHello');
  const headHello = document.querySelector('#headHello');
  const numberButton = document.querySelector('#numberButton');
  const numberResult = document.querySelector('#numberResult');
  const typeStatus = document.querySelector('#typeStatus');

  headHello.textContent = window.helloFromHead;
  externalHello.textContent = 'Hello World!';

  const typeofValues = [42, 'Львів', true, undefined, { назва: 'місто' }];
  document.querySelectorAll('.type-row:not(.type-row--header)').forEach((row, index) => {
    const value = typeofValues[index];
    row.querySelector('.type-result').textContent = typeof value;
    row.addEventListener('click', () => {
      const value = row.querySelector('span').textContent;
      typeStatus.textContent = `Перевірено: значення «${value}» має тип ${row.querySelector('.type-result').textContent}.`;
    });
  });

  numberButton.addEventListener('click', () => {
    const input = window.prompt('Введіть число:');
    numberResult.className = 'number-result';

    if (input === null) {
      numberResult.classList.add('is-cancelled');
      numberResult.innerHTML = '<span class="number-result__icon" aria-hidden="true">↩</span><div><strong>Введення скасовано</strong><p>Ви натиснули «Скасувати» у вікні prompt.</p></div>';
      return;
    }

    if (input.trim() === '') {
      numberResult.classList.add('is-error');
      numberResult.innerHTML = '<span class="number-result__icon" aria-hidden="true">!</span><div><strong>Порожнє введення</strong><p>Будь ласка, введіть число, а не залишайте поле порожнім.</p></div>';
      return;
    }

    if (isNaN(input)) {
      numberResult.classList.add('is-error');
      numberResult.innerHTML = `<span class="number-result__icon" aria-hidden="true">!</span><div><strong>Це не число</strong><p>Значення «${input}» перевірено оператором isNaN.</p></div>`;
      return;
    }

    numberResult.classList.add('is-success');
    numberResult.innerHTML = `<span class="number-result__icon" aria-hidden="true">✓</span><div><strong>Це число</strong><p>Значення ${input} успішно пройшло перевірку isNaN.</p></div>`;
  });
});
