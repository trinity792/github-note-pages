// Widget loader. A note embeds a widget with:  <div data-widget="cache-sim" data-preset="…"></div>
// Each widget is an ES module in this folder whose default export is mount(el, options).
export async function mountWidgets(root) {
  const nodes = [...root.querySelectorAll("[data-widget]")];
  await Promise.all(nodes.map(async (el) => {
    const name = el.dataset.widget.replace(/[^a-z0-9-]/gi, "");
    try {
      const mod = await import(`./${name}.js`);
      mod.default(el, { ...el.dataset });
    } catch (err) {
      console.error(`widget "${name}" failed`, err);
      el.classList.add("widget");
      el.innerHTML = `<div class="w-body"><span class="w-note">The “${name}” widget could not be loaded.</span></div>`;
    }
  }));
}
