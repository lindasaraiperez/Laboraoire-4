'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container">
            <Link href="/" className="navbar-brand">
              <img src="/assets/logo.jpg" alt="Logo" className="logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link href="#" className="nav-link">Accueil</Link>
                </li>
                <li className="nav-item">
                  <Link href="#" className="nav-link">Articles</Link>
                </li>
                <li className="nav-item">
                  <Link href="#" className="nav-link">Services</Link>
                </li>
                <li className="nav-item">
                  <Link href="#" className="nav-link">Contact</Link>
                </li>
                <li className="nav-item">
                <Link 
                  href="/blog/add" 
                  className={`nav-link ${pathname === '/blog/add' ? 'active' : ''}`}
                >
                  Nouvel Article
                </Link>
              </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link href="#" className="nav-link">
                    <i className="bi bi-person-circle icon-user"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="container">
        <div className="search-sort d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <input
            type="text"
            className="form-control search-bar w-100 w-md-50 mb-2 mb-md-0"
            placeholder="Rechercher..."
          />
          <div className="sort d-flex align-items-center gap-2 w-100 w-md-50">
            <label htmlFor="sort" className="mb-0 w-25 text-end">Trier par :</label>
            <select id="sort" className="form-select w-75 custom-select">
              <option value="recent">Récent</option>
              <option value="populaire">Populaire</option>
            </select>
          </div>
        </div>
      </main>
    </>
  );
}
