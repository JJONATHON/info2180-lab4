window.onload = function () {
  const button = document.getElementById("search-btn");
  const input  = document.getElementById("search-input");
  const out    = document.getElementById("result");

  function show(msg) { out.innerHTML = msg; }

  async function runSearch() {
    const q = input.value.trim();
    if (q === "") { show(""); return; } // never ask for the list

    try {
      const resp = await fetch(`superheroes.php?query=${encodeURIComponent(q)}`, {
        cache: "no-store"
      });

      // fetch doesn't throw on 4xx/5xx; handle them here
      const text = await resp.text();
      if (!resp.ok) {
        show(`<div class="error">HTTP ${resp.status}</div>`);
        console.error("Server returned non-OK:", resp.status, text);
        return;
      }
      show(text);
    } catch (err) {
      show(`<div class="error">REQUEST FAILED</div>`);
      console.error("Network/Fetch error:", err);
    }
  }

  button.addEventListener("click", runSearch);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); runSearch(); }
  });
};

