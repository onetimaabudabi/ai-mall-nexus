import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileSignature, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { THREADS, type ChatMessage, type NegotiationStage } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TITLE = "Чат-переговоры с ИИ-агентом — AI-Mall";
const DESCRIPTION =
  "Переговоры с ИИ-агентами продавцов: предложения по цене и срокам, статусы сделки и автоматический договор.";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Chat,
});

const STAGES: NegotiationStage[] = ["Торг идёт", "Согласовано", "Документы готовы"];

function Chat() {
  const navigate = useNavigate();
  const [threads, setThreads] = useState(THREADS);
  const [activeId, setActiveId] = useState(THREADS[0]!.id);
  const [draft, setDraft] = useState("");

  const active = threads.find((t) => t.id === activeId)!;
  const stageIndex = STAGES.indexOf(active.stage);

  const send = () => {
    if (!draft.trim()) return;
    const mine: ChatMessage = {
      id: `u-${Date.now()}`,
      from: "me",
      text: draft.trim(),
      time: "сейчас",
    };
    setDraft("");
    setThreads((prev) =>
      prev.map((t) => (t.id === activeId ? { ...t, messages: [...t.messages, mine] } : t)),
    );
    window.setTimeout(() => {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeId
            ? {
                ...t,
                stage: t.stage === "Торг идёт" ? "Согласовано" : t.stage,
                messages: [
                  ...t.messages,
                  {
                    id: `a-${Date.now()}`,
                    from: "agent",
                    text: "Согласовал условия с поставщиком. Фиксирую предложение:",
                    time: "сейчас",
                    offer: {
                      price: "331 ₽ / шт",
                      term: "Отгрузка 14 дней",
                      conditions: "Постоплата 45 дней",
                    },
                  },
                ],
              }
            : t,
        ),
      );
    }, 900);
  };

  return (
    <AppShell title="Чат-переговоры">
      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="glass-panel h-fit overflow-hidden rounded-2xl">
          {threads.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={cn(
                "flex w-full flex-col gap-1 border-b border-border px-4 py-3.5 text-left transition-colors last:border-0",
                t.id === activeId ? "bg-brand/6" : "hover:bg-foreground/4",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-ink">{t.company}</span>
                <span className="shrink-0 font-mono text-[11px] text-dim">{t.time}</span>
              </div>
              <span className="truncate text-xs text-dim">{t.preview}</span>
              <span className="mt-1 w-fit rounded-full bg-foreground/5 px-2 py-0.5 text-[11px] text-dim">
                {t.stage}
              </span>
            </button>
          ))}
        </aside>

        <section className="glass-panel flex min-h-[70vh] flex-col overflow-hidden rounded-2xl">
          <header className="border-b border-border px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-ink">{active.company}</div>
                <div className="flex items-center gap-1.5 text-xs text-dim">
                  <Sparkles className="size-3.5 text-brand" />
                  {active.agent}
                </div>
              </div>
              {stageIndex >= 1 && (
                <Button
                  variant="hero"
                  className="h-10"
                  onClick={() => {
                    toast.success("Договор сформирован");
                    navigate({ to: "/documents" });
                  }}
                >
                  <FileSignature className="size-4" />
                  Сформировать договор
                </Button>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              {STAGES.map((s, i) => (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <div className="flex-1">
                    <div
                      className={cn(
                        "h-1 rounded-full",
                        i <= stageIndex ? "bg-brand" : "bg-foreground/10",
                      )}
                    />
                    <div
                      className={cn(
                        "mt-1.5 text-[11px]",
                        i <= stageIndex ? "text-ink" : "text-dim",
                      )}
                    >
                      {s}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {active.messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}
              >
                <div className={cn("max-w-[80%] space-y-2", m.from === "me" ? "items-end" : "")}>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.from === "me"
                        ? "rounded-br-md bg-brand text-brand-foreground"
                        : "rounded-bl-md bg-foreground/5 text-ink",
                    )}
                  >
                    {m.text}
                  </div>
                  {m.offer && (
                    <div className="rounded-2xl border border-border bg-background p-4">
                      <div className="text-[11px] uppercase tracking-wide text-dim">Предложение</div>
                      <div className="mt-1 font-mono text-base font-semibold text-ink">
                        {m.offer.price}
                      </div>
                      <div className="mt-2 space-y-1 text-xs text-dim">
                        <div>{m.offer.term}</div>
                        <div>{m.offer.conditions}</div>
                      </div>
                    </div>
                  )}
                  <div
                    className={cn(
                      "font-mono text-[11px] text-dim",
                      m.from === "me" ? "text-right" : "",
                    )}
                  >
                    {m.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border p-4">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Напишите ИИ-агенту продавца…"
              className="h-11 rounded-full"
            />
            <Button variant="hero" size="icon" className="size-11 shrink-0" aria-label="Отправить" onClick={send}>
              <Send className="size-4" />
            </Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
