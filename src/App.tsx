import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import MapaFazendas from "./pages/MapaFazendas";
import ColheitaQualidade from "./pages/ColheitaQualidade";
import Financeiro from "./pages/Financeiro";
import IAAgrono from "./pages/IAAgrono";
import Mercado from "./pages/Mercado";
import Operacoes from "./pages/Operacoes";
import WhatsAppIA from "./pages/WhatsAppIA";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mapa" element={<MapaFazendas />} />
          <Route path="/colheita" element={<ColheitaQualidade />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/ia" element={<IAAgrono />} />
          <Route path="/mercado" element={<Mercado />} />
          <Route path="/operacoes" element={<Operacoes />} />
          <Route path="/whatsapp" element={<WhatsAppIA />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
