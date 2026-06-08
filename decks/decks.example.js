// ============================================================
//  decks.example.js  —  template for your deck list
//  ----------------------------------------------------------
//  Copy this file to decks/decks.js (which is gitignored) and
//  list your sprint decks there. The hub reads window.DECKS.
//
//      cp decks/decks.example.js decks/decks.js
//
//  One object per deck. `date` (ISO yyyy-mm-dd) only drives
//  ordering — newest first. `accent` (mint | cool | warm) is
//  optional and rotates automatically if omitted.
// ============================================================
window.DECKS = [
	{
		title: 'My First Sprint Demo',
		blurb: 'A short, one-or-two sentence summary of what shipped.',
		path: 'decks/sprint-YYYY-MM-DD/',
		sprint: 'Mon DD – Mon DD, YYYY',
		date: '2026-01-01',
		tags: ['Area', 'Type'],
		accent: 'mint',
	},
	// Add more decks here…
];
