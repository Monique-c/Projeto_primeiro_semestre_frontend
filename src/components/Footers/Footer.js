/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function Footer() {
  return (
    <div className='footer-container'>
      <footer className="footer" data-background-color="black">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  href="https://fatecsjc-prd.azurewebsites.net/"
                  target="_blank"
                >
                  Fatec
              </a>
              </li>

              <li>
                <a
                  href="/"
                  target="_blank"
                >
                  Sobre nós
              </a>
              </li>
            </ul>
          </nav>

          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, {" "}
          Desenvolvido por Alunos da {" "}
            <a
              href="https://fatecsjc-prd.azurewebsites.net/"
              target="_blank"
            >
              Fatec São José dos Campos
          </a>
          .
        </div>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
