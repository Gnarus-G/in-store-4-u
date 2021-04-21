import { useState } from 'react';
import { Events } from '../utils';

export default function useTitleBarActions() {

    const [isWindowMaxed, setIsWindowMaxed] = useState<boolean>()

    function closeApp() {
        window.ipc.send(Events.CLOSE_APP);
    }

    function maximizeOrRestoreApp() {
        window.ipc.send(Events.MAXIMIZE_OR_RESTORE);
        setIsWindowMaxed(!isWindowMaxed)
    }

    function minimizeApp() {
        window.ipc.send(Events.MINIMIZE);
    }

    return {
        isWindowMaxed,
        closeApp,
        maximizeOrRestoreApp,
        minimizeApp
    }
}