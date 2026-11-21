
function Item(name, type, date, status, link) {
    this.name = name;
    this.type = type;
    this.date = date;
    this.status = status;
    this.link = link;
}

let posts = [
    new Item("Black smartphone", "Found", "06 Oct 2026", "Active", "item-details.html"),
    new Item("Keys with red Keychain", "Found", "05 Oct 2026", "Active", "found.html"),
    new Item("Red bag", "Lost", "05 Oct 2026", "Active", "lost.html")
];

function displayDashboard() {
    let table = document.getElementById("dashboardItems");

    table.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${post.name}</td>
            <td>${post.type}</td>
            <td>${post.date}</td>
            <td><span class="badge text-bg-success">${post.status}</span></td>
            <td><a href="${post.link}">Open</a></td>
        `;

        table.appendChild(row);
    }

    document.getElementById("totalPosts").textContent = posts.length;
}

displayDashboard();
