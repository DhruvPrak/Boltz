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

document.addEventListener("DOMContentLoaded", updateDashboardUI);