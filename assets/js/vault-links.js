// Resolve wiki links using paths relative to the app's content directory.
import { slugify } from "./markdown.js";

export const contentURL = (path) => "content/" + path.split("/").map((part) =>
  encodeURIComponent(part).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase())
).join("/");

function normalize(path) {
  const parts = [];
  for (const part of path.split("/")) {
    if (part === "..") parts.pop();
    else if (part && part !== ".") parts.push(part);
  }
  return parts.join("/");
}

export function createVaultResolver(index) {
  const aliases = new Map();
  for (const [source, entry] of Object.entries(index)) {
    const name = source.split("/").pop();
    for (const alias of new Set([name, name.replace(/\.md$/i, "")])) {
      if (!aliases.has(alias)) aliases.set(alias, []);
      aliases.get(alias).push({ ...entry, source });
    }
  }
  return (raw, source) => {
    let target;
    try { target = decodeURIComponent(raw); } catch { target = raw; }
    const hash = target.indexOf("#");
    const heading = hash < 0 ? "" : target.slice(hash + 1);
    target = hash < 0 ? target : target.slice(0, hash);
    const folder = source.slice(0, source.lastIndexOf("/") + 1);
    let entry;
    for (const path of target ? [normalize(folder + target), normalize(target)] : [source]) {
      entry = index[path] || index[path + ".md"];
      if (entry) break;
    }
    if (!entry && target) {
      const candidates = aliases.get(target) || [];
      const courseRoot = source.split("/")[0] + "/";
      const sameCourse = candidates.filter((item) => item.source.startsWith(courseRoot));
      entry = sameCourse.length === 1 ? sameCourse[0] : candidates.length === 1 ? candidates[0] : null;
    }
    if (!entry) return null;
    const anchor = heading ? "/" + slugify(heading) : "";
    const fileURL = contentURL(entry.file) + (heading && entry.format !== "md" ? "#" + heading : "");
    return { ...entry, fileURL, href: entry.key && entry.format === "md" ? "#/n/" + entry.key + anchor : fileURL };
  };
}

export function resolveVaultLinks(el, source, resolve) {
  for (const placeholder of el.querySelectorAll("[data-vault-link]")) {
    const [target, alias] = placeholder.dataset.vaultLink.split("|");
    const entry = resolve(target, source);
    const label = alias || target.split("/").pop();
    if (!entry) {
      placeholder.textContent = label;
      placeholder.title = "This note or attachment is not available.";
      continue;
    }
    const embedded = placeholder.dataset.embed === "true";
    let node;
    if (embedded && /^(png|jpe?g|gif|webp|svg)$/i.test(entry.format)) {
      node = document.createElement("img");
      node.src = entry.fileURL;
      node.alt = label;
      node.loading = "lazy";
    } else if (embedded && /^(m4a|mp3|wav|ogg)$/i.test(entry.format)) {
      node = document.createElement("audio");
      node.src = entry.fileURL;
      node.controls = true;
      node.preload = "none";
      node.style.maxWidth = "100%";
    } else {
      node = document.createElement("a");
      node.href = entry.href;
      node.textContent = label;
    }
    placeholder.replaceWith(node);
  }
  for (const node of el.querySelectorAll("a[href], img[src]")) {
    const attr = node.tagName === "IMG" ? "src" : "href";
    const target = node.getAttribute(attr);
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#\/|content\/)/i.test(target) || node.classList.contains("anchor")) continue;
    const entry = resolve(target, source);
    if (entry) node.setAttribute(attr, attr === "src" ? entry.fileURL : entry.href);
  }
}
