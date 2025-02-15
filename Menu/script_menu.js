document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const playerName = document.getElementById('playerName').value;

    if (playerName.trim() !== "") {
        localStorage.setItem('playerName', playerName);

        window.location.href = '/Juego/index.html';
        console.log(localStorage.getItem('playerName'));
    } else {
        alert("Por favor ingresa tu nombre");
    }
});