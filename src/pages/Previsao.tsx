import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ArrowTrendingUpIcon, ChevronDownIcon, ClockIcon, CreditCardIcon, CurrencyDollarIcon, GlobeAltIcon, UserIcon } from '@heroicons/react/16/solid'
import api from '../services/api';
import { CalendarDateRangeIcon } from '@heroicons/react/16/solid';
import { Dominio } from '../@types/previsao';

const Previsao = () => {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [erroPage, setErroPage] = useState(false);
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


    useEffect(() => {
        const carregarDominios = async () => {
            try {
                setLoadingPage(true);

                const [paisesRes, generosRes] = await Promise.all([
                    api.get('/dominios/paises'),
                    api.get('/dominios/generos'),
                ]);

                setPaises(paisesRes.data.dados);
                setGeneros(generosRes.data.dados);

            } catch (error) {
                console.error("Erro ao carregar domínios:", error);
                setErroPage(true);
            } finally {
                setLoadingPage(false);
            }
        };

        carregarDominios();
    }, []);


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
    if (loadingPage) {
        return (
            <div className="tela flex-1 flex items-center justify-center">
                <div role="status" className="flex flex-col items-center justify-center">
                    <svg aria-hidden="true" className="w-80 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#0000001e" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#155dfc" />
                    </svg>
                    <p className="text-4xl mt-4 text-gray-700 text-center">Carregando previsão...</p>
                </div>
            </div>
        )
    }
    if (erroPage) {
        return (
            <div className="tela flex-1 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl text-red-500 mb-2">
                    Não foi possível carregar a previsão
                </h2>
                <p className="text-gray-600">
                    Verifique se o servidor está online e tente novamente.
                </p>
            </div>
        )
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
                                <input step={1} min={350} max={1000} value={score} onChange={(e) => setScore(e.target.value)} type="number" placeholder='Score de crédito' className="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-blue-500 shadow-sm sm:text-sm/6 mt-2" required />
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
                                        className="border border-default-medium col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-black outline-1 -outline-offset-1 outline-white/10 *:bg-white focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 shadow-sm sm:text-sm/6"
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
                                        className="border border-default-medium col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-black outline-1 -outline-offset-1 outline-white/10 *:bg-white focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 shadow-sm sm:text-sm/6"
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

                                <input step={1} min={18} max={92} value={idade} onChange={(e) => setIdade(e.target.value)} type="number" placeholder='Idade' className="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-blue-500 shadow-sm sm:text-sm/6 mt-2" required />
                            </div>
                            <div className="mb-6">
                                <div className='flex items-center'>
                                    <ClockIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label htmlFor="trabalho" className="text-sm font-medium text-heading">Tempo de trabalho (meses)</label>
                                </div>
                                <input step={1} min={0} max={10} id='trabalho' value={tempoTrabalho} onChange={(e) => setTempoTrabalho(e.target.value)} type="number" placeholder='Tempo de trabalho (meses)' className="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-blue-500 shadow-sm sm:text-sm/6 mt-2" required />
                            </div>
                            <div className="mb-6">
                                <div className='flex items-center'>
                                    <CurrencyDollarIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label htmlFor="saldo" className="text-sm font-medium text-heading">Saldo</label>
                                </div>
                                <input min={0} step={0.01} id='saldo' value={saldo} onChange={(e) => setSaldo(e.target.value)} type="number" placeholder='Saldo' className="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-blue-500 shadow-sm sm:text-sm/6 mt-2" required />
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
                        <input min={0} step={0.01} id="salario" value={salarioEstimado} onChange={(e) => setSalarioEstimado(e.target.value)} type="number" placeholder='Salário estimado' className="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-blue-500 shadow-sm sm:text-sm/6 mt-2" required />
                    </div>
                    <div className="flex justify-center">
                        <div>
                            <button
                                type="submit"
                                className="text-white hover:cursor-pointer hover:scale-105 bg-linear-to-r from-[#0077FF] to-[#2242aa] shadow-sm hover:shadow-xl font-medium leading-5 rounded-xl text-ms px-4 py-2.5 focus:outline-none"
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