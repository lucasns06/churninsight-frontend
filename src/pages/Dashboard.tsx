import { ChartBarIcon, ArrowTrendingDownIcon, ExclamationTriangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { GraficoBarra, GraficoPizza } from "../components/Graficos";
import { useCallback, useEffect, useState } from "react";
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
        { id: 1, titulo: "Total avaliados", metrica: total, icone: UserCircleIcon, corIcone: "from-blue-500 to-blue-600 text-white" },
        { id: 2, titulo: "Taxa Risco de Churn", metrica: taxaChurn + "%", icone: ArrowTrendingDownIcon, corIcone: "from-red-500 to-orange-500 text-white" },
        { id: 3, titulo: "Clientes em Risco", metrica: risco.ALTO, icone: ExclamationTriangleIcon, corIcone: "from-amber-500 to-red-500 text-white" }
    ]

    const riskDistribution = [
        { name: "Vai continuar", value: risco.BAIXO, color: "#3b82f6", },
        { name: "Vai cancelar", value: risco.ALTO, color: "#ef4444", }
    ]
    const [refreshing, setRefreshing] = useState(false);

    const carregarDashboard = useCallback(async () => {
        try {
            setLoading(true);

            const [totalRes, graficoRes, fatoresRes] = await Promise.all([
                api.get<Estatistica>('/api/previsao/estatisticas'),
                api.get<GraficoItem[]>('/api/previsao/obterGrafico'),
                api.get<Topfatores[]>('/api/previsao/top3Fatores')
            ]);

            setTotal(totalRes.data.total);
            setTaxaChurn(totalRes.data.taxaChurn * 100);
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
    }, []);

    const handleManualRefresh = async () => {
        setRefreshing(true);
        await carregarDashboard();
        setRefreshing(false);
    };
    useEffect(() => {
        carregarDashboard();
    }, []);

    if (loading) {
        return (
            <div className="tela flex-1 flex items-center justify-center">
                <Loading nome="Dashboard" />
            </div>
        );
    }
    if (total == 0) {
        return (
            <div className="tela flex-1 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl text-red-500 mb-2">
                    Não foi possível carregar o dashboard
                </h2>
                <p className="text-gray-600">
                    Não há previões para analisar
                </p>
            </div>
        )
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
        <div className="min-h-[calc(100dvh-64px)] px-6 py-8 text-center ">
            <div className="absolute top-20 right-8 z-10">
                <button
                    onClick={handleManualRefresh}
                    disabled={refreshing}
                    className={`
            group flex items-center gap-2 px-4 py-2 rounded-full sm:rounded-xl 
            bg-linear-to-b from-white to-gray-50
            border border-white shadow-md ring-1 ring-gray-200/50
            transition-all hover:shadow-lg active:scale-95 disabled:opacity-70 hover:cursor-pointer w-12 sm:w-full overflow-hidden
        `}
                >
                    <div className={`transition-transform duration-700 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180'}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 text-blue-600"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider hidden sm:block">
                        {refreshing ? 'Atualizando...' : 'Atualizar Dados'}
                    </span>
                </button>
            </div>
            <div className="hidden md:inline-flex md:absolute md:top-22 md:left-8 items-center gap-2 px-4 py-2 rounded-full bg-blue-500/30 text-primary-foreground mb-6 border border-blue-500/40">
                <ChartBarIcon className="w-4 h-4 text-blue-700" />
                <span className="text-sm font-medium text-blue-700">Dashboard Analítico</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Visão Geral do Churn</h1>
            <h2 className="text-xl text-gray-700">Acompanhe <span className="text-blue-500">métricas</span> em tempo real</h2>

            <div>
                <div className="flex flex-wrap justify-center mt-4">
                    {estatisticaCard.map((card) => {
                        return (
                            <div key={card.id} className="bg-white p-4 my-4 w-full justify-between md:m-4 md:w-max flex text-left rounded-xl border gap-6 border-gray-200/80 items-start text-2xl shadow-sm hover:shadow-md transition-all">
                                <div>
                                    <p className="text-gray-600 text-xl">{card.titulo}</p>
                                    <p className="font-bold text-4xl">{card.metrica}</p>
                                </div>
                                <div className={`p-2.5 rounded-xl bg-linear-to-br shadow-md ${card.corIcone}`}>
                                    <card.icone className="w-6 h-6" />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-wrap-reverse justify-center gap-4 mt-4">
                    <div className="bg-white p-4 w-2xl text-left rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
                        <h1 className="text-2xl font-bold">Explicabilidade</h1>
                        <h2 className="text-xl text-gray-600 mb-2">Variáveis que mais influenciam o cancelamento</h2>
                        {!fatores || fatores.length === 0 ? (
                            <div className="flex justify-center items-center h-[90%]">Insira clientes em risco para aparecer o gráfico</div>
                        ) : (
                            <GraficoBarra data={fatores} />
                        )}

                    </div>
                    <div className="bg-white text-left p-4 w-2xl rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
                        <h1 className="text-2xl font-bold">Distribuição</h1>
                        <h2 className="text-xl text-gray-600 mb-2">Quantidade de clientes por churn</h2>
                        <div className="h-75">
                            <GraficoPizza data={riskDistribution} />
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
        </div >
    );
}
export default Dashboard;