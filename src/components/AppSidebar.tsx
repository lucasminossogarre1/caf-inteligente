import {
  LayoutDashboard, Map, Wheat, DollarSign, Bot, TrendingUp,
  Wrench, MessageCircle, Settings
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Mapa das Fazendas", url: "/mapa", icon: Map },
  { title: "Colheita & Qualidade", url: "/colheita", icon: Wheat },
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "IA Agrônoma", url: "/ia", icon: Bot },
  { title: "Mercado", url: "/mercado", icon: TrendingUp },
  { title: "Operações", url: "/operacoes", icon: Wrench },
  { title: "WhatsApp IA", url: "/whatsapp", icon: MessageCircle },
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4 flex items-center gap-2.5">
          <div
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, hsl(38 92% 50% / 0.2), hsl(20 18% 13%))',
              border: '1px solid hsl(38 92% 50% / 0.35)',
              boxShadow: '0 0 12px hsl(38 92% 50% / 0.12)',
            }}
          >
            <CoffeeBeanLogo />
          </div>
          {!collapsed && (
            <span
              className="text-lg font-bold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, hsl(38 92% 65%), hsl(38 92% 50%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              CaféMap
            </span>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/50 transition-colors"
                      activeClassName="bg-sidebar-accent text-accent font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function CoffeeBeanLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="10" cy="10" rx="6.5" ry="8" stroke="hsl(38, 92%, 55%)" strokeWidth="1.4" fill="hsl(38, 92%, 50%, 0.06)" />
      <path d="M10 3 C8.2 5.5 8.2 10 10 12.5 C8.2 12.5 8.2 15 10 17" stroke="hsl(38, 92%, 55%)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M10 3 C11.8 5.5 11.8 10 10 12.5 C11.8 12.5 11.8 15 10 17" stroke="hsl(38, 92%, 55%)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    </svg>
  );
}
