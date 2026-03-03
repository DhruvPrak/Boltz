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
// Boltz Reward Configuration
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
// Reward Logic
// ------------------------------

function awardBoltz(moduleName) {

    const reward = moduleRewards[moduleName] || 0;

    userState.boltz += reward;

    console.log("Awarded " + reward + " Boltz for " + moduleName);
}

// ------------------------------
// Progress Tracking Logic
// ------------------------------

function completeModule(moduleName) {

    // Prevent duplicate completion
    if (userState.progress[moduleName]) {
        console.log(moduleName + " already completed.");
        return;
    }

    // Mark as completed
    userState.progress[moduleName] = true;

    // Award Boltz
    awardBoltz(moduleName);

    // Save updated state
    saveUserState(userState);

    console.log(moduleName + " marked as completed.");
}