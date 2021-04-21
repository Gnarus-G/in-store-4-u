import { useState } from 'react';

export default function useTitleBarActions() {

    const [isWindowMaxed, setIsWindowMaxed] = useState<boolean>()

    function closeApp() {
        window.ipc.titleBarActions.closeApp()
    }

    function maximizeOrRestoreApp() {
        window.ipc.titleBarActions.maximizeOrRestoreApp();
        setIsWindowMaxed(!isWindowMaxed)
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