import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CATEGORIES, PRODUCTS, SEARCH_SUGGESTIONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TITLE = "Каталог AI-Mall — товары от проверенных поставщиков";
const DESCRIPTION =
  "Умный поиск и фильтры по категориям, цене и рейтингу. Запросите предложение — ИИ-агент продавца ответит сразу.";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [maxPrice, setMaxPrice] = useState(13000);
  const [minRating, setMinRating] = useState(0);

  const suggestions = useMemo(
    () =>
      query.trim()
        ? SEARCH_SUGGESTIONS.filter((s) => s.includes(query.trim().toLowerCase())).slice(0, 4)
        : SEARCH_SUGGESTIONS.slice(0, 4),
    [query],
  );

  const items = PRODUCTS.filter(
    (p) =>
      (category === CATEGORIES[0] || p.category === category) &&
      p.price <= maxPrice &&
      p.rating >= minRating &&
      (query.trim() === "" ||
        p.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        p.supplier.toLowerCase().includes(query.trim().toLowerCase())),
  );

  return (
    <AppShell title="Каталог товаров">
      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="glass-panel h-fit rounded-2xl p-5">
          <div className="text-sm font-semibold text-ink">Фильтры</div>

          <div className="mt-5 space-y-2">
            <div className="text-xs uppercase tracking-wide text-dim">Категория</div>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  category === c ? "bg-brand text-brand-foreground" : "text-dim hover:bg-foreground/5",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-dim">
              <span>Цена до</span>
              <span className="font-mono text-ink">{maxPrice.toLocaleString("ru-RU")} ₽</span>
            </div>
            <Slider
              className="mt-3"
              value={[maxPrice]}
              min={300}
              max={13000}
              step={100}
              onValueChange={(v) => setMaxPrice(v[0] ?? 13000)}
            />
          </div>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-wide text-dim">Рейтинг</div>
            <div className="mt-3 flex gap-2">
              {[0, 4.5, 4.7, 4.8].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMinRating(r)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    minRating === r
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border text-dim hover:text-ink",
                  )}
                >
                  {r === 0 ? "Все" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-dim" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => window.setTimeout(() => setFocused(false), 150)}
              placeholder="Например: кружки корпоративные"
              className="h-12 rounded-full border-border bg-background pl-11"
            />
            {focused && suggestions.length > 0 && (
              <div className="glass-panel absolute z-20 mt-2 w-full overflow-hidden rounded-2xl p-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseDown={() => setQuery(s)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-dim transition-colors hover:bg-foreground/5 hover:text-ink"
                  >
                    <Search className="size-3.5" />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-dim">Найдено позиций: {items.length}</div>

          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p, i) => (
              <article
                key={p.id}
                className="glass-panel group flex flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-mist">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {p.badge && (
                    <span
                      className={cn(
                        "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium",
                        p.badge === "Премиум"
                          ? "bg-gold text-exclusive-foreground"
                          : "bg-exclusive text-exclusive-foreground",
                      )}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-xs text-dim">{p.supplier}</div>
                  <h3 className="mt-1.5 text-sm font-medium leading-snug text-ink">{p.title}</h3>
                  <div className="mt-3 flex items-center gap-2">
                    <Star className="size-3.5 fill-gold text-gold" />
                    <span className="font-mono text-xs text-dim">{p.rating}</span>
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="font-mono text-lg font-semibold text-ink">
                      {p.price.toLocaleString("ru-RU")} ₽
                    </div>
                    <div className="text-xs text-dim">{p.unit}</div>
                    <Button variant="hero" className="mt-4 h-11 w-full" asChild>
                      <Link to="/chat">Запросить предложение</Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
