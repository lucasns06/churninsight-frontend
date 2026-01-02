import { Link } from "react-router-dom";

const HeroFooter = () => {
    return (
        <footer className="bg-[#020617]">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 text-white">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex gap-2 items-center">
                            <span className='bg-[#0077FF] text-white font-bold text-2xl px-2 rounded-xl'>C</span>
                            <img src="logo.svg" className="h-6 me-3" alt="FlowBite Logo" />
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2 ">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Repositórios</h2>
                            <ul className="text-body font-medium">
                                <li className="mb-4">
                                    <a href="https://github.com/lucasns06/churninsight-frontend" className="hover:underline" target="_blank" rel="noopener noreferrer">Front end</a>
                                </li>
                                <li className="mb-4">
                                    <a href="https://github.com/renancvitor/churninsight-backend-h12-25b" className="hover:underline" target="_blank" rel="noopener noreferrer">Back end</a>
                                </li>
                                <li>
                                    <a href="https://github.com/LeticiaPaesano/Churn_Hackathon" className="hover:underline" target="_blank" rel="noopener noreferrer">Data science</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Páginas</h2>
                            <ul className="text-body font-medium">
                                <li className="mb-4">
                                    <Link to="/previsao" className="hover:underline">Previsão</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/membros" className="hover:underline">Membros</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-default sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-body sm:text-center">HACKATON - NO COUNTRY - Oracle Next One - ALURA
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="https://github.com/lucasns06/churninsight-frontend" className="text-body hover:text-heading ms-5" target="_blank" rel="noopener noreferrer">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd" /></svg>
                            <span className="sr-only">GitHub account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default HeroFooter;