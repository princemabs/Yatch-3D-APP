import { pressLogos } from "@/lib/data";

export function Press() {
  return (
    <section className="press">
      <div className="container">
        <div className="press__row">
          {pressLogos.map((p) => (
            <span key={p} className="press__logo">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
