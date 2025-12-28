import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChevronDownIcon, ClockIcon, CreditCardIcon, CurrencyDollarIcon, GlobeAltIcon, UserCircleIcon, UserIcon } from '@heroicons/react/16/solid'
import api from '../services/Api';
import { CalendarDateRangeIcon } from '@heroicons/react/16/solid';
const Previsao = () => {
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState('');
    const [pais, setPais] = useState('');
    const [sexo, setSexo] = useState('');
    const [idade, setIdade] = useState('');
    const [tempoTrabalho, setTempoTrabalho] = useState('');
    const [saldo, setSaldo] = useState('');
    const [salarioEstimado, setSalarioEstimado] = useState('');

    const paisMap = {
        França: "France",
        Alemanha: "Germany",
        Espanha: "Spain"
    };
    const sexoMap = {
        Feminino: "Female",
        Masculino: "Male"
    };

    function testar() {
        console.log({
            "score": score,
            pais: paisMap[pais],
            "sexo": sexoMap[sexo],
            "idade": idade,
            "tempo de trabalho": tempoTrabalho,
            "saldo": saldo,
            "salario estimado": salarioEstimado
        })
    }

    async function prever() {
        api.post('/api/previsao', {
            CreditScore: score,
            Geography: paisMap[pais],
            Gender: sexoMap[sexo],
            Age: idade,
            Tenure: tempoTrabalho,
            Balance: saldo,
            EstimatedSalary: salarioEstimado
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="tela bg-[#e3e5f0] flex flex-col justify-center items-center px-2 py-8 sm:py-4">
            <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-xl">
                <h1 className='text-3xl'>Dados do Cliente</h1>
                <h1 className='text-base mb-4'>Insira as informações para realizar a análise preditiva</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        setOpen(true)
                        testar()
                        prever()
                    }}
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full'>
                        <div className='w-full'>
                            <div class="mb-6">
                                <div className='flex items-center'>
                                    <CreditCardIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label class="text-sm font-medium text-heading">Score de crédito</label>
                                </div>
                                <input value={score} onChange={(e) => setScore(e.target.value)} type="number" placeholder='Score de crédito' class="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-green-400 shadow-sm sm:text-sm/6 mt-2" required />
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
                                        <option>França</option>
                                        <option>Alemanha</option>
                                        <option>Espanha</option>
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
                                        <option>Feminino</option>
                                        <option>Masculino</option>
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div class="mb-6">
                                <div className='flex items-center'>
                                    <CalendarDateRangeIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label class="text-sm font-medium text-heading">Idade</label>
                                </div>

                                <input value={idade} onChange={(e) => setIdade(e.target.value)} type="number" placeholder='Idade' class="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-green-400 shadow-sm sm:text-sm/6 mt-2" required />
                            </div>
                            <div class="mb-6">
                                <div className='flex items-center'>
                                    <ClockIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label for="trabalho" class="text-sm font-medium text-heading">Tempo de trabalho (meses)</label>
                                </div>
                                <input id='trabalho' value={tempoTrabalho} onChange={(e) => setTempoTrabalho(e.target.value)} type="number" placeholder='Tempo de trabalho (meses)' class="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-green-400 shadow-sm sm:text-sm/6 mt-2" required />
                            </div>
                            <div class="mb-6">
                                <div className='flex items-center'>
                                    <CurrencyDollarIcon
                                        aria-hidden="true"
                                        className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                                    />
                                    <label for="saldo" class="text-sm font-medium text-heading">Saldo</label>
                                </div>
                                <input id='saldo' value={saldo} onChange={(e) => setSaldo(e.target.value)} type="number" placeholder='Saldo' class="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-green-400 shadow-sm sm:text-sm/6 mt-2" required />
                            </div>
                        </div>
                    </div>
                    <div class="mb-6">
                        <div className='flex items-center'>
                            <CurrencyDollarIcon
                                aria-hidden="true"
                                className="pointer-events-none mr-1 col-start-1 row-start-1 size-5 self-center justify-self-end text-blue-600 sm:size-4"
                            />
                            <label for="salario" class="text-sm font-medium text-heading">Salário estimado</label>
                        </div>
                        <input id="salario" value={salarioEstimado} onChange={(e) => setSalarioEstimado(e.target.value)} type="number" placeholder='Salário estimado' class="w-full min-w-0 border rounded-md py-1.5 pr-3 pl-3 text-base text-black bg-white focus:outline-green-400 shadow-sm sm:text-sm/6 mt-2" required />
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
                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <DialogPanel
                                            transition
                                            className="relative transform overflow-hidden rounded-lg bg-blue-50 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in  data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                                        >
                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                        <DialogTitle as="h3" className="text-base font-semibold text-black">
                                                            Resultado
                                                        </DialogTitle>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-900">
                                                                Previsão:
                                                            </p>
                                                            <p className="text-sm text-gray-900">
                                                                Probabilidade:
                                                            </p>
                                                            <p className="text-sm text-gray-900">
                                                                Nivel de risco:
                                                            </p>
                                                            <p className="text-sm text-gray-900">
                                                                Recomendação:
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-700/25 px-4 py-3 flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400 hover:cursor-pointer sm:w-auto"
                                                >
                                                    Certo!
                                                </button>
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