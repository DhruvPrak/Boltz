function updateDashboardUI() {

    document.getElementById("boltz-value").textContent = userState.boltz;

    document.getElementById("streak-value").textContent = userState.streak.current;

    document.getElementById("longest-streak-value").textContent = userState.streak.longest;

    const completedCount = Object.values(userState.progress).filter(Boolean).length;

    document.getElementById("topics-completed").textContent =
        completedCount + " / " + Object.keys(userState.progress).length;
}

function updateSidebarLocks() {

    const allTopics = document.querySelectorAll("[data-topic]");

    allTopics.forEach(item => {

        const topic = item.getAttribute("data-topic");

        if (!userState.unlockedTopics[topic]) {

            item.classList.add("locked");
            item.style.opacity = "0.5";
            item.style.pointerEvents = "none";

        } else {

            item.classList.remove("locked");
            item.style.opacity = "1";
            item.style.pointerEvents = "auto";
        }
    });
}

function updateCompletionBadges() {

    const items = document.querySelectorAll("[data-topic]");

    items.forEach(item => {

        const topic = item.getAttribute("data-topic");

        const badge = item.querySelector(".badge");

        if (!badge) return;

        if (userState.progress[topic]) {
            badge.textContent = "✔";
        } else {
            badge.textContent = "";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {

    updateDashboardUI();

    updateSidebarLocks();

    updateCompletionBadges();

});

function updateProgressBar() {

    const completed = Object.values(userState.progress).filter(Boolean).length;

    const total = Object.keys(userState.progress).length;

    const percentage = Math.round((completed / total) * 100);

    const bar = document.getElementById("overall-progress-bar");

    const label = document.getElementById("progress-percentage");

    if (!bar || !label) return;

    // Start at 0
    bar.style.width = "0%";

    // Animate after slight delay
    setTimeout(() => {
        bar.style.width = percentage + "%";
    }, 50);

    label.textContent = percentage + "% completed";

}