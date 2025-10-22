import React from "react";
import HelpPage from "./HelpPage";

const CreatAcount: React.FC = () => {
  return (
    <HelpPage
      titulo="Como criar uma conta?"
      conteudo={[
        "Acesse a página de registro.",
        "Preencha os campos obrigatórios: nome, email, senha.",
        "Clique em 'Cadastrar'.",
        "Confirme seu email através do link enviado."
      ]}
      emailSuporte="suporte@associacaosalvacao.com"
    />
  );
};

export default CreatAcount;
