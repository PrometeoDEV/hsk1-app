// ===== Backup & Export Module - HSK Learning =====
// Sistema de exportar/importar progreso y datos

const BackupModule = {
    // ===== Versión del formato de backup =====
    version: '1.0',

    // ===== Inicialización =====
    init() {
        console.log('✓ Backup Module inicializado');
    },

    // ===== Recopilar Todos los Datos =====
    collectAllData() {
        const data = {
            version: this.version,
            exportDate: new Date().toISOString(),
            appName: 'HSK Study App',
            level: typeof HSK_CONFIG !== 'undefined' ? HSK_CONFIG.currentLevel : 1,

            // Progreso principal
            progress: JSON.parse(localStorage.getItem('hsk1_progress') || '{}'),

            // Datos SRS
            srsData: JSON.parse(localStorage.getItem('hsk1_srs') || '{}'),

            // Metas diarias
            dailyGoals: JSON.parse(localStorage.getItem('hsk1_daily_goals') || '{}'),

            // Sesiones de estudio
            studySessions: JSON.parse(localStorage.getItem('hsk_study_sessions') || '[]'),

            // Configuración
            settings: {
                darkMode: localStorage.getItem('hsk_dark_mode') === 'true',
                currentLevel: localStorage.getItem('hsk_current_level') || '1'
            },

            // Estadísticas
            stats: {
                totalXP: parseInt(localStorage.getItem('hsk1_total_xp') || '0'),
                streak: parseInt(localStorage.getItem('hsk1_streak') || '0'),
                lastStudyDate: localStorage.getItem('hsk1_last_study_date'),
                achievements: JSON.parse(localStorage.getItem('hsk1_achievements') || '[]')
            }
        };

        return data;
    },

    // ===== Exportar como JSON =====
    exportAsJSON() {
        const data = this.collectAllData();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const date = new Date().toISOString().split('T')[0];
        const filename = `hsk-backup-${date}.json`;

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return { success: true, filename };
    },

    // ===== Exportar Vocabulario para Anki =====
    exportForAnki() {
        const vocabulary = typeof HSK1_VOCABULARY !== 'undefined' ? HSK1_VOCABULARY : [];
        const srsData = JSON.parse(localStorage.getItem('hsk1_srs') || '{}');

        // Formato: Hanzi; Pinyin; Significado; Audio[sound:]; Tags
        let ankiText = '';

        vocabulary.forEach(word => {
            const status = srsData[word.id] ? 'learned' : 'new';
            ankiText += `${word.hanzi}\t${word.pinyin}\t${word.meaning}\tHSK1 ${status}\n`;
        });

        const blob = new Blob([ankiText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const date = new Date().toISOString().split('T')[0];
        const filename = `hsk1-anki-${date}.txt`;

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return { success: true, filename, wordCount: vocabulary.length };
    },

    // ===== Exportar como CSV =====
    exportAsCSV() {
        const vocabulary = typeof HSK1_VOCABULARY !== 'undefined' ? HSK1_VOCABULARY : [];
        const srsData = JSON.parse(localStorage.getItem('hsk1_srs') || '{}');

        // Header
        let csv = 'ID,Hanzi,Pinyin,Significado,Nivel SRS,Última Revisión,Próxima Revisión\n';

        vocabulary.forEach(word => {
            const srs = srsData[word.id] || {};
            const lastReview = srs.lastReview ? new Date(srs.lastReview).toLocaleDateString() : '-';
            const nextReview = srs.nextReview ? new Date(srs.nextReview).toLocaleDateString() : '-';
            const level = srs.level || 0;

            // Escapar comas en el significado
            const meaning = `"${word.meaning.replace(/"/g, '""')}"`;

            csv += `${word.id},${word.hanzi},${word.pinyin},${meaning},${level},${lastReview},${nextReview}\n`;
        });

        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const date = new Date().toISOString().split('T')[0];
        const filename = `hsk1-progress-${date}.csv`;

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return { success: true, filename };
    },

    // ===== Exportar PDF de Flashcards (preparación) =====
    generatePrintableFlashcards() {
        const vocabulary = typeof HSK1_VOCABULARY !== 'undefined' ? HSK1_VOCABULARY : [];

        let html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>HSK1 Flashcards - Para Imprimir</title>
                <style>
                    @page { size: A4; margin: 1cm; }
                    body { font-family: Arial, sans-serif; }
                    .flashcard-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 10px;
                        page-break-inside: avoid;
                    }
                    .flashcard {
                        border: 2px solid #333;
                        border-radius: 8px;
                        padding: 15px;
                        text-align: center;
                        page-break-inside: avoid;
                        min-height: 120px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    .hanzi { font-size: 32px; font-weight: bold; color: #e53935; }
                    .pinyin { font-size: 14px; color: #666; margin: 5px 0; }
                    .meaning { font-size: 12px; color: #333; }
                    h1 { text-align: center; color: #e53935; }
                    .page-break { page-break-after: always; }
                </style>
            </head>
            <body>
                <h1>HSK1 Flashcards - 150 Palabras</h1>
        `;

        for (let i = 0; i < vocabulary.length; i += 12) {
            html += '<div class="flashcard-grid">';

            for (let j = i; j < Math.min(i + 12, vocabulary.length); j++) {
                const word = vocabulary[j];
                html += `
                    <div class="flashcard">
                        <div class="hanzi">${word.hanzi}</div>
                        <div class="pinyin">${word.pinyin}</div>
                        <div class="meaning">${word.meaning}</div>
                    </div>
                `;
            }

            html += '</div>';
            if (i + 12 < vocabulary.length) {
                html += '<div class="page-break"></div>';
            }
        }

        html += '</body></html>';

        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'hsk1-flashcards-print.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return { success: true, message: 'Abre el archivo HTML y usa Ctrl+P para imprimir' };
    },

    // ===== Importar Datos =====
    importFromJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);

            // Validar versión y estructura
            if (!data.version || !data.exportDate) {
                return { success: false, error: 'Formato de archivo inválido' };
            }

            // Confirmar antes de sobrescribir
            const confirmImport = confirm(
                `¿Importar backup del ${new Date(data.exportDate).toLocaleDateString()}?\n` +
                `Esto sobrescribirá tu progreso actual.`
            );

            if (!confirmImport) {
                return { success: false, error: 'Importación cancelada' };
            }

            // Restaurar datos
            if (data.progress) {
                localStorage.setItem('hsk1_progress', JSON.stringify(data.progress));
            }
            if (data.srsData) {
                localStorage.setItem('hsk1_srs', JSON.stringify(data.srsData));
            }
            if (data.dailyGoals) {
                localStorage.setItem('hsk1_daily_goals', JSON.stringify(data.dailyGoals));
            }
            if (data.studySessions) {
                localStorage.setItem('hsk_study_sessions', JSON.stringify(data.studySessions));
            }
            if (data.stats) {
                if (data.stats.totalXP) localStorage.setItem('hsk1_total_xp', data.stats.totalXP.toString());
                if (data.stats.streak) localStorage.setItem('hsk1_streak', data.stats.streak.toString());
                if (data.stats.lastStudyDate) localStorage.setItem('hsk1_last_study_date', data.stats.lastStudyDate);
                if (data.stats.achievements) localStorage.setItem('hsk1_achievements', JSON.stringify(data.stats.achievements));
            }
            if (data.settings) {
                if (data.settings.darkMode !== undefined) {
                    localStorage.setItem('hsk_dark_mode', data.settings.darkMode.toString());
                }
            }

            return {
                success: true,
                message: 'Datos importados correctamente. Recarga la página para ver los cambios.',
                data: {
                    wordsLearned: data.progress?.learned?.length || 0,
                    srsCards: Object.keys(data.srsData || {}).length,
                    xp: data.stats?.totalXP || 0
                }
            };

        } catch (e) {
            return { success: false, error: 'Error al leer el archivo: ' + e.message };
        }
    },

    // ===== Crear Input para Importar =====
    createImportDialog() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const result = this.importFromJSON(event.target.result);
                if (result.success) {
                    alert(result.message);
                    location.reload();
                } else {
                    alert('Error: ' + result.error);
                }
            };
            reader.readAsText(file);
        };

        input.click();
    },

    // ===== Resetear Todo el Progreso =====
    resetAllProgress() {
        const confirm1 = confirm('¿Estás seguro de que quieres borrar TODO tu progreso?');
        if (!confirm1) return { success: false };

        const confirm2 = confirm('Esta acción NO se puede deshacer. ¿Continuar?');
        if (!confirm2) return { success: false };

        // Lista de claves a eliminar
        const keys = [
            'hsk1_progress',
            'hsk1_srs',
            'hsk1_daily_goals',
            'hsk_study_sessions',
            'hsk1_total_xp',
            'hsk1_streak',
            'hsk1_last_study_date',
            'hsk1_achievements',
            'hsk1_vocabulary_progress'
        ];

        keys.forEach(key => localStorage.removeItem(key));

        return {
            success: true,
            message: 'Progreso eliminado. Recarga la página.'
        };
    },

    // ===== Obtener Tamaño de Datos =====
    getDataSize() {
        let total = 0;
        const sizes = {};

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('hsk')) {
                const size = (localStorage.getItem(key) || '').length * 2; // UTF-16
                sizes[key] = size;
                total += size;
            }
        }

        return {
            total: this.formatBytes(total),
            breakdown: sizes,
            available: this.formatBytes(5 * 1024 * 1024 - total) // ~5MB localStorage limit
        };
    },

    formatBytes(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
};
