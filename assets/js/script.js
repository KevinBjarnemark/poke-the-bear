
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
            rageMeter += Math.random() * 15; // Increment by 0-15
            // Set the css width (limited)
            filledRageMeterElement.style.width = `${Math.min(rageMeter, 100)}%`;
        }else{
            rageMeter = 0; // Reset to 0
            filledRageMeterElement.style.width = `${rageMeter}%`;
        }
    }
}
