const initialGreeting = 'Привіт!';

function changeText() {
  document.getElementById("greeting").textContent = 'Привіт, світ!';
  document.getElementById("textStatus").textContent = 'Текст змінено через textContent.';
}

function resetText() {
  document.getElementById("greeting").textContent = initialGreeting;
  document.getElementById("textStatus").textContent = 'Початковий текст відновлено.';
}

function changeColor() {
  const box = document.getElementById("box");
  box.style.backgroundColor = 'yellow';
  document.getElementById("colorStatus").textContent = 'yellow';
}

function resetColor() {
  const box = document.getElementById("box");
  box.style.backgroundColor = 'lightblue';
  document.getElementById("colorStatus").textContent = 'lightblue';
}
