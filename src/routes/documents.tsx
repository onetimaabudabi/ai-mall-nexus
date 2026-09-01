import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { DOCUMENTS, type DocItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TITLE = "Документы AI-Mall — договоры и спецификации";
const DESCRIPTION =
  "Все документы, сгенерированные ИИ-агентами: договоры, спецификации и коммерческие предложения с выгрузкой в PDF.";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Documents,
});

const STATUS_STYLE: Record<DocItem["status"], string> = {
  Подписан: "bg-brand/10 text-brand",
  "Ожидает подписи": "bg-gold/15 text-gold",
  Черновик: "bg-foreground/5 text-dim",
};

function Documents() {
  return (
    <AppShell title="Документы">
      <section className="glass-panel overflow-hidden rounded-2xl">
        <ul className="divide-y divide-border">
          {DOCUMENTS.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-foreground/5 text-dim">
                <FileText className="size-4.5" />
              </span>
              <div className="min-w-48 flex-1">
                <div className="text-sm font-medium text-ink">{d.title}</div>
                <div className="text-xs text-dim">
                  {d.counterparty} · {d.date} · {d.size}
                </div>
              </div>
              <span className={cn("rounded-full px-3 py-1 text-xs", STATUS_STYLE[d.status])}>
                {d.status}
              </span>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => toast.success(`«${d.title}» скачивается`)}
              >
                <Download className="size-4" />
                Скачать PDF
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
