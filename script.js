let namePlayer1 = document.querySelector(".name__player1");
let namePlayer2 = document.querySelector(".name__player2");
let city = document.querySelector("#city");
let lastSymbol = document.querySelector("#lastSymbol");
let mainInput = document.querySelector("#input");
let listPlayer1 = document.querySelector("#ulPlayer1");
let listPlayer2 = document.querySelector("#ulPlayer2");
let timer = document.querySelector("#timer");

let cityes = [
  "Москва",
  "Санкт-Петербург",
  "Мюнхен",
  "Нью-Йорк",
  "Аликанте",
  "Вена",
  "Стокгольм",
];
let randomNum = Math.floor(Math.random() * cityes.length);
let result = [];
let flag = true; // ход игрока
city.textContent = cityes[randomNum];
input.value = city.textContent;
result.push(city.textContent);
lastSymbol.textContent = `"${getLastSymbol(city.textContent)}"`;
namePlayer1.addEventListener("click", changeName);
namePlayer2.addEventListener("click", changeName);

function changeName() {
  let someThis = this;
  let input = document.createElement("input");
  input.value = this.textContent;
  this.textContent = "";
  this.appendChild(input);
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      someThis.textContent = input.value;
    }
    someThis.addEventListener("click", changeName);
  });
  this.removeEventListener("click", changeName);
}

function getLastSymbol(str) {
  return str.slice(-1).toUpperCase();
}
function getFirstSymbol(str) {
  return str.slice(0, 1).toUpperCase();
}

mainInput.addEventListener("click", function () {
  input.value = "";
});

mainInput.addEventListener("keydown", function addCity(event) {
  if (event.key === "Enter") {
    let word =
      mainInput.value[0].toUpperCase() + mainInput.value.slice(1).toLowerCase();
    mainInput.value = "";
    if (result.indexOf(word) !== -1) {
      return alert(`Город ${word.toUpperCase()} уже был`);
    }
    if (
      getLastSymbol(result[result.length - 1]).toUpperCase() !==
      getFirstSymbol(word)
    ) {
      return alert(
        `Ваш город должен начинаться на букву ${getLastSymbol(
          result[result.length - 1]
        )}. Последний названный город был ${result[
          result.length - 1
        ].toUpperCase()}`
      );
    }

    if (result.indexOf(word) === -1) {
      result.push(word);
      if (flag === true) {
        let li = document.createElement("li");
        li.textContent = word;
        listPlayer1.appendChild(li);
        redWord(flag);
        return (flag = !flag);
      }
      if (flag === false) {
        let li = document.createElement("li");
        li.textContent = word;
        listPlayer2.appendChild(li);
        redWord(flag);
        return (flag = !flag);
      }
    }
  }
});

function redWord(flag) {
  let elems1 = document.querySelectorAll("#ulPlayer1 li");
  let elems2 = document.querySelectorAll("#ulPlayer2 li");
  if (flag === false) {
    for (let elem of elems2) {
      elem.style.color = "black";
    }
    for (let elem of elems1) {
      elem.style.color = "black";
    }
    elems2[elems2.length - 1].style.color = "red";
  }
  if (flag === true) {
    for (let elem of elems2) {
      elem.style.color = "black";
    }
    for (let elem of elems1) {
      elem.style.color = "black";
    }
    elems1[elems1.length - 1].style.color = "red";
  }
}
