async function getNotifications() {
  try {
    const response = await fetch('/api/unviewed-notifications/?format=json');
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function notifViewed(name) {
  console.log('notifViewed', name)
}

function viewAll() {
  console.log('viewAll')
}

document.addEventListener('DOMContentLoaded', async function () {
  const notifications = [{ name: "Jaloliddin Makhmudov" }, { name: "joe black"}]
  const notifNum = notifications.length
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
  img.style.cursor = "pointer"

  const infoBox = document.createElement("div")
  infoBox.style.position = "absolute"
  infoBox.style.top = "10px"
  infoBox.style.left = "0px"
  infoBox.style.display = "none"
  infoBox.style.zIndex = 100

  const sectionDiv = document.createElement("div")
  sectionDiv.style.color = "var(--header-link-color)"
  sectionDiv.innerText = "УВЕДОМЛЕНИЯ"
  sectionDiv.style.textAlign = "left"
  sectionDiv.style.letterSpacing = "0.5px"
  sectionDiv.style.fontWeight = "400"
  sectionDiv.style.width = "250px"
  sectionDiv.style.padding = "10px"
  sectionDiv.style.fontSize = "14px"
  sectionDiv.style.backgroundColor = "var(--primary)"
  sectionDiv.style.border = "solid var(--hairline-color) 1px"

  infoBox.append(sectionDiv)

  notifications.map((user) => {
    const userDiv = document.createElement("div")
    userDiv.style.backgroundColor = "var(--body-bg)"
    userDiv.style.width = "250px"
    userDiv.style.padding = "10px"
    userDiv.style.border = "solid var(--hairline-color) 1px"

    const link = document.createElement("a")
    link.innerHTML = `Новый пользователь <strong>${user.name}</strong>!`
    link.onclick = () => notifViewed(user.id)
    link.style.color = "var(--body-quiet-color)"
    link.href = "#"

    userDiv.append(link)
    infoBox.append(userDiv)
  })

  const viewAllDiv = document.createElement("div")
  viewAllDiv.style.color = "var(--body-quiet-color)"
  viewAllDiv.innerText = "Просмотреть всех"
  viewAllDiv.style.textAlign = "center"
  viewAllDiv.style.width = "250px"
  viewAllDiv.style.padding = "4px 10px"
  viewAllDiv.style.cursor = "pointer"
  viewAllDiv.style.fontSize = "12px"
  viewAllDiv.style.backgroundColor = "var(--darkened-bg)"
  viewAllDiv.style.border = "solid var(--hairline-color) 1px"
  viewAllDiv.onclick = () => viewAll()

  infoBox.append(viewAllDiv)


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