import { useEffect, useState } from 'react';

export default function useTitleBarActions() {

    const [isWindowMaxed, setIsWindowMaxed] = useState<boolean>()

    useEffect(() => {
        window.ipc.titleBarActions.onMaximizeOrRestore(setIsWindowMaxed)
    }, [])

    function closeApp() {
        window.ipc.titleBarActions.closeApp()
    }

    function maximizeOrRestoreApp() {
        window.ipc.titleBarActions.maximizeOrRestoreApp();
    }

    function minimizeApp() {
        window.ipc.titleBarActions.minimizeApp();
    }

    return {
        isWindowMaxed,
        closeApp,
        maximizeOrRestoreApp,
        minimizeApp
    }
}