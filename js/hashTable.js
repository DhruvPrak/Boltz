// =======================================
// Hash Table (Chaining + Resizing)
// =======================================

class HashTable {

    constructor(size = 10) {
        this.size = size;           // Current table size
        this.count = 0;             // Number of stored elements
        this.table = new Array(size);
    }

    // ---------------------------------------
    // Hash Function
    // ---------------------------------------
    _hash(key) {

        let hash = 0;

        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }

        return hash % this.size;
    }

    // ---------------------------------------
    // Insert / Update
    // ---------------------------------------
    set(key, value) {

        const index = this._hash(key);

        // Create bucket if not exists
        if (!this.table[index]) {
            this.table[index] = [];
        }

        // Check if key already exists → update
        for (let pair of this.table[index]) {
            if (pair.key === key) {
                pair.value = value;
                return;
            }
        }

        // Insert new key-value pair
        this.table[index].push({ key, value });
        this.count++;

        // Check load factor
        const loadFactor = this.count / this.size;

        if (loadFactor > 0.7) {
            this._resize();
        }
    }

    // ---------------------------------------
    // Get Value
    // ---------------------------------------
    get(key) {

        const index = this._hash(key);
        const bucket = this.table[index];

        if (!bucket) return undefined;

        for (let pair of bucket) {
            if (pair.key === key) {
                return pair.value;
            }
        }

        return undefined;
    }

    // ---------------------------------------
    // Remove Key
    // ---------------------------------------
    remove(key) {

        const index = this._hash(key);
        const bucket = this.table[index];

        if (!bucket) return;

        const newBucket = bucket.filter(pair => pair.key !== key);

        if (newBucket.length !== bucket.length) {
            this.count--;
        }

        this.table[index] = newBucket;
    }

    // ---------------------------------------
    // Resize & Rehash
    // ---------------------------------------
    _resize() {

        const oldTable = this.table;

        this.size *= 2;
        this.table = new Array(this.size);
        this.count = 0;

        for (let bucket of oldTable) {
            if (bucket) {
                for (let pair of bucket) {
                    this.set(pair.key, pair.value);
                }
            }
        }
    }

    // ---------------------------------------
    // Utility: Print Table (for debugging)
    // ---------------------------------------
    print() {
        console.log(this.table);
    }
}