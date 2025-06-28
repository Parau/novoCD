import { sendGTMEvent } from '@next/third-parties/google';

/**
 * ===================================================================
 * Constantes de Rastreamento (O Dicionário de Dados)
 * ===================================================================
 */
export const parametersConstants = {
  // ONDE o clique aconteceu?
  elementLocation: {
    GUIDENTOOLS_HOME: 'guide_and_tools_home',
    //BLOG_POST_LIST: 'blog_post_list', // Exemplo de uso futuro
    //FOOTER_LINKS: 'footer_links', // Exemplo de uso futuro
  },
  // QUE TIPO de elemento foi clicado?
  elementType: {
    NAVIGATION_BUTTON: 'navigation_button',
    //BLOG_PROMO: 'blog_post_promo', // Exemplo de uso futuro
  },
  // Ainda é exemplo, não usei este tracking no analytics ainda
  //  **EXEMPLO DE REUTILIZAÇÃO CORRETA DE PARÂMETRO**
  method: {
    // Métodos de Login/Signup
    GOOGLE: 'google',
    EMAIL: 'email',
    // Métodos de Compartilhamento
    WHATSAPP: 'whatsapp',
    FACEBOOK: 'facebook',
    COPY_LINK: 'copy_link',
  },
  // QUAL O TIPO de conteúdo está sendo compartilhado?
  contentTypes: {
    BLOG_POST: 'blog_post',
    TOOL: 'tool',
    GUIDE: 'guide',
  }
};


/**
 * ===================================================================
 * Mapa de Eventos GTM
 * ===================================================================
 */
export const gtmEventMap = {
  // Evento para todos os cliques rastreáveis
  elementClick: {
    event: "element_click",
    parameters: {
      elementLocation: "element_location",
      elementType: "element_type",
      elementText: "element_text",
      linkUrl: "link_url"
    }
  },

  //ESTES AINDA COMO EXEMPLO, NÃO FORAM IMPLEMENTADOS NO ANALYTICS
    // Evento para quando um usuário efetua login
    login: {
      event: "login", // Nome de evento padrão do GA4, ótimo usar!
      parameters: {
        method: "method" // Parâmetro padrão do GA4, também ótimo!
      }
    },
    
    // Evento para quando um usuário compartilha conteúdo
    share: {
      event: "share", // Nome de evento padrão do GA4
      parameters: {
        method: "method", // Reutilizando o parâmetro 'method'
        contentType: "content_type" // Parâmetro padrão do GA4
      }
    }
};

/**
 * ===================================================================
 * A API PÚBLICA DE TRACKING
 * ===================================================================
 */
/**
 * Rastreia um clique em um elemento de UI interativo.
 * Esta função encapsula toda a complexidade de montar o payload.
 * @param params - Os dados variáveis sobre o clique.
 */
interface ElementClickParams {
  location: string; // Deve ser um valor de parametersConstants.locations
  type: string;     // Deve ser um valor de parametersConstants.elementTypes
  text: string;     // Texto dinâmico
  url: string;      // URL dinâmica
}
export function trackElementClick(params: ElementClickParams): void {
  const eventDefinition = gtmEventMap.elementClick;

  const payload = {
    event: eventDefinition.event,
    [eventDefinition.parameters.elementLocation]: params.location,
    [eventDefinition.parameters.elementType]: params.type,
    [eventDefinition.parameters.elementText]: params.text,
    [eventDefinition.parameters.linkUrl]: params.url,
  };

  sendGTMEvent(payload);
}

/**
 * Exemplo de como as outras funções ficariam nesta biblioteca:
 */

interface LoginParams {
  method: string; // ex: parametersConstants.methods.GOOGLE
}

export function trackLogin(params: LoginParams): void {
  const eventDefinition = gtmEventMap.login;
  const payload = {
    event: eventDefinition.event,
    [eventDefinition.parameters.method]: params.method,
  };
  sendGTMEvent(payload);
}