import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, Pencil, Archive } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TITLE = "Кабинет продавца AI-Mall — товары и модерация";
const DESCRIPTION =
  "Добавляйте товары, управляйте карточками и отслеживайте статусы: активен, на модерации, завершён.";

export const Route = createFileRoute("/seller")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Seller,
});

const STATUS_STYLE: Record<Product["status"], string> = {
  Активен: "bg-brand/10 text-brand",
  "На модерации": "bg-gold/15 text-gold",
  Завершён: "bg-foreground/5 text-dim",
};

function Seller() {
  const [items, setItems] = useState<Product[]>(PRODUCTS);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[1]);
  const [description, setDescription] = useState("");

  return (
    <AppShell title="Мои товары">
      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <form
          className="glass-panel h-fit rounded-2xl p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim() || !price.trim()) {
              toast.error("Заполните название и цену");
              return;
            }
            setItems((prev) => [
              {
                id: `new-${Date.now()}`,
                title: title.trim(),
                supplier: "ООО «Гранит Трейд»",
                category,
                price: Number(price) || 0,
                unit: "шт",
                rating: 0,
                image: PRODUCTS[0]!.image,
                status: "На модерации",
              },
              ...prev,
            ]);
            setTitle("");
            setPrice("");
            setDescription("");
            toast.success("Товар отправлен на модерацию");
          }}
        >
          <h2 className="text-base font-semibold text-ink">Добавить товар</h2>

          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="p-title">Название</Label>
              <Input id="p-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Кружки с логотипом" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-desc">Описание</Label>
              <Textarea
                id="p-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Материал, объём партии, сроки"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="p-price">Цена, ₽</Label>
                <Input id="p-price" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="350" />
              </div>
              <div className="space-y-2">
                <Label>Категория</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.slice(1).map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/60 p-6 text-center transition-colors hover:border-brand/40">
              <ImagePlus className="size-5 text-dim" />
              <span className="text-sm text-dim">Загрузить фото товара</span>
              <input type="file" accept="image/*" className="hidden" onChange={() => toast.success("Фото загружено")} />
            </label>

            <Button type="submit" variant="hero" className="h-11 w-full">
              Опубликовать
            </Button>
          </div>
        </form>

        <section className="glass-panel overflow-hidden rounded-2xl">
          <div className="border-b border-border px-6 py-4 text-base font-semibold text-ink">
            Список товаров · {items.length}
          </div>
          <ul className="divide-y divide-border">
            {items.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                <img src={p.image} alt={p.title} loading="lazy" className="size-14 rounded-xl object-cover" />
                <div className="min-w-40 flex-1">
                  <div className="text-sm font-medium text-ink">{p.title}</div>
                  <div className="text-xs text-dim">
                    {p.category} · {p.price.toLocaleString("ru-RU")} ₽
                  </div>
                </div>
                <span className={cn("rounded-full px-3 py-1 text-xs", STATUS_STYLE[p.status])}>
                  {p.status}
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" aria-label="Редактировать" onClick={() => toast("Редактирование карточки")}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Архивировать"
                    onClick={() => {
                      setItems((prev) => prev.filter((x) => x.id !== p.id));
                      toast.success("Товар архивирован");
                    }}
                  >
                    <Archive className="size-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
