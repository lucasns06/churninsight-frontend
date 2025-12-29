import { ChartBarIcon } from "@heroicons/react/24/outline";
import { Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, BarChart } from "recharts";
import { estatisticaCard, riskDistribution} from "../components/graficosData";
import CustomContentOfTooltip from "../components/CustomContentOfTooltip";


const Dashboard = () => {
    return (
        <div className="tela px-6 py-8 text-center">
            <h3 className="text-2xl text-red-500 mb-6">Os dados por enquanto não são reais!!</h3>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/30 text-primary-foreground mb-6 border border-blue-500/40">
                <ChartBarIcon className="w-4 h-4 text-blue-700" />
                <span className="text-sm font-medium text-blue-700">Dashboard Analítico</span>
            </div>

            <h1 className="text-4xl font-bold mb-2">Visão Geral do Churn</h1>
            <h2 className="text-3xl">Acompanhe metricas em tempo real</h2>

            <div className="flex flex-wrap justify-center mt-4">
                {estatisticaCard.map((card) => {
                    return (
                        <div className="bg-white p-4 m-4 flex rounded-md border border-gray-400/50 items-center text-2xl shadow-md">
                            <div>
                                {card.titulo}
                                <p className="font-bold text-4xl">{card.metrica}</p>
                            </div>
                            <card.icone className={`w-12 ml-8 rounded-full ${card.corIcone}`} />
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                <div className="bg-white p-4 w-2xl rounded-md border border-gray-400/50 shadow-md">
                    <h1 className="text-4xl font-bold">Probabilidade por Perfil</h1>
                    <h2 className="text-2xl">Probabilidade de churn por perfil</h2>
                    <CustomContentOfTooltip/>
                </div>
                <div className="bg-white p-4 w-2xl rounded-md border border-gray-400/50 shadow-md">
                    <h1 className="text-4xl font-bold">Distribuição por Risco</h1>
                    <h2 className="text-2xl">Quantidade de clientes por nivel de risco</h2>
                    <div className="h-75">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie
                                    data={riskDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={{ fontSize: 22 }}
                                >
                                    {riskDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#FFFFFF",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "8px",
                                    }}
                                />
                            </RechartsPie>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4 ">
                        {riskDistribution.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm text-muted-foreground">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Dashboard;