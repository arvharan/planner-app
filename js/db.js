let dataStore = {};

async function loadEvents() {
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", currentUser.id);

  dataStore = {};

  data.forEach(e => {
    if (!dataStore[e.date]) dataStore[e.date] = [];
    dataStore[e.date].push(e);
  });
}

async function addEvent() {
  const text = document.getElementById("eventText").value.trim();
  const time = document.getElementById("eventTime").value;

  if (!text) return;

  await supabase.from("events").insert([{
    user_id: currentUser.id,
    date: selectedDate,
    text,
    time
  }]);

  document.getElementById("eventText").value = "";
  document.getElementById("eventTime").value = "";

  await loadEvents();
  render();
}

/* 🗑️ DELETE EVENT */
async function deleteEvent(id) {
  await supabase.from("events").delete().eq("id", id);

  await loadEvents();
  render();
}