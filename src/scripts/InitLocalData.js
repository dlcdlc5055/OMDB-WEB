function InitLocalData(forced) {
    let licked = localStorage.getItem("licked")
    let dislicked = localStorage.getItem("dislicked")
    let downloaded = localStorage.getItem("downloaded")
    let experienced = localStorage.getItem("experienced")
    let bookmarked = localStorage.getItem("bookmarked")
    if (licked == undefined || forced)
        localStorage.setItem("licked", "[]")
    if (dislicked == undefined || forced)
        localStorage.setItem("dislicked", "[]")
    if (downloaded == undefined || forced)
        localStorage.setItem("downloaded", "[]")
    if (experienced == undefined || forced)
        localStorage.setItem("experienced", "[]")
    if (bookmarked == undefined || forced)
        localStorage.setItem("bookmarked", "[]")
    licked = localStorage.getItem("licked")
    dislicked = localStorage.getItem("dislicked")
    downloaded = localStorage.getItem("downloaded")
    experienced = localStorage.getItem("experienced")
    bookmarked = localStorage.getItem("bookmarked")
    const obj = {}
    obj.licked = JSON.parse(licked)
    obj.dislicked = JSON.parse(dislicked)
    obj.downloaded = JSON.parse(downloaded)
    obj.experienced = JSON.parse(experienced)
    obj.bookmarked = JSON.parse(bookmarked)
    return obj
}

export default InitLocalData;