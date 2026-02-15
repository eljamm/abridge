document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", handleVideoInteraction);
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleVideoInteraction(e);
    }
  });

  function handleVideoInteraction(e) {
    const trigger = e.target.closest(".yv-thumb");
    if (!trigger) return;
    if (e.type === "keydown") e.preventDefault();

    const container = trigger.closest(".yv");
    const videoId = container.dataset.videoId;
    const embedContainer = container.querySelector(".yv-embed");

    const iframe = document.createElement("iframe");

    iframe.setAttribute("class", "yvi");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    );

    // NOTE: playsinline is to prevent auto-fullscreen on mobile
    const iframeSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1`;

    iframe.src = iframeSrc;

    // inject
    embedContainer.textContent = "";
    embedContainer.appendChild(iframe);

    trigger.style.display = "none";
    iframe.focus();
  }
});
