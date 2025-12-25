import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Página não encontrada</p>

      <Link
        to="/"
        className="px-6 py-3 bg-green-400 rounded-lg hover:bg-green-500 transition"
      >
        Voltar para o início
      </Link>
    </div>
  )
}

export default NotFound
