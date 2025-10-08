import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-white/5 border-t border-white/10 py-6 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Texto */}
        <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
          © {new Date().getFullYear()} Vinicius Nishimura Reis. Todos os direitos reservados.
        </p>

        {/* Redes sociais */}
        <div className="flex space-x-6 text-xl">
          <a
            href="https://github.com/Vinishireis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/vinicius-nishimura-reis/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/Vinishireis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};
