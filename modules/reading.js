// ===== Reading Comprehension Module - HSK Learning =====
// Textos de lectura con preguntas de comprensión HSK1

const ReadingModule = {
    currentText: null,
    currentIndex: 0,
    score: 0,

    // ===== Banco de Textos HSK1 =====
    textBank: {
        1: [
            {
                id: 1,
                title: '自我介绍 (Presentación Personal)',
                text: '你好！我叫王明。我是中国人。我今年二十岁。我是学生。我在北京大学学习。我喜欢看书和听音乐。',
                pinyin: 'Nǐ hǎo! Wǒ jiào Wáng Míng. Wǒ shì Zhōngguó rén. Wǒ jīnnián èrshí suì. Wǒ shì xuéshēng. Wǒ zài Běijīng Dàxué xuéxí. Wǒ xǐhuān kàn shū hé tīng yīnyuè.',
                translation: '¡Hola! Me llamo Wang Ming. Soy chino. Tengo 20 años. Soy estudiante. Estudio en la Universidad de Beijing. Me gusta leer y escuchar música.',
                vocabulary: ['王明', '中国人', '二十岁', '学生', '北京大学', '看书', '听音乐'],
                questions: [
                    {
                        question: '他叫什么名字？',
                        questionEs: '¿Cómo se llama?',
                        options: ['李明', '王明', '张明', '刘明'],
                        correct: 1
                    },
                    {
                        question: '他是哪国人？',
                        questionEs: '¿De qué país es?',
                        options: ['日本人', '美国人', '中国人', '英国人'],
                        correct: 2
                    },
                    {
                        question: '他多大？',
                        questionEs: '¿Cuántos años tiene?',
                        options: ['18岁', '19岁', '20岁', '21岁'],
                        correct: 2
                    },
                    {
                        question: '他喜欢做什么？',
                        questionEs: '¿Qué le gusta hacer?',
                        options: ['看电影', '看书', '打球', '游泳'],
                        correct: 1
                    }
                ]
            },
            {
                id: 2,
                title: '我的家 (Mi Familia)',
                text: '我家有四口人：爸爸、妈妈、姐姐和我。爸爸是医生，妈妈是老师。姐姐在公司工作。我们住在上海。我们家有一只狗，它叫小白。',
                pinyin: 'Wǒ jiā yǒu sì kǒu rén: bàba, māma, jiějie hé wǒ. Bàba shì yīshēng, māma shì lǎoshī. Jiějie zài gōngsī gōngzuò. Wǒmen zhù zài Shànghǎi. Wǒmen jiā yǒu yī zhī gǒu, tā jiào Xiǎo Bái.',
                translation: 'Mi familia tiene 4 personas: papá, mamá, hermana mayor y yo. Papá es médico, mamá es profesora. Mi hermana trabaja en una empresa. Vivimos en Shanghai. Nuestra familia tiene un perro, se llama Xiao Bai.',
                vocabulary: ['四口人', '爸爸', '妈妈', '姐姐', '医生', '老师', '公司', '上海', '狗'],
                questions: [
                    {
                        question: '他家有几口人？',
                        questionEs: '¿Cuántas personas hay en su familia?',
                        options: ['三口人', '四口人', '五口人', '六口人'],
                        correct: 1
                    },
                    {
                        question: '爸爸做什么工作？',
                        questionEs: '¿En qué trabaja el papá?',
                        options: ['老师', '医生', '工人', '司机'],
                        correct: 1
                    },
                    {
                        question: '他们住在哪里？',
                        questionEs: '¿Dónde viven?',
                        options: ['北京', '上海', '广州', '深圳'],
                        correct: 1
                    },
                    {
                        question: '他们家的狗叫什么？',
                        questionEs: '¿Cómo se llama el perro?',
                        options: ['小黑', '小白', '小花', '小明'],
                        correct: 1
                    }
                ]
            },
            {
                id: 3,
                title: '在商店 (En la Tienda)',
                text: '今天我去商店买东西。我买了一件衣服和一双鞋。衣服是红色的，很漂亮。鞋是黑色的。衣服八十块钱，鞋一百二十块钱。一共两百块钱。',
                pinyin: 'Jīntiān wǒ qù shāngdiàn mǎi dōngxi. Wǒ mǎile yī jiàn yīfu hé yī shuāng xié. Yīfu shì hóngsè de, hěn piàoliang. Xié shì hēisè de. Yīfu bāshí kuài qián, xié yībǎi èrshí kuài qián. Yīgòng liǎngbǎi kuài qián.',
                translation: 'Hoy fui a la tienda a comprar cosas. Compré una prenda de ropa y un par de zapatos. La ropa es roja, muy bonita. Los zapatos son negros. La ropa cuesta 80 yuan, los zapatos 120 yuan. En total 200 yuan.',
                vocabulary: ['商店', '买东西', '衣服', '鞋', '红色', '黑色', '块钱', '一共'],
                questions: [
                    {
                        question: '他去哪里了？',
                        questionEs: '¿A dónde fue?',
                        options: ['学校', '医院', '商店', '饭店'],
                        correct: 2
                    },
                    {
                        question: '衣服是什么颜色？',
                        questionEs: '¿De qué color es la ropa?',
                        options: ['黑色', '白色', '红色', '蓝色'],
                        correct: 2
                    },
                    {
                        question: '鞋多少钱？',
                        questionEs: '¿Cuánto cuestan los zapatos?',
                        options: ['80块', '100块', '120块', '200块'],
                        correct: 2
                    },
                    {
                        question: '一共多少钱？',
                        questionEs: '¿Cuánto es el total?',
                        options: ['150块', '180块', '200块', '220块'],
                        correct: 2
                    }
                ]
            },
            {
                id: 4,
                title: '我的一天 (Mi Día)',
                text: '我每天早上六点起床。七点吃早饭。八点去学校上课。中午十二点吃午饭。下午五点回家。晚上我做作业，然后看电视。十点睡觉。',
                pinyin: 'Wǒ měitiān zǎoshang liù diǎn qǐchuáng. Qī diǎn chī zǎofàn. Bā diǎn qù xuéxiào shàngkè. Zhōngwǔ shí\'èr diǎn chī wǔfàn. Xiàwǔ wǔ diǎn huíjiā. Wǎnshang wǒ zuò zuòyè, ránhòu kàn diànshì. Shí diǎn shuìjiào.',
                translation: 'Me levanto todos los días a las 6 de la mañana. Desayuno a las 7. Voy a la escuela a las 8. Almuerzo a las 12 del mediodía. Vuelvo a casa a las 5 de la tarde. Por la noche hago tarea, luego veo televisión. Me duermo a las 10.',
                vocabulary: ['起床', '早饭', '上课', '午饭', '回家', '作业', '电视', '睡觉'],
                questions: [
                    {
                        question: '他几点起床？',
                        questionEs: '¿A qué hora se levanta?',
                        options: ['五点', '六点', '七点', '八点'],
                        correct: 1
                    },
                    {
                        question: '他几点去学校？',
                        questionEs: '¿A qué hora va a la escuela?',
                        options: ['七点', '八点', '九点', '十点'],
                        correct: 1
                    },
                    {
                        question: '他几点吃午饭？',
                        questionEs: '¿A qué hora almuerza?',
                        options: ['十一点', '十二点', '一点', '两点'],
                        correct: 1
                    },
                    {
                        question: '晚上他做什么？',
                        questionEs: '¿Qué hace por la noche?',
                        options: ['看书', '做作业', '听音乐', '打球'],
                        correct: 1
                    }
                ]
            },
            {
                id: 5,
                title: '天气 (El Clima)',
                text: '今天天气很好，是晴天。昨天下雨了，很冷。明天会有点热。这个星期六我想去公园。如果天气好，我和朋友一起去。',
                pinyin: 'Jīntiān tiānqì hěn hǎo, shì qíngtiān. Zuótiān xiàyǔ le, hěn lěng. Míngtiān huì yǒudiǎn rè. Zhège xīngqīliù wǒ xiǎng qù gōngyuán. Rúguǒ tiānqì hǎo, wǒ hé péngyou yīqǐ qù.',
                translation: 'Hoy el clima está muy bueno, está soleado. Ayer llovió, hacía frío. Mañana hará un poco de calor. Este sábado quiero ir al parque. Si el clima está bueno, iré con mi amigo.',
                vocabulary: ['天气', '晴天', '下雨', '冷', '热', '公园', '朋友'],
                questions: [
                    {
                        question: '今天天气怎么样？',
                        questionEs: '¿Cómo está el clima hoy?',
                        options: ['下雨', '很冷', '很好', '很热'],
                        correct: 2
                    },
                    {
                        question: '昨天天气怎么样？',
                        questionEs: '¿Cómo estuvo el clima ayer?',
                        options: ['晴天', '下雨', '很热', '有风'],
                        correct: 1
                    },
                    {
                        question: '他星期六想去哪里？',
                        questionEs: '¿A dónde quiere ir el sábado?',
                        options: ['学校', '商店', '公园', '医院'],
                        correct: 2
                    },
                    {
                        question: '他想和谁一起去？',
                        questionEs: '¿Con quién quiere ir?',
                        options: ['家人', '老师', '朋友', '同学'],
                        correct: 2
                    }
                ]
            },
            {
                id: 6,
                title: '在饭店 (En el Restaurante)',
                text: '服务员：您好，请问您想吃什么？\n客人：我要一碗米饭，一个菜。\n服务员：好的。您想喝什么？\n客人：一杯茶，谢谢。\n服务员：好的，请等一下。',
                pinyin: 'Fúwùyuán: Nín hǎo, qǐngwèn nín xiǎng chī shénme?\nKèrén: Wǒ yào yī wǎn mǐfàn, yī gè cài.\nFúwùyuán: Hǎo de. Nín xiǎng hē shénme?\nKèrén: Yī bēi chá, xièxie.\nFúwùyuán: Hǎo de, qǐng děng yīxià.',
                translation: 'Mesero: Hola, ¿qué desea comer?\nCliente: Quiero un tazón de arroz y un plato.\nMesero: De acuerdo. ¿Qué desea beber?\nCliente: Una taza de té, gracias.\nMesero: De acuerdo, espere un momento por favor.',
                vocabulary: ['服务员', '米饭', '菜', '茶', '请等一下'],
                questions: [
                    {
                        question: '客人要吃什么？',
                        questionEs: '¿Qué quiere comer el cliente?',
                        options: ['面条', '米饭', '饺子', '包子'],
                        correct: 1
                    },
                    {
                        question: '客人要喝什么？',
                        questionEs: '¿Qué quiere beber el cliente?',
                        options: ['咖啡', '水', '茶', '果汁'],
                        correct: 2
                    }
                ]
            }
        ]
    },

    // ===== Inicialización =====
    init() {
        console.log('✓ Reading Module inicializado');
    },

    // ===== Obtener Textos =====
    getTexts(level = 1) {
        return this.textBank[level] || this.textBank[1];
    },

    getTextById(id, level = 1) {
        const texts = this.getTexts(level);
        return texts.find(t => t.id === id);
    },

    getRandomText(level = 1) {
        const texts = this.getTexts(level);
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    },

    // ===== Iniciar Ejercicio de Lectura =====
    startReading(textId, level = 1) {
        this.currentText = this.getTextById(textId, level) || this.getRandomText(level);
        this.currentIndex = 0;
        this.score = 0;
        return this.currentText;
    },

    // ===== Obtener Pregunta Actual =====
    getCurrentQuestion() {
        if (!this.currentText || this.currentIndex >= this.currentText.questions.length) {
            return null;
        }
        return this.currentText.questions[this.currentIndex];
    },

    // ===== Verificar Respuesta =====
    checkAnswer(selectedIndex) {
        const question = this.getCurrentQuestion();
        if (!question) return null;

        const correct = selectedIndex === question.correct;
        if (correct) this.score++;

        return {
            correct,
            correctAnswer: question.options[question.correct],
            selectedAnswer: question.options[selectedIndex]
        };
    },

    // ===== Siguiente Pregunta =====
    nextQuestion() {
        this.currentIndex++;
        return this.getCurrentQuestion();
    },

    // ===== Obtener Resultados =====
    getResults() {
        if (!this.currentText) return null;

        return {
            textId: this.currentText.id,
            title: this.currentText.title,
            score: this.score,
            total: this.currentText.questions.length,
            percentage: Math.round((this.score / this.currentText.questions.length) * 100),
            passed: this.score >= this.currentText.questions.length * 0.6
        };
    },

    // ===== Leer Texto en Voz Alta =====
    readText(rate = 0.7) {
        if (!this.currentText) return;

        const text = this.currentText.text.replace(/\n/g, ' ');
        if (typeof SpeechModule !== 'undefined' && SpeechModule.synthesis) {
            SpeechModule.speak(text, { rate });
        } else if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = rate;
            speechSynthesis.speak(utterance);
        }
    }
};
