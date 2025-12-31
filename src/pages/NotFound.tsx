import { Link } from 'react-router-dom'
import ParticlesBackground from '../components/effects/ParticlesBackground'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-white text-center">
      <ParticlesBackground />
      <div className='relative z-10 backdrop-blur-sm'>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Página não encontrada</p>

        <Link
          to="/"
          className="px-6 py-3 bg-linear-to-r from-[#0077FF] to-[#39EA29] transition rounded-md"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}

export default NotFound
