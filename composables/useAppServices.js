export const useNotification = () => {
    const q = useQuasar()
    const showToast = (color, icon, message) => {
            q.notify({
                color: color,
                textColor: 'white',
                icon: icon,
                message: message,
                position: 'top'
            });
    }
    return {
        showToast,
    }
}

