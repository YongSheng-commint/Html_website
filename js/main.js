// Shared behaviour for every Veltrix Motors page (English and French).
// Each block only runs when the page has the matching elements.

// Language dropdown: toggle on click, close on Escape, outside click or when focus leaves it.
document.querySelectorAll('.language-dropdown').forEach(function (dropdown) {
    var button = dropdown.querySelector('.language-btn');

    var setOpen = function (open) {
        dropdown.classList.toggle('open', open);
        button.setAttribute('aria-expanded', String(open));
    };

    button.addEventListener('click', function () {
        setOpen(!dropdown.classList.contains('open'));
    });

    dropdown.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && dropdown.classList.contains('open')) {
            setOpen(false);
            button.focus();
        }
    });

    dropdown.addEventListener('focusout', function (event) {
        if (!dropdown.contains(event.relatedTarget)) {
            setOpen(false);
        }
    });

    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target)) {
            setOpen(false);
        }
    });
});

// Hero image rotation. Skipped for visitors who ask for reduced motion.
var hero = document.querySelector('.hero');
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hero && !reduceMotion) {
    var heroImages = [
        'https://www.gifcen.com/wp-content/uploads/2021/05/car-gif-2.gif',
        'https://64.media.tumblr.com/tumblr_mdzf255AHR1rkfvqno1_500.gif',
        'https://i.pinimg.com/originals/7c/d4/15/7cd415c2a1d5649e16a8eef19cf13664.gif'
    ];
    var heroIndex = 0;

    setInterval(function () {
        heroIndex = (heroIndex + 1) % heroImages.length;

        // Load the next image first so the swap never shows a blank or broken image.
        var next = new Image();
        next.onload = function () {
            hero.classList.add('fading');
            setTimeout(function () {
                hero.src = next.src;
                hero.classList.remove('fading');
            }, 500);
        };
        next.src = heroImages[heroIndex];
    }, 10000);
}

// Vehicle category tabs with previous / next arrows (home pages).
var vehicleSections = Array.prototype.slice.call(document.querySelectorAll('.vehicle-section'));

if (vehicleSections.length) {
    var categoryButtons = Array.prototype.slice.call(document.querySelectorAll('.category-btn'));
    var indexLabel = document.querySelector('.carousel-index');
    var lengthLabel = document.querySelector('.carousel-length');
    var currentSection = 0;

    var showSection = function (index) {
        currentSection = (index + vehicleSections.length) % vehicleSections.length;

        vehicleSections.forEach(function (section, i) {
            section.hidden = i !== currentSection;
        });

        var activeId = vehicleSections[currentSection].id;
        categoryButtons.forEach(function (categoryButton) {
            categoryButton.setAttribute('aria-pressed', String(categoryButton.getAttribute('aria-controls') === activeId));
        });

        if (indexLabel) {
            indexLabel.textContent = currentSection + 1;
        }
    };

    categoryButtons.forEach(function (categoryButton) {
        categoryButton.addEventListener('click', function () {
            var target = document.getElementById(categoryButton.getAttribute('aria-controls'));
            showSection(vehicleSections.indexOf(target));
        });
    });

    var prevButton = document.querySelector('.js-prev');
    var nextButton = document.querySelector('.js-next');

    if (prevButton) {
        prevButton.addEventListener('click', function () {
            showSection(currentSection - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function () {
            showSection(currentSection + 1);
        });
    }

    if (lengthLabel) {
        lengthLabel.textContent = vehicleSections.length;
    }

    showSection(0);
}

// Price and vehicle-type filters (explore pages).
var priceRange = document.getElementById('price-range');

if (priceRange) {
    var typeSelect = document.getElementById('car-type');
    var priceDisplay = document.querySelector('.price-display');
    var noResults = document.querySelector('.no-results');
    var filterableCars = document.querySelectorAll('.car-box[data-price]');
    var pageLanguage = document.documentElement.lang || 'en';
    var money;

    try {
        money = new Intl.NumberFormat(pageLanguage, {
            style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0
        });
    } catch (error) {
        // Older browsers do not support "narrowSymbol".
        money = new Intl.NumberFormat(pageLanguage, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    }

    var applyFilters = function () {
        var maxPrice = Number(priceRange.value);
        var type = typeSelect ? typeSelect.value : 'all';
        var visibleCount = 0;

        priceDisplay.textContent = priceDisplay.dataset.label + money.format(maxPrice);

        filterableCars.forEach(function (car) {
            var matches = Number(car.dataset.price) <= maxPrice && (type === 'all' || car.dataset.type === type);
            car.hidden = !matches;
            if (matches) {
                visibleCount++;
            }
        });

        if (noResults) {
            noResults.hidden = visibleCount > 0;
        }
    };

    priceRange.addEventListener('input', applyFilters);
    if (typeSelect) {
        typeSelect.addEventListener('change', applyFilters);
    }
    applyFilters();
}

// Contact form.
var contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        // The site has no backend, so messages are not delivered anywhere yet.
        // To receive them, point the form's action at a form service such as Formspree.
        event.preventDefault();
        var status = document.getElementById('thankYouMessage');
        status.textContent = status.dataset.message;
        contactForm.reset();
    });
}
