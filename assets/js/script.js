
// Run when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function() {
    runGame();
});

function runGame () {
    let rageMeter = 0; // 0 - 100
    let filledRageMeterElement = document.getElementById("filled-rage-meter");
    let bearImage = document.getElementById("bear").children[0];

    function handlePoke () {
        // Update the rage meter and adjust the css width accordingly

        switch (true) {
            default: bearImage = "/assets/images/bear/bear_0.png";
            case rageMeter < 50: {
                bearImage.src = "/assets/images/bear/bear_0.png";
                break;
            }
            case rageMeter >= 50 && rageMeter < 100: {
                bearImage.src = "/assets/images/bear/bear_50.png";
                break;
            }
            case rageMeter >= 100: {
                bearImage.src = "/assets/images/bear/bear_100.png";
                break;
            }
        }

        if (rageMeter < 100) {
            rageMeter += Math.random() * 15; // Increment by 0-15
            // Set the css width (limited)
            filledRageMeterElement.style.width = `${Math.min(rageMeter, 100)}%`;
        }else{
            rageMeter = 0; // Reset to 0
            filledRageMeterElement.style.width = `${rageMeter}%`;
        }
    }
    document.getElementById("poke-button").addEventListener("click", handlePoke);
}
