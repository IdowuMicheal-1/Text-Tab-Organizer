const listContent = document.getElementById("content-list");
const saveTab = document.querySelector(".save-tab")


chrome.storage.local.get(["items"], (result) => {
    console.log(result)
})

// const items = Array.from({ length: 5 });
// ITEMS.map((items, index) => {
//   const li = document.createElement("li");
//   li.className = "div-content";
//   li.innerHTML = `
 
//           <div class="date-read">${items.date}</div>
//           <div class="ctx-btn">
//           <p class="content-text">
//             ${items.content}
//           </p>
//             <button><img src= "./assets/edit.png" class="edit-btn"><button>
//           </div>
//           <p><a href="${items.link}">Link to site</a></p>
         
//        `;
      
       
//     listContent.appendChild(li);
// });



function getFormattedDate() {
  const now = new Date();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = months[now.getMonth()]; 
  const day = now.getDate();    
  let hours = now.getHours();  
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${month} ${day} - ${hours}:${minutes}${ampm}`;
}


const saveTabsHandler = () => {
    chrome.tabs.query({active:true,currentWindow:true}, (tab) => {
        const newItem = {
            date:getFormattedDate(),
            content:"",
            link:tab[0].url
        };
        chrome.storage.local.get(["items"],(result) => {
            const existingItem = result.items || []
            const updatedItem = [...existingItem,newItem]

        })
        // chrome.storage.local.set({"items":[{
           
        // }]})
    })

}

saveTab.addEventListener("click",saveTabsHandler)