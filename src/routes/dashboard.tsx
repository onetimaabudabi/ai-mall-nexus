import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Inbox, MessagesSquare, TrendingUp } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { ACTIVITY } from "@/lib/mock-data";

const TITLE = "Дашборд AI-Mall — заявки, переговоры и документы";
const DESCRIPTION =
  "Личный кабинет AI-Mall: статистика заявок, сообщения ИИ-агентов и лента активности по сделкам.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "Активные заявки", value: "12", delta: "+3 за неделю", icon: Inbox, to: "/catalog" },
  { label: "Новые сообщения", value: "5", delta: "2 требуют ответа", icon: MessagesSquare, to: "/chat" },
  { label: "Ожидают документов", value: "3", delta: "1 на подписи", icon: FileText, to: "/documents" },
  { label: "Оборот за месяц", value: "1,4 млн ₽", delta: "+18%", icon: TrendingUp, to: "/documents" },
] as const;

function Dashboard() {
  return (
    <AppShell title="Добрый день, Иван">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
          >
            <Link
              to={s.to}
              className="glass-panel block rounded-2xl p-5 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-dim">{s.label}</span>
                <s.icon className="size-4 text-brand" />
              </div>
              <div className="mt-3 font-mono text-2xl font-semibold text-ink">{s.value}</div>
              <div className="mt-1 text-xs text-dim">{s.delta}</div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="glass-panel rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-base font-semibold text-ink">Последние активности</h2>
          <ol className="mt-5 space-y-5">
            {ACTIVITY.map((a) => (
              <li key={a.title} className="flex gap-4">
                <div className="w-16 shrink-0 pt-0.5 font-mono text-xs text-dim">{a.time}</div>
                <div className="relative border-l border-border pl-5">
                  <span className="absolute -left-[4.5px] top-1.5 size-2 rounded-full bg-brand" />
                  <div className="text-sm font-medium text-ink">{a.title}</div>
                  <div className="mt-0.5 text-sm text-dim">{a.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="glass-panel rounded-2xl p-6">
          <h2 className="text-base font-semibold text-ink">Быстрые действия</h2>
          <div className="mt-5 flex flex-col gap-3">
            <Button variant="hero" className="h-11 w-full" asChild>
              <Link to="/catalog">Найти товары</Link>
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-full" asChild>
              <Link to="/seller">Добавить товар</Link>
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-full" asChild>
              <Link to="/chat">Открыть переговоры</Link>
            </Button>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-dim">
            ИИ-агент ведёт 3 переговора автономно и уведомит вас, когда потребуется решение.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
