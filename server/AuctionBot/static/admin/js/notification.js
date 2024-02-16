document.addEventListener('DOMContentLoaded', function () {
  const notifNum = 0
  const nav = document.createElement("div")

  const div = document.getElementById("user-tools")
  const header = document.getElementById("header")
  header.style.overflow = "visible"

  const box = document.createElement("div")
  box.style.display = "inline"
  box.style.position = "relative"

  const count = document.createElement("div")
  count.innerText = `+${notifNum}`
  count.style.display = notifNum ? "inline" : "none"
  count.style.fontWeight = "800"
  count.style.fontSize = "10px"
  count.style.backgroundColor = "red"
  count.style.padding = "2px 6px"
  count.style.borderRadius = "50px"
  count.style.marginLeft = "-4px"

  const img = document.getElementById("notification-img")
  img.style.width = "20px"
  img.style.marginLeft = "20px"
  img.style.cursor = "pointer"

  const infoBox = document.createElement("div")
  infoBox.style.width = "50px"
  infoBox.style.height = "50px"
  infoBox.style.backgroundColor = "red"
  infoBox.style.position = "absolute"
  infoBox.style.top = "10px"
  infoBox.style.right = "0px"
  infoBox.style.display = "none"

  document.addEventListener("click", (event) => {
    if (!box.contains(event.target)) {
      infoBox.style.display = "none";
    }

    if (box.contains(event.target) && notifNum > 0) {
      infoBox.style.display = "block";
    }
  }, false);

  box.append(img)
  box.append(count)
  box.append(infoBox)

  header.append(nav)
  nav.append(div, box)
})