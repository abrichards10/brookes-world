import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

/*
  ┌─────────────────────────────────────────────────────────────┐
  │  ADD A BOOK: append an object to the `books` array.           │
  │  { title, author, year, summary, link, reading? }            │
  │  Add reading: true for what you're reading now.              │
  │  Spine colors come from the shared palette (styles/colors.css)│
  │  automatically; pin one with spineColor: "var(--book-3)".    │
  └─────────────────────────────────────────────────────────────┘
*/
const books = [
  // ---- 2026 ----
  {
    title: "A Short Stay in Hell",
    author: "Steven L. Peck",
    year: 2026,
    summary:
      "A man is consigned to a library the size of the universe and must find the single book that tells his life story to earn his release — a dizzying, unsettling meditation on eternity.",
    link: "https://www.goodreads.com/book/show/13456414-a-short-stay-in-hell",
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 2026,
    reading: true,
    summary:
      "Orwell's dystopia of total surveillance and propaganda, and one man's doomed attempt to hold onto truth, memory, and love.",
    link: "https://www.goodreads.com/book/show/18282117-1984?from_search=true&from_srp=true&qid=O4gZx6syTN&rank=1",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    year: 2026,
    reading: true,
    summary:
      "A practical system for building good habits and breaking bad ones through tiny changes that compound over time.",
    link: "https://www.goodreads.com/book/show/43172223-summary-of-atomic-habits-by-james-clear?from_search=true&from_srp=true&qid=U5wLNoPZ7A&rank=1",
  },
  {
    title: "Howl's Moving Castle",
    author: "Diana Wynne Jones",
    year: 2026,
    reading: true,
    summary:
      "Cursed into old age, young Sophie takes refuge in the wandering, magical castle of the vain and mysterious wizard Howl.",
    link: "https://www.goodreads.com/book/show/6294.Howl_s_Moving_Castle?from_search=true&from_srp=true&qid=fGGNqkXufS&rank=5",
  },
  // ---- 2025 ----
  {
    title: "How to Think More Effectively",
    author: "The School of Life",
    year: 2025,
    summary:
      "A slim guide to 'thinking about thinking' — how to catch fleeting ideas, make use of boredom and instinct, and approach big problems less timidly.",
    link: "https://www.goodreads.com/book/show/50663125-how-to-think-more-effectively",
  },
  {
    title: "Orsinian Tales",
    author: "Ursula K. Le Guin",
    year: 2025,
    summary:
      "Interlinked short stories set in Orsinia, an invented Central European country — quiet, deeply human moments spanning centuries.",
    link: "https://www.goodreads.com/book/show/92623.Orsinian_Tales",
  },
  {
    title: "The Buddha Walks into a Bar",
    author: "Lodro Rinzler",
    year: 2025,
    summary:
      "A down-to-earth introduction to Buddhist practice for a new generation, applying meditation to work, dating, and everyday twenty-something life.",
    link: "https://www.goodreads.com/book/show/12302843-the-buddha-walks-into-a-bar?from_search=true&from_srp=true&qid=1xIsOuqVA3&rank=1",
  },
  {
    title: "The Defining Decade",
    author: "Meg Jay",
    year: 2025,
    summary:
      "A clinical psychologist's argument that your twenties are the pivotal decade for work, love, and identity — and how to make them count.",
    link: "https://www.goodreads.com/book/show/63830495-summary-of-the-defining-decade-by-meg-jay?from_search=true&from_srp=true&qid=clyqkxwPHe&rank=3",
  },
  {
    title: "The Tao of Physics",
    author: "Fritjof Capra",
    year: 2025,
    summary:
      "A classic exploration of the parallels between the discoveries of modern physics and the insights of Eastern mysticism.",
    link: "https://www.goodreads.com/book/show/131504915-the-tao-of-physics-by-fritjof-capra?from_search=true&from_srp=true&qid=vTjRJuAWpB&rank=2",
  },
  {
    title: "Invisible Women",
    author: "Caroline Criado Perez",
    year: 2025,
    summary:
      "How a world built on male-default data quietly fails women — from crash-test dummies to medicine to the design of cities.",
    link: "https://www.goodreads.com/book/show/41104077-invisible-women?from_search=true&from_srp=true&qid=kgujHG8qTk&rank=5",
  },
  {
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    year: 2025,
    summary:
      "A brilliant 1960s chemist is pushed out of the lab and onto a TV cooking show, where she ends up teaching women far more than recipes.",
    link: "https://www.goodreads.com/book/show/63830292-study-guide?from_search=true&from_srp=true&qid=UBaPJBIYGG&rank=1",
  },
  {
    title: "Frankenstein's Cat",
    author: "Emily Anthes",
    year: 2025,
    summary:
      "A witty tour of how biotech is remaking animals — cloned pets, cyborg beetles, glow-in-the-dark fish — and the ethics trailing behind.",
    link: "https://www.goodreads.com/book/show/15793536-frankenstein-s-cat",
  },
  {
    title: "The Vegetarian",
    author: "Han Kang",
    year: 2025,
    summary:
      "A Korean woman's quiet decision to stop eating meat spirals into a haunting, three-part story of autonomy, desire, and control. Winner of the International Booker Prize.",
    link: "https://www.goodreads.com/book/show/25489025-the-vegetarian?from_search=true&from_srp=true&qid=32brvZjNV8&rank=3",
  },
  {
    title: "Weapons of Math Destruction",
    author: "Cathy O'Neil",
    year: 2025,
    summary:
      "How opaque, unregulated algorithms — 'weapons of math destruction' — quietly scale up bias and inequality across credit, hiring, policing, and education.",
    link: "https://www.goodreads.com/book/show/28186015-weapons-of-math-destruction",
  },
  // ---- 2024 ----
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    year: 2024,
    summary:
      "A counterintuitive take on the good life: choose the few things actually worth caring about, accept struggle and limits, and let go of the rest.",
    link: "https://www.goodreads.com/book/show/41140998-summary?from_search=true&from_srp=true&qid=2cVuA3B5op&rank=1",
  },
  {
    title: "The Way of Zen",
    author: "Alan Watts",
    year: 2024,
    summary:
      "Alan Watts's classic, approachable introduction to Zen Buddhism — its roots in Taoism and Mahayana Buddhism, and its focus on direct, immediate experience.",
    link: "https://www.goodreads.com/book/show/514210.The_Way_of_Zen",
  },
  {
    title: "The Prince and the Dressmaker",
    author: "Jen Wang",
    year: 2024,
    summary:
      "An exuberant fairy-tale graphic novel: Prince Sebastian secretly dazzles Paris as 'Lady Crystallia,' and his talented dressmaker Frances must choose between his secret and her own dreams.",
    link: "https://www.goodreads.com/book/show/34506912-the-prince-and-the-dressmaker",
  },
];

// Fallback spine colors, sourced from the shared palette (styles/colors.css)
const PALETTE = [
  "var(--book-1)",
  "var(--book-2)",
  "var(--book-3)",
  "var(--book-4)",
  "var(--book-5)",
  "var(--book-6)",
  "var(--book-7)",
];

const Bookshelf = () => {
  const [selected, setSelected] = useState(null);

  const { years, total } = useMemo(() => {
    const colored = books.map((b, i) => ({
      ...b,
      color: b.spineColor || PALETTE[i % PALETTE.length],
    }));
    const byYear = colored.reduce((acc, book) => {
      (acc[book.year] = acc[book.year] || []).push(book);
      return acc;
    }, {});
    const grouped = Object.keys(byYear)
      .map(Number)
      .sort((a, b) => b - a)
      .map((year) => ({ year, items: byYear[year] }));
    return { years: grouped, total: colored.length };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="bookshelf" className="section bookshelf-section">
      <div className="section-header">
        <span className="section-eyebrow">Off the Clock</span>
        <h2 className="section-title">The Bookshelf</h2>
        <p className="section-lead">
          {total} books and counting, newest on top. Hover to pull one out,
          click for the summary.
        </p>
      </div>

      <div className="bookshelf">
        {years.map(({ year, items }) => (
          <div key={year} className="shelf-row">
            <div className="shelf-year">
              {year}
              <span className="shelf-count">
                {items.length} {items.length === 1 ? "book" : "books"}
              </span>
            </div>
            <div className="shelf">
              <div className="shelf-books">
                {items.map((book) => {
                  const height = 150 + ((book.title.length * 7) % 46);
                  const width = 34 + ((book.author.length * 5) % 20);
                  const isActive = selected && selected.title === book.title;
                  return (
                    <button
                      key={book.title}
                      className={`book-spine ${isActive ? "is-active" : ""} ${
                        book.reading ? "is-reading" : ""
                      }`}
                      style={{
                        "--spine-color": book.color,
                        height: `${height}px`,
                        width: `${width}px`,
                      }}
                      onClick={() => setSelected(book)}
                      aria-label={`${book.title} by ${book.author}${
                        book.reading ? ", currently reading" : ""
                      }`}
                    >
                      {book.reading && (
                        <span className="reading-mark" aria-hidden="true">
                          <span className="reading-mark-tip">Now reading</span>
                        </span>
                      )}
                      <span className="book-spine-title">{book.title}</span>
                      <span className="book-spine-author">{book.author}</span>
                    </button>
                  );
                })}
              </div>
              <div className="shelf-board" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="book-detail-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} details`}
          onClick={() => setSelected(null)}
        >
          <div className="book-detail-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="book-detail-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div
              className="book-detail-swatch"
              style={{ background: selected.color }}
              aria-hidden="true"
            />
            <div className="book-detail-body">
              <h3 className="book-detail-title">{selected.title}</h3>
              <p className="book-detail-author">
                {selected.author} · {selected.year}
              </p>
              {selected.reading && (
                <span className="reading-chip">Currently reading</span>
              )}
              {selected.summary && (
                <p className="book-detail-summary">{selected.summary}</p>
              )}
              {selected.link && (
                <a
                  className="book-detail-link"
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Goodreads ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Bookshelf;
