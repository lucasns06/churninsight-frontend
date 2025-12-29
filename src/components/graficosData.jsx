import { ArrowTrendingDownIcon, ExclamationTriangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export const estatisticaCard = [
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

export const riskDistribution = [
    { name: "Baixo Risco", value: 450, color: "#628ff0" },
    { name: "Médio Risco", value: 180, color: "gray" },
    { name: "Alto Risco", value: 120, color: "#f06262" },
]