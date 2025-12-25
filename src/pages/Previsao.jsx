import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const Previsao = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="h-screen bg-[#e3e5f0] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center md:flex-row">
                <div className="bg-white w-sm rounded-2xl p-4 shadow-2xl">
                    <p className="text-center text-3xl w-sm font-bold py-2">Entrada</p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault() 
                            setOpen(true)       
                        }}
                    >
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Score do cartão de crédito</label>
                            <input type="text" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">País</label>
                            <input type="text" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Gênero</label>
                            <input type="text" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Idade</label>
                            <input type="text" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Tempo de trabalho (meses)</label>
                            <input type="text" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Balance</label>
                            <input type="text" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2.5 text-sm font-medium text-heading">Salário estimado</label>
                            <input type="text" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required />
                        </div>
                        <div className="flex justify-center">
                            <div>
                                <button
                                    type="submit"
                                    className="text-white hover:cursor-pointer hover:scale-105 bg-linear-to-r from-[#0077FF] to-[#39EA29] shadow-xs font-medium leading-5 rounded-sm text-xl px-4 py-2.5 focus:outline-none"
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
                                                className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in  data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                                            >
                                                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                    <div className="sm:flex sm:items-start">
                                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                            <DialogTitle as="h3" className="text-base font-semibold text-white">
                                                                Resultado
                                                            </DialogTitle>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-400">
                                                                    Previsão:
                                                                </p>
                                                                <p className="text-sm text-gray-400">
                                                                    Probabilidade:
                                                                </p>
                                                                <p className="text-sm text-gray-400">
                                                                    Nivel de risco:
                                                                </p>
                                                                <p className="text-sm text-gray-400">
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