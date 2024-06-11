/*
    JAVAscript 여러가지 변수 표기법

    카멜 표기법 : 첫 번째 단어 이후 이어지는 각 단어의 첫 글자를 댐누자로 쓰는 방식
    ex) var balckApple() {}
    스네이크 표기법 : 단어와 단어 사이에 언더바(_)를 넣는 방식
    ex) var black_apple() {}
*/
const 정답 = "SQUAD";

let attempts = 0;
let index = 0;
let timer;

function start() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:35vh; background-color:gray; width:100vw; height:100px; text-align:center;";
    document.body.appendChild(div);
  };

  const next = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKey);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let 맞음 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board_block[data-wordle='${attempts}${i}']`
      );
      const letter = block.innerText;
      const 정답_글자 = 정답[i];
      if (letter === 정답_글자) {
        맞음 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(letter)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    if (맞음 === 5) gameover();
    next();
  };

  const handleBack = () => {
    if (index > 0) {
      const preBolck = document.querySelector(
        `.board_block[data-wordle='${attempts}${index - 1}']`
      );
      preBolck.innerText = " ";
    }
    if (index !== 0) index -= 1;
  };

  const handleKey = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBolck = document.querySelector(
      `.board_block[data-wordle='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBack();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBolck.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작 = new Date();

    function setTime() {
      const 현재 = new Date();
      const 과거 = new Date(현재 - 시작);
      const 분 = 과거.getMinutes().toString();
      const 초 = 과거.getSeconds().toString();
      const timer_div = document.querySelector(".board_time");
      timer_div.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();

  window.addEventListener("keydown", handleKey);
}

start();
