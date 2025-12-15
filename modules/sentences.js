// ===== Sentences Module - Example Sentences by HSK Level =====
// Modular sentence bank with grammar patterns

const SentenceBank = {
    // Sentence database organized by HSK level
    sentences: {
        1: [
            // Greetings & Introductions
            { cn: '你好！', py: 'Nǐ hǎo!', es: '¡Hola!', grammar: 'greeting', words: ['你', '好'] },
            { cn: '你好吗？', py: 'Nǐ hǎo ma?', es: '¿Cómo estás?', grammar: 'question-ma', words: ['你', '好', '吗'] },
            { cn: '我很好，谢谢。', py: 'Wǒ hěn hǎo, xièxie.', es: 'Estoy bien, gracias.', grammar: 'hen-adj', words: ['我', '很', '好', '谢谢'] },
            { cn: '你叫什么名字？', py: 'Nǐ jiào shénme míngzi?', es: '¿Cómo te llamas?', grammar: 'question-shenme', words: ['你', '叫', '什么', '名字'] },
            { cn: '我叫李明。', py: 'Wǒ jiào Lǐ Míng.', es: 'Me llamo Li Ming.', grammar: 'basic-svo', words: ['我', '叫'] },
            { cn: '认识你很高兴。', py: 'Rènshi nǐ hěn gāoxìng.', es: 'Encantado de conocerte.', grammar: 'topic-comment', words: ['认识', '你', '很', '高兴'] },

            // Basic information
            { cn: '你是哪国人？', py: 'Nǐ shì nǎ guó rén?', es: '¿De qué país eres?', grammar: 'question-na', words: ['你', '是', '哪', '国', '人'] },
            { cn: '我是中国人。', py: 'Wǒ shì Zhōngguó rén.', es: 'Soy chino.', grammar: 'shi-sentence', words: ['我', '是', '中国', '人'] },
            { cn: '你多大了？', py: 'Nǐ duō dà le?', es: '¿Cuántos años tienes?', grammar: 'question-duo', words: ['你', '多', '大', '了'] },
            { cn: '我二十岁。', py: 'Wǒ èrshí suì.', es: 'Tengo 20 años.', grammar: 'age', words: ['我', '二十', '岁'] },
            { cn: '你住在哪儿？', py: 'Nǐ zhù zài nǎr?', es: '¿Dónde vives?', grammar: 'question-nar', words: ['你', '住', '在', '哪儿'] },
            { cn: '我住在北京。', py: 'Wǒ zhù zài Běijīng.', es: 'Vivo en Beijing.', grammar: 'zai-location', words: ['我', '住', '在', '北京'] },

            // Family
            { cn: '你家有几口人？', py: 'Nǐ jiā yǒu jǐ kǒu rén?', es: '¿Cuántas personas hay en tu familia?', grammar: 'you-sentence', words: ['你', '家', '有', '几', '口', '人'] },
            { cn: '我家有四口人。', py: 'Wǒ jiā yǒu sì kǒu rén.', es: 'En mi familia somos cuatro.', grammar: 'you-sentence', words: ['我', '家', '有', '四', '口', '人'] },
            { cn: '这是我爸爸。', py: 'Zhè shì wǒ bàba.', es: 'Este es mi papá.', grammar: 'shi-sentence', words: ['这', '是', '我', '爸爸'] },
            { cn: '我妈妈是老师。', py: 'Wǒ māma shì lǎoshī.', es: 'Mi mamá es profesora.', grammar: 'shi-sentence', words: ['我', '妈妈', '是', '老师'] },

            // Time
            { cn: '今天几月几号？', py: 'Jīntiān jǐ yuè jǐ hào?', es: '¿Qué fecha es hoy?', grammar: 'question-ji', words: ['今天', '几', '月', '几', '号'] },
            { cn: '今天星期几？', py: 'Jīntiān xīngqī jǐ?', es: '¿Qué día de la semana es hoy?', grammar: 'question-ji', words: ['今天', '星期', '几'] },
            { cn: '现在几点？', py: 'Xiànzài jǐ diǎn?', es: '¿Qué hora es?', grammar: 'question-ji', words: ['现在', '几', '点'] },
            { cn: '现在八点半。', py: 'Xiànzài bā diǎn bàn.', es: 'Son las ocho y media.', grammar: 'time-expression', words: ['现在', '八', '点', '半'] },
            { cn: '我明天去学校。', py: 'Wǒ míngtiān qù xuéxiào.', es: 'Mañana voy a la escuela.', grammar: 'time-word-position', words: ['我', '明天', '去', '学校'] },

            // Daily activities
            { cn: '你每天几点起床？', py: 'Nǐ měitiān jǐ diǎn qǐchuáng?', es: '¿A qué hora te levantas cada día?', grammar: 'question-ji', words: ['你', '每天', '几', '点', '起床'] },
            { cn: '我每天六点起床。', py: 'Wǒ měitiān liù diǎn qǐchuáng.', es: 'Me levanto a las seis cada día.', grammar: 'time-expression', words: ['我', '每天', '六', '点', '起床'] },
            { cn: '你在做什么？', py: 'Nǐ zài zuò shénme?', es: '¿Qué estás haciendo?', grammar: 'zai-progressive', words: ['你', '在', '做', '什么'] },
            { cn: '我在看书。', py: 'Wǒ zài kàn shū.', es: 'Estoy leyendo un libro.', grammar: 'zai-progressive', words: ['我', '在', '看', '书'] },
            { cn: '我想喝水。', py: 'Wǒ xiǎng hē shuǐ.', es: 'Quiero beber agua.', grammar: 'xiang-want', words: ['我', '想', '喝', '水'] },
            { cn: '我喜欢吃中国菜。', py: 'Wǒ xǐhuan chī Zhōngguó cài.', es: 'Me gusta comer comida china.', grammar: 'xihuan-like', words: ['我', '喜欢', '吃', '中国', '菜'] },

            // Questions
            { cn: '这个多少钱？', py: 'Zhège duōshao qián?', es: '¿Cuánto cuesta esto?', grammar: 'question-duoshao', words: ['这个', '多少', '钱'] },
            { cn: '你能帮我吗？', py: 'Nǐ néng bāng wǒ ma?', es: '¿Puedes ayudarme?', grammar: 'neng-can', words: ['你', '能', '帮', '我', '吗'] },
            { cn: '你会说英语吗？', py: 'Nǐ huì shuō Yīngyǔ ma?', es: '¿Sabes hablar inglés?', grammar: 'hui-can', words: ['你', '会', '说', '英语', '吗'] },
            { cn: '厕所在哪儿？', py: 'Cèsuǒ zài nǎr?', es: '¿Dónde está el baño?', grammar: 'zai-location', words: ['厕所', '在', '哪儿'] },

            // Weather
            { cn: '今天天气怎么样？', py: 'Jīntiān tiānqì zěnmeyàng?', es: '¿Cómo está el clima hoy?', grammar: 'question-zenmeyang', words: ['今天', '天气', '怎么样'] },
            { cn: '今天很热。', py: 'Jīntiān hěn rè.', es: 'Hoy hace calor.', grammar: 'hen-adj', words: ['今天', '很', '热'] },
            { cn: '明天会下雨。', py: 'Míngtiān huì xià yǔ.', es: 'Mañana va a llover.', grammar: 'hui-future', words: ['明天', '会', '下雨'] },

            // Likes and preferences
            { cn: '你喜欢什么颜色？', py: 'Nǐ xǐhuan shénme yánsè?', es: '¿Qué color te gusta?', grammar: 'question-shenme', words: ['你', '喜欢', '什么', '颜色'] },
            { cn: '我最喜欢蓝色。', py: 'Wǒ zuì xǐhuan lánsè.', es: 'El azul es mi favorito.', grammar: 'zui-superlative', words: ['我', '最', '喜欢', '蓝色'] },
            { cn: '我不喜欢喝咖啡。', py: 'Wǒ bù xǐhuan hē kāfēi.', es: 'No me gusta el café.', grammar: 'bu-negation', words: ['我', '不', '喜欢', '喝', '咖啡'] },

            // Actions
            { cn: '请坐！', py: 'Qǐng zuò!', es: '¡Por favor, siéntese!', grammar: 'qing-polite', words: ['请', '坐'] },
            { cn: '请等一下。', py: 'Qǐng děng yīxià.', es: 'Espera un momento, por favor.', grammar: 'yixia-softener', words: ['请', '等', '一下'] },
            { cn: '我去买东西。', py: 'Wǒ qù mǎi dōngxi.', es: 'Voy a comprar cosas.', grammar: 'qu-go', words: ['我', '去', '买', '东西'] },
            { cn: '他回家了。', py: 'Tā huí jiā le.', es: 'Él volvió a casa.', grammar: 'le-completed', words: ['他', '回', '家', '了'] },

            // Comparisons
            { cn: '我比他高。', py: 'Wǒ bǐ tā gāo.', es: 'Soy más alto que él.', grammar: 'bi-comparison', words: ['我', '比', '他', '高'] },
            { cn: '这个和那个一样。', py: 'Zhège hé nàge yīyàng.', es: 'Este y ese son iguales.', grammar: 'yiyang-same', words: ['这个', '和', '那个', '一样'] },

            // Common expressions
            { cn: '没问题！', py: 'Méi wèntí!', es: '¡No hay problema!', grammar: 'mei-negation', words: ['没', '问题'] },
            { cn: '太好了！', py: 'Tài hǎo le!', es: '¡Genial!', grammar: 'tai-too', words: ['太', '好', '了'] },
            { cn: '对不起，我来晚了。', py: 'Duìbuqǐ, wǒ lái wǎn le.', es: 'Lo siento, llegué tarde.', grammar: 'le-completed', words: ['对不起', '我', '来', '晚', '了'] },
            { cn: '慢慢吃。', py: 'Màn man chī.', es: 'Come despacio.', grammar: 'reduplication', words: ['慢', '吃'] },
            { cn: '我听不懂。', py: 'Wǒ tīng bù dǒng.', es: 'No entiendo (al escuchar).', grammar: 'complement', words: ['我', '听', '不', '懂'] },
            { cn: '再说一遍。', py: 'Zài shuō yī biàn.', es: 'Repite otra vez.', grammar: 'zai-again', words: ['再', '说', '一', '遍'] }
        ]
        // HSK 2-6 sentences will be added as separate arrays
        // 2: [], 3: [], 4: [], 5: [], 6: []
    },

    // Grammar patterns explanation
    grammarPatterns: {
        'greeting': { name: 'Saludo básico', structure: 'Subject + 好' },
        'question-ma': { name: 'Pregunta con 吗', structure: 'Statement + 吗？' },
        'hen-adj': { name: 'Muy + Adjetivo', structure: 'Subject + 很 + Adj' },
        'question-shenme': { name: 'Pregunta con 什么', structure: '...什么...？' },
        'basic-svo': { name: 'Sujeto-Verbo-Objeto', structure: 'S + V + O' },
        'shi-sentence': { name: 'Oración con 是', structure: 'A 是 B' },
        'question-na': { name: 'Pregunta con 哪', structure: '哪 + Noun？' },
        'question-ji': { name: 'Pregunta con 几', structure: '几 + MW + N？' },
        'you-sentence': { name: 'Oración con 有', structure: 'Place + 有 + Object' },
        'zai-location': { name: 'Ubicación con 在', structure: 'Subject + 在 + Place' },
        'zai-progressive': { name: 'Progresivo con 在', structure: 'Subject + 在 + Verb' },
        'time-word-position': { name: 'Posición de tiempo', structure: 'S + Time + V + O' },
        'xiang-want': { name: 'Querer con 想', structure: 'Subject + 想 + Verb' },
        'xihuan-like': { name: 'Gustar con 喜欢', structure: 'Subject + 喜欢 + Verb/N' },
        'neng-can': { name: 'Poder con 能', structure: 'Subject + 能 + Verb' },
        'hui-can': { name: 'Saber con 会', structure: 'Subject + 会 + Verb' },
        'hui-future': { name: 'Futuro con 会', structure: 'Subject + 会 + Verb' },
        'bu-negation': { name: 'Negación con 不', structure: 'Subject + 不 + Verb' },
        'mei-negation': { name: 'Negación con 没', structure: '没 + 有/Verb' },
        'le-completed': { name: 'Aspecto completado 了', structure: 'Verb + 了' },
        'bi-comparison': { name: 'Comparación con 比', structure: 'A 比 B + Adj' },
        'qing-polite': { name: 'Cortesía con 请', structure: '请 + Verb' },
        'tai-too': { name: 'Demasiado con 太', structure: '太 + Adj + 了' },
        'zui-superlative': { name: 'Superlativo con 最', structure: '最 + Adj' }
    },

    // Get sentences by level
    getByLevel(level) {
        return this.sentences[level] || [];
    },

    // Get random sentence from level
    getRandom(level) {
        const levelSentences = this.sentences[level];
        if (!levelSentences || levelSentences.length === 0) return null;
        return levelSentences[Math.floor(Math.random() * levelSentences.length)];
    },

    // Get sentences containing specific word
    getByWord(word, level = null) {
        const results = [];
        const levels = level ? [level] : Object.keys(this.sentences);

        for (const lvl of levels) {
            const levelSentences = this.sentences[lvl];
            if (levelSentences) {
                for (const sentence of levelSentences) {
                    if (sentence.words && sentence.words.includes(word)) {
                        results.push({ ...sentence, level: lvl });
                    }
                }
            }
        }
        return results;
    },

    // Get sentences by grammar pattern
    getByGrammar(pattern, level = null) {
        const results = [];
        const levels = level ? [level] : Object.keys(this.sentences);

        for (const lvl of levels) {
            const levelSentences = this.sentences[lvl];
            if (levelSentences) {
                for (const sentence of levelSentences) {
                    if (sentence.grammar === pattern) {
                        results.push({ ...sentence, level: lvl });
                    }
                }
            }
        }
        return results;
    },

    // Get grammar pattern explanation
    getGrammarExplanation(pattern) {
        return this.grammarPatterns[pattern] || null;
    },

    // Add sentences for a level (for future expansion)
    addSentences(level, sentences) {
        if (!this.sentences[level]) {
            this.sentences[level] = [];
        }
        this.sentences[level].push(...sentences);
    },

    // Get sentence count by level
    getCounts() {
        const counts = {};
        for (const [level, sentences] of Object.entries(this.sentences)) {
            counts[level] = sentences.length;
        }
        return counts;
    },

    // Get all available grammar patterns in a level
    getGrammarPatternsByLevel(level) {
        const patterns = new Set();
        const levelSentences = this.sentences[level];
        if (levelSentences) {
            for (const sentence of levelSentences) {
                if (sentence.grammar) {
                    patterns.add(sentence.grammar);
                }
            }
        }
        return Array.from(patterns);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SentenceBank;
}
