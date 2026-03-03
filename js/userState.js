// ======================================
// Gamification Core - User State Manager
// ======================================

// ------------------------------
// Default User State
// ------------------------------

const defaultUserState = {
    boltz: 0,

    streak: {
        current: 0,
        longest: 0,
        lastActiveDate: null
    },

    progress: {
        arrays: false,
        stack: false,
        queue: false,
        linkedList: false,
        trees: false,
        heap: false,
        hashTable: false,
        graph: false,
        trie: false,
        sorting: false,
        recursion: false,
        dp: false
    },

    unlockedTopics: {
        arrays: true, // First topic unlocked by default
        stack: false,
        queue: false,
        linkedList: false,
        trees: false,
        heap: false,
        hashTable: false,
        graph: false,
        trie: false,
        sorting: false,
        recursion: false,
        dp: false
    }
};

// ------------------------------
// Persistence Layer
// ------------------------------

function saveUserState(state) {
    localStorage.setItem("dsaUserState", JSON.stringify(state));
}

function loadUserState() {
    const data = localStorage.getItem("dsaUserState");
    return data ? JSON.parse(data) : structuredClone(defaultUserState);
}

// Initialize state
let userState = loadUserState();

// ------------------------------
// Reward Configuration
// ------------------------------

const moduleRewards = {
    arrays: 50,
    stack: 50,
    queue: 50,
    linkedList: 75,
    trees: 100,
    heap: 100,
    hashTable: 100,
    graph: 150,
    trie: 120,
    sorting: 120,
    recursion: 150,
    dp: 200
};

// ------------------------------
// Unlock Configuration
// ------------------------------

const unlockMap = {
    arrays: "stack",
    stack: "queue",
    queue: "linkedList",
    linkedList: "trees",
    trees: "heap",
    heap: "hashTable",
    hashTable: "graph",
    graph: "trie",
    trie: "sorting",
    sorting: "recursion",
    recursion: "dp"
};

// ------------------------------
// Reward Logic
// ------------------------------

function awardBoltz(moduleName) {
    const reward = moduleRewards[moduleName] || 0;
    userState.boltz += reward;
    console.log("Awarded " + reward + " Boltz for " + moduleName);
}

// ------------------------------
// Unlock Logic
// ------------------------------

function unlockNextModule(moduleName) {
    const nextModule = unlockMap[moduleName];
    if (!nextModule) return;

    if (!userState.unlockedTopics[nextModule]) {
        userState.unlockedTopics[nextModule] = true;
        console.log(nextModule + " unlocked!");
    }
}

// ------------------------------
// Streak Logic
// ------------------------------

function updateStreak() {

    const today = new Date().toISOString().split("T")[0];
    const lastActive = userState.streak.lastActiveDate;

    if (!lastActive) {
        userState.streak.current = 1;
    } else {

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];

        if (lastActive === today) {
            // Already counted today
            return;
        }

        if (lastActive === yesterdayString) {
            userState.streak.current += 1;
        } else {
            userState.streak.current = 1;
        }
    }

    if (userState.streak.current > userState.streak.longest) {
        userState.streak.longest = userState.streak.current;
    }

    userState.streak.lastActiveDate = today;

    console.log("Current Streak: " + userState.streak.current);
}

// ------------------------------
// Progress Tracking Logic
// ------------------------------

function completeModule(moduleName) {

    if (userState.progress[moduleName]) {
        console.log(moduleName + " already completed.");
        return;
    }

    userState.progress[moduleName] = true;

    awardBoltz(moduleName);

    unlockNextModule(moduleName);

    updateStreak();   // 🔥 Added here

    saveUserState(userState);

    console.log(moduleName + " marked as completed.");
}