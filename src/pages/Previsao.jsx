import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
const Previsao = () => {
    const [open, setOpen] = useState(false)
    const [pais, setPais] = useState('')
    const [sexo, setSexo] = useState('')
    return (
        <div className="tela bg-[#e3e5f0] flex flex-col justify-center items-center px-2 py-8 sm:py-4">
            <div className="flex flex-col justify-center items-center md:flex-row">
                <div className="bg-white w-sm rounded-2xl p-4 shadow-2xl">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            setOpen(true)
                        }}
                    >
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Score do cartão de crédito</label>
                            <input type="number" placeholder='Score do cartão de crédito' class="rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:outline-green-400 block w-full px-3 py-2.5 shadow-sm placeholder:text-body" required />
                        </div>
                        <div className="mb-6 sm:col-span-3">
                            <label htmlFor="pais" className="block mb-2.5 text-sm font-medium text-heading text-black">
                                País
                            </label>
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
                            <label htmlFor="sexo" className="block mb-2.5 text-sm font-medium text-heading text-black">
                                Sexo
                            </label>
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
                        {/* ---- */}
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Idade</label>
                            <input type="number" placeholder='Idade' class="rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:outline-green-400 block w-full px-3 py-2.5 shadow-sm placeholder:text-body" required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Tempo de trabalho (meses)</label>
                            <input type="number" placeholder='Tempo de trabalho (meses)' class="rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:outline-green-400 block w-full px-3 py-2.5 shadow-sm placeholder:text-body" required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Saldo</label>
                            <input type="number" placeholder='Saldo' class="rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:outline-green-400 block w-full px-3 py-2.5 shadow-sm placeholder:text-body" required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Salário estimado</label>
                            <input type="number" placeholder='Salário estimado' class="rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:outline-green-400 block w-full px-3 py-2.5 shadow-sm placeholder:text-body" required />
                        </div>
                        <div className="flex justify-center">
                            <div>
                                <button
                                    type="submit"
                                    className="text-white hover:cursor-pointer hover:scale-105 bg-linear-to-r from-[#0077FF] to-[#39EA29] shadow-sm font-medium leading-5 rounded-sm text-xl px-4 py-2.5 focus:outline-none"
                                >
                                    Prever
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
                {/* <div className="bg-gray-400 w-md rounded-br-xl rounded-tr-xl">
                    <p className="text-center text-3xl">Resultado sairá aqui</p>
                </div> */}
            </div>
        </div>
    )
}
export default Previsao;