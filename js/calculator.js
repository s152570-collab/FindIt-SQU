
function calculateReward() {
    // Read the values entered by the user
    let value = Number(document.getElementById("itemValue").value);
    let days = Number(document.getElementById("daysLost").value);
    let condition = document.getElementById("condition").value;

    // Check that the inputs are valid
    if (value <= 0 || days < 0 ||
        !Number.isFinite(value) || !Number.isFinite(days)) {
        document.getElementById("result").textContent =
            "Please enter valid numbers.";
        return;
    }

    // Calculate 10% of the item's value
    let reward = value * 0.10;

    // Add 2 OMR if the item was lost for over 7 days
    if (days > 7) {
        reward = reward + 2;
    }

    // Reduce the reward if the item is damaged
    if (condition === "damaged") {
        reward = reward * 0.5;
    }

    // Show the result
    document.getElementById("result").textContent =
        "Suggested reward: " + reward.toFixed(2) + " OMR";
}
