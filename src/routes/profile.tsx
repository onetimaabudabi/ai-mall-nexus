import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const TITLE = "Профиль и настройки — AI-Mall";
const DESCRIPTION =
  "Редактирование профиля компании, контактных данных и оформления интерфейса AI-Mall.";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Profile,
});

function Profile() {
  const [dark, setDark] = useState(false);
  const [agent, setAgent] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <AppShell title="Профиль и настройки">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form
          className="glass-panel rounded-2xl p-6"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Профиль сохранён");
          }}
        >
          <h2 className="text-base font-semibold text-ink">Данные компании</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" defaultValue="Иван Петров" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Компания</Label>
              <Input id="company" defaultValue="ООО «Гранит Трейд»" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="ivan@granit-trade.ru" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" defaultValue="+7 900 000-00-00" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="inn">ИНН</Label>
              <Input id="inn" defaultValue="6658123456" />
            </div>
          </div>
          <Button type="submit" variant="hero" className="mt-6 h-11">
            Сохранить изменения
          </Button>
        </form>

        <section className="glass-panel h-fit rounded-2xl p-6">
          <h2 className="text-base font-semibold text-ink">Интерфейс</h2>
          <div className="mt-5 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-ink">Тёмная тема</div>
                <div className="text-xs text-dim">Ночной режим интерфейса</div>
              </div>
              <Switch checked={dark} onCheckedChange={setDark} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-ink">Автономный ИИ-агент</div>
                <div className="text-xs text-dim">Ведёт торг без подтверждений</div>
              </div>
              <Switch checked={agent} onCheckedChange={setAgent} />
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
