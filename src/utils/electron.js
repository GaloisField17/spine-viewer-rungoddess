export function getIpcRenderer() {
  try {
    if (window.require) {
      return window.require('electron').ipcRenderer;
    }
  } catch (e) {
    // Ignore errors in browser
  }
  return null;
}