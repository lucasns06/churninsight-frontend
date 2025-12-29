import { ArrowTrendingDownIcon, ChartBarIcon, ExclamationTriangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell } from "recharts";

const estatisticaCard = [
    {
        id: 1,
        titulo: "Total avaliados",
        metrica: 750,
        icone: UserCircleIcon,
        corIcone: "bg-blue-500/30 text-blue-500"
    },
    {
        id: 2,
        titulo: "Taxa de Churn",
        metrica: 23 + "%",
        icone: ArrowTrendingDownIcon,
        corIcone: "bg-red-500/30 text-red-500"
    },
    {
        id: 3,
        titulo: "Clientes em Risco",
        metrica: 120,
        icone: ExclamationTriangleIcon,
        corIcone: "bg-red-500/30 text-red-500"
    }
]

const riskDistribution = [
    { name: "Baixo Risco", value: 450, color: "#628ff0" },
    { name: "Médio Risco", value: 180, color: "gray" },
    { name: "Alto Risco", value: 120, color: "#f06262" },
];

const Dashboard = () => {
    return (
        <div className="tela px-6 py-8 text-center">
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
                    <h1 className="text-4xl font-bold">Nivel de risco por idade</h1>
                    <h2 className="text-2xl">Quantidade de nivel de risco por idade</h2>

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
        </div>
    );
}
export default Dashboard;