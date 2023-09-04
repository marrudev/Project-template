document.querySelectorAll('[data-src][data-cookiecategory="social"]').forEach((el) => {
    el.setAttribute('src', el.dataset.src);
    delete el.dataset.src;
});
document.querySelectorAll('[data-cookie-placeholder]').forEach((el) => {
    el.removeAttribute('data-cookie-placeholder');
});
