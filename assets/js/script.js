
// Run when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function() {
    runGame();
});

function runGame () {
    let rageMeter = 0; // 0 - 100
    let filledRageMeterElement = document.getElementById("filled-rage-meter");
    document.getElementById("poke-button").addEventListener("click", handlePoke);

    function handlePoke () {
        // Update the rage meter and adjust the css width accordingly
        if (rageMeter < 100) {
            rageMeter+=10; // Increment by 10
            filledRageMeterElement.style.width = `${rageMeter}%`;
        }else{
            rageMeter = 0;// Reset to 0
            filledRageMeterElement.style.width = `${rageMeter}%`;
        }
    }
}
