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

    updateStreakIndicator();

    updateDailyReminder();
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

function updateStreakIndicator() {

    const streak = userState.streak.current;

    const title = document.getElementById("streak-title");
    const message = document.getElementById("streak-message");

    if (!title || !message) return;

    title.textContent = "🔥 " + streak + " Day Streak";

    if (streak === 0) {

        message.textContent = "Start learning today to build your streak!";

    } else if (streak === 1) {

        message.textContent = "Great start! Come back tomorrow to continue.";

    } else if (streak < 5) {

        message.textContent = "Nice consistency! Keep going.";

    } else {

        message.textContent = "Amazing discipline! You're on fire.";

    }

}

function updateDailyReminder() {

    const title = document.getElementById("reminder-title");
    const message = document.getElementById("reminder-message");

    if (!title || !message) return;

    const today = new Date().toISOString().split("T")[0];
    const lastActive = userState.streak.lastActiveDate;

    if (lastActive === today) {

        title.textContent = "✅ You're active today!";
        message.textContent = "Great work! Keep learning.";

    } else {

        title.textContent = "⚠️ You haven't learned today";
        message.textContent = "Complete a module to keep your streak alive.";

    }

}

function showRewardPopup(moduleName) {

    const reward = moduleRewards[moduleName] || 0;

    const popup = document.getElementById("reward-popup");
    const title = document.getElementById("reward-title");
    const boltz = document.getElementById("reward-boltz");

    if (!popup || !title || !boltz) return;

    title.textContent = moduleName + " Module Completed!";
    boltz.textContent = "+" + reward + " Boltz ⚡";

    popup.classList.remove("hidden");

    setTimeout(() => {

        popup.classList.add("hidden");

    }, 3000);

}

function showTopicCelebration(topicName) {

    const box = document.getElementById("topic-celebration");
    const text = document.getElementById("celebration-text");

    if (!box || !text) return;

    text.textContent = "You completed the " + topicName + " topic!";

    box.classList.remove("hidden");

    triggerConfetti();

    setTimeout(() => {

        box.classList.add("hidden");

    }, 4000);

}

function triggerConfetti() {

    const canvas = document.getElementById("confetti-canvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];

    for (let i = 0; i < 120; i++) {

        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 120,
            color: "hsl(" + Math.random() * 360 + ", 100%, 50%)",
            tilt: Math.floor(Math.random() * 10) - 10
        });

    }

    function draw() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach(c => {

            ctx.beginPath();
            ctx.fillStyle = c.color;

            ctx.fillRect(c.x, c.y, c.r, c.r);

        });

        update();

    }

    function update() {

        confetti.forEach(c => {

            c.y += Math.cos(c.d) + 2;
            c.x += Math.sin(c.d);

            if (c.y > canvas.height) {
                c.y = -10;
            }

        });

    }

    let animation;

    function animate() {

        draw();
        animation = requestAnimationFrame(animate);

    }

    animate();

    setTimeout(() => {

        cancelAnimationFrame(animation);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }, 3000);

}