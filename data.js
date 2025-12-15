// ===== HSK1 Complete Vocabulary Database =====
// 150 palabras organizadas por lección

const HSK1_VOCABULARY = [
    // ===== Lección 1: 你好 (Nǐ hǎo) - Hola =====
    { id: 1, lesson: 1, hanzi: "你", pinyin: "nǐ", meaning: "tú", tone: 3, type: "pronoun", example: { cn: "你好！", py: "Nǐ hǎo!", es: "¡Hola!" } },
    { id: 2, lesson: 1, hanzi: "好", pinyin: "hǎo", meaning: "bueno, bien", tone: 3, type: "adj", example: { cn: "很好", py: "hěn hǎo", es: "muy bien" } },
    { id: 3, lesson: 1, hanzi: "您", pinyin: "nín", meaning: "usted (formal)", tone: 2, type: "pronoun", example: { cn: "您好！", py: "Nín hǎo!", es: "¡Hola! (formal)" } },
    { id: 4, lesson: 1, hanzi: "你们", pinyin: "nǐmen", meaning: "ustedes", tone: 3, type: "pronoun", example: { cn: "你们好！", py: "Nǐmen hǎo!", es: "¡Hola a todos!" } },
    { id: 5, lesson: 1, hanzi: "对不起", pinyin: "duìbuqǐ", meaning: "lo siento, disculpa", tone: 4, type: "expression", example: { cn: "对不起，我来晚了。", py: "Duìbuqǐ, wǒ lái wǎn le.", es: "Lo siento, llegué tarde." } },
    { id: 6, lesson: 1, hanzi: "没关系", pinyin: "méi guānxi", meaning: "no importa, está bien", tone: 2, type: "expression", example: { cn: "没关系。", py: "Méi guānxi.", es: "No importa." } },

    // ===== Lección 2: 谢谢你 (Xièxie nǐ) - Gracias =====
    { id: 7, lesson: 2, hanzi: "谢谢", pinyin: "xièxie", meaning: "gracias", tone: 4, type: "expression", example: { cn: "谢谢你！", py: "Xièxie nǐ!", es: "¡Gracias!" } },
    { id: 8, lesson: 2, hanzi: "不客气", pinyin: "bú kèqi", meaning: "de nada", tone: 4, type: "expression", example: { cn: "不客气。", py: "Bú kèqi.", es: "De nada." } },
    { id: 9, lesson: 2, hanzi: "不", pinyin: "bù", meaning: "no (negación)", tone: 4, type: "adverb", example: { cn: "我不是学生。", py: "Wǒ bú shì xuésheng.", es: "No soy estudiante." } },
    { id: 10, lesson: 2, hanzi: "再见", pinyin: "zàijiàn", meaning: "adiós", tone: 4, type: "expression", example: { cn: "再见！", py: "Zàijiàn!", es: "¡Adiós!" } },

    // ===== Lección 3: 你叫什么名字 (Nǐ jiào shénme míngzi) =====
    { id: 11, lesson: 3, hanzi: "叫", pinyin: "jiào", meaning: "llamarse", tone: 4, type: "verb", example: { cn: "我叫李明。", py: "Wǒ jiào Lǐ Míng.", es: "Me llamo Li Ming." } },
    { id: 12, lesson: 3, hanzi: "什么", pinyin: "shénme", meaning: "qué", tone: 2, type: "question", example: { cn: "这是什么？", py: "Zhè shì shénme?", es: "¿Qué es esto?" } },
    { id: 13, lesson: 3, hanzi: "名字", pinyin: "míngzi", meaning: "nombre", tone: 2, type: "noun", example: { cn: "你叫什么名字？", py: "Nǐ jiào shénme míngzi?", es: "¿Cómo te llamas?" } },
    { id: 14, lesson: 3, hanzi: "我", pinyin: "wǒ", meaning: "yo", tone: 3, type: "pronoun", example: { cn: "我是学生。", py: "Wǒ shì xuésheng.", es: "Soy estudiante." } },
    { id: 15, lesson: 3, hanzi: "是", pinyin: "shì", meaning: "ser, estar", tone: 4, type: "verb", example: { cn: "他是老师。", py: "Tā shì lǎoshī.", es: "Él es profesor." } },
    { id: 16, lesson: 3, hanzi: "老师", pinyin: "lǎoshī", meaning: "profesor/a", tone: 3, type: "noun", example: { cn: "她是老师。", py: "Tā shì lǎoshī.", es: "Ella es profesora." } },
    { id: 17, lesson: 3, hanzi: "吗", pinyin: "ma", meaning: "partícula interrogativa", tone: 0, type: "particle", example: { cn: "你是学生吗？", py: "Nǐ shì xuésheng ma?", es: "¿Eres estudiante?" } },
    { id: 18, lesson: 3, hanzi: "学生", pinyin: "xuésheng", meaning: "estudiante", tone: 2, type: "noun", example: { cn: "我是学生。", py: "Wǒ shì xuésheng.", es: "Soy estudiante." } },
    { id: 19, lesson: 3, hanzi: "人", pinyin: "rén", meaning: "persona", tone: 2, type: "noun", example: { cn: "他是中国人。", py: "Tā shì Zhōngguórén.", es: "Él es chino." } },
    { id: 20, lesson: 3, hanzi: "中国", pinyin: "Zhōngguó", meaning: "China", tone: 1, type: "noun", example: { cn: "我去中国。", py: "Wǒ qù Zhōngguó.", es: "Voy a China." } },
    { id: 21, lesson: 3, hanzi: "美国", pinyin: "Měiguó", meaning: "Estados Unidos", tone: 3, type: "noun", example: { cn: "她是美国人。", py: "Tā shì Měiguórén.", es: "Ella es estadounidense." } },

    // ===== Lección 4: 她是我的汉语老师 (Tā shì wǒ de Hànyǔ lǎoshī) =====
    { id: 22, lesson: 4, hanzi: "她", pinyin: "tā", meaning: "ella", tone: 1, type: "pronoun", example: { cn: "她是我朋友。", py: "Tā shì wǒ péngyou.", es: "Ella es mi amiga." } },
    { id: 23, lesson: 4, hanzi: "他", pinyin: "tā", meaning: "él", tone: 1, type: "pronoun", example: { cn: "他是医生。", py: "Tā shì yīshēng.", es: "Él es médico." } },
    { id: 24, lesson: 4, hanzi: "谁", pinyin: "shéi", meaning: "quién", tone: 2, type: "question", example: { cn: "他是谁？", py: "Tā shì shéi?", es: "¿Quién es él?" } },
    { id: 25, lesson: 4, hanzi: "的", pinyin: "de", meaning: "partícula posesiva", tone: 0, type: "particle", example: { cn: "我的书", py: "wǒ de shū", es: "mi libro" } },
    { id: 26, lesson: 4, hanzi: "汉语", pinyin: "Hànyǔ", meaning: "idioma chino", tone: 4, type: "noun", example: { cn: "我学汉语。", py: "Wǒ xué Hànyǔ.", es: "Estudio chino." } },
    { id: 27, lesson: 4, hanzi: "呢", pinyin: "ne", meaning: "partícula interrogativa", tone: 0, type: "particle", example: { cn: "你呢？", py: "Nǐ ne?", es: "¿Y tú?" } },
    { id: 28, lesson: 4, hanzi: "同学", pinyin: "tóngxué", meaning: "compañero de clase", tone: 2, type: "noun", example: { cn: "他是我同学。", py: "Tā shì wǒ tóngxué.", es: "Él es mi compañero de clase." } },
    { id: 29, lesson: 4, hanzi: "朋友", pinyin: "péngyou", meaning: "amigo/a", tone: 2, type: "noun", example: { cn: "她是我的朋友。", py: "Tā shì wǒ de péngyou.", es: "Ella es mi amiga." } },
    { id: 30, lesson: 4, hanzi: "哪", pinyin: "nǎ", meaning: "cuál, qué", tone: 3, type: "question", example: { cn: "你是哪国人？", py: "Nǐ shì nǎ guó rén?", es: "¿De qué país eres?" } },

    // ===== Lección 5: 她女儿今年二十岁 (Tā nǚ'ér jīnnián èrshí suì) =====
    { id: 31, lesson: 5, hanzi: "家", pinyin: "jiā", meaning: "casa, familia", tone: 1, type: "noun", example: { cn: "我的家", py: "wǒ de jiā", es: "mi casa" } },
    { id: 32, lesson: 5, hanzi: "有", pinyin: "yǒu", meaning: "tener, haber", tone: 3, type: "verb", example: { cn: "我有三个朋友。", py: "Wǒ yǒu sān gè péngyou.", es: "Tengo tres amigos." } },
    { id: 33, lesson: 5, hanzi: "口", pinyin: "kǒu", meaning: "boca, clasificador de personas", tone: 3, type: "noun", example: { cn: "我家有五口人。", py: "Wǒ jiā yǒu wǔ kǒu rén.", es: "Mi familia tiene 5 personas." } },
    { id: 34, lesson: 5, hanzi: "女儿", pinyin: "nǚ'ér", meaning: "hija", tone: 3, type: "noun", example: { cn: "她的女儿很漂亮。", py: "Tā de nǚ'ér hěn piàoliang.", es: "Su hija es muy bonita." } },
    { id: 35, lesson: 5, hanzi: "几", pinyin: "jǐ", meaning: "cuántos (pequeño)", tone: 3, type: "question", example: { cn: "你几岁？", py: "Nǐ jǐ suì?", es: "¿Cuántos años tienes?" } },
    { id: 36, lesson: 5, hanzi: "岁", pinyin: "suì", meaning: "año (edad)", tone: 4, type: "noun", example: { cn: "我二十岁。", py: "Wǒ èrshí suì.", es: "Tengo 20 años." } },
    { id: 37, lesson: 5, hanzi: "了", pinyin: "le", meaning: "partícula de cambio/completado", tone: 0, type: "particle", example: { cn: "我吃了。", py: "Wǒ chī le.", es: "Ya comí." } },
    { id: 38, lesson: 5, hanzi: "今年", pinyin: "jīnnián", meaning: "este año", tone: 1, type: "noun", example: { cn: "今年是2024年。", py: "Jīnnián shì èr líng èr sì nián.", es: "Este año es 2024." } },
    { id: 39, lesson: 5, hanzi: "儿子", pinyin: "érzi", meaning: "hijo", tone: 2, type: "noun", example: { cn: "他有一个儿子。", py: "Tā yǒu yí gè érzi.", es: "Él tiene un hijo." } },
    { id: 40, lesson: 5, hanzi: "爸爸", pinyin: "bàba", meaning: "papá", tone: 4, type: "noun", example: { cn: "我爸爸是老师。", py: "Wǒ bàba shì lǎoshī.", es: "Mi papá es profesor." } },
    { id: 41, lesson: 5, hanzi: "妈妈", pinyin: "māma", meaning: "mamá", tone: 1, type: "noun", example: { cn: "我妈妈很好。", py: "Wǒ māma hěn hǎo.", es: "Mi mamá está bien." } },

    // ===== Lección 6: 我会说汉语 (Wǒ huì shuō Hànyǔ) =====
    { id: 42, lesson: 6, hanzi: "会", pinyin: "huì", meaning: "saber (habilidad), poder", tone: 4, type: "verb", example: { cn: "我会说汉语。", py: "Wǒ huì shuō Hànyǔ.", es: "Sé hablar chino." } },
    { id: 43, lesson: 6, hanzi: "说", pinyin: "shuō", meaning: "hablar, decir", tone: 1, type: "verb", example: { cn: "请说。", py: "Qǐng shuō.", es: "Por favor, habla." } },
    { id: 44, lesson: 6, hanzi: "菜", pinyin: "cài", meaning: "verdura, plato", tone: 4, type: "noun", example: { cn: "中国菜很好吃。", py: "Zhōngguó cài hěn hǎochī.", es: "La comida china es deliciosa." } },
    { id: 45, lesson: 6, hanzi: "很", pinyin: "hěn", meaning: "muy", tone: 3, type: "adverb", example: { cn: "很好！", py: "Hěn hǎo!", es: "¡Muy bien!" } },
    { id: 46, lesson: 6, hanzi: "好吃", pinyin: "hǎochī", meaning: "delicioso", tone: 3, type: "adj", example: { cn: "这个菜很好吃。", py: "Zhège cài hěn hǎochī.", es: "Este plato es delicioso." } },
    { id: 47, lesson: 6, hanzi: "做", pinyin: "zuò", meaning: "hacer", tone: 4, type: "verb", example: { cn: "我做中国菜。", py: "Wǒ zuò Zhōngguó cài.", es: "Hago comida china." } },
    { id: 48, lesson: 6, hanzi: "写", pinyin: "xiě", meaning: "escribir", tone: 3, type: "verb", example: { cn: "我写汉字。", py: "Wǒ xiě Hànzì.", es: "Escribo caracteres chinos." } },
    { id: 49, lesson: 6, hanzi: "字", pinyin: "zì", meaning: "carácter, letra", tone: 4, type: "noun", example: { cn: "这个字怎么写？", py: "Zhège zì zěnme xiě?", es: "¿Cómo se escribe este carácter?" } },
    { id: 50, lesson: 6, hanzi: "怎么", pinyin: "zěnme", meaning: "cómo (manera)", tone: 3, type: "question", example: { cn: "怎么做？", py: "Zěnme zuò?", es: "¿Cómo se hace?" } },
    { id: 51, lesson: 6, hanzi: "读", pinyin: "dú", meaning: "leer", tone: 2, type: "verb", example: { cn: "读书", py: "dú shū", es: "leer libros" } },

    // ===== Lección 7: 今天几号 (Jīntiān jǐ hào) =====
    { id: 52, lesson: 7, hanzi: "请", pinyin: "qǐng", meaning: "por favor, invitar", tone: 3, type: "verb", example: { cn: "请坐。", py: "Qǐng zuò.", es: "Por favor, siéntese." } },
    { id: 53, lesson: 7, hanzi: "问", pinyin: "wèn", meaning: "preguntar", tone: 4, type: "verb", example: { cn: "我问你一个问题。", py: "Wǒ wèn nǐ yí gè wèntí.", es: "Te hago una pregunta." } },
    { id: 54, lesson: 7, hanzi: "今天", pinyin: "jīntiān", meaning: "hoy", tone: 1, type: "noun", example: { cn: "今天几号？", py: "Jīntiān jǐ hào?", es: "¿Qué fecha es hoy?" } },
    { id: 55, lesson: 7, hanzi: "号", pinyin: "hào", meaning: "día del mes, número", tone: 4, type: "noun", example: { cn: "今天是五号。", py: "Jīntiān shì wǔ hào.", es: "Hoy es el día 5." } },
    { id: 56, lesson: 7, hanzi: "月", pinyin: "yuè", meaning: "mes, luna", tone: 4, type: "noun", example: { cn: "一月", py: "yī yuè", es: "enero" } },
    { id: 57, lesson: 7, hanzi: "星期", pinyin: "xīngqī", meaning: "semana", tone: 1, type: "noun", example: { cn: "星期一", py: "xīngqī yī", es: "lunes" } },
    { id: 58, lesson: 7, hanzi: "昨天", pinyin: "zuótiān", meaning: "ayer", tone: 2, type: "noun", example: { cn: "昨天我很忙。", py: "Zuótiān wǒ hěn máng.", es: "Ayer estuve muy ocupado." } },
    { id: 59, lesson: 7, hanzi: "明天", pinyin: "míngtiān", meaning: "mañana", tone: 2, type: "noun", example: { cn: "明天见！", py: "Míngtiān jiàn!", es: "¡Hasta mañana!" } },
    { id: 60, lesson: 7, hanzi: "去", pinyin: "qù", meaning: "ir", tone: 4, type: "verb", example: { cn: "我去学校。", py: "Wǒ qù xuéxiào.", es: "Voy a la escuela." } },
    { id: 61, lesson: 7, hanzi: "学校", pinyin: "xuéxiào", meaning: "escuela", tone: 2, type: "noun", example: { cn: "这是我的学校。", py: "Zhè shì wǒ de xuéxiào.", es: "Esta es mi escuela." } },
    { id: 62, lesson: 7, hanzi: "书", pinyin: "shū", meaning: "libro", tone: 1, type: "noun", example: { cn: "这本书很好。", py: "Zhè běn shū hěn hǎo.", es: "Este libro es bueno." } },
    { id: 63, lesson: 7, hanzi: "看", pinyin: "kàn", meaning: "ver, mirar, leer", tone: 4, type: "verb", example: { cn: "看书", py: "kàn shū", es: "leer un libro" } },
    { id: 64, lesson: 7, hanzi: "年", pinyin: "nián", meaning: "año", tone: 2, type: "noun", example: { cn: "2024年", py: "èr líng èr sì nián", es: "año 2024" } },

    // ===== Lección 8: 我想喝茶 (Wǒ xiǎng hē chá) =====
    { id: 65, lesson: 8, hanzi: "想", pinyin: "xiǎng", meaning: "querer, pensar", tone: 3, type: "verb", example: { cn: "我想喝茶。", py: "Wǒ xiǎng hē chá.", es: "Quiero beber té." } },
    { id: 66, lesson: 8, hanzi: "喝", pinyin: "hē", meaning: "beber", tone: 1, type: "verb", example: { cn: "喝水", py: "hē shuǐ", es: "beber agua" } },
    { id: 67, lesson: 8, hanzi: "茶", pinyin: "chá", meaning: "té", tone: 2, type: "noun", example: { cn: "中国茶", py: "Zhōngguó chá", es: "té chino" } },
    { id: 68, lesson: 8, hanzi: "吃", pinyin: "chī", meaning: "comer", tone: 1, type: "verb", example: { cn: "吃饭", py: "chī fàn", es: "comer" } },
    { id: 69, lesson: 8, hanzi: "米饭", pinyin: "mǐfàn", meaning: "arroz cocido", tone: 3, type: "noun", example: { cn: "我吃米饭。", py: "Wǒ chī mǐfàn.", es: "Como arroz." } },
    { id: 70, lesson: 8, hanzi: "商店", pinyin: "shāngdiàn", meaning: "tienda", tone: 1, type: "noun", example: { cn: "去商店买东西。", py: "Qù shāngdiàn mǎi dōngxi.", es: "Ir a la tienda a comprar cosas." } },
    { id: 71, lesson: 8, hanzi: "买", pinyin: "mǎi", meaning: "comprar", tone: 3, type: "verb", example: { cn: "我买书。", py: "Wǒ mǎi shū.", es: "Compro un libro." } },
    { id: 72, lesson: 8, hanzi: "这", pinyin: "zhè", meaning: "este, esto", tone: 4, type: "pronoun", example: { cn: "这是什么？", py: "Zhè shì shénme?", es: "¿Qué es esto?" } },
    { id: 73, lesson: 8, hanzi: "那", pinyin: "nà", meaning: "ese, eso, aquel", tone: 4, type: "pronoun", example: { cn: "那是我的书。", py: "Nà shì wǒ de shū.", es: "Ese es mi libro." } },
    { id: 74, lesson: 8, hanzi: "多少", pinyin: "duōshao", meaning: "cuánto, cuántos", tone: 1, type: "question", example: { cn: "多少钱？", py: "Duōshao qián?", es: "¿Cuánto cuesta?" } },
    { id: 75, lesson: 8, hanzi: "钱", pinyin: "qián", meaning: "dinero", tone: 2, type: "noun", example: { cn: "这个多少钱？", py: "Zhège duōshao qián?", es: "¿Cuánto cuesta esto?" } },
    { id: 76, lesson: 8, hanzi: "块", pinyin: "kuài", meaning: "yuan (moneda)", tone: 4, type: "classifier", example: { cn: "十块钱", py: "shí kuài qián", es: "diez yuanes" } },
    { id: 77, lesson: 8, hanzi: "个", pinyin: "gè", meaning: "clasificador general", tone: 4, type: "classifier", example: { cn: "一个人", py: "yí gè rén", es: "una persona" } },
    { id: 78, lesson: 8, hanzi: "杯子", pinyin: "bēizi", meaning: "taza, vaso", tone: 1, type: "noun", example: { cn: "一个杯子", py: "yí gè bēizi", es: "una taza" } },
    { id: 79, lesson: 8, hanzi: "本", pinyin: "běn", meaning: "clasificador para libros", tone: 3, type: "classifier", example: { cn: "一本书", py: "yì běn shū", es: "un libro" } },

    // ===== Lección 9: 你儿子在哪儿工作 (Nǐ érzi zài nǎr gōngzuò) =====
    { id: 80, lesson: 9, hanzi: "小", pinyin: "xiǎo", meaning: "pequeño", tone: 3, type: "adj", example: { cn: "小猫", py: "xiǎo māo", es: "gatito" } },
    { id: 81, lesson: 9, hanzi: "猫", pinyin: "māo", meaning: "gato", tone: 1, type: "noun", example: { cn: "我有一只猫。", py: "Wǒ yǒu yì zhī māo.", es: "Tengo un gato." } },
    { id: 82, lesson: 9, hanzi: "在", pinyin: "zài", meaning: "estar en, en", tone: 4, type: "verb/prep", example: { cn: "我在家。", py: "Wǒ zài jiā.", es: "Estoy en casa." } },
    { id: 83, lesson: 9, hanzi: "哪儿", pinyin: "nǎr", meaning: "dónde", tone: 3, type: "question", example: { cn: "你在哪儿？", py: "Nǐ zài nǎr?", es: "¿Dónde estás?" } },
    { id: 84, lesson: 9, hanzi: "工作", pinyin: "gōngzuò", meaning: "trabajar, trabajo", tone: 1, type: "verb/noun", example: { cn: "我在医院工作。", py: "Wǒ zài yīyuàn gōngzuò.", es: "Trabajo en el hospital." } },
    { id: 85, lesson: 9, hanzi: "医院", pinyin: "yīyuàn", meaning: "hospital", tone: 1, type: "noun", example: { cn: "去医院", py: "qù yīyuàn", es: "ir al hospital" } },
    { id: 86, lesson: 9, hanzi: "医生", pinyin: "yīshēng", meaning: "médico, doctor", tone: 1, type: "noun", example: { cn: "他是医生。", py: "Tā shì yīshēng.", es: "Él es médico." } },
    { id: 87, lesson: 9, hanzi: "椅子", pinyin: "yǐzi", meaning: "silla", tone: 3, type: "noun", example: { cn: "一把椅子", py: "yì bǎ yǐzi", es: "una silla" } },
    { id: 88, lesson: 9, hanzi: "下面", pinyin: "xiàmian", meaning: "debajo, abajo", tone: 4, type: "noun", example: { cn: "桌子下面", py: "zhuōzi xiàmian", es: "debajo de la mesa" } },
    { id: 89, lesson: 9, hanzi: "狗", pinyin: "gǒu", meaning: "perro", tone: 3, type: "noun", example: { cn: "我喜欢狗。", py: "Wǒ xǐhuan gǒu.", es: "Me gustan los perros." } },
    { id: 90, lesson: 9, hanzi: "大", pinyin: "dà", meaning: "grande", tone: 4, type: "adj", example: { cn: "大学", py: "dàxué", es: "universidad" } },

    // ===== Lección 10: 我能坐这儿吗 (Wǒ néng zuò zhè'er ma) =====
    { id: 91, lesson: 10, hanzi: "桌子", pinyin: "zhuōzi", meaning: "mesa", tone: 1, type: "noun", example: { cn: "一张桌子", py: "yì zhāng zhuōzi", es: "una mesa" } },
    { id: 92, lesson: 10, hanzi: "上", pinyin: "shàng", meaning: "encima, arriba", tone: 4, type: "noun", example: { cn: "桌子上", py: "zhuōzi shàng", es: "encima de la mesa" } },
    { id: 93, lesson: 10, hanzi: "电脑", pinyin: "diànnǎo", meaning: "computadora", tone: 4, type: "noun", example: { cn: "我的电脑", py: "wǒ de diànnǎo", es: "mi computadora" } },
    { id: 94, lesson: 10, hanzi: "里", pinyin: "lǐ", meaning: "dentro", tone: 3, type: "noun", example: { cn: "房间里", py: "fángjiān lǐ", es: "dentro de la habitación" } },
    { id: 95, lesson: 10, hanzi: "这儿", pinyin: "zhè'er", meaning: "aquí", tone: 4, type: "pronoun", example: { cn: "我在这儿。", py: "Wǒ zài zhè'er.", es: "Estoy aquí." } },
    { id: 96, lesson: 10, hanzi: "没", pinyin: "méi", meaning: "no (negación de 有)", tone: 2, type: "adverb", example: { cn: "我没有钱。", py: "Wǒ méi yǒu qián.", es: "No tengo dinero." } },
    { id: 97, lesson: 10, hanzi: "坐", pinyin: "zuò", meaning: "sentarse", tone: 4, type: "verb", example: { cn: "请坐！", py: "Qǐng zuò!", es: "¡Por favor, siéntate!" } },
    { id: 98, lesson: 10, hanzi: "能", pinyin: "néng", meaning: "poder (permiso/capacidad)", tone: 2, type: "verb", example: { cn: "我能坐这儿吗？", py: "Wǒ néng zuò zhè'er ma?", es: "¿Puedo sentarme aquí?" } },
    { id: 99, lesson: 10, hanzi: "和", pinyin: "hé", meaning: "y, con", tone: 2, type: "conj", example: { cn: "我和他", py: "wǒ hé tā", es: "él y yo" } },
    { id: 100, lesson: 10, hanzi: "那儿", pinyin: "nàr", meaning: "allí", tone: 4, type: "pronoun", example: { cn: "他在那儿。", py: "Tā zài nàr.", es: "Él está allí." } },

    // ===== Lección 11: 现在几点 (Xiànzài jǐ diǎn) =====
    { id: 101, lesson: 11, hanzi: "现在", pinyin: "xiànzài", meaning: "ahora", tone: 4, type: "noun", example: { cn: "现在几点？", py: "Xiànzài jǐ diǎn?", es: "¿Qué hora es ahora?" } },
    { id: 102, lesson: 11, hanzi: "点", pinyin: "diǎn", meaning: "hora, punto", tone: 3, type: "noun", example: { cn: "三点", py: "sān diǎn", es: "las tres" } },
    { id: 103, lesson: 11, hanzi: "分", pinyin: "fēn", meaning: "minuto", tone: 1, type: "noun", example: { cn: "十分钟", py: "shí fēnzhōng", es: "diez minutos" } },
    { id: 104, lesson: 11, hanzi: "时候", pinyin: "shíhou", meaning: "momento, tiempo", tone: 2, type: "noun", example: { cn: "什么时候？", py: "Shénme shíhou?", es: "¿Cuándo?" } },
    { id: 105, lesson: 11, hanzi: "回", pinyin: "huí", meaning: "volver, regresar", tone: 2, type: "verb", example: { cn: "回家", py: "huí jiā", es: "volver a casa" } },
    { id: 106, lesson: 11, hanzi: "电影", pinyin: "diànyǐng", meaning: "película", tone: 4, type: "noun", example: { cn: "看电影", py: "kàn diànyǐng", es: "ver una película" } },
    { id: 107, lesson: 11, hanzi: "住", pinyin: "zhù", meaning: "vivir, quedarse", tone: 4, type: "verb", example: { cn: "我住在北京。", py: "Wǒ zhù zài Běijīng.", es: "Vivo en Beijing." } },
    { id: 108, lesson: 11, hanzi: "前", pinyin: "qián", meaning: "antes, delante", tone: 2, type: "noun", example: { cn: "三天前", py: "sān tiān qián", es: "hace tres días" } },
    { id: 109, lesson: 11, hanzi: "我们", pinyin: "wǒmen", meaning: "nosotros", tone: 3, type: "pronoun", example: { cn: "我们是学生。", py: "Wǒmen shì xuésheng.", es: "Somos estudiantes." } },
    { id: 110, lesson: 11, hanzi: "北京", pinyin: "Běijīng", meaning: "Beijing", tone: 3, type: "noun", example: { cn: "我去北京。", py: "Wǒ qù Běijīng.", es: "Voy a Beijing." } },
    { id: 111, lesson: 11, hanzi: "后", pinyin: "hòu", meaning: "después, detrás", tone: 4, type: "noun", example: { cn: "三天后", py: "sān tiān hòu", es: "en tres días" } },

    // ===== Lección 12: 明天天气怎么样 (Míngtiān tiānqì zěnmeyàng) =====
    { id: 112, lesson: 12, hanzi: "天气", pinyin: "tiānqì", meaning: "clima, tiempo", tone: 1, type: "noun", example: { cn: "今天天气很好。", py: "Jīntiān tiānqì hěn hǎo.", es: "Hoy hace buen tiempo." } },
    { id: 113, lesson: 12, hanzi: "怎么样", pinyin: "zěnmeyàng", meaning: "cómo (estado)", tone: 3, type: "question", example: { cn: "你怎么样？", py: "Nǐ zěnmeyàng?", es: "¿Cómo estás?" } },
    { id: 114, lesson: 12, hanzi: "太", pinyin: "tài", meaning: "demasiado", tone: 4, type: "adverb", example: { cn: "太热了！", py: "Tài rè le!", es: "¡Hace demasiado calor!" } },
    { id: 115, lesson: 12, hanzi: "热", pinyin: "rè", meaning: "caliente, calor", tone: 4, type: "adj", example: { cn: "今天很热。", py: "Jīntiān hěn rè.", es: "Hoy hace calor." } },
    { id: 116, lesson: 12, hanzi: "冷", pinyin: "lěng", meaning: "frío", tone: 3, type: "adj", example: { cn: "今天很冷。", py: "Jīntiān hěn lěng.", es: "Hoy hace frío." } },
    { id: 117, lesson: 12, hanzi: "下", pinyin: "xià", meaning: "bajar, caer", tone: 4, type: "verb", example: { cn: "下雨", py: "xià yǔ", es: "llover" } },
    { id: 118, lesson: 12, hanzi: "雨", pinyin: "yǔ", meaning: "lluvia", tone: 3, type: "noun", example: { cn: "下雨了。", py: "Xià yǔ le.", es: "Está lloviendo." } },
    { id: 119, lesson: 12, hanzi: "身体", pinyin: "shēntǐ", meaning: "cuerpo, salud", tone: 1, type: "noun", example: { cn: "身体好吗？", py: "Shēntǐ hǎo ma?", es: "¿Cómo está tu salud?" } },
    { id: 120, lesson: 12, hanzi: "爱", pinyin: "ài", meaning: "amar, gustar", tone: 4, type: "verb", example: { cn: "我爱你。", py: "Wǒ ài nǐ.", es: "Te amo." } },
    { id: 121, lesson: 12, hanzi: "水", pinyin: "shuǐ", meaning: "agua", tone: 3, type: "noun", example: { cn: "喝水", py: "hē shuǐ", es: "beber agua" } },
    { id: 122, lesson: 12, hanzi: "高兴", pinyin: "gāoxìng", meaning: "feliz, contento", tone: 1, type: "adj", example: { cn: "我很高兴。", py: "Wǒ hěn gāoxìng.", es: "Estoy muy feliz." } },

    // ===== Lección 13: 他在学做中国菜呢 (Tā zài xué zuò Zhōngguó cài ne) =====
    { id: 123, lesson: 13, hanzi: "上午", pinyin: "shàngwǔ", meaning: "mañana (AM)", tone: 4, type: "noun", example: { cn: "上午好！", py: "Shàngwǔ hǎo!", es: "¡Buenos días!" } },
    { id: 124, lesson: 13, hanzi: "睡觉", pinyin: "shuìjiào", meaning: "dormir", tone: 4, type: "verb", example: { cn: "我想睡觉。", py: "Wǒ xiǎng shuìjiào.", es: "Quiero dormir." } },
    { id: 125, lesson: 13, hanzi: "电视", pinyin: "diànshì", meaning: "televisión", tone: 4, type: "noun", example: { cn: "看电视", py: "kàn diànshì", es: "ver televisión" } },
    { id: 126, lesson: 13, hanzi: "喜欢", pinyin: "xǐhuan", meaning: "gustar", tone: 3, type: "verb", example: { cn: "我喜欢中国菜。", py: "Wǒ xǐhuan Zhōngguó cài.", es: "Me gusta la comida china." } },
    { id: 127, lesson: 13, hanzi: "给", pinyin: "gěi", meaning: "dar, para", tone: 3, type: "verb/prep", example: { cn: "给你。", py: "Gěi nǐ.", es: "Para ti." } },
    { id: 128, lesson: 13, hanzi: "打电话", pinyin: "dǎ diànhuà", meaning: "llamar por teléfono", tone: 3, type: "verb", example: { cn: "我给你打电话。", py: "Wǒ gěi nǐ dǎ diànhuà.", es: "Te llamo por teléfono." } },
    { id: 129, lesson: 13, hanzi: "吧", pinyin: "ba", meaning: "partícula sugerencia", tone: 0, type: "particle", example: { cn: "走吧！", py: "Zǒu ba!", es: "¡Vamos!" } },
    { id: 130, lesson: 13, hanzi: "喂", pinyin: "wèi", meaning: "hola (teléfono)", tone: 4, type: "interjection", example: { cn: "喂，你好！", py: "Wèi, nǐ hǎo!", es: "Hola (contestar teléfono)" } },
    { id: 131, lesson: 13, hanzi: "下午", pinyin: "xiàwǔ", meaning: "tarde (PM)", tone: 4, type: "noun", example: { cn: "下午好！", py: "Xiàwǔ hǎo!", es: "¡Buenas tardes!" } },
    { id: 132, lesson: 13, hanzi: "学", pinyin: "xué", meaning: "estudiar, aprender", tone: 2, type: "verb", example: { cn: "学汉语", py: "xué Hànyǔ", es: "estudiar chino" } },

    // ===== Lección 14: 她买了不少衣服 (Tā mǎi le bù shǎo yīfu) =====
    { id: 133, lesson: 14, hanzi: "东西", pinyin: "dōngxi", meaning: "cosa", tone: 1, type: "noun", example: { cn: "买东西", py: "mǎi dōngxi", es: "comprar cosas" } },
    { id: 134, lesson: 14, hanzi: "一点儿", pinyin: "yìdiǎnr", meaning: "un poco", tone: 4, type: "adverb", example: { cn: "我会说一点儿汉语。", py: "Wǒ huì shuō yìdiǎnr Hànyǔ.", es: "Sé hablar un poco de chino." } },
    { id: 135, lesson: 14, hanzi: "苹果", pinyin: "píngguǒ", meaning: "manzana", tone: 2, type: "noun", example: { cn: "我想吃苹果。", py: "Wǒ xiǎng chī píngguǒ.", es: "Quiero comer una manzana." } },
    { id: 136, lesson: 14, hanzi: "看见", pinyin: "kànjiàn", meaning: "ver, avistar", tone: 4, type: "verb", example: { cn: "我看见他了。", py: "Wǒ kànjiàn tā le.", es: "Lo vi." } },
    { id: 137, lesson: 14, hanzi: "衣服", pinyin: "yīfu", meaning: "ropa", tone: 1, type: "noun", example: { cn: "买衣服", py: "mǎi yīfu", es: "comprar ropa" } },
    { id: 138, lesson: 14, hanzi: "少", pinyin: "shǎo", meaning: "poco", tone: 3, type: "adj", example: { cn: "不少", py: "bù shǎo", es: "bastante (no poco)" } },
    { id: 139, lesson: 14, hanzi: "漂亮", pinyin: "piàoliang", meaning: "bonito, hermoso", tone: 4, type: "adj", example: { cn: "她很漂亮。", py: "Tā hěn piàoliang.", es: "Ella es muy bonita." } },
    { id: 140, lesson: 14, hanzi: "都", pinyin: "dōu", meaning: "todos, ambos", tone: 1, type: "adverb", example: { cn: "我们都是学生。", py: "Wǒmen dōu shì xuésheng.", es: "Todos somos estudiantes." } },
    { id: 141, lesson: 14, hanzi: "先生", pinyin: "xiānsheng", meaning: "señor", tone: 1, type: "noun", example: { cn: "李先生", py: "Lǐ xiānsheng", es: "Señor Li" } },
    { id: 142, lesson: 14, hanzi: "小姐", pinyin: "xiǎojiě", meaning: "señorita", tone: 3, type: "noun", example: { cn: "王小姐", py: "Wáng xiǎojiě", es: "Señorita Wang" } },

    // ===== Lección 15: 我是坐飞机来的 (Wǒ shì zuò fēijī lái de) =====
    { id: 143, lesson: 15, hanzi: "认识", pinyin: "rènshi", meaning: "conocer", tone: 4, type: "verb", example: { cn: "认识你很高兴。", py: "Rènshi nǐ hěn gāoxìng.", es: "Encantado de conocerte." } },
    { id: 144, lesson: 15, hanzi: "大学", pinyin: "dàxué", meaning: "universidad", tone: 4, type: "noun", example: { cn: "北京大学", py: "Běijīng Dàxué", es: "Universidad de Beijing" } },
    { id: 145, lesson: 15, hanzi: "饭店", pinyin: "fàndiàn", meaning: "restaurante, hotel", tone: 4, type: "noun", example: { cn: "中国饭店", py: "Zhōngguó fàndiàn", es: "restaurante chino" } },
    { id: 146, lesson: 15, hanzi: "出租车", pinyin: "chūzūchē", meaning: "taxi", tone: 1, type: "noun", example: { cn: "坐出租车", py: "zuò chūzūchē", es: "tomar un taxi" } },
    { id: 147, lesson: 15, hanzi: "一起", pinyin: "yìqǐ", meaning: "juntos", tone: 4, type: "adverb", example: { cn: "我们一起去。", py: "Wǒmen yìqǐ qù.", es: "Vamos juntos." } },
    { id: 148, lesson: 15, hanzi: "飞机", pinyin: "fēijī", meaning: "avión", tone: 1, type: "noun", example: { cn: "坐飞机", py: "zuò fēijī", es: "tomar un avión" } },
    { id: 149, lesson: 15, hanzi: "来", pinyin: "lái", meaning: "venir", tone: 2, type: "verb", example: { cn: "你来吗？", py: "Nǐ lái ma?", es: "¿Vienes?" } },
    { id: 150, lesson: 15, hanzi: "听", pinyin: "tīng", meaning: "escuchar", tone: 1, type: "verb", example: { cn: "听音乐", py: "tīng yīnyuè", es: "escuchar música" } }
];

// ===== Números en chino =====
const CHINESE_NUMBERS = [
    { hanzi: "零", pinyin: "líng", value: 0 },
    { hanzi: "一", pinyin: "yī", value: 1 },
    { hanzi: "二", pinyin: "èr", value: 2 },
    { hanzi: "三", pinyin: "sān", value: 3 },
    { hanzi: "四", pinyin: "sì", value: 4 },
    { hanzi: "五", pinyin: "wǔ", value: 5 },
    { hanzi: "六", pinyin: "liù", value: 6 },
    { hanzi: "七", pinyin: "qī", value: 7 },
    { hanzi: "八", pinyin: "bā", value: 8 },
    { hanzi: "九", pinyin: "jiǔ", value: 9 },
    { hanzi: "十", pinyin: "shí", value: 10 },
    { hanzi: "百", pinyin: "bǎi", value: 100 }
];

// ===== Información de las lecciones =====
const LESSONS_INFO = [
    { num: 1, title: "你好", subtitle: "Nǐ hǎo - Hola", topic: "Saludos básicos" },
    { num: 2, title: "谢谢你", subtitle: "Xièxie nǐ - Gracias", topic: "Expresiones de cortesía" },
    { num: 3, title: "你叫什么名字", subtitle: "¿Cómo te llamas?", topic: "Presentaciones" },
    { num: 4, title: "她是我的汉语老师", subtitle: "Ella es mi profesora de chino", topic: "Posesión y relaciones" },
    { num: 5, title: "她女儿今年二十岁", subtitle: "Su hija tiene 20 años", topic: "Familia y edad" },
    { num: 6, title: "我会说汉语", subtitle: "Sé hablar chino", topic: "Habilidades" },
    { num: 7, title: "今天几号", subtitle: "¿Qué fecha es hoy?", topic: "Fechas y días" },
    { num: 8, title: "我想喝茶", subtitle: "Quiero beber té", topic: "Comida y compras" },
    { num: 9, title: "你儿子在哪儿工作", subtitle: "¿Dónde trabaja tu hijo?", topic: "Ubicación y trabajo" },
    { num: 10, title: "我能坐这儿吗", subtitle: "¿Puedo sentarme aquí?", topic: "Permiso y existencia" },
    { num: 11, title: "现在几点", subtitle: "¿Qué hora es?", topic: "Hora y tiempo" },
    { num: 12, title: "明天天气怎么样", subtitle: "¿Cómo estará el clima?", topic: "Clima y estado" },
    { num: 13, title: "他在学做中国菜呢", subtitle: "Está aprendiendo a cocinar", topic: "Acciones en progreso" },
    { num: 14, title: "她买了不少衣服", subtitle: "Ella compró mucha ropa", topic: "Acciones completadas" },
    { num: 15, title: "我是坐飞机来的", subtitle: "Vine en avión", topic: "Énfasis y transporte" }
];

// ===== Radicales comunes HSK1 =====
const RADICALS = [
    { char: "氵", name: "三点水", meaning: "Agua", examples: ["汉", "没", "海", "法"] },
    { char: "讠", name: "言字旁", meaning: "Palabra/Habla", examples: ["说", "话", "谢", "请", "认", "读"] },
    { char: "口", name: "口字旁", meaning: "Boca", examples: ["吃", "喝", "吗", "呢", "叫", "听"] },
    { char: "女", name: "女字旁", meaning: "Mujer", examples: ["妈", "姐", "她", "好"] },
    { char: "亻", name: "单人旁", meaning: "Persona", examples: ["你", "他", "们", "做", "住", "什"] },
    { char: "钅", name: "金字旁", meaning: "Metal/Dinero", examples: ["钱", "钟"] },
    { char: "饣", name: "食字旁", meaning: "Comida", examples: ["饭", "饿"] },
    { char: "辶", name: "走之底", meaning: "Caminar", examples: ["这", "那", "道", "边"] },
    { char: "心", name: "心字底", meaning: "Corazón", examples: ["想", "您", "怎", "意"] },
    { char: "日", name: "日字旁", meaning: "Sol/Día", examples: ["明", "时", "星", "昨"] },
    { char: "月", name: "月字旁", meaning: "Luna/Cuerpo", examples: ["朋", "服"] },
    { char: "宀", name: "宝盖头", meaning: "Techo/Casa", examples: ["家", "字", "学", "客"] }
];

// ===== Puntos gramaticales con ejercicios =====
const GRAMMAR_POINTS = [
    {
        id: "shi",
        name: "Oración con 是",
        lesson: 3,
        structure: "Sujeto + 是 + Sustantivo",
        negative: "Sujeto + 不是 + Sustantivo",
        examples: [
            { cn: "我是学生。", py: "Wǒ shì xuésheng.", es: "Soy estudiante." },
            { cn: "她不是老师。", py: "Tā bú shì lǎoshī.", es: "Ella no es profesora." }
        ],
        exercises: [
            { q: "Completa: 我___学生。(Soy estudiante)", opts: ["是", "有", "在", "的"], ans: 0 },
            { q: "Traduce: 'Él es médico'", opts: ["他是医生", "他有医生", "他在医生", "他的医生"], ans: 0 },
            { q: "Completa: 她___老师。(Ella no es profesora)", opts: ["是", "不是", "没有", "不"], ans: 1 },
            { q: "¿Cuál es correcta?", opts: ["我是中国人", "我是中国", "我中国人是", "是我中国人"], ans: 0 }
        ]
    },
    {
        id: "ma",
        name: "Preguntas con 吗",
        lesson: 3,
        structure: "Oración afirmativa + 吗？",
        examples: [
            { cn: "你是老师吗？", py: "Nǐ shì lǎoshī ma?", es: "¿Eres profesor?" },
            { cn: "他是中国人吗？", py: "Tā shì Zhōngguórén ma?", es: "¿Es él chino?" }
        ],
        exercises: [
            { q: "Convierte en pregunta: 你是学生", opts: ["你是学生吗？", "你是学生呢？", "你是学生的？", "你是学生了？"], ans: 0 },
            { q: "Traduce: '¿Eres chino?'", opts: ["你是中国人吗？", "你中国人吗？", "是你中国人吗？", "你是中国吗？"], ans: 0 },
            { q: "¿Dónde va 吗?", opts: ["Al final", "Al inicio", "Antes del verbo", "Después del sujeto"], ans: 0 },
            { q: "Completa: 他是医生___？", opts: ["吗", "呢", "吧", "了"], ans: 0 }
        ]
    },
    {
        id: "de",
        name: "Partícula 的",
        lesson: 4,
        structure: "Poseedor + 的 + Poseído",
        examples: [
            { cn: "我的书", py: "wǒ de shū", es: "mi libro" },
            { cn: "她的老师", py: "tā de lǎoshī", es: "su profesor (de ella)" }
        ],
        exercises: [
            { q: "Traduce: 'mi libro'", opts: ["我的书", "我书的", "的我书", "书我的"], ans: 0 },
            { q: "Completa: 这是他___电脑。(su computadora)", opts: ["的", "是", "有", "在"], ans: 0 },
            { q: "¿Cuál significa 'su amigo (de ella)'?", opts: ["他的朋友", "她的朋友", "我的朋友", "你的朋友"], ans: 1 },
            { q: "Ordena: 老师 / 的 / 我", opts: ["我的老师", "老师我的", "的我老师", "老师的我"], ans: 0 }
        ]
    },
    {
        id: "you",
        name: "Verbo 有",
        lesson: [5, 10],
        structure: "Sujeto + 有 + Objeto | Lugar + 有 + Cosa",
        negative: "没有",
        examples: [
            { cn: "我有三个朋友。", py: "Wǒ yǒu sān gè péngyou.", es: "Tengo tres amigos." },
            { cn: "桌子上有一本书。", py: "Zhuōzi shàng yǒu yì běn shū.", es: "Hay un libro en la mesa." }
        ],
        exercises: [
            { q: "Traduce: 'Tengo un hermano'", opts: ["我有一个弟弟", "我是一个弟弟", "我在一个弟弟", "我的一个弟弟"], ans: 0 },
            { q: "¿Cómo se niega 有?", opts: ["不有", "没有", "无有", "非有"], ans: 1 },
            { q: "Completa: 桌子上___一本书。(Hay un libro)", opts: ["是", "有", "在", "的"], ans: 1 },
            { q: "Traduce: 'No tengo dinero'", opts: ["我不有钱", "我没有钱", "我有不钱", "我钱没有"], ans: 1 }
        ]
    },
    {
        id: "hui",
        name: "Verbo modal 会",
        lesson: [6, 12],
        structure: "Sujeto + 会 + Verbo",
        usage: ["Habilidad adquirida", "Posibilidad futura"],
        examples: [
            { cn: "我会说汉语。", py: "Wǒ huì shuō Hànyǔ.", es: "Sé hablar chino." },
            { cn: "明天会下雨。", py: "Míngtiān huì xià yǔ.", es: "Mañana va a llover." }
        ],
        exercises: [
            { q: "Traduce: 'Sé hablar chino'", opts: ["我会说汉语", "我说汉语", "我能说汉语", "我想说汉语"], ans: 0 },
            { q: "¿Qué indica 会?", opts: ["Habilidad aprendida", "Obligación", "Posesión", "Ubicación"], ans: 0 },
            { q: "Completa: 明天___下雨。(Va a llover)", opts: ["是", "有", "会", "在"], ans: 2 },
            { q: "Traduce: 'No sé escribir'", opts: ["我不会写", "我没会写", "我会不写", "我不写会"], ans: 0 }
        ]
    },
    {
        id: "xiang",
        name: "Verbo modal 想",
        lesson: 8,
        structure: "Sujeto + 想 + Verbo",
        examples: [
            { cn: "我想喝茶。", py: "Wǒ xiǎng hē chá.", es: "Quiero beber té." },
            { cn: "你想吃什么？", py: "Nǐ xiǎng chī shénme?", es: "¿Qué quieres comer?" }
        ],
        exercises: [
            { q: "Traduce: 'Quiero beber té'", opts: ["我想喝茶", "我喝想茶", "我茶想喝", "想我喝茶"], ans: 0 },
            { q: "Completa: 你___吃什么？(¿Qué quieres comer?)", opts: ["想", "会", "能", "要"], ans: 0 },
            { q: "¿Qué expresa 想?", opts: ["Deseo/querer", "Habilidad", "Obligación", "Posesión"], ans: 0 },
            { q: "Traduce: 'No quiero ir'", opts: ["我不想去", "我想不去", "我没想去", "不我想去"], ans: 0 }
        ]
    },
    {
        id: "zai",
        name: "Verbo/Preposición 在",
        lesson: [9, 13],
        structure: "S + 在 + Lugar | S + 在 + L + V | S + 在 + V + 呢",
        examples: [
            { cn: "他在医院。", py: "Tā zài yīyuàn.", es: "Él está en el hospital." },
            { cn: "我在家看书。", py: "Wǒ zài jiā kàn shū.", es: "Leo en casa." },
            { cn: "他在学做菜呢。", py: "Tā zài xué zuò cài ne.", es: "Está aprendiendo a cocinar." }
        ],
        exercises: [
            { q: "Traduce: 'Estoy en casa'", opts: ["我在家", "我是家", "我有家", "我的家"], ans: 0 },
            { q: "¿Cómo expresas acción en progreso?", opts: ["在 + V + 呢", "是 + V", "有 + V", "会 + V"], ans: 0 },
            { q: "Completa: 他___医院工作。(Trabaja en el hospital)", opts: ["是", "有", "在", "的"], ans: 2 },
            { q: "Traduce: 'Está durmiendo'", opts: ["他在睡觉呢", "他睡觉在呢", "他呢在睡觉", "在他睡觉呢"], ans: 0 }
        ]
    },
    {
        id: "le",
        name: "Partícula 了",
        lesson: [5, 14],
        structure: "V + 了 + O (acción completada) | ...了 (cambio de estado)",
        examples: [
            { cn: "她20岁了。", py: "Tā èrshí suì le.", es: "Ella ya tiene 20 años." },
            { cn: "她买了很多衣服。", py: "Tā mǎi le hěn duō yīfu.", es: "Ella compró mucha ropa." }
        ],
        exercises: [
            { q: "Traduce: 'Ya comí'", opts: ["我吃了", "我了吃", "我吃的", "吃我了"], ans: 0 },
            { q: "¿Qué indica 了 después del verbo?", opts: ["Acción completada", "Acción futura", "Pregunta", "Negación"], ans: 0 },
            { q: "Completa: 她买___很多衣服。(Ella compró)", opts: ["了", "的", "呢", "吗"], ans: 0 },
            { q: "Traduce: 'Ella ya tiene 20 años'", opts: ["她20岁了", "她了20岁", "她是20岁", "她有20岁"], ans: 0 }
        ]
    },
    {
        id: "shide",
        name: "Estructura 是...的",
        lesson: 15,
        structure: "S + 是 + [Tiempo/Lugar/Modo] + V + 的",
        examples: [
            { cn: "我是坐飞机来的。", py: "Wǒ shì zuò fēijī lái de.", es: "Vine en avión." },
            { cn: "你是什么时候来的？", py: "Nǐ shì shénme shíhou lái de?", es: "¿Cuándo viniste?" }
        ],
        exercises: [
            { q: "¿Para qué se usa 是...的?", opts: ["Enfatizar tiempo/modo/lugar", "Hacer preguntas", "Negar", "Expresar posesión"], ans: 0 },
            { q: "Traduce: 'Vine en avión'", opts: ["我是坐飞机来的", "我坐飞机来", "我来坐飞机的", "是我坐飞机来"], ans: 0 },
            { q: "Completa: 你是什么时候来___？", opts: ["的", "了", "吗", "呢"], ans: 0 },
            { q: "Traduce: '¿Cómo viniste?'", opts: ["你是怎么来的？", "你怎么来？", "你来怎么的？", "是你怎么来的？"], ans: 0 }
        ]
    }
];

// ===== Preguntas para el examen =====
const EXAM_QUESTIONS = {
    listening: [
        // Parte 1: Verdadero/Falso basado en imagen y audio
        {
            type: "true_false",
            image: "person_greeting",
            audio: "nǐ hǎo",
            answer: true,
            hanzi: "你好",
            description: "Persona saludando"
        },
        {
            type: "true_false",
            image: "apple",
            audio: "zhè shì píngguǒ",
            answer: true,
            hanzi: "这是苹果",
            description: "Una manzana"
        },
        // Más preguntas se generarán dinámicamente
    ],
    reading: [
        // Parte 1: Emparejar imagen con palabra
        {
            type: "image_word",
            image: "book",
            options: ["书", "水", "茶", "菜"],
            answer: 0
        },
        {
            type: "image_word",
            image: "teacher",
            options: ["学生", "老师", "医生", "朋友"],
            answer: 1
        },
        // Parte 2: Emparejar pinyin con hanzi
        {
            type: "pinyin_hanzi",
            pinyin: "nǐ hǎo",
            options: ["你好", "谢谢", "再见", "对不起"],
            answer: 0
        },
        // Parte 3: Emparejar pregunta con respuesta
        {
            type: "question_answer",
            question: "你叫什么名字？",
            options: ["我很好。", "我叫李明。", "我是学生。", "谢谢！"],
            answer: 1
        },
        {
            type: "question_answer",
            question: "你是哪国人？",
            options: ["我是中国人。", "我20岁。", "我是学生。", "我很好。"],
            answer: 0
        },
        // Parte 4: Completar oración
        {
            type: "fill_blank",
            sentence: "我___喝茶。",
            options: ["想", "是", "在", "的"],
            answer: 0
        },
        {
            type: "fill_blank",
            sentence: "她是我___老师。",
            options: ["是", "的", "在", "有"],
            answer: 1
        }
    ]
};

// ===== Ejercicios de práctica de tonos =====
const TONE_PRACTICE = [
    { hanzi: "妈", pinyin: "mā", tone: 1, meaning: "mamá" },
    { hanzi: "麻", pinyin: "má", tone: 2, meaning: "cáñamo" },
    { hanzi: "马", pinyin: "mǎ", tone: 3, meaning: "caballo" },
    { hanzi: "骂", pinyin: "mà", tone: 4, meaning: "regañar" },
    { hanzi: "吗", pinyin: "ma", tone: 0, meaning: "partícula" },
    { hanzi: "他", pinyin: "tā", tone: 1, meaning: "él" },
    { hanzi: "她", pinyin: "tā", tone: 1, meaning: "ella" },
    { hanzi: "好", pinyin: "hǎo", tone: 3, meaning: "bueno" },
    { hanzi: "是", pinyin: "shì", tone: 4, meaning: "ser" },
    { hanzi: "不", pinyin: "bù", tone: 4, meaning: "no" },
    { hanzi: "我", pinyin: "wǒ", tone: 3, meaning: "yo" },
    { hanzi: "你", pinyin: "nǐ", tone: 3, meaning: "tú" },
    { hanzi: "中", pinyin: "zhōng", tone: 1, meaning: "centro" },
    { hanzi: "国", pinyin: "guó", tone: 2, meaning: "país" },
    { hanzi: "人", pinyin: "rén", tone: 2, meaning: "persona" }
];

// ===== Caracteres para práctica de reconocimiento =====
const HANZI_PRACTICE = [
    { hanzi: "一", pinyin: "yī", meaning: "uno", strokes: 1 },
    { hanzi: "二", pinyin: "èr", meaning: "dos", strokes: 2 },
    { hanzi: "三", pinyin: "sān", meaning: "tres", strokes: 3 },
    { hanzi: "人", pinyin: "rén", meaning: "persona", strokes: 2 },
    { hanzi: "大", pinyin: "dà", meaning: "grande", strokes: 3 },
    { hanzi: "小", pinyin: "xiǎo", meaning: "pequeño", strokes: 3 },
    { hanzi: "中", pinyin: "zhōng", meaning: "centro", strokes: 4 },
    { hanzi: "日", pinyin: "rì", meaning: "sol/día", strokes: 4 },
    { hanzi: "月", pinyin: "yuè", meaning: "luna/mes", strokes: 4 },
    { hanzi: "水", pinyin: "shuǐ", meaning: "agua", strokes: 4 },
    { hanzi: "火", pinyin: "huǒ", meaning: "fuego", strokes: 4 },
    { hanzi: "山", pinyin: "shān", meaning: "montaña", strokes: 3 },
    { hanzi: "口", pinyin: "kǒu", meaning: "boca", strokes: 3 },
    { hanzi: "女", pinyin: "nǚ", meaning: "mujer", strokes: 3 },
    { hanzi: "子", pinyin: "zǐ", meaning: "hijo", strokes: 3 },
    { hanzi: "心", pinyin: "xīn", meaning: "corazón", strokes: 4 },
    { hanzi: "手", pinyin: "shǒu", meaning: "mano", strokes: 4 },
    { hanzi: "目", pinyin: "mù", meaning: "ojo", strokes: 5 },
    { hanzi: "耳", pinyin: "ěr", meaning: "oreja", strokes: 6 },
    { hanzi: "足", pinyin: "zú", meaning: "pie", strokes: 7 }
];

// ===== Contenido didáctico completo de las lecciones =====
const LESSONS_CONTENT = [
    // ===== LECCIÓN 1: 你好 - Saludos básicos =====
    {
        num: 1,
        title: "你好",
        subtitle: "Nǐ hǎo - Hola",
        topic: "Saludos básicos",
        introduction: "En esta primera lección aprenderás los saludos más importantes en chino. Los saludos son fundamentales para cualquier interacción social en China. 你好 (nǐ hǎo) es el saludo más común y significa literalmente 'tú bueno'.",
        objectives: [
            "Saludar en chino de forma básica y formal",
            "Disculparse y responder a disculpas",
            "Usar pronombres básicos (tú, usted, ustedes)"
        ],
        dialogue: {
            title: "En la calle",
            lines: [
                { speaker: "A", cn: "你好！", py: "Nǐ hǎo!", es: "¡Hola!" },
                { speaker: "B", cn: "你好！", py: "Nǐ hǎo!", es: "¡Hola!" },
                { speaker: "A", cn: "对不起！", py: "Duìbuqǐ!", es: "¡Lo siento!" },
                { speaker: "B", cn: "没关系。", py: "Méi guānxi.", es: "No importa." }
            ]
        },
        keyPoints: [
            {
                point: "你好 vs 您好",
                explanation: "你好 es informal (para amigos, gente de tu edad). 您好 es formal (para mayores, jefes, desconocidos)."
            },
            {
                point: "Plurales con 们",
                explanation: "Añade 们 a los pronombres para hacerlos plurales: 你 → 你们 (ustedes)"
            }
        ],
        culturalNote: "En China, es común saludar preguntando '你吃了吗？' (¿Ya comiste?). No es una invitación a comer, solo un saludo amable que muestra preocupación.",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo dices 'Hola' en chino?",
                options: ["你好", "谢谢", "再见", "对不起"],
                answer: 0
            },
            {
                type: "translate",
                question: "¿Cuál es la forma FORMAL de saludar?",
                options: ["你好", "您好", "你们好", "她好"],
                answer: 1
            },
            {
                type: "complete",
                question: "A: 对不起！ B: ___",
                options: ["没关系", "你好", "谢谢", "再见"],
                answer: 0
            },
            {
                type: "audio",
                question: "Escucha y selecciona lo que significa 'Lo siento'",
                audioText: "对不起",
                options: ["你好", "对不起", "谢谢", "再见"],
                answer: 1
            }
        ]
    },

    // ===== LECCIÓN 2: 谢谢你 - Expresiones de cortesía =====
    {
        num: 2,
        title: "谢谢你",
        subtitle: "Xièxie nǐ - Gracias",
        topic: "Expresiones de cortesía",
        introduction: "Las expresiones de cortesía son esenciales en la cultura china. En esta lección aprenderás a dar las gracias, responder cuando te agradecen, y despedirte correctamente.",
        objectives: [
            "Agradecer de diferentes formas",
            "Responder cuando te dan las gracias",
            "Despedirse apropiadamente",
            "Usar la negación básica 不"
        ],
        dialogue: {
            title: "En una tienda",
            lines: [
                { speaker: "Cliente", cn: "谢谢！", py: "Xièxie!", es: "¡Gracias!" },
                { speaker: "Vendedor", cn: "不客气。", py: "Bú kèqi.", es: "De nada." },
                { speaker: "Cliente", cn: "再见！", py: "Zàijiàn!", es: "¡Adiós!" },
                { speaker: "Vendedor", cn: "再见！", py: "Zàijiàn!", es: "¡Adiós!" }
            ]
        },
        keyPoints: [
            {
                point: "谢谢 vs 谢谢你",
                explanation: "谢谢 es más casual. 谢谢你 (gracias a ti) es más personal y enfático."
            },
            {
                point: "Negación con 不",
                explanation: "不 se usa para negar verbos y adjetivos. Cambia a tono 2 (bú) antes de tono 4."
            }
        ],
        culturalNote: "En China, a veces rechazar amablemente es parte de la cortesía. Si alguien te ofrece algo, es educado rechazar una o dos veces antes de aceptar.",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo respondes cuando alguien te da las gracias?",
                options: ["谢谢", "不客气", "对不起", "你好"],
                answer: 1
            },
            {
                type: "translate",
                question: "¿Cómo dices 'Adiós' en chino?",
                options: ["你好", "谢谢", "再见", "不客气"],
                answer: 2
            },
            {
                type: "complete",
                question: "A: 谢谢你！ B: ___",
                options: ["再见", "不客气", "对不起", "你好"],
                answer: 1
            },
            {
                type: "meaning",
                question: "¿Qué significa 不?",
                options: ["sí", "no (negación)", "gracias", "hola"],
                answer: 1
            }
        ]
    },

    // ===== LECCIÓN 3: 你叫什么名字 - Presentaciones =====
    {
        num: 3,
        title: "你叫什么名字",
        subtitle: "Nǐ jiào shénme míngzi - ¿Cómo te llamas?",
        topic: "Presentaciones",
        introduction: "Aprende a presentarte, preguntar nombres, y hablar sobre nacionalidades y profesiones. El verbo 是 (ser) y la partícula interrogativa 吗 son fundamentales en esta lección.",
        objectives: [
            "Preguntar y decir tu nombre",
            "Usar el verbo 是 (ser/estar)",
            "Formar preguntas con 吗",
            "Hablar de nacionalidades y profesiones"
        ],
        dialogue: {
            title: "Conociendo a alguien nuevo",
            lines: [
                { speaker: "A", cn: "你好！你叫什么名字？", py: "Nǐ hǎo! Nǐ jiào shénme míngzi?", es: "¡Hola! ¿Cómo te llamas?" },
                { speaker: "B", cn: "我叫王明。你呢？", py: "Wǒ jiào Wáng Míng. Nǐ ne?", es: "Me llamo Wang Ming. ¿Y tú?" },
                { speaker: "A", cn: "我叫李华。你是老师吗？", py: "Wǒ jiào Lǐ Huá. Nǐ shì lǎoshī ma?", es: "Me llamo Li Hua. ¿Eres profesor?" },
                { speaker: "B", cn: "不，我是学生。", py: "Bù, wǒ shì xuésheng.", es: "No, soy estudiante." }
            ]
        },
        keyPoints: [
            {
                point: "Estructura con 是",
                explanation: "Sujeto + 是 + Sustantivo. Negativo: 不是. Ejemplo: 我是学生 (Soy estudiante)."
            },
            {
                point: "Preguntas con 吗",
                explanation: "Añade 吗 al final de una oración afirmativa para convertirla en pregunta. 你是老师 → 你是老师吗？"
            },
            {
                point: "什么 para preguntar 'qué'",
                explanation: "什么 significa 'qué' y se coloca donde iría la respuesta: 你叫什么名字？→ 我叫[nombre]。"
            }
        ],
        culturalNote: "En China, el apellido va primero. '王明' tiene apellido '王' (Wáng) y nombre '明' (Míng). Los nombres chinos suelen tener significados especiales.",
        grammar: "shi",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo preguntas '¿Cómo te llamas?'",
                options: ["你好吗？", "你叫什么名字？", "你是谁？", "你是学生吗？"],
                answer: 1
            },
            {
                type: "complete",
                question: "我___学生。(Soy estudiante)",
                options: ["是", "不", "叫", "吗"],
                answer: 0
            },
            {
                type: "translate",
                question: "¿Cómo dices 'No soy profesor'?",
                options: ["我是老师", "我不是老师", "你是老师吗", "他是老师"],
                answer: 1
            },
            {
                type: "order",
                question: "Ordena: 什么 / 叫 / 名字 / 你",
                options: ["你叫什么名字", "什么你叫名字", "名字你叫什么", "叫你什么名字"],
                answer: 0
            }
        ]
    },

    // ===== LECCIÓN 4: 她是我的汉语老师 - Posesión y relaciones =====
    {
        num: 4,
        title: "她是我的汉语老师",
        subtitle: "Tā shì wǒ de Hànyǔ lǎoshī - Ella es mi profesora de chino",
        topic: "Posesión y relaciones",
        introduction: "Aprende a expresar posesión con la partícula 的, distinguir entre él/ella, preguntar 'quién' y hablar de relaciones personales.",
        objectives: [
            "Usar la partícula posesiva 的",
            "Distinguir 他 (él) y 她 (ella)",
            "Preguntar con 谁 (quién)",
            "Hablar de relaciones (amigo, compañero)"
        ],
        dialogue: {
            title: "Presentando a alguien",
            lines: [
                { speaker: "A", cn: "她是谁？", py: "Tā shì shéi?", es: "¿Quién es ella?" },
                { speaker: "B", cn: "她是我的汉语老师。", py: "Tā shì wǒ de Hànyǔ lǎoshī.", es: "Ella es mi profesora de chino." },
                { speaker: "A", cn: "他呢？他是你的朋友吗？", py: "Tā ne? Tā shì nǐ de péngyou ma?", es: "¿Y él? ¿Es tu amigo?" },
                { speaker: "B", cn: "对，他是我的同学。", py: "Duì, tā shì wǒ de tóngxué.", es: "Sí, él es mi compañero de clase." }
            ]
        },
        keyPoints: [
            {
                point: "Partícula 的",
                explanation: "Indica posesión: 我的 (mi/mío), 你的 (tu/tuyo), 他的 (su/suyo de él). Se coloca entre poseedor y poseído."
            },
            {
                point: "他 vs 她",
                explanation: "他 (tā) = él, 她 (tā) = ella. Se pronuncian igual pero se escriben diferente. También existe 它 para 'ello' (animales/cosas)."
            },
            {
                point: "Preguntar con 谁",
                explanation: "谁 (shéi) significa 'quién'. Se coloca donde iría la respuesta: 她是谁？→ 她是老师。"
            }
        ],
        culturalNote: "En chino, las relaciones familiares son muy específicas. Hay palabras diferentes para cada tipo de tío, primo, abuelo, etc., dependiendo del lado materno o paterno.",
        grammar: "de",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo dices 'mi libro'?",
                options: ["我书", "我的书", "书我的", "的我书"],
                answer: 1
            },
            {
                type: "complete",
                question: "她是___？(¿Quién es ella?)",
                options: ["什么", "谁", "哪", "吗"],
                answer: 1
            },
            {
                type: "translate",
                question: "¿Cómo dices 'su profesor (de él)'?",
                options: ["她的老师", "他的老师", "我的老师", "你的老师"],
                answer: 1
            },
            {
                type: "meaning",
                question: "¿Qué significa 同学？",
                options: ["profesor", "amigo", "compañero de clase", "estudiante"],
                answer: 2
            }
        ]
    },

    // ===== LECCIÓN 5: 她女儿今年二十岁 - Familia y edad =====
    {
        num: 5,
        title: "她女儿今年二十岁",
        subtitle: "Tā nǚ'ér jīnnián èrshí suì - Su hija tiene 20 años este año",
        topic: "Familia y edad",
        introduction: "En esta lección aprenderás vocabulario de familia, cómo preguntar y decir la edad, y usar el verbo 有 (tener). También introducimos la partícula 了 para indicar cambio de estado.",
        objectives: [
            "Vocabulario de familia (papá, mamá, hijo, hija)",
            "Preguntar y decir la edad con 几岁 y 多大",
            "Usar el verbo 有 (tener)",
            "Entender la partícula 了 para cambio de estado"
        ],
        dialogue: {
            title: "Hablando de familia",
            lines: [
                { speaker: "A", cn: "你家有几口人？", py: "Nǐ jiā yǒu jǐ kǒu rén?", es: "¿Cuántas personas hay en tu familia?" },
                { speaker: "B", cn: "我家有四口人：爸爸、妈妈、我和我的妹妹。", py: "Wǒ jiā yǒu sì kǒu rén: bàba, māma, wǒ hé wǒ de mèimei.", es: "Somos 4: papá, mamá, yo y mi hermana menor." },
                { speaker: "A", cn: "你妹妹几岁了？", py: "Nǐ mèimei jǐ suì le?", es: "¿Cuántos años tiene tu hermana?" },
                { speaker: "B", cn: "她今年十五岁了。", py: "Tā jīnnián shíwǔ suì le.", es: "Este año tiene 15 años." }
            ]
        },
        keyPoints: [
            {
                point: "几 vs 多少",
                explanation: "几 se usa para números pequeños (generalmente menos de 10). Para números grandes o indefinidos, usa 多少."
            },
            {
                point: "Expresar edad",
                explanation: "Número + 岁 (años de edad). Para niños: 几岁？ Para adultos es más cortés: 多大？"
            },
            {
                point: "有 para tener y existir",
                explanation: "我有... (Tengo...). 家里有... (En casa hay...). Negativo: 没有 (no tener/no haber)."
            },
            {
                point: "Partícula 了",
                explanation: "了 indica cambio de estado o situación nueva. 她20岁了 = Ella ya tiene 20 años (ha llegado a esa edad)."
            }
        ],
        culturalNote: "En China, preguntar la edad no es de mala educación como en occidente. Es común preguntar la edad para saber cómo dirigirse a alguien (hermano mayor/menor, tío, etc.).",
        grammar: "you",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo preguntas la edad de un niño?",
                options: ["你多大？", "你几岁？", "你有几岁？", "你是几岁？"],
                answer: 1
            },
            {
                type: "complete",
                question: "我家___五口人。(Mi familia tiene 5 personas)",
                options: ["是", "有", "在", "的"],
                answer: 1
            },
            {
                type: "translate",
                question: "¿Cómo dices 'mi hermana menor'?",
                options: ["我的姐姐", "我的妹妹", "我的女儿", "我的儿子"],
                answer: 1
            },
            {
                type: "meaning",
                question: "¿Qué significa 今年？",
                options: ["ayer", "mañana", "este año", "el año pasado"],
                answer: 2
            }
        ]
    },

    // ===== LECCIÓN 6: 我会说汉语 - Habilidades =====
    {
        num: 6,
        title: "我会说汉语",
        subtitle: "Wǒ huì shuō Hànyǔ - Sé hablar chino",
        topic: "Habilidades",
        introduction: "Aprende a expresar habilidades con 会, hablar de cosas que sabes o puedes hacer, y vocabulario relacionado con idiomas y actividades.",
        objectives: [
            "Usar 会 para expresar habilidades aprendidas",
            "Verbos de acción: hablar, escribir, leer, hacer",
            "Preguntar cómo se hace algo con 怎么",
            "Adjetivos: bueno, delicioso, muy"
        ],
        dialogue: {
            title: "Hablando de habilidades",
            lines: [
                { speaker: "A", cn: "你会说汉语吗？", py: "Nǐ huì shuō Hànyǔ ma?", es: "¿Sabes hablar chino?" },
                { speaker: "B", cn: "会，但是说得不太好。", py: "Huì, dànshì shuō de bú tài hǎo.", es: "Sí, pero no hablo muy bien." },
                { speaker: "A", cn: "你会写汉字吗？", py: "Nǐ huì xiě Hànzì ma?", es: "¿Sabes escribir caracteres chinos?" },
                { speaker: "B", cn: "会写一点儿。这个字怎么写？", py: "Huì xiě yìdiǎnr. Zhège zì zěnme xiě?", es: "Sé escribir un poco. ¿Cómo se escribe este carácter?" }
            ]
        },
        keyPoints: [
            {
                point: "会 para habilidades",
                explanation: "会 indica una habilidad que se ha aprendido: 会说 (saber hablar), 会写 (saber escribir), 会做 (saber hacer)."
            },
            {
                point: "很 como intensificador",
                explanation: "很 significa 'muy' y es casi obligatorio antes de adjetivos en oraciones afirmativas: 很好 (muy bueno/está bien)."
            },
            {
                point: "怎么 para preguntar 'cómo'",
                explanation: "怎么 + verbo pregunta el método: 怎么做？(¿Cómo se hace?) 怎么写？(¿Cómo se escribe?)"
            }
        ],
        culturalNote: "Los chinos suelen ser modestos sobre sus habilidades. Es común decir '会一点儿' (sé un poco) incluso si dominas algo, como muestra de humildad.",
        grammar: "hui",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo dices 'Sé hablar chino'?",
                options: ["我说汉语", "我会说汉语", "我想说汉语", "我能说汉语"],
                answer: 1
            },
            {
                type: "complete",
                question: "这个字___写？(¿Cómo se escribe este carácter?)",
                options: ["什么", "怎么", "谁", "哪"],
                answer: 1
            },
            {
                type: "translate",
                question: "¿Cómo dices 'muy delicioso'?",
                options: ["好吃", "很好吃", "不好吃", "太好吃"],
                answer: 1
            },
            {
                type: "meaning",
                question: "¿Qué significa 做？",
                options: ["hablar", "escribir", "hacer", "leer"],
                answer: 2
            }
        ]
    },

    // ===== LECCIÓN 7: 今天几号 - Fechas y días =====
    {
        num: 7,
        title: "今天几号",
        subtitle: "Jīntiān jǐ hào - ¿Qué fecha es hoy?",
        topic: "Fechas y días",
        introduction: "Aprende a hablar de fechas, días de la semana, y expresiones de tiempo como ayer, hoy y mañana.",
        objectives: [
            "Decir y preguntar la fecha",
            "Días de la semana (星期一 a 星期日)",
            "Expresiones de tiempo: ayer, hoy, mañana",
            "Verbos: ir, ver/leer"
        ],
        dialogue: {
            title: "Haciendo planes",
            lines: [
                { speaker: "A", cn: "今天几号？", py: "Jīntiān jǐ hào?", es: "¿Qué fecha es hoy?" },
                { speaker: "B", cn: "今天十月五号，星期三。", py: "Jīntiān shí yuè wǔ hào, xīngqīsān.", es: "Hoy es 5 de octubre, miércoles." },
                { speaker: "A", cn: "明天你去学校吗？", py: "Míngtiān nǐ qù xuéxiào ma?", es: "¿Mañana vas a la escuela?" },
                { speaker: "B", cn: "不去，明天是星期四，我想在家看书。", py: "Bù qù, míngtiān shì xīngqīsì, wǒ xiǎng zài jiā kàn shū.", es: "No voy, mañana es jueves, quiero quedarme en casa leyendo." }
            ]
        },
        keyPoints: [
            {
                point: "Formato de fecha en chino",
                explanation: "Año + 年 + Mes + 月 + Día + 号/日. Ejemplo: 2024年10月5号 (5 de octubre de 2024)."
            },
            {
                point: "Días de la semana",
                explanation: "星期 + número (1-6) para lunes a sábado. Domingo = 星期日 o 星期天."
            },
            {
                point: "Tiempo relativo",
                explanation: "昨天 (ayer), 今天 (hoy), 明天 (mañana). Se colocan al inicio o después del sujeto."
            }
        ],
        culturalNote: "En China se usa tanto el calendario gregoriano como el lunar tradicional. Las fiestas tradicionales como el Año Nuevo Chino siguen el calendario lunar.",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo dices 'miércoles'?",
                options: ["星期一", "星期二", "星期三", "星期四"],
                answer: 2
            },
            {
                type: "complete",
                question: "今天是十___五号。(Hoy es 15 de octubre)",
                options: ["年", "月", "日", "号"],
                answer: 1
            },
            {
                type: "translate",
                question: "¿Cómo preguntas '¿Qué fecha es hoy?'",
                options: ["今天星期几？", "今天几号？", "几点了？", "今天怎么样？"],
                answer: 1
            },
            {
                type: "meaning",
                question: "¿Qué significa 昨天？",
                options: ["hoy", "ayer", "mañana", "la semana pasada"],
                answer: 1
            }
        ]
    },

    // ===== LECCIÓN 8: 我想喝茶 - Comida y compras =====
    {
        num: 8,
        title: "我想喝茶",
        subtitle: "Wǒ xiǎng hē chá - Quiero beber té",
        topic: "Comida y compras",
        introduction: "Aprende vocabulario de comida y bebida, cómo expresar deseos con 想, y cómo hacer compras básicas.",
        objectives: [
            "Usar 想 para expresar deseos",
            "Vocabulario de comida y bebida",
            "Preguntar precios con 多少钱",
            "Clasificadores: 个, 本, 块"
        ],
        dialogue: {
            title: "En un café",
            lines: [
                { speaker: "Mesero", cn: "你好！你想喝什么？", py: "Nǐ hǎo! Nǐ xiǎng hē shénme?", es: "¡Hola! ¿Qué quieres beber?" },
                { speaker: "Cliente", cn: "我想喝茶。这个茶多少钱？", py: "Wǒ xiǎng hē chá. Zhège chá duōshao qián?", es: "Quiero beber té. ¿Cuánto cuesta este té?" },
                { speaker: "Mesero", cn: "二十块。", py: "Èrshí kuài.", es: "20 yuanes." },
                { speaker: "Cliente", cn: "好，我要一杯。", py: "Hǎo, wǒ yào yì bēi.", es: "Bien, quiero uno (una taza)." }
            ]
        },
        keyPoints: [
            {
                point: "想 para deseos",
                explanation: "想 + verbo expresa lo que quieres hacer: 想喝 (querer beber), 想吃 (querer comer), 想买 (querer comprar)."
            },
            {
                point: "Preguntar precio",
                explanation: "多少钱？(¿Cuánto cuesta?) o 这个多少钱？(¿Cuánto cuesta esto?)"
            },
            {
                point: "Clasificadores",
                explanation: "个 (general), 本 (libros), 杯 (vasos/tazas), 块 (yuanes). Van entre número y sustantivo: 一个人, 一本书."
            }
        ],
        culturalNote: "El té es fundamental en la cultura china. Ofrecer té a los invitados es un signo de respeto y hospitalidad. El '茶道' (ceremonia del té) es un arte milenario.",
        grammar: "xiang",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo preguntas '¿Cuánto cuesta?'",
                options: ["这是什么？", "多少钱？", "你想什么？", "几个？"],
                answer: 1
            },
            {
                type: "complete",
                question: "我想___茶。(Quiero beber té)",
                options: ["吃", "喝", "买", "看"],
                answer: 1
            },
            {
                type: "translate",
                question: "¿Cómo dices 'un libro'?",
                options: ["一书", "一个书", "一本书", "书一本"],
                answer: 2
            },
            {
                type: "meaning",
                question: "¿Qué significa 块？",
                options: ["yuan (dinero)", "libro", "persona", "taza"],
                answer: 0
            }
        ]
    },

    // ===== LECCIÓN 9: 你儿子在哪儿工作 - Ubicación y trabajo =====
    {
        num: 9,
        title: "你儿子在哪儿工作",
        subtitle: "Nǐ érzi zài nǎr gōngzuò - ¿Dónde trabaja tu hijo?",
        topic: "Ubicación y trabajo",
        introduction: "Aprende a preguntar y decir dónde están las cosas y personas, vocabulario de lugares de trabajo, y ubicaciones relativas.",
        objectives: [
            "Usar 在 para indicar ubicación",
            "Preguntar dónde con 哪儿",
            "Vocabulario de lugares (hospital, escuela, etc.)",
            "Posiciones: arriba, abajo, dentro"
        ],
        dialogue: {
            title: "Hablando del trabajo",
            lines: [
                { speaker: "A", cn: "你儿子在哪儿工作？", py: "Nǐ érzi zài nǎr gōngzuò?", es: "¿Dónde trabaja tu hijo?" },
                { speaker: "B", cn: "他在医院工作，他是医生。", py: "Tā zài yīyuàn gōngzuò, tā shì yīshēng.", es: "Trabaja en el hospital, es médico." },
                { speaker: "A", cn: "医院在哪儿？", py: "Yīyuàn zài nǎr?", es: "¿Dónde está el hospital?" },
                { speaker: "B", cn: "在学校旁边。", py: "Zài xuéxiào pángbiān.", es: "Está al lado de la escuela." }
            ]
        },
        keyPoints: [
            {
                point: "在 para ubicación",
                explanation: "Sujeto + 在 + Lugar: 他在家 (Él está en casa). También: Sujeto + 在 + Lugar + Verbo: 他在医院工作."
            },
            {
                point: "哪儿 para preguntar dónde",
                explanation: "在哪儿？(¿Dónde está?) 你在哪儿？(¿Dónde estás?) También se puede usar 哪里."
            },
            {
                point: "Posiciones relativas",
                explanation: "上 (arriba), 下 (abajo), 里 (dentro), 旁边 (al lado). Se usan después del sustantivo: 桌子上 (encima de la mesa)."
            }
        ],
        culturalNote: "En China, preguntar sobre el trabajo y el salario no es considerado tan personal como en occidente. Es una forma común de conocer a alguien.",
        grammar: "zai",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo preguntas '¿Dónde estás?'",
                options: ["你是谁？", "你在哪儿？", "你去哪儿？", "你做什么？"],
                answer: 1
            },
            {
                type: "complete",
                question: "他___医院工作。(Él trabaja en el hospital)",
                options: ["是", "有", "在", "的"],
                answer: 2
            },
            {
                type: "translate",
                question: "¿Cómo dices 'encima de la mesa'?",
                options: ["桌子下面", "桌子上", "桌子里", "桌子旁边"],
                answer: 1
            },
            {
                type: "meaning",
                question: "¿Qué significa 医生？",
                options: ["hospital", "médico", "enfermero", "paciente"],
                answer: 1
            }
        ]
    },

    // ===== LECCIÓN 10: 我能坐这儿吗 - Permiso y existencia =====
    {
        num: 10,
        title: "我能坐这儿吗",
        subtitle: "Wǒ néng zuò zhè'er ma - ¿Puedo sentarme aquí?",
        topic: "Permiso y existencia",
        introduction: "Aprende a pedir permiso con 能, expresar existencia con 有, y usar demostrativos para lugares.",
        objectives: [
            "Usar 能 para pedir permiso",
            "Diferencia entre 有 y 在 para existencia/ubicación",
            "Demostrativos de lugar: aquí, allí",
            "Negación con 没"
        ],
        dialogue: {
            title: "En una cafetería",
            lines: [
                { speaker: "A", cn: "请问，我能坐这儿吗？", py: "Qǐngwèn, wǒ néng zuò zhè'er ma?", es: "Disculpe, ¿puedo sentarme aquí?" },
                { speaker: "B", cn: "可以，请坐！", py: "Kěyǐ, qǐng zuò!", es: "Sí, ¡por favor siéntese!" },
                { speaker: "A", cn: "桌子上有菜单吗？", py: "Zhuōzi shàng yǒu càidān ma?", es: "¿Hay menú en la mesa?" },
                { speaker: "B", cn: "没有，我给你一个。", py: "Méi yǒu, wǒ gěi nǐ yí gè.", es: "No hay, te doy uno." }
            ]
        },
        keyPoints: [
            {
                point: "能 vs 会 vs 可以",
                explanation: "能: capacidad física o permiso. 会: habilidad aprendida. 可以: permiso (más formal que 能)."
            },
            {
                point: "有 para existencia",
                explanation: "Lugar + 有 + Cosa indica que algo existe en un lugar: 桌子上有一本书 (Hay un libro en la mesa)."
            },
            {
                point: "Negación 没/没有",
                explanation: "没有 niega 有: 我没有钱 (No tengo dinero). 没 también niega acciones pasadas: 我没去 (No fui)."
            }
        ],
        culturalNote: "En China es común compartir mesa con desconocidos en restaurantes llenos. Preguntar '我能坐这儿吗？' es muy útil y educado.",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo pides permiso para sentarte?",
                options: ["我坐这儿", "我想坐这儿", "我能坐这儿吗？", "我要坐这儿"],
                answer: 2
            },
            {
                type: "complete",
                question: "桌子上___一本书。(Hay un libro en la mesa)",
                options: ["是", "在", "有", "的"],
                answer: 2
            },
            {
                type: "translate",
                question: "¿Cómo dices 'No tengo dinero'?",
                options: ["我不有钱", "我没有钱", "我不是钱", "我没钱有"],
                answer: 1
            },
            {
                type: "meaning",
                question: "¿Qué significa 这儿？",
                options: ["allí", "aquí", "dónde", "ahí"],
                answer: 1
            }
        ]
    },

    // ===== LECCIÓN 11: 现在几点 - Hora y tiempo =====
    {
        num: 11,
        title: "现在几点",
        subtitle: "Xiànzài jǐ diǎn - ¿Qué hora es?",
        topic: "Hora y tiempo",
        introduction: "Aprende a decir y preguntar la hora, hablar de horarios y usar expresiones de tiempo.",
        objectives: [
            "Preguntar y decir la hora",
            "Expresiones: ahora, antes, después",
            "Hablar de horarios y actividades diarias",
            "Verbos: volver, vivir"
        ],
        dialogue: {
            title: "Organizando el día",
            lines: [
                { speaker: "A", cn: "现在几点？", py: "Xiànzài jǐ diǎn?", es: "¿Qué hora es?" },
                { speaker: "B", cn: "现在三点半。", py: "Xiànzài sān diǎn bàn.", es: "Son las 3:30." },
                { speaker: "A", cn: "你什么时候回家？", py: "Nǐ shénme shíhou huí jiā?", es: "¿Cuándo vuelves a casa?" },
                { speaker: "B", cn: "六点以后。我们一起去看电影吧？", py: "Liù diǎn yǐhòu. Wǒmen yìqǐ qù kàn diànyǐng ba?", es: "Después de las 6. ¿Vamos a ver una película juntos?" }
            ]
        },
        keyPoints: [
            {
                point: "Decir la hora",
                explanation: "Número + 点 = hora. 半 = y media. 分 = minutos. Ejemplo: 三点十五分 (3:15), 三点半 (3:30)."
            },
            {
                point: "什么时候 para 'cuándo'",
                explanation: "什么时候 pregunta el momento: 你什么时候来？(¿Cuándo vienes?)"
            },
            {
                point: "Expresiones de tiempo",
                explanation: "以前 (antes), 以后 (después), 现在 (ahora). Ejemplo: 三点以前 (antes de las 3)."
            }
        ],
        culturalNote: "En China se usa el sistema de 24 horas en contextos formales, pero en conversación casual se especifica: 上午 (AM), 下午 (PM), 晚上 (noche).",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo preguntas '¿Qué hora es?'",
                options: ["今天几号？", "现在几点？", "什么时候？", "几个小时？"],
                answer: 1
            },
            {
                type: "complete",
                question: "现在三点___。(Son las 3:30)",
                options: ["十", "二十", "半", "零"],
                answer: 2
            },
            {
                type: "translate",
                question: "¿Cómo dices 'después de las 6'?",
                options: ["六点以前", "六点以后", "六点半", "六点钟"],
                answer: 1
            },
            {
                type: "meaning",
                question: "¿Qué significa 回家？",
                options: ["ir a la escuela", "volver a casa", "ir al trabajo", "salir"],
                answer: 1
            }
        ]
    },

    // ===== LECCIÓN 12: 明天天气怎么样 - Clima y estado =====
    {
        num: 12,
        title: "明天天气怎么样",
        subtitle: "Míngtiān tiānqì zěnmeyàng - ¿Cómo estará el clima mañana?",
        topic: "Clima y estado",
        introduction: "Aprende a hablar del clima, expresar estados físicos y emocionales, y usar 太...了 para énfasis.",
        objectives: [
            "Vocabulario del clima",
            "Preguntar y describir estados con 怎么样",
            "Usar 太...了 para énfasis",
            "Expresar emociones y sensaciones"
        ],
        dialogue: {
            title: "Hablando del clima",
            lines: [
                { speaker: "A", cn: "明天天气怎么样？", py: "Míngtiān tiānqì zěnmeyàng?", es: "¿Cómo estará el clima mañana?" },
                { speaker: "B", cn: "明天会下雨，很冷。", py: "Míngtiān huì xià yǔ, hěn lěng.", es: "Mañana va a llover, hará frío." },
                { speaker: "A", cn: "太冷了！我不想出去。", py: "Tài lěng le! Wǒ bù xiǎng chūqù.", es: "¡Demasiado frío! No quiero salir." },
                { speaker: "B", cn: "我也是，在家喝热茶很好。", py: "Wǒ yě shì, zài jiā hē rè chá hěn hǎo.", es: "Yo también, es agradable tomar té caliente en casa." }
            ]
        },
        keyPoints: [
            {
                point: "怎么样 para preguntar estado",
                explanation: "...怎么样？pregunta cómo está algo: 天气怎么样？(¿Cómo está el clima?) 你怎么样？(¿Cómo estás?)"
            },
            {
                point: "太...了 para énfasis",
                explanation: "太 + adjetivo + 了 expresa 'demasiado': 太热了 (demasiado caliente), 太好了 (¡genial!)."
            },
            {
                point: "会 para predicciones",
                explanation: "会 también indica probabilidad futura: 明天会下雨 (Mañana va a llover)."
            }
        ],
        culturalNote: "El clima es un tema de conversación común en China. Las diferentes regiones tienen climas muy variados, desde el frío extremo del norte hasta el tropical del sur.",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo preguntas '¿Cómo está el clima?'",
                options: ["天气是什么？", "天气怎么样？", "天气好吗？", "今天几度？"],
                answer: 1
            },
            {
                type: "complete",
                question: "今天___热了！(¡Hoy hace demasiado calor!)",
                options: ["很", "太", "不", "真"],
                answer: 1
            },
            {
                type: "translate",
                question: "¿Cómo dices 'Está lloviendo'?",
                options: ["下雨了", "很冷", "很热", "天气好"],
                answer: 0
            },
            {
                type: "meaning",
                question: "¿Qué significa 冷？",
                options: ["caliente", "frío", "lluvioso", "nublado"],
                answer: 1
            }
        ]
    },

    // ===== LECCIÓN 13: 他在学做中国菜呢 - Acciones en progreso =====
    {
        num: 13,
        title: "他在学做中国菜呢",
        subtitle: "Tā zài xué zuò Zhōngguó cài ne - Está aprendiendo a cocinar comida china",
        topic: "Acciones en progreso",
        introduction: "Aprende a expresar acciones en progreso con 在...呢, vocabulario de actividades diarias, y cómo hacer llamadas telefónicas.",
        objectives: [
            "Expresar acciones en progreso con 在...呢",
            "Actividades diarias (dormir, ver TV, estudiar)",
            "Hacer y recibir llamadas telefónicas",
            "Partícula 吧 para sugerencias"
        ],
        dialogue: {
            title: "Llamada telefónica",
            lines: [
                { speaker: "A", cn: "喂，你好！你在做什么呢？", py: "Wèi, nǐ hǎo! Nǐ zài zuò shénme ne?", es: "¡Hola! ¿Qué estás haciendo?" },
                { speaker: "B", cn: "我在看电视呢。你呢？", py: "Wǒ zài kàn diànshì ne. Nǐ ne?", es: "Estoy viendo televisión. ¿Y tú?" },
                { speaker: "A", cn: "我在学做中国菜。下午一起吃饭吧？", py: "Wǒ zài xué zuò Zhōngguó cài. Xiàwǔ yìqǐ chī fàn ba?", es: "Estoy aprendiendo a cocinar comida china. ¿Comemos juntos por la tarde?" },
                { speaker: "B", cn: "好的！", py: "Hǎo de!", es: "¡Vale!" }
            ]
        },
        keyPoints: [
            {
                point: "在...呢 para acciones en progreso",
                explanation: "Sujeto + 在 + Verbo + (Objeto) + 呢 indica acción en curso: 他在睡觉呢 (Él está durmiendo)."
            },
            {
                point: "喂 para contestar el teléfono",
                explanation: "喂 (wèi) es el equivalente a 'Hola' o 'Diga' al contestar una llamada telefónica."
            },
            {
                point: "吧 para sugerencias",
                explanation: "Añade 吧 al final para hacer sugerencias suaves: 走吧 (Vamos), 吃饭吧 (Vamos a comer)."
            }
        ],
        culturalNote: "En China, es común contestar el teléfono con un simple '喂' seguido de '你好'. Colgar sin despedirse no es considerado maleducado en llamadas cortas.",
        grammar: "zai",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo dices 'Estoy estudiando'?",
                options: ["我学习", "我在学习呢", "我想学习", "我会学习"],
                answer: 1
            },
            {
                type: "complete",
                question: "我们一起去___？(¿Vamos juntos?)",
                options: ["吗", "呢", "吧", "的"],
                answer: 2
            },
            {
                type: "translate",
                question: "¿Cómo contestas el teléfono?",
                options: ["你好", "喂", "再见", "谢谢"],
                answer: 1
            },
            {
                type: "meaning",
                question: "¿Qué significa 睡觉？",
                options: ["comer", "dormir", "trabajar", "estudiar"],
                answer: 1
            }
        ]
    },

    // ===== LECCIÓN 14: 她买了不少衣服 - Acciones completadas =====
    {
        num: 14,
        title: "她买了不少衣服",
        subtitle: "Tā mǎi le bù shǎo yīfu - Ella compró bastante ropa",
        topic: "Acciones completadas",
        introduction: "Aprende a expresar acciones completadas con 了, cuantificadores como 不少, y vocabulario de compras y ropa.",
        objectives: [
            "Usar 了 para acciones completadas",
            "Expresiones de cantidad: 不少, 一点儿",
            "Vocabulario de ropa y compras",
            "Verbos: comprar, ver (avistar)"
        ],
        dialogue: {
            title: "Después de ir de compras",
            lines: [
                { speaker: "A", cn: "你买了什么？", py: "Nǐ mǎi le shénme?", es: "¿Qué compraste?" },
                { speaker: "B", cn: "我买了不少衣服，都很漂亮！", py: "Wǒ mǎi le bù shǎo yīfu, dōu hěn piàoliang!", es: "Compré bastante ropa, ¡toda muy bonita!" },
                { speaker: "A", cn: "我看见了，那件红色的很好看。", py: "Wǒ kànjiàn le, nà jiàn hóngsè de hěn hǎokàn.", es: "Ya vi, esa roja es muy bonita." },
                { speaker: "B", cn: "我也买了一点儿水果。", py: "Wǒ yě mǎi le yìdiǎnr shuǐguǒ.", es: "También compré un poco de fruta." }
            ]
        },
        keyPoints: [
            {
                point: "了 para acciones completadas",
                explanation: "Verbo + 了 indica que la acción ya se completó: 我吃了 (Ya comí), 她买了 (Ella compró)."
            },
            {
                point: "不少 vs 一点儿",
                explanation: "不少 = bastante/no poco. 一点儿 = un poco. Son cuantificadores de cantidad."
            },
            {
                point: "都 para 'todos'",
                explanation: "都 significa 'todos/ambos' y va antes del verbo: 我们都是学生 (Todos somos estudiantes)."
            }
        ],
        culturalNote: "Regatear es común en mercados chinos. Preguntar el precio y negociar es parte de la cultura de compras, especialmente en mercados tradicionales.",
        grammar: "le",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo dices 'Ya comí'?",
                options: ["我吃", "我在吃", "我吃了", "我想吃"],
                answer: 2
            },
            {
                type: "complete",
                question: "她买了___衣服。(Ella compró bastante ropa)",
                options: ["很", "太", "不少", "一点儿"],
                answer: 2
            },
            {
                type: "translate",
                question: "¿Cómo dices 'Todos somos estudiantes'?",
                options: ["我是学生", "我们是学生", "我们都是学生", "他们是学生"],
                answer: 2
            },
            {
                type: "meaning",
                question: "¿Qué significa 漂亮？",
                options: ["grande", "pequeño", "bonito", "feo"],
                answer: 2
            }
        ]
    },

    // ===== LECCIÓN 15: 我是坐飞机来的 - Énfasis y transporte =====
    {
        num: 15,
        title: "我是坐飞机来的",
        subtitle: "Wǒ shì zuò fēijī lái de - Vine en avión",
        topic: "Énfasis y transporte",
        introduction: "En esta lección final aprenderás la estructura 是...的 para enfatizar cómo, cuándo o dónde ocurrió algo, y vocabulario de transporte.",
        objectives: [
            "Usar 是...的 para énfasis",
            "Vocabulario de transporte",
            "Expresiones para conocer gente nueva",
            "Verbo 来 (venir) y direcciones"
        ],
        dialogue: {
            title: "Conociendo a alguien",
            lines: [
                { speaker: "A", cn: "认识你很高兴！你是什么时候来北京的？", py: "Rènshi nǐ hěn gāoxìng! Nǐ shì shénme shíhou lái Běijīng de?", es: "¡Encantado de conocerte! ¿Cuándo viniste a Beijing?" },
                { speaker: "B", cn: "我是上个月来的。", py: "Wǒ shì shàng gè yuè lái de.", es: "Vine el mes pasado." },
                { speaker: "A", cn: "你是怎么来的？坐飞机吗？", py: "Nǐ shì zěnme lái de? Zuò fēijī ma?", es: "¿Cómo viniste? ¿En avión?" },
                { speaker: "B", cn: "是的，我是坐飞机来的。", py: "Shì de, wǒ shì zuò fēijī lái de.", es: "Sí, vine en avión." }
            ]
        },
        keyPoints: [
            {
                point: "Estructura 是...的",
                explanation: "Sujeto + 是 + [tiempo/lugar/modo] + Verbo + 的 enfatiza el tiempo, lugar o manera: 我是坐飞机来的 (Vine EN AVIÓN)."
            },
            {
                point: "Medios de transporte",
                explanation: "坐 + transporte para indicar cómo viajas: 坐飞机 (en avión), 坐出租车 (en taxi), 坐火车 (en tren)."
            },
            {
                point: "认识 para conocer personas",
                explanation: "认识 significa conocer a alguien. 认识你很高兴 = Encantado de conocerte."
            }
        ],
        culturalNote: "China tiene una de las redes de trenes de alta velocidad más extensas del mundo. El '高铁' (gāotiě) conecta las principales ciudades de forma rápida y económica.",
        grammar: "shide",
        exercises: [
            {
                type: "translate",
                question: "¿Cómo enfatizas que viniste EN AVIÓN?",
                options: ["我坐飞机来", "我是坐飞机来的", "我要坐飞机来", "我会坐飞机来"],
                answer: 1
            },
            {
                type: "complete",
                question: "你是什么时候___的？(¿Cuándo viniste?)",
                options: ["去", "来", "走", "回"],
                answer: 1
            },
            {
                type: "translate",
                question: "¿Cómo dices 'Encantado de conocerte'?",
                options: ["你好", "谢谢", "认识你很高兴", "再见"],
                answer: 2
            },
            {
                type: "meaning",
                question: "¿Qué significa 出租车？",
                options: ["autobús", "metro", "taxi", "avión"],
                answer: 2
            }
        ]
    }
];

// Exportar datos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HSK1_VOCABULARY,
        CHINESE_NUMBERS,
        LESSONS_INFO,
        RADICALS,
        GRAMMAR_POINTS,
        EXAM_QUESTIONS,
        TONE_PRACTICE,
        HANZI_PRACTICE,
        LESSONS_CONTENT
    };
}
