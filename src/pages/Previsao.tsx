import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ArrowTrendingUpIcon, ChevronDownIcon, ClockIcon, CreditCardIcon, CurrencyDollarIcon, GlobeAltIcon, UserIcon } from '@heroicons/react/16/solid'
import api from '../services/api';
import { CalendarDateRangeIcon } from '@heroicons/react/16/solid';
import { Dominio, Inputs } from '../@types/previsao';
import { SubmitHandler, useForm } from 'react-hook-form';
import Loading from '../components/layout/Loading';

const Previsao = () => {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [erroPage, setErroPage] = useState(false);
    const [open, setOpen] = useState(false);
    const [paises, setPaises] = useState<Dominio[]>([]);
    const [generos, setGeneros] = useState<Dominio[]>([]);
    const [previsao, setPrevisao] = useState('');
    const [probabilidade, setProbabilidade] = useState('');
    const [nivelRisco, setNivelRisco] = useState('');
    const [erroMensagem, setErroMensagem] = useState('');
    const classeInput = `w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-blue-500 shadow-sm sm:text-sm/6 mt-2`;
    const probabilidadeFormatada = (parseFloat(probabilidade) * 100).toFixed(2) + '%';
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setOpen(true)
        setLoading(true);
        api.post('/api/previsao', data)
            .then(function (response) {
                setPrevisao(response.data.previsao);
                setNivelRisco(response.data.nivel_risco);
                setProbabilidade(response.data.probabilidade);
            })
            .catch(function (error) {
                console.log(error.response?.data);
                setErro(true);

                if (error.response && error.response.data && error.response.data.length > 0) {
                    const textoErro = error.response.data[0].mensagem;
                    setErroMensagem(textoErro);
                } else {
                    setErroMensagem("Ocorreu um erro inesperado.");
                }
            })
            .finally(function () {
                setLoading(false);
            });
    };

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


    async function voltar() {
        setOpen(false);
        setTimeout(() => {
            setErro(false);
        }, 500);
    }
    if (loadingPage) {
        return (
            <div className="tela flex-1 flex items-center justify-center">
                <Loading nome="Previsão" />
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
        <div className="min-h-[calc(100dvh-64px)] bg-[#eef1fd] flex flex-col justify-center items-center px-2 py-8 sm:py-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/30 text-primary-foreground mb-6 border border-blue-500/40">
                <ArrowTrendingUpIcon className="w-4 h-4 text-blue-700" />
                <span className="text-sm font-medium text-blue-700">Previsão de Churn</span>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md max-w-xl border border-gray-200">
                <h1 className='text-3xl text-center'>Dados do Cliente</h1>
                <h1 className='text-base text-gray-800 mb-4 text-center'>Insira as informações para realizar a análise preditiva</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full'>
                        <div className='w-full'>
                            <div className="h-22 relative">
                                <div className='flex items-center'>
                                    <CreditCardIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label className="text-sm font-medium text-heading">Score de crédito</label>
                                </div>
                                <input
                                    type="number"
                                    placeholder='Score de crédito'
                                    {...register("CreditScore", { required: "Campo Obrigatório", min: { value: 350, message: "O valor mínimo é 350!" }, max: { value: 1000, message: "O valor máximo é 1000" }, valueAsNumber: true })}
                                    className={`${classeInput} ${errors.CreditScore ? 'border-red-500 focus:outline-red-500' : 'border-gray-900'}`}
                                />
                                {errors.CreditScore && (
                                    <span className="absolute left-0 bottom-2 text-red-500 text-xs leading-none">
                                        {errors.CreditScore.message}
                                    </span>
                                )}
                            </div>
                            <div className="h-22 relative sm:col-span-3">
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
                                        {...register("Geography", { required: "Campo Obrigatório" })}
                                        defaultValue=""
                                        className="border border-default-medium col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-black outline-1 -outline-offset-1 outline-white/10 *:bg-white focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 shadow-sm sm:text-sm/6"
                                    >
                                        <option value="" disabled hidden ></option>
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
                                {errors.Geography && (
                                    <span className="absolute left-0 bottom-2 text-red-500 text-xs leading-none">
                                        {errors.Geography.message}
                                    </span>
                                )}
                            </div>
                            <div className="h-22 relative sm:col-span-3">
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
                                        {...register("Gender", { required: "Campo Obrigatório" })}
                                        defaultValue=""
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
                                {errors.Gender && (
                                    <span className="absolute left-0 bottom-2 text-red-500 text-xs leading-none">
                                        {errors.Gender.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className="h-22 relative">
                                <div className='flex items-center'>
                                    <CalendarDateRangeIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label className="text-sm font-medium text-heading">Idade</label>
                                </div>
                                <input
                                    type='number'
                                    placeholder='Idade' {
                                    ...register("Age", { required: "Campo Obrigatório", min: { value: 18, message: "O valor minimo é 18" }, max: { value: 92, message: "O valor maximo é 92" }, valueAsNumber: true })}
                                    className={`${classeInput} ${errors.Age ? 'border-red-500 focus:outline-red-500' : 'border-gray-900'}`} />
                                {errors.Age && (
                                    <span className="absolute left-0 bottom-2 text-red-500 text-xs leading-none">
                                        {errors.Age.message}
                                    </span>
                                )}
                            </div>
                            <div className="h-22 relative">
                                <div className='flex items-center'>
                                    <ClockIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label htmlFor="Tenure" className="text-sm font-medium text-heading">Tempo de trabalho (meses)</label>
                                </div>
                                <input
                                    type='number'
                                    placeholder='Tempo de trabalho'
                                    {...register("Tenure", { required: "Campo Obrigatório", min: { value: 0, message: "O valor minimo é 0" }, max: { value: 10, message: "O valor maximo é 10" }, valueAsNumber: true })}
                                    className={`${classeInput} ${errors.Tenure ? 'border-red-500 focus:outline-red-500' : 'border-gray-900'}`}
                                />
                                {errors.Tenure && (
                                    <span className="absolute left-0 bottom-2 text-red-500 text-xs leading-none">
                                        {errors.Tenure.message}
                                    </span>
                                )}
                            </div>
                            <div className="h-22 relative">
                                <div className='flex items-center'>
                                    <CurrencyDollarIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label htmlFor="saldo" className="text-sm font-medium text-heading">Saldo</label>
                                </div>
                                <input
                                    type='number'
                                    placeholder='Saldo'
                                    {...register("Balance", { required: "Campo Obrigatório", min: { value: 0, message: "O valor mínimo é 0" }, valueAsNumber: true })}
                                    className={`${classeInput} ${errors.Balance ? 'border-red-500 focus:outline-red-500' : 'border-gray-900'}`}
                                />
                                {errors.Balance && (
                                    <span className="absolute left-0 bottom-2 text-red-500 text-xs leading-none">
                                        {errors.Balance.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="h-22 relative">
                        <div className='flex items-center'>
                            <CurrencyDollarIcon
                                aria-hidden="true"
                                className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                            />
                            <label htmlFor="salario" className="text-sm font-medium text-heading">Salário estimado</label>
                        </div>
                        <input type='number' placeholder='Salário' {...register("EstimatedSalary", { required: "Campo Obrigatório", min: { value: 0, message: "Valor minimo é 0" }, max: { value: 200000, message: "Valor máximo é 200.000" }, valueAsNumber: true })}
                            className={`${classeInput} ${errors.EstimatedSalary ? 'border-red-500 focus:outline-red-500' : 'border-gray-900'}`}
                        />

                        {errors.EstimatedSalary && (
                            <span className="absolute left-0 bottom-2 text-red-500 text-xs leading-none">
                                {errors.EstimatedSalary.message}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <div>
                            <input
                                type="submit"
                                value='Analisar Risco de churn'
                                className="text-white hover:cursor-pointer hover:scale-105 bg-linear-to-r from-[#0077FF] to-[#2242aa] shadow-sm hover:shadow-xl font-medium leading-5 rounded-xl text-ms px-4 py-2.5 focus:outline-none"
                            />
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
                                                                        {/* <p className='font-4xl text-center'>ERRO</p> */}
                                                                        <p className='font-2xl text-center text-red-500'>{erroMensagem}</p>
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