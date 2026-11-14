// Build navigation from copied paths without modifying the note files.
export function noteTree(notes, courseId) {
  const tree = { folders: new Map(), notes: [] };
  for (const note of notes) {
    const parts = note.file?.startsWith(courseId + "/") ? note.file.split("/").slice(1, -1) : [];
    let branch = tree;
    for (const part of parts) {
      if (!branch.folders.has(part)) branch.folders.set(part, { folders: new Map(), notes: [] });
      branch = branch.folders.get(part);
    }
    branch.notes.push(note);
  }
  return tree;
}

export function noteStatus(value) {
  const status = String(value || "").trim().toLowerCase();
  if (["complete", "completed", "final", "finalized", "done", "ready to review"].includes(status)) return "Complete";
  if (["updating", "in progress", "in-progress"].includes(status)) return "In Progress";
  return "Draft";
}

// Count actual CSS grid columns so each increment is three rows at any width.
export function attachCourseGrids(main) {
  const grids = [...main.querySelectorAll("[data-course-grid]")];
  const updates = new Map();
  for (const grid of grids) {
    const cards = [...grid.children];
    const section = grid.closest(".section");
    const button = section.querySelector(".show-more");
    const count = section.querySelector(".grid-count");
    let pages = 1;
    let visible = 0;
    const update = () => {
      const tracks = getComputedStyle(grid).gridTemplateColumns;
      const columns = tracks && tracks !== "none" ? tracks.split(/\s+/).filter(Boolean).length : 1;
      visible = Math.min(cards.length, columns * 3 * pages);
      cards.forEach((card, i) => { card.hidden = i >= visible; });
      button.hidden = visible >= cards.length;
      count.textContent = `Showing ${visible} of ${cards.length}`;
    };
    button.addEventListener("click", () => {
      const firstNew = visible;
      pages++;
      update();
      if (button.hidden) cards[firstNew]?.focus({ preventScroll: true });
    });
    updates.set(grid, update);
    update();
  }
  if (!grids.length) return () => {};
  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver((entries) => entries.forEach(({ target }) => updates.get(target)?.()));
    grids.forEach((grid) => observer.observe(grid));
    return () => observer.disconnect();
  }
  const resize = () => updates.forEach((update) => update());
  window.addEventListener("resize", resize);
  return () => window.removeEventListener("resize", resize);
}

// Each note type gets one horizontal row, with native scrolling and page arrows.
export function attachCourseCarousels(main) {
  const cleanups = [];
  for (const track of main.querySelectorAll("[data-course-carousel]")) {
    const section = track.closest(".section");
    const previous = section.querySelector('[data-slide="previous"]');
    const next = section.querySelector('[data-slide="next"]');
    const update = () => {
      previous.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    };
    const move = (direction) => {
      const card = track.firstElementChild;
      if (!card) return;
      const step = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
      const count = Math.max(1, Math.floor(track.clientWidth / step));
      track.scrollBy({ left: direction * step * count, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    track.addEventListener("keydown", (event) => {
      // Leave card link keys intact; arrows control the focused carousel region.
      if (event.target !== track || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Home" || event.key === "End") track.scrollTo({ left: event.key === "Home" ? 0 : track.scrollWidth, behavior: "auto" });
      else move(event.key === "ArrowRight" ? 1 : -1);
    });
    track.addEventListener("scroll", update, { passive: true });
    update();
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(update);
      observer.observe(track);
      cleanups.push(() => observer.disconnect());
    } else {
      window.addEventListener("resize", update);
      cleanups.push(() => window.removeEventListener("resize", update));
    }
    cleanups.push(() => track.removeEventListener("scroll", update));
  }
  return () => cleanups.forEach((cleanup) => cleanup());
}
