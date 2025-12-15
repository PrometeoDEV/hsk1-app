// ===== HSK Configuration - Modular & Scalable =====
// This file manages HSK levels configuration for future expansion

const HSK_CONFIG = {
    // Current active level
    currentLevel: 1,

    // Available levels (expand as needed)
    levels: {
        1: {
            name: 'HSK 1',
            wordCount: 150,
            description: 'Nivel básico - Comunicación simple',
            examDuration: 40, // minutes
            passingScore: 120,
            totalScore: 200,
            sections: ['listening', 'reading'],
            color: '#4CAF50',
            icon: '🌱'
        },
        2: {
            name: 'HSK 2',
            wordCount: 300,
            description: 'Nivel elemental - Conversaciones cotidianas',
            examDuration: 55,
            passingScore: 120,
            totalScore: 200,
            sections: ['listening', 'reading'],
            color: '#8BC34A',
            icon: '🌿'
        },
        3: {
            name: 'HSK 3',
            wordCount: 600,
            description: 'Nivel intermedio - Vida diaria y trabajo',
            examDuration: 90,
            passingScore: 180,
            totalScore: 300,
            sections: ['listening', 'reading', 'writing'],
            color: '#FFEB3B',
            icon: '🌳'
        },
        4: {
            name: 'HSK 4',
            wordCount: 1200,
            description: 'Nivel intermedio-alto - Temas variados',
            examDuration: 105,
            passingScore: 180,
            totalScore: 300,
            sections: ['listening', 'reading', 'writing'],
            color: '#FF9800',
            icon: '🌲'
        },
        5: {
            name: 'HSK 5',
            wordCount: 2500,
            description: 'Nivel avanzado - Medios y discursos',
            examDuration: 125,
            passingScore: 180,
            totalScore: 300,
            sections: ['listening', 'reading', 'writing'],
            color: '#F44336',
            icon: '🏔️'
        },
        6: {
            name: 'HSK 6',
            wordCount: 5000,
            description: 'Nivel superior - Expresión fluida',
            examDuration: 140,
            passingScore: 180,
            totalScore: 300,
            sections: ['listening', 'reading', 'writing'],
            color: '#9C27B0',
            icon: '🎓'
        }
    },

    // Get current level config
    getCurrentLevel() {
        return this.levels[this.currentLevel];
    },

    // Set active level
    setLevel(level) {
        if (this.levels[level]) {
            this.currentLevel = level;
            localStorage.setItem('hsk_current_level', level);
            return true;
        }
        return false;
    },

    // Load saved level
    loadSavedLevel() {
        const saved = localStorage.getItem('hsk_current_level');
        if (saved && this.levels[parseInt(saved)]) {
            this.currentLevel = parseInt(saved);
        }
    },

    // Check if level is unlocked (based on progress)
    isLevelUnlocked(level) {
        if (level === 1) return true;
        // Unlock next level when previous level has 80% mastery
        const prevLevelProgress = this.getLevelProgress(level - 1);
        return prevLevelProgress >= 80;
    },

    // Get level progress (placeholder - implement based on actual progress)
    getLevelProgress(level) {
        const saved = localStorage.getItem(`hsk${level}_progress`);
        return saved ? parseInt(saved) : 0;
    }
};

// Initialize on load
HSK_CONFIG.loadSavedLevel();
