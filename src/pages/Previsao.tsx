import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ArrowTrendingUpIcon, ChevronDownIcon, ClockIcon, CreditCardIcon, CurrencyDollarIcon, GlobeAltIcon, UserIcon } from '@heroicons/react/16/solid'
import api from '../services/Api';
import { CalendarDateRangeIcon } from '@heroicons/react/16/solid';

const Previsao = () => {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(false);
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState('');
    const [pais, setPais] = useState('');
    const [paises, setPaises] = useState<Dominio[]>([]);
    const [generos, setGeneros] = useState<Dominio[]>([]);
    const [sexo, setSexo] = useState('');
    const [idade, setIdade] = useState('');
    const [tempoTrabalho, setTempoTrabalho] = useState('');
    const [saldo, setSaldo] = useState('');
    const [salarioEstimado, setSalarioEstimado] = useState('');
    const [previsao, setPrevisao] = useState('');
    const [probabilidade, setProbabilidade] = useState('');
    const [nivelRisco, setNivelRisco] = useState('');

    const probabilidadeFormatada = (parseFloat(probabilidade) * 100).toFixed(2) + '%';

    interface Dominio {
        id: number;
        value: string;
        label: string;
    }

    useEffect(() => {
        api.get('/dominios/paises')
            .then(response => {
                const fetchedPaises = response.data.dados;
                setPaises(fetchedPaises);

            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
        api.get('/dominios/generos')
            .then(response => {
                const fetchedGeneros = response.data.dados;
                setGeneros(fetchedGeneros);

            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    }, [])

    async function prever() {
        setLoading(true);
        api.post('/api/previsao', {
            CreditScore: score,
            Geography: pais,
            Gender: sexo,
            Age: idade,
            Tenure: tempoTrabalho,
            Balance: saldo,
            EstimatedSalary: salarioEstimado
        })
            .then(function (response) {
                setPrevisao(response.data.previsao);
                setNivelRisco(response.data.nivel_risco);
                setProbabilidade(response.data.probabilidade);
            })
            .catch(function (error) {
                console.log(error.response?.data);
                console.log(error.response?.status);
                setErro(true);
            })
            .finally(function () {
                setLoading(false);
            });

    }
    async function voltar() {
        setOpen(false);
        setTimeout(() => {
            setErro(false);
        }, 500);
    }
    return (
        <div className="tela flex flex-col justify-center items-center px-2 py-8 sm:py-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/30 text-primary-foreground mb-6 border border-blue-500/40">
                <ArrowTrendingUpIcon className="w-4 h-4 text-blue-700" />
                <span className="text-sm font-medium text-blue-700">Previsão de Churn</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-xl">
                <h1 className='text-3xl'>Dados do Cliente</h1>
                <h1 className='text-base mb-4'>Insira as informações para realizar a análise preditiva</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        setOpen(true)
                        prever()
                    }}
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full'>
                        <div className='w-full'>
                            <div className="mb-6">
                                <div className='flex items-center'>
                                    <CreditCardIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label className="text-sm font-medium text-heading">Score de crédito</label>
                                </div>
                                <input step={1} min={350} max={1000} value={score} onChange={(e) => setScore(e.target.value)} type="number" placeholder='Score de crédito' className="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-green-400 shadow-sm sm:text-sm/6 mt-2" required />
                            </div>
                            <div className="mb-6 sm:col-span-3">
                                <div className='flex items-center'>
                                    <GlobeAltIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4 "
                                    />
                                    <label htmlFor="pais" className="text-sm font-medium text-heading text-black">
                                        País
                                    </label>
                                </div>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                        id="pais"
                                        name="pais"
                                        value={pais}
                                        onChange={(e) => setPais(e.target.value)}
                                        autoComplete="pais-name"
                                        required
                                        className="border border-default-medium col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-black outline-1 -outline-offset-1 outline-white/10 *:bg-white focus:outline-2 focus:-outline-offset-2 focus:outline-green-400 shadow-sm sm:text-sm/6"
                                    >
                                        <option value="" disabled hidden></option>
                                        {paises.map((p) => (
                                            <option key={p.id} value={p.value}>
                                                {p.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-4"
                                    />
                                </div>
                            </div>
                            <div className="mb-6 sm:col-span-3">
                                <div className='flex items-center'>
                                    <UserIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label htmlFor="sexo" className="text-sm font-medium text-heading text-black">
                                        Sexo
                                    </label>
                                </div>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                        id="sexo"
                                        name="sexo"
                                        value={sexo}
                                        onChange={(e) => setSexo(e.target.value)}
                                        autoComplete="sexo-name"
                                        required
                                        className="border border-default-medium col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-black outline-1 -outline-offset-1 outline-white/10 *:bg-white focus:outline-2 focus:-outline-offset-2 focus:outline-green-400 shadow-sm sm:text-sm/6"
                                    >
                                        <option value="" disabled hidden></option>
                                        {generos.map((p) => (
                                            <option key={p.id} value={p.value}>
                                                {p.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className="mb-6">
                                <div className='flex items-center'>
                                    <CalendarDateRangeIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label className="text-sm font-medium text-heading">Idade</label>
                                </div>

                                <input step={1} min={18} max={92} value={idade} onChange={(e) => setIdade(e.target.value)} type="number" placeholder='Idade' className="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-green-400 shadow-sm sm:text-sm/6 mt-2" required />
                            </div>
                            <div className="mb-6">
                                <div className='flex items-center'>
                                    <ClockIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label htmlFor="trabalho" className="text-sm font-medium text-heading">Tempo de trabalho (meses)</label>
                                </div>
                                <input step={1} min={0} max={10} id='trabalho' value={tempoTrabalho} onChange={(e) => setTempoTrabalho(e.target.value)} type="number" placeholder='Tempo de trabalho (meses)' className="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-green-400 shadow-sm sm:text-sm/6 mt-2" required />
                            </div>
                            <div className="mb-6">
                                <div className='flex items-center'>
                                    <CurrencyDollarIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label htmlFor="saldo" className="text-sm font-medium text-heading">Saldo</label>
                                </div>
                                <input min={0} step={0.01} id='saldo' value={saldo} onChange={(e) => setSaldo(e.target.value)} type="number" placeholder='Saldo' className="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-green-400 shadow-sm sm:text-sm/6 mt-2" required />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className='flex items-center'>
                            <CurrencyDollarIcon
                                aria-hidden="true"
                                className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                            />
                            <label htmlFor="salario" className="text-sm font-medium text-heading">Salário estimado</label>
                        </div>
                        <input min={0} step={0.01} id="salario" value={salarioEstimado} onChange={(e) => setSalarioEstimado(e.target.value)} type="number" placeholder='Salário estimado' className="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-green-400 shadow-sm sm:text-sm/6 mt-2" required />
                    </div>
                    <div className="flex justify-center">
                        <div>
                            <button
                                type="submit"
                                className="text-white hover:cursor-pointer hover:scale-105 bg-linear-to-r from-[#0077FF] to-[#39EA29] shadow-sm font-medium leading-5 rounded-sm text-ms px-4 py-2.5 focus:outline-none"
                            >
                                Analisar Risco de churn
                            </button>
                            <Dialog open={open} onClose={setOpen} className="relative z-10">
                                <DialogBackdrop
                                    transition
                                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                                />

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                                        <DialogPanel
                                            transition
                                            className="relative transform overflow-hidden rounded-lg bg-blue-50 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in  data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                                        >
                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                                        <div className="mt-2 text-xl">
                                                            {erro ? (
                                                                <div>
                                                                    <DialogTitle as="h3" className="text-2xl font-semibold text-black text-center mb-4">
                                                                        Resultado
                                                                    </DialogTitle>
                                                                    <div>
                                                                        <p className='font-4xl text-center'>ERRO</p>
                                                                    </div>
                                                                </div>
                                                            ) :
                                                                (
                                                                    <div>
                                                                        {loading ? (
                                                                            <div className="flex flex-col items-center gap-3">
                                                                                <svg
                                                                                    className="animate-spin h-10 w-10 text-blue-600"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <circle
                                                                                        className="opacity-25"
                                                                                        cx="12"
                                                                                        cy="12"
                                                                                        r="10"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="4"
                                                                                    />
                                                                                    <path
                                                                                        className="opacity-75"
                                                                                        fill="currentColor"
                                                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                                                    />
                                                                                </svg>

                                                                                <p className="text-gray-700 text-lg">
                                                                                    Analisando dados do cliente...
                                                                                </p>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="text-xl text-center">
                                                                                {previsao === "Vai continuar" ?
                                                                                    <p className="text-green-500 text-center text-2xl">
                                                                                        {previsao}
                                                                                    </p>
                                                                                    :
                                                                                    <p className="text-red-500 text-center text-2xl">
                                                                                        {previsao}
                                                                                    </p>
                                                                                }
                                                                                <br />
                                                                                <p className="text-gray-900">
                                                                                    <span className='font-bold'>Probabilidade:</span>
                                                                                    <br />
                                                                                    {probabilidadeFormatada}
                                                                                </p>
                                                                                <br />
                                                                                <p className="text-gray-900">
                                                                                    <span className='font-bold'>Nível de risco:</span>
                                                                                    <br />
                                                                                    {nivelRisco}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-700/25 px-4 py-3 flex justify-center">
                                                {erro ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => voltar()}
                                                        className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 hover:cursor-pointer sm:w-auto"
                                                    >
                                                        Voltar
                                                    </button>
                                                ) : loading ? null : (
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpen(false)}
                                                        className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400 hover:cursor-pointer sm:w-auto"
                                                    >
                                                        Entendi
                                                    </button>
                                                )}
                                            </div>
                                        </DialogPanel>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Previsao;