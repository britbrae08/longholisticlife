(() => {
  const invites = {
    Nourishment: {
      eyebrow: 'Ready to stop guessing?',
      text: 'You can keep collecting tips—or decide this is the season you stop guessing. If you’re serious about changing your health, book a free consultation with Brittany and turn what you’re learning into a plan built around your real life.',
      button: 'Book My Free Consultation'
    },
    Rest: {
      eyebrow: 'Halfway is a decision point',
      text: 'Knowing what needs to change is different from changing it. If you’re ready to stop carrying this alone, book a free consultation with Brittany and identify the few changes most likely to move your life forward.',
      button: 'Talk With Brittany Free'
    },
    'New Rhythms': {
      eyebrow: 'Do not leave this as information',
      text: 'You finished the framework. Now decide whether this becomes another good idea—or a different way of living. If you’re serious about lasting change, book a free consultation with Brittany and build your next rhythm with personal support.',
      button: 'Build My Next Rhythm'
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .women-consult-invite{grid-column:1/-1;margin:4px 0 8px;padding:22px 24px;border:1px solid #d8cdbf;border-left:4px solid #956657;border-radius:14px;background:#fbf7f1;box-shadow:0 8px 24px rgba(49,65,55,.07)}
    .women-consult-invite .invite-eyebrow{margin:0 0 8px;color:#7d5145;font-size:.78rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase}
    .women-consult-invite p{margin:0;color:#33483b;line-height:1.65}
    .women-consult-invite a{display:inline-flex;align-items:center;justify-content:center;margin-top:14px;padding:11px 16px;border-radius:999px;background:#33483b;color:#fff;font-weight:700;text-decoration:none}
    .women-consult-invite a:hover{text-decoration:none;filter:brightness(.95)}
    @media(max-width:640px){.women-consult-invite{padding:18px 17px;margin-bottom:12px}.women-consult-invite a{width:100%;box-sizing:border-box}}
  `;
  document.head.appendChild(style);

  function renderInvite() {
    const section = document.querySelector('.guided-experience.guided-women');
    if (!section) return;

    const lesson = section.querySelector('.guided-principle-name');
    const nav = section.querySelector('.guided-lesson-nav');
    if (!lesson || !nav) return;

    const existing = section.querySelector('.women-consult-invite');
    const invite = invites[lesson.textContent.trim()];

    if (!invite) {
      existing?.remove();
      return;
    }

    if (existing?.dataset.lesson === lesson.textContent.trim()) return;
    existing?.remove();

    const card = document.createElement('aside');
    card.className = 'women-consult-invite';
    card.dataset.lesson = lesson.textContent.trim();
    card.setAttribute('aria-label', 'Free consultation invitation');
    card.innerHTML = `
      <p class="invite-eyebrow">${invite.eyebrow}</p>
      <p>${invite.text}</p>
      <a href="https://longholisticlife.com/welcome#consultation">${invite.button} →</a>
    `;
    nav.before(card);
  }

  const observer = new MutationObserver(renderInvite);
  observer.observe(document.documentElement, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['class']});
  document.addEventListener('DOMContentLoaded', renderInvite);
  window.addEventListener('load', renderInvite);
  setTimeout(renderInvite, 300);
})();