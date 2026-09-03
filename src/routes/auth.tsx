import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const TITLE = "Вход и регистрация — AI-Mall";
const DESCRIPTION =
  "Войдите в AI-Mall или создайте аккаунт компании, чтобы вести переговоры с ИИ-агентами и подписывать документы.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AuthPage;
});

function AuthPage() {
  return null;
}
