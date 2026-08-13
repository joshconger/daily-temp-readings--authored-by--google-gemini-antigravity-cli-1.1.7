const twilio = require('twilio');

module.exports = async function handler(req, res) {
  // Only allow GET requests (or simple cron triggers)
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
    TO_PHONE_NUMBERS
  } = process.env;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER || !TO_PHONE_NUMBERS) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  const DTR_SECTIONS = [
    { emoji: "🙏", title: "Appreciations", prompt: "What's something your person did recently that made you smile?" },
    { emoji: "💬", title: "New Information", prompt: "What's something new going on in your life right now?" },
    { emoji: "🧩", title: "Puzzles", prompt: "Is there anything you've been curious or confused about?" },
    { emoji: "🔧", title: "Complaints with Recommendations", prompt: "What's one thing that's been bugging you — and what would help?" },
    { emoji: "✨", title: "Wishes, Hopes & Dreams", prompt: "What's something you're looking forward to?" }
  ];

  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const focusIdx = dayOfYear % DTR_SECTIONS.length;
  
  const focus = DTR_SECTIONS[focusIdx];
  const messageBody = `✨ Today's DTR: ${focus.title} — ${focus.prompt}`;

  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const phoneNumbers = TO_PHONE_NUMBERS.split(',').map(n => n.trim());

  try {
    const promises = phoneNumbers.map(number => {
      return client.messages.create({
        body: messageBody,
        from: TWILIO_PHONE_NUMBER,
        to: number
      });
    });

    await Promise.all(promises);
    return res.status(200).json({ success: true, message: 'SMS sent successfully', focus: focus.title });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return res.status(500).json({ error: 'Failed to send SMS', details: error.message });
  }
}
