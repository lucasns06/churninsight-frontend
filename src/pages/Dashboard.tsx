import { ChartBarIcon, ArrowTrendingDownIcon, ExclamationTriangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";
import CustomContentOfTooltip from "../components/CustomContentOfTooltip";
import { useEffect, useState } from "react";
import api from "../services/Api";

type NivelRiscoType = "BAIXO" | "MÉDIO" | "ALTO";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [total, setTotal] = useState(0);
    const [taxaChurn, setTaxaChurn] = useState(0);
    const [risco, setRisco] = useState({
        BAIXO: 0,
        MÉDIO: 0,
        ALTO: 0
    });
    const [fatores, setFatores] = useState<Topfatores[]>([]);
    const estatisticaCard = [
        { id: 1, titulo: "Total avaliados", metrica: total, icone: UserCircleIcon, corIcone: "bg-blue-500/30 text-blue-500" },
        { id: 2, titulo: "Taxa Risco de Churn", metrica: taxaChurn, icone: ArrowTrendingDownIcon, corIcone: "bg-red-500/30 text-red-500" },
        { id: 3, titulo: "Clientes em Risco", metrica: risco.ALTO, icone: ExclamationTriangleIcon, corIcone: "bg-red-500/30 text-red-500" }
    ]
    const riskDistribution = [
        { name: "Vai continuar", value: risco.BAIXO, color: "#628ff0" },
        { name: "Vai cancelar", value: risco.ALTO, color: "#f06262" }
    ]
    interface GraficoItem {
        nivelRisco: NivelRiscoType;
        quantidade: number;
    }
    interface Topfatores {
        fator: string;
        total: number;
    }
    interface Estatistica {
        total: number;
        taxaChurn: number;
    }


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
                setTaxaChurn(totalRes.data.taxaChurn);
                setFatores(fatoresRes.data);

                const novo: Record<NivelRiscoType, number> = { BAIXO: 0, MÉDIO: 0, ALTO: 0 };
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
                <div role="status" className="flex flex-col items-center justify-center">
                    <svg aria-hidden="true" className="w-80 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#0000001e" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#155dfc" />
                    </svg>
                    <p className="text-4xl mt-4 text-gray-700 text-center">Carregando Dashboard...</p>
                </div>
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
        <div className="tela px-6 py-8 text-center ">
            {/* <h3 className="text-2xl text-red-500 mb-6">Os dados por enquanto não são reais!!</h3> */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/30 text-primary-foreground mb-6 border border-blue-500/40">
                <ChartBarIcon className="w-4 h-4 text-blue-700" />
                <span className="text-sm font-medium text-blue-700">Dashboard Analítico</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Visão Geral do Churn</h1>
            <h2 className="text-3xl">Acompanhe metricas em tempo real</h2>

            <div className="flex flex-wrap justify-center mt-4">
                {estatisticaCard.map((card) => {
                    return (
                        <div key={card.id} className="bg-white p-4 m-4 flex rounded-md border border-gray-400/50 items-center text-2xl shadow-md">
                            <div>
                                {card.titulo}
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