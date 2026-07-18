// Shared list of in-page sections, reused by SectionNav and the CommandPalette.
export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "bookshelf", label: "Bookshelf" },
  { id: "travels", label: "Travels" },
  { id: "contact", label: "Contact" },
];

// Smooth-scroll to a section by id.
export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
