const game = document.querySelector('.game__cells');
const cells = document.querySelectorAll('.cell');
const infoParagraph = document.querySelector('p');
const textInfo = document.querySelector('.text__info');
const playerInfo = document.querySelector('.game__player');
const winInfo = document.querySelector('.game__win');

const tryAgain = document.querySelector('.again');

let player, click;
let win = false;

//инициализация игры
function init() {
	for (let cell of cells) {
		cell.textContent = "";
		cell.classList.value = "";
		cell.classList.add("cell");
	};

	player = "X";
	click = 0;
	win = false;

	textInfo.textContent = "Ход игрока";
	playerInfo.textContent = "X";
	playerInfo.classList.remove('cell__o');
	playerInfo.classList.add('cell__x');
	winInfo.textContent = "";
	winInfo.classList.remove("x");
	winInfo.classList.remove("o");

	game.addEventListener("click", onClickCell);
};

//обработка кнопки начать заново
tryAgain.addEventListener('click', () => init());

//функция проверки выигрыша
function checkWin() {
	let cells = document.querySelectorAll(".cell");

	//скрываем абзац с ходом
	function hideInfo() {
		textInfo.textContent = "";
		playerInfo.textContent = "";
	};

	//проверка выигрышной комбинации ячеек
	function winPlayer(a, b, c, player) {
		return cells[a].innerHTML == player && cells[b].innerHTML == player && cells[c].innerHTML == player;
	};

	//функиця отрисовки линий выигрышных комбинаций по вертикали и горизонтали и вывод победителя
	function drawLine(a, b, c, className, player) {
		cells[a].classList.add(className);
		cells[b].classList.add(className);
		cells[c].classList.add(className);
		game.removeEventListener("click", onClickCell);
		hideInfo();
		win = true;
		winInfo.textContent = `Победил игрок ${player}`;
		winInfo.classList.add(`${player.toLowerCase()}`);
	};

	function drawLineDiagonal(cell, className, player) {
		cells[cell].classList.add(className);
		game.removeEventListener("click", onClickCell);
		hideInfo();
		win = true;
		winInfo.textContent = `Победил игрок ${player}`;
		winInfo.classList.add(`${player.toLowerCase()}`);
	};

	//проверка выигрыша игрока х или о
	function checkPlayerWin(player) {
		if (winPlayer(0, 1, 2, player)) {
			drawLine(0, 1, 2, "line__horizontal", player);
		} else if (winPlayer(3, 4, 5, player)) {
			drawLine(3, 4, 5, "line__horizontal", player);
		} else if (winPlayer(6, 7, 8, player)) {
			drawLine(6, 7, 8, "line__horizontal", player);
		} else if (winPlayer(0, 3, 6, player)) {
			drawLine(0, 3, 6, "line__vertical", player);
		} else if (winPlayer(1, 4, 7, player)) {
			drawLine(1, 4, 7, "line__vertical", player);
		} else if (winPlayer(2, 5, 8, player)) {
			drawLine(2, 5, 8, "line__vertical", player);
		} else if (winPlayer(0, 4, 8, player)) {
			drawLineDiagonal(0, "line__diagLeft", player);
		} else if (winPlayer(2, 4, 6, player)) {
			drawLineDiagonal(2, "line__diagRight", player);
		}
	};

	//проверка выигрыша или ничьи
	if (click <= 9) {
		checkPlayerWin("X");
		checkPlayerWin("O");
		if (click === 9) {
			game.removeEventListener("click", onClickCell);
			hideInfo();
			if (!win) winInfo.textContent = "Ничья";
		}
	}
};

//обработка клика по ячейке
function onClickCell(e) {
	let cell = e.target;
	let audio = new Audio('audio/draw.mp3');

	if (cell.textContent === "") {
		if (player === "X") {
			audio.play();
			cell.textContent = "X";
			cell.classList.add('cell__x');
			playerInfo.textContent = "O";
			playerInfo.classList.remove('cell__x');
			playerInfo.classList.add('cell__o');
			click++;
			player = "O";
		} else if (player === "O") {
			audio.play();
			cell.textContent = "O";
			cell.classList.add('cell__o');
			playerInfo.textContent = "X";
			playerInfo.classList.remove('cell__o');
			playerInfo.classList.add('cell__x');
			click++;
			player = "X";
		}
	}

	checkWin();
};


init();