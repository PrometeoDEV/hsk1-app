// ===== Speech Recognition Module - HSK Learning =====
// Módulo de reconocimiento de voz con soporte offline
// Compatible con Web Speech API y fallback graceful

const SpeechModule = {
    // Estado del módulo
    isSupported: false,
    isListening: false,
    recognition: null,
    synthesis: null,
    currentLevel: 1,

    // Configuración de idioma
    config: {
        lang: 'zh-CN',
        continuous: false,
        interimResults: true,
        maxAlternatives: 3
    },

    // Callbacks
    onResult: null,
    onError: null,
    onStart: null,
    onEnd: null,

    // ===== Inicialización =====
    init() {
        // Verificar soporte de Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.setupRecognition();
            this.isSupported = true;
            console.log('✓ Speech Recognition inicializado');
        } else {
            console.warn('⚠ Speech Recognition no soportado en este navegador');
            this.isSupported = false;
        }

        // Inicializar síntesis de voz
        if ('speechSynthesis' in window) {
            this.synthesis = window.speechSynthesis;
            console.log('✓ Speech Synthesis disponible');
        }

        return this.isSupported;
    },

    // ===== Configurar Recognition =====
    setupRecognition() {
        if (!this.recognition) return;

        this.recognition.lang = this.config.lang;
        this.recognition.continuous = this.config.continuous;
        this.recognition.interimResults = this.config.interimResults;
        this.recognition.maxAlternatives = this.config.maxAlternatives;

        // Event handlers
        this.recognition.onstart = () => {
            this.isListening = true;
            if (this.onStart) this.onStart();
        };

        this.recognition.onend = () => {
            this.isListening = false;
            if (this.onEnd) this.onEnd();
        };

        this.recognition.onresult = (event) => {
            const results = this.processResults(event);
            if (this.onResult) this.onResult(results);
        };

        this.recognition.onerror = (event) => {
            this.isListening = false;
            const errorInfo = this.handleError(event);
            if (this.onError) this.onError(errorInfo);
        };
    },

    // ===== Procesar Resultados =====
    processResults(event) {
        const results = [];

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const alternatives = [];

            for (let j = 0; j < result.length; j++) {
                alternatives.push({
                    transcript: result[j].transcript,
                    confidence: result[j].confidence
                });
            }

            results.push({
                isFinal: result.isFinal,
                alternatives: alternatives,
                bestMatch: alternatives[0]?.transcript || ''
            });
        }

        return {
            results: results,
            finalTranscript: results.filter(r => r.isFinal).map(r => r.bestMatch).join(''),
            interimTranscript: results.filter(r => !r.isFinal).map(r => r.bestMatch).join('')
        };
    },

    // ===== Manejar Errores =====
    handleError(event) {
        const errorMessages = {
            'no-speech': 'No se detectó ningún sonido. Intenta hablar más fuerte.',
            'audio-capture': 'No se pudo acceder al micrófono. Verifica los permisos.',
            'not-allowed': 'Permiso de micrófono denegado. Habilítalo en configuración.',
            'network': 'Error de red. Funciona mejor con conexión a internet.',
            'aborted': 'Reconocimiento cancelado.',
            'language-not-supported': 'Idioma chino no soportado en este dispositivo.',
            'service-not-allowed': 'Servicio de reconocimiento no disponible.'
        };

        return {
            error: event.error,
            message: errorMessages[event.error] || `Error: ${event.error}`,
            canRetry: ['no-speech', 'network', 'aborted'].includes(event.error)
        };
    },

    // ===== Iniciar Escucha =====
    startListening(callbacks = {}) {
        if (!this.isSupported) {
            if (callbacks.onError) {
                callbacks.onError({
                    error: 'not-supported',
                    message: 'Tu navegador no soporta reconocimiento de voz.'
                });
            }
            return false;
        }

        if (this.isListening) {
            this.stopListening();
        }

        // Asignar callbacks
        if (callbacks.onResult) this.onResult = callbacks.onResult;
        if (callbacks.onError) this.onError = callbacks.onError;
        if (callbacks.onStart) this.onStart = callbacks.onStart;
        if (callbacks.onEnd) this.onEnd = callbacks.onEnd;

        try {
            this.recognition.start();
            return true;
        } catch (e) {
            console.error('Error al iniciar reconocimiento:', e);
            return false;
        }
    },

    // ===== Detener Escucha =====
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    },

    // ===== Síntesis de Voz (TTS) =====
    speak(text, options = {}) {
        if (!this.synthesis) {
            console.warn('Speech Synthesis no disponible');
            return false;
        }

        // Cancelar cualquier síntesis anterior
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = options.lang || 'zh-CN';
        utterance.rate = options.rate || 0.8;  // Más lento para aprendizaje
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;

        // Buscar voz china si está disponible
        const voices = this.synthesis.getVoices();
        const chineseVoice = voices.find(v => v.lang.includes('zh'));
        if (chineseVoice) {
            utterance.voice = chineseVoice;
        }

        // Callbacks
        if (options.onStart) utterance.onstart = options.onStart;
        if (options.onEnd) utterance.onend = options.onEnd;
        if (options.onError) utterance.onerror = options.onError;

        this.synthesis.speak(utterance);
        return true;
    },

    // ===== Verificar Pronunciación =====
    checkPronunciation(expected, spoken) {
        // Normalizar strings
        const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();
        const expectedNorm = normalize(expected);
        const spokenNorm = normalize(spoken);

        // Coincidencia exacta
        if (expectedNorm === spokenNorm) {
            return {
                match: true,
                score: 100,
                feedback: '¡Perfecto! Tu pronunciación es excelente.'
            };
        }

        // Calcular similitud
        const similarity = this.calculateSimilarity(expectedNorm, spokenNorm);

        if (similarity >= 80) {
            return {
                match: true,
                score: similarity,
                feedback: '¡Muy bien! Casi perfecto.'
            };
        } else if (similarity >= 60) {
            return {
                match: false,
                score: similarity,
                feedback: 'Buen intento. Practica un poco más los tonos.'
            };
        } else if (similarity >= 40) {
            return {
                match: false,
                score: similarity,
                feedback: 'Sigue practicando. Escucha el audio de nuevo.'
            };
        } else {
            return {
                match: false,
                score: similarity,
                feedback: 'Intenta de nuevo. Concéntrate en cada sílaba.'
            };
        }
    },

    // ===== Calcular Similitud (Levenshtein) =====
    calculateSimilarity(str1, str2) {
        const len1 = str1.length;
        const len2 = str2.length;

        if (len1 === 0) return len2 === 0 ? 100 : 0;
        if (len2 === 0) return 0;

        const matrix = [];

        for (let i = 0; i <= len1; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= len2; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }

        const distance = matrix[len1][len2];
        const maxLen = Math.max(len1, len2);
        return Math.round((1 - distance / maxLen) * 100);
    },

    // ===== Ejercicio de Pronunciación =====
    createPronunciationExercise(word, callbacks = {}) {
        return {
            word: word,
            attempts: 0,
            maxAttempts: 3,
            bestScore: 0,

            start: () => {
                this.startListening({
                    onResult: (results) => {
                        if (results.finalTranscript) {
                            const check = this.checkPronunciation(
                                word.hanzi,
                                results.finalTranscript
                            );

                            this.attempts++;
                            if (check.score > this.bestScore) {
                                this.bestScore = check.score;
                            }

                            if (callbacks.onCheck) {
                                callbacks.onCheck({
                                    ...check,
                                    spoken: results.finalTranscript,
                                    expected: word.hanzi,
                                    attempt: this.attempts
                                });
                            }
                        }
                    },
                    onError: callbacks.onError,
                    onStart: callbacks.onStart,
                    onEnd: callbacks.onEnd
                });
            },

            playExample: () => {
                this.speak(word.hanzi, { rate: 0.7 });
            },

            stop: () => {
                this.stopListening();
            }
        };
    },

    // ===== Obtener Estado =====
    getStatus() {
        return {
            supported: this.isSupported,
            listening: this.isListening,
            hasSynthesis: !!this.synthesis,
            language: this.config.lang
        };
    },

    // ===== Verificar Permisos de Micrófono =====
    async checkMicrophonePermission() {
        try {
            const result = await navigator.permissions.query({ name: 'microphone' });
            return {
                state: result.state,  // 'granted', 'denied', 'prompt'
                canUse: result.state === 'granted'
            };
        } catch (e) {
            // Algunos navegadores no soportan permissions API
            return { state: 'unknown', canUse: null };
        }
    },

    // ===== Solicitar Permiso de Micrófono =====
    async requestMicrophoneAccess() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Cerrar el stream inmediatamente
            stream.getTracks().forEach(track => track.stop());
            return { granted: true };
        } catch (e) {
            return {
                granted: false,
                error: e.name === 'NotAllowedError' ? 'denied' : 'error',
                message: e.message
            };
        }
    }
};

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SpeechModule.init());
} else {
    SpeechModule.init();
}
