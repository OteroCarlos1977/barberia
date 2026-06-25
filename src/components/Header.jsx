import { useState } from 'react';
import { CalendarDays, Menu, Shirt, Sparkles, X } from 'lucide-react';

export function Header({ onOpenAdmin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio" onClick={closeMenu}>
        <img className="brand-mark" src="/images/logo.png" alt="" />
        <span className="brand-text">Emanuel Perez</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
        onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav
        className={`nav-links ${isMenuOpen ? 'is-open' : ''}`}
        id="main-navigation"
        aria-label="Navegacion principal"
      >
        <a href="#servicios" onClick={closeMenu}>
          <Sparkles size={18} />
          Servicios
        </a>
        <a href="#limpieza-facial" onClick={closeMenu}>
          <Sparkles size={18} />
          Limpieza facial
        </a>
        <a href="#trajes" onClick={closeMenu}>
          <Shirt size={18} />
          Trajes
        </a>
        <button
          className="nav-button"
          type="button"
          onClick={() => {
            closeMenu();
            onOpenAdmin();
          }}
        >
          <CalendarDays size={18} />
          Agenda
        </button>
      </nav>
    </header>
  );
}
