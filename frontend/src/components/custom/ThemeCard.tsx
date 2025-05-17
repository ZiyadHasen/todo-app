// src/components/custom/ThemeCard.tsx
export function Card() {
  return (
    <div className="bg-background /* var(--background) */ text-text /* var(--text) */ border-border /* var(--border) */ rounded-lg border p-6 shadow transition-colors duration-300">
      <h2 className="mb-2 text-xl font-semibold">Themed Card</h2>
      <p className="text-sm">
        Now this card’s background, text, and border change with light/dark.
      </p>
      <button className="bg-primary /* var(--primary) */ mt-4 rounded px-4 py-2 text-white transition-colors duration-300">
        Primary Action
      </button>
    </div>
  );
}
