import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

const PrevisaoLote = () => {
    const [file, setFile] = useState<File | null>(null);
    const [jobId, setJobId] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.name.toLowerCase().endsWith('.csv')) {
                setFile(droppedFile);
            } else {
                alert('Apenas arquivos CSV são permitidos.');
            }
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            if (selectedFile.name.toLowerCase().endsWith('.csv')) {
                setFile(selectedFile);
            } else {
                alert('Apenas arquivos CSV são permitidos.');
            }
        }
    };
    const pollStatus = (id: string) => {
        const interval = setInterval(async () => {
            try {
                const res = await consultarStatus(id);
                setStatus(res.status);
                if (res.status === 'FINALIZADO') {
                    clearInterval(interval);
                    setLoading(false);
                    alert('Processamento finalizado! Baixe o resultado.');
                    
                } else if (res.status === 'ERRO') {
                    clearInterval(interval);
                    setLoading(false);
                    alert('Erro no processamento do batch.');
                }
            } catch (error) {
                clearInterval(interval);
                setLoading(false);
                alert('Erro ao consultar status.' + error);
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
            setJobId(response.jobId);
            setStatus('PROCESSANDO');
            pollStatus(response.jobId);
        } catch (error) {
            alert('Erro ao enviar o batch.' + error);
            setLoading(false);
        }
    };
    function confirmarDeletar() {
        var r = confirm("Certeza que deseja deletar?")
        if (r == true) {
            setFile(null)
        }
    }
    return (
        <div className="tela">
            <div className="flex flex-col justify-center items-center gap-4">
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
                            <DocumentArrowUpIcon className="w-full max-w-40 m-auto text-gray-500"/>
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
                    <button className="hidden enabled:block border-2 px-2 cursor-pointer bg-red-300" onClick={() => confirmarDeletar()} disabled={!file || loading}>
                        Deletar Batch
                    </button>
                    <button className="hidden enabled:block border-2 px-2 cursor-pointer bg-green-300" onClick={handleUpload} disabled={!file || loading}>
                        {loading ? 'Enviando...' : 'Enviar Batch'}
                    </button>
                </div>
                {jobId && <p>Job ID: {jobId}</p>}
                {status && <p>Status: {status}</p>}
            </div>
        </div>
    )
}
export default PrevisaoLote;