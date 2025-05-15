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
        "content":"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa",
        "link":"#"
    }
]

// const items = Array.from({ length: 5 });
ITEMS.map((items, index) => {
  const li = document.createElement("li");
  li.className = "div-content";
  li.innerHTML = `
 
          <div class="date-read">${items.date}</div>
          <p class="content-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
          </p>
          <p><a href="#">Link to site</a></p>
       `;
    listContent.appendChild(li);
});

const text = ` hello how are you ${name}`