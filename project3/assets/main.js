window.addEventListener("load", () => {
  const layer = document.querySelector(".float-layer");
  const imgs = document.querySelectorAll(".floaty");
  if (!layer || imgs.length === 0) return;

  const layerRect = layer.getBoundingClientRect();

  imgs.forEach((img) => {
    const pad = 20;
    const maxLeft = Math.max(0, layerRect.width - img.width - pad);
    const maxTop = Math.max(0, layerRect.height - img.height - pad);

    const left = Math.random() * (maxLeft || 100);
    const top = Math.random() * (maxTop || 80);

    img.style.left = `${left}px`;
    img.style.top = `${top}px`;

    const x1 = 0;
    const y1 = 0;
    const x2 = (Math.random() * 180 + 40) * (Math.random() < 0.5 ? -1 : 1);
    const y2 = (Math.random() * 120 + 30) * (Math.random() < 0.5 ? -1 : 1);

    const r1 = 0;
    const r2 = (Math.random() * 10 - 5).toFixed(2) + "deg";

    const s1 = 1;
    const s2 = (1 + Math.random() * 0.05).toFixed(3);

    const dur = (12 + Math.random() * 14).toFixed(1) + "s";
    const delay = (-Math.random() * 10).toFixed(1) + "s";

    img.style.setProperty("--x1", x1 + "px");
    img.style.setProperty("--y1", y1 + "px");
    img.style.setProperty("--x2", x2 + "px");
    img.style.setProperty("--y2", y2 + "px");
    img.style.setProperty("--r1", r1 + "deg");
    img.style.setProperty("--r2", r2);
    img.style.setProperty("--s1", s1);
    img.style.setProperty("--s2", s2);
    img.style.setProperty("--dur", dur);
    img.style.setProperty("--delay", delay);
  });
});
