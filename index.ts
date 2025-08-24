const playerNameInput = <HTMLInputElement>document.getElementById('playerName');
const playButton = <HTMLButtonElement>document.getElementById('playButton');

playerNameInput.addEventListener('blur', () => {
	const playerName = playerNameInput.value;
	console.log(playerName);

	if (playerName) {
		playButton.disabled = false;
		document.getElementById('helloPlayerName').innerText = playerName;
		document.getElementById('helloSection').classList.add('show');
		document.getElementById('inputSection').classList.remove('show');
	} else {
		playButton.disabled = true;
	}
});

document.getElementById('helloPlayerName').addEventListener('click', () => {
	document.getElementById('inputSection').classList.add('show');
	document.getElementById('helloSection').classList.remove('show');
});
