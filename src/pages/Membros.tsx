import { cardsBack, cardsData } from '../constants/dadosMembros';

const Membros = () => {
    return (
        <div className="tela sm:h-auto  pb-4 py-2">
            <h1 className="text-4xl text-center my-4">Nossa Equipe</h1>
            <div className="flex flex-wrap justify-center gap-4">
                {cardsBack.map((cards) => (
                    <div key={cards.id} className="bg-white relative bg-neutral-primary-soft max-w-2xs w-full p-6 rounded-2xl shadow-md border border-white hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-xl transition-all">
                        <div className="flex flex-col items-center">
                            <img className="w-24 h-24 mb-6 rounded-full" src={cards.fotoUrl} alt="person" />
                            <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">{cards.nome}</h5>
                            <span className="text-md">{cards.cargo}</span>
                            <div className="flex items-center mt-4 md:mt-6 gap-4">
                                <a href={cards.linkedin} target="_blank" rel="noopener noreferrer">
                                    <button
                                        type="button"
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light"
                                        className="inline-block hover:cursor-pointer rounded p-2  text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                                        <span className="[&>svg]:h-4 [&>svg]:w-4 font-bold hover:cursor-pointer">
                                            <img src={"linkedin.png"} className="h-5" />
                                        </span>
                                    </button>
                                </a>
                                <a href={cards.github} target="_blank" rel="noopener noreferrer">
                                    <button type="button" className="flex items-center hover:cursor-pointer rounded p-2 text-base font-medium leading-normal bg-black text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                                        <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd" /></svg>
                                        Github
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-center my-4">
                <div className="w-32 h-1 bg-gray-600 rounded-4xl"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {cardsData.map((cards) => (
                    <div key={cards.id} className="bg-white relative bg-neutral-primary-soft max-w-2xs w-full p-6 rounded-2xl shadow-md border border-white hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-xl transition-all">
                        <div className="flex flex-col items-center">
                            <img className="w-24 h-24 mb-6 rounded-full" src={cards.fotoUrl} alt="person" />
                            <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">{cards.nome}</h5>
                            <span className="text-md">{cards.cargo}</span>
                            <div className="flex items-center mt-4 md:mt-6 gap-4">
                                <a href={cards.linkedin} target="_blank" rel="noopener noreferrer">
                                    <button
                                        type="button"
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light"
                                        className="inline-block hover:cursor-pointer rounded p-2  text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                                        <span className="[&>svg]:h-4 [&>svg]:w-4 font-bold hover:cursor-pointer">
                                            <img src={"linkedin.png"} className="h-5" />
                                        </span>
                                    </button>
                                </a>
                                <a href={cards.github} target="_blank" rel="noopener noreferrer">
                                    <button type="button" className="flex items-center hover:cursor-pointer rounded p-2 text-base font-medium leading-normal bg-black text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                                        <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd" /></svg>
                                        Github
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Membros;