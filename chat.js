// Chat de IA para o site de POO em Java.
// Troque WORKER_URL pela URL do seu Cloudflare Worker.

(function () {
  "use strict";

  const WORKER_URL =
    "https://floral-shadow-0a19.bentoxrxr.workers.dev";

  const MAX_HISTORICO = 100;
  const MAX_CARACTERES = 10000;

  const PAGINAS_COM_CHAT = [
    "/aula_tres/"
  ];

  // ============================================================
  // VERIFICA A PÁGINA
  // ============================================================

  const podeMostrarChat =
    PAGINAS_COM_CHAT.some((pagina) =>
      window.location.pathname.includes(pagina)
    );

  if (!podeMostrarChat) {
    return;
  }

  // Evita criar o chat duas vezes caso o script seja carregado
  // novamente na mesma página.
  if (document.getElementById("poo-chat-botao")) {
    return;
  }

  // ============================================================
  // HISTÓRICO
  // ============================================================

  const CHAVE_HISTORICO =
    "poo_chat_historico";

  let historico = [];

  try {
    const salvo =
      localStorage.getItem(CHAVE_HISTORICO);

    if (salvo) {
      const convertido =
        JSON.parse(salvo);

      if (Array.isArray(convertido)) {
        historico = convertido;
      }
    }
  } catch (erro) {
    console.warn(
      "Não foi possível carregar o histórico:",
      erro
    );

    historico = [];
  }

  function salvarHistorico() {
    try {
      if (
        historico.length >
        MAX_HISTORICO
      ) {
        historico =
          historico.slice(
            -MAX_HISTORICO
          );
      }

      localStorage.setItem(
        CHAVE_HISTORICO,
        JSON.stringify(historico)
      );
    } catch (erro) {
      console.warn(
        "Não foi possível salvar o histórico:",
        erro
      );
    }
  }

  // ============================================================
  // BOTÃO PRINCIPAL
  // ============================================================

  const botao =
    document.createElement("button");

  botao.id =
    "poo-chat-botao";

  botao.type = "button";

  botao.title =
    "Abrir assistente";

  botao.setAttribute(
    "aria-label",
    "Abrir assistente"
  );

  document.body.appendChild(botao);

  // ============================================================
  // ESTILO DO BOTÃO E PAINEL
  // ============================================================

  const estilo =
    document.createElement("style");

  estilo.textContent = `

    /* ==========================================================
       BOTÃO
       ========================================================== */

    #poo-chat-botao {
      position: fixed !important;

      right: 12px !important;
      bottom: 12px !important;

      width: 70px !important;
      height: 70px !important;

      min-width: 70px !important;
      min-height: 70px !important;

      max-width: 70px !important;
      max-height: 70px !important;

      padding: 0 !important;
      margin: 0 !important;

      background: #ffffff !important;

      border: 2px solid transparent !important;

      border-radius: 50% !important;

      opacity: 0.18 !important;

      cursor: pointer !important;

      z-index: 999999 !important;

      box-sizing: border-box !important;

      appearance: none !important;
      -webkit-appearance: none !important;

      outline: none !important;

      transition:
        width 0.2s ease,
        height 0.2s ease,
        opacity 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease !important;
    }

    #poo-chat-botao:hover {
      width: 75px !important;
      height: 75px !important;

      min-width: 75px !important;
      min-height: 75px !important;

      max-width: 75px !important;
      max-height: 75px !important;

      opacity: 1 !important;

      background: #ffffff !important;

      border: 3px solid #000000 !important;

      box-shadow:
        0 0 0 1px #000000,
        0 0 10px rgba(0, 0, 0, 0.35) !important;
    }

    #poo-chat-botao:focus {
      outline: none !important;
    }

    #poo-chat-botao:active {
      transform: scale(0.95) !important;
    }


    /* ==========================================================
       PAINEL
       ========================================================== */

    #poo-chat-painel {
      position: fixed !important;

      right: 15px !important;
      bottom: 15px !important;

      width: 420px !important;
      height: 320px !important;

      display: none;

      flex-direction: column;

      background: #ffffff !important;

      border: 1px solid #cccccc !important;

      border-radius: 10px !important;

      box-shadow:
        0 5px 25px rgba(0, 0, 0, 0.2) !important;

      z-index: 999998 !important;

      font-family:
        Arial,
        Helvetica,
        sans-serif !important;

      overflow: hidden !important;

      box-sizing: border-box !important;
    }


    /* ==========================================================
       CABEÇALHO
       ========================================================== */

    #poo-chat-cabecalho {
      display: flex;

      align-items: center;

      justify-content: space-between;

      padding: 8px 10px;

      background: #f5f5f5;

      border-bottom:
        1px solid #dddddd;

      font-size: 13px;

      font-weight: bold;

      flex-shrink: 0;
    }


    /* ==========================================================
       BOTÃO FECHAR
       ========================================================== */

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


    /* ==========================================================
       ÁREA DE MENSAGENS
       ========================================================== */

    #poo-chat-mensagens {
      flex: 1;

      min-height: 0;

      overflow-y: auto;

      padding: 10px;

      background: #ffffff;
    }


    /* ==========================================================
       MENSAGENS
       ========================================================== */

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

      border:
        1px solid #eeeeee;

      margin-right: 40px;
    }


    /* ==========================================================
       BOTÃO COPIAR
       ========================================================== */

    .poo-chat-copiar {
      display: block;

      margin-top: 6px;

      padding: 3px 7px;

      border:
        1px solid #cccccc;

      border-radius: 4px;

      background: #ffffff;

      font-size: 11px;

      cursor: pointer;
    }

    .poo-chat-copiar:hover {
      background: #eeeeee;
    }


    /* ==========================================================
       ÁREA DO INPUT
       ========================================================== */

    #poo-chat-area-input {
      display: flex;

      gap: 6px;

      padding: 7px;

      border-top:
        1px solid #dddddd;

      background: #fafafa;

      flex-shrink: 0;
    }


    /* ==========================================================
       INPUT
       ========================================================== */

    #poo-chat-input {
      flex: 1;

      height: 42px;

      resize: none;

      padding: 7px;

      border:
        1px solid #cccccc;

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


    /* ==========================================================
       BOTÃO ENVIAR
       ========================================================== */

    #poo-chat-enviar {
      width: 65px;

      border:
        1px solid #cccccc;

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

  document.head.appendChild(estilo);

  // ============================================================
  // PAINEL
  // ============================================================

  const painel =
    document.createElement("div");

  painel.id =
    "poo-chat-painel";

  painel.innerHTML = `

    <div id="poo-chat-cabecalho">

      <span>
        Assistente de POO
      </span>

      <button
        id="poo-chat-fechar"
        type="button"
        title="Fechar"
      >
        ×
      </button>

    </div>

    <div
      id="poo-chat-mensagens"
    ></div>

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

  document.body.appendChild(
    painel
  );

  // ============================================================
  // ELEMENTOS
  // ============================================================

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

  // ============================================================
  // ADICIONAR MENSAGEM
  // ============================================================

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

    textoElemento.textContent =
      String(texto);

    mensagem.appendChild(
      textoElemento
    );

    // ----------------------------------------------------------
    // COPIAR
    // ----------------------------------------------------------

    if (
      mostrarBotaoCopiar &&
      tipo === "assistente"
    ) {
      const botaoCopiar =
        document.createElement("button");

      botaoCopiar.className =
        "poo-chat-copiar";

      botaoCopiar.type =
        "button";

      botaoCopiar.textContent =
        "Copiar";

      botaoCopiar.addEventListener(
        "click",
        async function () {

          try {

            if (
              navigator.clipboard &&
              navigator.clipboard.writeText
            ) {
              await navigator.clipboard.writeText(
                String(texto)
              );

            } else {

              throw new Error(
                "Clipboard API indisponível"
              );
            }

            botaoCopiar.textContent =
              "Copiado!";

          } catch (erro) {

            const area =
              document.createElement(
                "textarea"
              );

            area.value =
              String(texto);

            area.style.position =
              "fixed";

            area.style.left =
              "-9999px";

            area.style.top =
              "0";

            document.body.appendChild(
              area
            );

            area.focus();

            area.select();

            try {

              document.execCommand(
                "copy"
              );

              botaoCopiar.textContent =
                "Copiado!";

            } catch (erroCopia) {

              botaoCopiar.textContent =
                "Não foi possível copiar";
            }

            area.remove();
          }

          setTimeout(() => {
            botaoCopiar.textContent =
              "Copiar";
          }, 1200);
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

    return mensagem;
  }

  // ============================================================
  // RESTAURAR HISTÓRICO
  // ============================================================

  function carregarHistoricoNaTela() {

    mensagens.innerHTML = "";

    for (
      const mensagem of historico
    ) {

      if (
        !mensagem ||
        typeof mensagem.texto !==
          "string"
      ) {
        continue;
      }

      adicionarMensagem(
        mensagem.texto,
        mensagem.tipo,
        mensagem.tipo ===
          "assistente"
      );
    }
  }

  carregarHistoricoNaTela();

  // ============================================================
  // ABRIR / FECHAR
  // ============================================================

  botao.addEventListener(
    "click",
    function (evento) {

      evento.stopPropagation();

      if (
        painel.style.display ===
        "flex"
      ) {

        painel.style.display =
          "none";

      } else {

        painel.style.display =
          "flex";

        setTimeout(() => {
          input.focus();
        }, 50);
      }
    }
  );

  fechar.addEventListener(
    "click",
    function () {

      painel.style.display =
        "none";
    }
  );

  // ============================================================
  // FECHAR CLICANDO FORA
  // ============================================================

  document.addEventListener(
    "pointerdown",
    function (evento) {

      if (
        painel.style.display !==
        "flex"
      ) {
        return;
      }

      const clicouNoPainel =
        painel.contains(
          evento.target
        );

      const clicouNoBotao =
        botao.contains(
          evento.target
        );

      if (
        !clicouNoPainel &&
        !clicouNoBotao
      ) {

        painel.style.display =
          "none";
      }
    },
    true
  );

  // ============================================================
  // ENVIAR PERGUNTA
  // ============================================================

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

      adicionarMensagem(
        "A pergunta é muito grande.",
        "assistente",
        false
      );

      return;
    }

    // ----------------------------------------------------------
    // MOSTRA PERGUNTA
    // ----------------------------------------------------------

    input.value = "";

    adicionarMensagem(
      pergunta,
      "usuario",
      false
    );

    historico.push({
      tipo: "usuario",
      texto: pergunta
    });

    salvarHistorico();

    // ----------------------------------------------------------
    // BLOQUEIA ENVIO
    // ----------------------------------------------------------

    enviar.disabled = true;

    const carregando =
      adicionarMensagem(
        "Pensando...",
        "assistente",
        false
      );

    // ==========================================================
    // CHAMADA AO WORKER
    // ==========================================================

    try {

      const resposta =
        await fetch(
          WORKER_URL,
          {
            method: "POST",

            mode: "cors",

            headers: {
              "Content-Type":
                "application/json",

              "Accept":
                "application/json"
            },

            body: JSON.stringify({
              pergunta: pergunta,

              historico:
                historico
            })
          }
        );

      // --------------------------------------------------------
      // REMOVE "PENSANDO..."
      // --------------------------------------------------------

      if (
        carregando &&
        carregando.parentNode
      ) {
        carregando.remove();
      }

      // --------------------------------------------------------
      // ERRO HTTP
      // --------------------------------------------------------

      if (!resposta.ok) {

        let detalhes = "";

        try {
          detalhes =
            await resposta.text();
        } catch (erro) {
          detalhes = "";
        }

        throw new Error(
          "O Worker respondeu HTTP " +
          resposta.status +
          (
            detalhes
              ? " — " + detalhes.substring(0, 300)
              : ""
          )
        );
      }

      // --------------------------------------------------------
      // LÊ RESPOSTA
      // --------------------------------------------------------

      const textoRecebido =
        await resposta.text();

      if (!textoRecebido) {
        throw new Error(
          "O Worker retornou uma resposta vazia."
        );
      }

      let dados;

      try {

        dados =
          JSON.parse(
            textoRecebido
          );

      } catch (erroJSON) {

        throw new Error(
          "O Worker não retornou JSON válido. " +
          "Resposta recebida: " +
          textoRecebido.substring(
            0,
            300
          )
        );
      }

      // --------------------------------------------------------
      // PROCURA A RESPOSTA EM DIFERENTES FORMATOS
      // --------------------------------------------------------

      let textoResposta = null;

      if (
        typeof dados === "string"
      ) {

        textoResposta =
          dados;

      } else if (
        dados &&
        typeof dados.resposta ===
          "string"
      ) {

        textoResposta =
          dados.resposta;

      } else if (
        dados &&
        typeof dados.answer ===
          "string"
      ) {

        textoResposta =
          dados.answer;

      } else if (
        dados &&
        typeof dados.message ===
          "string"
      ) {

        textoResposta =
          dados.message;

      } else if (
        dados &&
        typeof dados.response ===
          "string"
      ) {

        textoResposta =
          dados.response;

      } else if (
        dados &&
        typeof dados.content ===
          "string"
      ) {

        textoResposta =
          dados.content;

      }

      // --------------------------------------------------------
      // NENHUMA RESPOSTA ENCONTRADA
      // --------------------------------------------------------

      if (
        !textoResposta ||
        !textoResposta.trim()
      ) {

        throw new Error(
          "O Worker respondeu, mas não encontrei o texto da resposta. " +
          "JSON recebido: " +
          JSON.stringify(dados).substring(
            0,
            500
          )
        );
      }

      textoResposta =
        textoResposta.trim();

      // --------------------------------------------------------
      // MOSTRA RESPOSTA
      // --------------------------------------------------------

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

      // --------------------------------------------------------
      // MOSTRA O ERRO REAL
      // --------------------------------------------------------

      console.error(
        "Erro completo no chat:",
        erro
      );

      if (
        carregando &&
        carregando.parentNode
      ) {
        carregando.remove();
      }

      let mensagemErro =
        "Erro ao conectar com o assistente.";

      if (
        erro &&
        erro.message
      ) {

        mensagemErro +=
          "\n\n" +
          erro.message;
      }

      adicionarMensagem(
        mensagemErro,
        "assistente",
        true
      );

    } finally {

      enviar.disabled = false;

      input.focus();
    }
  }

  // ============================================================
  // BOTÃO ENVIAR
  // ============================================================

  enviar.addEventListener(
    "click",
    enviarPergunta
  );

  // ============================================================
  // ENTER
  // ============================================================

  input.addEventListener(
    "keydown",
    function (evento) {

      // Enter envia.
      // Shift + Enter cria nova linha.

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
