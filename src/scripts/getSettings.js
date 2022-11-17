import settingsKey from "./settingsKey"

function getSettings() {
    const defaultData = {
        darkMode: true,
    }
    const key = settingsKey
    let res = localStorage.getItem(key)
    if (res == undefined)
        localStorage.setItem(key, JSON.stringify(defaultData))
    res = JSON.parse(localStorage.getItem(key))
    return res
}

export default getSettings