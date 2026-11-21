// ============================================================
// tables.js - dynamic table for brows.html (FindIt@SQU)
// Uses: a constructor, an array of objects, and two functions
// ============================================================

// ---------- 1. OBJECT TYPE (constructor function) ----------
// Every lost or found report is one "Item" object.
// "this" means the new object that is being created.
function Item(name, category, type, location, date, image, description) {
    this.name = name;               // e.g. "Black smartphone"
    this.category = category;       // electronics, keys, bags, cards, other
    this.type = type;               // "Lost" or "Found"
    this.location = location;       // where it was lost or found
    this.date = date;               // date text in the form YYYY-MM-DD
    this.image = image;             // image path, or "" if there is no photo
    this.description = description; // short description
}

// ---------- 2. ARRAY with real starting data ----------
// The array keeps all items. We create each one with "new Item(...)".
var items = [
    new Item("Black smartphone", "electronics", "Found", "Block A", "2026-10-06", "images/phone.png", "Black phone found near Block A"),
    new Item("White earbuds", "electronics", "Lost", "College of Engineering", "2026-10-05", "images/earbud.png", "White wireless earbuds in a small case"),
    new Item("Keys with red keychain", "keys", "Found", "Library entrance", "2026-10-05", "images/Key.jpg", "Three keys with a red keychain"),
    new Item("Red Handbag", "bags", "Lost", "E building", "2026-10-06", "images/redHandBag.png", "Red handbag lost near the F classrooms"),
    new Item("Gold watch", "other", "Found", "Main Library", "2026-10-07", "images/Golden watch.jpg", "Golden watch found on a study table")
];

// Small helper: makes one <td> cell with text inside and adds it to a row.
// textContent is used (not innerHTML) so typed text can never run as HTML.
function addCell(row, text) {
    var cell = document.createElement("td");
    cell.textContent = text;
    row.appendChild(cell);
}

// Small helper: turns "2026-10-06" into a nicer text like "6 Oct 2026".
function formatDate(isoDate) {
    var d = new Date(isoDate);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ---------- 3. FUNCTION 1: show a list of items in the table ----------
// It receives a list (the whole array, or only the search results),
// clears the table body, then adds one row for each item.
function displayItems(list) {
    var tbody = document.getElementById("itemsBody");
    tbody.innerHTML = ""; // remove the old rows first

    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var row = document.createElement("tr");

        addCell(row, item.category);

        // Photo cell: show the picture only if the item has one
        var photoCell = document.createElement("td");
        if (item.image !== "") {
            var img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            img.width = 90;
            img.height = 60;
            img.className = "rounded object-fit-cover";
            photoCell.appendChild(img);
        } else {
            photoCell.textContent = "No photo";
        }
        row.appendChild(photoCell);

        addCell(row, item.name);
        addCell(row, item.type);
        addCell(row, item.location);
        addCell(row, formatDate(item.date));
        addCell(row, item.description);

        tbody.appendChild(row);
    }

    // Update the "Total items shown" number in the table footer
    document.getElementById("itemCount").textContent = list.length;
}

// ---------- 4. FUNCTION 2: add a new item from the form ----------
// Runs when the user submits the "Add item" form.
function addItem(event) {
    event.preventDefault(); // stop the page from reloading
    var form = event.target;

    // Bootstrap validation: if a required field is empty, show red messages and stop
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    // Read the values the user typed
    var newItem = new Item(
        document.getElementById("addName").value.trim(),
        document.getElementById("addCategory").value,
        document.getElementById("addType").value,
        document.getElementById("addLocation").value.trim(),
        document.getElementById("addDate").value,
        "", // no photo for items added by the user
        document.getElementById("addDescription").value.trim()
    );

    items.push(newItem);   // add the object to the end of the array
    displayItems(items);   // redraw the table so the new row appears

    form.reset();                           // clear the form
    form.classList.remove("was-validated"); // remove the red/green marks
}

// ---------- 5. SEARCH: filter the array and show the results ----------
function searchItems(event) {
    event.preventDefault();

    // Read the search values (keyword is made lower case so capitals do not matter)
    var keyword = document.getElementById("q").value.trim().toLowerCase();
    var category = document.getElementById("cat").value;
    var type = document.querySelector('input[name="item_type"]:checked').value;
    var since = document.getElementById("from").value;

    var results = []; // items that match all the chosen filters

    for (var i = 0; i < items.length; i++) {
        var it = items[i];

        // Each test is true when the filter is empty OR the item matches it
        var keywordOk = keyword === "" ||
            it.name.toLowerCase().includes(keyword) ||
            it.description.toLowerCase().includes(keyword) ||
            it.location.toLowerCase().includes(keyword);
        var categoryOk = category === "" || it.category === category;
        var typeOk = type === "all" || it.type.toLowerCase() === type;
        var dateOk = since === "" || it.date >= since; // YYYY-MM-DD text compares correctly

        // The item is kept only when ALL four tests pass
        if (keywordOk && categoryOk && typeOk && dateOk) {
            results.push(it);
        }
    }

    displayItems(results);
}

// Clear button: show every item again after the form is reset
function resetSearch() {
    displayItems(items);
}

// ---------- 6. START: connect the forms and fill the table ----------
document.getElementById("searchForm").addEventListener("submit", searchItems);
document.getElementById("searchForm").addEventListener("reset", resetSearch);
document.getElementById("addForm").addEventListener("submit", addItem);
displayItems(items); // show all items when the page first opens
