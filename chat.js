// Chat de IA para o site de POO em Java.
// Troque WORKER_URL pela URL do seu Cloudflare Worker.

(function () {
  const WORKER_URL = "https://floral-shadow-0a19.bentoxrxr.workers.dev";

  const MAX_HISTORICO = 100;
  const MAX_CARACTERES = 10000;

  // O chat só aparece nas páginas cujo endereço contém estes trechos.
  const PAGINAS_COM_CHAT = [
    "/aula_tres/"
  ];

  // ------------------------------------------------------------
  // VERIFICA SE A PÁGINA ATUAL PODE TER O CHAT
  // ------------------------------------------------------------

  const podeMostrarChat = PAGINAS_COM_CHAT.some((pagina) =>
    window.location.pathname.includes(pagina)
  );

  if (!podeMostrarChat) {
    return;
  }

  // ------------------------------------------------------------
  // HISTÓRICO
  // ------------------------------------------------------------

  const CHAVE_HISTORICO = "poo_chat_historico";

  let historico = [];

  try {
    const salvo = localStorage.getItem(CHAVE_HISTORICO);

    if (salvo) {
      historico = JSON.parse(salvo);

      if (!Array.isArray(historico)) {
        historico = [];
      }
    }
  } catch (erro) {
    historico = [];
  }

  function salvarHistorico() {
    try {
      if (historico.length > MAX_HISTORICO) {
        historico = historico.slice(-MAX_HISTORICO);
      }

      localStorage.setItem(
        CHAVE_HISTORICO,
        JSON.stringify(historico)
      );
    } catch (erro) {
      console.warn("Não foi possível salvar o histórico:", erro);
    }
  }

  // ------------------------------------------------------------
  // BOTÃO PRINCIPAL
  // ------------------------------------------------------------

  const botao = document.createElement("button");

  botao.id = "poo-chat-botao";
  botao.title = "Abrir assistente";
  botao.setAttribute("aria-label", "Abrir assistente");

  document.body.appendChild(botao);

  // ------------------------------------------------------------
  // ESTILO DO BOTÃO
  // ------------------------------------------------------------

  const estiloBotao = document.createElement("style");

  estiloBotao.textContent = `
    #poo-chat-botao {
      width: 70px !important;
      height: 70px !important;

      min-width: 70px !important;
      min-height: 70px !important;

      max-width: 70px !important;
      max-height: 70px !important;

      transition: all 0.3s ease !important;
    }

    #poo-chat-botao:hover {
      width: 75px !important;
      height: 75px !important;

      min-width: 75px !important;
      min-height: 75px !important;

      max-width: 75px !important;
      max-height: 75px !important;

      background-color: #000000 !important;
      color: #ffffff !important;
      border: 3px solid #000000 !important;
    }

    #poo-chat-botao:focus {
      outline: none !important;
    }

    #poo-chat-botao:active {
      transform: scale(0.92) !important;
    }

    /* ----------------------------------------------------------
        PAINEL
        ---------------------------------------------------------- */

    #poo-chat-painel {
      position: fixed;

      right: 15px;
      bottom: 15px;

      width: 420px;
      height: 320px;

      display: none;
      flex-direction: column;

      background: #ffffff;

      border: 1px solid #cccccc;
      border-radius: 10px;

      box-shadow:
        0 5px 25px rgba(0, 0, 0, 0.2);

      z-index: 999998;

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      overflow: hidden;

      box-sizing: border-box;
    }

    #poo-chat-cabecalho {
      display: flex;

      align-items: center;
      justify-content: space-between;

      padding: 8px 10px;

      background: #f5f5f5;

      border-bottom: 1px solid #dddddd;

      font-size: 13px;
      font-weight: bold;

      flex-shrink: 0;
    }

    #poo-chat-fechar {
      width: 24px;
      height: 24px;

      padding: 0;

      border: none;
      border-radius: 5px;

      background: transparent;

      font-size: 20px;
      line-height: 20px;

      cursor: pointer;
    }

    #poo-chat-fechar:hover {
      background: #dddddd;
    }

    #poo-chat-mensagens {
      flex: 1;

      overflow-y: auto;

      padding: 10px;

      background: #ffffff;

      min-height: 0;
    }

    .poo-chat-mensagem {
      margin-bottom: 10px;

      padding: 8px 10px;

      border-radius: 8px;

      font-size: 13px;
      line-height: 1.4;

      white-space: pre-wrap;

      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .poo-chat-usuario {
      background: #eeeeee;

      margin-left: 40px;
    }

    .poo-chat-assistente {
      background: #f7f7f7;

      border: 1px solid #eeeeee;

      margin-right: 40px;
    }

    .poo-chat-copiar {
      display: block;

      margin-top: 6px;

      padding: 3px 7px;

      border: 1px solid #cccccc;
      border-radius: 4px;

      background: #ffffff;

      font-size: 11px;

      cursor: pointer;
    }

    .poo-chat-copiar:hover {
      background: #eeeeee;
    }

    #poo-chat-area-input {
      display: flex;

      gap: 6px;

      padding: 7px;

      border-top: 1px solid #dddddd;

      background: #fafafa;

      flex-shrink: 0;
    }

    #poo-chat-input {
      flex: 1;

      height: 42px;

      resize: none;

      padding: 7px;

      border: 1px solid #cccccc;
      border-radius: 6px;

      outline: none;

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      font-size: 13px;

      box-sizing: border-box;
    }

    #poo-chat-input:focus {
      border-color: #888888;
    }

    #poo-chat-enviar {
      width: 65px;

      border: 1px solid #cccccc;
      border-radius: 6px;

      background: #ffffff;

      cursor: pointer;

      font-size: 12px;
    }

    #poo-chat-enviar:hover {
      background: #eeeeee;
    }

    #poo-chat-enviar:disabled {
      opacity: 0.5;

      cursor: default;
    }
  `;

  document.head.appendChild(estiloBotao);

  // ------------------------------------------------------------
  // PAINEL
  // ------------------------------------------------------------

  const painel = document.createElement("div");

  painel.id = "poo-chat-painel";

  painel.innerHTML = `
    <div id="poo-chat-cabecalho">
      <span>Assistente de POO</span>

      <button
        id="poo-chat-fechar"
        type="button"
        title="Fechar"
      >
        ×
      </button>
    </div>

    <div id="poo-chat-mensagens"></div>

    <div id="poo-chat-area-input">
      <textarea
        id="poo-chat-input"
        placeholder="Cole a questão aqui..."
        maxlength="${MAX_CARACTERES}"
      ></textarea>

      <button
        id="poo-chat-enviar"
        type="button"
      >
        Enviar
      </button>
    </div>
  `;

  document.body.appendChild(painel);

  // ------------------------------------------------------------
  // ELEMENTOS
  // ------------------------------------------------------------

  const mensagens =
    document.getElementById(
      "poo-chat-mensagens"
    );

  const input =
    document.getElementById(
      "poo-chat-input"
    );

  const enviar =
    document.getElementById(
      "poo-chat-enviar"
    );

  const fechar =
    document.getElementById(
      "poo-chat-fechar"
    );

  // ------------------------------------------------------------
  // ADICIONAR MENSAGEM NA TELA
  // ------------------------------------------------------------

  function adicionarMensagem(
    texto,
    tipo,
    mostrarBotaoCopiar = false
  ) {
    const mensagem =
      document.createElement("div");

    mensagem.className =
      "poo-chat-mensagem " +
      (
        tipo === "usuario"
          ? "poo-chat-usuario"
          : "poo-chat-assistente"
      );

    const textoElemento =
      document.createElement("div");

    textoElemento.textContent = texto;

    mensagem.appendChild(
      textoElemento
    );

    // ----------------------------------------------------------
    // BOTÃO COPIAR
    // ----------------------------------------------------------

    if (
      mostrarBotaoCopiar &&
      tipo === "assistente"
    ) {
      const botaoCopiar =
        document.createElement("button");

      botaoCopiar.className =
        "poo-chat-copiar";

      botaoCopiar.type = "button";

      botaoCopiar.textContent =
        "Copiar";

      botaoCopiar.addEventListener(
        "click",
        async () => {
          try {
            await navigator.clipboard.writeText(
              texto
            );

            botaoCopiar.textContent =
              "Copiado!";

            setTimeout(() => {
              botaoCopiar.textContent =
                "Copiar";
            }, 1200);

          } catch (erro) {
            const area =
              document.createElement(
                "textarea"
              );

            area.value = texto;

            area.style.position =
              "fixed";

            area.style.left =
              "-9999px";

            document.body.appendChild(
              area
            );

            area.select();

            try {
              document.execCommand(
                "copy"
              );

              botaoCopiar.textContent =
                "Copiado!";

              setTimeout(() => {
                botaoCopiar.textContent =
                  "Copiar";
              }, 1200);

            } catch (erroCopia) {
              botaoCopiar.textContent =
                "Erro ao copiar";

              setTimeout(() => {
                botaoCopiar.textContent =
                  "Copiar";
              }, 1200);
            }

            area.remove();
          }
        }
      );

      mensagem.appendChild(
        botaoCopiar
      );
    }

    mensagens.appendChild(
      mensagem
    );

    mensagens.scrollTop =
      mensagens.scrollHeight;
  }

  // ------------------------------------------------------------
  // RESTAURAR HISTÓRICO
  // ------------------------------------------------------------

  function carregarHistoricoNaTela() {
    mensagens.innerHTML = "";

    for (const mensagem of historico) {
      adicionarMensagem(
        mensagem.texto,
        mensagem.tipo,
        mensagem.tipo === "assistente"
      );
    }
  }

  carregarHistoricoNaTela();

  // ------------------------------------------------------------
  // ABRIR / FECHAR
  // ------------------------------------------------------------

  botao.addEventListener(
    "click",
    (evento) => {
      evento.stopPropagation();

      if (
        painel.style.display === "flex"
      ) {
        painel.style.display = "none";
      } else {
        painel.style.display = "flex";

        setTimeout(() => {
          input.focus();
        }, 50);
      }
    }
  );

  fechar.addEventListener(
    "click",
    () => {
      painel.style.display = "none";
    }
  );

  // ------------------------------------------------------------
  // FECHAR CLICANDO EM QUALQUER LUGAR FORA
  // ------------------------------------------------------------

  document.addEventListener(
    "pointerdown",
    (evento) => {
      if (
        painel.style.display !== "flex"
      ) {
        return;
      }

      const clicouNoPainel =
        painel.contains(evento.target);

      const clicouNoBotao =
        botao.contains(evento.target);

      if (
        !clicouNoPainel &&
        !clicouNoBotao
      ) {
        painel.style.display = "none";
      }
    },
    true
  );

  // ------------------------------------------------------------
  // ENVIAR PERGUNTA
  // ------------------------------------------------------------

  async function enviarPergunta() {
    const pergunta =
      input.value.trim();

    if (!pergunta) {
      return;
    }

    if (
      pergunta.length >
      MAX_CARACTERES
    ) {
      alert(
        "A pergunta é muito grande."
      );

      return;
    }

    input.value = "";

    adicionarMensagem(
      pergunta,
      "usuario"
    );

    historico.push({
      tipo: "usuario",
      texto: pergunta
    });

    salvarHistorico();

    enviar.disabled = true;

    // ----------------------------------------------------------
    // CARREGANDO
    // ----------------------------------------------------------

    const carregando =
      document.createElement("div");

    carregando.className =
      "poo-chat-mensagem poo-chat-assistente";

    carregando.textContent =
      "Pensando...";

    mensagens.appendChild(
      carregando
    );

    mensagens.scrollTop =
      mensagens.scrollHeight;

    // ----------------------------------------------------------
    // REQUISIÇÃO AO WORKER
    // ----------------------------------------------------------

    try {
      const resposta =
        await fetch(
          WORKER_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              pergunta: pergunta,
              historico: historico
            })
          }
        );

      if (!resposta.ok) {
        throw new Error(
          "Erro HTTP " +
          resposta.status
        );
      }

      const dados =
        await resposta.json();

      carregando.remove();

      const textoResposta =
        dados.resposta ||
        dados.answer ||
        dados.message ||
        "Não foi possível obter uma resposta.";

      adicionarMensagem(
        textoResposta,
        "assistente",
        true
      );

      historico.push({
        tipo: "assistente",
        texto: textoResposta
      });

      salvarHistorico();

    } catch (erro) {
      console.error(
        "Erro no chat:",
        erro
      );

      carregando.remove();

      const mensagemErro =
        "Não foi possível obter a resposta. Tente novamente.";

      adicionarMensagem(
        mensagemErro,
        "assistente",
        true
      );

      historico.push({
        tipo: "assistente",
        texto: mensagemErro
      });

      salvarHistorico();

    } finally {
      enviar.disabled = false;

      input.focus();
    }
  }

  // ------------------------------------------------------------
  // EVENTOS
  // ------------------------------------------------------------

  enviar.addEventListener(
    "click",
    enviarPergunta
  );

  input.addEventListener(
    "keydown",
    (evento) => {
      // Enter envia.
      // Shift + Enter cria uma nova linha.

      if (
        evento.key === "Enter" &&
        !evento.shiftKey
      ) {
        evento.preventDefault();

        enviarPergunta();
      }
    }
  );

})();
