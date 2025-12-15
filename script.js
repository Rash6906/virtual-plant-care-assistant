// script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reminderForm");
  const plant = document.getElementById("plant");
  const date = document.getElementById("date");
  const list = document.getElementById("reminderList");

  // Load existing reminders from localStorage
  loadReminders();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!plant.value || !date.value) return;

    const reminder = {
      id: Date.now(),
      plant: plant.value,
      date: date.value
    };

    saveReminder(reminder);
    form.reset();
  });

  function saveReminder(reminder) {
    const reminders = getReminders();
    reminders.push(reminder);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    displayReminders();
  }

  function getReminders() {
    return JSON.parse(localStorage.getItem("reminders")) || [];
  }

  function deleteReminder(id) {
    const reminders = getReminders().filter(r => r.id !== id);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    displayReminders();
  }

  function displayReminders() {
    list.innerHTML = "";
    const reminders = getReminders();
    if (reminders.length === 0) {
      list.innerHTML = "<li>No reminders yet.</li>";
    } else {
      reminders.forEach(r => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${r.plant}</strong> needs watering on <strong>${r.date}</strong>
                        <button class="delete-btn" onclick="deleteReminder(${r.id})">Delete</button>`;
        list.appendChild(li);
      });
    }
  }

  window.deleteReminder = deleteReminder; // Make it globally accessible

  function loadReminders() {
    displayReminders();
  }
});
