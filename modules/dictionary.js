// ===== Dictionary Module - CC-CEDICT Based =====
// Modular dictionary with local cache + online fallback

const ChineseDictionary = {
    // Local cache for frequently used words
    localCache: new Map(),

    // CC-CEDICT subset for HSK words (expandable)
    // Format: simplified: { traditional, pinyin, definitions[], hskLevel }
    hskDictionary: {
        // HSK1 Essential Words with detailed definitions
        '你': { trad: '你', pinyin: 'nǐ', defs: ['tú', 'usted'], hsk: 1, freq: 1 },
        '好': { trad: '好', pinyin: 'hǎo', defs: ['bueno', 'bien', 'muy'], hsk: 1, freq: 2 },
        '我': { trad: '我', pinyin: 'wǒ', defs: ['yo', 'me', 'mi'], hsk: 1, freq: 3 },
        '是': { trad: '是', pinyin: 'shì', defs: ['ser', 'estar', 'sí'], hsk: 1, freq: 4 },
        '的': { trad: '的', pinyin: 'de', defs: ['partícula posesiva', 'de'], hsk: 1, freq: 5 },
        '不': { trad: '不', pinyin: 'bù', defs: ['no', 'negación'], hsk: 1, freq: 6 },
        '了': { trad: '了', pinyin: 'le', defs: ['partícula de aspecto completado'], hsk: 1, freq: 7 },
        '在': { trad: '在', pinyin: 'zài', defs: ['en', 'estar en', 'existir'], hsk: 1, freq: 8 },
        '他': { trad: '他', pinyin: 'tā', defs: ['él'], hsk: 1, freq: 9 },
        '她': { trad: '她', pinyin: 'tā', defs: ['ella'], hsk: 1, freq: 10 },
        '们': { trad: '們', pinyin: 'men', defs: ['sufijo de plural para personas'], hsk: 1, freq: 11 },
        '这': { trad: '這', pinyin: 'zhè', defs: ['este', 'esta', 'esto'], hsk: 1, freq: 12 },
        '那': { trad: '那', pinyin: 'nà', defs: ['ese', 'esa', 'eso', 'aquel'], hsk: 1, freq: 13 },
        '什么': { trad: '什麼', pinyin: 'shénme', defs: ['qué', 'algo'], hsk: 1, freq: 14 },
        '谁': { trad: '誰', pinyin: 'shéi', defs: ['quién'], hsk: 1, freq: 15 },
        '哪': { trad: '哪', pinyin: 'nǎ', defs: ['cuál', 'qué', 'dónde'], hsk: 1, freq: 16 },
        '几': { trad: '幾', pinyin: 'jǐ', defs: ['cuántos', 'algunos'], hsk: 1, freq: 17 },
        '多': { trad: '多', pinyin: 'duō', defs: ['mucho', 'más', 'cuánto'], hsk: 1, freq: 18 },
        '少': { trad: '少', pinyin: 'shǎo', defs: ['poco', 'menos', 'joven'], hsk: 1, freq: 19 },
        '很': { trad: '很', pinyin: 'hěn', defs: ['muy', 'mucho'], hsk: 1, freq: 20 },
        '太': { trad: '太', pinyin: 'tài', defs: ['demasiado', 'muy'], hsk: 1, freq: 21 },
        '都': { trad: '都', pinyin: 'dōu', defs: ['todos', 'ambos', 'ya'], hsk: 1, freq: 22 },
        '也': { trad: '也', pinyin: 'yě', defs: ['también', 'tampoco'], hsk: 1, freq: 23 },
        '和': { trad: '和', pinyin: 'hé', defs: ['y', 'con', 'paz'], hsk: 1, freq: 24 },
        '有': { trad: '有', pinyin: 'yǒu', defs: ['tener', 'haber', 'existir'], hsk: 1, freq: 25 },
        '没': { trad: '沒', pinyin: 'méi', defs: ['no tener', 'no haber'], hsk: 1, freq: 26 },
        '会': { trad: '會', pinyin: 'huì', defs: ['saber', 'poder', 'reunión'], hsk: 1, freq: 27 },
        '能': { trad: '能', pinyin: 'néng', defs: ['poder', 'ser capaz'], hsk: 1, freq: 28 },
        '想': { trad: '想', pinyin: 'xiǎng', defs: ['pensar', 'querer', 'extrañar'], hsk: 1, freq: 29 },
        '要': { trad: '要', pinyin: 'yào', defs: ['querer', 'necesitar', 'ir a'], hsk: 1, freq: 30 },
        '去': { trad: '去', pinyin: 'qù', defs: ['ir', 'irse'], hsk: 1, freq: 31 },
        '来': { trad: '來', pinyin: 'lái', defs: ['venir', 'llegar'], hsk: 1, freq: 32 },
        '吃': { trad: '吃', pinyin: 'chī', defs: ['comer'], hsk: 1, freq: 33 },
        '喝': { trad: '喝', pinyin: 'hē', defs: ['beber'], hsk: 1, freq: 34 },
        '看': { trad: '看', pinyin: 'kàn', defs: ['ver', 'mirar', 'leer'], hsk: 1, freq: 35 },
        '听': { trad: '聽', pinyin: 'tīng', defs: ['escuchar', 'oír'], hsk: 1, freq: 36 },
        '说': { trad: '說', pinyin: 'shuō', defs: ['hablar', 'decir'], hsk: 1, freq: 37 },
        '读': { trad: '讀', pinyin: 'dú', defs: ['leer', 'estudiar'], hsk: 1, freq: 38 },
        '写': { trad: '寫', pinyin: 'xiě', defs: ['escribir'], hsk: 1, freq: 39 },
        '学': { trad: '學', pinyin: 'xué', defs: ['aprender', 'estudiar'], hsk: 1, freq: 40 },
        '做': { trad: '做', pinyin: 'zuò', defs: ['hacer', 'fabricar'], hsk: 1, freq: 41 },
        '工作': { trad: '工作', pinyin: 'gōngzuò', defs: ['trabajo', 'trabajar'], hsk: 1, freq: 42 },
        '住': { trad: '住', pinyin: 'zhù', defs: ['vivir', 'residir', 'parar'], hsk: 1, freq: 43 },
        '坐': { trad: '坐', pinyin: 'zuò', defs: ['sentarse', 'tomar (transporte)'], hsk: 1, freq: 44 },
        '买': { trad: '買', pinyin: 'mǎi', defs: ['comprar'], hsk: 1, freq: 45 },
        '叫': { trad: '叫', pinyin: 'jiào', defs: ['llamarse', 'llamar', 'pedir'], hsk: 1, freq: 46 },
        '爱': { trad: '愛', pinyin: 'ài', defs: ['amar', 'amor', 'gustar'], hsk: 1, freq: 47 },
        '喜欢': { trad: '喜歡', pinyin: 'xǐhuan', defs: ['gustar', 'agradar'], hsk: 1, freq: 48 },
        '高兴': { trad: '高興', pinyin: 'gāoxìng', defs: ['feliz', 'contento'], hsk: 1, freq: 49 },
        '漂亮': { trad: '漂亮', pinyin: 'piàoliang', defs: ['bonito', 'hermoso'], hsk: 1, freq: 50 },
        // Numbers
        '一': { trad: '一', pinyin: 'yī', defs: ['uno', '1'], hsk: 1, freq: 51 },
        '二': { trad: '二', pinyin: 'èr', defs: ['dos', '2'], hsk: 1, freq: 52 },
        '三': { trad: '三', pinyin: 'sān', defs: ['tres', '3'], hsk: 1, freq: 53 },
        '四': { trad: '四', pinyin: 'sì', defs: ['cuatro', '4'], hsk: 1, freq: 54 },
        '五': { trad: '五', pinyin: 'wǔ', defs: ['cinco', '5'], hsk: 1, freq: 55 },
        '六': { trad: '六', pinyin: 'liù', defs: ['seis', '6'], hsk: 1, freq: 56 },
        '七': { trad: '七', pinyin: 'qī', defs: ['siete', '7'], hsk: 1, freq: 57 },
        '八': { trad: '八', pinyin: 'bā', defs: ['ocho', '8'], hsk: 1, freq: 58 },
        '九': { trad: '九', pinyin: 'jiǔ', defs: ['nueve', '9'], hsk: 1, freq: 59 },
        '十': { trad: '十', pinyin: 'shí', defs: ['diez', '10'], hsk: 1, freq: 60 },
        '百': { trad: '百', pinyin: 'bǎi', defs: ['cien', '100'], hsk: 1, freq: 61 },
        '千': { trad: '千', pinyin: 'qiān', defs: ['mil', '1000'], hsk: 1, freq: 62 },
        '零': { trad: '零', pinyin: 'líng', defs: ['cero', '0'], hsk: 1, freq: 63 },
        '两': { trad: '兩', pinyin: 'liǎng', defs: ['dos (cantidad)', 'ambos'], hsk: 1, freq: 64 },
        // Time
        '年': { trad: '年', pinyin: 'nián', defs: ['año'], hsk: 1, freq: 65 },
        '月': { trad: '月', pinyin: 'yuè', defs: ['mes', 'luna'], hsk: 1, freq: 66 },
        '日': { trad: '日', pinyin: 'rì', defs: ['día', 'sol'], hsk: 1, freq: 67 },
        '号': { trad: '號', pinyin: 'hào', defs: ['número', 'día del mes'], hsk: 1, freq: 68 },
        '星期': { trad: '星期', pinyin: 'xīngqī', defs: ['semana'], hsk: 1, freq: 69 },
        '今天': { trad: '今天', pinyin: 'jīntiān', defs: ['hoy'], hsk: 1, freq: 70 },
        '明天': { trad: '明天', pinyin: 'míngtiān', defs: ['mañana'], hsk: 1, freq: 71 },
        '昨天': { trad: '昨天', pinyin: 'zuótiān', defs: ['ayer'], hsk: 1, freq: 72 },
        '现在': { trad: '現在', pinyin: 'xiànzài', defs: ['ahora', 'actualmente'], hsk: 1, freq: 73 },
        '时候': { trad: '時候', pinyin: 'shíhou', defs: ['momento', 'tiempo', 'cuando'], hsk: 1, freq: 74 },
        '点': { trad: '點', pinyin: 'diǎn', defs: ['hora (reloj)', 'punto', 'un poco'], hsk: 1, freq: 75 },
        '分钟': { trad: '分鐘', pinyin: 'fēnzhōng', defs: ['minuto'], hsk: 1, freq: 76 },
        // Places
        '中国': { trad: '中國', pinyin: 'Zhōngguó', defs: ['China'], hsk: 1, freq: 77 },
        '北京': { trad: '北京', pinyin: 'Běijīng', defs: ['Beijing', 'Pekín'], hsk: 1, freq: 78 },
        '学校': { trad: '學校', pinyin: 'xuéxiào', defs: ['escuela', 'colegio'], hsk: 1, freq: 79 },
        '医院': { trad: '醫院', pinyin: 'yīyuàn', defs: ['hospital'], hsk: 1, freq: 80 },
        '商店': { trad: '商店', pinyin: 'shāngdiàn', defs: ['tienda'], hsk: 1, freq: 81 },
        '饭店': { trad: '飯店', pinyin: 'fàndiàn', defs: ['restaurante', 'hotel'], hsk: 1, freq: 82 },
        '家': { trad: '家', pinyin: 'jiā', defs: ['casa', 'familia', 'hogar'], hsk: 1, freq: 83 },
        // People
        '人': { trad: '人', pinyin: 'rén', defs: ['persona', 'gente'], hsk: 1, freq: 84 },
        '朋友': { trad: '朋友', pinyin: 'péngyou', defs: ['amigo'], hsk: 1, freq: 85 },
        '同学': { trad: '同學', pinyin: 'tóngxué', defs: ['compañero de clase'], hsk: 1, freq: 86 },
        '老师': { trad: '老師', pinyin: 'lǎoshī', defs: ['profesor', 'maestro'], hsk: 1, freq: 87 },
        '学生': { trad: '學生', pinyin: 'xuésheng', defs: ['estudiante', 'alumno'], hsk: 1, freq: 88 },
        '医生': { trad: '醫生', pinyin: 'yīshēng', defs: ['médico', 'doctor'], hsk: 1, freq: 89 },
        '先生': { trad: '先生', pinyin: 'xiānsheng', defs: ['señor', 'esposo'], hsk: 1, freq: 90 },
        '小姐': { trad: '小姐', pinyin: 'xiǎojiě', defs: ['señorita'], hsk: 1, freq: 91 },
        '爸爸': { trad: '爸爸', pinyin: 'bàba', defs: ['papá', 'padre'], hsk: 1, freq: 92 },
        '妈妈': { trad: '媽媽', pinyin: 'māma', defs: ['mamá', 'madre'], hsk: 1, freq: 93 },
        '儿子': { trad: '兒子', pinyin: 'érzi', defs: ['hijo'], hsk: 1, freq: 94 },
        '女儿': { trad: '女兒', pinyin: 'nǚér', defs: ['hija'], hsk: 1, freq: 95 },
        // Objects
        '书': { trad: '書', pinyin: 'shū', defs: ['libro'], hsk: 1, freq: 96 },
        '电脑': { trad: '電腦', pinyin: 'diànnǎo', defs: ['computadora', 'ordenador'], hsk: 1, freq: 97 },
        '电视': { trad: '電視', pinyin: 'diànshì', defs: ['televisión', 'TV'], hsk: 1, freq: 98 },
        '电影': { trad: '電影', pinyin: 'diànyǐng', defs: ['película', 'cine'], hsk: 1, freq: 99 },
        '手机': { trad: '手機', pinyin: 'shǒujī', defs: ['teléfono móvil', 'celular'], hsk: 1, freq: 100 },
        '钱': { trad: '錢', pinyin: 'qián', defs: ['dinero'], hsk: 1, freq: 101 },
        '飞机': { trad: '飛機', pinyin: 'fēijī', defs: ['avión'], hsk: 1, freq: 102 },
        '出租车': { trad: '出租車', pinyin: 'chūzūchē', defs: ['taxi'], hsk: 1, freq: 103 },
        '水': { trad: '水', pinyin: 'shuǐ', defs: ['agua'], hsk: 1, freq: 104 },
        '茶': { trad: '茶', pinyin: 'chá', defs: ['té'], hsk: 1, freq: 105 },
        '米饭': { trad: '米飯', pinyin: 'mǐfàn', defs: ['arroz cocido'], hsk: 1, freq: 106 },
        '菜': { trad: '菜', pinyin: 'cài', defs: ['plato', 'verdura', 'comida'], hsk: 1, freq: 107 },
        '水果': { trad: '水果', pinyin: 'shuǐguǒ', defs: ['fruta'], hsk: 1, freq: 108 },
        '苹果': { trad: '蘋果', pinyin: 'píngguǒ', defs: ['manzana'], hsk: 1, freq: 109 },
        '天气': { trad: '天氣', pinyin: 'tiānqì', defs: ['clima', 'tiempo atmosférico'], hsk: 1, freq: 110 },
        '衣服': { trad: '衣服', pinyin: 'yīfu', defs: ['ropa', 'vestimenta'], hsk: 1, freq: 111 },
        // Adjectives & Adverbs
        '大': { trad: '大', pinyin: 'dà', defs: ['grande'], hsk: 1, freq: 112 },
        '小': { trad: '小', pinyin: 'xiǎo', defs: ['pequeño'], hsk: 1, freq: 113 },
        '多': { trad: '多', pinyin: 'duō', defs: ['mucho', 'más'], hsk: 1, freq: 114 },
        '少': { trad: '少', pinyin: 'shǎo', defs: ['poco', 'menos'], hsk: 1, freq: 115 },
        '冷': { trad: '冷', pinyin: 'lěng', defs: ['frío'], hsk: 1, freq: 116 },
        '热': { trad: '熱', pinyin: 'rè', defs: ['caliente', 'calor'], hsk: 1, freq: 117 },
        '好': { trad: '好', pinyin: 'hǎo', defs: ['bueno', 'bien'], hsk: 1, freq: 118 },
        // Question words
        '怎么': { trad: '怎麼', pinyin: 'zěnme', defs: ['cómo', 'por qué'], hsk: 1, freq: 119 },
        '怎么样': { trad: '怎麼樣', pinyin: 'zěnmeyàng', defs: ['cómo es', 'qué tal'], hsk: 1, freq: 120 },
        '哪儿': { trad: '哪兒', pinyin: 'nǎr', defs: ['dónde'], hsk: 1, freq: 121 },
        '为什么': { trad: '為什麼', pinyin: 'wèishénme', defs: ['por qué'], hsk: 1, freq: 122 },
        // Common phrases
        '谢谢': { trad: '謝謝', pinyin: 'xièxie', defs: ['gracias'], hsk: 1, freq: 123 },
        '不客气': { trad: '不客氣', pinyin: 'bú kèqi', defs: ['de nada'], hsk: 1, freq: 124 },
        '对不起': { trad: '對不起', pinyin: 'duìbuqǐ', defs: ['lo siento', 'perdón'], hsk: 1, freq: 125 },
        '没关系': { trad: '沒關係', pinyin: 'méi guānxi', defs: ['no importa', 'está bien'], hsk: 1, freq: 126 },
        '再见': { trad: '再見', pinyin: 'zàijiàn', defs: ['adiós', 'hasta luego'], hsk: 1, freq: 127 },
        '请': { trad: '請', pinyin: 'qǐng', defs: ['por favor', 'invitar'], hsk: 1, freq: 128 },
        '名字': { trad: '名字', pinyin: 'míngzi', defs: ['nombre'], hsk: 1, freq: 129 },
        '汉语': { trad: '漢語', pinyin: 'Hànyǔ', defs: ['idioma chino', 'mandarín'], hsk: 1, freq: 130 },
        '中文': { trad: '中文', pinyin: 'Zhōngwén', defs: ['chino (idioma)'], hsk: 1, freq: 131 },
        '字': { trad: '字', pinyin: 'zì', defs: ['carácter', 'letra'], hsk: 1, freq: 132 },
        // More verbs
        '开': { trad: '開', pinyin: 'kāi', defs: ['abrir', 'conducir', 'encender'], hsk: 1, freq: 133 },
        '关': { trad: '關', pinyin: 'guān', defs: ['cerrar', 'apagar'], hsk: 1, freq: 134 },
        '睡觉': { trad: '睡覺', pinyin: 'shuìjiào', defs: ['dormir'], hsk: 1, freq: 135 },
        '起床': { trad: '起床', pinyin: 'qǐchuáng', defs: ['levantarse'], hsk: 1, freq: 136 },
        '回': { trad: '回', pinyin: 'huí', defs: ['volver', 'regresar'], hsk: 1, freq: 137 },
        '打电话': { trad: '打電話', pinyin: 'dǎ diànhuà', defs: ['llamar por teléfono'], hsk: 1, freq: 138 },
        '下雨': { trad: '下雨', pinyin: 'xià yǔ', defs: ['llover'], hsk: 1, freq: 139 },
        '认识': { trad: '認識', pinyin: 'rènshi', defs: ['conocer', 'reconocer'], hsk: 1, freq: 140 },
        // Positions
        '上': { trad: '上', pinyin: 'shàng', defs: ['arriba', 'encima', 'subir'], hsk: 1, freq: 141 },
        '下': { trad: '下', pinyin: 'xià', defs: ['abajo', 'debajo', 'bajar'], hsk: 1, freq: 142 },
        '前面': { trad: '前面', pinyin: 'qiánmiàn', defs: ['delante', 'enfrente'], hsk: 1, freq: 143 },
        '后面': { trad: '後面', pinyin: 'hòumiàn', defs: ['detrás', 'atrás'], hsk: 1, freq: 144 },
        '里面': { trad: '裡面', pinyin: 'lǐmiàn', defs: ['dentro', 'interior'], hsk: 1, freq: 145 },
        // Measure words
        '个': { trad: '個', pinyin: 'gè', defs: ['clasificador general'], hsk: 1, freq: 146 },
        '岁': { trad: '歲', pinyin: 'suì', defs: ['años de edad'], hsk: 1, freq: 147 },
        '块': { trad: '塊', pinyin: 'kuài', defs: ['yuan (dinero)', 'trozo'], hsk: 1, freq: 148 },
        '本': { trad: '本', pinyin: 'běn', defs: ['clasificador para libros'], hsk: 1, freq: 149 },
        '些': { trad: '些', pinyin: 'xiē', defs: ['algunos', 'unos'], hsk: 1, freq: 150 }
    },

    // Search word in dictionary
    search(query) {
        query = query.trim();
        if (!query) return null;

        // Check local dictionary first
        if (this.hskDictionary[query]) {
            return {
                word: query,
                ...this.hskDictionary[query],
                source: 'local'
            };
        }

        // Check cache
        if (this.localCache.has(query)) {
            return this.localCache.get(query);
        }

        return null;
    },

    // Search by pinyin
    searchByPinyin(pinyin) {
        pinyin = pinyin.toLowerCase().trim();
        const results = [];

        for (const [word, data] of Object.entries(this.hskDictionary)) {
            if (data.pinyin.toLowerCase().replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\s]/g, '')
                .includes(pinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\s]/g, ''))) {
                results.push({ word, ...data });
            }
        }

        return results.slice(0, 10); // Limit results
    },

    // Search by meaning (Spanish)
    searchByMeaning(meaning) {
        meaning = meaning.toLowerCase().trim();
        const results = [];

        for (const [word, data] of Object.entries(this.hskDictionary)) {
            if (data.defs.some(def => def.toLowerCase().includes(meaning))) {
                results.push({ word, ...data });
            }
        }

        return results.slice(0, 10);
    },

    // Get all words for a specific HSK level
    getWordsByLevel(level) {
        const results = [];
        for (const [word, data] of Object.entries(this.hskDictionary)) {
            if (data.hsk === level) {
                results.push({ word, ...data });
            }
        }
        return results.sort((a, b) => a.freq - b.freq);
    },

    // Get word count for each level
    getWordCounts() {
        const counts = {};
        for (const data of Object.values(this.hskDictionary)) {
            counts[data.hsk] = (counts[data.hsk] || 0) + 1;
        }
        return counts;
    },

    // Add word to cache (for future API responses)
    addToCache(word, data) {
        this.localCache.set(word, data);
    },

    // Load additional dictionary data (for future HSK levels)
    loadLevel(level, data) {
        for (const [word, entry] of Object.entries(data)) {
            entry.hsk = level;
            this.hskDictionary[word] = entry;
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChineseDictionary;
}
