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
  umidade?: number;
  altitude?: number;
  ultimaAdubacao?: string;
  phSolo?: number;
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
  coordenadas?: { lat: number; lng: number };
}

export const fazendas: Fazenda[] = [
  {
    id: 'sv', nome: 'Fazenda Serra Verde', hectares: 48, cidade: 'Patrocínio, MG',
    colheitaTotal: 2520, receita: 2712960, custo: 870000,
    coordenadas: { lat: -18.94, lng: -46.99 },
    talhoes: [
      { id: 'a1', nome: 'Talhão A1', hectares: 12, variedade: 'Catuaí Vermelho', idadePes: 8, producaoSacas: 780, produtividadeScHa: 65, pontuacaoSCA: 80, custoSaca: 380, status: 'media', peneira: '16/17', defeitos: 4.1, tipoBebida: 'Dura', umidade: 11.2, altitude: 1020, ultimaAdubacao: '12/03/2026', phSolo: 5.8 },
      { id: 'a2', nome: 'Talhão A2', hectares: 9, variedade: 'Mundo Novo', idadePes: 6, producaoSacas: 504, produtividadeScHa: 56, pontuacaoSCA: 78, custoSaca: 420, status: 'media', peneira: '16/17', defeitos: 5.2, tipoBebida: 'Dura', umidade: 11.5, altitude: 1010, ultimaAdubacao: '10/03/2026', phSolo: 5.6 },
      { id: 'a3', nome: 'Talhão A3', hectares: 15, variedade: 'Bourbon Amarelo', idadePes: 5, producaoSacas: 1176, produtividadeScHa: 98, pontuacaoSCA: 84, custoSaca: 298, status: 'alta', peneira: '17/18', defeitos: 3.2, tipoBebida: 'Mole', umidade: 10.8, altitude: 1050, ultimaAdubacao: '14/03/2026', phSolo: 6.1 },
      { id: 'a4', nome: 'Talhão A4', hectares: 12, variedade: 'Catuaí Vermelho', idadePes: 10, producaoSacas: 60, produtividadeScHa: 5, pontuacaoSCA: 0, custoSaca: 0, status: 'renovacao', peneira: '-', defeitos: 0, tipoBebida: '-', umidade: 0, altitude: 1030, ultimaAdubacao: '-', phSolo: 5.4 },
    ],
  },
  {
    id: 'bv', nome: 'Fazenda Boa Vista', hectares: 32, cidade: 'Carmo do Paranaíba, MG',
    colheitaTotal: 1480, receita: 1593280, custo: 680000,
    coordenadas: { lat: -19.00, lng: -46.32 },
    talhoes: [
      { id: 'b1', nome: 'Talhão B1', hectares: 10, variedade: 'Catuaí Vermelho', idadePes: 12, producaoSacas: 410, produtividadeScHa: 41, pontuacaoSCA: 72, custoSaca: 612, status: 'baixa', peneira: '15/16', defeitos: 7.8, tipoBebida: 'Rio', umidade: 12.1, altitude: 940, ultimaAdubacao: '05/02/2026', phSolo: 5.2 },
      { id: 'b2', nome: 'Talhão B2', hectares: 14, variedade: 'Mundo Novo', idadePes: 7, producaoSacas: 728, produtividadeScHa: 52, pontuacaoSCA: 76, custoSaca: 440, status: 'media', peneira: '16/17', defeitos: 5.5, tipoBebida: 'Dura', umidade: 11.8, altitude: 960, ultimaAdubacao: '08/03/2026', phSolo: 5.5 },
      { id: 'b3', nome: 'Talhão B3', hectares: 8, variedade: 'Catuaí Vermelho', idadePes: 9, producaoSacas: 342, produtividadeScHa: 43, pontuacaoSCA: 74, custoSaca: 520, status: 'baixa', peneira: '15/16', defeitos: 6.1, tipoBebida: 'Dura', umidade: 12.0, altitude: 950, ultimaAdubacao: '01/03/2026', phSolo: 5.3 },
    ],
  },
  {
    id: 'ra', nome: 'Fazenda Recanto Alto', hectares: 27, cidade: 'Monte Carmelo, MG',
    colheitaTotal: 820, receita: 877920, custo: 390000,
    coordenadas: { lat: -18.72, lng: -47.49 },
    talhoes: [
      { id: 'c1', nome: 'Talhão C1', hectares: 11, variedade: 'Bourbon Amarelo', idadePes: 4, producaoSacas: 440, produtividadeScHa: 40, pontuacaoSCA: 79, custoSaca: 480, status: 'media', peneira: '16/17', defeitos: 4.8, tipoBebida: 'Apenas Mole', umidade: 11.0, altitude: 1080, ultimaAdubacao: '20/02/2026', phSolo: 5.9 },
      { id: 'c2', nome: 'Talhão C2', hectares: 16, variedade: 'Mundo Novo', idadePes: 6, producaoSacas: 380, produtividadeScHa: 24, pontuacaoSCA: 75, custoSaca: 510, status: 'baixa', peneira: '15/16', defeitos: 6.3, tipoBebida: 'Dura', umidade: 11.6, altitude: 1060, ultimaAdubacao: '15/02/2026', phSolo: 5.4 },
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
  sacasEstoque: 620,
  areaProdutiva: 95,
  mediaScHa: 58,
};

// ===== KPI TRENDS (mini sparklines) =====
export const kpiTrends = {
  colheita: [3800, 4100, 4350, 4500, 4680, 4820],
  receita: [3.8, 4.1, 4.5, 4.8, 5.0, 5.18],
  custo: [1.6, 1.7, 1.75, 1.82, 1.88, 1.94],
  margem: [57.9, 58.5, 61.1, 62.1, 62.4, 62.6],
};

// ===== WEATHER =====
export const clima = {
  atual: { temp: 24, condicao: 'Parcialmente Nublado', umidade: 62, vento: 12, previsaoChuva: 15 },
  previsao: [
    { dia: 'Hoje', temp: 24, icone: '⛅', chuva: 15 },
    { dia: 'Qui', temp: 26, icone: '☀️', chuva: 5 },
    { dia: 'Sex', temp: 22, icone: '🌧️', chuva: 80 },
    { dia: 'Sáb', temp: 20, icone: '🌧️', chuva: 70 },
    { dia: 'Dom', temp: 25, icone: '☀️', chuva: 10 },
  ],
};

// ===== CASH FLOW =====
export const cashFlowData = [
  { mes: 'Jan', receita: 0, despesa: 180000, saldo: -180000 },
  { mes: 'Fev', receita: 0, despesa: 160000, saldo: -340000 },
  { mes: 'Mar', receita: 0, despesa: 200000, saldo: -540000 },
  { mes: 'Abr', receita: 0, despesa: 175000, saldo: -715000 },
  { mes: 'Mai', receita: 120000, despesa: 190000, saldo: -785000 },
  { mes: 'Jun', receita: 280000, despesa: 210000, saldo: -715000 },
  { mes: 'Jul', receita: 1800000, despesa: 240000, saldo: 845000 },
  { mes: 'Ago', receita: 1600000, despesa: 220000, saldo: 2225000 },
  { mes: 'Set', receita: 800000, despesa: 140000, saldo: 2885000 },
  { mes: 'Out', receita: 400000, despesa: 100000, saldo: 3185000 },
  { mes: 'Nov', receita: 120000, despesa: 80000, saldo: 3225000 },
  { mes: 'Dez', receita: 64000, despesa: 45000, saldo: 3244000 },
];

// ===== AI ALERTS =====
export const aiAlerts = [
  { id: 1, tipo: 'warning' as const, msg: 'Talhão A3 tem pontuação 84 SCA — separe este lote antes de misturar. Ganho estimado: R$ 128.000', prioridade: 'alta', data: '16/04/2026' },
  { id: 2, tipo: 'danger' as const, msg: 'Talhão B1 com queda de produtividade consistente. Análise de solo recomendada.', prioridade: 'alta', data: '15/04/2026' },
  { id: 3, tipo: 'info' as const, msg: 'Melhor janela de venda histórica: Setembro–Outubro. Considere aguardar.', prioridade: 'media', data: '15/04/2026' },
  { id: 4, tipo: 'warning' as const, msg: 'Previsão de chuva forte para sexta — proteger sacas em terreiro.', prioridade: 'media', data: '16/04/2026' },
  { id: 5, tipo: 'info' as const, msg: 'Estoque de Diesel e Herbicida abaixo do mínimo. Reabastecer em até 7 dias.', prioridade: 'media', data: '14/04/2026' },
];

// ===== NOTIFICATIONS =====
export const notifications = [
  { id: 1, titulo: 'Preço do café subiu', desc: 'Arábica CEPEA atingiu R$ 1.076/sc (+2,3%)', tipo: 'mercado' as const, lida: false, data: '16/04/2026 09:15' },
  { id: 2, titulo: 'Estoque baixo: Herbicida', desc: 'Herbicida Supreme: 340L (mín. 500L)', tipo: 'estoque' as const, lida: false, data: '16/04/2026 08:00' },
  { id: 3, titulo: 'Ordem concluída', desc: 'Adubação Talhão A3 — Carlos Pereira', tipo: 'operacao' as const, lida: true, data: '15/04/2026 17:30' },
  { id: 4, titulo: 'Previsão de chuva', desc: 'Sexta-feira: 80% chance de chuva forte', tipo: 'clima' as const, lida: false, data: '16/04/2026 07:00' },
  { id: 5, titulo: 'Venda registrada', desc: 'Lote A3 Specialty — R$ 480.000', tipo: 'financeiro' as const, lida: true, data: '15/04/2026 14:20' },
];

// ===== HARVESTS =====
export const colheitas = [
  { id: 1, data: '15/07/2025', fazenda: 'Serra Verde', talhao: 'A3', sacas: 1176, metodo: 'Manual', cereja: 72, boia: 18, verde: 10, statusBeneficiamento: 'Concluído', lote: 'SV-A3-2025-01', comprador: 'Exportadora Cerrado' },
  { id: 2, data: '20/07/2025', fazenda: 'Serra Verde', talhao: 'A1', sacas: 780, metodo: 'Mecânico', cereja: 58, boia: 28, verde: 14, statusBeneficiamento: 'Concluído', lote: 'SV-A1-2025-01', comprador: 'Cooperativa Mineira' },
  { id: 3, data: '22/07/2025', fazenda: 'Serra Verde', talhao: 'A2', sacas: 504, metodo: 'Mecânico', cereja: 55, boia: 30, verde: 15, statusBeneficiamento: 'Em andamento', lote: 'SV-A2-2025-01', comprador: '-' },
  { id: 4, data: '01/08/2025', fazenda: 'Boa Vista', talhao: 'B2', sacas: 728, metodo: 'Mecânico', cereja: 52, boia: 32, verde: 16, statusBeneficiamento: 'Concluído', lote: 'BV-B2-2025-01', comprador: 'Cooperativa Mineira' },
  { id: 5, data: '05/08/2025', fazenda: 'Boa Vista', talhao: 'B1', sacas: 410, metodo: 'Manual', cereja: 48, boia: 35, verde: 17, statusBeneficiamento: 'Concluído', lote: 'BV-B1-2025-01', comprador: 'Torrefadora São Paulo' },
  { id: 6, data: '08/08/2025', fazenda: 'Boa Vista', talhao: 'B3', sacas: 342, metodo: 'Manual', cereja: 50, boia: 33, verde: 17, statusBeneficiamento: 'Em andamento', lote: 'BV-B3-2025-01', comprador: '-' },
  { id: 7, data: '12/08/2025', fazenda: 'Recanto Alto', talhao: 'C1', sacas: 440, metodo: 'Manual', cereja: 60, boia: 25, verde: 15, statusBeneficiamento: 'Concluído', lote: 'RA-C1-2025-01', comprador: 'Exportadora Cerrado' },
  { id: 8, data: '18/08/2025', fazenda: 'Recanto Alto', talhao: 'C2', sacas: 380, metodo: 'Mecânico', cereja: 45, boia: 38, verde: 17, statusBeneficiamento: 'Pendente', lote: 'RA-C2-2025-01', comprador: '-' },
];

// ===== FINANCIAL =====
export const despesasBreakdown = [
  { nome: 'Mão de Obra', valor: 38, cor: 'hsl(142 71% 45%)' },
  { nome: 'Insumos', valor: 27, cor: 'hsl(38 92% 50%)' },
  { nome: 'Maquinário', valor: 18, cor: 'hsl(199 89% 48%)' },
  { nome: 'Frete', valor: 9, cor: 'hsl(270 60% 60%)' },
  { nome: 'Outros', valor: 8, cor: 'hsl(220 10% 50%)' },
];

export const transacoes = [
  { id: 1, data: '15/04/2026', descricao: 'Venda lote A3 — Specialty', categoria: 'Venda', fazenda: 'Serra Verde', talhao: 'A3', valor: 480000 },
  { id: 2, data: '12/04/2026', descricao: 'Adubo NPK — Boa Vista', categoria: 'Insumos', fazenda: 'Boa Vista', talhao: '-', valor: -3200 },
  { id: 3, data: '10/04/2026', descricao: 'Pagamento colhedores — Março', categoria: 'Mão de Obra', fazenda: 'Serra Verde', talhao: '-', valor: -24000 },
  { id: 4, data: '08/04/2026', descricao: 'Diesel — abastecimento geral', categoria: 'Maquinário', fazenda: 'Serra Verde', talhao: '-', valor: -4800 },
  { id: 5, data: '05/04/2026', descricao: 'Venda lote B2 — commodity', categoria: 'Venda', fazenda: 'Boa Vista', talhao: 'B2', valor: 320000 },
  { id: 6, data: '01/04/2026', descricao: 'Frete — transporte Santos', categoria: 'Frete', fazenda: 'Serra Verde', talhao: '-', valor: -12000 },
  { id: 7, data: '28/03/2026', descricao: 'Herbicida Supreme — 200L', categoria: 'Insumos', fazenda: 'Recanto Alto', talhao: '-', valor: -6400 },
  { id: 8, data: '25/03/2026', descricao: 'Manutenção trator John Deere', categoria: 'Maquinário', fazenda: 'Serra Verde', talhao: '-', valor: -8500 },
  { id: 9, data: '22/03/2026', descricao: 'Venda lote C1 — direct trade', categoria: 'Venda', fazenda: 'Recanto Alto', talhao: 'C1', valor: 198000 },
  { id: 10, data: '20/03/2026', descricao: 'Calcário Dolomítico — 5 ton', categoria: 'Insumos', fazenda: 'Boa Vista', talhao: '-', valor: -4200 },
];

export const despesasMensais = [
  { mes: 'Jan', maoObra: 68400, insumos: 48600, maquinario: 32400, frete: 16200, outros: 14400 },
  { mes: 'Fev', maoObra: 60800, insumos: 43200, maquinario: 28800, frete: 14400, outros: 12800 },
  { mes: 'Mar', maoObra: 76000, insumos: 54000, maquinario: 36000, frete: 18000, outros: 16000 },
  { mes: 'Abr', maoObra: 66500, insumos: 47250, maquinario: 31500, frete: 15750, outros: 14000 },
  { mes: 'Mai', maoObra: 72200, insumos: 51300, maquinario: 34200, frete: 17100, outros: 15200 },
  { mes: 'Jun', maoObra: 79800, insumos: 56700, maquinario: 37800, frete: 18900, outros: 16800 },
  { mes: 'Jul', maoObra: 91200, insumos: 64800, maquinario: 43200, frete: 21600, outros: 19200 },
  { mes: 'Ago', maoObra: 83600, insumos: 59400, maquinario: 39600, frete: 19800, outros: 17600 },
  { mes: 'Set', maoObra: 53200, insumos: 37800, maquinario: 25200, frete: 12600, outros: 11200 },
  { mes: 'Out', maoObra: 38000, insumos: 27000, maquinario: 18000, frete: 9000, outros: 8000 },
  { mes: 'Nov', maoObra: 30400, insumos: 21600, maquinario: 14400, frete: 7200, outros: 6400 },
  { mes: 'Dez', maoObra: 17100, insumos: 12150, maquinario: 8100, frete: 4050, outros: 3600 },
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
  { nome: 'Fazenda São Lucas', regiao: 'Patrocínio, MG', produtividade: '48 sc/ha', presenca: 'Instagram, Site', precoMedio: 'R$ 1.020/sc', obs: 'Foco em commodity', risco: 'baixo' },
  { nome: 'Cooperativa Cerrado', regiao: 'Araguari, MG', produtividade: '55 sc/ha', presenca: 'Site, Marketplace', precoMedio: 'R$ 1.090/sc', obs: 'Volume alto, marca forte', risco: 'medio' },
  { nome: 'Sítio das Pedras', regiao: 'Monte Carmelo, MG', produtividade: '62 sc/ha', presenca: 'Instagram', precoMedio: 'R$ 1.340/sc', obs: 'Micro-lote specialty', risco: 'alto' },
  { nome: 'Agro Meireles', regiao: 'Campos Altos, MG', produtividade: '44 sc/ha', presenca: 'Nenhuma', precoMedio: 'R$ 960/sc', obs: 'Operação tradicional', risco: 'baixo' },
];

// ===== WORKERS =====
export const trabalhadores = [
  { id: 1, nome: 'Carlos Pereira', tipo: 'Fixo', fazenda: 'Serra Verde', funcao: 'Encarregado', custoMes: 3800, telefone: '(34) 99812-3456', admissao: '15/03/2020' },
  { id: 2, nome: 'Maria dos Santos', tipo: 'Safrista', fazenda: 'Boa Vista', funcao: 'Colhedora', custoMes: 1900, telefone: '(34) 99834-7890', admissao: '01/06/2025' },
  { id: 3, nome: 'José Oliveira', tipo: 'Fixo', fazenda: 'Serra Verde', funcao: 'Tratorista', custoMes: 3200, telefone: '(34) 99856-1234', admissao: '20/01/2021' },
  { id: 4, nome: 'Ana Silva', tipo: 'Safrista', fazenda: 'Recanto Alto', funcao: 'Colhedora', custoMes: 1900, telefone: '(34) 99878-5678', admissao: '15/06/2025' },
  { id: 5, nome: 'Pedro Alves', tipo: 'Fixo', fazenda: 'Boa Vista', funcao: 'Irrigação', custoMes: 2800, telefone: '(34) 99890-9012', admissao: '10/08/2022' },
  { id: 6, nome: 'Luciana Costa', tipo: 'Safrista', fazenda: 'Serra Verde', funcao: 'Colhedora', custoMes: 1900, telefone: '(34) 99801-3456', admissao: '01/06/2025' },
  { id: 7, nome: 'Roberto Ferreira', tipo: 'Fixo', fazenda: 'Recanto Alto', funcao: 'Encarregado', custoMes: 3500, telefone: '(34) 99823-7890', admissao: '01/02/2023' },
  { id: 8, nome: 'Fernanda Lima', tipo: 'Fixo', fazenda: 'Serra Verde', funcao: 'Administrativa', custoMes: 3000, telefone: '(34) 99845-1234', admissao: '15/09/2021' },
];

export const ordensServico = [
  { id: 1, data: '14/04/2026', talhao: 'A3', servico: 'Adubação', responsavel: 'Carlos Pereira', status: 'Concluído', fazenda: 'Serra Verde', custo: 4200 },
  { id: 2, data: '13/04/2026', talhao: 'B2', servico: 'Capina', responsavel: 'Pedro Alves', status: 'Em andamento', fazenda: 'Boa Vista', custo: 1800 },
  { id: 3, data: '12/04/2026', talhao: 'C1', servico: 'Poda', responsavel: 'Roberto Ferreira', status: 'Concluído', fazenda: 'Recanto Alto', custo: 3100 },
  { id: 4, data: '10/04/2026', talhao: 'A1', servico: 'Irrigação', responsavel: 'José Oliveira', status: 'Em andamento', fazenda: 'Serra Verde', custo: 2400 },
  { id: 5, data: '08/04/2026', talhao: 'B1', servico: 'Análise de Solo', responsavel: 'Carlos Pereira', status: 'Pendente', fazenda: 'Boa Vista', custo: 850 },
  { id: 6, data: '06/04/2026', talhao: 'A2', servico: 'Pulverização', responsavel: 'José Oliveira', status: 'Concluído', fazenda: 'Serra Verde', custo: 3600 },
  { id: 7, data: '04/04/2026', talhao: 'C2', servico: 'Adubação Foliar', responsavel: 'Roberto Ferreira', status: 'Concluído', fazenda: 'Recanto Alto', custo: 2200 },
];

export const estoque = [
  { nome: 'Adubo NPK 20-05-20', quantidade: 2400, unidade: 'kg', minimo: 1000, alerta: false, precoUnit: 4.80, ultimaCompra: '01/03/2026' },
  { nome: 'Herbicida Supreme', quantidade: 340, unidade: 'L', minimo: 500, alerta: true, precoUnit: 32.00, ultimaCompra: '28/03/2026' },
  { nome: 'Diesel', quantidade: 800, unidade: 'L', minimo: 1000, alerta: true, precoUnit: 6.20, ultimaCompra: '08/04/2026' },
  { nome: 'Calcário Dolomítico', quantidade: 5000, unidade: 'kg', minimo: 2000, alerta: false, precoUnit: 0.84, ultimaCompra: '20/03/2026' },
  { nome: 'Fungicida Opera', quantidade: 120, unidade: 'L', minimo: 100, alerta: false, precoUnit: 78.50, ultimaCompra: '15/03/2026' },
  { nome: 'Adubo Foliar Zinco', quantidade: 45, unidade: 'L', minimo: 50, alerta: true, precoUnit: 45.00, ultimaCompra: '10/03/2026' },
];

export const diarioCampo = [
  { data: '16/04/2026', talhao: 'A3', nota: 'Colheita finalizada do setor oeste. Qualidade visual excelente — lote separado para análise SCA.', autor: 'Carlos Pereira' },
  { data: '14/04/2026', talhao: 'B2', nota: 'Sinal de bicho-mineiro no setor norte. Monitorar nos próximos 7 dias.', autor: 'Pedro Alves' },
  { data: '12/04/2026', talhao: 'A3', nota: 'Irrigação ajustada — solo estava muito seco no setor leste.', autor: 'José Oliveira' },
  { data: '10/04/2026', talhao: 'C1', nota: 'Poda de formação concluída. Plantas respondendo bem.', autor: 'Roberto Ferreira' },
  { data: '08/04/2026', talhao: 'A1', nota: 'Aplicação de adubo foliar realizada. Cobertura uniforme.', autor: 'Carlos Pereira' },
  { data: '05/04/2026', talhao: 'B1', nota: 'Ferrugem detectada em 15% das plantas. Aplicação de fungicida agendada.', autor: 'Pedro Alves' },
  { data: '03/04/2026', talhao: 'C2', nota: 'Adubação de cobertura realizada. Solo úmido, condições ideais.', autor: 'Roberto Ferreira' },
  { data: '01/04/2026', talhao: 'A4', nota: 'Mudas de renovação apresentando bom pegamento — 92% de taxa.', autor: 'Carlos Pereira' },
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

// ===== PRODUCTIVITY RANKING =====
export const rankingProdutividade = fazendas
  .flatMap(f => f.talhoes.filter(t => t.status !== 'renovacao').map(t => ({
    talhao: t.nome,
    fazenda: f.nome.replace('Fazenda ', ''),
    scHa: t.produtividadeScHa,
    sca: t.pontuacaoSCA,
    custo: t.custoSaca,
    variedade: t.variedade,
  })))
  .sort((a, b) => b.scHa - a.scHa);

// ===== SOIL ANALYSIS =====
export const analiseSolo = [
  { talhao: 'A1', ph: 5.8, materiaOrganica: 3.2, fosforo: 12, potassio: 145, calcio: 3.8, magnesio: 1.2, aluminio: 0.1, ctc: 8.4, saturacaoBases: 68 },
  { talhao: 'A2', ph: 5.6, materiaOrganica: 2.8, fosforo: 9, potassio: 120, calcio: 3.2, magnesio: 1.0, aluminio: 0.2, ctc: 7.8, saturacaoBases: 62 },
  { talhao: 'A3', ph: 6.1, materiaOrganica: 4.1, fosforo: 18, potassio: 180, calcio: 4.5, magnesio: 1.5, aluminio: 0.0, ctc: 9.2, saturacaoBases: 75 },
  { talhao: 'B1', ph: 5.2, materiaOrganica: 2.1, fosforo: 6, potassio: 90, calcio: 2.4, magnesio: 0.8, aluminio: 0.4, ctc: 6.5, saturacaoBases: 48 },
  { talhao: 'B2', ph: 5.5, materiaOrganica: 2.9, fosforo: 10, potassio: 130, calcio: 3.0, magnesio: 1.1, aluminio: 0.2, ctc: 7.5, saturacaoBases: 60 },
  { talhao: 'B3', ph: 5.3, materiaOrganica: 2.4, fosforo: 7, potassio: 100, calcio: 2.6, magnesio: 0.9, aluminio: 0.3, ctc: 6.8, saturacaoBases: 52 },
  { talhao: 'C1', ph: 5.9, materiaOrganica: 3.5, fosforo: 14, potassio: 160, calcio: 4.0, magnesio: 1.3, aluminio: 0.1, ctc: 8.8, saturacaoBases: 70 },
  { talhao: 'C2', ph: 5.4, materiaOrganica: 2.6, fosforo: 8, potassio: 110, calcio: 2.8, magnesio: 1.0, aluminio: 0.3, ctc: 7.2, saturacaoBases: 55 },
];

// ===== ACTIVITY TIMELINE =====
export const atividadesRecentes = [
  { id: 1, tipo: 'colheita', desc: 'Colheita Talhão A3 finalizada — 1.176 sacas', data: '16/04/2026 14:30', fazenda: 'Serra Verde' },
  { id: 2, tipo: 'financeiro', desc: 'Venda lote A3 Specialty — R$ 480.000', data: '15/04/2026 16:00', fazenda: 'Serra Verde' },
  { id: 3, tipo: 'operacao', desc: 'Adubação Talhão A3 concluída', data: '14/04/2026 11:00', fazenda: 'Serra Verde' },
  { id: 4, tipo: 'alerta', desc: 'Bicho-mineiro detectado no Talhão B2', data: '14/04/2026 09:15', fazenda: 'Boa Vista' },
  { id: 5, tipo: 'financeiro', desc: 'Compra de adubo NPK — R$ 3.200', data: '12/04/2026 10:30', fazenda: 'Boa Vista' },
  { id: 6, tipo: 'operacao', desc: 'Poda de formação Talhão C1', data: '12/04/2026 08:00', fazenda: 'Recanto Alto' },
];
