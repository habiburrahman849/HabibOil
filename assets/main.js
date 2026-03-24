const sharedHeader = `
<header class="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
    <a href="index.html" class="flex items-center gap-3">
      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-black">H</div>
      <div>
        <p class="text-lg font-extrabold tracking-wide">Habiboil</p>
        <p class="text-xs uppercase tracking-[0.25em] text-black/60">Pure. Traditional. Trusted.</p>
      </div>
    </a>
    <nav class="hidden items-center gap-6 text-sm font-semibold md:flex">
      <a class="hover:text-brand transition" href="index.html">Home</a>
      <a class="hover:text-brand transition" href="about.html">About</a>
      <a class="hover:text-brand transition" href="product.html">Product</a>
      <a class="hover:text-brand transition" href="contact.html">Contact</a>
    </nav>
    <a href="https://wa.me/923001234567?text=Assalamualaikum%20Habiboil%2C%20I%20want%20to%20place%20an%20order." class="hidden rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-brand hover:text-black md:inline-flex">Order on WhatsApp</a>
  </div>
</header>`;

const sharedFooter = `
<footer class="border-t border-black/5 bg-white py-10">
  <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-black/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
    <p>© 2026 Habiboil. Premium mustard oil for Pakistani homes.</p>
    <div class="flex gap-5">
      <a href="about.html" class="transition hover:text-brand">About</a>
      <a href="product.html" class="transition hover:text-brand">Product</a>
      <a href="contact.html" class="transition hover:text-brand">Contact</a>
    </div>
  </div>
</footer>`;

document.querySelectorAll('[data-include="header"]').forEach((node) => {
  node.innerHTML = sharedHeader;
});

document.querySelectorAll('[data-include="footer"]').forEach((node) => {
  node.innerHTML = sharedFooter;
});

const animatedNodes = document.querySelectorAll('section > div, .rounded-\[2rem\], blockquote');
animatedNodes.forEach((node) => node.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedNodes.forEach((node) => observer.observe(node));
