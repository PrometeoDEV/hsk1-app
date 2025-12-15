// ===== Notifications Module - HSK Learning =====
// Sistema de notificaciones y recordatorios de estudio

const NotificationsModule = {
    isSupported: false,
    permission: 'default',
    scheduledReminders: [],

    // ===== Inicialización =====
    init() {
        this.isSupported = 'Notification' in window;
        if (this.isSupported) {
            this.permission = Notification.permission;
        }
        this.loadScheduledReminders();
        this.checkDailyReminder();
        console.log('✓ Notifications Module inicializado');
    },

    // ===== Solicitar Permiso =====
    async requestPermission() {
        if (!this.isSupported) {
            return { granted: false, reason: 'Navegador no soporta notificaciones' };
        }

        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;

            if (permission === 'granted') {
                this.showNotification('¡Notificaciones activadas!', {
                    body: 'Recibirás recordatorios para estudiar chino.',
                    icon: '🎓'
                });
                return { granted: true };
            } else {
                return { granted: false, reason: 'Permiso denegado' };
            }
        } catch (e) {
            return { granted: false, reason: e.message };
        }
    },

    // ===== Mostrar Notificación =====
    showNotification(title, options = {}) {
        if (!this.isSupported || this.permission !== 'granted') {
            console.log('Notificación (sin permiso):', title, options.body);
            return null;
        }

        const defaultOptions = {
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23e53935" width="100" height="100" rx="20"/><text x="50" y="65" text-anchor="middle" fill="white" font-size="50">中</text></svg>',
            badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23e53935" width="100" height="100" rx="20"/><text x="50" y="65" text-anchor="middle" fill="white" font-size="50">中</text></svg>',
            tag: 'hsk-notification',
            renotify: true,
            requireInteraction: false,
            silent: false
        };

        const notification = new Notification(title, { ...defaultOptions, ...options });

        notification.onclick = () => {
            window.focus();
            notification.close();
            if (options.onClick) options.onClick();
        };

        return notification;
    },

    // ===== Notificaciones Específicas =====

    // Recordatorio de estudio diario
    notifyDailyReminder() {
        this.showNotification('¡Hora de estudiar chino! 📚', {
            body: '¿Listo para aprender nuevas palabras hoy?',
            tag: 'daily-reminder',
            requireInteraction: true,
            actions: [
                { action: 'study', title: 'Estudiar ahora' },
                { action: 'later', title: 'Más tarde' }
            ]
        });
    },

    // Tarjetas pendientes
    notifyDueCards(count) {
        if (count === 0) return;

        this.showNotification(`${count} tarjetas para repasar`, {
            body: 'Mantén tu progreso al día con el repaso espaciado.',
            tag: 'due-cards'
        });
    },

    // Racha en peligro
    notifyStreakRisk(currentStreak) {
        this.showNotification('¡Tu racha está en peligro! 🔥', {
            body: `No pierdas tu racha de ${currentStreak} días. ¡Estudia hoy!`,
            tag: 'streak-risk',
            requireInteraction: true
        });
    },

    // Logro desbloqueado
    notifyAchievement(achievementName, achievementIcon) {
        this.showNotification('¡Logro desbloqueado! 🏆', {
            body: `${achievementIcon} ${achievementName}`,
            tag: 'achievement'
        });
    },

    // Meta diaria completada
    notifyDailyGoalComplete() {
        this.showNotification('¡Meta diaria completada! 🎉', {
            body: '¡Excelente trabajo! Has completado tu meta de hoy.',
            tag: 'daily-goal'
        });
    },

    // Nuevo nivel alcanzado
    notifyLevelUp(level) {
        this.showNotification(`¡Nivel ${level} alcanzado! 🚀`, {
            body: '¡Sigue así! Tu progreso es impresionante.',
            tag: 'level-up'
        });
    },

    // ===== Sistema de Recordatorios Programados =====

    // Configurar recordatorio diario
    setDailyReminder(hour, minute) {
        const reminder = {
            id: 'daily-study',
            hour,
            minute,
            enabled: true,
            createdAt: Date.now()
        };

        this.scheduledReminders = this.scheduledReminders.filter(r => r.id !== 'daily-study');
        this.scheduledReminders.push(reminder);
        this.saveScheduledReminders();

        return reminder;
    },

    // Verificar y mostrar recordatorio diario
    checkDailyReminder() {
        const dailyReminder = this.scheduledReminders.find(r => r.id === 'daily-study' && r.enabled);
        if (!dailyReminder) return;

        const now = new Date();
        const reminderTime = new Date();
        reminderTime.setHours(dailyReminder.hour, dailyReminder.minute, 0, 0);

        // Si ya pasó la hora hoy, programar para mañana
        if (now > reminderTime) {
            reminderTime.setDate(reminderTime.getDate() + 1);
        }

        const msUntilReminder = reminderTime - now;

        // Programar notificación
        setTimeout(() => {
            this.notifyDailyReminder();
            // Re-programar para el siguiente día
            this.checkDailyReminder();
        }, msUntilReminder);

        console.log(`Recordatorio programado para ${reminderTime.toLocaleString()}`);
    },

    // Cancelar recordatorio
    cancelReminder(id) {
        this.scheduledReminders = this.scheduledReminders.filter(r => r.id !== id);
        this.saveScheduledReminders();
    },

    // ===== Persistencia =====
    saveScheduledReminders() {
        localStorage.setItem('hsk_reminders', JSON.stringify(this.scheduledReminders));
    },

    loadScheduledReminders() {
        const saved = localStorage.getItem('hsk_reminders');
        this.scheduledReminders = saved ? JSON.parse(saved) : [];
    },

    // ===== Configuración de Recordatorio UI =====
    getSettingsHTML() {
        const dailyReminder = this.scheduledReminders.find(r => r.id === 'daily-study');
        const hour = dailyReminder ? dailyReminder.hour : 9;
        const minute = dailyReminder ? dailyReminder.minute : 0;
        const enabled = dailyReminder ? dailyReminder.enabled : false;

        return `
            <div class="notification-settings">
                <h4>Recordatorios de Estudio</h4>

                <div class="setting-row">
                    <label>Estado de notificaciones:</label>
                    <span class="permission-status ${this.permission}">
                        ${this.permission === 'granted' ? '✓ Activadas' :
                          this.permission === 'denied' ? '✗ Bloqueadas' : '? Sin configurar'}
                    </span>
                    ${this.permission !== 'granted' ?
                        `<button onclick="NotificationsModule.requestPermission()" class="btn-enable-notif">
                            Activar notificaciones
                        </button>` : ''}
                </div>

                <div class="setting-row">
                    <label>Recordatorio diario:</label>
                    <input type="checkbox" id="reminder-enabled" ${enabled ? 'checked' : ''}
                        onchange="NotificationsModule.toggleDailyReminder(this.checked)">
                </div>

                <div class="setting-row">
                    <label>Hora del recordatorio:</label>
                    <input type="time" id="reminder-time"
                        value="${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}"
                        onchange="NotificationsModule.updateReminderTime(this.value)">
                </div>

                <div class="setting-row">
                    <button onclick="NotificationsModule.testNotification()" class="btn-test">
                        Probar notificación
                    </button>
                </div>
            </div>
        `;
    },

    toggleDailyReminder(enabled) {
        if (enabled) {
            const timeInput = document.getElementById('reminder-time');
            const [hour, minute] = timeInput.value.split(':').map(Number);
            this.setDailyReminder(hour, minute);
        } else {
            this.cancelReminder('daily-study');
        }
    },

    updateReminderTime(timeStr) {
        const [hour, minute] = timeStr.split(':').map(Number);
        const enabledCheckbox = document.getElementById('reminder-enabled');
        if (enabledCheckbox && enabledCheckbox.checked) {
            this.setDailyReminder(hour, minute);
        }
    },

    testNotification() {
        this.showNotification('Notificación de prueba 🧪', {
            body: '¡Las notificaciones funcionan correctamente!'
        });
    },

    // ===== Estado =====
    getStatus() {
        return {
            supported: this.isSupported,
            permission: this.permission,
            reminders: this.scheduledReminders
        };
    }
};
