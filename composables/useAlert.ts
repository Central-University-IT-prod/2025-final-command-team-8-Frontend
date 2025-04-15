import { reactive } from 'vue'
import type { AlertType } from '~/components/Alert.vue'

interface AlertItem {
    id: number
    message: string
    type: AlertType
    duration?: number
    autoClose?: boolean
}

// Create a reactive state that persists between component instances
const alerts = reactive<AlertItem[]>([])
let alertId = 0

export function useAlert() {
    const showAlert = (
        message: string,
        type: AlertType = 'default',
        duration = 5000,
        autoClose = true
    ) => {
        const id = alertId++
        alerts.push({
            id,
            message,
            type,
            duration,
            autoClose
        })

        return id
    }

    const removeAlert = (id: number) => {
        const index = alerts.findIndex(toast => toast.id === id)
        if (index !== -1) {
            alerts.splice(index, 1)
        }
    }

    // Convenience methods for different toast types
    const success = (message: string, duration?: number, autoClose?: boolean) =>
        showAlert(message, 'success', duration, autoClose)

    const error = (message: string, duration?: number, autoClose?: boolean) =>
        showAlert(message, 'error', duration, autoClose)

    const warning = (message: string, duration?: number, autoClose?: boolean) =>
        showAlert(message, 'warning', duration, autoClose)

    const info = (message: string, duration?: number, autoClose?: boolean) =>
        showAlert(message, 'info', duration, autoClose)

    return {
        alerts: alerts,
        showAlert: showAlert,
        removeAlert: removeAlert,
        success,
        error,
        warning,
        info
    }
}