import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Bot, Send, Lightbulb, TrendingUp, BarChart3 } from "lucide-react";

const preloadedMessages = [
  { role: 'user' as const, content: 'Qual meu talhão mais lucrativo?' },
  { role: 'assistant' as const, content: 'O Talhão A3 da Fazenda Serra Verde é seu melhor ativo: 84 pontos SCA, custo de R$298/sc e rendimento de 98sc/ha. Potencial specialty não aproveitado nas últimas 2 safras representa R$128k em receita perdida.' },
  { role: 'user' as const, content: 'E o pior?' },
  { role: 'assistant' as const, content: 'Talhão B1 — Fazenda Boa Vista. Custo de R$612/sc, rendimento 41sc/ha. Histórico mostra queda consistente. Recomendo análise de solo e revisão do manejo de irrigação.' },
];

const insights = [
  { icon: Lightbulb, title: 'Oportunidade Perdida', desc: 'Mistura de lotes custou ~R$ 248.000 nesta safra', color: 'text-accent' },
  { icon: TrendingUp, title: 'Projeção 2026', desc: 'Safra 2026 projetada: 5.100 sacas (+5,8%)', color: 'text-success' },
  { icon: BarChart3, title: 'Janela de Venda', desc: 'Melhor janela de venda histórica: Setembro–Outubro', color: 'text-info' },
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
