// Nav slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-slider');
    const track = nav?.querySelector('ul');
    const items = track ? Array.from(track.children) : [];
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');

    if (!nav || !track || items.length === 0 || !prevBtn || !nextBtn) return;

    let index = 0;
    let itemWidth = 0;
    let gap = 0;

    const compute = () => {
        const rect = items[0].getBoundingClientRect();
        itemWidth = rect.width;

        const styles = window.getComputedStyle(track);
        gap = parseFloat(styles.gap || styles.columnGap || '0') || 0;

        goTo(index, false);
        updateButtons();
    };

    const maxIndex = () => Math.max(0, items.length - 4);

    const goTo = (i, animate = true) => {
        index = Math.max(0, Math.min(i, maxIndex()));
        track.style.transition = animate ? 'transform 400ms ease' : 'none';
        const x = -(index * (itemWidth + gap));
        track.style.transform = `translateX(${x}px)`;
    };

    const next = () => { goTo(index + 1); updateButtons(); };
    const prev = () => { goTo(index - 1); updateButtons(); };

    const updateButtons = () => {
        prevBtn.disabled = index <= 0;
        nextBtn.disabled = index >= maxIndex();
    };

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    window.addEventListener('resize', () => compute());

    compute();
});
