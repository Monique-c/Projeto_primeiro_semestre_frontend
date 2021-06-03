/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

import "../../assets/styles/footer.css";

function Footer() {
  return (
    <footer className="footer container-footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a href="https://fatecsjc-prd.azurewebsites.net/" target="_blank">
                Fatec
              </a>
            </li>

            <li>
              <a href="/" target="_blank">
                Sobre nós
              </a>
            </li>
          </ul>
        </nav>

        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Desenvolvido por Alunos da{" "}
          <a href="https://fatecsjc-prd.azurewebsites.net/" target="_blank">
            Fatec São José dos Campos
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
