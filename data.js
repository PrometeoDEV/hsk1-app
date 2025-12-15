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

// ===== Puntos gramaticales =====
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
        HANZI_PRACTICE
    };
}
