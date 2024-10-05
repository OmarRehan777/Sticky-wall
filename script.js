let add_note = document.querySelector(".add-note");
let overlay = document.querySelector(".overlay");
let text_content = document.querySelector(".text-content");
let save_button = document.querySelector(".button");
let notes = document.querySelectorAll(".note");
let delete_button = document.querySelector(".delete");
let section_element = document.querySelector("section");
let old_node_content;
let EventCauser;
let notes_object;
let color_nodes = document.querySelectorAll(".color");
let clicked_color;

// local storage initiating
if (!window.localStorage.notes_list) {
  window.localStorage.setItem("notes_list", JSON.stringify({}));
  notes_counter = 0;
  window.localStorage.setItem("notes_counter", String(notes_counter));
}

// adding saved notes to the web page
else {
  notes_object = JSON.parse(window.localStorage.getItem("notes_list"));
  notes_counter = Number(window.localStorage.getItem("notes_counter"));
  for (let note in notes_object) {
    let new_note = document.createElement("div");
    new_note.textContent = notes_object[note];
    new_note.setAttribute("order", note);
    new_note.classList.add("note");
    add_note.before(new_note);
    addEventToNote(new_note);
  }
}

// Theme code
// restoring saved theme
if (!window.localStorage.color) {
  window.localStorage.setItem("color", "teal");
} else {
  clicked_color = window.localStorage.getItem("color");
  for (let i = 1; i <= 4; i++) {
    document.body.style.setProperty(
      `--color${i}`,
      `var(--${clicked_color}${i})`
    );
  }
}

// adding events to colors
color_nodes.forEach((color) => {
  color.addEventListener("click", (e) => {
    clicked_color = e.target.classList[1];
    // console.log(clicked_color);
    for (let i = 1; i <= 4; i++) {
      document.body.style.setProperty(
        `--color${i}`,
        `var(--${clicked_color}${i})`
      );
    }
    window.localStorage.setItem("color", clicked_color);
  });
});

// add_note event
add_note.addEventListener("click", function (e) {
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
  text_content.focus();
  EventCauser = e.target;
});

// function adds event to note
function addEventToNote(note) {
  note.addEventListener("click", (e) => {
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
    old_node_content = e.target.textContent;
    text_content.textContent = old_node_content;
    text_content.focus();
    EventCauser = e.target;
  });
}

// add events to all existing notes
notes.forEach((note) => {
  addEventToNote(note);
});

// save button
save_button.addEventListener("click", function () {
  // adding new note
  if (EventCauser.classList[0] === "add-note") {
    if (text_content.textContent) {
      let new_note = document.createElement("div");
      new_note.textContent = text_content.textContent;
      new_note.classList.add("note");
      add_note.before(new_note);
      addEventToNote(new_note);

      // local storage code
      notes_counter++;
      new_note.setAttribute("order", notes_counter);
      notes_object = JSON.parse(window.localStorage.getItem("notes_list"));
      notes_object[notes_counter] = new_note.textContent;
      window.localStorage.setItem("notes_list", JSON.stringify(notes_object));
      window.localStorage.setItem("notes_counter", String(notes_counter));
    }
  }

  // editing note
  if (EventCauser.classList[0] === "note") {
    // if there is a change in the content

    // if the edited note is not empty
    if (
      text_content.textContent != EventCauser.textContent &&
      text_content.textContent
    ) {
      EventCauser.textContent = text_content.textContent;

      // local storage code
      notes_object = JSON.parse(window.localStorage.getItem("notes_list"));
      notes_object[EventCauser.getAttribute("order")] =
        text_content.textContent;

      // if the edited note is not empty
    } else if (!text_content.textContent) {
      notes_object = JSON.parse(window.localStorage.getItem("notes_list"));
      delete notes_object[EventCauser.getAttribute("order")];
      window.localStorage.setItem("notes_list", JSON.stringify(notes_object));
      EventCauser.remove();
    }
  }

  // always execute code
  window.localStorage.setItem("notes_list", JSON.stringify(notes_object));

  text_content.textContent = "";
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
});

// delete button
delete_button.addEventListener("click", function () {
  if (EventCauser.classList[0] == "note") {
    notes_object = JSON.parse(window.localStorage.getItem("notes_list"));
    delete notes_object[EventCauser.getAttribute("order")];
    window.localStorage.setItem("notes_list", JSON.stringify(notes_object));
    EventCauser.remove();
  }
  text_content.textContent = "";
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
});
