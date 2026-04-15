import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { precoHistorico, concorrentes } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Bell, Target, Bot } from "lucide-react";

export default function Mercado() {
  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <h1 className="text-2xl font-bold text-foreground">Mercado</h1>

        {/* Price display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="gradient-card p-6 border-accent/20 glow-accent">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Café Arábica</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">R$ 1.076</span>
              <span className="text-muted-foreground">/sc</span>
            </div>
            <Badge className="bg-success/20 text-success border-success/30 mt-2"><TrendingUp className="h-3 w-3 mr-1" />↑ 2,3%</Badge>
          </Card>
          <Card className="gradient-card p-6 border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Robusta</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">R$ 720</span>
              <span className="text-muted-foreground">/sc</span>
            </div>
          </Card>
          <Card className="gradient-card p-6 border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Café Especial</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-accent">R$ 2.340</span>
              <span className="text-muted-foreground">/sc</span>
            </div>
          </Card>
        </div>

        {/* Price chart */}
        <Card className="gradient-card p-4 border-border/50">
          <h3 className="text-sm font-semibold text-foreground mb-4">Histórico de Preços — 12 meses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={precoHistorico}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 20%)" />
              <XAxis dataKey="mes" tick={{ fill: 'hsl(120 5% 55%)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'hsl(120 5% 55%)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(150 25% 13%)', border: '1px solid hsl(150 15% 20%)', borderRadius: 8, color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="arabica" name="Arábica" stroke="hsl(142 71% 45%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="robusta" name="Robusta" stroke="hsl(38 92% 50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="especial" name="Especial" stroke="hsl(199 89% 48%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price alert */}
          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">Alerta de Preço</span>
            </div>
            <p className="text-sm text-muted-foreground">Alerta configurado: <strong className="text-foreground">R$ 1.150/sc</strong></p>
            <Badge variant="outline" className="mt-2 text-xs border-border text-muted-foreground">Ainda não atingido</Badge>
          </Card>

          {/* Regional benchmark */}
          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-success" />
              <span className="text-sm font-semibold text-foreground">Benchmark Regional</span>
            </div>
            <p className="text-sm text-muted-foreground">Produtividade média Cerrado Mineiro: <strong className="text-foreground">52 sc/ha</strong></p>
            <p className="text-sm text-muted-foreground mt-1">Sua média: <strong className="text-success">58 sc/ha (+11,5%)</strong></p>
          </Card>

          {/* AI sell card */}
          <Card className="gradient-card p-4 border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">Melhor Momento para Vender</span>
            </div>
            <p className="text-sm text-muted-foreground">Com base no histórico 2022–2025, preços tendem a subir em Agosto. Considere aguardar.</p>
          </Card>
        </div>

        {/* Competitor table */}
        <Card className="gradient-card border-border/50 overflow-hidden">
          <div className="p-4 border-b border-border/30">
            <h3 className="text-sm font-semibold text-foreground">Radar de Concorrentes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  {['Nome', 'Região', 'Produtividade', 'Presença', 'Preço Médio', 'Obs'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {concorrentes.map((c, i) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium text-foreground">{c.nome}</td>
                    <td className="px-4 py-3 text-foreground">{c.regiao}</td>
                    <td className="px-4 py-3 text-foreground">{c.produtividade}</td>
                    <td className="px-4 py-3 text-foreground">{c.presenca}</td>
                    <td className="px-4 py-3 text-foreground">{c.precoMedio}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.obs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
