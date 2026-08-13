const DTR_SECTIONS = [
  {
    id: "appreciations",
    emoji: "🙏",
    title: "Appreciations",
    description: "Express genuine gratitude for something your partner or friend has done, or a quality you admire in them.",
    prompts: [
      "What's something your person did recently that made you smile?",
      "What quality in them are you most grateful for today?",
      "When did they show up for you in a way that mattered?"
    ]
  },
  {
    id: "new-information",
    emoji: "💬",
    title: "New Information",
    description: "Share updates about your life, thoughts, or daily experiences to keep each other in the loop.",
    prompts: [
      "What's something new going on in your life right now?",
      "What's been on your mind lately?",
      "Is there anything you've been meaning to share?"
    ]
  },
  {
    id: "puzzles",
    emoji: "🧩",
    title: "Puzzles",
    description: "Ask questions or clarify things that seem confusing, unclear, or mysterious.",
    prompts: [
      "Is there anything you've been curious or confused about?",
      "What's something you'd like to understand better?",
      "Any assumptions you'd like to check?"
    ]
  },
  {
    id: "complaints-with-recs",
    emoji: "🔧",
    title: "Complaints with Recommendations",
    description: "Voice a concern paired with a constructive suggestion for change.",
    prompts: [
      "What's one thing that's been bugging you — and what would help?",
      "Is there a pattern you'd like to change? What would you suggest instead?",
      "What's one small adjustment that would make a big difference?"
    ]
  },
  {
    id: "wishes-hopes-dreams",
    emoji: "✨",
    title: "Wishes, Hopes & Dreams",
    description: "Share personal or shared aspirations, desires, or future goals.",
    prompts: [
      "What's something you're looking forward to?",
      "If you could wish for one thing right now, what would it be?",
      "What's a dream you'd love to explore together?"
    ]
  }
];

function getTodaysFocusIndex() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return dayOfYear % DTR_SECTIONS.length;
}

function generateTemplate() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
  const focusIdx = getTodaysFocusIndex();

  let template = `📋 Daily Temperature Reading — ${dateStr}\n`;
  template += `Today's Focus: ${DTR_SECTIONS[focusIdx].emoji} ${DTR_SECTIONS[focusIdx].title}\n`;
  template += `${'─'.repeat(40)}\n\n`;

  DTR_SECTIONS.forEach((section, i) => {
    const star = i === focusIdx ? ' ⭐' : '';
    template += `${section.emoji} ${section.title}${star}\n`;
    template += `${section.prompts[0]}\n`;
    template += `Your response: \n\n`;
  });

  return template;
}

async function copyTemplate() {
  const template = generateTemplate();
  try {
    await navigator.clipboard.writeText(template);
    const feedback = document.getElementById('copy-feedback');
    feedback.textContent = 'Copied! ✅';
    feedback.classList.add('visible');
    setTimeout(() => {
      feedback.classList.remove('visible');
    }, 2000);
  } catch (err) {
    console.error('Failed to copy', err);
  }
}

function renderApp() {
  const today = new Date();
  const dateDisplay = document.getElementById('date-display');
  dateDisplay.textContent = today.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  const focusIdx = getTodaysFocusIndex();
  const focusSection = DTR_SECTIONS[focusIdx];
  const focusLabel = document.getElementById('focus-label');
  focusLabel.innerHTML = `Today's focus: <span style="color: var(--color-${focusSection.id === 'new-information' ? 'new-info' : focusSection.id === 'complaints-with-recs' ? 'complaints' : focusSection.id === 'wishes-hopes-dreams' ? 'wishes' : focusSection.id})">${focusSection.emoji} ${focusSection.title}</span>`;

  const cardsContainer = document.getElementById('dtr-cards');
  DTR_SECTIONS.forEach((section, i) => {
    const isFeatured = i === focusIdx;
    
    const card = document.createElement('article');
    card.className = `dtr-card ${isFeatured ? 'featured' : ''}`;
    card.dataset.section = section.id;
    card.id = `card-${section.id}`;
    card.style.animationDelay = `${i * 0.1}s`;

    let headerHtml = `
      <div class="card-header">
        <span class="card-emoji">${section.emoji}</span>
        <h2 class="card-title">${section.title}</h2>
        ${isFeatured ? '<span class="featured-badge">Today\'s Focus</span>' : ''}
      </div>
    `;

    card.innerHTML = `
      ${headerHtml}
      <p class="card-description">${section.description}</p>
      <p class="card-prompt">"${section.prompts[0]}"</p>
    `;

    cardsContainer.appendChild(card);
  });

  document.getElementById('copy-btn').addEventListener('click', copyTemplate);
}

document.addEventListener('DOMContentLoaded', renderApp);
