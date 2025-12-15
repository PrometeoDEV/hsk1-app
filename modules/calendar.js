// ===== SRS Calendar Module - HSK Learning =====
// Calendario visual de repaso con sistema de repetición espaciada

const CalendarModule = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),

    // ===== Inicialización =====
    init() {
        console.log('✓ Calendar Module inicializado');
    },

    // ===== Obtener Tarjetas Pendientes por Fecha =====
    getDueCardsByDate(srsData) {
        const dueByDate = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const [wordId, data] of Object.entries(srsData)) {
            if (data.nextReview) {
                const reviewDate = new Date(data.nextReview);
                reviewDate.setHours(0, 0, 0, 0);
                const dateStr = reviewDate.toISOString().split('T')[0];

                if (!dueByDate[dateStr]) {
                    dueByDate[dateStr] = [];
                }
                dueByDate[dateStr].push({
                    wordId: parseInt(wordId),
                    level: data.level,
                    nextReview: reviewDate,
                    isOverdue: reviewDate < today
                });
            }
        }

        return dueByDate;
    },

    // ===== Obtener Estadísticas del Mes =====
    getMonthStats(srsData, month, year) {
        const dueByDate = this.getDueCardsByDate(srsData);
        const stats = {
            totalDue: 0,
            daysWithCards: 0,
            maxCardsInDay: 0,
            overdue: 0
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const [dateStr, cards] of Object.entries(dueByDate)) {
            const date = new Date(dateStr);
            if (date.getMonth() === month && date.getFullYear() === year) {
                stats.totalDue += cards.length;
                stats.daysWithCards++;
                stats.maxCardsInDay = Math.max(stats.maxCardsInDay, cards.length);

                if (date < today) {
                    stats.overdue += cards.length;
                }
            }
        }

        return stats;
    },

    // ===== Generar Datos del Calendario =====
    generateCalendarData(srsData, month, year) {
        const dueByDate = this.getDueCardsByDate(srsData);
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weeks = [];
        let currentWeek = [];

        // Días vacíos al inicio
        for (let i = 0; i < startingDay; i++) {
            currentWeek.push(null);
        }

        // Días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            const cards = dueByDate[dateStr] || [];

            currentWeek.push({
                day,
                date: dateStr,
                isToday: date.getTime() === today.getTime(),
                isPast: date < today,
                isFuture: date > today,
                cards: cards,
                cardCount: cards.length,
                hasOverdue: cards.some(c => c.isOverdue)
            });

            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }

        // Días vacíos al final
        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push(null);
            }
            weeks.push(currentWeek);
        }

        return {
            month,
            year,
            monthName: new Date(year, month).toLocaleDateString('es', { month: 'long' }),
            weeks,
            stats: this.getMonthStats(srsData, month, year)
        };
    },

    // ===== Obtener Tarjetas de Hoy =====
    getTodayCards(srsData) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split('T')[0];

        const dueByDate = this.getDueCardsByDate(srsData);
        const todayCards = dueByDate[todayStr] || [];

        // Incluir también tarjetas atrasadas
        const overdueCards = [];
        for (const [dateStr, cards] of Object.entries(dueByDate)) {
            const date = new Date(dateStr);
            if (date < today) {
                overdueCards.push(...cards);
            }
        }

        return {
            today: todayCards,
            overdue: overdueCards,
            total: todayCards.length + overdueCards.length
        };
    },

    // ===== Obtener Próximos 7 Días =====
    getNextSevenDays(srsData) {
        const dueByDate = this.getDueCardsByDate(srsData);
        const days = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];

            days.push({
                date: dateStr,
                dayName: date.toLocaleDateString('es', { weekday: 'short' }),
                dayNumber: date.getDate(),
                isToday: i === 0,
                cards: dueByDate[dateStr] || [],
                cardCount: (dueByDate[dateStr] || []).length
            });
        }

        return days;
    },

    // ===== Calcular Próxima Fecha de Repaso =====
    calculateNextReview(level, correct) {
        const intervals = [0, 1, 3, 7, 14, 30, 60, 120]; // Días
        let newLevel = level;

        if (correct) {
            newLevel = Math.min(level + 1, intervals.length - 1);
        } else {
            newLevel = Math.max(level - 2, 0);
        }

        const daysUntilReview = intervals[newLevel];
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + daysUntilReview);
        nextDate.setHours(0, 0, 0, 0);

        return {
            level: newLevel,
            nextReview: nextDate.getTime(),
            daysUntil: daysUntilReview
        };
    },

    // ===== Renderizar HTML del Calendario =====
    renderCalendarHTML(srsData, month = null, year = null) {
        if (month === null) month = this.currentMonth;
        if (year === null) year = this.currentYear;

        const data = this.generateCalendarData(srsData, month, year);
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

        let html = `
            <div class="srs-calendar">
                <div class="calendar-header">
                    <button class="calendar-nav prev" onclick="CalendarModule.prevMonth()">◀</button>
                    <h3>${data.monthName} ${data.year}</h3>
                    <button class="calendar-nav next" onclick="CalendarModule.nextMonth()">▶</button>
                </div>
                <div class="calendar-stats">
                    <span class="stat"><strong>${data.stats.totalDue}</strong> tarjetas este mes</span>
                    <span class="stat overdue"><strong>${data.stats.overdue}</strong> atrasadas</span>
                </div>
                <div class="calendar-grid">
                    <div class="calendar-row header">
                        ${dayNames.map(d => `<div class="calendar-cell day-name">${d}</div>`).join('')}
                    </div>
        `;

        for (const week of data.weeks) {
            html += '<div class="calendar-row">';
            for (const day of week) {
                if (day === null) {
                    html += '<div class="calendar-cell empty"></div>';
                } else {
                    const classes = ['calendar-cell'];
                    if (day.isToday) classes.push('today');
                    if (day.isPast) classes.push('past');
                    if (day.hasOverdue) classes.push('overdue');
                    if (day.cardCount > 0) classes.push('has-cards');

                    html += `
                        <div class="${classes.join(' ')}" data-date="${day.date}">
                            <span class="day-number">${day.day}</span>
                            ${day.cardCount > 0 ? `<span class="card-count">${day.cardCount}</span>` : ''}
                        </div>
                    `;
                }
            }
            html += '</div>';
        }

        html += '</div></div>';
        return html;
    },

    // ===== Renderizar Vista de 7 Días =====
    renderWeekViewHTML(srsData) {
        const days = this.getNextSevenDays(srsData);
        const todayInfo = this.getTodayCards(srsData);

        let html = `
            <div class="srs-week-view">
                <div class="week-summary">
                    <div class="summary-item">
                        <span class="summary-number">${todayInfo.total}</span>
                        <span class="summary-label">Para hoy</span>
                    </div>
                    <div class="summary-item overdue">
                        <span class="summary-number">${todayInfo.overdue.length}</span>
                        <span class="summary-label">Atrasadas</span>
                    </div>
                </div>
                <div class="week-days">
        `;

        for (const day of days) {
            const classes = ['week-day'];
            if (day.isToday) classes.push('today');
            if (day.cardCount > 0) classes.push('has-cards');

            html += `
                <div class="${classes.join(' ')}">
                    <span class="week-day-name">${day.dayName}</span>
                    <span class="week-day-number">${day.dayNumber}</span>
                    <span class="week-day-cards">${day.cardCount > 0 ? day.cardCount : '-'}</span>
                </div>
            `;
        }

        html += '</div></div>';
        return html;
    },

    // ===== Navegación =====
    prevMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.refresh();
    },

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.refresh();
    },

    refresh() {
        const container = document.getElementById('srs-calendar-container');
        if (container && typeof app !== 'undefined' && app.srsData) {
            container.innerHTML = this.renderCalendarHTML(app.srsData, this.currentMonth, this.currentYear);
        }
    }
};
