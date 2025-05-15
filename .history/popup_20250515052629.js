const listContent = document.getElementById("content-list");
const saveTab = document.querySelector(".save-tab");


const getItemList = () => {
  listContent.innerHTML = "";

  chrome.storage.local.get(["items"], (result) => {
    const items = result.items || [];

    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "div-content";
      li.innerHTML = `
        <div class="date-read">${item.date}</div>
        <div class="ctx-btn">
          <p class="content-text">${item.content}</p>
          <button data-id="${item.id}" class="btn-dlt">
            <img src="./assets/delete.png" class="edit-btn">
          </button>
        </div>
        <p><a href="${item.link}" target="_blank">
          <img src="./assets/link.png" class="edit-btn">
        </a></p>
      `;

      // Add delete functionality
      li.querySelector(".btn-dlt").addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        handleDeleteById(id);
      });

      listContent.appendChild(li);
    });
  });
};

getItemList()
function handleEditById(id) {
  chrome.storage.local.get(["items"], (result) => {
    const items = result.items || [];
   const updatedItems = items.filter(item => item.id !== id);
    chrome.storage.local.set({ items:updatedItems }, () => {
          getItemList(); 
        });
  });
}


function getFormattedDate() {
  const now = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[now.getMonth()];
  const day = now.getDate();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${month} ${day} - ${hours}:${minutes}${ampm}`;
}

const saveTabsHandler = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    const newItem = {
      id: Date.now().toString(),
      date: getFormattedDate(),
      content: tab[0].title,
      link: tab[0].url,
    };
    chrome.storage.local.get(["items"], (result) => {
      const existingItem = result.items || [];
      const updatedItem = [...existingItem, newItem];
      chrome.storage.local.set({ items: updatedItem }, () => {
        getItemList()
      });
    });
  });
  
};

saveTab.addEventListener("click", saveTabsHandler);
