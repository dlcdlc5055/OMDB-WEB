import settingsKey from "./settingsKey"

function setSettings(obj) {
    localStorage.setItem(settingsKey, JSON.stringify(obj))
}

export default setSettings