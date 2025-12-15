// ===== Statistics Module - HSK Learning Analytics =====
// Módulo de estadísticas avanzadas y análisis de progreso

const StatisticsModule = {
    // Datos de sesiones
    sessions: [],
    currentSession: null,

    // ===== Inicialización =====
    init() {
        this.loadSessions();
        this.startSession();
        console.log('✓ Statistics Module inicializado');
    },

    // ===== Gestión de Sesiones =====
    startSession() {
        this.currentSession = {
            id: Date.now(),
            startTime: Date.now(),
            endTime: null,
            wordsStudied: [],
            wordsCorrect: [],
            wordsWrong: [],
            exercisesCompleted: 0,
            xpEarned: 0,
            techniques: {}
        };
    },

    endSession() {
        if (!this.currentSession) return null;

        this.currentSession.endTime = Date.now();
        this.currentSession.duration = Math.round(
            (this.currentSession.endTime - this.currentSession.startTime) / 60000
        );

        // Calcular estadísticas de sesión
        const summary = this.getSessionSummary();

        // Guardar sesión
        this.sessions.push(this.currentSession);
        this.saveSessions();

        // Iniciar nueva sesión
        const completedSession = this.currentSession;
        this.startSession();

        return { session: completedSession, summary };
    },

    // ===== Registrar Actividad =====
    recordWordStudy(wordId, correct) {
        if (!this.currentSession) return;

        this.currentSession.wordsStudied.push(wordId);
        if (correct) {
            this.currentSession.wordsCorrect.push(wordId);
        } else {
            this.currentSession.wordsWrong.push(wordId);
        }
    },

    recordExercise(type) {
        if (!this.currentSession) return;
        this.currentSession.exercisesCompleted++;
        this.currentSession.techniques[type] = (this.currentSession.techniques[type] || 0) + 1;
    },

    recordXP(amount) {
        if (!this.currentSession) return;
        this.currentSession.xpEarned += amount;
    },

    // ===== Resumen de Sesión =====
    getSessionSummary() {
        if (!this.currentSession) return null;

        const session = this.currentSession;
        const totalWords = session.wordsStudied.length;
        const uniqueWords = [...new Set(session.wordsStudied)].length;
        const accuracy = totalWords > 0
            ? Math.round((session.wordsCorrect.length / totalWords) * 100)
            : 0;

        return {
            duration: Math.round((Date.now() - session.startTime) / 60000),
            totalWords: totalWords,
            uniqueWords: uniqueWords,
            correctAnswers: session.wordsCorrect.length,
            wrongAnswers: session.wordsWrong.length,
            accuracy: accuracy,
            exercisesCompleted: session.exercisesCompleted,
            xpEarned: session.xpEarned,
            techniques: session.techniques,
            difficultWords: this.getMostDifficultWords(session)
        };
    },

    getMostDifficultWords(session) {
        const wrongCounts = {};
        session.wordsWrong.forEach(id => {
            wrongCounts[id] = (wrongCounts[id] || 0) + 1;
        });

        return Object.entries(wrongCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id, count]) => ({ id: parseInt(id), wrongCount: count }));
    },

    // ===== Estadísticas Históricas =====
    getWeeklyStats() {
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        const weekAgo = now - oneWeek;

        const weeklySessions = this.sessions.filter(s => s.startTime >= weekAgo);

        const dailyStats = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date(now - i * 24 * 60 * 60 * 1000);
            const dateStr = date.toISOString().split('T')[0];
            dailyStats[dateStr] = {
                date: dateStr,
                dayName: date.toLocaleDateString('es', { weekday: 'short' }),
                words: 0,
                minutes: 0,
                exercises: 0,
                xp: 0
            };
        }

        weeklySessions.forEach(session => {
            const dateStr = new Date(session.startTime).toISOString().split('T')[0];
            if (dailyStats[dateStr]) {
                dailyStats[dateStr].words += session.wordsStudied?.length || 0;
                dailyStats[dateStr].minutes += session.duration || 0;
                dailyStats[dateStr].exercises += session.exercisesCompleted || 0;
                dailyStats[dateStr].xp += session.xpEarned || 0;
            }
        });

        return Object.values(dailyStats).reverse();
    },

    getMonthlyStats() {
        const now = Date.now();
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        const monthAgo = now - oneMonth;

        const monthlySessions = this.sessions.filter(s => s.startTime >= monthAgo);

        return {
            totalSessions: monthlySessions.length,
            totalWords: monthlySessions.reduce((sum, s) => sum + (s.wordsStudied?.length || 0), 0),
            totalMinutes: monthlySessions.reduce((sum, s) => sum + (s.duration || 0), 0),
            totalXP: monthlySessions.reduce((sum, s) => sum + (s.xpEarned || 0), 0),
            averageAccuracy: this.calculateAverageAccuracy(monthlySessions),
            studyDays: this.countStudyDays(monthlySessions),
            longestStreak: this.calculateLongestStreak()
        };
    },

    calculateAverageAccuracy(sessions) {
        if (sessions.length === 0) return 0;

        let totalCorrect = 0;
        let totalAttempts = 0;

        sessions.forEach(s => {
            totalCorrect += s.wordsCorrect?.length || 0;
            totalAttempts += s.wordsStudied?.length || 0;
        });

        return totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    },

    countStudyDays(sessions) {
        const days = new Set();
        sessions.forEach(s => {
            days.add(new Date(s.startTime).toISOString().split('T')[0]);
        });
        return days.size;
    },

    calculateLongestStreak() {
        if (this.sessions.length === 0) return 0;

        const days = [...new Set(
            this.sessions.map(s => new Date(s.startTime).toISOString().split('T')[0])
        )].sort();

        let maxStreak = 1;
        let currentStreak = 1;

        for (let i = 1; i < days.length; i++) {
            const prev = new Date(days[i - 1]);
            const curr = new Date(days[i]);
            const diffDays = (curr - prev) / (24 * 60 * 60 * 1000);

            if (diffDays === 1) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 1;
            }
        }

        return maxStreak;
    },

    // ===== Análisis de Palabras Difíciles =====
    getDifficultWordsAnalysis() {
        const wordStats = {};

        this.sessions.forEach(session => {
            session.wordsCorrect?.forEach(id => {
                if (!wordStats[id]) wordStats[id] = { correct: 0, wrong: 0 };
                wordStats[id].correct++;
            });
            session.wordsWrong?.forEach(id => {
                if (!wordStats[id]) wordStats[id] = { correct: 0, wrong: 0 };
                wordStats[id].wrong++;
            });
        });

        return Object.entries(wordStats)
            .map(([id, stats]) => ({
                id: parseInt(id),
                correct: stats.correct,
                wrong: stats.wrong,
                total: stats.correct + stats.wrong,
                accuracy: Math.round((stats.correct / (stats.correct + stats.wrong)) * 100)
            }))
            .filter(w => w.total >= 3 && w.accuracy < 70)
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, 10);
    },

    // ===== Progreso por Categoría =====
    getProgressByTone() {
        const progress = JSON.parse(localStorage.getItem('hsk1_progress') || '{}');
        const vocabulary = typeof HSK1_VOCABULARY !== 'undefined' ? HSK1_VOCABULARY : [];

        const toneStats = { 1: { total: 0, learned: 0 }, 2: { total: 0, learned: 0 },
                           3: { total: 0, learned: 0 }, 4: { total: 0, learned: 0 } };

        const toneMarks = { 1: 'āēīōū', 2: 'áéíóú', 3: 'ǎěǐǒǔ', 4: 'àèìòù' };

        vocabulary.forEach(word => {
            for (let tone = 1; tone <= 4; tone++) {
                if ([...toneMarks[tone]].some(m => word.pinyin.includes(m))) {
                    toneStats[tone].total++;
                    if (progress.learned?.includes(word.id)) {
                        toneStats[tone].learned++;
                    }
                    break;
                }
            }
        });

        return toneStats;
    },

    // ===== Predicción de Tiempo para Completar =====
    estimateCompletionTime() {
        const monthlyStats = this.getMonthlyStats();
        const progress = JSON.parse(localStorage.getItem('hsk1_progress') || '{}');
        const totalWords = 150;
        const learnedWords = progress.learned?.length || 0;
        const remainingWords = totalWords - learnedWords;

        if (monthlyStats.studyDays === 0 || monthlyStats.totalWords === 0) {
            return { daysRemaining: null, estimatedDate: null };
        }

        const wordsPerDay = monthlyStats.totalWords / monthlyStats.studyDays;
        const daysRemaining = Math.ceil(remainingWords / wordsPerDay);
        const estimatedDate = new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000);

        return {
            daysRemaining,
            estimatedDate: estimatedDate.toLocaleDateString('es'),
            wordsPerDay: Math.round(wordsPerDay * 10) / 10
        };
    },

    // ===== Persistencia =====
    saveSessions() {
        // Mantener solo últimos 90 días
        const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;
        this.sessions = this.sessions.filter(s => s.startTime >= ninetyDaysAgo);
        localStorage.setItem('hsk_study_sessions', JSON.stringify(this.sessions));
    },

    loadSessions() {
        const saved = localStorage.getItem('hsk_study_sessions');
        this.sessions = saved ? JSON.parse(saved) : [];
    },

    // ===== Exportar Datos =====
    exportAllData() {
        return {
            exportDate: new Date().toISOString(),
            sessions: this.sessions,
            weeklyStats: this.getWeeklyStats(),
            monthlyStats: this.getMonthlyStats(),
            difficultWords: this.getDifficultWordsAnalysis(),
            toneProgress: this.getProgressByTone(),
            completionEstimate: this.estimateCompletionTime()
        };
    }
};
