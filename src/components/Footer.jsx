import "../styles/header_footer.css";

function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 1 }}>
      <div className="footer-container">
        <div className="footer-about">
          <h3>Симулятор управління стартапом</h3>
          <p>
            Керуйте своїм стартапом, приймайте стратегічні рішення, залучайте інвесторів і адаптуйтеся до змін ринку.<br />
            Пам’ятайте: кожен успішний бізнес колись починався з простої ідеї!
          </p>
        </div>
        <div className="footer-contact">
          <h3>Зв'яжіться з нами</h3>
          <p>
            <img src="/assets/images/email.png" alt="Email Icon" className="footer-icon" />
            <span>startupsimulator@gmail.com</span>
          </p>
          <p>
            <img src="/assets/images/phone.png" alt="Phone Icon" className="footer-icon" />
            <span>+380930684431</span>
          </p>
          <p>
            <img src="/assets/images/location.png" alt="Location Icon" className="footer-icon" />
            <span>28 Stepan Bandera street, Lviv</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
