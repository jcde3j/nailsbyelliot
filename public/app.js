(async function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  const tabs = document.querySelector(".tabs");
  const grid = document.querySelector(".grid");
  const empty = document.querySelector(".empty");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox.querySelector("img");

  let data = {};
  try {
    data = await (await fetch("/api/gallery")).json();
  } catch (e) {
    console.error("gallery failed", e);
  }

  const categories = Object.keys(data);
  const withImages = categories.filter((c) => data[c].images.length);
  if (!withImages.length) {
    tabs.hidden = true;
    empty.hidden = false;
    return;
  }

  function render(slug) {
    for (const b of tabs.children) b.setAttribute("aria-selected", b.dataset.slug === slug);
    grid.innerHTML = "";
    for (const src of data[slug].images) {
      const btn = document.createElement("button");
      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = src;
      img.alt = data[slug].title + " nails";
      img.addEventListener("load", () => { if (img.naturalWidth > img.naturalHeight) btn.classList.add("wide"); });
      btn.appendChild(img);
      btn.addEventListener("click", () => {
        lightboxImg.src = src;
        lightboxImg.alt = img.alt;
        lightbox.hidden = false;
      });
      grid.appendChild(btn);
    }
  }

  for (const slug of withImages) {
    const b = document.createElement("button");
    b.type = "button";
    b.role = "tab";
    b.dataset.slug = slug;
    b.textContent = data[slug].title;
    b.addEventListener("click", () => render(slug));
    tabs.appendChild(b);
  }
  render(withImages[0]);

  const close = () => { lightbox.hidden = true; lightboxImg.src = ""; };
  lightbox.querySelector(".close").addEventListener("click", close);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
})();
