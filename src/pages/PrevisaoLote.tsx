import { ArrowTrendingUpIcon, DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useEffect, useRef, useState } from "react";
import { downloadBatch, enviarBatch, statusBatch } from "../services/api";
import { useFileDrop } from "../hooks/useFileDrop";
import axios from "axios";
const PrevisaoLote = () => {
    const {
        file, setFile, dragOver,
        handleDragOver, handleDragLeave, handleDrop, handleFileChange
    } = useFileDrop();

    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [finalJobId, setFinalJobId] = useState<string | null>(null);
    const [erro, setErro] = useState(false);
    const [erroMensagem, setErroMensagem] = useState('');
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const pollStatus = (id: string) => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = window.setInterval(async () => {
            try {
                const res = await statusBatch(id);
                setStatus(res.status);
                if (res.status === 'FINALIZADO' || res.status === 'ERRO') {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setLoading(false);

                    if (res.status === 'FINALIZADO') {
                        setFinalJobId(id);
                        setStatus('');
                        setModalAberto(true);
                    } else {
                        alert('Erro no processamento do servidor.');
                        setStatus('');
                    }
                }
            } catch (error) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setLoading(false);
                console.error("Erro no polling:", error);
            }
        }, 5000);
    };
    const handleClick = () => {
        fileInputRef.current?.click();
    };
    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        // setErro(false);
        // setErroMensagem('');
        // setFinalJobId(null);
        // setStatus('');
        try {
            const response = await enviarBatch(file);
            pollStatus(response.job_id);
        } catch (error) {
            let message = "Erro inesperado";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.mensagem || error.message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            setErroMensagem(message);
            setErro(true);
            setModalAberto(true);
            setLoading(false);
            setStatus('');
        }
    };
    function confirmarDeletar() {
        var r = confirm("Certeza que deseja deletar?")
        if (r == true) {
            setFile(null)
        }
    }
    async function fecharModal() {
        setFile(null);
        setModalAberto(false);
        setErro(false);
        setFinalJobId(null);
        setErroMensagem('');
    }
    const handleDownload = async () => {
        if (!finalJobId) return;
        try {
            await downloadBatch(finalJobId);
        } catch (error) {
            alert("Erro ao baixar o arquivo." + error);
        }
    };
    return (
        <div className="min-h-[calc(100dvh-64px)] bg-[#eef1fd]">
            <div className="min-h-[calc(100dvh-64px)] bg-[#eef1fd] flex flex-col justify-center items-center gap-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/30 text-primary-foreground border border-blue-500/40">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-blue-700" />
                    <span className="text-sm font-medium text-blue-700">Previsão em Lote</span>
                </div>
                <h1 className="text-center font-bold text-4xl">Previsão em Lote</h1>
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                    className={`border-dashed w-max border-2 text-center cursor-pointer p-4 ${dragOver ? 'border-green-200' : 'border-gray-500'} ${dragOver ? 'bg-green-300/50' : 'bg-none'}`}
                >
                    {file ? (
                        <p>Arquivo selecionado: {file.name}</p>
                    ) : (
                        <div>
                            <DocumentArrowUpIcon className="w-full max-w-40 m-auto text-gray-500" />
                            <p>
                                Arraste e solte o arquivo CSV
                                <br />
                                aqui ou clique para selecionar
                            </p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {file && !loading && (
                        <button className="hidden enabled:block w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 hover:cursor-pointer sm:w-auto" onClick={confirmarDeletar}>
                            Deletar Batch
                        </button>
                    )}
                    <button className="hidden enabled:block w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400 hover:cursor-pointer sm:w-auto" onClick={handleUpload} disabled={!file || loading}>
                        Enviar Batch
                    </button>
                </div>
                {loading &&
                    <div className="text-center">
                        <svg aria-hidden="true" className="max-w-50 w-full text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#0000001e" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#155dfc" />
                        </svg>
                        <p>Enviando...</p>
                    </div>}
                {status && <p>Status: {status}</p>}
            </div>
            <Dialog open={modalAberto} onClose={setModalAberto} className="relative z-10">
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
                            {erro ? (
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                                    <div className="text-center">
                                        <h1 className="text-2xl font-bold text-red-600">Ops! Algo deu errado</h1>
                                        <p className="mt-2 text-gray-600">{erroMensagem}</p>
                                    </div>
                                    <div className="mt-5 flex justify-center">
                                        <button onClick={fecharModal} className="bg-gray-800 hover:cursor-pointer hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                                            Tentar Novamente
                                        </button>
                                    </div>
                                </div>
                            ) : finalJobId ? (
                                <div>
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="mt-2 text-xl text-center">
                                            <h1 className="text-3xl">Previsão em Lote <span className="text-green-500">Enviado!</span></h1>
                                            <br />
                                            <p className="text-gray-700">Arquivo pronto para download</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-700/25 px-4 py-3 flex justify-around">
                                        <button type="button"
                                            onClick={() => fecharModal()}
                                            className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 hover:cursor-pointer sm:w-auto">
                                            Fechar
                                        </button>
                                        <button type="button"
                                            onClick={() => handleDownload()}
                                            className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400 hover:cursor-pointer sm:w-auto">
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
export default PrevisaoLote;