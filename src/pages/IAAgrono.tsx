import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Bot, Send, Lightbulb, TrendingUp, BarChart3 } from "lucide-react";

const preloadedMessages = [
  { role: 'user' as const, content: 'Qual meu talhão mais lucrativo?' },
  { role: 'assistant' as const, content: 'Talhão A3 — Fazenda Serra Verde é seu maior ativo: 84 pts SCA (nível Specialty), custo de R$ 298/sc, produtividade de 98 sc/ha. 1.176 sacas vendidas como commodity (R$ 1.076/sc) quando deveriam ser certificadas como Specialty (R$ 2.340/sc) = R$ 1.486.464 em receita não realizada só nesta safra.' },
  { role: 'user' as const, content: 'E o pior?' },
  { role: 'assistant' as const, content: 'Talhão B1 — Fazenda Boa Vista. Custo de R$ 612/sc, rendimento em queda consistente: 520 → 470 → 410 sacas nas últimas 3 safras. Recomendo análise de solo completa e revisão de irrigação antes da próxima safra. Custo de ação estimado: R$ 8.000. Custo de inação: perda contínua de produtividade.' },
  { role: 'user' as const, content: 'Vale vender as sacas agora?' },
  { role: 'assistant' as const, content: 'Preço atual: R$ 1.076/sc. Histórico 2022–2025 mostra pico em Agosto–Outubro (R$ 1.180–1.230/sc). Com 620 sacas em estoque, aguardar pode render até R$ 95.480 a mais. Sugestão: aguardar com stop de venda em R$ 1.050/sc para proteger de queda. Risco de esperar: baixo. Ganho potencial: alto.' },
];

const insights = [
  { icon: Lightbulb, title: 'Receita não realizada', desc: 'R$ 1.486.464 — Talhão A3 vendido como commodity (84 SCA merece Specialty)', color: 'text-accent' },
  { icon: TrendingUp, title: 'Projeção 2026', desc: 'Safra 2026 projetada: 5.100 sacas (+5,8%). Com A3 certificado: R$ 11,9M de receita potencial.', color: 'text-success' },
  { icon: BarChart3, title: 'Janela de Venda', desc: 'Agosto–Outubro: janela histórica de pico. 620 sacas em estoque = +R$ 95.480 aguardando.', color: 'text-info' },
];

export default function IAAgrono() {
  const [messages] = useState(preloadedMessages);
  const [input, setInput] = useState('');

  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <h1 className="text-2xl font-bold text-foreground">IA Agrônoma</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Insights panel */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Insights da IA</h3>
            {insights.map((ins, i) => (
              <Card key={i} className="gradient-card p-4 border-border/50">
                <div className="flex items-start gap-3">
                  <ins.icon className={`h-5 w-5 mt-0.5 ${ins.color}`} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{ins.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{ins.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Chat */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border/50 h-[540px] flex flex-col">
              <div className="p-4 border-b border-border/30 flex items-center gap-2">
                <Bot className="h-5 w-5 text-accent" />
                <span className="font-semibold text-foreground">Assistente IA Agrônoma</span>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${m.role === 'user' ? 'bg-primary text-foreground' : 'bg-muted/50 text-foreground'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border/30">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Pergunte sobre suas fazendas..."
                    className="flex-1 bg-muted/30 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button className="bg-accent text-accent-foreground rounded-lg px-4 py-2.5 hover:bg-accent/90 transition-colors">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
