import { ChartBarIcon, ArrowTrendingDownIcon, ExclamationTriangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";
import CustomContentOfTooltip from "../components/CustomContentOfTooltip";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Estatistica, GraficoItem, NivelRiscoType, Topfatores } from "../@types/dashboard";
import Loading from "../components/layout/Loading";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [total, setTotal] = useState(0);
    const [taxaChurn, setTaxaChurn] = useState(0);
    const [risco, setRisco] = useState({
        BAIXO: 0,
        ALTO: 0
    });
    const [fatores, setFatores] = useState<Topfatores[]>([]);
    const estatisticaCard = [
        { id: 1, titulo: "Total avaliados", metrica: total, icone: UserCircleIcon, corIcone: "bg-blue-500/30 text-blue-500" },
        { id: 2, titulo: "Taxa Risco de Churn", metrica: taxaChurn + "%", icone: ArrowTrendingDownIcon, corIcone: "bg-red-500/30 text-red-500" },
        { id: 3, titulo: "Clientes em Risco", metrica: risco.ALTO, icone: ExclamationTriangleIcon, corIcone: "bg-red-500/30 text-red-500" }
    ]
    const riskDistribution = [
        { name: "Vai continuar", value: risco.BAIXO, color: "#628ff0" },
        { name: "Vai cancelar", value: risco.ALTO, color: "#f06262" }
    ]

    useEffect(() => {
        const carregarDashboard = async () => {
            try {
                setLoading(true);

                const [totalRes, graficoRes, fatoresRes] = await Promise.all([
                    api.get<Estatistica>('/api/previsao/estatisticas'),
                    api.get<GraficoItem[]>('/api/previsao/obterGrafico'),
                    api.get<Topfatores[]>('/api/previsao/top3Fatores')
                ]);

                setTotal(totalRes.data.total);
                const taxaChurnAntes = totalRes.data.taxaChurn;
                const taxaChurnFormatada = taxaChurnAntes*100;
                setTaxaChurn(taxaChurnFormatada);
                setFatores(fatoresRes.data);

                const novo: Record<NivelRiscoType, number> = { BAIXO: 0, ALTO: 0 };
                graficoRes.data.forEach(item => {
                    novo[item.nivelRisco] = item.quantidade;
                });
                setRisco(novo);

            } catch (error) {
                console.error("Erro ao carregar dashboard:", error);
                setErro(true);
            } finally {
                setLoading(false);
            }
        };

        carregarDashboard();
    }, []);

    if (loading) {
        return (
            <div className="tela flex-1 flex items-center justify-center">
                <Loading nome="Dashboard" />
            </div>
        );
    }

    if (erro) {
        return (
            <div className="tela flex-1 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl text-red-500 mb-2">
                    Não foi possível carregar o dashboard
                </h2>
                <p className="text-gray-600">
                    Verifique se o servidor está online e tente novamente.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100dvh-64px)] bg-[#eef1fd] px-6 py-8 text-center ">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/30 text-primary-foreground mb-6 border border-blue-500/40">
                <ChartBarIcon className="w-4 h-4 text-blue-700" />
                <span className="text-sm font-medium text-blue-700">Dashboard Analítico</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Visão Geral do Churn</h1>
            <h2 className="text-3xl">Acompanhe métricas em tempo real</h2>

            <div className="flex flex-wrap justify-center mt-4">
                {estatisticaCard.map((card) => {
                    return (
                        <div key={card.id} className="bg-white p-4 m-4 flex rounded-md border border-gray-400/50 items-center text-2xl shadow-md">
                            <div>
                                <p className="text-gray-600">{card.titulo}</p>
                                <p className="font-bold text-4xl">{card.metrica}</p>
                            </div>
                            <card.icone className={`w-12 ml-8 rounded-full ${card.corIcone}`} />
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-wrap-reverse justify-center gap-4 mt-4">
                <div className="bg-white p-4 w-2xl rounded-md border border-gray-400/50 shadow-md">
                    <h1 className="text-4xl font-bold">Explicabilidade</h1>
                    <h2 className="text-2xl">As 3 features mais impactantes</h2>
                    <CustomContentOfTooltip data={fatores} />
                </div>
                <div className="bg-white p-4 w-2xl rounded-md border border-gray-400/50 shadow-md">
                    <h1 className="text-4xl font-bold">Distribuição por Churn</h1>
                    <h2 className="text-2xl">Quantidade de clientes por churn</h2>
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
                                        border: "1px solid gray",
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