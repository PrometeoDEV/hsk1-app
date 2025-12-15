// ===== Listening Comprehension Module - HSK Learning =====
// Ejercicios de comprensión auditiva estilo examen HSK

const ListeningModule = {
    currentExercise: null,
    exercises: [],
    score: 0,
    currentIndex: 0,

    // ===== Banco de Ejercicios de Escucha HSK1 =====
    exerciseBank: {
        1: [
            // Tipo 1: Escuchar palabra y seleccionar imagen/significado
            {
                type: 'word-meaning',
                audio: '你好',
                question: 'Escucha y selecciona el significado correcto:',
                options: ['Hola', 'Adiós', 'Gracias', 'Lo siento'],
                correct: 0
            },
            {
                type: 'word-meaning',
                audio: '谢谢',
                question: 'Escucha y selecciona el significado correcto:',
                options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
                correct: 2
            },
            {
                type: 'word-meaning',
                audio: '再见',
                question: 'Escucha y selecciona el significado correcto:',
                options: ['Buenos días', 'Adiós', 'Buenas noches', 'Hola'],
                correct: 1
            },
            {
                type: 'word-meaning',
                audio: '对不起',
                question: 'Escucha y selecciona el significado correcto:',
                options: ['Gracias', 'De nada', 'Lo siento', 'Por favor'],
                correct: 2
            },
            {
                type: 'word-meaning',
                audio: '不客气',
                question: 'Escucha y selecciona el significado correcto:',
                options: ['Lo siento', 'De nada', 'Gracias', 'Hola'],
                correct: 1
            },

            // Tipo 2: Escuchar número
            {
                type: 'number',
                audio: '三十五',
                question: '¿Qué número escuchaste?',
                options: ['25', '35', '53', '45'],
                correct: 1
            },
            {
                type: 'number',
                audio: '八十二',
                question: '¿Qué número escuchaste?',
                options: ['82', '28', '92', '72'],
                correct: 0
            },
            {
                type: 'number',
                audio: '六十七',
                question: '¿Qué número escuchaste?',
                options: ['76', '67', '57', '77'],
                correct: 1
            },

            // Tipo 3: Escuchar oración corta
            {
                type: 'sentence',
                audio: '我是学生',
                question: '¿Qué dice la oración?',
                options: ['Soy estudiante', 'Soy profesor', 'Soy médico', 'Soy amigo'],
                correct: 0
            },
            {
                type: 'sentence',
                audio: '他是医生',
                question: '¿Qué dice la oración?',
                options: ['Él es estudiante', 'Él es profesor', 'Él es médico', 'Él es amigo'],
                correct: 2
            },
            {
                type: 'sentence',
                audio: '她很漂亮',
                question: '¿Qué dice la oración?',
                options: ['Ella es alta', 'Ella es bonita', 'Ella es joven', 'Ella es inteligente'],
                correct: 1
            },
            {
                type: 'sentence',
                audio: '今天很热',
                question: '¿Qué dice la oración?',
                options: ['Hoy hace frío', 'Hoy hace calor', 'Hoy llueve', 'Hoy está nublado'],
                correct: 1
            },
            {
                type: 'sentence',
                audio: '我喜欢吃苹果',
                question: '¿Qué dice la oración?',
                options: [
                    'Me gusta comer manzanas',
                    'Me gusta beber té',
                    'Me gusta comer arroz',
                    'Me gusta comer fruta'
                ],
                correct: 0
            },

            // Tipo 4: Diálogos cortos
            {
                type: 'dialogue',
                audio: '你好！你叫什么名字？',
                audioB: '我叫李明。',
                question: '¿Cómo se llama la persona?',
                options: ['Wang Wei', 'Li Ming', 'Zhang San', 'Liu Yang'],
                correct: 1
            },
            {
                type: 'dialogue',
                audio: '现在几点？',
                audioB: '现在八点。',
                question: '¿Qué hora es?',
                options: ['7:00', '8:00', '9:00', '10:00'],
                correct: 1
            },
            {
                type: 'dialogue',
                audio: '这个多少钱？',
                audioB: '二十块。',
                question: '¿Cuánto cuesta?',
                options: ['10 yuan', '20 yuan', '30 yuan', '12 yuan'],
                correct: 1
            },
            {
                type: 'dialogue',
                audio: '你喜欢喝什么？',
                audioB: '我喜欢喝茶。',
                question: '¿Qué le gusta beber?',
                options: ['Café', 'Agua', 'Té', 'Jugo'],
                correct: 2
            },
            {
                type: 'dialogue',
                audio: '你家有几口人？',
                audioB: '我家有四口人。',
                question: '¿Cuántas personas hay en su familia?',
                options: ['3 personas', '4 personas', '5 personas', '6 personas'],
                correct: 1
            },

            // Tipo 5: Dictado
            {
                type: 'dictation',
                audio: '中国',
                question: 'Escucha y selecciona los caracteres correctos:',
                options: ['中国', '中午', '中文', '国家'],
                correct: 0
            },
            {
                type: 'dictation',
                audio: '学习',
                question: 'Escucha y selecciona los caracteres correctos:',
                options: ['学生', '学习', '学校', '习惯'],
                correct: 1
            },
            {
                type: 'dictation',
                audio: '朋友',
                question: 'Escucha y selecciona los caracteres correctos:',
                options: ['明天', '朋友', '名字', '漂亮'],
                correct: 1
            }
        ]
    },

    // ===== Inicialización =====
    init() {
        console.log('✓ Listening Module inicializado');
    },

    // ===== Crear Ejercicio =====
    createExercise(level = 1, count = 10) {
        const bank = this.exerciseBank[level] || this.exerciseBank[1];
        this.exercises = this.shuffleArray([...bank]).slice(0, count);
        this.currentIndex = 0;
        this.score = 0;
        return this.exercises;
    },

    // ===== Obtener Ejercicio Actual =====
    getCurrentExercise() {
        if (this.currentIndex >= this.exercises.length) {
            return null;
        }
        this.currentExercise = this.exercises[this.currentIndex];
        return this.currentExercise;
    },

    // ===== Reproducir Audio =====
    playAudio(text, rate = 0.8) {
        if (typeof SpeechModule !== 'undefined' && SpeechModule.synthesis) {
            SpeechModule.speak(text, { rate });
        } else if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = rate;
            speechSynthesis.speak(utterance);
        }
    },

    playCurrentAudio() {
        if (!this.currentExercise) return;

        this.playAudio(this.currentExercise.audio);

        // Si es diálogo, reproducir segunda parte después
        if (this.currentExercise.type === 'dialogue' && this.currentExercise.audioB) {
            setTimeout(() => {
                this.playAudio(this.currentExercise.audioB);
            }, 2000);
        }
    },

    // ===== Verificar Respuesta =====
    checkAnswer(selectedIndex) {
        if (!this.currentExercise) return null;

        const correct = selectedIndex === this.currentExercise.correct;
        if (correct) {
            this.score++;
        }

        return {
            correct,
            correctAnswer: this.currentExercise.options[this.currentExercise.correct],
            selectedAnswer: this.currentExercise.options[selectedIndex],
            score: this.score,
            total: this.currentIndex + 1
        };
    },

    // ===== Siguiente Ejercicio =====
    nextExercise() {
        this.currentIndex++;
        return this.getCurrentExercise();
    },

    // ===== Obtener Resultados =====
    getResults() {
        return {
            score: this.score,
            total: this.exercises.length,
            percentage: Math.round((this.score / this.exercises.length) * 100),
            passed: this.score >= this.exercises.length * 0.6,
            exercises: this.exercises
        };
    },

    // ===== Obtener Ejercicio por Tipo =====
    getExercisesByType(type, level = 1) {
        const bank = this.exerciseBank[level] || this.exerciseBank[1];
        return bank.filter(e => e.type === type);
    },

    // ===== Utilidades =====
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
};
