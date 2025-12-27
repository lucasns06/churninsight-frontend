import { Link } from "react-router-dom";
import ParticlesBackground from "../components/ParticlesBackground";
import { ArrowTrendingUpIcon } from "@heroicons/react/16/solid";

export default function Hero() {
    return (
        <div className="bg-image flex items-center justify-center relative overflow-hidden">
            <ParticlesBackground />
            <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_60%)]"
            />
            <div className="mx-auto max-w-4xl px-6 py-16">
                <div className="relative isolate overflow-hidden backdrop-blur-sm rounded-3xl px-8 py-14 flex flex-col text-center justify-center items-center ">

                    {/* <h1 className="w-fit font-bold text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-6 bg-linear-to-r from-[#0077FF] to-[#39EA29] bg-clip-text text-transparent ">
                        CHURN INSIGHT
                    </h1> */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/25  text-primary-foreground mb-6 border border-blue-600/30">
                        <ArrowTrendingUpIcon className="w-4 h-4 text-white" />
                        <span className="text-sm font-medium text-white">Previsão de Churn</span>
                    </div>
                    <h1 className="w-fit font-bold text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xlfont-semibold tracking-tight text-white">
                        Preveja Cancelamentos e <span className="bg-linear-to-r from-[#0077FF] to-[#39EA29] bg-clip-text text-transparent">Retenha Mais Clientes</span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl text-gray-300">
                        Identifique clientes com alto risco de cancelamento usando dados de comportamento e histórico de uso, permitindo ações de retenção antes que seja tarde.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/previsao"
                            className="rounded-md bg-linear-to-r from-[#0077FF] to-[#39EA29] px-4 py-2.5 text-xl font-semibold text-white hover:scale-110 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Fazer previsão
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
