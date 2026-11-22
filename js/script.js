/**
 * Paul Davis Restoration — York Region (pauldavisrestoration.ca)
 * Interactive UI Controller (Vanilla ES6+, Zero Dependencies)
 */
(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const desktopDock = document.getElementById('desktop-floating-dock');
  const backToTopBtn = document.getElementById('back-to-top');

  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-drawer-close');
  const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');

  const dropdownItem = document.querySelector('.has-dropdown');
  const dropdownTrigger = document.querySelector('.dropdown-trigger');

  const serviceTabs = document.querySelectorAll('.service-tab');
  const servicesGrid = document.getElementById('services-grid');
  const servicePanels = document.querySelectorAll('.service-panel');
  const filterJumpLinks = document.querySelectorAll('[data-service-filter]');

  const faqItems = document.querySelectorAll('.faq-item');

  const callbackForm = document.getElementById('callback-form');
  const callbackError = document.getElementById('callback-error');
  const dispatchPreview = document.getElementById('dispatch-preview');
  const dispatchPreviewText = document.getElementById('dispatch-preview-text');
  const dispatchMailtoLink = document.getElementById('dispatch-mailto-link');
  const copyBriefBtn = document.getElementById('copy-brief-btn');

  /* ------------------------------------------------------------------------
     1. SCROLL STATE: HEADER ELEVATION & DESKTOP QUICK-CALL DOCK
     ------------------------------------------------------------------------ */
  function updateScrollUI() {
    const y = window.scrollY || window.pageYOffset;
    if (header) {
      header.classList.toggle('is-scrolled', y > 24);
    }
    if (desktopDock) {
      desktopDock.classList.toggle('is-visible', y > 460);
    }
  }

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     2. MOBILE SLIDE-OVER NAVIGATION DRAWER
     ------------------------------------------------------------------------ */
  function setMobileMenu(open) {
    if (!mobileDrawer || !mobileToggle || !mobileBackdrop) return;

    mobileDrawer.classList.toggle('is-open', open);
    mobileDrawer.setAttribute('aria-hidden', String(!open));
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');

    if (open) {
      mobileBackdrop.hidden = false;
      document.body.classList.add('menu-open');
    } else {
      mobileBackdrop.hidden = true;
      document.body.classList.remove('menu-open');
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
      setMobileMenu(!isOpen);
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', function () {
      setMobileMenu(false);
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', function () {
      setMobileMenu(false);
    });
  }

  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        setMobileMenu(false);
      });
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1120 && document.body.classList.contains('menu-open')) {
      setMobileMenu(false);
    }
  });

  /* ------------------------------------------------------------------------
     3. DESKTOP NAVIGATION DROPDOWN
     ------------------------------------------------------------------------ */
  function setDropdown(open) {
    if (!dropdownItem || !dropdownTrigger) return;
    dropdownItem.classList.toggle('is-open', open);
    dropdownTrigger.setAttribute('aria-expanded', String(open));
  }

  if (dropdownItem && dropdownTrigger) {
    dropdownTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dropdownItem.classList.contains('is-open');
      setDropdown(!isOpen);
    });

    dropdownItem.addEventListener('mouseenter', function () {
      if (window.innerWidth >= 1120) setDropdown(true);
    });

    dropdownItem.addEventListener('mouseleave', function () {
      if (window.innerWidth >= 1120) setDropdown(false);
    });

    dropdownItem.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setDropdown(false);
      });
    });

    document.addEventListener('click', function (e) {
      if (!dropdownItem.contains(e.target)) {
        setDropdown(false);
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setDropdown(false);
      if (document.body.classList.contains('menu-open')) {
        setMobileMenu(false);
        if (mobileToggle) mobileToggle.focus();
      }
    }
  });

  /* ------------------------------------------------------------------------
     4. INTERACTIVE RESTORATION SERVICE FILTER TABS
     ------------------------------------------------------------------------ */
  function applyServiceFilter(filterValue) {
    serviceTabs.forEach(function (tab) {
      const active = tab.getAttribute('data-filter') === filterValue;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    if (servicesGrid) {
      servicesGrid.classList.toggle('is-filtered', filterValue !== 'all');
    }

    servicePanels.forEach(function (panel) {
      const categories = (panel.getAttribute('data-category') || '').split(/\s+/);
      const shouldShow = filterValue === 'all' || categories.includes(filterValue);
      panel.hidden = !shouldShow;
    });
  }

  serviceTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const filterValue = tab.getAttribute('data-filter') || 'all';
      applyServiceFilter(filterValue);
    });
  });

  filterJumpLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      const targetFilter = link.getAttribute('data-service-filter');
      if (targetFilter) {
        applyServiceFilter(targetFilter);
      }
    });
  });

  /* ------------------------------------------------------------------------
     5. ACCESSIBLE FAQ ACCORDION
     ------------------------------------------------------------------------ */
  faqItems.forEach(function (item) {
    const questionBtn = item.querySelector('.faq-question');
    const answerBox = item.querySelector('.faq-answer');
    if (!questionBtn || !answerBox) return;

    questionBtn.addEventListener('click', function () {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

      faqItems.forEach(function (other) {
        const otherBtn = other.querySelector('.faq-question');
        const otherAns = other.querySelector('.faq-answer');
        if (otherBtn && otherAns) {
          other.classList.remove('is-open');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.hidden = true;
        }
      });

      if (!isExpanded) {
        item.classList.add('is-open');
        questionBtn.setAttribute('aria-expanded', 'true');
        answerBox.hidden = false;
      }
    });
  });

  /* ------------------------------------------------------------------------
     6. TRANSPARENT STATIC CALLBACK DISPATCH BRIEF GENERATOR
     ------------------------------------------------------------------------ */
  if (callbackForm) {
    callbackForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('caller-name');
      const phoneInput = document.getElementById('caller-phone');
      const cityInput = document.getElementById('caller-city');
      const incidentSelect = document.getElementById('incident-type');
      const consentInput = document.getElementById('terms-consent');
      const checkedTime = callbackForm.querySelector('input[name="callbackTime"]:checked');

      const callerName = nameInput ? nameInput.value.trim() : '';
      const callerPhone = phoneInput ? phoneInput.value.trim() : '';
      const callerCity = cityInput && cityInput.value.trim() ? cityInput.value.trim() : 'York Region, ON';
      const incidentType = incidentSelect ? incidentSelect.value : 'Water / Flood Damage';
      const callbackTime = checkedTime ? checkedTime.value : 'Now (Immediate Emergency)';
      const hasConsent = consentInput ? consentInput.checked : false;

      if (!callerName || !callerPhone) {
        if (callbackError) {
          callbackError.textContent = 'Please enter your name and phone number, or call (647) 494-8481 directly for immediate 24/7 help.';
          callbackError.hidden = false;
        }
        if (!callerName && nameInput) nameInput.focus();
        else if (phoneInput) phoneInput.focus();
        return;
      }

      if (!hasConsent) {
        if (callbackError) {
          callbackError.textContent = 'Please check the communication consent box before preparing your callback brief.';
          callbackError.hidden = false;
        }
        return;
      }

      if (callbackError) {
        callbackError.hidden = true;
      }

      const summaryLines = [
        'PAUL DAVIS YORK REGION — PRIORITY CALLBACK REQUEST',
        '--------------------------------------------------',
        'Callback Window : ' + callbackTime,
        'Incident Type   : ' + incidentType,
        'Contact Name    : ' + callerName,
        'Phone Number    : ' + callerPhone,
        'Property Area   : ' + callerCity
      ].join('\n');

      const subject = encodeURIComponent('[Priority Callback - ' + callbackTime + '] ' + incidentType + ' — ' + callerCity);
      const body = encodeURIComponent(summaryLines + '\n\nSent from pauldavisrestoration.ca callback request panel.');
      const mailtoHref = 'mailto:info@pauldavisrestoration.ca?subject=' + subject + '&body=' + body;

      if (dispatchPreviewText) {
        dispatchPreviewText.textContent = summaryLines;
      }
      if (dispatchMailtoLink) {
        dispatchMailtoLink.setAttribute('href', mailtoHref);
      }
      if (dispatchPreview) {
        dispatchPreview.hidden = false;
      }

      window.location.href = mailtoHref;
    });
  }

  if (copyBriefBtn && dispatchPreviewText) {
    copyBriefBtn.addEventListener('click', function () {
      const text = dispatchPreviewText.textContent || '';
      if (!text) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          copyBriefBtn.textContent = 'Copied!';
          setTimeout(function () {
            copyBriefBtn.textContent = 'Copy Text';
          }, 2000);
        });
      }
    });
  }
})();
