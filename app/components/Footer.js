'use client';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
 
export default function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="#">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      
      <p className="footer-description">Centre d’Expertise et de Perfectionnement en Informatique</p>
      <p className="footer-description">2025</p>
    </footer>
  );
}
