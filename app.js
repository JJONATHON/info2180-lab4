window.onload = function () {
  const button = document.getElementById("search-btn");
  const input  = document.getElementById("search-input");
  const out    = document.getElementById("result");

  function show(html) { out.innerHTML = html; attachListClicks(); }

  // Attach click handlers to list items (if a list is currently rendered)
  function attachListClicks() {
    const items = out.querySelectorAll("#hero-list .hero-option");
    items.forEach(li => {
      li.addEventListener("click", () => {
        input.value = li.getAttribute("data-value"); // fill input with alias
        runSearch();                                  // run the search immediately
      });
    });
  }

  // Load the list (used on page load and when field is cleared)
  async function loadList() {
    const resp = await fetch("superheroes.php?query=", { cache: "no-store" });
    const html = await resp.text();
    show(html); // renders the UL list
  }

  async function runSearch() {
    const q = input.value.trim();
    if (q === "") {                         // empty → show list
      await loadList();
      return;
    }

    try {
      const resp = await fetch(`superheroes.php?query=${encodeURIComponent(q)}`, {
        cache: "no-store"
      });
      const text = await resp.text();
      if (!resp.ok) {
        show(`<div class="error">HTTP ${resp.status}</div>`);
        return;
      }
      show(text);                           // renders a single hero or "not found"
    } catch (err) {
      show(`<div class="error">REQUEST FAILED</div>`);
      console.error(err);
    }
  }

  // Events
  button.addEventListener("click", runSearch);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); runSearch(); }
  });
  input.addEventListener("input", () => {   // if user clears the field, show list
    if (input.value.trim() === "") loadList();
  });

  // Show the list immediately on page load
  loadList();
};
