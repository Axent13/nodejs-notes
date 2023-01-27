document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const newText = prompt("Введите новое значение", "");

    if (newText !== "" && newText !== null) {
      const id = event.target.dataset.id;

      edit(id, newText).then(() => {
        event.target.closest("li").querySelector(".title-text").innerText =
          newText;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit(id, newText) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ id, title: newText }),
  });
}
