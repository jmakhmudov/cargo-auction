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

async function notifViewed(id, redirect) {
  try {
    await fetch(`/api/change-notifications-status/${id}/`, {
      "credentials": "include",
      "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
        "Accept": "text/html; q=1.0, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "X-CSRFTOKEN": "QsgFIqc6vT8RumzEPsrsS8xZtKMIWuZMcNFC1waJP7Aw6Uc47vg1tw4gR7Opayt8",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "multipart/form-data; boundary=---------------------------69975712436964534872389691844",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
      },
      "body": "-----------------------------69975712436964534872389691844\r\nContent-Disposition: form-data; name=\"isViewed\"\r\n\r\ntrue\r\n-----------------------------69975712436964534872389691844--\r\n",
      "method": "PUT",
      "mode": "cors"
    });

    if (redirect) {
      window.location.href = `/tg-adminchik/bot/tguser/?q=${id}`;
    }
  } catch (error) {
    console.log(error)
  }
}

async function viewAll(users) {
  for (const user of users) {
    await notifViewed(user.id, false);
  }
  window.location.reload()
}

document.addEventListener('DOMContentLoaded', async function () {
  const notifications = await getNotifications()
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
    userDiv.onclick = async () => await notifViewed(user.id, true)
    userDiv.style.cursor = "pointer"

    const link = document.createElement("p")
    link.innerHTML = `Новый пользователь <strong>${user.name}</strong>!`
    link.style.color = "var(--body-quiet-color)"

    userDiv.append(link)
    infoBox.append(userDiv)
  })

  const viewAllDiv = document.createElement("div")
  viewAllDiv.style.color = "var(--body-quiet-color)"
  viewAllDiv.innerText = "Очистить"
  viewAllDiv.style.textAlign = "center"
  viewAllDiv.style.width = "250px"
  viewAllDiv.style.padding = "4px 10px"
  viewAllDiv.style.cursor = "pointer"
  viewAllDiv.style.fontSize = "12px"
  viewAllDiv.style.backgroundColor = "var(--darkened-bg)"
  viewAllDiv.style.border = "solid var(--hairline-color) 1px"
  viewAllDiv.onclick = async () => await viewAll(notifications)

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