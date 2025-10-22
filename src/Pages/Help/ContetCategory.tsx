import React from "react";
import HelpPage from "./HelpPage";

const ContetCategory: React.FC = () => {
  return (
    <HelpPage
      titulo="Como acessar as categorias de conteúdo?"
      conteudo={[
        "Faça login na sua conta.",
        "No menu principal, clique em 'Categorias'.",
        "Escolha a categoria desejada para acessar os conteúdos disponíveis."
      ]}
      emailSuporte="suporte@associacaosalvacao.com"
    />
  );
};

export default ContetCategory;
