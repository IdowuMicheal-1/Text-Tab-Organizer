const listContent = document.getElementById("content-list");
const saveTab = document.querySelector(".save-tab");


const getItemList () => {

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
      date: getFormattedDate(),
      content: tab.title,
      link: tab[0].url,
    };
    chrome.storage.local.get(["items"], (result) => {
      const existingItem = result.items || [];
      const updatedItem = [...existingItem, newItem];
      chrome.storage.local.set({ items: updatedItem });
    });
  });
};

saveTab.addEventListener("click", saveTabsHandler);
