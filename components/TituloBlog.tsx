
export default function TituloBlog() {
  return (
    <>
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-100">
          Blog de{" "}
          <span
            className="bg-clip-text text-transparent 
                      bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                      bg-[length:200%_200%]"
            
          >
            AYOLIN
          </span>
        </h1>
        </div>
        <div>
          <p className="text-center text-white mt-4 mb-12 max-w-2xl mx-auto">
            Noticias, tutoriales y guías para ayudarte a sacar el máximo de nuestras herramientas.
          </p>
        </div>
    </>
  )
}
