import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Lightbulb, TrendingUp, BarChart3, Sparkles, ArrowRight, Brain, Leaf } from "lucide-react";

const preloadedMessages = [
  { role: 'user' as const, content: 'Qual meu talhão mais lucrativo?' },
  { role: 'assistant' as const, content: 'Talhão A3 — Fazenda Serra Verde é seu maior ativo: 84 pts SCA (nível Specialty), custo de R$ 298/sc, produtividade de 98 sc/ha. 1.176 sacas vendidas como commodity (R$ 1.076/sc) quando deveriam ser certificadas como Specialty (R$ 2.340/sc) = R$ 1.486.464 em receita não realizada só nesta safra.' },
  { role: 'user' as const, content: 'E o pior?' },
  { role: 'assistant' as const, content: 'Talhão B1 — Fazenda Boa Vista. Custo de R$ 612/sc, rendimento em queda: 520→470→410 sacas nas últimas 3 safras. Recomendo:\n\n1. **Análise de solo urgente** — pH pode estar abaixo de 5.0\n2. **Revisão do manejo de irrigação** — setor norte apresenta stress hídrico\n3. **Considerar renovação parcial** — ROI atual é negativo em R$48/sc\n\nPrazo ideal para ação: antes de Maio/2026.' },
  { role: 'user' as const, content: 'Vale vender as sacas agora?' },
  { role: 'assistant' as const, content: 'Preço atual: R$ 1.076/sc. Histórico 2022–2025 mostra pico em Agosto–Outubro (R$ 1.180–1.230/sc). Com 620 sacas em estoque, aguardar pode render até R$ 95.480 a mais. Sugestão: aguardar com stop de venda em R$ 1.050/sc para proteger de queda. Risco de esperar: baixo. Ganho potencial: alto.' },
];

const insights = [
  { icon: Lightbulb, title: 'Receita não realizada', desc: 'R$ 1.486.464 — Talhão A3 vendido como commodity (84 SCA merece Specialty)', color: 'text-accent', priority: 'alta' },
  { icon: TrendingUp, title: 'Projeção Safra 2026', desc: 'Safra 2026 projetada: 5.100 sacas (+5,8%). Com A3 certificado: R$ 11,9M de receita potencial.', color: 'text-success', priority: 'media' },
  { icon: BarChart3, title: 'Janela de Venda', desc: 'Agosto–Outubro: pico histórico R$1.180–1.230/sc. 620 sacas em estoque = +R$ 95.480 aguardando.', color: 'text-info', priority: 'media' },
  { icon: Brain, title: 'Solo Talhão B1', desc: 'Saturação de bases em 48% — abaixo do ideal. Calagem recomendada antes da próxima safra.', color: 'text-destructive', priority: 'alta' },
];

const suggestedQuestions = [
  'Qual o ROI de cada talhão?',
  'Quando devo vender meu estoque?',
  'Qual variedade rende mais?',
  'Projeção de custos para 2026',
];

export default function IAAgrono() {
  const [messages, setMessages] = useState(preloadedMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Analisando seus dados... Com base nas informações das 3 fazendas e 9 talhões, essa é uma pergunta que envolve múltiplas variáveis. Recomendo que verifiquemos os dados detalhados na aba Financeiro para uma resposta mais precisa.'
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (q: string) => {
    setInput(q);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">IA Agrônoma</h1>
            <p className="text-muted-foreground text-sm">Análises inteligentes baseadas nos dados das suas fazendas</p>
          </div>
          <Badge className="bg-success/20 text-success border-success/30"><Sparkles className="h-3 w-3 mr-1" />IA Ativa</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Insights panel */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Insights da IA</h3>
            {insights.map((ins, i) => (
              <Card key={i} className="gradient-card p-4 border-border/50 hover:border-accent/20 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg bg-muted/50 group-hover:bg-accent/10 transition-colors`}>
                    <ins.icon className={`h-4 w-4 ${ins.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground">{ins.title}</p>
                      <Badge variant="outline" className={`text-[9px] ${ins.priority === 'alta' ? 'border-destructive/30 text-destructive' : 'border-border text-muted-foreground'}`}>{ins.priority}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ins.desc}</p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Quick stats */}
            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Resumo IA</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Análises realizadas</span><span className="text-foreground font-medium">847</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Alertas gerados</span><span className="text-foreground font-medium">23</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Economia estimada</span><span className="text-success font-medium">R$ 376.000</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Última atualização</span><span className="text-foreground font-medium">16/04 às 09:15</span></div>
              </div>
            </Card>
          </div>

          {/* Chat */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border/50 h-[600px] flex flex-col">
              <div className="p-4 border-b border-border/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-accent/20">
                    <Bot className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Assistente IA Agrônoma</span>
                    <p className="text-[10px] text-success">Conectado aos dados de 3 fazendas • 9 talhões</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">{messages.length} mensagens</Badge>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${m.role === 'user' ? 'bg-accent/20 text-foreground border border-accent/20' : 'bg-muted/30 text-foreground border border-border/30'}`}>
                      {m.role === 'assistant' && (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Leaf className="h-3 w-3 text-accent" />
                          <span className="text-[10px] text-accent font-medium">IA Agrônoma</span>
                        </div>
                      )}
                      <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted/30 border border-border/30 rounded-xl px-4 py-3 text-sm">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Leaf className="h-3 w-3 text-accent" />
                        <span className="text-[10px] text-accent font-medium">IA Agrônoma</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggested questions */}
              <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {suggestedQuestions.map((q, i) => (
                    <button key={i} onClick={() => handleSuggestion(q)}
                      className="shrink-0 text-[10px] px-3 py-1 rounded-full bg-muted/30 border border-border/30 text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors">
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-border/30">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Pergunte sobre suas fazendas..."
                    className="flex-1 bg-muted/30 border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button onClick={handleSend} disabled={!input.trim() || isTyping}
                    className="bg-accent text-accent-foreground rounded-xl px-4 py-2.5 hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
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
