export const classesPalavras = (palavra) => {

    let presenter = palavra;
    presenter = palavra == "palavras_CCVC" ? "Padrão CCVC" : presenter;
    presenter = palavra == "palavras_CVVC" ? "Padrão CVVC" : presenter;
    presenter = palavra == "palavras_CVV" ? "Padrão CVV" : presenter;
    presenter = palavra == "palavras_CCV" ? "Padrão CCV" : presenter;
    presenter = palavra == "palavras_CV" ? "Padrão CV" : presenter;
    presenter = palavra == "palavras_CVC" ? "Padrão CVC" : presenter;
    presenter = palavra == "palavras_VC" ? "Padrão VC" : presenter;

    presenter = palavra == "p_palavras_CCVC" ? "Padrão CCVC" : presenter;
    presenter = palavra == "p_palavras_CVVC" ? "Padrão CVVC" : presenter;
    presenter = palavra == "p_palavras_CVV" ? "Padrão CVV" : presenter;
    presenter = palavra == "p_palavras_CCV" ? "Padrão CCV" : presenter;
    presenter = palavra == "p_palavras_CV" ? "Padrão CV" : presenter;
    presenter = palavra == "p_palavras_CVC" ? "Padrão CVC" : presenter;
    presenter = palavra == "p_palavras_VC" ? "Padrão VC" : presenter;

    return presenter;

}