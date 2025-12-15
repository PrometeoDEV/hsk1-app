// ===== Vocabulary Manager Module - HSK Learning =====
// Módulo centralizado para gestión de vocabulario
// Conecta diccionario, oraciones, progreso y SRS

const VocabularyManager = {
    // Estado
    currentLevel: 1,
    vocabulary: [],
    isLoaded: false,

    // ===== Inicialización =====
    init(level = 1) {
        this.currentLevel = level;
        this.loadVocabulary(level);
        return this;
    },

    // ===== Cargar Vocabulario del Nivel =====
    loadVocabulary(level) {
        this.currentLevel = level;
        this.vocabulary = [];

        // Obtener palabras del diccionario
        if (typeof ChineseDictionary !== 'undefined') {
            const dictWords = ChineseDictionary.getWordsByLevel(level);

            dictWords.forEach((word, index) => {
                this.vocabulary.push({
                    id: index + 1,
                    hanzi: word.hanzi,
                    traditional: word.trad,
                    pinyin: word.pinyin,
                    meaning: word.defs.join(', '),
                    definitions: word.defs,
                    hskLevel: word.hsk,
                    frequency: word.freq || index + 1,
                    // Enriquecer con oraciones
                    sentences: this.getSentencesForWord(word.hanzi, level),
                    // Campos para progreso
                    mastered: false,
                    lastReview: null,
                    reviewCount: 0,
                    correctCount: 0
                });
            });
        }

        this.isLoaded = true;
        console.log(`✓ Vocabulario HSK${level} cargado: ${this.vocabulary.length} palabras`);
        return this.vocabulary;
    },

    // ===== Obtener Oraciones para Palabra =====
    getSentencesForWord(hanzi, level) {
        if (typeof SentenceBank !== 'undefined') {
            return SentenceBank.getByWord(hanzi, level);
        }
        return [];
    },

    // ===== Obtener Todo el Vocabulario =====
    getAll() {
        return this.vocabulary;
    },

    // ===== Obtener Palabra por ID =====
    getById(id) {
        return this.vocabulary.find(w => w.id === id);
    },

    // ===== Obtener Palabra por Hanzi =====
    getByHanzi(hanzi) {
        return this.vocabulary.find(w => w.hanzi === hanzi);
    },

    // ===== Búsqueda General =====
    search(query) {
        const q = query.toLowerCase().trim();

        return this.vocabulary.filter(word => {
            return word.hanzi.includes(q) ||
                   word.pinyin.toLowerCase().includes(q) ||
                   word.meaning.toLowerCase().includes(q);
        });
    },

    // ===== Búsqueda Avanzada =====
    advancedSearch(options = {}) {
        let results = [...this.vocabulary];

        // Filtrar por texto
        if (options.query) {
            const q = options.query.toLowerCase();
            results = results.filter(w =>
                w.hanzi.includes(q) ||
                w.pinyin.toLowerCase().includes(q) ||
                w.meaning.toLowerCase().includes(q)
            );
        }

        // Filtrar por dominadas
        if (options.masteredOnly === true) {
            results = results.filter(w => w.mastered);
        } else if (options.masteredOnly === false) {
            results = results.filter(w => !w.mastered);
        }

        // Filtrar por tono
        if (options.tone) {
            results = results.filter(w => {
                const toneMarks = { 1: 'āēīōū', 2: 'áéíóú', 3: 'ǎěǐǒǔ', 4: 'àèìòù' };
                const marks = toneMarks[options.tone] || '';
                return [...marks].some(m => w.pinyin.includes(m));
            });
        }

        // Ordenar
        if (options.sortBy) {
            switch (options.sortBy) {
                case 'frequency':
                    results.sort((a, b) => a.frequency - b.frequency);
                    break;
                case 'pinyin':
                    results.sort((a, b) => a.pinyin.localeCompare(b.pinyin));
                    break;
                case 'reviews':
                    results.sort((a, b) => b.reviewCount - a.reviewCount);
                    break;
                case 'accuracy':
                    results.sort((a, b) => {
                        const accA = a.reviewCount ? a.correctCount / a.reviewCount : 0;
                        const accB = b.reviewCount ? b.correctCount / b.reviewCount : 0;
                        return accB - accA;
                    });
                    break;
            }
        }

        // Limitar resultados
        if (options.limit) {
            results = results.slice(0, options.limit);
        }

        return results;
    },

    // ===== Obtener Palabras para Estudio =====
    getStudyWords(count = 10, options = {}) {
        let pool = [...this.vocabulary];

        // Priorizar no dominadas
        if (options.prioritizeNew) {
            pool.sort((a, b) => {
                if (a.mastered !== b.mastered) {
                    return a.mastered ? 1 : -1;
                }
                return a.reviewCount - b.reviewCount;
            });
        }

        // Mezclar si se solicita
        if (options.shuffle) {
            pool = this.shuffleArray(pool);
        }

        return pool.slice(0, count);
    },

    // ===== Obtener Palabras Difíciles =====
    getDifficultWords(threshold = 0.5, limit = 10) {
        return this.vocabulary
            .filter(w => {
                if (w.reviewCount < 3) return false;
                const accuracy = w.correctCount / w.reviewCount;
                return accuracy < threshold;
            })
            .sort((a, b) => {
                const accA = a.correctCount / a.reviewCount;
                const accB = b.correctCount / b.reviewCount;
                return accA - accB;
            })
            .slice(0, limit);
    },

    // ===== Actualizar Progreso de Palabra =====
    updateProgress(wordId, correct) {
        const word = this.getById(wordId);
        if (!word) return null;

        word.reviewCount++;
        if (correct) {
            word.correctCount++;
        }
        word.lastReview = Date.now();

        // Marcar como dominada si tiene alta precisión
        const accuracy = word.correctCount / word.reviewCount;
        if (word.reviewCount >= 5 && accuracy >= 0.8) {
            word.mastered = true;
        }

        return word;
    },

    // ===== Obtener Estadísticas =====
    getStatistics() {
        const total = this.vocabulary.length;
        const mastered = this.vocabulary.filter(w => w.mastered).length;
        const reviewed = this.vocabulary.filter(w => w.reviewCount > 0).length;
        const totalReviews = this.vocabulary.reduce((sum, w) => sum + w.reviewCount, 0);
        const totalCorrect = this.vocabulary.reduce((sum, w) => sum + w.correctCount, 0);

        return {
            level: this.currentLevel,
            totalWords: total,
            masteredWords: mastered,
            reviewedWords: reviewed,
            newWords: total - reviewed,
            masteryPercentage: total ? Math.round((mastered / total) * 100) : 0,
            totalReviews: totalReviews,
            overallAccuracy: totalReviews ? Math.round((totalCorrect / totalReviews) * 100) : 0,
            averageReviewsPerWord: total ? Math.round(totalReviews / total * 10) / 10 : 0
        };
    },

    // ===== Obtener Progreso por Tonos =====
    getToneStatistics() {
        const toneMarks = {
            1: 'āēīōū',
            2: 'áéíóú',
            3: 'ǎěǐǒǔ',
            4: 'àèìòù',
            5: '' // Tono neutro
        };

        const stats = { 1: { total: 0, mastered: 0 }, 2: { total: 0, mastered: 0 },
                        3: { total: 0, mastered: 0 }, 4: { total: 0, mastered: 0 } };

        this.vocabulary.forEach(word => {
            for (let tone = 1; tone <= 4; tone++) {
                if ([...toneMarks[tone]].some(m => word.pinyin.includes(m))) {
                    stats[tone].total++;
                    if (word.mastered) stats[tone].mastered++;
                    break;
                }
            }
        });

        return stats;
    },

    // ===== Generar Quiz =====
    generateQuiz(type = 'meaning', count = 10) {
        const words = this.getStudyWords(count, { shuffle: true });
        const questions = [];

        words.forEach(word => {
            const wrongOptions = this.vocabulary
                .filter(w => w.id !== word.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            let question, correctAnswer, options;

            switch (type) {
                case 'meaning':
                    question = `¿Qué significa "${word.hanzi}"?`;
                    correctAnswer = word.meaning;
                    options = [word.meaning, ...wrongOptions.map(w => w.meaning)];
                    break;

                case 'hanzi':
                    question = `¿Cómo se escribe "${word.meaning}"?`;
                    correctAnswer = word.hanzi;
                    options = [word.hanzi, ...wrongOptions.map(w => w.hanzi)];
                    break;

                case 'pinyin':
                    question = `¿Cuál es el pinyin de "${word.hanzi}"?`;
                    correctAnswer = word.pinyin;
                    options = [word.pinyin, ...wrongOptions.map(w => w.pinyin)];
                    break;

                case 'audio':
                    question = `Escucha y selecciona el hanzi correcto`;
                    correctAnswer = word.hanzi;
                    options = [word.hanzi, ...wrongOptions.map(w => w.hanzi)];
                    break;
            }

            questions.push({
                id: word.id,
                word: word,
                type: type,
                question: question,
                correctAnswer: correctAnswer,
                options: this.shuffleArray(options)
            });
        });

        return questions;
    },

    // ===== Generar Flashcards =====
    generateFlashcards(count = 10, options = {}) {
        const words = this.getStudyWords(count, options);

        return words.map(word => ({
            id: word.id,
            front: {
                hanzi: word.hanzi,
                pinyin: options.showPinyin ? word.pinyin : null
            },
            back: {
                pinyin: word.pinyin,
                meaning: word.meaning,
                sentences: word.sentences.slice(0, 2)
            },
            word: word
        }));
    },

    // ===== Sincronizar con localStorage =====
    saveProgress() {
        const progressData = this.vocabulary.map(w => ({
            id: w.id,
            mastered: w.mastered,
            lastReview: w.lastReview,
            reviewCount: w.reviewCount,
            correctCount: w.correctCount
        }));

        localStorage.setItem(`hsk${this.currentLevel}_vocabulary_progress`, JSON.stringify(progressData));
        console.log(`✓ Progreso HSK${this.currentLevel} guardado`);
    },

    // ===== Cargar Progreso desde localStorage =====
    loadProgress() {
        const saved = localStorage.getItem(`hsk${this.currentLevel}_vocabulary_progress`);
        if (!saved) return;

        try {
            const progressData = JSON.parse(saved);
            progressData.forEach(progress => {
                const word = this.getById(progress.id);
                if (word) {
                    word.mastered = progress.mastered;
                    word.lastReview = progress.lastReview;
                    word.reviewCount = progress.reviewCount;
                    word.correctCount = progress.correctCount;
                }
            });
            console.log(`✓ Progreso HSK${this.currentLevel} cargado`);
        } catch (e) {
            console.warn('Error al cargar progreso:', e);
        }
    },

    // ===== Exportar Datos =====
    exportData() {
        return {
            level: this.currentLevel,
            exportDate: new Date().toISOString(),
            statistics: this.getStatistics(),
            vocabulary: this.vocabulary.map(w => ({
                hanzi: w.hanzi,
                pinyin: w.pinyin,
                meaning: w.meaning,
                mastered: w.mastered,
                reviewCount: w.reviewCount,
                correctCount: w.correctCount
            }))
        };
    },

    // ===== Utilidades =====
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // ===== Obtener Palabra del Día =====
    getWordOfTheDay() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const index = dayOfYear % this.vocabulary.length;
        return this.vocabulary[index];
    },

    // ===== Cambiar Nivel =====
    changeLevel(newLevel) {
        // Guardar progreso actual
        this.saveProgress();
        // Cargar nuevo nivel
        this.loadVocabulary(newLevel);
        this.loadProgress();
        return this.vocabulary;
    }
};
