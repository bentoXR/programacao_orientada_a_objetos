(function () {
  const WORKER_URL = "https://floral-shadow-0a19.bentoxrxr.workers.dev";

  const MAX_HISTORICO = 100;
  const MAX_CARACTERES = 10000;

  const CHAVE_HISTORICO = "poo_chat_historico";

  const PAGINAS_COM_CHAT = [
    "/aula_tres/"
  ];

  if (!PAGINAS_COM_CHAT.some((pagina) => location.pathname.includes(pagina))) {
    return;
  }

  // =========================
  // HISTÓRICO
  // =========================

  let historico = [];

  try {
    const salvo = localStorage.getItem(CHAVE_HISTORICO);

    if (salvo) {
      const dados = JSON.parse(salvo);

      if (Array.isArray(dados)) {
        historico = dados
          .filter(
            (m) =>
              m &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string"
          )
          .slice(-MAX_HISTORICO);
      }
    }
  } catch (erro) {
    console.error("Erro ao carregar histórico:", erro);
    historico = [];
  }

  function salvarHistorico() {
    try {
      localStorage.setItem(
        CHAVE_HISTORICO,
        JSON.stringify(historico.slice(-MAX_HISTORICO))
      );
    } catch (erro) {
      console.error("Erro ao salvar histórico:", erro);
    }
  }

  // =========================
  // CSS
  // =========================

  const estilo = document.createElement("style");

  estilo.textContent = `
    #poo-chat-botao {
      position: fixed;
      right: 10px;
      bottom: 10px;

      width: 7px;
      height: 7px;

      padding: 0;
      border: none;
      border-radius: 50%;

      background: #ffffff;

      opacity: 0.04;

      cursor: pointer;

      z-index: 999999;

      transition:
        width 0.2s ease,
        height 0.2s ease,
        opacity 0.2s ease,
        box-shadow 0.2s ease;
    }

    #poo-chat-botao:hover {
      width: 13px;
      height: 13px;

      opacity: 0.7;

      box-shadow: 0 0 8px rgba(255,255,255,0.5);
    }

    #poo-chat-painel {
      position: fixed;

      right: 14px;
      bottom: 28px;

      width: 360px;
      max-width: calc(100vw - 28px);

      height: 500px;
      max-height: calc(100vh - 55px);

      background: #ffffff;

      border: 1px solid #ddd;
      border-radius: 14px;

      box-shadow: 0 8px 30px rgba(0,0,0,0.18);

      display: none;
      flex-direction: column;

      overflow: hidden;

      z-index: 999998;

      font-family: Arial, sans-serif;
    }

    #poo-chat-cabecalho {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 10px 14px;

      background: #f7f7f7;

      border-bottom: 1px solid #ddd;

      font-size: 14px;
      font-weight: bold;
    }

    #poo-chat-fechar {
      display: none;
    }

    #poo-chat-mensagens {
      flex: 1;

      overflow-y: auto;

      padding: 12px;

      display: flex;
      flex-direction: column;

      gap: 10px;

      background: #fff;
    }

    .poo-chat-mensagem-container {
      display: flex;
      flex-direction: column;

      max-width: 85%;

      gap: 4px;
    }

    .poo-chat-mensagem-container.user {
      align-self: flex-end;
    }

    .poo-chat-mensagem-container.ia {
      align-self: flex-start;
    }

    .poo-chat-mensagem {
      padding: 9px 11px;

      border-radius: 10px;

      font-size: 14px;

      line-height: 1.4;

      white-space: pre-wrap;

      word-wrap: break-word;
    }

    .poo-chat-user {
      background: #e9e9e9;

      color: #111;
    }

    .poo-chat-ia {
      background: #f5f5f5;

      color: #111;
    }

    .poo-chat-copiar {
      align-self: flex-start;

      border: none;

      background: transparent;

      color: #777;

      padding: 2px 5px;

      font-size: 11px;

      cursor: pointer;

      opacity: 0.7;

      transition: opacity 0.15s ease;
    }

    .poo-chat-copiar:hover {
      opacity: 1;

      color: #222;
    }

    #poo-chat-area {
      display: flex;

      gap: 8px;

      padding: 10px;

      border-top: 1px solid #ddd;

      background: #fff;
    }

    #poo-chat-input {
      flex: 1;

      resize: none;

      min-height: 42px;
      max-height: 120px;

      padding: 9px;

      border: 1px solid #ccc;
      border-radius: 8px;

      outline: none;

      font-family: inherit;
      font-size: 14px;
    }

    #poo-chat-input:focus {
      border-color: #999;
    }

    #poo-chat-enviar {
      border: none;

      border-radius: 8px;

      padding: 0 13px;

      background: #222;

      color: #fff;

      cursor: pointer;

      font-size: 13px;
    }

    #poo-chat-enviar:hover {
      background: #444;
    }

    #poo-chat-enviar:disabled {
      opacity: 0.5;

      cursor: default;
    }

    @media (max-width: 500px) {
      #poo-chat-painel {
        right: 8px;
        bottom: 25px;

        width: calc(100vw - 16px);

        height: 70vh;
      }

      #poo-chat-botao {
        right: 8px;
        bottom: 8px;
      }
    }
  `;

  document.head.appendChild(estilo);

  // =========================
  // BOTÃO
  // =========================

  const botao = document.createElement("button");

  botao.id = "poo-chat-botao";
  botao.setAttribute("aria-label", "Abrir assistente de POO");
  botao.title = "Abrir assistente";

  // =========================
  // PAINEL
  // =========================

  const painel = document.createElement("div");

  painel.id = "poo-chat-painel";

  const cabecalho = document.createElement("div");

  cabecalho.id = "poo-chat-cabecalho";

  cabecalho.innerHTML = `
    <span>Assistente de POO</span>
    <button id="poo-chat-fechar" aria-label="Fechar">×</button>
  `;

  const mensagens = document.createElement("div");

  mensagens.id = "poo-chat-mensagens";

  const area = document.createElement("div");

  area.id = "poo-chat-area";

  const input = document.createElement("textarea");

  input.id = "poo-chat-input";
  input.placeholder = "Cole o enunciado da atividade...";
  input.rows = 2;

  const enviar = document.createElement("button");

  enviar.id = "poo-chat-enviar";
  enviar.textContent = "Enviar";

  area.appendChild(input);
  area.appendChild(enviar);

  painel.appendChild(cabecalho);
  painel.appendChild(mensagens);
  painel.appendChild(area);

  document.body.appendChild(botao);
  document.body.appendChild(painel);

  // =========================
  // ADICIONAR MENSAGEM
  // =========================

  function adicionarMensagem(tipo, texto) {
    const container = document.createElement("div");

    container.className =
      "poo-chat-mensagem-container " + tipo;

    const div = document.createElement("div");

    div.className =
      "poo-chat-mensagem " +
      (tipo === "user"
        ? "poo-chat-user"
        : "poo-chat-ia");

    div.textContent = texto;

    container.appendChild(div);

    // Botão copiar somente para respostas da IA
    if (tipo === "ia") {
      const copiar = document.createElement("button");

      copiar.className = "poo-chat-copiar";
      copiar.textContent = "Copiar";

      copiar.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(texto);

          copiar.textContent = "Copiado!";

          setTimeout(() => {
            copiar.textContent = "Copiar";
          }, 1500);

        } catch (erro) {
          console.error("Erro ao copiar:", erro);

          // Fallback para navegadores que bloqueiam clipboard
          const areaTexto = document.createElement("textarea");

          areaTexto.value = texto;

          document.body.appendChild(areaTexto);

          areaTexto.select();

          try {
            document.execCommand("copy");

            copiar.textContent = "Copiado!";

            setTimeout(() => {
              copiar.textContent = "Copiar";
            }, 1500);

          } catch {
            copiar.textContent = "Erro ao copiar";

            setTimeout(() => {
              copiar.textContent = "Copiar";
            }, 1500);
          }

          areaTexto.remove();
        }
      });

      container.appendChild(copiar);
    }

    mensagens.appendChild(container);

    mensagens.scrollTop = mensagens.scrollHeight;

    return container;
  }

  // =========================
  // RESTAURAR HISTÓRICO
  // =========================

  if (historico.length > 0) {
    historico.forEach((mensagem) => {
      adicionarMensagem(
        mensagem.role === "user" ? "user" : "ia",
        mensagem.content
      );
    });
  } else {
    adicionarMensagem(
      "ia",
      "Olá! Envie o enunciado da atividade e eu resolvo em Java."
    );
  }

  // =========================
  // ABRIR CHAT
  // =========================

  botao.addEventListener("click", (evento) => {
    evento.stopPropagation();

    painel.style.display = "flex";

    input.focus();

    setTimeout(() => {
      mensagens.scrollTop = mensagens.scrollHeight;
    }, 50);
  });

  // =========================
  // FECHAR CLICANDO FORA
  // =========================

  document.addEventListener("click", (evento) => {
    if (
      painel.style.display === "flex" &&
      !painel.contains(evento.target) &&
      evento.target !== botao
    ) {
      painel.style.display = "none";
    }
  });

  painel.addEventListener("click", (evento) => {
    evento.stopPropagation();
  });

  // =========================
  // ENVIAR
  // =========================

  async function enviarMensagem() {
    const texto = input.value.trim();

    if (!texto) {
      return;
    }

    if (texto.length > MAX_CARACTERES) {
      adicionarMensagem(
        "ia",
        `A atividade é muito grande. O limite é de ${MAX_CARACTERES} caracteres.`
      );

      return;
    }

    input.value = "";

    input.disabled = true;
    enviar.disabled = true;

    historico.push({
      role: "user",
      content: texto
    });

    historico = historico.slice(-MAX_HISTORICO);

    salvarHistorico();

    adicionarMensagem("user", texto);

    const pensando = adicionarMensagem("ia", "Pensando...");

    try {
      const resposta = await fetch(WORKER_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          messages: historico.slice(-MAX_HISTORICO),
          pagina: location.pathname
        })
      });

      let dados;

      try {
        dados = await resposta.json();
      } catch {
        throw new Error("Resposta inválida do servidor.");
      }

      if (!resposta.ok) {
        throw new Error(
          dados?.error || "Erro ao consultar a IA."
        );
      }

      const respostaIA =
        typeof dados.reply === "string"
          ? dados.reply.trim()
          : "";

      if (!respostaIA) {
        throw new Error("A IA não retornou uma resposta.");
      }

      pensando.remove();

      historico.push({
        role: "assistant",
        content: respostaIA
      });

      historico = historico.slice(-MAX_HISTORICO);

      salvarHistorico();

      adicionarMensagem("ia", respostaIA);

    } catch (erro) {
      console.error("Erro no chat:", erro);

      pensando.querySelector?.(".poo-chat-mensagem");

      const textoErro = pensando.querySelector
        ? pensando.querySelector(".poo-chat-mensagem")
        : null;

      if (textoErro) {
        textoErro.textContent =
          "Não consegui responder agora. Tente novamente.";
      }

    } finally {
      input.disabled = false;
      enviar.disabled = false;

      input.focus();
    }
  }

  enviar.addEventListener("click", enviarMensagem);

  // Enter envia
  // Shift + Enter cria nova linha
  input.addEventListener("keydown", (evento) => {
    if (
      evento.key === "Enter" &&
      !evento.shiftKey
    ) {
      evento.preventDefault();

      enviarMensagem();
    }
  });

})();
