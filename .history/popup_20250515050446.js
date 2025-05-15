const listContent = document.getElementById("content-list");
const saveTab = document.querySelector(".save-tab");


const getItemList = () => {
    listContent.innerHTML=""
    chrome.storage.local.get(["items"], (result) => {
    console.log(result.items)
  result.items.map((items,index) => {
    const li = document.createElement("li");
    li.className = "div-content";
    li.innerHTML = `
 
          <div class="date-read">${items.date}</div>
          <div class="ctx-btn">
          <p class="content-text">
            ${items.content}
          </p>
            <button data-link="${items.id}" class="btn-dlt"><img src= "./assets/delete.png" class="edit-btn"><button>
          </div>
          <p><a href="${items.link}" target="_blank"><img src= "./assets/link.png" class="edit-btn"></a></p>
         
       `;

    listContent.appendChild(li);
    li.querySelector(".btn-dlt").addEventListener("click",(e) => {
        const idx = e.currentTarget.getAttribute("data-link")
        console.log(idx)
        handleEditById(idx);
    })
    
  });
});
}
getItemList()
function handleEditById(id) {
  chrome.storage.local.get(["items"], (result) => {
    const items = result.items || [];

    

    const index = items.findIndex(item => item.id === id);

    if (index !== -1) {
      const newContent = prompt("Edit content:", items[index].content);

      if (newContent !== null && newContent.trim() !== "") {
        items[index].content = newContent;
        chrome.storage.local.set({ items }, () => {
          getItemList(); 
        });
      }
    }
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
