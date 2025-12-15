// ===== Radicals & Character Decomposition Module - HSK Learning =====
// Sistema de radicales y descomposición de caracteres

const RadicalsModule = {
    // ===== Base de Radicales Comunes =====
    radicals: {
        // Radicales de personas
        '人': { pinyin: 'rén', meaning: 'persona', examples: ['你', '他', '们', '什', '休'] },
        '亻': { pinyin: 'rén', meaning: 'persona (lateral)', examples: ['你', '他', '们', '做', '住'] },
        '女': { pinyin: 'nǚ', meaning: 'mujer', examples: ['她', '好', '妈', '姐', '妹'] },
        '子': { pinyin: 'zǐ', meaning: 'hijo/niño', examples: ['学', '字', '孩'] },

        // Radicales de naturaleza
        '水': { pinyin: 'shuǐ', meaning: 'agua', examples: ['海', '河', '湖'] },
        '氵': { pinyin: 'shuǐ', meaning: 'agua (lateral)', examples: ['没', '洗', '漂', '汉'] },
        '火': { pinyin: 'huǒ', meaning: 'fuego', examples: ['热', '点', '烧'] },
        '灬': { pinyin: 'huǒ', meaning: 'fuego (inferior)', examples: ['热', '点', '黑', '然'] },
        '日': { pinyin: 'rì', meaning: 'sol/día', examples: ['明', '时', '早', '晚', '星'] },
        '月': { pinyin: 'yuè', meaning: 'luna/mes', examples: ['明', '有', '朋', '服'] },
        '木': { pinyin: 'mù', meaning: 'madera/árbol', examples: ['本', '机', '李', '果', '校'] },
        '土': { pinyin: 'tǔ', meaning: 'tierra', examples: ['在', '地', '坐', '块'] },
        '山': { pinyin: 'shān', meaning: 'montaña', examples: ['出'] },
        '雨': { pinyin: 'yǔ', meaning: 'lluvia', examples: ['雪', '电', '零'] },

        // Radicales de cuerpo
        '口': { pinyin: 'kǒu', meaning: 'boca', examples: ['吃', '喝', '叫', '听', '和', '吗', '呢', '哪'] },
        '目': { pinyin: 'mù', meaning: 'ojo', examples: ['看', '睡', '眼'] },
        '耳': { pinyin: 'ěr', meaning: 'oreja', examples: ['听'] },
        '手': { pinyin: 'shǒu', meaning: 'mano', examples: ['打', '找'] },
        '扌': { pinyin: 'shǒu', meaning: 'mano (lateral)', examples: ['打', '找', '报'] },
        '足': { pinyin: 'zú', meaning: 'pie', examples: ['跑', '路'] },
        '心': { pinyin: 'xīn', meaning: 'corazón', examples: ['想', '您', '感'] },
        '忄': { pinyin: 'xīn', meaning: 'corazón (lateral)', examples: ['情', '快', '慢'] },

        // Radicales de objetos
        '门': { pinyin: 'mén', meaning: 'puerta', examples: ['们', '问', '间', '闻'] },
        '言': { pinyin: 'yán', meaning: 'palabra', examples: ['说', '话', '请', '读', '谢', '认', '识'] },
        '讠': { pinyin: 'yán', meaning: 'palabra (lateral)', examples: ['说', '话', '请', '读', '谢'] },
        '金': { pinyin: 'jīn', meaning: 'metal/oro', examples: ['钱', '钟'] },
        '钅': { pinyin: 'jīn', meaning: 'metal (lateral)', examples: ['钱', '钟'] },
        '衣': { pinyin: 'yī', meaning: 'ropa', examples: ['衣', '表'] },
        '食': { pinyin: 'shí', meaning: 'comida', examples: ['饭', '饿', '饮'] },
        '饣': { pinyin: 'shí', meaning: 'comida (lateral)', examples: ['饭', '饿'] },

        // Radicales de movimiento/acción
        '走': { pinyin: 'zǒu', meaning: 'caminar', examples: ['走', '起'] },
        '辶': { pinyin: 'chuò', meaning: 'caminar (envolvente)', examples: ['这', '那', '还', '道', '过', '边', '远', '近'] },
        '车': { pinyin: 'chē', meaning: 'vehículo', examples: ['车'] },

        // Radicales de estructuras
        '宀': { pinyin: 'mián', meaning: 'techo', examples: ['家', '字', '学', '客', '安'] },
        '广': { pinyin: 'guǎng', meaning: 'refugio', examples: ['店', '座', '床'] },
        '囗': { pinyin: 'wéi', meaning: 'recinto', examples: ['国', '回', '四', '因'] }
    },

    // ===== Descomposición de Caracteres HSK1 =====
    decomposition: {
        '你': { components: ['亻', '尔'], radicalMain: '亻', meaning: 'persona + sonido ěr = tú' },
        '好': { components: ['女', '子'], radicalMain: '女', meaning: 'mujer + hijo = bueno (madre con hijo)' },
        '我': { components: ['手', '戈'], radicalMain: '手', meaning: 'mano + arma = yo (defender)' },
        '是': { components: ['日', '正'], radicalMain: '日', meaning: 'sol + recto = ser/estar' },
        '他': { components: ['亻', '也'], radicalMain: '亻', meaning: 'persona + también = él' },
        '她': { components: ['女', '也'], radicalMain: '女', meaning: 'mujer + también = ella' },
        '们': { components: ['亻', '门'], radicalMain: '亻', meaning: 'persona + puerta = plural' },
        '的': { components: ['白', '勺'], radicalMain: '白', meaning: 'blanco + cuchara = de (posesivo)' },
        '在': { components: ['土', '才'], radicalMain: '土', meaning: 'tierra + talento = en/estar' },
        '有': { components: ['月', '又'], radicalMain: '月', meaning: 'luna + otra vez = tener' },
        '不': { components: ['一', '不'], radicalMain: '一', meaning: 'uno negado = no' },
        '这': { components: ['辶', '文'], radicalMain: '辶', meaning: 'caminar + texto = este' },
        '那': { components: ['辶', '冄'], radicalMain: '辶', meaning: 'caminar + forma = ese' },
        '来': { components: ['木', '来'], radicalMain: '木', meaning: 'árbol con frutos = venir' },
        '去': { components: ['土', '厶'], radicalMain: '土', meaning: 'tierra + privado = ir' },
        '想': { components: ['木', '目', '心'], radicalMain: '心', meaning: 'árbol + ojo + corazón = pensar' },
        '说': { components: ['讠', '兑'], radicalMain: '讠', meaning: 'palabra + intercambio = hablar' },
        '看': { components: ['手', '目'], radicalMain: '目', meaning: 'mano + ojo = ver/mirar' },
        '听': { components: ['口', '斤'], radicalMain: '口', meaning: 'boca + hacha = escuchar' },
        '吃': { components: ['口', '乞'], radicalMain: '口', meaning: 'boca + pedir = comer' },
        '喝': { components: ['口', '曷'], radicalMain: '口', meaning: 'boca + qué = beber' },
        '做': { components: ['亻', '故'], radicalMain: '亻', meaning: 'persona + razón = hacer' },
        '住': { components: ['亻', '主'], radicalMain: '亻', meaning: 'persona + dueño = vivir' },
        '学': { components: ['冖', '子'], radicalMain: '子', meaning: 'techo + hijo = estudiar' },
        '写': { components: ['冖', '与'], radicalMain: '冖', meaning: 'techo + dar = escribir' },
        '读': { components: ['讠', '卖'], radicalMain: '讠', meaning: 'palabra + vender = leer' },
        '请': { components: ['讠', '青'], radicalMain: '讠', meaning: 'palabra + verde = por favor' },
        '谢': { components: ['讠', '射'], radicalMain: '讠', meaning: 'palabra + disparar = gracias' },
        '问': { components: ['门', '口'], radicalMain: '门', meaning: 'puerta + boca = preguntar' },
        '时': { components: ['日', '寸'], radicalMain: '日', meaning: 'sol + pulgada = tiempo' },
        '明': { components: ['日', '月'], radicalMain: '日', meaning: 'sol + luna = brillante/mañana' },
        '早': { components: ['日', '十'], radicalMain: '日', meaning: 'sol + diez = temprano' },
        '晚': { components: ['日', '免'], radicalMain: '日', meaning: 'sol + libre = tarde/noche' },
        '天': { components: ['一', '大'], radicalMain: '大', meaning: 'uno + grande = cielo/día' },
        '今': { components: ['人', '一'], radicalMain: '人', meaning: 'persona + uno = hoy' },
        '年': { components: ['禾', '干'], radicalMain: '禾', meaning: 'grano + seco = año' },
        '月': { components: ['月'], radicalMain: '月', meaning: 'luna = mes' },
        '号': { components: ['口', '丂'], radicalMain: '口', meaning: 'boca + forma = número/día' },
        '家': { components: ['宀', '豕'], radicalMain: '宀', meaning: 'techo + cerdo = casa/familia' },
        '国': { components: ['囗', '玉'], radicalMain: '囗', meaning: 'recinto + jade = país' },
        '中': { components: ['口', '丨'], radicalMain: '口', meaning: 'boca + línea = centro/medio' },
        '人': { components: ['人'], radicalMain: '人', meaning: 'pictograma de persona' },
        '大': { components: ['大'], radicalMain: '大', meaning: 'persona con brazos abiertos = grande' },
        '小': { components: ['小'], radicalMain: '小', meaning: 'tres gotas = pequeño' }
    },

    // ===== Caracteres Similares =====
    similarCharacters: [
        {
            chars: ['大', '太', '天', '夫'],
            explanation: {
                '大': 'Grande - persona con brazos abiertos',
                '太': 'Muy/demasiado - grande + punto debajo',
                '天': 'Cielo - línea sobre grande (sobre la cabeza)',
                '夫': 'Esposo - grande + línea horizontal arriba'
            },
            tip: '大 es la base. 太 agrega punto (énfasis), 天 agrega línea arriba (cielo), 夫 tiene línea cruzada (adulto)'
        },
        {
            chars: ['人', '入', '八'],
            explanation: {
                '人': 'Persona - dos trazos que se apoyan',
                '入': 'Entrar - trazos hacia adentro',
                '八': 'Ocho - dos trazos separados'
            },
            tip: '人 trazos juntos arriba, 入 el izquierdo es más corto, 八 separados'
        },
        {
            chars: ['日', '目', '白', '百'],
            explanation: {
                '日': 'Sol - rectángulo con línea horizontal',
                '目': 'Ojo - rectángulo con dos líneas (pupila)',
                '白': 'Blanco - sol con acento arriba',
                '百': 'Cien - uno + blanco'
            },
            tip: '日 una línea dentro, 目 dos líneas, 白 tiene acento, 百 = 一 + 白'
        },
        {
            chars: ['土', '士', '工'],
            explanation: {
                '土': 'Tierra - línea inferior más larga',
                '士': 'Erudito - línea superior más larga',
                '工': 'Trabajo - líneas iguales'
            },
            tip: 'Mira cuál línea horizontal es más larga'
        },
        {
            chars: ['已', '己', '巳'],
            explanation: {
                '已': 'Ya - abierto arriba, cerrado abajo',
                '己': 'Uno mismo - abierto arriba y abajo',
                '巳': 'Serpiente - cerrado arriba y abajo'
            },
            tip: '已 abierto arriba, 己 todo abierto, 巳 todo cerrado'
        },
        {
            chars: ['买', '卖'],
            explanation: {
                '买': 'Comprar - solo la parte inferior',
                '卖': 'Vender - tiene 十 arriba (poner precio)'
            },
            tip: '卖 tiene 十 arriba porque "pones precio" para vender'
        },
        {
            chars: ['午', '牛'],
            explanation: {
                '午': 'Mediodía - trazo vertical no cruza arriba',
                '牛': 'Vaca - trazo vertical cruza todo'
            },
            tip: '牛 el trazo vertical atraviesa todo (como cuernos)'
        },
        {
            chars: ['千', '干', '于'],
            explanation: {
                '千': 'Mil - tiene acento a la izquierda',
                '干': 'Seco/hacer - dos líneas horizontales',
                '于': 'En/a - tiene gancho abajo a la derecha'
            },
            tip: '千 acento izquierdo, 干 líneas rectas, 于 gancho derecho'
        }
    ],

    // ===== Métodos =====
    init() {
        console.log('✓ Radicals Module inicializado');
    },

    // Obtener información de radical
    getRadical(radical) {
        return this.radicals[radical] || null;
    },

    // Obtener descomposición de carácter
    getDecomposition(char) {
        return this.decomposition[char] || null;
    },

    // Obtener todos los caracteres con un radical específico
    getCharactersByRadical(radical) {
        const results = [];
        for (const [char, data] of Object.entries(this.decomposition)) {
            if (data.radicalMain === radical || data.components.includes(radical)) {
                results.push({ char, ...data });
            }
        }
        return results;
    },

    // Obtener caracteres similares
    getSimilarCharacters(char) {
        for (const group of this.similarCharacters) {
            if (group.chars.includes(char)) {
                return group;
            }
        }
        return null;
    },

    // Obtener todos los grupos de caracteres similares
    getAllSimilarGroups() {
        return this.similarCharacters;
    },

    // Buscar radical por significado
    searchRadicalByMeaning(meaning) {
        const results = [];
        const query = meaning.toLowerCase();
        for (const [radical, data] of Object.entries(this.radicals)) {
            if (data.meaning.toLowerCase().includes(query)) {
                results.push({ radical, ...data });
            }
        }
        return results;
    },

    // Obtener lista de todos los radicales
    getAllRadicals() {
        return Object.entries(this.radicals).map(([radical, data]) => ({
            radical,
            ...data
        }));
    }
};
