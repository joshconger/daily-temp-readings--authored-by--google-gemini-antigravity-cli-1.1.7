# Daily Temperature Readings

A social journaling tool based on Virginia Satir's Daily Temperature Reading framework, delivered as a web app and daily SMS.

## Language

### DTR Framework

**Daily Temperature Reading (DTR)**:
A structured journaling practice with 5 fixed components, originally developed by Virginia Satir for couples and family therapy. Used here as a lightweight daily check-in between any group of people.
_Avoid_: Check-in, survey, questionnaire

**DTR Section**:
One of the 5 components of a Daily Temperature Reading. The canonical set, in rotation order, is: Appreciations, New Information, Puzzles, Complaints with Recommendations, Wishes Hopes & Dreams.
_Avoid_: Category, topic, type, pillar

**Appreciations**:
DTR Section 1. Express genuine gratitude for something a person has done or a quality you admire.

**New Information**:
DTR Section 2. Share updates about your life, thoughts, or daily experiences to stay in the loop.

**Puzzles**:
DTR Section 3. Ask questions or clarify things that seem confusing or unclear.

**Complaints with Recommendations**:
DTR Section 4. Voice a concern paired with a constructive suggestion for change. The recommendation is mandatory — a complaint without one is just venting.
_Avoid_: Complaint, feedback, grievance

**Wishes, Hopes & Dreams**:
DTR Section 5. Share personal or shared aspirations, desires, or future goals.
_Avoid_: Goals, intentions

### App Concepts

**Focused Prompt**:
The one DTR Section that is highlighted on a given day. Rotates deterministically using `dayOfYear % 5`. All 5 sections are always shown; the focused prompt is visually emphasized and is the one sent via SMS.
_Avoid_: Featured section, daily prompt, today's prompt

**Template**:
The complete, formatted text block containing all 5 DTR Sections with placeholder prompts, ready to copy and paste into a messaging app. The focused prompt is marked within it.
_Avoid_: Form, card, message

**Rotation**:
The deterministic daily cycling through the 5 DTR Sections. Uses `dayOfYear % 5` so all users see the same focused prompt on the same day without any synchronization or backend.
_Avoid_: Schedule, cycle, shuffle
