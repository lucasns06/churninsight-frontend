import { ArrowTrendingUpIcon, DocumentArrowDownIcon, DocumentArrowUpIcon, CheckCircleIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useEffect, useRef, useState } from "react";
import { downloadBatch, enviarBatch, statusBatch } from "../services/api";
import { useFileDrop } from "../hooks/useFileDrop";
import axios from "axios";
import Loading from "../components/layout/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    async function fecharModalErro() {
        setFile(null);
        setModalAberto(false);
        setErro(false);
        setFinalJobId(null);
        setErroMensagem('');
    }

    const resetarProcesso = () => {
        setFile(null);
        setFinalJobId(null);
        setStatus('');
        setErro(false);
    };

    const handleDownload = async () => {
        if (!finalJobId) return;
        try {
            await downloadBatch(finalJobId);
            toast.success("Download iniciado! O arquivo foi enviado para seu dispositivo.", {
                // autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: "bottom-left"
            });
        } catch (error) {
            toast.error("Erro ao baixar o arquivo: " + error);
        }
    };

    return (
        <div className="min-h-[calc(100dvh-64px)]">
            <ToastContainer />
            {loading &&
                <div className="tela flex-1 flex items-center justify-center">
                    <Loading nome="previsão em lote" />
                </div>}

            <div className={`min-h-[calc(100dvh-64px)] flex flex-col justify-center items-center gap-8 ${loading && "hidden!"}`}>

                {finalJobId ? (
                    <div className="flex flex-col items-center justify-center gap-6 animate-fade-in">
                        <CheckCircleIcon className="w-32 h-32 text-green-500" />
                        <h2 className="text-3xl font-bold text-gray-800">Processamento Concluído!</h2>

                        <div className="flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={handleDownload}
                                className="inline-flex items-center gap-2 rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white hover:bg-green-500 hover:cursor-pointer transition-colors shadow-lg"
                            >
                                <DocumentArrowDownIcon className="w-6 h-6 text-white" />
                                Baixar Arquivo
                            </button>

                            <button
                                onClick={resetarProcesso}
                                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-500 hover:cursor-pointer transition-colors shadow-lg"
                            >
                                <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
                                Enviar Outro Arquivo
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/30 text-primary-foreground border border-blue-500/40">
                            <ArrowTrendingUpIcon className="w-4 h-4 text-blue-700" />
                            <span className="text-sm font-medium text-blue-700">Previsão em Lote</span>
                        </div>
                        <h1 className="text-center font-bold text-4xl">Previsão em Lote</h1>
                        <h2 className="text-center text-xl">Faça upload de um arquivo CSV para analisar múltiplos perfis de <span className="text-blue-500">clientes</span></h2>
                        <div className="bg-white p-4 rounded-xl max-w-2xl w-full flex flex-col items-end">
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={handleClick}
                                className={`border-dashed group border-2 rounded-xl bg-gray-100/90 w-full text-center cursor-pointer px-4 py-16 ${dragOver ? 'border-green-200' : 'border-gray-500'} ${dragOver ? 'bg-green-300/50' : 'bg-none'}`}
                            >
                                {file ? (
                                    <p>Arquivo selecionado: {file.name}</p>
                                ) : (
                                    <div>
                                        <CloudArrowUpIcon className="w-full max-w-20 m-auto bg-white p-4 mb-4 rounded-full text-gray-400 group-hover:scale-105 transition" />
                                        <p className="font-bold">
                                            <span className="text-blue-500">Clique para enviar</span> ou arraste e solte
                                        </p>
                                        <p className="text-gray-600">
                                            Apenas arquivos .CSV
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
                            <div className="mt-2 flex flex-wrap gap-2">
                                {file && !loading && (
                                    <button className="hidden enabled:block w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 hover:cursor-pointer sm:w-auto" onClick={confirmarDeletar}>
                                        Deletar
                                    </button>
                                )}
                                <button className="bg-gray-300 w-full justify-center rounded-md enabled:bg-green-500 px-3 py-2 text-sm font-semibold text-white enabled:hover:bg-green-400 enabled:hover:cursor-pointer sm:w-auto" onClick={handleUpload} disabled={!file || loading}>
                                    Iniciar Análise
                                </button>
                            </div>
                        </div>

                        {status && <p>Status: {status}</p>}
                    </>
                )}
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
                            {erro && (
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                                    <div className="text-center">
                                        <h1 className="text-2xl font-bold text-red-600">Ops! Algo deu errado</h1>
                                        <p className="mt-2 text-gray-600">{erroMensagem}</p>
                                    </div>
                                    <div className="mt-5 flex justify-center">
                                        <button onClick={fecharModalErro} className="bg-gray-800 hover:cursor-pointer hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                                            Tentar Novamente
                                        </button>
                                    </div>
                                </div>
                            )}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
export default PrevisaoLote;