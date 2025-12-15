// ===== HSK1 Study App - Main Application =====
// Implementa técnicas de aprendizaje probadas:
// 1. Repetición Espaciada (SRS) - Algoritmo similar a Anki
// 2. Gamificación - Sistema de puntos y rachas
// 3. Retroalimentación inmediata
// 4. Práctica contextual
// 5. Aprendizaje activo con múltiples modos

class HSK1App {
    constructor() {
        this.currentSection = 'home';
        this.vocabulary = HSK1_VOCABULARY;
        this.currentCardIndex = 0;
        this.filteredVocab = [...this.vocabulary];
        this.isCardFlipped = false;
        this.selectedExamType = 'full';
        this.examQuestions = [];
        this.examAnswers = [];
        this.examCurrentQuestion = 0;
        this.examTimer = null;
        this.examTimeLeft = 40 * 60;

        // Sistema de Repetición Espaciada (SRS)
        this.srsIntervals = [1, 3, 7, 14, 30, 90]; // Días entre repeticiones
        this.srsData = this.loadSRSData();

        // User progress data
        this.progress = this.loadProgress();

        // Gamificación
        this.xpPerCorrect = 10;
        this.xpPerStreak = 5;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateProgressDisplay();
        this.updateXPDisplay();
        this.renderLessonsGrid();
        this.loadDailyWord();
        this.updateStreak();
        this.loadFlashcard();
        this.showDueCardsNotification();
        this.initSpeechRecognition();
        this.initDailyGoals();
        this.updateAchievementsDisplay();
        this.startStudyTimer();
        this.initTechniques();
        this.initHanziWriter();
        this.initModules();
        this.checkOnboarding();
    }

    // ===== Onboarding for New Users =====
    checkOnboarding() {
        const hasSeenOnboarding = localStorage.getItem('hsk1_onboarding_done');
        if (!hasSeenOnboarding) {
            setTimeout(() => this.showOnboarding(), 500);
        }
    }

    showOnboarding() {
        document.getElementById('onboarding-modal').classList.add('visible');
    }

    closeOnboarding() {
        document.getElementById('onboarding-modal').classList.remove('visible');
        localStorage.setItem('hsk1_onboarding_done', 'true');
    }

    startOnboardingPath(path) {
        this.closeOnboarding();
        if (path === 'lessons') {
            this.navigateTo('lessons');
            // Show lesson 1 detail automatically
            setTimeout(() => this.showLessonDetail(1), 300);
        } else if (path === 'flashcards') {
            this.navigateTo('flashcards');
        } else if (path === 'exam') {
            this.navigateTo('exam');
            // Select mini exam
            setTimeout(() => {
                const miniCard = document.querySelector('.exam-type-card[data-type="mini"]');
                if (miniCard) miniCard.click();
            }, 300);
        }
    }

    // ===== Daily Goals System =====
    initDailyGoals() {
        const today = new Date().toDateString();
        const savedGoals = localStorage.getItem('hsk1_daily_goals');

        if (savedGoals) {
            const goals = JSON.parse(savedGoals);
            if (goals.date === today) {
                this.dailyGoals = goals;
            } else {
                // Nuevo día, resetear metas
                this.dailyGoals = this.createNewDailyGoals(today);
            }
        } else {
            this.dailyGoals = this.createNewDailyGoals(today);
        }

        this.updateDailyGoalsDisplay();
    }

    createNewDailyGoals(date) {
        return {
            date: date,
            wordsStudied: 0,
            wordsTarget: 20,
            exercisesDone: 0,
            exercisesTarget: 10,
            studyTime: 0, // minutos
            timeTarget: 15,
            completed: false,
            bonusClaimed: false
        };
    }

    updateDailyGoals(type, amount = 1) {
        if (!this.dailyGoals) return;

        switch (type) {
            case 'words':
                this.dailyGoals.wordsStudied += amount;
                break;
            case 'exercises':
                this.dailyGoals.exercisesDone += amount;
                break;
            case 'time':
                this.dailyGoals.studyTime = amount;
                break;
        }

        // Verificar si completó todas las metas
        const wordsComplete = this.dailyGoals.wordsStudied >= this.dailyGoals.wordsTarget;
        const exercisesComplete = this.dailyGoals.exercisesDone >= this.dailyGoals.exercisesTarget;
        const timeComplete = this.dailyGoals.studyTime >= this.dailyGoals.timeTarget;

        if (wordsComplete && exercisesComplete && timeComplete && !this.dailyGoals.bonusClaimed) {
            this.dailyGoals.completed = true;
            this.dailyGoals.bonusClaimed = true;
            this.addXP(50); // Bonus por completar meta diaria
            this.showFeedback('correct', '¡Meta diaria completada! +50 XP');
            document.getElementById('goal-bonus').style.display = 'block';
        }

        localStorage.setItem('hsk1_daily_goals', JSON.stringify(this.dailyGoals));
        this.updateDailyGoalsDisplay();
    }

    updateDailyGoalsDisplay() {
        if (!this.dailyGoals) return;

        // Words
        const wordsPercent = Math.min(100, (this.dailyGoals.wordsStudied / this.dailyGoals.wordsTarget) * 100);
        document.getElementById('goal-words-bar').style.width = `${wordsPercent}%`;
        document.getElementById('goal-words-current').textContent = this.dailyGoals.wordsStudied;

        // Exercises
        const exercisesPercent = Math.min(100, (this.dailyGoals.exercisesDone / this.dailyGoals.exercisesTarget) * 100);
        document.getElementById('goal-exercises-bar').style.width = `${exercisesPercent}%`;
        document.getElementById('goal-exercises-current').textContent = this.dailyGoals.exercisesDone;

        // Time
        const timePercent = Math.min(100, (this.dailyGoals.studyTime / this.dailyGoals.timeTarget) * 100);
        document.getElementById('goal-time-bar').style.width = `${timePercent}%`;
        document.getElementById('goal-time-current').textContent = this.dailyGoals.studyTime;

        // Bonus
        if (this.dailyGoals.bonusClaimed) {
            document.getElementById('goal-bonus').style.display = 'block';
        }
    }

    startStudyTimer() {
        this.studyStartTime = Date.now();
        // Actualizar tiempo cada minuto
        setInterval(() => {
            const minutes = Math.floor((Date.now() - this.studyStartTime) / 60000);
            this.updateDailyGoals('time', minutes);
        }, 60000);
    }

    // ===== Achievements System =====
    loadAchievements() {
        const saved = localStorage.getItem('hsk1_achievements');
        return saved ? JSON.parse(saved) : [];
    }

    saveAchievements() {
        localStorage.setItem('hsk1_achievements', JSON.stringify(this.progress.achievements || []));
    }

    checkAchievements() {
        const achievements = this.progress.achievements || [];
        const newAchievements = [];

        // Definir todos los logros y sus condiciones
        const achievementDefs = [
            { id: 'first-word', condition: () => this.progress.wordsLearned.length >= 1, name: 'Primer Paso', icon: '🌱' },
            { id: 'vocab-25', condition: () => this.progress.wordsLearned.length >= 25, name: 'Aprendiz', icon: '📖' },
            { id: 'vocab-50', condition: () => this.progress.wordsLearned.length >= 50, name: 'Estudiante', icon: '📚' },
            { id: 'vocab-100', condition: () => this.progress.wordsLearned.length >= 100, name: 'Erudito', icon: '🎓' },
            { id: 'vocab-150', condition: () => this.progress.wordsLearned.length >= 150, name: 'Maestro HSK1', icon: '🏆' },
            { id: 'streak-3', condition: () => this.progress.streak >= 3, name: 'En Racha', icon: '🔥' },
            { id: 'streak-7', condition: () => this.progress.streak >= 7, name: 'Semana Perfecta', icon: '⭐' },
            { id: 'streak-30', condition: () => this.progress.streak >= 30, name: 'Imparable', icon: '💎' },
            { id: 'exam-pass', condition: () => this.progress.bestExamScore >= 60, name: 'Examen Pasado', icon: '✅' },
            { id: 'exam-perfect', condition: () => this.progress.bestExamScore >= 100, name: 'Perfecto', icon: '💯' },
            { id: 'pronunciation', condition: () => (this.progress.pronunciationPracticed || 0) >= 10, name: 'Orador', icon: '🎤' },
            { id: 'level-5', condition: () => this.progress.level >= 5, name: 'Nivel 5', icon: '🚀' }
        ];

        achievementDefs.forEach(def => {
            if (!achievements.includes(def.id) && def.condition()) {
                achievements.push(def.id);
                newAchievements.push(def);
            }
        });

        if (newAchievements.length > 0) {
            this.progress.achievements = achievements;
            this.saveProgress();

            // Mostrar notificación para cada nuevo logro
            newAchievements.forEach((achievement, index) => {
                setTimeout(() => {
                    this.showAchievementNotification(achievement);
                }, index * 3500);
            });

            this.updateAchievementsDisplay();
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <span class="icon">${achievement.icon}</span>
            <div class="text">
                <span class="title">¡Logro Desbloqueado!</span>
                <span class="name">${achievement.name}</span>
            </div>
        `;
        document.body.appendChild(notification);

        // Añadir XP bonus por logro
        this.addXP(25);

        setTimeout(() => {
            notification.remove();
        }, 3500);
    }

    updateAchievementsDisplay() {
        const achievements = this.progress.achievements || [];
        const grid = document.getElementById('achievements-grid');
        if (!grid) return;

        grid.querySelectorAll('.achievement').forEach(el => {
            const id = el.dataset.id;
            if (achievements.includes(id)) {
                el.classList.remove('locked');
                el.classList.add('unlocked');
            } else {
                el.classList.add('locked');
                el.classList.remove('unlocked');
            }
        });
    }

    // ===== Sistema de Repetición Espaciada (SRS) =====
    loadSRSData() {
        const saved = localStorage.getItem('hsk1_srs');
        if (saved) {
            return JSON.parse(saved);
        }
        // Inicializar datos SRS para cada palabra
        const srsData = {};
        this.vocabulary.forEach(word => {
            srsData[word.id] = {
                level: 0, // Nivel de intervalo (0-5)
                nextReview: null, // Fecha de próxima revisión
                easeFactor: 2.5, // Factor de facilidad (como Anki)
                reviews: 0, // Número de revisiones
                correct: 0, // Respuestas correctas
                errors: 0, // Errores para revisión
                lastReview: null
            };
        });
        return srsData;
    }

    saveSRSData() {
        localStorage.setItem('hsk1_srs', JSON.stringify(this.srsData));
    }

    // Obtener palabras que necesitan revisión hoy
    getDueCards() {
        const today = new Date().toDateString();
        const dueCards = [];

        this.vocabulary.forEach(word => {
            const srs = this.srsData[word.id];
            if (!srs.nextReview || new Date(srs.nextReview).toDateString() <= today) {
                dueCards.push(word);
            }
        });

        // Ordenar: primero las que nunca se han visto, luego por nivel
        return dueCards.sort((a, b) => {
            const srsA = this.srsData[a.id];
            const srsB = this.srsData[b.id];
            if (srsA.reviews === 0 && srsB.reviews > 0) return -1;
            if (srsB.reviews === 0 && srsA.reviews > 0) return 1;
            return srsA.level - srsB.level;
        });
    }

    // Actualizar SRS después de una respuesta
    updateSRS(wordId, quality) {
        // quality: 0 = no lo sé, 1 = difícil, 2 = bien, 3 = fácil
        const srs = this.srsData[wordId];
        const today = new Date();

        srs.reviews++;
        srs.lastReview = today.toISOString();

        if (quality < 2) {
            // Respuesta incorrecta: reiniciar nivel
            srs.level = 0;
            srs.easeFactor = Math.max(1.3, srs.easeFactor - 0.2);
            srs.errors = (srs.errors || 0) + 1; // Incrementar errores
        } else {
            srs.correct++;
            // Respuesta correcta: avanzar nivel
            if (srs.level < this.srsIntervals.length - 1) {
                srs.level++;
            }
            // Ajustar factor de facilidad
            if (quality === 3) {
                srs.easeFactor += 0.1;
            }
        }

        // Calcular próxima fecha de revisión
        const interval = this.srsIntervals[srs.level] * srs.easeFactor;
        const nextDate = new Date(today);
        nextDate.setDate(nextDate.getDate() + Math.round(interval));
        srs.nextReview = nextDate.toISOString();

        this.saveSRSData();
    }

    showDueCardsNotification() {
        const dueCards = this.getDueCards();
        const banner = document.getElementById('due-cards-banner');
        const countEl = document.getElementById('due-count');

        if (dueCards.length > 0 && banner && countEl) {
            countEl.textContent = dueCards.length;
            banner.style.display = 'flex';
        } else if (banner) {
            banner.style.display = 'none';
        }
    }

    // Iniciar revisión SRS de tarjetas pendientes
    startSRSReview() {
        const dueCards = this.getDueCards();
        if (dueCards.length === 0) {
            this.showFeedback('correct', '¡No hay tarjetas pendientes!');
            return;
        }

        this.filteredVocab = dueCards;
        this.currentCardIndex = 0;
        this.navigateTo('flashcards');
        this.loadFlashcard();
        this.showFeedback('correct', `${dueCards.length} tarjetas para repasar`);
    }

    // Actualizar display de XP y nivel en la UI
    updateXPDisplay() {
        const levelEl = document.getElementById('user-level');
        const xpBarEl = document.getElementById('xp-bar');
        const currentXpEl = document.getElementById('current-xp');

        if (levelEl) levelEl.textContent = this.progress.level;

        const xpInCurrentLevel = this.progress.totalXP % 100;
        if (xpBarEl) xpBarEl.style.width = `${xpInCurrentLevel}%`;
        if (currentXpEl) currentXpEl.textContent = xpInCurrentLevel;
    }

    // ===== Local Storage =====
    loadProgress() {
        const saved = localStorage.getItem('hsk1_progress');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            wordsLearned: [],
            wordsReviewing: [],
            wordsMastered: [],
            lessonsCompleted: [],
            exercisesDone: 0,
            examsTaken: 0,
            bestScore: 0,
            lastStudyDate: null,
            streak: 0,
            pinyinPracticed: 0,
            hanziPracticed: 0,
            grammarPracticed: 0,
            totalXP: 0, // Puntos de experiencia (gamificación)
            level: 1, // Nivel del usuario
            achievements: [] // Logros desbloqueados
        };
    }

    saveProgress() {
        localStorage.setItem('hsk1_progress', JSON.stringify(this.progress));
        this.updateProgressDisplay();
    }

    // ===== Event Listeners =====
    setupEventListeners() {
        // Menu toggle
        document.getElementById('menu-btn').addEventListener('click', () => this.toggleSidebar());
        document.getElementById('overlay').addEventListener('click', () => this.closeSidebar());

        // Navigation
        document.querySelectorAll('.nav-menu li').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.navigateTo(section);
                this.closeSidebar();
            });
        });

        // Progress modal
        document.getElementById('progress-btn').addEventListener('click', () => this.openProgressModal());
        document.getElementById('close-progress-modal').addEventListener('click', () => this.closeProgressModal());
        document.getElementById('reset-progress').addEventListener('click', () => this.resetProgress());

        // Progress cards navigation
        document.querySelectorAll('.progress-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                if (section) this.navigateTo(section);
            });
        });

        // Quick actions
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Flashcard interactions
        document.getElementById('flashcard').addEventListener('click', () => this.flipCard());
        document.getElementById('card-audio').addEventListener('click', (e) => {
            e.stopPropagation();
            this.playAudio(this.filteredVocab[this.currentCardIndex]);
        });
        document.getElementById('btn-wrong').addEventListener('click', () => this.markWord('wrong'));
        document.getElementById('btn-skip').addEventListener('click', () => this.nextCard());
        document.getElementById('btn-correct').addEventListener('click', () => this.markWord('correct'));

        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.filterVocabulary(e.target.dataset.filter);
            });
        });

        // Lesson selector
        document.getElementById('vocab-lesson-select').addEventListener('change', (e) => {
            this.filterByLesson(e.target.value);
        });

        // Pinyin tabs
        document.querySelectorAll('.pinyin-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.pinyin-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.pinyin-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(`${e.target.dataset.tab}-content`).classList.add('active');

                // Inicializar dictado si se activa esa pestaña
                if (e.target.dataset.tab === 'dictation') {
                    this.initDictationTab();
                }
            });
        });

        // Hanzi tabs
        document.querySelectorAll('.hanzi-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.hanzi-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.hanzi-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(`${e.target.dataset.tab}-content`).classList.add('active');
            });
        });

        // Tone practice
        document.querySelectorAll('.tone-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkToneAnswer(e));
        });
        document.getElementById('next-tone-practice').addEventListener('click', () => this.loadTonePractice());

        // Hanzi practice
        document.querySelectorAll('.hanzi-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkHanziAnswer(e));
        });
        document.getElementById('next-hanzi-practice').addEventListener('click', () => this.loadHanziPractice());

        // Lessons
        document.getElementById('back-to-lessons').addEventListener('click', () => this.showLessonsList());

        // Exam
        document.querySelectorAll('.exam-type-card').forEach(card => {
            card.addEventListener('click', (e) => {
                document.querySelectorAll('.exam-type-card').forEach(c => c.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                this.selectedExamType = e.currentTarget.dataset.type;
            });
        });
        document.getElementById('start-exam-btn').addEventListener('click', () => this.startExam());
        document.getElementById('exam-prev').addEventListener('click', () => this.examPrevQuestion());
        document.getElementById('exam-next').addEventListener('click', () => this.examNextQuestion());
        document.getElementById('retry-exam').addEventListener('click', () => this.resetExam());
        document.getElementById('review-answers').addEventListener('click', () => this.reviewExamAnswers());

        // Tone cards listen buttons
        document.querySelectorAll('.tone-listen-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const toneCard = e.target.closest('.tone-card');
                const tone = toneCard.dataset.tone;
                this.playToneExample(tone);
            });
        });

        // Initial pinyin button sounds
        document.querySelectorAll('.initial-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playPinyinSound(e.target.dataset.initial);
            });
        });

        // Daily word listen
        document.getElementById('daily-listen').addEventListener('click', () => {
            const hanzi = document.getElementById('daily-hanzi').textContent;
            const word = this.vocabulary.find(w => w.hanzi === hanzi);
            if (word) this.playAudio(word);
        });

        // Grammar practice buttons
        document.querySelectorAll('.practice-grammar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const grammarId = e.target.closest('.grammar-card').dataset.grammar;
                this.startGrammarPractice(grammarId);
            });
        });

        // Practice mode selector for pinyin
        document.querySelectorAll('.practice-mode').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.practice-mode').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Dictation mode
        document.getElementById('dictation-play')?.addEventListener('click', () => this.playDictationWord());
        document.getElementById('dictation-play-slow')?.addEventListener('click', () => this.playDictationWord(0.5));
        document.getElementById('dictation-submit')?.addEventListener('click', () => this.checkDictation());
        document.getElementById('dictation-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkDictation();
        });
        document.getElementById('next-dictation')?.addEventListener('click', () => this.loadDictationWord());
        document.getElementById('show-hint')?.addEventListener('click', () => this.showDictationHint());

        // Dictation mode toggle
        document.querySelectorAll('.dictation-mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.dictation-mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.dictationMode = e.target.dataset.mode;
            });
        });

        // Initialize dictation state
        this.dictationMode = 'pinyin';
        this.dictationWord = null;
        this.dictationStats = { correct: 0, total: 0, streak: 0 };

        // Exercise tabs
        document.querySelectorAll('.exercise-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.exercise-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.exercise-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(`${e.target.dataset.tab}-content`).classList.add('active');
            });
        });

        // Practice tabs (in exam section)
        document.querySelectorAll('.practice-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.practice-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.practice-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                const practiceType = e.target.dataset.practice;
                document.getElementById(`${practiceType}-practice-content`).classList.add('active');
            });
        });

        // Matching game
        document.getElementById('start-matching')?.addEventListener('click', () => this.startMatchingGame());

        // Sentence ordering
        document.getElementById('start-sentence')?.addEventListener('click', () => this.startSentenceGame());
        document.getElementById('clear-sentence')?.addEventListener('click', () => this.clearSentence());
        document.getElementById('check-sentence')?.addEventListener('click', () => this.checkSentence());

        // Conversation
        document.getElementById('start-conversation')?.addEventListener('click', () => this.startConversation());

        // Dark Mode Toggle
        const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
        if (darkModeCheckbox) {
            // Load saved preference
            const savedDarkMode = localStorage.getItem('hsk1_dark_mode') === 'true';
            if (savedDarkMode) {
                document.body.classList.add('dark-mode');
                darkModeCheckbox.checked = true;
            }

            darkModeCheckbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('hsk1_dark_mode', 'true');
                } else {
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('hsk1_dark_mode', 'false');
                }
            });
        }

        // Initialize exercise states
        this.matchingState = { selected: null, pairs: 0, errors: 0, timer: null, startTime: null };
        this.sentenceState = { current: null, answer: [], stats: { correct: 0, total: 0 } };
        this.conversationState = { dialogues: [], current: 0, step: 0 };
    }

    // ===== Navigation =====
    toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('overlay').classList.toggle('visible');
    }

    closeSidebar() {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('overlay').classList.remove('visible');
    }

    navigateTo(section) {
        // Close sidebar first
        this.closeSidebar();

        // Update nav menu with visual feedback
        document.querySelectorAll('.nav-menu li').forEach(item => {
            item.classList.toggle('active', item.dataset.section === section);
        });

        // Update sections
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        const newSection = document.getElementById(`${section}-section`);
        if (newSection) {
            newSection.classList.add('active');
        }

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update page title
        const titles = {
            home: 'HSK1 学习',
            flashcards: '词汇 Vocabulario',
            pinyin: '拼音 Pinyin',
            hanzi: '汉字 Caracteres',
            grammar: '语法 Gramática',
            lessons: '课文 Lecciones',
            exam: '考试 Examen',
            exercises: '练习 Ejercicios',
            techniques: '学习方法 Técnicas',
            listening: '听力 Escucha',
            reading: '阅读 Lectura',
            statistics: '统计 Estadísticas'
        };
        document.getElementById('page-title').textContent = titles[section] || 'HSK1';

        this.currentSection = section;

        // Initialize section-specific content
        if (section === 'pinyin') {
            this.loadTonePractice();
        } else if (section === 'hanzi') {
            this.loadHanziPractice();
        } else if (section === 'exercises') {
            // Auto-start matching game when entering exercises
            setTimeout(() => this.startMatchingGame(), 300);
        } else if (section === 'flashcards') {
            // Re-add mic button when entering flashcards
            setTimeout(() => this.addMicButtonToFlashcards(), 100);
        } else if (section === 'listening') {
            this.initListeningSection();
        } else if (section === 'reading') {
            this.initReadingSection();
        } else if (section === 'statistics') {
            this.initStatisticsSection();
        }
    }

    // Inicializar dictado cuando se active la pestaña
    initDictationTab() {
        if (!this.dictationWord) {
            this.loadDictationWord();
        }
    }

    // ===== Progress =====
    updateProgressDisplay() {
        const totalWords = this.vocabulary.length;
        const learned = this.progress.wordsLearned.length;
        const mastered = this.progress.wordsMastered.length;

        // Calculate percentages
        const vocabPercent = Math.round((learned / totalWords) * 100);
        const pinyinPercent = Math.min(100, Math.round((this.progress.pinyinPracticed / 50) * 100));
        const hanziPercent = Math.min(100, Math.round((this.progress.hanziPracticed / 50) * 100));
        const grammarPercent = Math.min(100, Math.round((this.progress.grammarPracticed / 30) * 100));

        // Update progress rings
        this.updateProgressRing('vocab', vocabPercent);
        this.updateProgressRing('pinyin', pinyinPercent);
        this.updateProgressRing('hanzi', hanziPercent);
        this.updateProgressRing('grammar', grammarPercent);

        // Update flashcard stats
        document.getElementById('words-learned').textContent = learned;
        document.getElementById('words-reviewing').textContent = this.progress.wordsReviewing.length;
        document.getElementById('words-remaining').textContent = totalWords - learned;
    }

    updateProgressRing(type, percent) {
        const ring = document.getElementById(`${type}-progress-ring`);
        const text = document.getElementById(`${type}-percent`);
        if (ring) {
            ring.style.strokeDasharray = `${percent}, 100`;
        }
        if (text) {
            text.textContent = `${percent}%`;
        }
    }

    openProgressModal() {
        const modal = document.getElementById('progress-modal');
        modal.classList.add('visible');

        this.updateAdvancedStats();
    }

    updateAdvancedStats() {
        // ===== HSK1 Readiness Score =====
        // Weighted calculation based on multiple factors
        const vocabScore = (this.progress.wordsLearned.length / 150) * 40; // 40% weight
        const exerciseScore = Math.min(1, this.progress.exercisesDone / 100) * 20; // 20% weight
        const examScore = Math.min(1, (this.progress.bestExamScore || 0) / 100) * 25; // 25% weight
        const masteryScore = (this.progress.wordsMastered.length / 150) * 15; // 15% weight
        const readiness = Math.round(vocabScore + exerciseScore + examScore + masteryScore);

        document.getElementById('readiness-score').textContent = `${readiness}%`;
        document.getElementById('readiness-bar').style.width = `${readiness}%`;

        // Set status based on readiness
        let status = 'Comenzando';
        if (readiness >= 80) status = '¡Listo para el examen!';
        else if (readiness >= 60) status = 'Casi preparado';
        else if (readiness >= 40) status = 'Buen progreso';
        else if (readiness >= 20) status = 'Aprendiendo';
        document.getElementById('readiness-status').textContent = status;

        // ===== Weekly Activity Graph =====
        this.updateWeeklyGraph();

        // ===== Stats Grid =====
        const vocabPercent = Math.round((this.progress.wordsLearned.length / 150) * 100);
        document.getElementById('stat-vocab').textContent = `${this.progress.wordsLearned.length}/150`;
        document.getElementById('vocab-bar').style.width = `${vocabPercent}%`;

        document.getElementById('stat-exercises').textContent = this.progress.exercisesDone || 0;

        // Calculate accuracy
        const totalAnswers = (this.progress.correctAnswers || 0) + (this.progress.wrongAnswers || 0);
        const accuracy = totalAnswers > 0 ? Math.round((this.progress.correctAnswers / totalAnswers) * 100) : 0;
        document.getElementById('stat-accuracy').textContent = `${accuracy}%`;

        // Study time
        const totalMinutes = this.progress.totalStudyTime || 0;
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        document.getElementById('stat-time').textContent = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

        // ===== Performance by Category =====
        const readingPerf = Math.min(100, Math.round((this.progress.wordsLearned.length / 150) * 100));
        const listeningPerf = Math.min(100, Math.round(((this.progress.listeningPracticed || 0) / 50) * 100));
        const pinyinPerf = Math.min(100, Math.round((this.progress.pinyinPracticed / 50) * 100));
        const grammarPerf = Math.min(100, Math.round((this.progress.grammarPracticed / 30) * 100));

        document.getElementById('perf-reading').style.width = `${readingPerf}%`;
        document.getElementById('perf-reading-val').textContent = `${readingPerf}%`;
        document.getElementById('perf-listening').style.width = `${listeningPerf}%`;
        document.getElementById('perf-listening-val').textContent = `${listeningPerf}%`;
        document.getElementById('perf-pinyin').style.width = `${pinyinPerf}%`;
        document.getElementById('perf-pinyin-val').textContent = `${pinyinPerf}%`;
        document.getElementById('perf-grammar').style.width = `${grammarPerf}%`;
        document.getElementById('perf-grammar-val').textContent = `${grammarPerf}%`;

        // ===== Exam History =====
        const bestScore = this.progress.bestExamScore || 0;
        document.getElementById('best-score').textContent = bestScore > 0 ? `${Math.round(bestScore)}%` : '--';
        document.getElementById('exams-taken').textContent = this.progress.examsTaken || 0;

        // Calculate pass rate
        const passCount = this.progress.examsPassed || 0;
        const totalExams = this.progress.examsTaken || 0;
        const passRate = totalExams > 0 ? Math.round((passCount / totalExams) * 100) : 0;
        document.getElementById('pass-rate').textContent = `${passRate}%`;

        // ===== Summary Section =====
        document.getElementById('modal-streak').textContent = this.progress.streak || 0;
        document.getElementById('modal-total-xp').textContent = this.progress.totalXP || 0;
        document.getElementById('modal-level').textContent = this.progress.level || 1;
    }

    updateWeeklyGraph() {
        // Get weekly activity data from localStorage
        const weekData = this.getWeeklyActivity();
        const maxActivity = Math.max(...weekData, 1);

        const dayBars = document.querySelectorAll('.day-bar .bar-fill');
        dayBars.forEach((bar, idx) => {
            const height = Math.round((weekData[idx] / maxActivity) * 70) + 5; // Min 5% height
            bar.style.height = `${height}%`;
        });
    }

    getWeeklyActivity() {
        // Return activity data for each day of the week (Mon-Sun)
        const activityLog = JSON.parse(localStorage.getItem('hsk1_activity_log') || '{}');
        const today = new Date();
        const weekData = [];

        // Get the Monday of current week
        const dayOfWeek = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            const dateKey = date.toDateString();
            weekData.push(activityLog[dateKey] || 0);
        }

        return weekData;
    }

    trackActivity() {
        // Track daily activity
        const today = new Date().toDateString();
        const activityLog = JSON.parse(localStorage.getItem('hsk1_activity_log') || '{}');
        activityLog[today] = (activityLog[today] || 0) + 1;
        localStorage.setItem('hsk1_activity_log', JSON.stringify(activityLog));

        // Update total study time
        if (!this.progress.totalStudyTime) {
            this.progress.totalStudyTime = 0;
        }
    }

    closeProgressModal() {
        document.getElementById('progress-modal').classList.remove('visible');
    }

    resetProgress() {
        if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
            // Clear all saved data
            localStorage.removeItem('hsk1_progress');
            localStorage.removeItem('hsk1_srs_data');
            localStorage.removeItem('hsk1_daily_goals');
            localStorage.removeItem('hsk1_achievements');
            localStorage.removeItem('hsk1_activity_log');

            // Reload fresh progress
            this.progress = this.loadProgress();
            this.srsData = this.loadSRSData();
            this.dailyGoals = this.createNewDailyGoals(new Date().toDateString());

            this.saveProgress();
            this.updateProgressDisplay();
            this.updateDailyGoalsDisplay();
            this.updateAchievementsDisplay();
            this.closeProgressModal();

            this.showFeedback('correct', 'Progreso reiniciado');
        }
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastStudy = this.progress.lastStudyDate;

        if (lastStudy === today) {
            // Already studied today
        } else if (lastStudy) {
            const lastDate = new Date(lastStudy);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                this.progress.streak++;
            } else if (diffDays > 1) {
                this.progress.streak = 1;
            }
        } else {
            this.progress.streak = 1;
        }

        this.progress.lastStudyDate = today;
        this.saveProgress();

        document.getElementById('streak-count').textContent = this.progress.streak;
    }

    // ===== Daily Word =====
    loadDailyWord() {
        // Use date as seed for consistent daily word
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const wordIndex = dayOfYear % this.vocabulary.length;
        const word = this.vocabulary[wordIndex];

        document.getElementById('daily-hanzi').textContent = word.hanzi;

        // Aplicar color de tono
        const pinyinEl = document.getElementById('daily-pinyin');
        pinyinEl.textContent = word.pinyin;
        pinyinEl.className = `pinyin tone${word.tone || 0}`;

        document.getElementById('daily-meaning').textContent = word.meaning;
    }

    // ===== Quick Actions =====
    handleQuickAction(action) {
        switch (action) {
            case 'quick-vocab':
                this.filteredVocab = this.shuffleArray([...this.vocabulary]).slice(0, 10);
                this.currentCardIndex = 0;
                this.navigateTo('flashcards');
                this.loadFlashcard();
                break;
            case 'quick-pinyin':
                this.navigateTo('pinyin');
                document.querySelector('.pinyin-tab[data-tab="practice"]').click();
                break;
            case 'quick-hanzi':
                this.navigateTo('hanzi');
                document.querySelector('.hanzi-tab[data-tab="practice-hanzi"]').click();
                break;
            case 'mini-exam':
                this.selectedExamType = 'mini';
                this.navigateTo('exam');
                this.startExam();
                break;
        }
    }

    // ===== Flashcards =====
    loadFlashcard() {
        if (this.filteredVocab.length === 0) {
            this.filteredVocab = [...this.vocabulary];
        }

        const word = this.filteredVocab[this.currentCardIndex];
        if (!word) return;

        document.getElementById('card-hanzi').textContent = word.hanzi;

        // Aplicar color de tono al pinyin
        const pinyinEl = document.getElementById('card-pinyin');
        pinyinEl.textContent = word.pinyin;
        pinyinEl.className = `card-pinyin tone${word.tone || 0}`;

        document.getElementById('card-meaning').textContent = word.meaning;

        if (word.example) {
            document.querySelector('.example-cn').textContent = word.example.cn;
            document.querySelector('.example-py').textContent = word.example.py;
            document.querySelector('.example-es').textContent = word.example.es;
        }

        document.getElementById('current-card').textContent = this.currentCardIndex + 1;
        document.getElementById('total-cards').textContent = this.filteredVocab.length;

        // Reset flip state
        this.isCardFlipped = false;
        document.getElementById('flashcard').classList.remove('flipped');
    }

    flipCard() {
        this.isCardFlipped = !this.isCardFlipped;
        document.getElementById('flashcard').classList.toggle('flipped', this.isCardFlipped);
    }

    nextCard() {
        this.currentCardIndex = (this.currentCardIndex + 1) % this.filteredVocab.length;
        this.loadFlashcard();
    }

    markWord(result) {
        const word = this.filteredVocab[this.currentCardIndex];
        const wordId = word.id;

        if (result === 'correct') {
            // Actualizar SRS con calidad 2 (bien)
            this.updateSRS(wordId, 2);

            if (!this.progress.wordsLearned.includes(wordId)) {
                this.progress.wordsLearned.push(wordId);
            }
            this.progress.wordsReviewing = this.progress.wordsReviewing.filter(id => id !== wordId);

            // Gamificación: añadir XP
            this.addXP(this.xpPerCorrect);

            // Mostrar feedback positivo
            this.showFeedback('correct', `+${this.xpPerCorrect} XP`);

            // Animación
            document.getElementById('btn-correct').classList.add('pulse');
            setTimeout(() => document.getElementById('btn-correct').classList.remove('pulse'), 500);

            // Verificar logros
            this.checkAchievements();
        } else {
            // Actualizar SRS con calidad 0 (no lo sé)
            this.updateSRS(wordId, 0);

            if (!this.progress.wordsReviewing.includes(wordId)) {
                this.progress.wordsReviewing.push(wordId);
            }
            this.progress.wordsLearned = this.progress.wordsLearned.filter(id => id !== wordId);

            // Mostrar feedback
            this.showFeedback('wrong', 'Sigue practicando');

            // Animación
            document.getElementById('flashcard').classList.add('shake');
            setTimeout(() => document.getElementById('flashcard').classList.remove('shake'), 300);
        }

        this.progress.exercisesDone++;
        this.saveProgress();
        this.nextCard();
    }

    // Gamificación: añadir puntos de experiencia
    addXP(amount) {
        this.progress.totalXP += amount;

        // Calcular nivel (cada 100 XP = 1 nivel)
        const newLevel = Math.floor(this.progress.totalXP / 100) + 1;
        if (newLevel > this.progress.level) {
            this.progress.level = newLevel;
            this.showLevelUp(newLevel);
        }

        this.saveProgress();
        this.updateXPDisplay();
    }

    // Mostrar feedback visual
    showFeedback(type, message) {
        const existing = document.querySelector('.feedback-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `feedback-toast ${type}`;
        toast.innerHTML = `<span>${message}</span>`;
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            border-radius: 20px;
            font-weight: 600;
            z-index: 1000;
            animation: fadeInOut 1.5s ease forwards;
            background: ${type === 'correct' ? '#4caf50' : '#f44336'};
            color: white;
        `;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 1500);
    }

    // Mostrar mensaje de subida de nivel
    showLevelUp(level) {
        const toast = document.createElement('div');
        toast.className = 'level-up-toast';
        toast.innerHTML = `
            <div style="font-size: 2rem;">🎉</div>
            <div>¡Nivel ${level}!</div>
        `;
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 32px 48px;
            border-radius: 16px;
            font-weight: 700;
            font-size: 1.5rem;
            z-index: 1000;
            background: linear-gradient(135deg, #e53935, #c62828);
            color: white;
            text-align: center;
            animation: scaleIn 0.3s ease;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        `;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    // Verificar y desbloquear logros
    checkAchievements() {
        const achievements = [
            { id: 'first_word', name: 'Primera Palabra', condition: () => this.progress.wordsLearned.length >= 1 },
            { id: 'ten_words', name: '10 Palabras', condition: () => this.progress.wordsLearned.length >= 10 },
            { id: 'fifty_words', name: '50 Palabras', condition: () => this.progress.wordsLearned.length >= 50 },
            { id: 'all_words', name: 'Maestro HSK1', condition: () => this.progress.wordsLearned.length >= 150 },
            { id: 'streak_3', name: 'Racha de 3 días', condition: () => this.progress.streak >= 3 },
            { id: 'streak_7', name: 'Racha Semanal', condition: () => this.progress.streak >= 7 },
            { id: 'first_exam', name: 'Primer Examen', condition: () => this.progress.examsTaken >= 1 },
            { id: 'pass_exam', name: 'Aprobado', condition: () => this.progress.bestScore >= 120 }
        ];

        achievements.forEach(achievement => {
            if (!this.progress.achievements.includes(achievement.id) && achievement.condition()) {
                this.progress.achievements.push(achievement.id);
                this.showAchievement(achievement.name);
            }
        });
    }

    showAchievement(name) {
        const toast = document.createElement('div');
        toast.innerHTML = `<span>🏆 Logro: ${name}</span>`;
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 600;
            z-index: 1000;
            background: #ffd54f;
            color: #333;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    filterVocabulary(filter) {
        switch (filter) {
            case 'all':
                this.filteredVocab = [...this.vocabulary];
                break;
            case 'new':
                this.filteredVocab = this.vocabulary.filter(w =>
                    !this.progress.wordsLearned.includes(w.id) &&
                    !this.progress.wordsReviewing.includes(w.id)
                );
                break;
            case 'learning':
                this.filteredVocab = this.vocabulary.filter(w =>
                    this.progress.wordsReviewing.includes(w.id)
                );
                break;
            case 'mastered':
                this.filteredVocab = this.vocabulary.filter(w =>
                    this.progress.wordsLearned.includes(w.id)
                );
                break;
        }

        if (this.filteredVocab.length === 0) {
            this.filteredVocab = [...this.vocabulary];
        }

        this.currentCardIndex = 0;
        this.loadFlashcard();
    }

    filterByLesson(lesson) {
        if (lesson === 'all') {
            this.filteredVocab = [...this.vocabulary];
        } else {
            this.filteredVocab = this.vocabulary.filter(w => w.lesson === parseInt(lesson));
        }
        this.currentCardIndex = 0;
        this.loadFlashcard();
    }

    // ===== Pinyin Practice =====
    loadTonePractice() {
        const toneWords = TONE_PRACTICE;
        const randomWord = toneWords[Math.floor(Math.random() * toneWords.length)];

        document.getElementById('practice-hanzi').textContent = randomWord.hanzi;
        document.getElementById('tone-feedback').textContent = '';
        document.getElementById('tone-feedback').className = 'practice-feedback';

        // Store correct answer
        this.currentTonePractice = randomWord;

        // Reset option buttons
        document.querySelectorAll('.tone-option').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.disabled = false;
        });

        this.progress.pinyinPracticed++;
        this.saveProgress();
    }

    checkToneAnswer(e) {
        const selectedTone = parseInt(e.target.dataset.tone);
        const correctTone = this.currentTonePractice.tone;
        const feedback = document.getElementById('tone-feedback');

        document.querySelectorAll('.tone-option').forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.dataset.tone) === correctTone) {
                btn.classList.add('correct');
            }
        });

        if (selectedTone === correctTone || (correctTone === 0 && selectedTone === 0)) {
            feedback.textContent = `¡Correcto! ${this.currentTonePractice.hanzi} (${this.currentTonePractice.pinyin}) significa "${this.currentTonePractice.meaning}"`;
            feedback.classList.add('correct');
        } else {
            e.target.classList.add('incorrect');
            feedback.textContent = `Incorrecto. ${this.currentTonePractice.hanzi} es ${this.currentTonePractice.tone === 0 ? 'tono neutro' : `${this.currentTonePractice.tone}º tono`} (${this.currentTonePractice.pinyin})`;
            feedback.classList.add('incorrect');
        }
    }

    // ===== Dictation Mode =====
    loadDictationWord() {
        // Seleccionar palabra aleatoria
        const randomIndex = Math.floor(Math.random() * this.vocabulary.length);
        this.dictationWord = this.vocabulary[randomIndex];

        // Limpiar UI
        const input = document.getElementById('dictation-input');
        const feedback = document.getElementById('dictation-feedback');
        const hintContent = document.getElementById('hint-content');
        const hintArea = document.getElementById('dictation-hint');

        if (input) {
            input.value = '';
            input.focus();
        }
        if (feedback) {
            feedback.textContent = '';
            feedback.className = 'dictation-feedback';
        }
        if (hintContent) {
            hintContent.classList.remove('visible');
        }
        if (hintArea) {
            hintArea.style.display = 'block';
        }

        // Reproducir automáticamente
        setTimeout(() => this.playDictationWord(), 300);
    }

    playDictationWord(rate = 0.8) {
        if (!this.dictationWord) {
            this.loadDictationWord();
            return;
        }

        if ('speechSynthesis' in window) {
            // Cancelar cualquier reproducción anterior
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(this.dictationWord.hanzi);
            utterance.lang = 'zh-CN';
            utterance.rate = rate;
            speechSynthesis.speak(utterance);
        }
    }

    showDictationHint() {
        const hintContent = document.getElementById('hint-content');
        if (!hintContent || !this.dictationWord) return;

        if (this.dictationMode === 'pinyin') {
            // Si piden pinyin, dar pista del significado
            hintContent.innerHTML = `<strong>Significado:</strong> ${this.dictationWord.meaning}`;
        } else {
            // Si piden significado, dar pista del pinyin
            hintContent.innerHTML = `<strong>Pinyin:</strong> ${this.dictationWord.pinyin}`;
        }
        hintContent.classList.add('visible');
    }

    checkDictation() {
        const input = document.getElementById('dictation-input');
        const feedback = document.getElementById('dictation-feedback');

        if (!input || !feedback || !this.dictationWord) return;

        const userAnswer = input.value.trim().toLowerCase();
        let correctAnswer;
        let isCorrect = false;

        if (this.dictationMode === 'pinyin') {
            // Normalizar pinyin (quitar acentos para comparar)
            correctAnswer = this.dictationWord.pinyin.toLowerCase();
            const normalizedCorrect = this.normalizePinyin(correctAnswer);
            const normalizedUser = this.normalizePinyin(userAnswer);
            isCorrect = normalizedUser === normalizedCorrect ||
                        userAnswer === correctAnswer ||
                        userAnswer.replace(/\s+/g, '') === correctAnswer.replace(/\s+/g, '');
        } else {
            // Modo significado
            correctAnswer = this.dictationWord.meaning.toLowerCase();
            isCorrect = userAnswer === correctAnswer ||
                        correctAnswer.includes(userAnswer) ||
                        userAnswer.includes(correctAnswer);
        }

        this.dictationStats.total++;

        if (isCorrect) {
            this.dictationStats.correct++;
            this.dictationStats.streak++;
            feedback.className = 'dictation-feedback correct';
            feedback.innerHTML = `
                <div>¡Correcto! +${10 + this.dictationStats.streak} XP</div>
                <div class="answer-reveal">
                    <span class="hanzi">${this.dictationWord.hanzi}</span>
                    ${this.dictationWord.pinyin} - ${this.dictationWord.meaning}
                </div>
            `;
            this.addXP(10 + this.dictationStats.streak);
        } else {
            this.dictationStats.streak = 0;
            feedback.className = 'dictation-feedback incorrect';
            feedback.innerHTML = `
                <div>Incorrecto. La respuesta era:</div>
                <div class="answer-reveal">
                    <span class="hanzi">${this.dictationWord.hanzi}</span>
                    ${this.dictationWord.pinyin} - ${this.dictationWord.meaning}
                </div>
            `;
        }

        // Actualizar estadísticas
        document.getElementById('dictation-correct').textContent = this.dictationStats.correct;
        document.getElementById('dictation-total').textContent = this.dictationStats.total;
        document.getElementById('dictation-streak').textContent = this.dictationStats.streak;

        // Ocultar pista
        document.getElementById('dictation-hint').style.display = 'none';

        this.progress.exercisesDone++;
        this.saveProgress();
    }

    // Normalizar pinyin quitando marcas de tono
    normalizePinyin(pinyin) {
        const toneMarks = {
            'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
            'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
            'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
            'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
            'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
            'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v', 'ü': 'v'
        };

        return pinyin.split('').map(char => toneMarks[char] || char).join('').replace(/\s+/g, '');
    }

    // ===== Matching Game =====
    startMatchingGame() {
        // Seleccionar 5 palabras aleatorias
        const words = this.shuffleArray([...this.vocabulary]).slice(0, 5);
        this.matchingWords = words;

        // Reset state
        this.matchingState = { selected: null, pairs: 0, errors: 0, timer: null, startTime: Date.now() };

        // Generar columnas
        const leftCol = document.getElementById('matching-left');
        const rightCol = document.getElementById('matching-right');
        const feedback = document.getElementById('matching-feedback');

        leftCol.innerHTML = '';
        rightCol.innerHTML = '';
        feedback.textContent = '';
        feedback.className = 'matching-feedback';

        // Crear items de la izquierda (Hanzi)
        words.forEach((word, idx) => {
            const item = document.createElement('div');
            item.className = 'matching-item left';
            item.textContent = word.hanzi;
            item.dataset.id = word.id;
            item.dataset.index = idx;
            item.addEventListener('click', () => this.selectMatchingItem(item, 'left'));
            leftCol.appendChild(item);
        });

        // Crear items de la derecha (Significados) - mezclados
        const shuffledMeanings = this.shuffleArray([...words]);
        shuffledMeanings.forEach((word, idx) => {
            const item = document.createElement('div');
            item.className = 'matching-item right';
            item.textContent = word.meaning;
            item.dataset.id = word.id;
            item.dataset.index = idx;
            item.addEventListener('click', () => this.selectMatchingItem(item, 'right'));
            rightCol.appendChild(item);
        });

        // Iniciar timer
        this.matchingState.timer = setInterval(() => this.updateMatchingTimer(), 1000);
        this.updateMatchingStats();
    }

    selectMatchingItem(item, side) {
        if (item.classList.contains('correct')) return;

        // Si ya hay uno seleccionado del mismo lado, deseleccionar
        if (this.matchingState.selected && this.matchingState.selected.side === side) {
            this.matchingState.selected.element.classList.remove('selected');
        }

        // Si es el mismo item, deseleccionar
        if (this.matchingState.selected && this.matchingState.selected.element === item) {
            item.classList.remove('selected');
            this.matchingState.selected = null;
            return;
        }

        item.classList.add('selected');

        // Si no hay nada seleccionado, guardar este
        if (!this.matchingState.selected) {
            this.matchingState.selected = { element: item, side, id: item.dataset.id };
            return;
        }

        // Si es del mismo lado, reemplazar selección
        if (this.matchingState.selected.side === side) {
            this.matchingState.selected = { element: item, side, id: item.dataset.id };
            return;
        }

        // Tenemos dos selecciones de lados diferentes - verificar match
        const firstItem = this.matchingState.selected;
        const secondItem = { element: item, side, id: item.dataset.id };

        if (firstItem.id === secondItem.id) {
            // Match correcto!
            firstItem.element.classList.remove('selected');
            firstItem.element.classList.add('correct');
            secondItem.element.classList.remove('selected');
            secondItem.element.classList.add('correct');

            this.matchingState.pairs++;
            this.addXP(5);

            // Verificar si completó el juego
            if (this.matchingState.pairs === 5) {
                clearInterval(this.matchingState.timer);
                const feedback = document.getElementById('matching-feedback');
                const time = Math.floor((Date.now() - this.matchingState.startTime) / 1000);
                feedback.className = 'matching-feedback success';
                feedback.textContent = `¡Completado! Tiempo: ${time}s, Errores: ${this.matchingState.errors}. +25 XP`;
                this.addXP(20);
            }
        } else {
            // Match incorrecto
            firstItem.element.classList.add('incorrect');
            secondItem.element.classList.add('incorrect');
            this.matchingState.errors++;

            setTimeout(() => {
                firstItem.element.classList.remove('selected', 'incorrect');
                secondItem.element.classList.remove('selected', 'incorrect');
            }, 500);
        }

        this.matchingState.selected = null;
        this.updateMatchingStats();
    }

    updateMatchingTimer() {
        const elapsed = Math.floor((Date.now() - this.matchingState.startTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        document.getElementById('matching-time').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    updateMatchingStats() {
        document.getElementById('matching-pairs').textContent = this.matchingState.pairs;
        document.getElementById('matching-errors').textContent = this.matchingState.errors;
    }

    // ===== Sentence Ordering Game =====
    startSentenceGame() {
        // Oraciones del HSK1 para ordenar
        const sentences = [
            { words: ['我', '是', '学生'], meaning: 'Yo soy estudiante', pinyin: 'Wǒ shì xuésheng' },
            { words: ['她', '是', '老师'], meaning: 'Ella es profesora', pinyin: 'Tā shì lǎoshī' },
            { words: ['你', '叫', '什么', '名字'], meaning: '¿Cómo te llamas?', pinyin: 'Nǐ jiào shénme míngzi' },
            { words: ['我', '想', '喝', '茶'], meaning: 'Quiero beber té', pinyin: 'Wǒ xiǎng hē chá' },
            { words: ['他', '在', '医院', '工作'], meaning: 'Él trabaja en el hospital', pinyin: 'Tā zài yīyuàn gōngzuò' },
            { words: ['今天', '天气', '很', '好'], meaning: 'Hoy el clima está muy bueno', pinyin: 'Jīntiān tiānqì hěn hǎo' },
            { words: ['我', '会', '说', '汉语'], meaning: 'Sé hablar chino', pinyin: 'Wǒ huì shuō Hànyǔ' },
            { words: ['现在', '几', '点'], meaning: '¿Qué hora es ahora?', pinyin: 'Xiànzài jǐ diǎn' },
            { words: ['这', '是', '我的', '书'], meaning: 'Este es mi libro', pinyin: 'Zhè shì wǒ de shū' },
            { words: ['你', '吃', '什么'], meaning: '¿Qué comes?', pinyin: 'Nǐ chī shénme' },
            { words: ['我', '去', '学校'], meaning: 'Voy a la escuela', pinyin: 'Wǒ qù xuéxiào' },
            { words: ['她', '买了', '很多', '衣服'], meaning: 'Ella compró mucha ropa', pinyin: 'Tā mǎi le hěn duō yīfu' },
            { words: ['明天', '会', '下雨'], meaning: 'Mañana va a llover', pinyin: 'Míngtiān huì xià yǔ' },
            { words: ['他', '在', '看', '电视', '呢'], meaning: 'Él está viendo televisión', pinyin: 'Tā zài kàn diànshì ne' },
            { words: ['我', '是', '坐', '飞机', '来的'], meaning: 'Vine en avión', pinyin: 'Wǒ shì zuò fēijī lái de' }
        ];

        // Seleccionar oración aleatoria
        const sentence = sentences[Math.floor(Math.random() * sentences.length)];
        this.sentenceState.current = sentence;
        this.sentenceState.answer = [];

        // Mostrar objetivo
        document.getElementById('target-meaning').textContent = sentence.meaning;

        // Mostrar palabras desordenadas
        const wordsContainer = document.getElementById('sentence-words');
        const answerContainer = document.getElementById('sentence-answer');
        const feedback = document.getElementById('sentence-feedback');

        wordsContainer.innerHTML = '';
        answerContainer.innerHTML = '<span style="color: #999; font-size: 0.9rem;">Haz clic en las palabras para ordenarlas</span>';
        answerContainer.classList.remove('has-items');
        feedback.textContent = '';
        feedback.className = 'sentence-feedback';

        // Crear chips de palabras desordenadas
        const shuffledWords = this.shuffleArray([...sentence.words]);
        shuffledWords.forEach((word, idx) => {
            const chip = document.createElement('span');
            chip.className = 'word-chip';
            chip.textContent = word;
            chip.dataset.word = word;
            chip.dataset.index = idx;
            chip.addEventListener('click', () => this.toggleWordInSentence(chip));
            wordsContainer.appendChild(chip);
        });
    }

    toggleWordInSentence(chip) {
        const word = chip.dataset.word;
        const answerContainer = document.getElementById('sentence-answer');
        const wordsContainer = document.getElementById('sentence-words');

        if (chip.classList.contains('in-answer')) {
            // Quitar de la respuesta
            chip.classList.remove('in-answer');
            this.sentenceState.answer = this.sentenceState.answer.filter(w => w !== word);
            wordsContainer.appendChild(chip);
        } else {
            // Agregar a la respuesta
            chip.classList.add('in-answer');
            this.sentenceState.answer.push(word);
            answerContainer.appendChild(chip);
        }

        // Actualizar estilo del contenedor
        if (this.sentenceState.answer.length > 0) {
            answerContainer.classList.add('has-items');
            // Quitar el placeholder
            const placeholder = answerContainer.querySelector('span[style]');
            if (placeholder) placeholder.remove();
        } else {
            answerContainer.classList.remove('has-items');
            answerContainer.innerHTML = '<span style="color: #999; font-size: 0.9rem;">Haz clic en las palabras para ordenarlas</span>';
        }
    }

    clearSentence() {
        const wordsContainer = document.getElementById('sentence-words');
        const answerContainer = document.getElementById('sentence-answer');

        // Mover todos los chips de vuelta
        const chips = answerContainer.querySelectorAll('.word-chip');
        chips.forEach(chip => {
            chip.classList.remove('in-answer');
            wordsContainer.appendChild(chip);
        });

        this.sentenceState.answer = [];
        answerContainer.classList.remove('has-items');
        answerContainer.innerHTML = '<span style="color: #999; font-size: 0.9rem;">Haz clic en las palabras para ordenarlas</span>';
    }

    checkSentence() {
        if (!this.sentenceState.current || this.sentenceState.answer.length === 0) return;

        const correct = this.sentenceState.current.words;
        const answer = this.sentenceState.answer;
        const feedback = document.getElementById('sentence-feedback');

        this.sentenceState.stats.total++;

        const isCorrect = correct.length === answer.length &&
                          correct.every((word, idx) => word === answer[idx]);

        if (isCorrect) {
            this.sentenceState.stats.correct++;
            feedback.className = 'sentence-feedback correct';
            feedback.innerHTML = `¡Correcto! <br><strong>${this.sentenceState.current.pinyin}</strong>`;
            this.addXP(15);

            // Colorear chips de verde
            document.querySelectorAll('#sentence-answer .word-chip').forEach(chip => {
                chip.classList.add('correct');
            });
        } else {
            feedback.className = 'sentence-feedback incorrect';
            feedback.innerHTML = `Incorrecto. La respuesta correcta es:<br><strong>${correct.join(' ')}</strong><br>${this.sentenceState.current.pinyin}`;

            // Colorear chips de rojo
            document.querySelectorAll('#sentence-answer .word-chip').forEach(chip => {
                chip.classList.add('incorrect');
            });
        }

        // Actualizar estadísticas
        document.getElementById('sentence-correct').textContent = this.sentenceState.stats.correct;
        document.getElementById('sentence-total').textContent = this.sentenceState.stats.total;

        this.progress.exercisesDone++;
        this.saveProgress();
    }

    // ===== Conversation Practice =====
    startConversation() {
        // Diálogos basados en el contenido HSK1
        const dialogues = [
            {
                title: 'Saludos',
                messages: [
                    { speaker: 'other', chinese: '你好！', pinyin: 'Nǐ hǎo!', translation: '¡Hola!' },
                    { speaker: 'user', options: [
                        { chinese: '你好！', pinyin: 'Nǐ hǎo!', meaning: '¡Hola!', correct: true },
                        { chinese: '再见！', pinyin: 'Zàijiàn!', meaning: '¡Adiós!', correct: false },
                        { chinese: '谢谢！', pinyin: 'Xièxie!', meaning: '¡Gracias!', correct: false }
                    ]},
                    { speaker: 'other', chinese: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', translation: '¿Cómo te llamas?' },
                    { speaker: 'user', options: [
                        { chinese: '我叫...', pinyin: 'Wǒ jiào...', meaning: 'Me llamo...', correct: true },
                        { chinese: '我是学生。', pinyin: 'Wǒ shì xuésheng.', meaning: 'Soy estudiante.', correct: false },
                        { chinese: '我很好。', pinyin: 'Wǒ hěn hǎo.', meaning: 'Estoy bien.', correct: false }
                    ]}
                ]
            },
            {
                title: 'En el restaurante',
                messages: [
                    { speaker: 'other', chinese: '你想吃什么？', pinyin: 'Nǐ xiǎng chī shénme?', translation: '¿Qué quieres comer?' },
                    { speaker: 'user', options: [
                        { chinese: '我想吃米饭。', pinyin: 'Wǒ xiǎng chī mǐfàn.', meaning: 'Quiero comer arroz.', correct: true },
                        { chinese: '我在医院。', pinyin: 'Wǒ zài yīyuàn.', meaning: 'Estoy en el hospital.', correct: false },
                        { chinese: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', meaning: '¿Qué hora es?', correct: false }
                    ]},
                    { speaker: 'other', chinese: '你想喝什么？', pinyin: 'Nǐ xiǎng hē shénme?', translation: '¿Qué quieres beber?' },
                    { speaker: 'user', options: [
                        { chinese: '我想喝茶。', pinyin: 'Wǒ xiǎng hē chá.', meaning: 'Quiero beber té.', correct: true },
                        { chinese: '我会说汉语。', pinyin: 'Wǒ huì shuō Hànyǔ.', meaning: 'Sé hablar chino.', correct: false },
                        { chinese: '好的，谢谢。', pinyin: 'Hǎo de, xièxie.', meaning: 'Ok, gracias.', correct: false }
                    ]}
                ]
            },
            {
                title: 'Preguntando la hora',
                messages: [
                    { speaker: 'other', chinese: '请问，现在几点？', pinyin: 'Qǐngwèn, xiànzài jǐ diǎn?', translation: 'Disculpa, ¿qué hora es?' },
                    { speaker: 'user', options: [
                        { chinese: '现在十点。', pinyin: 'Xiànzài shí diǎn.', meaning: 'Son las diez.', correct: true },
                        { chinese: '今天星期一。', pinyin: 'Jīntiān xīngqī yī.', meaning: 'Hoy es lunes.', correct: false },
                        { chinese: '我不知道。', pinyin: 'Wǒ bù zhīdào.', meaning: 'No sé.', correct: false }
                    ]},
                    { speaker: 'other', chinese: '谢谢你！', pinyin: 'Xièxie nǐ!', translation: '¡Gracias!' },
                    { speaker: 'user', options: [
                        { chinese: '不客气！', pinyin: 'Bú kèqi!', meaning: '¡De nada!', correct: true },
                        { chinese: '对不起。', pinyin: 'Duìbuqǐ.', meaning: 'Lo siento.', correct: false },
                        { chinese: '再见！', pinyin: 'Zàijiàn!', meaning: '¡Adiós!', correct: false }
                    ]}
                ]
            },
            {
                title: 'El clima',
                messages: [
                    { speaker: 'other', chinese: '今天天气怎么样？', pinyin: 'Jīntiān tiānqì zěnmeyàng?', translation: '¿Cómo está el clima hoy?' },
                    { speaker: 'user', options: [
                        { chinese: '今天很热。', pinyin: 'Jīntiān hěn rè.', meaning: 'Hoy hace mucho calor.', correct: true },
                        { chinese: '我在家。', pinyin: 'Wǒ zài jiā.', meaning: 'Estoy en casa.', correct: false },
                        { chinese: '我叫小明。', pinyin: 'Wǒ jiào Xiǎomíng.', meaning: 'Me llamo Xiaoming.', correct: false }
                    ]},
                    { speaker: 'other', chinese: '明天会下雨吗？', pinyin: 'Míngtiān huì xià yǔ ma?', translation: '¿Lloverá mañana?' },
                    { speaker: 'user', options: [
                        { chinese: '我不知道，可能会下雨。', pinyin: 'Wǒ bù zhīdào, kěnéng huì xià yǔ.', meaning: 'No sé, quizás llueva.', correct: true },
                        { chinese: '今天是星期五。', pinyin: 'Jīntiān shì xīngqī wǔ.', meaning: 'Hoy es viernes.', correct: false },
                        { chinese: '我很高兴。', pinyin: 'Wǒ hěn gāoxìng.', meaning: 'Estoy muy feliz.', correct: false }
                    ]}
                ]
            },
            {
                title: 'En la tienda',
                messages: [
                    { speaker: 'other', chinese: '你好！你想买什么？', pinyin: 'Nǐ hǎo! Nǐ xiǎng mǎi shénme?', translation: '¡Hola! ¿Qué quieres comprar?' },
                    { speaker: 'user', options: [
                        { chinese: '我想买苹果。', pinyin: 'Wǒ xiǎng mǎi píngguǒ.', meaning: 'Quiero comprar manzanas.', correct: true },
                        { chinese: '我是中国人。', pinyin: 'Wǒ shì Zhōngguórén.', meaning: 'Soy chino.', correct: false },
                        { chinese: '我住在北京。', pinyin: 'Wǒ zhù zài Běijīng.', meaning: 'Vivo en Beijing.', correct: false }
                    ]},
                    { speaker: 'other', chinese: '这个多少钱？', pinyin: 'Zhège duōshao qián?', translation: '¿Cuánto cuesta esto?' },
                    { speaker: 'user', options: [
                        { chinese: '十块钱。', pinyin: 'Shí kuài qián.', meaning: 'Diez yuanes.', correct: true },
                        { chinese: '我有三个朋友。', pinyin: 'Wǒ yǒu sān gè péngyou.', meaning: 'Tengo tres amigos.', correct: false },
                        { chinese: '他是我的老师。', pinyin: 'Tā shì wǒ de lǎoshī.', meaning: 'Él es mi profesor.', correct: false }
                    ]}
                ]
            }
        ];

        // Seleccionar diálogo aleatorio
        const dialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
        this.conversationState = { dialogue, step: 0 };

        // Limpiar y mostrar
        const chatMessages = document.getElementById('chat-messages');
        const responseOptions = document.getElementById('response-options');
        chatMessages.innerHTML = '';
        responseOptions.innerHTML = '';

        document.getElementById('conv-current').textContent = '1';
        document.getElementById('conv-total').textContent = Math.ceil(dialogue.messages.length / 2);

        this.showNextConversationStep();
    }

    showNextConversationStep() {
        const { dialogue, step } = this.conversationState;
        if (step >= dialogue.messages.length) {
            // Diálogo completado
            this.showFeedback('correct', '¡Diálogo completado! +20 XP');
            this.addXP(20);
            return;
        }

        const message = dialogue.messages[step];
        const chatMessages = document.getElementById('chat-messages');
        const responseOptions = document.getElementById('response-options');

        if (message.speaker === 'other') {
            // Mostrar mensaje del otro
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble other';
            bubble.innerHTML = `
                <span class="chinese">${message.chinese}</span>
                <span class="pinyin">${message.pinyin}</span>
                <span class="translation">${message.translation}</span>
            `;
            chatMessages.appendChild(bubble);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Avanzar al siguiente paso
            this.conversationState.step++;
            setTimeout(() => this.showNextConversationStep(), 500);
        } else {
            // Mostrar opciones de respuesta
            responseOptions.innerHTML = '';
            message.options.forEach((opt, idx) => {
                const optionBtn = document.createElement('div');
                optionBtn.className = 'response-option';
                optionBtn.innerHTML = `
                    <span class="chinese">${opt.chinese}</span>
                    <span class="meaning">${opt.meaning}</span>
                `;
                optionBtn.addEventListener('click', () => this.selectConversationResponse(opt, optionBtn));
                responseOptions.appendChild(optionBtn);
            });
        }
    }

    selectConversationResponse(option, element) {
        const responseOptions = document.getElementById('response-options');
        const chatMessages = document.getElementById('chat-messages');

        // Deshabilitar todas las opciones
        responseOptions.querySelectorAll('.response-option').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });

        if (option.correct) {
            element.classList.add('correct');

            // Añadir mensaje del usuario al chat
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble user';
            bubble.innerHTML = `
                <span class="chinese">${option.chinese}</span>
                <span class="pinyin">${option.pinyin}</span>
            `;
            chatMessages.appendChild(bubble);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            this.addXP(5);

            // Avanzar
            this.conversationState.step++;
            document.getElementById('conv-current').textContent = Math.ceil(this.conversationState.step / 2);

            setTimeout(() => {
                responseOptions.innerHTML = '';
                this.showNextConversationStep();
            }, 1000);
        } else {
            element.classList.add('incorrect');

            // Mostrar la correcta
            responseOptions.querySelectorAll('.response-option').forEach(opt => {
                const optText = opt.querySelector('.chinese').textContent;
                const correctOpt = this.conversationState.dialogue.messages[this.conversationState.step]
                                      .options.find(o => o.correct);
                if (optText === correctOpt.chinese) {
                    opt.classList.add('correct');
                }
            });

            setTimeout(() => {
                responseOptions.innerHTML = '';
                this.conversationState.step++;
                this.showNextConversationStep();
            }, 2000);
        }

        this.progress.exercisesDone++;
        this.saveProgress();
    }

    // ===== Hanzi Practice =====
    loadHanziPractice() {
        const hanziList = HANZI_PRACTICE;
        const randomHanzi = hanziList[Math.floor(Math.random() * hanziList.length)];

        document.getElementById('practice-char').textContent = randomHanzi.hanzi;
        document.getElementById('practice-char-pinyin').textContent = randomHanzi.pinyin;
        document.getElementById('practice-char-meaning').textContent = '';
        document.getElementById('hanzi-feedback').textContent = '';
        document.getElementById('hanzi-feedback').className = 'hanzi-feedback';

        // Generate options
        const correctMeaning = randomHanzi.meaning;
        const otherMeanings = hanziList
            .filter(h => h.meaning !== correctMeaning)
            .map(h => h.meaning);

        const shuffledOthers = this.shuffleArray(otherMeanings).slice(0, 3);
        const options = this.shuffleArray([correctMeaning, ...shuffledOthers]);

        const optionsContainer = document.getElementById('hanzi-options');
        optionsContainer.innerHTML = '';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'hanzi-option';
            btn.textContent = opt;
            btn.addEventListener('click', (e) => this.checkHanziAnswer(e, correctMeaning));
            optionsContainer.appendChild(btn);
        });

        this.currentHanziPractice = randomHanzi;
        this.progress.hanziPracticed++;
        this.saveProgress();
    }

    checkHanziAnswer(e, correctMeaning) {
        const selected = e.target.textContent;
        const feedback = document.getElementById('hanzi-feedback');
        const char = this.currentHanziPractice;

        document.querySelectorAll('.hanzi-option').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctMeaning) {
                btn.classList.add('correct');
            }
        });

        document.getElementById('practice-char-meaning').textContent = correctMeaning;

        if (selected === correctMeaning) {
            feedback.textContent = `¡Correcto! ${char.hanzi} (${char.pinyin}) = ${char.meaning}`;
            feedback.classList.add('correct');
            feedback.style.background = '#e8f5e9';
            feedback.style.color = '#4caf50';
        } else {
            e.target.classList.add('incorrect');
            feedback.textContent = `Incorrecto. ${char.hanzi} significa "${correctMeaning}"`;
            feedback.classList.add('incorrect');
            feedback.style.background = '#ffebee';
            feedback.style.color = '#f44336';
        }
    }

    // ===== Lessons =====
    renderLessonsGrid() {
        const grid = document.getElementById('lessons-grid');
        grid.innerHTML = '';

        // Find the next recommended lesson
        const completedLessons = this.progress.lessonsCompleted || [];
        const nextLesson = completedLessons.length === 0 ? 1 :
            Math.min(Math.max(...completedLessons) + 1, 15);

        LESSONS_INFO.forEach(lesson => {
            const isCompleted = completedLessons.includes(lesson.num);
            const isRecommended = lesson.num === nextLesson && !isCompleted;
            const card = document.createElement('div');
            card.className = `lesson-card${isRecommended ? ' recommended' : ''}${isCompleted ? ' completed' : ''}`;
            card.innerHTML = `
                ${isRecommended ? '<div class="lesson-badge-recommended">Siguiente</div>' : ''}
                <div class="lesson-num">Lección ${lesson.num}</div>
                <div class="lesson-title">${lesson.title.slice(0, 2)}</div>
                <div class="lesson-subtitle">${lesson.subtitle.slice(0, 15)}...</div>
                ${isCompleted ? '<div class="lesson-status completed">Completada</div>' : ''}
            `;
            card.addEventListener('click', () => this.showLessonDetail(lesson.num));
            grid.appendChild(card);
        });
    }

    showLessonDetail(lessonNum) {
        const lesson = LESSONS_INFO.find(l => l.num === lessonNum);
        const lessonContent = LESSONS_CONTENT.find(l => l.num === lessonNum);
        const vocab = this.vocabulary.filter(w => w.lesson === lessonNum);
        const grammarPoint = lessonContent?.grammar ? GRAMMAR_POINTS.find(g => g.id === lessonContent.grammar) : null;

        document.getElementById('lessons-grid').classList.add('hidden');
        document.getElementById('lesson-detail').classList.remove('hidden');

        const content = document.getElementById('lesson-content');

        // Build the complete lesson HTML
        let html = `
            <div class="lesson-header">
                <h2>Lección ${lesson.num}: ${lesson.title}</h2>
                <p class="lesson-subtitle">${lessonContent?.subtitle || lesson.subtitle}</p>
                <span class="lesson-topic-badge">${lesson.topic}</span>
            </div>

            <!-- Introducción -->
            <div class="lesson-section lesson-intro">
                <h3>📚 Introducción</h3>
                <p>${lessonContent?.introduction || 'Contenido de la lección ' + lessonNum}</p>
            </div>

            <!-- Objetivos de aprendizaje -->
            ${lessonContent?.objectives ? `
            <div class="lesson-section lesson-objectives">
                <h3>🎯 Objetivos de aprendizaje</h3>
                <ul>
                    ${lessonContent.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            <!-- Diálogo -->
            ${lessonContent?.dialogue ? `
            <div class="lesson-section lesson-dialogue">
                <h3>💬 Diálogo: ${lessonContent.dialogue.title}</h3>
                <div class="dialogue-box">
                    ${lessonContent.dialogue.lines.map(line => `
                        <div class="dialogue-line">
                            <span class="speaker">${line.speaker}:</span>
                            <span class="chinese" onclick="app.speakText('${line.cn}')">${line.cn}</span>
                            <span class="pinyin">${line.py}</span>
                            <span class="translation">${line.es}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="btn-audio" onclick="app.playDialogue(${lessonNum})">
                    🔊 Escuchar diálogo completo
                </button>
            </div>
            ` : ''}

            <!-- Puntos clave -->
            ${lessonContent?.keyPoints ? `
            <div class="lesson-section lesson-keypoints">
                <h3>🔑 Puntos clave</h3>
                ${lessonContent.keyPoints.map(kp => `
                    <div class="keypoint-card">
                        <h4>${kp.point}</h4>
                        <p>${kp.explanation}</p>
                    </div>
                `).join('')}
            </div>
            ` : ''}

            <!-- Punto gramatical relacionado -->
            ${grammarPoint ? `
            <div class="lesson-section lesson-grammar">
                <h3>📖 Gramática: ${grammarPoint.name}</h3>
                <div class="grammar-detail">
                    <p><strong>Estructura:</strong> ${grammarPoint.structure}</p>
                    ${grammarPoint.negative ? `<p><strong>Negativo:</strong> ${grammarPoint.negative}</p>` : ''}
                    <div class="grammar-examples">
                        ${grammarPoint.examples.map(ex => `
                            <div class="grammar-example" onclick="app.speakText('${ex.cn}')">
                                <span class="cn">${ex.cn}</span>
                                <span class="py">${ex.py}</span>
                                <span class="es">${ex.es}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            ` : ''}

            <!-- Vocabulario -->
            <div class="lesson-section lesson-vocab">
                <h3>📝 Vocabulario (${vocab.length} palabras)</h3>
                <div class="vocab-grid">
                    ${vocab.map(w => `
                        <div class="vocab-card" onclick="app.speakText('${w.hanzi}')">
                            <span class="vocab-hanzi tone-${w.tone}">${w.hanzi}</span>
                            <span class="vocab-pinyin">${w.pinyin}</span>
                            <span class="vocab-meaning">${w.meaning}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Nota cultural -->
            ${lessonContent?.culturalNote ? `
            <div class="lesson-section lesson-culture">
                <h3>🏮 Nota cultural</h3>
                <p>${lessonContent.culturalNote}</p>
            </div>
            ` : ''}

            <!-- Botones de acción -->
            <div class="lesson-actions">
                <button class="btn-primary" onclick="app.practiceLesson(${lessonNum})">
                    🃏 Practicar Flashcards
                </button>
                <button class="btn-secondary" onclick="app.startLessonQuiz(${lessonNum})">
                    ✏️ Quiz de la Lección
                </button>
            </div>
        `;

        content.innerHTML = html;

        // Scroll to top of content
        content.scrollTop = 0;
    }

    // Play full dialogue audio
    playDialogue(lessonNum) {
        const lessonContent = LESSONS_CONTENT.find(l => l.num === lessonNum);
        if (!lessonContent?.dialogue) return;

        const lines = lessonContent.dialogue.lines;
        let index = 0;

        const playNext = () => {
            if (index < lines.length) {
                this.speakText(lines[index].cn, () => {
                    index++;
                    setTimeout(playNext, 500);
                });
            }
        };

        playNext();
    }

    // Start lesson-specific quiz
    startLessonQuiz(lessonNum) {
        const lessonContent = LESSONS_CONTENT.find(l => l.num === lessonNum);
        if (!lessonContent?.exercises) {
            this.showFeedback('wrong', 'Quiz no disponible para esta lección');
            return;
        }

        this.currentLessonQuiz = {
            lessonNum: lessonNum,
            exercises: [...lessonContent.exercises],
            currentIndex: 0,
            correct: 0,
            total: lessonContent.exercises.length
        };

        this.showLessonQuizQuestion();
    }

    showLessonQuizQuestion() {
        const quiz = this.currentLessonQuiz;
        if (!quiz) return;

        const exercise = quiz.exercises[quiz.currentIndex];
        const content = document.getElementById('lesson-content');

        let html = `
            <div class="lesson-quiz">
                <div class="quiz-header">
                    <h3>Quiz - Lección ${quiz.lessonNum}</h3>
                    <span class="quiz-progress">Pregunta ${quiz.currentIndex + 1} de ${quiz.total}</span>
                </div>

                <div class="quiz-question">
                    <p class="question-text">${exercise.question}</p>
                    ${exercise.type === 'audio' && exercise.audioText ? `
                        <button class="btn-audio-quiz" onclick="app.speakText('${exercise.audioText}')">
                            🔊 Escuchar
                        </button>
                    ` : ''}
                </div>

                <div class="quiz-options">
                    ${exercise.options.map((opt, idx) => `
                        <button class="quiz-option" onclick="app.checkLessonQuizAnswer(${idx})">
                            ${opt}
                        </button>
                    `).join('')}
                </div>

                <button class="btn-back" onclick="app.showLessonDetail(${quiz.lessonNum})">
                    ← Volver a la lección
                </button>
            </div>
        `;

        content.innerHTML = html;
    }

    checkLessonQuizAnswer(selectedIndex) {
        const quiz = this.currentLessonQuiz;
        if (!quiz) return;

        const exercise = quiz.exercises[quiz.currentIndex];
        const isCorrect = selectedIndex === exercise.answer;

        if (isCorrect) {
            quiz.correct++;
            this.addXP(10);
        }

        // Show feedback
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((opt, idx) => {
            opt.disabled = true;
            if (idx === exercise.answer) {
                opt.classList.add('correct');
            } else if (idx === selectedIndex && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });

        // Move to next question after delay
        setTimeout(() => {
            quiz.currentIndex++;
            if (quiz.currentIndex < quiz.total) {
                this.showLessonQuizQuestion();
            } else {
                this.showLessonQuizResults();
            }
        }, 1500);
    }

    showLessonQuizResults() {
        const quiz = this.currentLessonQuiz;
        if (!quiz) return;

        const percentage = Math.round((quiz.correct / quiz.total) * 100);
        const passed = percentage >= 70;

        // Mark lesson as completed if passed
        if (passed && !this.progress.lessonsCompleted.includes(quiz.lessonNum)) {
            this.progress.lessonsCompleted.push(quiz.lessonNum);
            this.addXP(50);
            this.saveProgress();
        }

        const content = document.getElementById('lesson-content');
        content.innerHTML = `
            <div class="quiz-results">
                <h2>${passed ? '🎉 ¡Felicidades!' : '📚 Sigue practicando'}</h2>
                <div class="results-score ${passed ? 'passed' : 'failed'}">
                    <span class="score-number">${quiz.correct}/${quiz.total}</span>
                    <span class="score-percent">${percentage}%</span>
                </div>
                <p class="results-message">
                    ${passed
                        ? '¡Has completado esta lección! Puedes continuar con la siguiente.'
                        : 'Necesitas 70% para completar la lección. Repasa el contenido e inténtalo de nuevo.'}
                </p>
                ${passed ? `<p class="xp-earned">+50 XP ganados</p>` : ''}
                <div class="results-actions">
                    <button class="btn-primary" onclick="app.showLessonDetail(${quiz.lessonNum})">
                        📖 Revisar lección
                    </button>
                    <button class="btn-secondary" onclick="app.startLessonQuiz(${quiz.lessonNum})">
                        🔄 Repetir quiz
                    </button>
                    ${passed && quiz.lessonNum < 15 ? `
                        <button class="btn-success" onclick="app.showLessonDetail(${quiz.lessonNum + 1})">
                            ➡️ Siguiente lección
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        this.currentLessonQuiz = null;
    }

    showLessonsList() {
        document.getElementById('lessons-grid').classList.remove('hidden');
        document.getElementById('lesson-detail').classList.add('hidden');
    }

    practiceLesson(lessonNum) {
        this.filterByLesson(lessonNum.toString());
        this.navigateTo('flashcards');
    }

    // ===== Grammar Practice =====
    startGrammarPractice(grammarId) {
        const grammar = GRAMMAR_POINTS.find(g => g.id === grammarId);
        if (!grammar || !grammar.exercises) {
            this.showFeedback('wrong', 'Ejercicios no disponibles');
            return;
        }

        // Initialize grammar quiz
        this.currentGrammarQuiz = {
            grammarId: grammarId,
            grammarName: grammar.name,
            exercises: [...grammar.exercises],
            currentIndex: 0,
            correct: 0,
            total: grammar.exercises.length
        };

        this.showGrammarQuizModal();
    }

    showGrammarQuizModal() {
        const quiz = this.currentGrammarQuiz;
        if (!quiz) return;

        const exercise = quiz.exercises[quiz.currentIndex];

        // Create modal if it doesn't exist
        let modal = document.getElementById('grammar-quiz-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'grammar-quiz-modal';
            modal.className = 'modal-overlay';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="grammar-quiz-container">
                <div class="grammar-quiz-header">
                    <h3>📖 ${quiz.grammarName}</h3>
                    <span class="quiz-progress-badge">${quiz.currentIndex + 1}/${quiz.total}</span>
                </div>

                <div class="grammar-quiz-question">
                    <p>${exercise.q}</p>
                </div>

                <div class="grammar-quiz-options">
                    ${exercise.opts.map((opt, idx) => `
                        <button class="grammar-option" onclick="app.checkGrammarAnswer(${idx})">
                            ${opt}
                        </button>
                    `).join('')}
                </div>

                <button class="grammar-quiz-close" onclick="app.closeGrammarQuiz()">
                    ✕ Cerrar
                </button>
            </div>
        `;

        modal.classList.add('active');
    }

    checkGrammarAnswer(selectedIndex) {
        const quiz = this.currentGrammarQuiz;
        if (!quiz) return;

        const exercise = quiz.exercises[quiz.currentIndex];
        const isCorrect = selectedIndex === exercise.ans;

        if (isCorrect) {
            quiz.correct++;
            this.addXP(10);
        }

        // Visual feedback
        const options = document.querySelectorAll('.grammar-option');
        options.forEach((opt, idx) => {
            opt.disabled = true;
            if (idx === exercise.ans) {
                opt.classList.add('correct');
            } else if (idx === selectedIndex && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });

        // Next question after delay
        setTimeout(() => {
            quiz.currentIndex++;
            if (quiz.currentIndex < quiz.total) {
                this.showGrammarQuizModal();
            } else {
                this.showGrammarQuizResults();
            }
        }, 1200);
    }

    showGrammarQuizResults() {
        const quiz = this.currentGrammarQuiz;
        if (!quiz) return;

        const percentage = Math.round((quiz.correct / quiz.total) * 100);
        const passed = percentage >= 75;

        if (passed) {
            this.progress.grammarPracticed++;
            this.addXP(25);
            this.saveProgress();
        }

        const modal = document.getElementById('grammar-quiz-modal');
        if (modal) {
            modal.innerHTML = `
                <div class="grammar-quiz-container">
                    <div class="grammar-results">
                        <h2>${passed ? '🎉 ¡Excelente!' : '📚 Sigue practicando'}</h2>
                        <div class="grammar-score ${passed ? 'passed' : 'failed'}">
                            <span class="score-big">${quiz.correct}/${quiz.total}</span>
                            <span class="score-percent">${percentage}%</span>
                        </div>
                        <p>${passed ? '¡Has dominado este punto gramatical!' : 'Necesitas 75% para aprobar. Revisa los ejemplos e inténtalo de nuevo.'}</p>
                        ${passed ? '<p class="xp-bonus">+25 XP</p>' : ''}
                        <div class="grammar-results-btns">
                            <button onclick="app.startGrammarPractice('${quiz.grammarId}')">🔄 Repetir</button>
                            <button onclick="app.closeGrammarQuiz()">✓ Cerrar</button>
                        </div>
                    </div>
                </div>
            `;
        }

        this.currentGrammarQuiz = null;
    }

    closeGrammarQuiz() {
        const modal = document.getElementById('grammar-quiz-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        this.currentGrammarQuiz = null;
    }

    // ===== Exam System - Formato Oficial HSK1 =====
    // El examen HSK1 real tiene:
    // - Comprensión Auditiva (听力): 4 partes, 20 preguntas
    // - Comprensión Lectora (阅读): 4 partes, 20 preguntas
    // - Puntuación total: 200 puntos (100 auditiva + 100 lectura)
    // - Para aprobar: 120 puntos (60%)

    startExam() {
        const examStart = document.getElementById('exam-start');
        const examActive = document.getElementById('exam-active');
        const examResults = document.getElementById('exam-results');

        examStart.classList.add('hidden');
        examResults.classList.add('hidden');
        examActive.classList.remove('hidden');

        // Generate questions based on official format
        this.generateOfficialExamQuestions();
        this.examAnswers = new Array(this.examQuestions.length).fill(null);
        this.examCurrentQuestion = 0;
        this.listeningCorrect = 0;
        this.readingCorrect = 0;

        // Set timer based on type
        switch (this.selectedExamType) {
            case 'full':
                this.examTimeLeft = 40 * 60; // 40 minutos
                break;
            case 'listening':
                this.examTimeLeft = 17 * 60; // ~17 minutos para auditiva
                break;
            case 'reading':
                this.examTimeLeft = 17 * 60; // ~17 minutos para lectura
                break;
            case 'mini':
                this.examTimeLeft = 5 * 60;
                break;
        }

        this.startExamTimer();
        this.loadExamQuestion();
    }

    generateOfficialExamQuestions() {
        this.examQuestions = [];
        const vocab = this.shuffleArray([...this.vocabulary]);

        if (this.selectedExamType === 'mini') {
            // Mini examen: 10 preguntas variadas
            this.generateMiniExamQuestions(vocab);
            return;
        }

        const includeListening = this.selectedExamType === 'full' || this.selectedExamType === 'listening';
        const includeReading = this.selectedExamType === 'full' || this.selectedExamType === 'reading';

        // ===== COMPRENSIÓN AUDITIVA 听力 =====
        if (includeListening) {
            // Parte 1: Verdadero/Falso - Escuchar y verificar si coincide con la imagen/palabra
            this.generateListeningPart1(vocab.slice(0, 5));
            // Parte 2: Escuchar oración, seleccionar imagen/palabra correcta
            this.generateListeningPart2(vocab.slice(5, 10));
            // Parte 3: Escuchar diálogo, elegir respuesta
            this.generateListeningPart3(vocab.slice(10, 15));
            // Parte 4: Escuchar pregunta y respuesta, verificar coherencia
            this.generateListeningPart4(vocab.slice(15, 20));
        }

        // ===== COMPRENSIÓN LECTORA 阅读 =====
        if (includeReading) {
            // Parte 1: Emparejar palabra con significado
            this.generateReadingPart1(vocab.slice(20, 25));
            // Parte 2: Emparejar oración con significado/contexto
            this.generateReadingPart2(vocab.slice(25, 30));
            // Parte 3: Preguntas y respuestas - emparejar
            this.generateReadingPart3(vocab.slice(30, 35));
            // Parte 4: Completar oraciones (fill in the blank)
            this.generateReadingPart4(vocab.slice(35, 40));
        }
    }

    // ===== LISTENING PARTS =====
    generateListeningPart1(words) {
        // Parte 1: Verdadero/Falso - ¿La palabra mostrada coincide con lo que escuchas?
        words.forEach((word, idx) => {
            const showCorrect = Math.random() > 0.4;
            const displayWord = showCorrect ? word : this.getRandomDifferentWord(word);

            this.examQuestions.push({
                section: 'listening',
                part: 1,
                partName: '听力 第一部分',
                partDesc: 'Escucha el audio y decide si coincide con la palabra mostrada',
                type: 'true_false',
                word: word,
                displayWord: displayWord,
                question: `¿La palabra escuchada coincide con "${displayWord.hanzi}" (${displayWord.meaning})?`,
                hasAudio: true,
                audioText: word.hanzi,
                options: ['✓ Verdadero', '✗ Falso'],
                correctAnswer: showCorrect ? 0 : 1
            });
        });
    }

    generateListeningPart2(words) {
        // Parte 2: Escucha y elige la palabra/imagen correcta
        words.forEach(word => {
            const options = this.generateOptionsObjects(word, 3);
            const correctIdx = options.findIndex(o => o.hanzi === word.hanzi);

            this.examQuestions.push({
                section: 'listening',
                part: 2,
                partName: '听力 第二部分',
                partDesc: 'Escucha el audio y selecciona la palabra correcta',
                type: 'listen_select',
                word: word,
                question: 'Escucha y selecciona la palabra que escuchas:',
                hasAudio: true,
                audioText: word.hanzi,
                options: options.map(o => `${o.hanzi} (${o.meaning})`),
                correctAnswer: correctIdx
            });
        });
    }

    generateListeningPart3(words) {
        // Parte 3: Escucha un diálogo corto y responde
        const dialogues = [
            { q: '你好吗？', a: '我很好，谢谢。', context: 'saludo' },
            { q: '你叫什么名字？', a: '我叫...', context: 'nombre' },
            { q: '你是哪国人？', a: '我是...人。', context: 'nacionalidad' },
            { q: '你在哪儿工作？', a: '我在...工作。', context: 'trabajo' },
            { q: '现在几点？', a: '现在...点。', context: 'hora' }
        ];

        words.forEach((word, idx) => {
            const dialogue = dialogues[idx % dialogues.length];
            const correctResponse = this.getResponseForContext(dialogue.context, word);
            const wrongResponses = this.getWrongResponses(dialogue.context, word);

            const options = this.shuffleArray([correctResponse, ...wrongResponses]);
            const correctIdx = options.indexOf(correctResponse);

            this.examQuestions.push({
                section: 'listening',
                part: 3,
                partName: '听力 第三部分',
                partDesc: 'Escucha el diálogo y selecciona la respuesta apropiada',
                type: 'dialogue',
                word: word,
                dialogue: dialogue,
                question: `Pregunta: "${dialogue.q}"`,
                hasAudio: true,
                audioText: dialogue.q,
                options: options,
                correctAnswer: correctIdx
            });
        });
    }

    generateListeningPart4(words) {
        // Parte 4: Escucha pregunta y respuesta, ¿son coherentes?
        words.forEach(word => {
            const isCoherent = Math.random() > 0.4;
            const qa = this.generateQAPair(word, isCoherent);

            this.examQuestions.push({
                section: 'listening',
                part: 4,
                partName: '听力 第四部分',
                partDesc: 'Escucha la pregunta y respuesta. ¿Son coherentes?',
                type: 'coherence',
                word: word,
                question: `Pregunta: "${qa.question}"\nRespuesta: "${qa.answer}"`,
                hasAudio: true,
                audioText: `${qa.question} ${qa.answer}`,
                options: ['✓ Coherente', '✗ Incoherente'],
                correctAnswer: isCoherent ? 0 : 1
            });
        });
    }

    // ===== READING PARTS =====
    generateReadingPart1(words) {
        // Parte 1: Emparejar carácter con significado
        words.forEach(word => {
            const options = this.generateOptions(word, 'meaning');

            this.examQuestions.push({
                section: 'reading',
                part: 1,
                partName: '阅读 第一部分',
                partDesc: 'Relaciona el carácter chino con su significado',
                type: 'match_meaning',
                word: word,
                question: `¿Qué significa "${word.hanzi}"?`,
                hasAudio: false,
                options: options,
                correctAnswer: options.indexOf(word.meaning)
            });
        });
    }

    generateReadingPart2(words) {
        // Parte 2: Leer oración y seleccionar significado
        words.forEach(word => {
            const sentence = word.example ? word.example.cn : `我喜欢${word.hanzi}。`;
            const correctMeaning = word.example ? word.example.es : `Me gusta ${word.meaning}.`;
            const wrongMeanings = this.generateWrongSentenceMeanings(word);

            const options = this.shuffleArray([correctMeaning, ...wrongMeanings]);

            this.examQuestions.push({
                section: 'reading',
                part: 2,
                partName: '阅读 第二部分',
                partDesc: 'Lee la oración y selecciona su significado',
                type: 'sentence_meaning',
                word: word,
                question: `¿Qué significa esta oración?\n"${sentence}"`,
                hasAudio: false,
                options: options,
                correctAnswer: options.indexOf(correctMeaning)
            });
        });
    }

    generateReadingPart3(words) {
        // Parte 3: Emparejar pregunta con respuesta
        const qaPatterns = [
            { q: '你好吗？', a: '我很好，谢谢。' },
            { q: '你叫什么名字？', a: '我叫小明。' },
            { q: '你是学生吗？', a: '是，我是学生。' },
            { q: '你喜欢什么？', a: '我喜欢看书。' },
            { q: '今天天气怎么样？', a: '今天天气很好。' }
        ];

        words.forEach((word, idx) => {
            const pattern = qaPatterns[idx % qaPatterns.length];
            const wrongAnswers = qaPatterns
                .filter((_, i) => i !== idx % qaPatterns.length)
                .map(p => p.a)
                .slice(0, 3);

            const options = this.shuffleArray([pattern.a, ...wrongAnswers]);

            this.examQuestions.push({
                section: 'reading',
                part: 3,
                partName: '阅读 第三部分',
                partDesc: 'Selecciona la respuesta apropiada para la pregunta',
                type: 'qa_match',
                word: word,
                question: `Pregunta: "${pattern.q}"\n¿Cuál es la respuesta correcta?`,
                hasAudio: false,
                options: options,
                correctAnswer: options.indexOf(pattern.a)
            });
        });
    }

    generateReadingPart4(words) {
        // Parte 4: Completar oración (fill in the blank)
        words.forEach(word => {
            let sentence, blankSentence;

            if (word.example) {
                sentence = word.example.cn;
                blankSentence = sentence.replace(word.hanzi, '______');
            } else {
                sentence = `我想学${word.hanzi}。`;
                blankSentence = `我想学______。`;
            }

            const options = this.generateOptions(word, 'hanzi');

            this.examQuestions.push({
                section: 'reading',
                part: 4,
                partName: '阅读 第四部分',
                partDesc: 'Completa la oración con la palabra correcta',
                type: 'fill_blank',
                word: word,
                question: `Completa la oración:\n"${blankSentence}"`,
                hasAudio: false,
                options: options,
                correctAnswer: options.indexOf(word.hanzi)
            });
        });
    }

    // ===== MINI EXAM =====
    generateMiniExamQuestions(vocab) {
        const words = vocab.slice(0, 10);
        const types = ['meaning', 'pinyin', 'hanzi', 'true_false'];

        words.forEach((word, idx) => {
            const type = types[idx % types.length];
            let question = {
                section: 'mixed',
                part: 0,
                partName: 'Mini Examen',
                partDesc: 'Examen rápido de práctica',
                word: word,
                hasAudio: type === 'true_false'
            };

            switch (type) {
                case 'meaning':
                    question.type = 'match_meaning';
                    question.question = `¿Qué significa "${word.hanzi}" (${word.pinyin})?`;
                    question.options = this.generateOptions(word, 'meaning');
                    question.correctAnswer = question.options.indexOf(word.meaning);
                    break;
                case 'pinyin':
                    question.type = 'select_pinyin';
                    question.question = `¿Cuál es el pinyin correcto de "${word.hanzi}"?`;
                    question.options = this.generateOptions(word, 'pinyin');
                    question.correctAnswer = question.options.indexOf(word.pinyin);
                    break;
                case 'hanzi':
                    question.type = 'select_hanzi';
                    question.question = `¿Cuál es el carácter para "${word.meaning}"?`;
                    question.options = this.generateOptions(word, 'hanzi');
                    question.correctAnswer = question.options.indexOf(word.hanzi);
                    break;
                case 'true_false':
                    const showCorrect = Math.random() > 0.5;
                    const displayWord = showCorrect ? word : this.getRandomDifferentWord(word);
                    question.type = 'true_false';
                    question.displayWord = displayWord;
                    question.audioText = word.hanzi;
                    question.question = `Escucha. ¿Coincide con "${displayWord.hanzi}" (${displayWord.meaning})?`;
                    question.options = ['✓ Sí', '✗ No'];
                    question.correctAnswer = showCorrect ? 0 : 1;
                    break;
            }

            this.examQuestions.push(question);
        });
    }

    // ===== HELPER FUNCTIONS =====
    getRandomDifferentWord(currentWord) {
        const others = this.vocabulary.filter(w => w.hanzi !== currentWord.hanzi);
        return others[Math.floor(Math.random() * others.length)];
    }

    generateOptionsObjects(word, count) {
        const others = this.vocabulary
            .filter(w => w.hanzi !== word.hanzi)
            .sort(() => Math.random() - 0.5)
            .slice(0, count);
        return this.shuffleArray([word, ...others]);
    }

    getResponseForContext(context, word) {
        const responses = {
            'saludo': '我很好，谢谢。',
            'nombre': `我叫${word.hanzi.charAt(0) || '小明'}。`,
            'nacionalidad': '我是中国人。',
            'trabajo': '我在学校工作。',
            'hora': '现在三点。'
        };
        return responses[context] || '好的。';
    }

    getWrongResponses(context, word) {
        const allResponses = [
            '我很好，谢谢。',
            '我叫小明。',
            '我是学生。',
            '我在家。',
            '现在八点。',
            '我不知道。',
            '好的，再见。'
        ];
        const correct = this.getResponseForContext(context, word);
        return allResponses.filter(r => r !== correct).slice(0, 3);
    }

    generateQAPair(word, isCoherent) {
        const coherentPairs = [
            { question: '你好吗？', answer: '我很好，谢谢。' },
            { question: '你是学生吗？', answer: '是的，我是学生。' },
            { question: '你叫什么？', answer: '我叫小明。' },
            { question: '现在几点？', answer: '现在三点。' },
            { question: '你喜欢吃什么？', answer: '我喜欢吃米饭。' }
        ];

        const incoherentPairs = [
            { question: '你好吗？', answer: '我叫小明。' },
            { question: '你是学生吗？', answer: '现在八点。' },
            { question: '你叫什么？', answer: '我很好。' },
            { question: '现在几点？', answer: '我是中国人。' },
            { question: '你喜欢吃什么？', answer: '我在学校。' }
        ];

        const pairs = isCoherent ? coherentPairs : incoherentPairs;
        return pairs[Math.floor(Math.random() * pairs.length)];
    }

    generateWrongSentenceMeanings(word) {
        const wrongPatterns = [
            `No me gusta ${word.meaning}.`,
            `Él necesita ${word.meaning}.`,
            `¿Dónde está ${word.meaning}?`
        ];
        return wrongPatterns;
    }

    generateOptions(word, field) {
        const correctValue = word[field];
        const otherValues = this.vocabulary
            .filter(w => w[field] !== correctValue)
            .map(w => w[field]);

        const shuffledOthers = this.shuffleArray(otherValues).slice(0, 3);
        return this.shuffleArray([correctValue, ...shuffledOthers]);
    }

    // ===== QUESTION DISPLAY =====
    loadExamQuestion() {
        const question = this.examQuestions[this.examCurrentQuestion];
        const container = document.getElementById('exam-question-container');

        // Build question HTML with section header
        let html = `
            <div class="exam-question">
                <div class="exam-section-header">
                    <span class="section-name">${question.partName}</span>
                    <span class="section-desc">${question.partDesc}</span>
                </div>
        `;

        // Add audio button for listening questions
        if (question.hasAudio) {
            html += `
                <div class="exam-audio-section">
                    <button class="exam-audio-btn" onclick="app.playExamAudio('${question.audioText}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                        Escuchar Audio
                    </button>
                    <span class="audio-hint">Haz clic para escuchar (puedes repetir)</span>
                </div>
            `;
        }

        html += `
                <div class="question-number">Pregunta ${this.examCurrentQuestion + 1} de ${this.examQuestions.length}</div>
                <p class="question-text">${question.question.replace(/\n/g, '<br>')}</p>
                <div class="exam-options">
                    ${question.options.map((opt, idx) => `
                        <button class="exam-option ${this.examAnswers[this.examCurrentQuestion] === idx ? 'selected' : ''}"
                                data-index="${idx}">
                            ${String.fromCharCode(65 + idx)}. ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Add click handlers for options
        container.querySelectorAll('.exam-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                container.querySelectorAll('.exam-option').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.examAnswers[this.examCurrentQuestion] = parseInt(e.target.dataset.index);
            });
        });

        // Auto-play audio for listening questions
        if (question.hasAudio && question.section === 'listening') {
            setTimeout(() => this.playExamAudio(question.audioText), 500);
        }

        // Update navigation
        document.getElementById('exam-question-num').textContent = this.examCurrentQuestion + 1;
        document.getElementById('exam-total-questions').textContent = this.examQuestions.length;
        document.getElementById('exam-prev').disabled = this.examCurrentQuestion === 0;
        document.getElementById('exam-next').textContent =
            this.examCurrentQuestion === this.examQuestions.length - 1 ? 'Terminar Examen' : 'Siguiente';
    }

    playExamAudio(text) {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.8;

            // Visual feedback
            const audioBtn = document.querySelector('.exam-audio-btn');
            if (audioBtn) {
                audioBtn.classList.add('playing');
                utterance.onend = () => audioBtn.classList.remove('playing');
            }

            speechSynthesis.speak(utterance);
        }
    }

    examPrevQuestion() {
        if (this.examCurrentQuestion > 0) {
            this.examCurrentQuestion--;
            this.loadExamQuestion();
        }
    }

    examNextQuestion() {
        if (this.examCurrentQuestion < this.examQuestions.length - 1) {
            this.examCurrentQuestion++;
            this.loadExamQuestion();
        } else {
            this.finishExam();
        }
    }

    startExamTimer() {
        this.updateTimerDisplay();
        this.examTimer = setInterval(() => {
            this.examTimeLeft--;
            this.updateTimerDisplay();
            if (this.examTimeLeft <= 0) {
                this.finishExam();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.examTimeLeft / 60);
        const seconds = this.examTimeLeft % 60;
        const timerEl = document.getElementById('exam-timer');
        timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Visual warnings
        if (this.examTimeLeft <= 60) {
            timerEl.style.color = '#f44336';
            timerEl.style.animation = 'pulse 1s infinite';
        } else if (this.examTimeLeft <= 300) {
            timerEl.style.color = '#ff9800';
        }
    }

    finishExam() {
        clearInterval(this.examTimer);

        // Calculate scores by section
        let listeningCorrect = 0;
        let listeningTotal = 0;
        let readingCorrect = 0;
        let readingTotal = 0;

        this.examQuestions.forEach((q, idx) => {
            const isCorrect = this.examAnswers[idx] === q.correctAnswer;

            if (q.section === 'listening') {
                listeningTotal++;
                if (isCorrect) listeningCorrect++;
            } else if (q.section === 'reading') {
                readingTotal++;
                if (isCorrect) readingCorrect++;
            } else {
                // Mini exam - split evenly
                if (idx < this.examQuestions.length / 2) {
                    listeningTotal++;
                    if (isCorrect) listeningCorrect++;
                } else {
                    readingTotal++;
                    if (isCorrect) readingCorrect++;
                }
            }
        });

        const totalCorrect = listeningCorrect + readingCorrect;
        const totalQuestions = this.examQuestions.length;

        // Calculate official score (200 points max for full exam)
        const maxScore = this.selectedExamType === 'full' ? 200 :
                        this.selectedExamType === 'mini' ? 50 : 100;

        const listeningScore = listeningTotal > 0 ?
            Math.round((listeningCorrect / listeningTotal) * (maxScore / 2)) : 0;
        const readingScore = readingTotal > 0 ?
            Math.round((readingCorrect / readingTotal) * (maxScore / 2)) : 0;
        const totalScore = listeningScore + readingScore;

        const passingScore = maxScore * 0.6;
        const passed = totalScore >= passingScore;
        const percentage = Math.round((totalCorrect / totalQuestions) * 100);

        // Update progress
        this.progress.examsTaken = (this.progress.examsTaken || 0) + 1;
        const normalizedScore = (totalScore / maxScore) * 100;
        if (normalizedScore > (this.progress.bestExamScore || 0)) {
            this.progress.bestExamScore = normalizedScore;
        }
        this.updateDailyGoals('exercises', 1);
        this.saveProgress();
        this.checkAchievements();

        // Show results
        document.getElementById('exam-active').classList.add('hidden');
        document.getElementById('exam-results').classList.remove('hidden');

        document.getElementById('final-score').textContent = totalScore;
        document.querySelector('.score-max').textContent = `/ ${maxScore}`;

        const scoreCircle = document.getElementById('score-circle');
        scoreCircle.classList.remove('passed', 'failed');
        scoreCircle.classList.add(passed ? 'passed' : 'failed');

        const resultStatus = document.getElementById('result-status');
        if (passed) {
            resultStatus.innerHTML = `
                <span class="result-icon">🎉</span>
                <span>¡Aprobado! 通过了！</span>
                <span class="result-percentage">${percentage}% correcto</span>
            `;
            resultStatus.className = 'result-status passed';
            this.addXP(50);
        } else {
            resultStatus.innerHTML = `
                <span class="result-icon">📚</span>
                <span>Sigue practicando</span>
                <span class="result-percentage">${percentage}% correcto - Necesitas ${Math.round(passingScore)} puntos</span>
            `;
            resultStatus.className = 'result-status failed';
            this.addXP(20);
        }

        document.getElementById('listening-score').textContent =
            `${listeningScore}/${maxScore/2} (${listeningCorrect}/${listeningTotal} correctas)`;
        document.getElementById('reading-score').textContent =
            `${readingScore}/${maxScore/2} (${readingCorrect}/${readingTotal} correctas)`;
    }

    resetExam() {
        document.getElementById('exam-results').classList.add('hidden');
        document.getElementById('exam-start').classList.remove('hidden');
        document.getElementById('exam-timer').style.color = '';
        document.getElementById('exam-timer').style.animation = '';
    }

    reviewExamAnswers() {
        const container = document.getElementById('exam-results');

        let reviewHTML = `
            <div class="exam-review">
                <h3>Revisión de Respuestas</h3>
                <button class="back-to-results-btn" onclick="app.showExamResults()">← Volver a Resultados</button>
                <div class="review-questions">
        `;

        this.examQuestions.forEach((q, idx) => {
            const userAnswer = this.examAnswers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            const userAnswerText = userAnswer !== null ? q.options[userAnswer] : 'Sin responder';
            const correctAnswerText = q.options[q.correctAnswer];

            reviewHTML += `
                <div class="review-question ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="review-header">
                        <span class="review-num">${idx + 1}</span>
                        <span class="review-section">${q.partName}</span>
                        <span class="review-status">${isCorrect ? '✓' : '✗'}</span>
                    </div>
                    <p class="review-text">${q.question.replace(/\n/g, '<br>')}</p>
                    <div class="review-answers">
                        <div class="your-answer ${isCorrect ? 'correct' : 'wrong'}">
                            <strong>Tu respuesta:</strong> ${userAnswerText}
                        </div>
                        ${!isCorrect ? `
                            <div class="correct-answer">
                                <strong>Respuesta correcta:</strong> ${correctAnswerText}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        reviewHTML += `
                </div>
            </div>
        `;

        container.innerHTML = reviewHTML;
    }

    showExamResults() {
        this.finishExam();
    }

    // ===== Audio =====
    playAudio(word) {
        // Using Web Speech API for TTS
        if ('speechSynthesis' in window) {
            // Visual feedback - show audio is playing
            const audioBtn = document.querySelector('.audio-btn');
            if (audioBtn) {
                audioBtn.classList.add('playing');
            }

            // Cancel any ongoing speech
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(word.hanzi);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.8;

            utterance.onend = () => {
                if (audioBtn) {
                    audioBtn.classList.remove('playing');
                }
            };

            utterance.onerror = () => {
                if (audioBtn) {
                    audioBtn.classList.remove('playing');
                }
            };

            speechSynthesis.speak(utterance);
        }
    }

    // Speak any Chinese text with optional callback
    speakText(text, callback) {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.8;

            if (callback) {
                utterance.onend = callback;
            }

            speechSynthesis.speak(utterance);
        }
    }

    playToneExample(tone) {
        const examples = {
            '1': '妈',
            '2': '麻',
            '3': '马',
            '4': '骂'
        };
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(examples[tone]);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
        }
    }

    playPinyinSound(pinyin) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(pinyin);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
        }
    }

    // ===== Reconocimiento de Voz para Pronunciación =====
    initSpeechRecognition() {
        // Verificar soporte de Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.log('Reconocimiento de voz no soportado en este navegador');
            this.speechRecognitionSupported = false;
            return;
        }

        this.speechRecognitionSupported = true;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'zh-CN'; // Chino mandarín
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 3;
        this.recognition.continuous = false;

        this.recognition.onresult = (event) => this.handleSpeechResult(event);
        this.recognition.onerror = (event) => this.handleSpeechError(event);
        this.recognition.onend = () => this.handleSpeechEnd();

        this.isListening = false;
        this.currentPronunciationWord = null;

        // Añadir botón de micrófono a las flashcards si está soportado
        this.addMicButtonToFlashcards();
    }

    addMicButtonToFlashcards() {
        if (!this.speechRecognitionSupported) return;

        const flashcardFront = document.querySelector('.flashcard-front');
        if (!flashcardFront || document.getElementById('mic-btn')) return;

        const micBtn = document.createElement('button');
        micBtn.id = 'mic-btn';
        micBtn.className = 'mic-btn';
        micBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
        `;
        micBtn.title = 'Practicar pronunciación';
        micBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.startPronunciationPractice();
        });

        flashcardFront.appendChild(micBtn);

        // También añadir área de feedback de pronunciación
        const feedbackArea = document.createElement('div');
        feedbackArea.id = 'pronunciation-feedback';
        feedbackArea.className = 'pronunciation-feedback';
        feedbackArea.style.display = 'none';
        flashcardFront.appendChild(feedbackArea);
    }

    startPronunciationPractice() {
        if (!this.speechRecognitionSupported) {
            this.showFeedback('wrong', 'Tu navegador no soporta reconocimiento de voz');
            return;
        }

        const word = this.filteredVocab[this.currentCardIndex];
        if (!word) return;

        this.currentPronunciationWord = word;

        // Primero reproducir el audio para que el usuario escuche
        this.playAudio(word);

        // Mostrar instrucciones
        const feedbackEl = document.getElementById('pronunciation-feedback');
        if (feedbackEl) {
            feedbackEl.style.display = 'block';
            feedbackEl.innerHTML = `
                <div class="pronunciation-status listening">
                    <span class="pulse-dot"></span>
                    Escucha y repite: <strong>${word.hanzi}</strong>
                </div>
            `;
        }

        // Iniciar reconocimiento después de que termine el TTS
        setTimeout(() => {
            this.startListening();
        }, 1500);
    }

    startListening() {
        if (this.isListening) return;

        try {
            this.recognition.start();
            this.isListening = true;

            const micBtn = document.getElementById('mic-btn');
            if (micBtn) micBtn.classList.add('listening');

            const feedbackEl = document.getElementById('pronunciation-feedback');
            if (feedbackEl) {
                feedbackEl.innerHTML = `
                    <div class="pronunciation-status listening">
                        <span class="pulse-dot"></span>
                        Escuchando... Di: <strong>${this.currentPronunciationWord.hanzi}</strong>
                    </div>
                `;
            }
        } catch (e) {
            console.error('Error iniciando reconocimiento:', e);
            this.isListening = false;
        }
    }

    stopListening() {
        if (!this.isListening) return;

        try {
            this.recognition.stop();
        } catch (e) {
            console.error('Error deteniendo reconocimiento:', e);
        }
        this.isListening = false;

        const micBtn = document.getElementById('mic-btn');
        if (micBtn) micBtn.classList.remove('listening');
    }

    handleSpeechResult(event) {
        const results = event.results[event.results.length - 1];
        const transcript = results[0].transcript.trim();
        const confidence = results[0].confidence;
        const isFinal = results.isFinal;

        const feedbackEl = document.getElementById('pronunciation-feedback');

        if (!isFinal) {
            // Mostrar resultado parcial
            if (feedbackEl) {
                feedbackEl.innerHTML = `
                    <div class="pronunciation-status processing">
                        Escuchando: "${transcript}"...
                    </div>
                `;
            }
            return;
        }

        // Resultado final - evaluar pronunciación
        this.evaluatePronunciation(transcript, confidence);
    }

    evaluatePronunciation(transcript, confidence) {
        const expected = this.currentPronunciationWord.hanzi;
        const feedbackEl = document.getElementById('pronunciation-feedback');

        // Verificar si coincide (puede haber variaciones)
        const isCorrect = transcript.includes(expected) ||
                          expected.includes(transcript) ||
                          this.similarityScore(transcript, expected) > 0.6;

        if (isCorrect) {
            // Pronunciación correcta
            if (feedbackEl) {
                feedbackEl.innerHTML = `
                    <div class="pronunciation-status correct">
                        <span class="check-icon">✓</span>
                        ¡Excelente! "${transcript}"
                        <div class="confidence">Confianza: ${Math.round(confidence * 100)}%</div>
                    </div>
                `;
            }
            this.addXP(5); // Bonus XP por practicar pronunciación
            this.showFeedback('correct', '+5 XP Pronunciación');
        } else {
            // Pronunciación incorrecta
            if (feedbackEl) {
                feedbackEl.innerHTML = `
                    <div class="pronunciation-status incorrect">
                        <span class="x-icon">✗</span>
                        Dijiste: "${transcript}"
                        <div class="expected">Esperado: ${expected} (${this.currentPronunciationWord.pinyin})</div>
                        <button class="retry-pronunciation-btn" onclick="app.startPronunciationPractice()">
                            Intentar de nuevo
                        </button>
                    </div>
                `;
            }
        }

        // Ocultar después de unos segundos
        setTimeout(() => {
            if (feedbackEl) feedbackEl.style.display = 'none';
        }, 4000);
    }

    // Calcular similitud entre dos strings (algoritmo simple)
    similarityScore(str1, str2) {
        const s1 = str1.toLowerCase();
        const s2 = str2.toLowerCase();

        if (s1 === s2) return 1;
        if (s1.length === 0 || s2.length === 0) return 0;

        let matches = 0;
        const shorter = s1.length < s2.length ? s1 : s2;
        const longer = s1.length < s2.length ? s2 : s1;

        for (let char of shorter) {
            if (longer.includes(char)) matches++;
        }

        return matches / longer.length;
    }

    handleSpeechError(event) {
        console.error('Error de reconocimiento:', event.error);
        const feedbackEl = document.getElementById('pronunciation-feedback');

        let message = 'Error de reconocimiento';
        switch (event.error) {
            case 'no-speech':
                message = 'No se detectó voz. Intenta de nuevo.';
                break;
            case 'audio-capture':
                message = 'No se encontró micrófono.';
                break;
            case 'not-allowed':
                message = 'Permiso de micrófono denegado.';
                break;
            case 'network':
                message = 'Error de red. Verifica tu conexión.';
                break;
        }

        if (feedbackEl) {
            feedbackEl.innerHTML = `
                <div class="pronunciation-status error">
                    ${message}
                    <button class="retry-pronunciation-btn" onclick="app.startPronunciationPractice()">
                        Intentar de nuevo
                    </button>
                </div>
            `;
        }

        this.stopListening();
    }

    handleSpeechEnd() {
        this.isListening = false;
        const micBtn = document.getElementById('mic-btn');
        if (micBtn) micBtn.classList.remove('listening');
    }

    // ===== Study Techniques =====

    initTechniques() {
        // Pomodoro Timer
        this.pomodoroTime = 25 * 60; // 25 minutes
        this.pomodoroRunning = false;
        this.pomodoroInterval = null;
        this.pomodorosToday = parseInt(localStorage.getItem('hsk1_pomodoros_today') || '0');

        document.getElementById('pomodoro-count').textContent = this.pomodorosToday;

        document.getElementById('pomodoro-start').addEventListener('click', () => this.startPomodoro());
        document.getElementById('pomodoro-pause').addEventListener('click', () => this.pausePomodoro());
        document.getElementById('pomodoro-reset').addEventListener('click', () => this.resetPomodoro());

        // Technique cards click handlers
        document.querySelectorAll('.technique-card.clickable').forEach(card => {
            card.addEventListener('click', () => {
                const technique = card.dataset.technique;
                this.openTechniquePractice(technique);
            });
        });

        // Tone Pairs
        document.getElementById('listen-tone-pair').addEventListener('click', () => this.playCurrentTonePair());
        document.getElementById('next-tone-pair').addEventListener('click', () => this.loadNextTonePair());
        document.querySelectorAll('.tone-pair-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkTonePairAnswer(e.target));
        });

        // Shadowing
        document.getElementById('shadowing-play').addEventListener('click', () => this.playShadowing(0.9));
        document.getElementById('shadowing-slow').addEventListener('click', () => this.playShadowing(0.5));
        document.getElementById('shadowing-record').addEventListener('click', () => this.startShadowingRecord());
        document.getElementById('next-shadowing').addEventListener('click', () => this.loadNextShadowing());

        // Error Review
        document.getElementById('next-error').addEventListener('click', () => this.loadNextErrorWord());

        // Speed Reading
        document.getElementById('start-speed').addEventListener('click', () => this.startSpeedReading());

        // Mnemonics
        document.getElementById('next-mnemonic').addEventListener('click', () => this.loadNextMnemonic());

        // Active Recall
        document.getElementById('recall-submit').addEventListener('click', () => this.checkRecallAnswer());
        document.getElementById('recall-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkRecallAnswer();
        });
        document.getElementById('next-recall').addEventListener('click', () => this.loadNextRecall());
        document.querySelectorAll('.recall-mode').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.recall-mode').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.recallMode = e.target.dataset.mode;
                this.loadNextRecall();
            });
        });

        this.recallMode = 'pinyin';
        this.toneStats = { correct: 0, wrong: 0 };
        this.speedStats = { correct: 0, streak: 0, best: 0 };
    }

    // ===== Pomodoro Timer =====
    startPomodoro() {
        if (this.pomodoroRunning) return;

        this.pomodoroRunning = true;
        document.getElementById('pomodoro-start').disabled = true;
        document.getElementById('pomodoro-pause').disabled = false;
        document.getElementById('pomodoro-status').textContent = '¡Enfócate en estudiar!';

        const totalTime = 25 * 60;
        this.pomodoroInterval = setInterval(() => {
            this.pomodoroTime--;
            this.updatePomodoroDisplay();

            // Update progress bar
            const progress = ((totalTime - this.pomodoroTime) / totalTime) * 100;
            document.getElementById('pomodoro-bar').style.width = `${progress}%`;

            if (this.pomodoroTime <= 0) {
                this.completePomodoro();
            }
        }, 1000);
    }

    pausePomodoro() {
        this.pomodoroRunning = false;
        clearInterval(this.pomodoroInterval);
        document.getElementById('pomodoro-start').disabled = false;
        document.getElementById('pomodoro-pause').disabled = true;
        document.getElementById('pomodoro-status').textContent = 'Pausado';
    }

    resetPomodoro() {
        this.pausePomodoro();
        this.pomodoroTime = 25 * 60;
        this.updatePomodoroDisplay();
        document.getElementById('pomodoro-bar').style.width = '0%';
        document.getElementById('pomodoro-status').textContent = 'Listo para empezar';
    }

    updatePomodoroDisplay() {
        const mins = Math.floor(this.pomodoroTime / 60);
        const secs = this.pomodoroTime % 60;
        document.getElementById('pomodoro-display').textContent =
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    completePomodoro() {
        this.pausePomodoro();
        this.pomodorosToday++;
        localStorage.setItem('hsk1_pomodoros_today', this.pomodorosToday.toString());
        document.getElementById('pomodoro-count').textContent = this.pomodorosToday;

        // Update study time
        this.progress.totalStudyTime = (this.progress.totalStudyTime || 0) + 25;
        this.saveProgress();

        this.addXP(25); // Bonus XP for completing a pomodoro
        this.showFeedback('correct', '🍅 ¡Pomodoro completado! +25 XP. Toma un descanso de 5 minutos.');

        document.getElementById('pomodoro-status').textContent = '¡Completado! Toma un descanso.';
        this.pomodoroTime = 25 * 60;

        // Play notification sound
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('休息一下');
            utterance.lang = 'zh-CN';
            speechSynthesis.speak(utterance);
        }
    }

    // ===== Technique Practice =====
    openTechniquePractice(technique) {
        // Hide technique grid and show practice area
        document.querySelector('.techniques-grid').style.display = 'none';
        document.querySelector('.pomodoro-card').style.display = 'none';
        document.querySelector('.study-tips-section').style.display = 'none';

        // Hide all practice areas first
        document.querySelectorAll('.technique-practice').forEach(el => el.classList.add('hidden'));

        // Show the selected practice
        const practiceEl = document.getElementById(`${technique}-practice`);
        if (practiceEl) {
            practiceEl.classList.remove('hidden');

            // Initialize the technique
            switch (technique) {
                case 'tone-pairs':
                    this.loadNextTonePair();
                    break;
                case 'shadowing':
                    this.loadNextShadowing();
                    break;
                case 'error-review':
                    this.loadErrorReview();
                    break;
                case 'speed-reading':
                    this.initSpeedReading();
                    break;
                case 'mnemonics':
                    this.loadNextMnemonic();
                    break;
                case 'active-recall':
                    this.loadNextRecall();
                    break;
            }
        }
    }

    closeTechniquePractice() {
        document.querySelectorAll('.technique-practice').forEach(el => el.classList.add('hidden'));
        document.querySelector('.techniques-grid').style.display = 'grid';
        document.querySelector('.pomodoro-card').style.display = 'block';
        document.querySelector('.study-tips-section').style.display = 'block';

        // Stop any running speed reading
        if (this.speedInterval) {
            clearInterval(this.speedInterval);
            this.speedRunning = false;
        }
    }

    // ===== Tone Pairs Drill =====
    loadNextTonePair() {
        // Tone pair combinations that are commonly confused
        const tonePairs = [
            { word: '你好', pinyin: 'nǐ hǎo', tones: '3-3', actual: '2-3' }, // Tone sandhi: 3+3 = 2+3
            { word: '老师', pinyin: 'lǎo shī', tones: '3-1', actual: '3-1' },
            { word: '学生', pinyin: 'xué sheng', tones: '2-5', actual: '2-5' },
            { word: '中国', pinyin: 'zhōng guó', tones: '1-2', actual: '1-2' },
            { word: '谢谢', pinyin: 'xiè xiè', tones: '4-4', actual: '4-4' },
            { word: '朋友', pinyin: 'péng you', tones: '2-5', actual: '2-5' },
            { word: '工作', pinyin: 'gōng zuò', tones: '1-4', actual: '1-4' },
            { word: '医生', pinyin: 'yī shēng', tones: '1-1', actual: '1-1' },
            { word: '学习', pinyin: 'xué xí', tones: '2-2', actual: '2-2' },
            { word: '可以', pinyin: 'kě yǐ', tones: '3-3', actual: '2-3' }
        ];

        this.currentTonePair = tonePairs[Math.floor(Math.random() * tonePairs.length)];

        document.getElementById('tone-pair-word').textContent = this.currentTonePair.word;
        document.getElementById('tone-pair-pinyin').textContent = this.currentTonePair.pinyin;
        document.getElementById('tone-pair-feedback').textContent = '';
        document.getElementById('tone-pair-feedback').className = 'technique-feedback';

        // Reset option buttons
        document.querySelectorAll('.tone-pair-option').forEach(btn => {
            btn.classList.remove('selected', 'correct', 'wrong');
            btn.disabled = false;
        });
    }

    playCurrentTonePair() {
        if ('speechSynthesis' in window && this.currentTonePair) {
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(this.currentTonePair.word);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
        }
    }

    checkTonePairAnswer(button) {
        const selectedTones = button.dataset.tones;
        const correct = selectedTones === this.currentTonePair.actual;

        // Disable all buttons
        document.querySelectorAll('.tone-pair-option').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.tones === this.currentTonePair.actual) {
                btn.classList.add('correct');
            }
        });

        if (correct) {
            button.classList.add('correct');
            this.toneStats.correct++;
            document.getElementById('tone-pair-feedback').textContent = '¡Correcto! Buen oído para los tonos.';
            document.getElementById('tone-pair-feedback').className = 'technique-feedback correct';
            this.addXP(5);
        } else {
            button.classList.add('wrong');
            this.toneStats.wrong++;
            document.getElementById('tone-pair-feedback').textContent =
                `Incorrecto. La combinación correcta es ${this.currentTonePair.actual}`;
            document.getElementById('tone-pair-feedback').className = 'technique-feedback wrong';
        }

        // Update stats
        document.getElementById('tone-correct').textContent = this.toneStats.correct;
        document.getElementById('tone-wrong').textContent = this.toneStats.wrong;
        const total = this.toneStats.correct + this.toneStats.wrong;
        const accuracy = total > 0 ? Math.round((this.toneStats.correct / total) * 100) : 0;
        document.getElementById('tone-accuracy').textContent = `${accuracy}%`;
    }

    // ===== Shadowing Practice =====
    loadNextShadowing() {
        const sentences = [
            { cn: '我是学生。', pinyin: 'Wǒ shì xuésheng.', es: 'Soy estudiante.' },
            { cn: '你好吗？', pinyin: 'Nǐ hǎo ma?', es: '¿Cómo estás?' },
            { cn: '我很好，谢谢。', pinyin: 'Wǒ hěn hǎo, xièxiè.', es: 'Estoy bien, gracias.' },
            { cn: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', es: '¿Cómo te llamas?' },
            { cn: '我喜欢学习中文。', pinyin: 'Wǒ xǐhuān xuéxí zhōngwén.', es: 'Me gusta aprender chino.' },
            { cn: '今天天气很好。', pinyin: 'Jīntiān tiānqì hěn hǎo.', es: 'Hoy hace buen tiempo.' },
            { cn: '我想喝水。', pinyin: 'Wǒ xiǎng hē shuǐ.', es: 'Quiero beber agua.' },
            { cn: '你是中国人吗？', pinyin: 'Nǐ shì Zhōngguó rén ma?', es: '¿Eres chino?' },
            { cn: '请再说一遍。', pinyin: 'Qǐng zài shuō yī biàn.', es: 'Por favor, repite.' },
            { cn: '我不明白。', pinyin: 'Wǒ bù míngbai.', es: 'No entiendo.' }
        ];

        this.currentShadowing = sentences[Math.floor(Math.random() * sentences.length)];

        document.getElementById('shadowing-sentence').textContent = this.currentShadowing.cn;
        document.getElementById('shadowing-pinyin').textContent = this.currentShadowing.pinyin;
        document.getElementById('shadowing-meaning').textContent = this.currentShadowing.es;
        document.getElementById('shadowing-feedback').textContent = '';
    }

    playShadowing(rate) {
        if ('speechSynthesis' in window && this.currentShadowing) {
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(this.currentShadowing.cn);
            utterance.lang = 'zh-CN';
            utterance.rate = rate;
            speechSynthesis.speak(utterance);

            this.progress.listeningPracticed = (this.progress.listeningPracticed || 0) + 1;
            this.saveProgress();
        }
    }

    startShadowingRecord() {
        if (this.speechRecognitionSupported && this.currentShadowing) {
            this.currentPronunciationWord = { hanzi: this.currentShadowing.cn };

            document.getElementById('shadowing-feedback').innerHTML = `
                <div class="pronunciation-status listening">
                    <span class="pulse-dot"></span>
                    Escuchando... Repite: "${this.currentShadowing.cn}"
                </div>
            `;

            this.startListening();
        } else {
            document.getElementById('shadowing-feedback').textContent = 'Tu navegador no soporta grabación de voz.';
        }
    }

    // ===== Error Review =====
    loadErrorReview() {
        // Get words with errors from SRS data
        this.errorWords = [];
        for (const [wordId, data] of Object.entries(this.srsData)) {
            if (data.errors && data.errors > 0) {
                const word = this.vocabulary.find(w => w.id === parseInt(wordId));
                if (word) {
                    this.errorWords.push({ ...word, errorCount: data.errors });
                }
            }
        }

        // Sort by error count (most errors first)
        this.errorWords.sort((a, b) => b.errorCount - a.errorCount);

        document.getElementById('difficult-count').textContent = this.errorWords.length;

        if (this.errorWords.length === 0) {
            document.getElementById('error-word-display').classList.add('hidden');
            document.querySelector('.error-question').classList.add('hidden');
            document.getElementById('error-options').classList.add('hidden');
            document.getElementById('next-error').classList.add('hidden');
            document.getElementById('no-errors').classList.remove('hidden');
        } else {
            document.getElementById('error-word-display').classList.remove('hidden');
            document.querySelector('.error-question').classList.remove('hidden');
            document.getElementById('error-options').classList.remove('hidden');
            document.getElementById('next-error').classList.remove('hidden');
            document.getElementById('no-errors').classList.add('hidden');
            this.loadNextErrorWord();
        }
    }

    loadNextErrorWord() {
        if (this.errorWords.length === 0) {
            this.loadErrorReview();
            return;
        }

        this.currentErrorWord = this.errorWords[Math.floor(Math.random() * this.errorWords.length)];

        document.getElementById('error-hanzi').textContent = this.currentErrorWord.hanzi;
        document.getElementById('error-pinyin').textContent = this.currentErrorWord.pinyin;
        document.getElementById('error-attempts').textContent = this.currentErrorWord.errorCount;
        document.getElementById('error-feedback').textContent = '';
        document.getElementById('error-feedback').className = 'technique-feedback';

        // Generate options
        const options = this.generateOptions(this.currentErrorWord, 'meaning');
        const optionsContainer = document.getElementById('error-options');
        optionsContainer.innerHTML = options.map((opt, idx) => `
            <button class="error-option" data-answer="${opt}">${String.fromCharCode(65 + idx)}. ${opt}</button>
        `).join('');

        // Add click handlers
        optionsContainer.querySelectorAll('.error-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkErrorAnswer(e.target));
        });
    }

    checkErrorAnswer(button) {
        const selected = button.dataset.answer;
        const correct = selected === this.currentErrorWord.meaning;

        document.querySelectorAll('.error-option').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.answer === this.currentErrorWord.meaning) {
                btn.style.background = 'rgba(76, 175, 80, 0.2)';
                btn.style.borderColor = 'var(--success)';
            }
        });

        if (correct) {
            button.style.background = 'rgba(76, 175, 80, 0.2)';
            button.style.borderColor = 'var(--success)';
            document.getElementById('error-feedback').textContent = '¡Correcto! Estás mejorando.';
            document.getElementById('error-feedback').className = 'technique-feedback correct';

            // Reduce error count
            if (this.srsData[this.currentErrorWord.id]) {
                this.srsData[this.currentErrorWord.id].errors =
                    Math.max(0, this.srsData[this.currentErrorWord.id].errors - 1);
                this.saveSRSData();
            }
            this.addXP(8);
        } else {
            button.style.background = 'rgba(244, 67, 54, 0.2)';
            button.style.borderColor = 'var(--error)';
            document.getElementById('error-feedback').textContent =
                `Incorrecto. ${this.currentErrorWord.hanzi} significa "${this.currentErrorWord.meaning}"`;
            document.getElementById('error-feedback').className = 'technique-feedback wrong';
        }
    }

    // ===== Speed Reading =====
    initSpeedReading() {
        this.speedRunning = false;
        this.speedStats = { correct: 0, streak: 0, best: 0 };
        document.getElementById('speed-correct').textContent = '0';
        document.getElementById('speed-streak').textContent = '0';
        document.getElementById('speed-best').textContent = '0';
        document.getElementById('speed-word').textContent = '准备好';
        document.getElementById('speed-timer-fill').style.width = '100%';
        document.getElementById('start-speed').textContent = '▶ Comenzar';
    }

    startSpeedReading() {
        if (this.speedRunning) {
            // Stop
            this.speedRunning = false;
            clearInterval(this.speedInterval);
            document.getElementById('start-speed').textContent = '▶ Comenzar';
            return;
        }

        this.speedRunning = true;
        document.getElementById('start-speed').textContent = '⏹ Detener';
        this.loadSpeedWord();
    }

    loadSpeedWord() {
        if (!this.speedRunning) return;

        const word = this.vocabulary[Math.floor(Math.random() * this.vocabulary.length)];
        this.currentSpeedWord = word;

        document.getElementById('speed-word').textContent = word.hanzi;
        document.getElementById('speed-feedback').textContent = '';
        document.getElementById('speed-feedback').className = 'technique-feedback';

        // Generate options
        const options = this.generateOptions(word, 'meaning');
        const optionsContainer = document.getElementById('speed-options');
        optionsContainer.innerHTML = options.map(opt => `
            <button class="speed-option" data-answer="${opt}">${opt}</button>
        `).join('');

        optionsContainer.querySelectorAll('.speed-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkSpeedAnswer(e.target));
        });

        // Start timer
        const duration = parseInt(document.getElementById('speed-level').value);
        document.getElementById('speed-timer-fill').style.transition = 'none';
        document.getElementById('speed-timer-fill').style.width = '100%';

        setTimeout(() => {
            document.getElementById('speed-timer-fill').style.transition = `width ${duration}ms linear`;
            document.getElementById('speed-timer-fill').style.width = '0%';
        }, 50);

        // Auto-fail if time runs out
        this.speedTimeout = setTimeout(() => {
            if (this.speedRunning) {
                this.speedStats.streak = 0;
                document.getElementById('speed-streak').textContent = '0';
                document.getElementById('speed-feedback').textContent = '¡Tiempo! La respuesta era: ' + this.currentSpeedWord.meaning;
                document.getElementById('speed-feedback').className = 'technique-feedback wrong';

                setTimeout(() => this.loadSpeedWord(), 1500);
            }
        }, duration);
    }

    checkSpeedAnswer(button) {
        clearTimeout(this.speedTimeout);

        const selected = button.dataset.answer;
        const correct = selected === this.currentSpeedWord.meaning;

        if (correct) {
            this.speedStats.correct++;
            this.speedStats.streak++;
            if (this.speedStats.streak > this.speedStats.best) {
                this.speedStats.best = this.speedStats.streak;
            }
            document.getElementById('speed-feedback').textContent = '¡Correcto!';
            document.getElementById('speed-feedback').className = 'technique-feedback correct';
            this.addXP(3);
        } else {
            this.speedStats.streak = 0;
            document.getElementById('speed-feedback').textContent = `Incorrecto. Era: ${this.currentSpeedWord.meaning}`;
            document.getElementById('speed-feedback').className = 'technique-feedback wrong';
        }

        document.getElementById('speed-correct').textContent = this.speedStats.correct;
        document.getElementById('speed-streak').textContent = this.speedStats.streak;
        document.getElementById('speed-best').textContent = this.speedStats.best;

        setTimeout(() => this.loadSpeedWord(), 1000);
    }

    // ===== Mnemonics =====
    loadNextMnemonic() {
        // Tone colors for visual memory (research-backed technique)
        const toneColors = {
            1: { color: '#3498db', name: 'azul', desc: 'Tono 1 (ˉ) - Plano y tranquilo como el cielo' },
            2: { color: '#f1c40f', name: 'amarillo', desc: 'Tono 2 (ˊ) - Ascendente como el sol' },
            3: { color: '#e74c3c', name: 'rojo', desc: 'Tono 3 (ˇ) - Baja y sube, intenso' },
            4: { color: '#2c3e50', name: 'negro', desc: 'Tono 4 (ˋ) - Cae fuerte como la noche' },
            5: { color: '#95a5a6', name: 'gris', desc: 'Tono neutro - Suave y ligero' }
        };

        // Extended mnemonics database for HSK1 characters with visual associations
        const mnemonics = [
            {
                char: '好', pinyin: 'hǎo', meaning: 'bueno', tone: 3,
                components: [
                    { char: '女', meaning: 'mujer' },
                    { char: '子', meaning: 'hijo' }
                ],
                story: 'Una <strong>mujer</strong> (女) con su <strong>hijo</strong> (子) = algo <strong>bueno</strong> (好)',
                visual: 'Imagina a una madre abrazando a su hijo con amor',
                loci: 'Coloca esta imagen en la puerta de tu casa'
            },
            {
                char: '明', pinyin: 'míng', meaning: 'brillante', tone: 2,
                components: [
                    { char: '日', meaning: 'sol' },
                    { char: '月', meaning: 'luna' }
                ],
                story: 'El <strong>sol</strong> (日) y la <strong>luna</strong> (月) juntos = <strong>brillante</strong> (明)',
                visual: 'Un eclipse donde se ven sol y luna a la vez, brillando',
                loci: 'Coloca esta imagen en tu ventana'
            },
            {
                char: '休', pinyin: 'xiū', meaning: 'descansar', tone: 1,
                components: [
                    { char: '亻', meaning: 'persona' },
                    { char: '木', meaning: 'árbol' }
                ],
                story: 'Una <strong>persona</strong> (亻) junto a un <strong>árbol</strong> (木) = <strong>descansando</strong> (休)',
                visual: 'Un hombre durmiendo la siesta bajo la sombra de un árbol',
                loci: 'Coloca esta imagen en tu sofá'
            },
            {
                char: '看', pinyin: 'kàn', meaning: 'ver/mirar', tone: 4,
                components: [
                    { char: '手', meaning: 'mano' },
                    { char: '目', meaning: 'ojo' }
                ],
                story: 'Poner la <strong>mano</strong> (手) sobre el <strong>ojo</strong> (目) para <strong>ver</strong> (看) mejor',
                visual: 'Un explorador con la mano en la frente mirando al horizonte',
                loci: 'Coloca esta imagen en tu TV'
            },
            {
                char: '听', pinyin: 'tīng', meaning: 'escuchar', tone: 1,
                components: [
                    { char: '口', meaning: 'boca' },
                    { char: '斤', meaning: 'hacha' }
                ],
                story: 'La <strong>boca</strong> (口) habla, el oído <strong>escucha</strong> (听) atentamente',
                visual: 'Una persona inclinando la oreja hacia alguien que habla',
                loci: 'Coloca esta imagen junto a tu teléfono'
            },
            {
                char: '想', pinyin: 'xiǎng', meaning: 'pensar/querer', tone: 3,
                components: [
                    { char: '相', meaning: 'mutuo' },
                    { char: '心', meaning: 'corazón' }
                ],
                story: 'El <strong>corazón</strong> (心) reflexiona mutuamente = <strong>pensar</strong> (想)',
                visual: 'Una persona con una burbuja de pensamiento sobre su cabeza',
                loci: 'Coloca esta imagen en tu escritorio'
            },
            {
                char: '学', pinyin: 'xué', meaning: 'aprender', tone: 2,
                components: [
                    { char: '⺍', meaning: 'manos buscando' },
                    { char: '子', meaning: 'niño' }
                ],
                story: 'Un <strong>niño</strong> (子) buscando conocimiento con sus <strong>manos</strong> = <strong>aprender</strong> (学)',
                visual: 'Un estudiante con las manos en un libro, descubriendo',
                loci: 'Coloca esta imagen en tu librero'
            },
            {
                char: '吃', pinyin: 'chī', meaning: 'comer', tone: 1,
                components: [
                    { char: '口', meaning: 'boca' },
                    { char: '乞', meaning: 'pedir' }
                ],
                story: 'La <strong>boca</strong> (口) pide comida = <strong>comer</strong> (吃)',
                visual: 'Una boca grande masticando un delicioso plato',
                loci: 'Coloca esta imagen en tu cocina'
            },
            {
                char: '喝', pinyin: 'hē', meaning: 'beber', tone: 1,
                components: [
                    { char: '口', meaning: 'boca' },
                    { char: '曷', meaning: 'por qué' }
                ],
                story: 'La <strong>boca</strong> (口) pregunta "¿por qué?" porque tiene sed = <strong>beber</strong> (喝)',
                visual: 'Una persona bebiendo un vaso de agua fresca',
                loci: 'Coloca esta imagen junto a tu refrigerador'
            },
            {
                char: '说', pinyin: 'shuō', meaning: 'hablar/decir', tone: 1,
                components: [
                    { char: '讠', meaning: 'palabra' },
                    { char: '兑', meaning: 'intercambiar' }
                ],
                story: 'Intercambiar <strong>palabras</strong> (讠) = <strong>hablar</strong> (说)',
                visual: 'Dos personas conversando animadamente con burbujas de diálogo',
                loci: 'Coloca esta imagen en tu sala de estar'
            },
            {
                char: '读', pinyin: 'dú', meaning: 'leer', tone: 2,
                components: [
                    { char: '讠', meaning: 'palabra' },
                    { char: '卖', meaning: 'vender' }
                ],
                story: 'Comprar y absorber <strong>palabras</strong> = <strong>leer</strong> (读)',
                visual: 'Una persona absorta en un libro interesante',
                loci: 'Coloca esta imagen en tu cama'
            },
            {
                char: '写', pinyin: 'xiě', meaning: 'escribir', tone: 3,
                components: [
                    { char: '冖', meaning: 'techo' },
                    { char: '与', meaning: 'dar' }
                ],
                story: 'Dar tus ideas bajo un techo = <strong>escribir</strong> (写)',
                visual: 'Una mano sosteniendo un pincel, trazando caracteres',
                loci: 'Coloca esta imagen en tu mesa de estudio'
            },
            {
                char: '爱', pinyin: 'ài', meaning: 'amar', tone: 4,
                components: [
                    { char: '爫', meaning: 'garra/mano' },
                    { char: '心', meaning: 'corazón' },
                    { char: '友', meaning: 'amigo' }
                ],
                story: 'Una <strong>mano</strong> sostiene el <strong>corazón</strong> de un <strong>amigo</strong> = <strong>amar</strong> (爱)',
                visual: 'Un corazón rojo brillante entre dos manos protectoras',
                loci: 'Coloca esta imagen en tu corazón (centro de tu casa)'
            },
            {
                char: '买', pinyin: 'mǎi', meaning: 'comprar', tone: 3,
                components: [
                    { char: '乛', meaning: 'gancho' },
                    { char: '头', meaning: 'cabeza' }
                ],
                story: 'Usar la cabeza para conseguir cosas = <strong>comprar</strong> (买)',
                visual: 'Una persona en una tienda eligiendo productos',
                loci: 'Coloca esta imagen en tu cartera'
            },
            {
                char: '住', pinyin: 'zhù', meaning: 'vivir', tone: 4,
                components: [
                    { char: '亻', meaning: 'persona' },
                    { char: '主', meaning: 'dueño/principal' }
                ],
                story: 'Una <strong>persona</strong> que es <strong>dueña</strong> de un lugar = <strong>vivir</strong> (住)',
                visual: 'Una casa acogedora con una persona adentro',
                loci: 'Coloca esta imagen en la entrada de tu casa'
            }
        ];

        this.currentMnemonic = mnemonics[Math.floor(Math.random() * mnemonics.length)];

        // Get tone color
        const toneInfo = toneColors[this.currentMnemonic.tone] || toneColors[5];

        document.getElementById('mnemonic-char').textContent = this.currentMnemonic.char;
        document.getElementById('mnemonic-char').style.color = toneInfo.color;
        document.getElementById('mnemonic-pinyin').textContent = this.currentMnemonic.pinyin;
        document.getElementById('mnemonic-meaning').textContent = this.currentMnemonic.meaning;

        // Render components
        const componentsEl = document.getElementById('mnemonic-components');
        componentsEl.innerHTML = this.currentMnemonic.components.map((comp, idx) => `
            <div class="component">
                <span class="comp-char">${comp.char}</span>
                <span class="comp-meaning">${comp.meaning}</span>
            </div>
            ${idx < this.currentMnemonic.components.length - 1 ? '<span class="comp-plus">+</span>' : ''}
        `).join('');

        // Build the enhanced story with all memory techniques
        let storyHTML = `
            <h4>💡 Historia para recordar:</h4>
            <p>"${this.currentMnemonic.story}"</p>
        `;

        // Add visual association if available
        if (this.currentMnemonic.visual) {
            storyHTML += `
                <div class="visual-association">
                    <h4>🎨 Asociación Visual:</h4>
                    <p>${this.currentMnemonic.visual}</p>
                </div>
            `;
        }

        // Add method of loci if available
        if (this.currentMnemonic.loci) {
            storyHTML += `
                <div class="loci-hint">
                    <h4>🏠 Método de Loci (Palacio de Memoria):</h4>
                    <p>${this.currentMnemonic.loci}</p>
                </div>
            `;
        }

        // Add tone color hint
        storyHTML += `
            <div class="tone-color-hint" style="border-left-color: ${toneInfo.color}">
                <h4>🎨 Color del Tono:</h4>
                <p><span class="tone-badge" style="background: ${toneInfo.color}">${toneInfo.name}</span> ${toneInfo.desc}</p>
            </div>
        `;

        document.getElementById('mnemonic-story').innerHTML = storyHTML;

        // Generate quiz options
        const allMeanings = mnemonics.map(m => m.meaning);
        const otherMeanings = allMeanings.filter(m => m !== this.currentMnemonic.meaning);
        const shuffledOthers = this.shuffleArray(otherMeanings).slice(0, 3);
        const options = this.shuffleArray([this.currentMnemonic.meaning, ...shuffledOthers]);

        const optionsEl = document.getElementById('mnemonic-options');
        optionsEl.innerHTML = options.map(opt => `
            <button data-answer="${opt}">${opt}</button>
        `).join('');

        optionsEl.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkMnemonicAnswer(e.target));
        });

        document.getElementById('mnemonic-feedback').textContent = '';
        document.getElementById('mnemonic-feedback').className = 'technique-feedback';
    }

    checkMnemonicAnswer(button) {
        const selected = button.dataset.answer;
        const correct = selected === this.currentMnemonic.meaning;

        document.querySelectorAll('#mnemonic-options button').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.answer === this.currentMnemonic.meaning) {
                btn.style.background = 'rgba(76, 175, 80, 0.2)';
                btn.style.borderColor = 'var(--success)';
            }
        });

        if (correct) {
            button.style.background = 'rgba(76, 175, 80, 0.2)';
            button.style.borderColor = 'var(--success)';
            document.getElementById('mnemonic-feedback').textContent = '¡Correcto! Los mnemonics ayudan a recordar.';
            document.getElementById('mnemonic-feedback').className = 'technique-feedback correct';
            this.addXP(5);
        } else {
            button.style.background = 'rgba(244, 67, 54, 0.2)';
            button.style.borderColor = 'var(--error)';
            document.getElementById('mnemonic-feedback').textContent = `Incorrecto. ${this.currentMnemonic.char} significa "${this.currentMnemonic.meaning}"`;
            document.getElementById('mnemonic-feedback').className = 'technique-feedback wrong';
        }
    }

    // ===== Active Recall =====
    loadNextRecall() {
        this.currentRecallWord = this.vocabulary[Math.floor(Math.random() * this.vocabulary.length)];

        document.getElementById('recall-input').value = '';
        document.getElementById('recall-result').classList.add('hidden');
        document.getElementById('recall-feedback').textContent = '';
        document.getElementById('recall-feedback').className = 'technique-feedback';

        switch (this.recallMode) {
            case 'pinyin':
                document.querySelector('.recall-prompt').textContent = 'Escribe el pinyin de:';
                document.getElementById('recall-word').textContent = this.currentRecallWord.hanzi;
                document.getElementById('recall-hint').textContent = `Pista: ${this.currentRecallWord.meaning}`;
                document.getElementById('recall-correct-answer').textContent = this.currentRecallWord.pinyin;
                break;
            case 'meaning':
                document.querySelector('.recall-prompt').textContent = 'Escribe el significado de:';
                document.getElementById('recall-word').textContent = this.currentRecallWord.hanzi;
                document.getElementById('recall-hint').textContent = `Pinyin: ${this.currentRecallWord.pinyin}`;
                document.getElementById('recall-correct-answer').textContent = this.currentRecallWord.meaning;
                break;
            case 'hanzi':
                document.querySelector('.recall-prompt').textContent = 'Escribe el carácter para:';
                document.getElementById('recall-word').textContent = this.currentRecallWord.meaning;
                document.getElementById('recall-hint').textContent = `Pinyin: ${this.currentRecallWord.pinyin}`;
                document.getElementById('recall-correct-answer').textContent = this.currentRecallWord.hanzi;
                break;
        }
    }

    checkRecallAnswer() {
        const input = document.getElementById('recall-input').value.trim().toLowerCase();
        let correctAnswer;
        let isCorrect = false;

        switch (this.recallMode) {
            case 'pinyin':
                correctAnswer = this.currentRecallWord.pinyin.toLowerCase();
                // Remove tone marks for comparison
                const inputClean = input.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, char => {
                    const map = { 'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a', 'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
                                  'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i', 'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
                                  'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u', 'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v' };
                    return map[char] || char;
                });
                const answerClean = correctAnswer.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, char => {
                    const map = { 'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a', 'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
                                  'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i', 'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
                                  'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u', 'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v' };
                    return map[char] || char;
                });
                isCorrect = inputClean === answerClean || input === correctAnswer;
                break;
            case 'meaning':
                correctAnswer = this.currentRecallWord.meaning.toLowerCase();
                isCorrect = input === correctAnswer || correctAnswer.includes(input);
                break;
            case 'hanzi':
                correctAnswer = this.currentRecallWord.hanzi;
                isCorrect = input === correctAnswer;
                break;
        }

        document.getElementById('recall-result').classList.remove('hidden');

        if (isCorrect) {
            document.getElementById('recall-feedback').textContent = '¡Excelente! Recall activo fortalece la memoria.';
            document.getElementById('recall-feedback').className = 'technique-feedback correct';
            this.addXP(10); // More XP for active recall
            this.progress.correctAnswers = (this.progress.correctAnswers || 0) + 1;
        } else {
            document.getElementById('recall-feedback').textContent = 'Incorrecto. Revisa la respuesta correcta arriba.';
            document.getElementById('recall-feedback').className = 'technique-feedback wrong';
            this.progress.wrongAnswers = (this.progress.wrongAnswers || 0) + 1;
        }

        this.saveProgress();
    }

    // ===== Hanzi Writer - Stroke Animation =====
    initHanziWriter() {
        // Check if HanziWriter is available
        if (typeof HanziWriter === 'undefined') {
            console.log('HanziWriter not loaded yet');
            return;
        }

        // Stroke Animation
        this.strokeAnimationWriter = null;
        this.writingPracticeWriter = null;
        this.writingMistakes = 0;
        this.writingCompleted = 0;
        this.writingMode = 'quiz';

        // Animation tab event listeners
        document.getElementById('load-animation')?.addEventListener('click', () => this.loadStrokeAnimation());
        document.getElementById('animate-stroke')?.addEventListener('click', () => this.animateCharacter());
        document.getElementById('animate-stroke-by-stroke')?.addEventListener('click', () => this.animateStrokeByStroke());
        document.getElementById('reset-animation')?.addEventListener('click', () => this.resetAnimation());

        document.querySelectorAll('.quick-char').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const char = e.target.dataset.char;
                document.getElementById('animation-char-input').value = char;
                this.loadStrokeAnimation(char);
            });
        });

        // Writing tab event listeners
        document.getElementById('load-writing')?.addEventListener('click', () => this.loadWritingPractice());
        document.getElementById('show-hint-writing')?.addEventListener('click', () => this.showWritingHint());
        document.getElementById('show-outline')?.addEventListener('click', () => this.showWritingOutline());
        document.getElementById('restart-writing')?.addEventListener('click', () => this.restartWriting());

        document.querySelectorAll('.quick-char-write').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const char = e.target.dataset.char;
                document.getElementById('writing-char-input').value = char;
                this.loadWritingPractice(char);
            });
        });

        document.querySelectorAll('.writing-mode').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.writing-mode').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.writingMode = e.target.dataset.mode;
                this.loadWritingPractice();
            });
        });

        // Lazy load: Initialize animation when tab is first clicked
        this.hanziAnimationLoaded = false;
        this.hanziWritingLoaded = false;

        document.querySelectorAll('.hanzi-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                if (tabName === 'animation' && !this.hanziAnimationLoaded) {
                    setTimeout(() => {
                        this.loadStrokeAnimation('中');
                        this.hanziAnimationLoaded = true;
                    }, 100);
                }
                if (tabName === 'writing' && !this.hanziWritingLoaded) {
                    setTimeout(() => {
                        this.loadWritingPractice('好');
                        this.hanziWritingLoaded = true;
                    }, 100);
                }
            });
        });
    }

    loadStrokeAnimation(char) {
        char = char || document.getElementById('animation-char-input').value || '中';

        // Clear previous writer
        const target = document.getElementById('stroke-animation-target');
        if (target) {
            target.innerHTML = '';
        }

        try {
            this.strokeAnimationWriter = HanziWriter.create('stroke-animation-target', char, {
                width: 180,
                height: 180,
                padding: 10,
                showOutline: true,
                strokeAnimationSpeed: 1,
                delayBetweenStrokes: 300,
                strokeColor: '#e53935',
                outlineColor: '#ddd',
                drawingColor: '#333',
                radicalColor: '#26a69a'
            });

            // Update info
            document.getElementById('animation-current-char').textContent = char;

            // Get stroke count
            HanziWriter.loadCharacterData(char).then(data => {
                document.getElementById('animation-stroke-count').textContent = data.strokes.length;
            }).catch(() => {
                document.getElementById('animation-stroke-count').textContent = '-';
            });

        } catch (error) {
            console.error('Error loading character:', error);
            this.showFeedback('wrong', 'No se pudo cargar el carácter');
        }
    }

    animateCharacter() {
        if (this.strokeAnimationWriter) {
            this.strokeAnimationWriter.animateCharacter();
        }
    }

    animateStrokeByStroke() {
        if (this.strokeAnimationWriter) {
            this.strokeAnimationWriter.animateCharacter({
                onComplete: () => {
                    this.showFeedback('correct', '¡Animación completada!');
                }
            });
        }
    }

    resetAnimation() {
        if (this.strokeAnimationWriter) {
            this.strokeAnimationWriter.hideCharacter();
            this.strokeAnimationWriter.showOutline();
        }
    }

    // ===== Hanzi Writer - Writing Practice =====
    loadWritingPractice(char) {
        char = char || document.getElementById('writing-char-input').value || '好';

        // Clear previous writer
        const target = document.getElementById('writing-practice-target');
        if (target) {
            target.innerHTML = '';
        }

        try {
            const options = {
                width: 180,
                height: 180,
                padding: 10,
                showOutline: false,
                showCharacter: false,
                strokeColor: '#e53935',
                drawingColor: '#333',
                highlightColor: '#26a69a',
                outlineColor: '#ddd',
                drawingWidth: 20,
                showHintAfterMisses: 3,
                highlightOnComplete: true
            };

            if (this.writingMode === 'quiz') {
                this.writingPracticeWriter = HanziWriter.create('writing-practice-target', char, {
                    ...options,
                    showOutline: true
                });

                this.writingPracticeWriter.quiz({
                    onMistake: (strokeData) => {
                        this.writingMistakes++;
                        document.getElementById('writing-mistakes').textContent = this.writingMistakes;
                        document.getElementById('writing-feedback').textContent = 'Intenta de nuevo - trazo incorrecto';
                        document.getElementById('writing-feedback').className = 'writing-feedback error';
                    },
                    onCorrectStroke: (strokeData) => {
                        document.getElementById('writing-feedback').textContent = `¡Trazo ${strokeData.strokeNum + 1} correcto!`;
                        document.getElementById('writing-feedback').className = 'writing-feedback success';
                    },
                    onComplete: (summaryData) => {
                        this.writingCompleted++;
                        document.getElementById('writing-completed').textContent = this.writingCompleted;
                        document.getElementById('writing-feedback').textContent = `¡Excelente! Completaste "${char}" con ${summaryData.totalMistakes} errores`;
                        document.getElementById('writing-feedback').className = 'writing-feedback success';
                        this.addXP(15);
                        this.progress.hanziWritten = (this.progress.hanziWritten || 0) + 1;
                        this.saveProgress();
                    }
                });
            } else {
                // Free mode - just show the outline
                this.writingPracticeWriter = HanziWriter.create('writing-practice-target', char, {
                    ...options,
                    showOutline: true,
                    showCharacter: true
                });
            }

        } catch (error) {
            console.error('Error loading writing practice:', error);
            this.showFeedback('wrong', 'No se pudo cargar el carácter para practicar');
        }
    }

    showWritingHint() {
        if (this.writingPracticeWriter) {
            this.writingPracticeWriter.showHint();
        }
    }

    showWritingOutline() {
        if (this.writingPracticeWriter) {
            this.writingPracticeWriter.showOutline();
        }
    }

    restartWriting() {
        this.loadWritingPractice();
        document.getElementById('writing-feedback').textContent = '';
        document.getElementById('writing-feedback').className = 'writing-feedback';
    }

    // ===== Dictionary Search Integration =====
    initDictionarySearch() {
        const searchInput = document.getElementById('dictionary-search');
        const searchBtn = document.getElementById('search-btn');
        const searchResults = document.getElementById('search-results');

        if (!searchInput || !searchBtn) return;

        // Search on button click
        searchBtn.addEventListener('click', () => this.performDictionarySearch());

        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performDictionarySearch();
        });

        // Live search with debounce
        let debounceTimer;
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (searchInput.value.length >= 1) {
                    this.performDictionarySearch();
                } else {
                    searchResults.innerHTML = '';
                }
            }, 300);
        });
    }

    performDictionarySearch() {
        const query = document.getElementById('dictionary-search').value.trim();
        const resultsContainer = document.getElementById('search-results');

        if (!query) {
            resultsContainer.innerHTML = '';
            return;
        }

        // Search using ChineseDictionary module
        let results = [];
        if (typeof ChineseDictionary !== 'undefined') {
            results = ChineseDictionary.search(query);
        } else {
            // Fallback to local vocabulary
            const q = query.toLowerCase();
            results = this.vocabulary.filter(word =>
                word.hanzi.includes(query) ||
                word.pinyin.toLowerCase().includes(q) ||
                word.meaning.toLowerCase().includes(q)
            ).map(w => ({
                hanzi: w.hanzi,
                pinyin: w.pinyin,
                defs: [w.meaning]
            }));
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    No se encontraron resultados para "${query}"
                </div>
            `;
            return;
        }

        // Get sentences for results
        resultsContainer.innerHTML = results.slice(0, 10).map(word => {
            let sentencesHtml = '';
            if (typeof SentenceBank !== 'undefined') {
                const sentences = SentenceBank.getByWord(word.hanzi, HSK_CONFIG?.currentLevel || 1);
                if (sentences.length > 0) {
                    sentencesHtml = `
                        <div class="search-result-sentences">
                            ${sentences.slice(0, 2).map(s => `
                                <div class="search-result-sentence">${s.cn} - ${s.es}</div>
                            `).join('')}
                        </div>
                    `;
                }
            }

            return `
                <div class="search-result-item" onclick="app.speakText('${word.hanzi}')">
                    <div class="search-result-hanzi">${word.hanzi}</div>
                    <div class="search-result-pinyin">${word.pinyin}</div>
                    <div class="search-result-meaning">${Array.isArray(word.defs) ? word.defs.join(', ') : word.defs}</div>
                    ${sentencesHtml}
                </div>
            `;
        }).join('');
    }

    // ===== Pronunciation Practice Integration =====
    initPronunciationPractice() {
        this.pronunciationWord = null;
        this.pronunciationExercise = null;

        const listenBtn = document.getElementById('pron-listen');
        const recordBtn = document.getElementById('pron-record');
        const nextBtn = document.getElementById('pron-next');

        if (!listenBtn || !recordBtn || !nextBtn) return;

        listenBtn.addEventListener('click', () => this.playPronunciationWord());
        recordBtn.addEventListener('click', () => this.togglePronunciationRecording());
        nextBtn.addEventListener('click', () => this.loadNextPronunciationWord());

        // Load first word
        this.loadNextPronunciationWord();
    }

    loadNextPronunciationWord() {
        // Get a random word from vocabulary
        const randomIndex = Math.floor(Math.random() * this.vocabulary.length);
        this.pronunciationWord = this.vocabulary[randomIndex];

        // Update UI
        document.getElementById('pron-hanzi').textContent = this.pronunciationWord.hanzi;
        document.getElementById('pron-pinyin').textContent = this.pronunciationWord.pinyin;
        document.getElementById('pron-meaning').textContent = this.pronunciationWord.meaning;
        document.getElementById('pron-feedback').textContent = '';
        document.getElementById('pron-feedback').className = 'pron-feedback';
        document.getElementById('pron-status').textContent = '';

        // Reset recording button state
        const recordBtn = document.getElementById('pron-record');
        recordBtn.classList.remove('recording');
    }

    playPronunciationWord() {
        if (this.pronunciationWord) {
            // Use SpeechModule if available
            if (typeof SpeechModule !== 'undefined' && SpeechModule.synthesis) {
                SpeechModule.speak(this.pronunciationWord.hanzi, { rate: 0.7 });
            } else {
                this.speakText(this.pronunciationWord.hanzi);
            }
        }
    }

    togglePronunciationRecording() {
        const recordBtn = document.getElementById('pron-record');
        const feedbackEl = document.getElementById('pron-feedback');
        const statusEl = document.getElementById('pron-status');

        if (typeof SpeechModule === 'undefined' || !SpeechModule.isSupported) {
            feedbackEl.textContent = 'Reconocimiento de voz no disponible';
            feedbackEl.className = 'pron-feedback error';
            return;
        }

        if (SpeechModule.isListening) {
            SpeechModule.stopListening();
            recordBtn.classList.remove('recording');
            statusEl.textContent = '';
        } else {
            recordBtn.classList.add('recording');
            statusEl.textContent = 'Escuchando...';
            feedbackEl.textContent = '';
            feedbackEl.className = 'pron-feedback';

            SpeechModule.startListening({
                onResult: (results) => {
                    if (results.finalTranscript) {
                        const check = SpeechModule.checkPronunciation(
                            this.pronunciationWord.hanzi,
                            results.finalTranscript
                        );

                        feedbackEl.textContent = check.feedback;
                        feedbackEl.className = `pron-feedback ${check.match ? 'success' : 'error'}`;
                        statusEl.textContent = `Tu pronunciación: "${results.finalTranscript}" (${check.score}%)`;

                        if (check.match) {
                            this.addXP(5);
                            this.updateDailyGoals('exercises');
                        }

                        recordBtn.classList.remove('recording');
                    }
                },
                onError: (error) => {
                    feedbackEl.textContent = error.message;
                    feedbackEl.className = 'pron-feedback error';
                    recordBtn.classList.remove('recording');
                    statusEl.textContent = '';
                },
                onEnd: () => {
                    recordBtn.classList.remove('recording');
                    if (statusEl.textContent === 'Escuchando...') {
                        statusEl.textContent = '';
                    }
                }
            });
        }
    }

    // ===== Initialize Modules =====
    initModules() {
        // Initialize HSK Config
        if (typeof HSK_CONFIG !== 'undefined') {
            HSK_CONFIG.loadSavedLevel();
            console.log(`✓ HSK Nivel ${HSK_CONFIG.currentLevel} cargado`);
        }

        // Initialize Vocabulary Manager
        if (typeof VocabularyManager !== 'undefined') {
            VocabularyManager.init(HSK_CONFIG?.currentLevel || 1);
            VocabularyManager.loadProgress();
        }

        // Initialize Statistics Module
        if (typeof StatisticsModule !== 'undefined') {
            StatisticsModule.init();
        }

        // Initialize Listening Module
        if (typeof ListeningModule !== 'undefined') {
            ListeningModule.init();
            this.initListeningSection();
        }

        // Initialize Reading Module
        if (typeof ReadingModule !== 'undefined') {
            ReadingModule.init();
            this.initReadingSection();
        }

        // Initialize Radicals Module
        if (typeof RadicalsModule !== 'undefined') {
            RadicalsModule.init();
        }

        // Initialize Calendar Module
        if (typeof CalendarModule !== 'undefined') {
            CalendarModule.init();
        }

        // Initialize Backup Module
        if (typeof BackupModule !== 'undefined') {
            BackupModule.init();
        }

        // Initialize Notifications Module
        if (typeof NotificationsModule !== 'undefined') {
            NotificationsModule.init();
        }

        // Initialize Dictionary Search
        this.initDictionarySearch();

        // Initialize Pronunciation Practice
        this.initPronunciationPractice();

        // Initialize Statistics Section
        this.initStatisticsSection();

        console.log('✓ Módulos HSK inicializados');
    }

    // ===== Listening Section =====
    initListeningSection() {
        this.listeningType = 'word-meaning';

        document.querySelectorAll('.listening-mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.listening-mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.listeningType = e.target.dataset.type;
            });
        });
    }

    startListeningExercise() {
        const count = parseInt(document.getElementById('listening-count').value);
        ListeningModule.createExercise(1, count);

        document.getElementById('listening-start').style.display = 'none';
        document.getElementById('listening-exercise').style.display = 'block';
        document.getElementById('listening-results').style.display = 'none';
        document.getElementById('listening-total').textContent = count;

        this.showListeningQuestion();
    }

    showListeningQuestion() {
        const exercise = ListeningModule.getCurrentExercise();
        if (!exercise) {
            this.showListeningResults();
            return;
        }

        document.getElementById('listening-current').textContent = ListeningModule.currentIndex + 1;
        document.getElementById('listening-question').textContent = exercise.question;

        const optionsContainer = document.getElementById('listening-options');
        optionsContainer.innerHTML = exercise.options.map((opt, i) => `
            <div class="listening-option" data-index="${i}" onclick="app.checkListeningAnswer(${i})">
                ${opt}
            </div>
        `).join('');

        document.getElementById('listening-feedback').textContent = '';
    }

    playListeningAudio() {
        ListeningModule.playCurrentAudio();
    }

    checkListeningAnswer(index) {
        const result = ListeningModule.checkAnswer(index);
        const options = document.querySelectorAll('.listening-option');

        options.forEach((opt, i) => {
            opt.style.pointerEvents = 'none';
            if (i === ListeningModule.currentExercise.correct) {
                opt.classList.add('correct');
            } else if (i === index && !result.correct) {
                opt.classList.add('wrong');
            }
        });

        const feedback = document.getElementById('listening-feedback');
        feedback.textContent = result.correct ? '¡Correcto!' : `Incorrecto. La respuesta era: ${result.correctAnswer}`;
        feedback.style.color = result.correct ? 'var(--success)' : 'var(--error)';

        if (typeof StatisticsModule !== 'undefined') {
            StatisticsModule.recordExercise('listening');
        }

        setTimeout(() => {
            ListeningModule.nextExercise();
            this.showListeningQuestion();
        }, 1500);
    }

    showListeningResults() {
        const results = ListeningModule.getResults();

        document.getElementById('listening-exercise').style.display = 'none';
        document.getElementById('listening-results').style.display = 'block';

        document.getElementById('listening-score').textContent = results.score;
        document.getElementById('listening-score-total').textContent = results.total;
        document.getElementById('listening-percentage').textContent = results.percentage + '%';

        let message = '';
        if (results.percentage >= 80) message = '¡Excelente! Tu comprensión auditiva es muy buena.';
        else if (results.percentage >= 60) message = '¡Bien! Sigue practicando para mejorar.';
        else message = 'Necesitas más práctica. ¡No te rindas!';
        document.getElementById('listening-message').textContent = message;

        this.addXP(results.score * 5);
    }

    restartListening() {
        document.getElementById('listening-start').style.display = 'block';
        document.getElementById('listening-exercise').style.display = 'none';
        document.getElementById('listening-results').style.display = 'none';
    }

    // ===== Reading Section =====
    initReadingSection() {
        this.loadReadingList();
    }

    loadReadingList() {
        const texts = ReadingModule.getTexts(1);
        const container = document.getElementById('reading-list');

        container.innerHTML = texts.map(text => `
            <div class="reading-item" onclick="app.startReading(${text.id})">
                <div class="reading-item-title">${text.title}</div>
                <div class="reading-item-preview">${text.text.substring(0, 50)}...</div>
            </div>
        `).join('');
    }

    startReading(textId) {
        const text = ReadingModule.startReading(textId, 1);

        document.getElementById('reading-list').style.display = 'none';
        document.getElementById('reading-exercise').style.display = 'block';
        document.getElementById('reading-results').style.display = 'none';

        document.getElementById('reading-title').textContent = text.title;
        document.getElementById('reading-text').textContent = text.text;
        document.getElementById('reading-pinyin').textContent = text.pinyin;
        document.getElementById('reading-translation').textContent = text.translation;

        this.renderReadingQuestions(text.questions);
        this.readingAnswers = new Array(text.questions.length).fill(null);
    }

    renderReadingQuestions(questions) {
        const container = document.getElementById('reading-question-container');
        container.innerHTML = questions.map((q, qIndex) => `
            <div class="reading-question-item" data-question="${qIndex}">
                <div class="reading-q-text">${q.question}</div>
                <div class="reading-q-text-es">${q.questionEs}</div>
                <div class="reading-q-options">
                    ${q.options.map((opt, oIndex) => `
                        <div class="reading-q-option" data-option="${oIndex}"
                             onclick="app.selectReadingAnswer(${qIndex}, ${oIndex})">
                            ${opt}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('') + `
            <button class="btn-check-reading" onclick="app.checkReadingAnswers()">
                Verificar Respuestas
            </button>
        `;
    }

    selectReadingAnswer(questionIndex, optionIndex) {
        this.readingAnswers[questionIndex] = optionIndex;

        const questionEl = document.querySelector(`[data-question="${questionIndex}"]`);
        questionEl.querySelectorAll('.reading-q-option').forEach((opt, i) => {
            opt.classList.toggle('selected', i === optionIndex);
        });
    }

    checkReadingAnswers() {
        const text = ReadingModule.currentText;
        let score = 0;

        text.questions.forEach((q, qIndex) => {
            const questionEl = document.querySelector(`[data-question="${qIndex}"]`);
            const options = questionEl.querySelectorAll('.reading-q-option');
            const selectedIndex = this.readingAnswers[qIndex];

            options.forEach((opt, oIndex) => {
                opt.style.pointerEvents = 'none';
                if (oIndex === q.correct) {
                    opt.classList.add('correct');
                } else if (oIndex === selectedIndex && selectedIndex !== q.correct) {
                    opt.classList.add('wrong');
                }
            });

            if (selectedIndex === q.correct) score++;
        });

        document.getElementById('reading-results').style.display = 'block';
        document.getElementById('reading-score').textContent = score;
        document.getElementById('reading-total').textContent = text.questions.length;

        if (typeof StatisticsModule !== 'undefined') {
            StatisticsModule.recordExercise('reading');
        }

        this.addXP(score * 10);
    }

    toggleReadingPinyin() {
        const el = document.getElementById('reading-pinyin');
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }

    toggleReadingTranslation() {
        const el = document.getElementById('reading-translation');
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }

    readTextAloud() {
        ReadingModule.readText(0.7);
    }

    backToReadingList() {
        document.getElementById('reading-list').style.display = 'grid';
        document.getElementById('reading-exercise').style.display = 'none';
    }

    // ===== Statistics Section =====
    initStatisticsSection() {
        // Render calendar
        if (typeof CalendarModule !== 'undefined') {
            const calendarContainer = document.getElementById('srs-calendar-container');
            if (calendarContainer) {
                calendarContainer.innerHTML = CalendarModule.renderCalendarHTML(this.srsData);
            }

            const weekContainer = document.getElementById('srs-week-container');
            if (weekContainer) {
                weekContainer.innerHTML = CalendarModule.renderWeekViewHTML(this.srsData);
            }
        }

        // Render weekly chart
        this.renderWeeklyChart();

        // Render similar characters
        this.renderSimilarCharacters();

        // Render notification settings
        if (typeof NotificationsModule !== 'undefined') {
            const notifContainer = document.getElementById('notification-settings');
            if (notifContainer) {
                notifContainer.innerHTML = NotificationsModule.getSettingsHTML();
            }
        }

        // Render data size
        if (typeof BackupModule !== 'undefined') {
            const sizeEl = document.getElementById('data-size');
            if (sizeEl) {
                const size = BackupModule.getDataSize();
                sizeEl.textContent = `Datos guardados: ${size.total} (Disponible: ${size.available})`;
            }
        }

        // Update monthly stats when section is shown
        this.updateMonthlyStats();
    }

    renderWeeklyChart() {
        if (typeof StatisticsModule === 'undefined') return;

        const weeklyStats = StatisticsModule.getWeeklyStats();
        const chartContainer = document.getElementById('week-chart');
        if (!chartContainer) return;

        const maxWords = Math.max(...weeklyStats.map(d => d.words), 1);

        chartContainer.innerHTML = weeklyStats.map(day => {
            const height = (day.words / maxWords) * 100;
            return `
                <div class="week-bar" style="height: ${Math.max(height, 5)}%">
                    <span class="week-bar-label">${day.dayName}</span>
                </div>
            `;
        }).join('');
    }

    renderSimilarCharacters() {
        if (typeof RadicalsModule === 'undefined') return;

        const container = document.getElementById('similar-chars-grid');
        if (!container) return;

        const groups = RadicalsModule.getAllSimilarGroups();
        container.innerHTML = groups.slice(0, 4).map(group => `
            <div class="similar-group">
                <div class="similar-chars">
                    ${group.chars.map(c => `<span class="similar-char">${c}</span>`).join('')}
                </div>
                <div class="similar-tip">${group.tip}</div>
            </div>
        `).join('');
    }

    updateMonthlyStats() {
        if (typeof StatisticsModule === 'undefined') return;

        const stats = StatisticsModule.getMonthlyStats();

        const sessionsEl = document.getElementById('month-sessions');
        const wordsEl = document.getElementById('month-words');
        const timeEl = document.getElementById('month-time');
        const accuracyEl = document.getElementById('month-accuracy');

        if (sessionsEl) sessionsEl.textContent = stats.totalSessions;
        if (wordsEl) wordsEl.textContent = stats.totalWords;
        if (timeEl) timeEl.textContent = stats.totalMinutes;
        if (accuracyEl) accuracyEl.textContent = stats.averageAccuracy + '%';

        // Update completion estimate
        const estimate = StatisticsModule.estimateCompletionTime();
        const estimateDays = document.getElementById('estimate-days');
        if (estimateDays) {
            estimateDays.textContent = estimate.daysRemaining || '--';
        }
    }

    // ===== Session Summary =====
    showSessionSummary() {
        if (typeof StatisticsModule === 'undefined') return;

        const result = StatisticsModule.endSession();
        if (!result) return;

        const { summary } = result;

        document.getElementById('session-duration').textContent = summary.duration;
        document.getElementById('session-words').textContent = summary.uniqueWords;
        document.getElementById('session-accuracy').textContent = summary.accuracy + '%';
        document.getElementById('session-xp').textContent = '+' + summary.xpEarned;

        const difficultEl = document.getElementById('session-difficult');
        if (summary.difficultWords.length > 0) {
            const difficultList = summary.difficultWords.map(w => {
                const word = this.vocabulary.find(v => v.id === w.id);
                return word ? word.hanzi : '';
            }).filter(Boolean).join(', ');
            difficultEl.innerHTML = `<strong>Palabras para repasar:</strong> ${difficultList}`;
            difficultEl.style.display = 'block';
        } else {
            difficultEl.style.display = 'none';
        }

        document.getElementById('session-modal').classList.add('active');
    }

    closeSessionModal() {
        document.getElementById('session-modal').classList.remove('active');
    }

    // ===== Utilities =====
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}

// Initialize app
const app = new HSK1App();

// Service Worker registration for offline support (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('HSK1 Study App: Service Worker registrado con scope:', registration.scope);
            })
            .catch(error => {
                console.log('HSK1 Study App: Error al registrar Service Worker:', error);
            });
    });
}

// Online/Offline status indicator
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    app.showFeedback('correct', '¡Conexión restaurada!');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    app.showFeedback('wrong', 'Sin conexión - Modo offline');
});

// ===== Global Error Handling =====
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Error global:', { message, source, lineno, colno, error });

    // Mostrar mensaje amigable al usuario solo para errores críticos
    if (error && error.name !== 'AbortError') {
        const errorContainer = document.getElementById('error-toast');
        if (errorContainer) {
            errorContainer.textContent = '发生了错误 - Ha ocurrido un error. Recargando...';
            errorContainer.classList.add('show');
            setTimeout(() => {
                errorContainer.classList.remove('show');
            }, 3000);
        }
    }

    // Reportar errores a analytics (si está configurado)
    if (window.gtag) {
        gtag('event', 'exception', {
            'description': message,
            'fatal': false
        });
    }

    return false; // Permitir que el error se propague
};

// Manejar promesas rechazadas no capturadas
window.addEventListener('unhandledrejection', function(event) {
    console.error('Promesa rechazada:', event.reason);

    // Ignorar errores de cancelación de fetch
    if (event.reason?.name === 'AbortError') return;

    // Reportar a analytics
    if (window.gtag) {
        gtag('event', 'exception', {
            'description': event.reason?.message || 'Unhandled Promise Rejection',
            'fatal': false
        });
    }
});

// ===== Loading Screen Management =====
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('app-loader');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Ocultar pantalla de carga cuando todo esté listo
window.addEventListener('load', () => {
    // Dar tiempo para que los módulos se inicialicen
    setTimeout(hideLoadingScreen, 800);
});

// Fallback: ocultar después de 3 segundos máximo
setTimeout(hideLoadingScreen, 3000);

// ===== Performance Monitoring =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Performance:', {
                    'DNS Lookup': Math.round(perfData.domainLookupEnd - perfData.domainLookupStart) + 'ms',
                    'TCP Connection': Math.round(perfData.connectEnd - perfData.connectStart) + 'ms',
                    'DOM Interactive': Math.round(perfData.domInteractive) + 'ms',
                    'DOM Complete': Math.round(perfData.domComplete) + 'ms',
                    'Load Complete': Math.round(perfData.loadEventEnd) + 'ms'
                });
            }
        }, 0);
    });
}

// ===== Visibility Change Handler =====
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Usuario volvió a la app
        if (app && app.updateProgressDisplay) {
            app.updateProgressDisplay();
        }
    } else {
        // Usuario dejó la app - guardar estado si es necesario
        if (app && app.progress) {
            localStorage.setItem('hsk1_progress', JSON.stringify(app.progress));
        }
    }
});

// ===== Memory Management =====
if ('memory' in performance) {
    setInterval(() => {
        const memory = performance.memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
            console.warn('Uso de memoria alto, limpiando cache...');
            // Limpiar caches innecesarios
            if (app && app.clearOldData) {
                app.clearOldData();
            }
        }
    }, 60000); // Revisar cada minuto
}
