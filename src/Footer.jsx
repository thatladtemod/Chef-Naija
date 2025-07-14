export default function Footer() {

    return (
      <footer>
        <div className="rule"></div>
        <p className="footer-message">
          &copy; {new Date().getFullYear()} Chef Naija. Made with ❤️ for Nigerian food lovers
          worldwide.
        </p>
      </footer>
    );
}