import { Events } from '../utils';

export default function useTitleBarActions() {

    function closeApp() {
        window.ipc.send(Events.CLOSE_APP);
    }

    function maximizeOrRestoreApp() {
        window.ipc.send(Events.MAXIMIZE_OR_RESTORE);
    }

    function minimizeApp() {
        window.ipc.send(Events.MINIMIZE);
    }

    return {
        closeApp,
        maximizeOrRestoreApp,
        minimizeApp
    }
}