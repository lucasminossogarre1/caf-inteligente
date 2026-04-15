// ===== FARMS & TALHÕES =====
export interface Talhao {
  id: string;
  nome: string;
  hectares: number;
  variedade: string;
  idadePes: number;
  producaoSacas: number;
  produtividadeScHa: number;
  pontuacaoSCA: number;
  custoSaca: number;
  status: 'alta' | 'media' | 'baixa' | 'renovacao';
  peneira: string;
  defeitos: number;
  tipoBebida: string;
}

export interface Fazenda {
  id: string;
  nome: string;
  hectares: number;
  cidade: string;
  talhoes: Talhao[];
  colheitaTotal: number;
  receita: number;
  custo: number;
}

export const fazendas: Fazenda[] = [
  {
    id: 'sv', nome: 'Fazenda Serra Verde', hectares: 48, cidade: 'Patrocínio, MG',
    colheitaTotal: 2520, receita: 2712960, custo: 870000,
    talhoes: [
      { id: 'a1', nome: 'Talhão A1', hectares: 12, variedade: 'Catuaí Vermelho', idadePes: 8, producaoSacas: 780, produtividadeScHa: 65, pontuacaoSCA: 80, custoSaca: 380, status: 'media', peneira: '16/17', defeitos: 4.1, tipoBebida: 'Dura' },
      { id: 'a2', nome: 'Talhão A2', hectares: 9, variedade: 'Mundo Novo', idadePes: 6, producaoSacas: 504, produtividadeScHa: 56, pontuacaoSCA: 78, custoSaca: 420, status: 'media', peneira: '16/17', defeitos: 5.2, tipoBebida: 'Dura' },
      { id: 'a3', nome: 'Talhão A3', hectares: 15, variedade: 'Bourbon Amarelo', idadePes: 5, producaoSacas: 1176, produtividadeScHa: 98, pontuacaoSCA: 84, custoSaca: 298, status: 'alta', peneira: '17/18', defeitos: 3.2, tipoBebida: 'Mole' },
      { id: 'a4', nome: 'Talhão A4', hectares: 12, variedade: 'Catuaí Vermelho', idadePes: 10, producaoSacas: 60, produtividadeScHa: 5, pontuacaoSCA: 0, custoSaca: 0, status: 'renovacao', peneira: '-', defeitos: 0, tipoBebida: '-' },
    ],
  },
  {
    id: 'bv', nome: 'Fazenda Boa Vista', hectares: 32, cidade: 'Carmo do Paranaíba, MG',
    colheitaTotal: 1480, receita: 1593280, custo: 680000,
    talhoes: [
      { id: 'b1', nome: 'Talhão B1', hectares: 10, variedade: 'Catuaí Vermelho', idadePes: 12, producaoSacas: 410, produtividadeScHa: 41, pontuacaoSCA: 72, custoSaca: 612, status: 'baixa', peneira: '15/16', defeitos: 7.8, tipoBebida: 'Rio' },
      { id: 'b2', nome: 'Talhão B2', hectares: 14, variedade: 'Mundo Novo', idadePes: 7, producaoSacas: 728, produtividadeScHa: 52, pontuacaoSCA: 76, custoSaca: 440, status: 'media', peneira: '16/17', defeitos: 5.5, tipoBebida: 'Dura' },
      { id: 'b3', nome: 'Talhão B3', hectares: 8, variedade: 'Catuaí Vermelho', idadePes: 9, producaoSacas: 342, produtividadeScHa: 43, pontuacaoSCA: 74, custoSaca: 520, status: 'baixa', peneira: '15/16', defeitos: 6.1, tipoBebida: 'Dura' },
    ],
  },
  {
    id: 'ra', nome: 'Fazenda Recanto Alto', hectares: 27, cidade: 'Monte Carmelo, MG',
    colheitaTotal: 820, receita: 877920, custo: 390000,
    talhoes: [
      { id: 'c1', nome: 'Talhão C1', hectares: 11, variedade: 'Bourbon Amarelo', idadePes: 4, producaoSacas: 440, produtividadeScHa: 40, pontuacaoSCA: 79, custoSaca: 480, status: 'media', peneira: '16/17', defeitos: 4.8, tipoBebida: 'Apenas Mole' },
      { id: 'c2', nome: 'Talhão C2', hectares: 16, variedade: 'Mundo Novo', idadePes: 6, producaoSacas: 380, produtividadeScHa: 24, pontuacaoSCA: 75, custoSaca: 510, status: 'baixa', peneira: '15/16', defeitos: 6.3, tipoBebida: 'Dura' },
    ],
  },
];

// ===== KPIs =====
export const kpis = {
  totalColhido: 4820,
  receitaTotal: 5184000,
  custoTotal: 1940000,
  margem: 62.6,
  custoSacaMedia: 402,
};

// ===== CASH FLOW =====
export const cashFlowData = [
  { mes: 'Jan', receita: 0, despesa: 180000 },
  { mes: 'Fev', receita: 0, despesa: 160000 },
  { mes: 'Mar', receita: 0, despesa: 200000 },
  { mes: 'Abr', receita: 0, despesa: 175000 },
  { mes: 'Mai', receita: 120000, despesa: 190000 },
  { mes: 'Jun', receita: 280000, despesa: 210000 },
  { mes: 'Jul', receita: 1800000, despesa: 240000 },
  { mes: 'Ago', receita: 1600000, despesa: 220000 },
  { mes: 'Set', receita: 800000, despesa: 140000 },
  { mes: 'Out', receita: 400000, despesa: 100000 },
  { mes: 'Nov', receita: 120000, despesa: 80000 },
  { mes: 'Dez', receita: 64000, despesa: 45000 },
];

// ===== AI ALERTS =====
export const aiAlerts = [
  { id: 1, tipo: 'warning', msg: 'Talhão A3 tem pontuação 84 SCA — separe este lote antes de misturar. Ganho estimado: R$ 128.000' },
  { id: 2, tipo: 'danger', msg: 'Talhão B1 com queda de produtividade consistente. Análise de solo recomendada.' },
  { id: 3, tipo: 'info', msg: 'Melhor janela de venda histórica: Setembro–Outubro. Considere aguardar.' },
];

// ===== HARVESTS =====
export const colheitas = [
  { id: 1, data: '15/07/2025', fazenda: 'Serra Verde', talhao: 'A3', sacas: 1176, metodo: 'Manual', cereja: 72, boia: 18, verde: 10, statusBeneficiamento: 'Concluído' },
  { id: 2, data: '20/07/2025', fazenda: 'Serra Verde', talhao: 'A1', sacas: 780, metodo: 'Mecânico', cereja: 58, boia: 28, verde: 14, statusBeneficiamento: 'Concluído' },
  { id: 3, data: '22/07/2025', fazenda: 'Serra Verde', talhao: 'A2', sacas: 504, metodo: 'Mecânico', cereja: 55, boia: 30, verde: 15, statusBeneficiamento: 'Em andamento' },
  { id: 4, data: '01/08/2025', fazenda: 'Boa Vista', talhao: 'B2', sacas: 728, metodo: 'Mecânico', cereja: 52, boia: 32, verde: 16, statusBeneficiamento: 'Concluído' },
  { id: 5, data: '05/08/2025', fazenda: 'Boa Vista', talhao: 'B1', sacas: 410, metodo: 'Manual', cereja: 48, boia: 35, verde: 17, statusBeneficiamento: 'Concluído' },
  { id: 6, data: '08/08/2025', fazenda: 'Boa Vista', talhao: 'B3', sacas: 342, metodo: 'Manual', cereja: 50, boia: 33, verde: 17, statusBeneficiamento: 'Em andamento' },
  { id: 7, data: '12/08/2025', fazenda: 'Recanto Alto', talhao: 'C1', sacas: 440, metodo: 'Manual', cereja: 60, boia: 25, verde: 15, statusBeneficiamento: 'Concluído' },
  { id: 8, data: '18/08/2025', fazenda: 'Recanto Alto', talhao: 'C2', sacas: 380, metodo: 'Mecânico', cereja: 45, boia: 38, verde: 17, statusBeneficiamento: 'Pendente' },
];

// ===== FINANCIAL =====
export const despesasBreakdown = [
  { nome: 'Mão de Obra', valor: 38, cor: '#22c55e' },
  { nome: 'Insumos', valor: 27, cor: '#f59e0b' },
  { nome: 'Maquinário', valor: 18, cor: '#3b82f6' },
  { nome: 'Frete', valor: 9, cor: '#8b5cf6' },
  { nome: 'Outros', valor: 8, cor: '#6b7280' },
];

export const transacoes = [
  { id: 1, data: '15/04/2026', descricao: 'Venda lote A3 — Specialty', categoria: 'Venda', fazenda: 'Serra Verde', talhao: 'A3', valor: 480000 },
  { id: 2, data: '12/04/2026', descricao: 'Adubo NPK — Boa Vista', categoria: 'Insumos', fazenda: 'Boa Vista', talhao: '-', valor: -3200 },
  { id: 3, data: '10/04/2026', descricao: 'Pagamento colhedores — Março', categoria: 'Mão de Obra', fazenda: 'Serra Verde', talhao: '-', valor: -24000 },
  { id: 4, data: '08/04/2026', descricao: 'Diesel — abastecimento geral', categoria: 'Maquinário', fazenda: 'Serra Verde', talhao: '-', valor: -4800 },
  { id: 5, data: '05/04/2026', descricao: 'Venda lote B2 — commodity', categoria: 'Venda', fazenda: 'Boa Vista', talhao: 'B2', valor: 320000 },
  { id: 6, data: '01/04/2026', descricao: 'Frete — transporte Santos', categoria: 'Frete', fazenda: 'Serra Verde', talhao: '-', valor: -12000 },
];

// ===== MARKET =====
export const precoHistorico = [
  { mes: 'Mai/25', arabica: 980, robusta: 680, especial: 2100 },
  { mes: 'Jun/25', arabica: 1010, robusta: 690, especial: 2150 },
  { mes: 'Jul/25', arabica: 1045, robusta: 700, especial: 2200 },
  { mes: 'Ago/25', arabica: 1120, robusta: 715, especial: 2280 },
  { mes: 'Set/25', arabica: 1180, robusta: 720, especial: 2350 },
  { mes: 'Out/25', arabica: 1150, robusta: 710, especial: 2300 },
  { mes: 'Nov/25', arabica: 1090, robusta: 700, especial: 2250 },
  { mes: 'Dez/25', arabica: 1040, robusta: 690, especial: 2180 },
  { mes: 'Jan/26', arabica: 1020, robusta: 685, especial: 2160 },
  { mes: 'Fev/26', arabica: 1035, robusta: 695, especial: 2200 },
  { mes: 'Mar/26', arabica: 1052, robusta: 710, especial: 2280 },
  { mes: 'Abr/26', arabica: 1076, robusta: 720, especial: 2340 },
];

export const concorrentes = [
  { nome: 'Fazenda São Lucas', regiao: 'Patrocínio, MG', produtividade: '48 sc/ha', presenca: 'Instagram, Site', precoMedio: 'R$ 1.020/sc', obs: 'Foco em commodity' },
  { nome: 'Cooperativa Cerrado', regiao: 'Araguari, MG', produtividade: '55 sc/ha', presenca: 'Site, Marketplace', precoMedio: 'R$ 1.090/sc', obs: 'Volume alto, marca forte' },
  { nome: 'Sítio das Pedras', regiao: 'Monte Carmelo, MG', produtividade: '62 sc/ha', presenca: 'Instagram', precoMedio: 'R$ 1.340/sc', obs: 'Micro-lote specialty' },
  { nome: 'Agro Meireles', regiao: 'Campos Altos, MG', produtividade: '44 sc/ha', presenca: 'Nenhuma', precoMedio: 'R$ 960/sc', obs: 'Operação tradicional' },
];

// ===== WORKERS =====
export const trabalhadores = [
  { id: 1, nome: 'Carlos Pereira', tipo: 'Fixo', fazenda: 'Serra Verde', funcao: 'Encarregado', custoMes: 3800 },
  { id: 2, nome: 'Maria dos Santos', tipo: 'Safrista', fazenda: 'Boa Vista', funcao: 'Colhedora', custoMes: 1900 },
  { id: 3, nome: 'José Oliveira', tipo: 'Fixo', fazenda: 'Serra Verde', funcao: 'Tratorista', custoMes: 3200 },
  { id: 4, nome: 'Ana Silva', tipo: 'Safrista', fazenda: 'Recanto Alto', funcao: 'Colhedora', custoMes: 1900 },
  { id: 5, nome: 'Pedro Alves', tipo: 'Fixo', fazenda: 'Boa Vista', funcao: 'Irrigação', custoMes: 2800 },
  { id: 6, nome: 'Luciana Costa', tipo: 'Safrista', fazenda: 'Serra Verde', funcao: 'Colhedora', custoMes: 1900 },
];

export const ordensServico = [
  { id: 1, data: '14/04/2026', talhao: 'A3', servico: 'Adubação', responsavel: 'Carlos Pereira', status: 'Concluído' },
  { id: 2, data: '13/04/2026', talhao: 'B2', servico: 'Capina', responsavel: 'Pedro Alves', status: 'Em andamento' },
  { id: 3, data: '12/04/2026', talhao: 'C1', servico: 'Poda', responsavel: 'Ana Silva', status: 'Concluído' },
  { id: 4, data: '10/04/2026', talhao: 'A1', servico: 'Irrigação', responsavel: 'José Oliveira', status: 'Em andamento' },
  { id: 5, data: '08/04/2026', talhao: 'B1', servico: 'Análise de Solo', responsavel: 'Carlos Pereira', status: 'Pendente' },
];

export const estoque = [
  { nome: 'Adubo NPK 20-05-20', quantidade: 2400, unidade: 'kg', minimo: 1000, alerta: false },
  { nome: 'Herbicida Supreme', quantidade: 340, unidade: 'L', minimo: 500, alerta: true },
  { nome: 'Diesel', quantidade: 800, unidade: 'L', minimo: 1000, alerta: true },
  { nome: 'Calcário Dolomítico', quantidade: 5000, unidade: 'kg', minimo: 2000, alerta: false },
];

export const diarioCampo = [
  { data: '14/04/2026', talhao: 'B2', nota: 'Sinal de bicho-mineiro no setor norte. Monitorar nos próximos 7 dias.' },
  { data: '12/04/2026', talhao: 'A3', nota: 'Irrigação ajustada — solo estava muito seco no setor leste.' },
  { data: '10/04/2026', talhao: 'C1', nota: 'Poda de formação concluída. Plantas respondendo bem.' },
  { data: '08/04/2026', talhao: 'A1', nota: 'Aplicação de adubo foliar realizada. Cobertura uniforme.' },
  { data: '05/04/2026', talhao: 'B1', nota: 'Ferrugem detectada em 15% das plantas. Aplicação de fungicida agendada.' },
];

// ===== WHATSAPP =====
export const whatsappMensagens = [
  { remetente: 'joao', msg: 'Quanto colhei no talhão A3 esse ano?' },
  { remetente: 'ia', msg: 'Olá João! 🌱 Talhão A3 — Safra 2025: 1.176 sacas colhidas em 15 hectares (98 sc/ha). Seu melhor talhão até agora!' },
  { remetente: 'joao', msg: 'Gastei 3200 reais com adubo na fazenda boa vista hoje' },
  { remetente: 'ia', msg: 'Registrado! ✅ R$ 3.200 — Insumos — Fazenda Boa Vista — 15/04/2026. Custo acumulado de insumos em Boa Vista: R$ 48.700 (safra 2025).' },
  { remetente: 'joao', msg: 'Vale vender agora?' },
  { remetente: 'ia', msg: 'Preço atual: R$1.076/sc. Historicamente, Agosto–Setembro costuma bater R$1.180–1.230. Você tem 620 sacas em estoque. Aguardar pode render até R$96.000 a mais. Recomendo esperar, mas com stop em R$1.050.' },
];

export const whatsappAlertas = [
  'Preço do café atingiu R$ 1.076/sc (+2,3%)',
  'Estoque de Herbicida Supreme abaixo do mínimo',
  'Ordem de serviço pendente: Análise de Solo — Talhão B1',
];

// ===== HARVEST HISTORY =====
export const historicoColheita = [
  { talhao: 'A1', s2023: 720, s2024: 750, s2025: 780 },
  { talhao: 'A2', s2023: 480, s2024: 490, s2025: 504 },
  { talhao: 'A3', s2023: 1050, s2024: 1100, s2025: 1176 },
  { talhao: 'B1', s2023: 520, s2024: 470, s2025: 410 },
  { talhao: 'B2', s2023: 680, s2024: 710, s2025: 728 },
  { talhao: 'B3', s2023: 360, s2024: 350, s2025: 342 },
  { talhao: 'C1', s2023: 0, s2024: 380, s2025: 440 },
  { talhao: 'C2', s2023: 0, s2024: 350, s2025: 380 },
];
