const listContent = document.getElementById("content-list");

const ITEMS = [
    {
        "date":"Nov 20 - 12:27PM",
        "content":"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa",
        "link":"#"
    },
    {
        "date":"Nov 20 - 12:27PM",
        "content":"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa",
        "link":"#"
    },
    {
        "date":"Nov 20 - 12:27PM",
        "content":"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa",
        "link":"#"
    },
    {
        "date":"Nov 20 - 12:27PM",
        "content":"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa",
        "link":"#"
    },
    {
        "date":"Nov 20 - 12:27PM",
        "content":"My name is Micheal, I am the developer",
        "link":"#"
    }
]

// const items = Array.from({ length: 5 });
ITEMS.map((items, index) => {
  const li = document.createElement("li");
  li.className = "div-content";
  li.innerHTML = `
 
          <div class="date-read">${items.date}</div>
          <div>
          <p class="content-text">
            ${items.content}
          </p>
      <button class><img src= "./assets/edit.png"><button>
          </div>
          <p><a href="${items.link}">Link to site</a></p>
         
       `;
      
       
    listContent.appendChild(li);
});

const editHandler = () => {
    console.log("Hello")
}

const text = ` hello how are you ${name}`