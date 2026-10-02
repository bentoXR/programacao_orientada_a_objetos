// Chat de IA para o site de POO em Java.
(function () {
  "use strict";

  const WORKER_URL = "https://floral-shadow-0a19.bentoxrxr.workers.dev";
  const MAX_HISTORICO = 100;      // quantas mensagens ficam salvas no navegador
  const MAX_ENVIADAS = 30;        // quantas mensagens vão para a IA a cada pergunta
  const MAX_CARACTERES = 10000;   // o Worker aceita até 20000
  const PAGINAS_COM_CHAT = ["/aula_tres/"];

  if (!PAGINAS_COM_CHAT.some((p) => window.location.pathname.includes(p))) return;
  if (document.getElementById("poo-chat-botao")) return;

  // ---------------- HISTÓRICO ----------------
  const CHAVE_HISTORICO = "poo_chat_historico";
  let historico = [];
  try {
    const salvo = localStorage.getItem(CHAVE_HISTORICO);
    if (salvo) {
      const convertido = JSON.parse(salvo);
      if (Array.isArray(convertido)) historico = convertido;
    }
  } catch (erro) {
    console.warn("Não foi possível carregar o histórico:", erro);
  }

  function salvarHistorico() {
    try {
      if (historico.length > MAX_HISTORICO) historico = historico.slice(-MAX_HISTORICO);
      localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
    } catch (erro) {
      console.warn("Não foi possível salvar o histórico:", erro);
    }
  }

  // Converte o histórico para o formato [{role, content}] com papéis alternados,
  // começando e terminando com o usuário.
  function montarMensagens() {
    const lista = [];
    for (const m of historico.slice(-MAX_ENVIADAS)) {
      if (!m || typeof m.texto !== "string" || !m.texto.trim()) continue;
      const role = m.tipo === "assistente" ? "assistant" : "user";
      const texto = m.texto.slice(0, MAX_CARACTERES);
      const ultima = lista[lista.length - 1];
      if (ultima && ultima.role === role) ultima.content += "\n\n" + texto;
      else lista.push({ role: role, content: texto });
    }
    while (lista.length && lista[0].role !== "user") lista.shift();
    return lista;
  }

  // ---------------- BOTÃO ----------------
  const botao = document.createElement("button");
  botao.id = "poo-chat-botao";
  botao.type = "button";
  botao.title = "Abrir assistente";
  botao.setAttribute("aria-label", "Abrir assistente");
  document.body.appendChild(botao);

  // ---------------- ESTILO ----------------
  const estilo = document.createElement("style");
  estilo.textContent = `
    #poo-chat-botao{position:fixed!important;right:12px!important;bottom:12px!important;
      width:70px!important;height:70px!important;min-width:70px!important;min-height:70px!important;
      max-width:70px!important;max-height:70px!important;padding:0!important;margin:0!important;
      background:#fff!important;border:2px solid transparent!important;border-radius:50%!important;
      opacity:.18!important;cursor:pointer!important;z-index:999999!important;box-sizing:border-box!important;
      appearance:none!important;-webkit-appearance:none!important;outline:none!important;
      transition:width .2s ease,height .2s ease,opacity .2s ease,border-color .2s ease,box-shadow .2s ease!important}
    #poo-chat-botao:hover{width:75px!important;height:75px!important;min-width:75px!important;min-height:75px!important;
      max-width:75px!important;max-height:75px!important;opacity:1!important;background:#fff!important;
      border:3px solid #000!important;box-shadow:0 0 0 1px #000,0 0 10px rgba(0,0,0,.35)!important}
    #poo-chat-botao:focus{outline:none!important}
    #poo-chat-botao:active{transform:scale(.95)!important}
    #poo-chat-painel{position:fixed!important;right:15px!important;bottom:15px!important;
      width:420px!important;max-width:calc(100vw - 30px)!important;height:380px!important;display:none;
      flex-direction:column;background:#fff!important;color:#222!important;border:1px solid #ccc!important;
      border-radius:10px!important;box-shadow:0 5px 25px rgba(0,0,0,.2)!important;z-index:999998!important;
      font-family:Arial,Helvetica,sans-serif!important;overflow:hidden!important;box-sizing:border-box!important}
    #poo-chat-cabecalho{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;
      background:#f5f5f5;border-bottom:1px solid #ddd;font-size:13px;font-weight:bold;flex-shrink:0}
    #poo-chat-fechar{width:24px;height:24px;padding:0;border:none;border-radius:5px;background:transparent;
      font-size:20px;line-height:20px;cursor:pointer}
    #poo-chat-fechar:hover{background:#ddd}
    #poo-chat-mensagens{flex:1;min-height:0;overflow-y:auto;padding:10px;background:#fff}
    .poo-chat-mensagem{margin-bottom:10px;padding:8px 10px;border-radius:8px;font-size:13px;line-height:1.4;
      white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word}
    .poo-chat-usuario{background:#eee;margin-left:40px}
    .poo-chat-assistente{background:#f7f7f7;border:1px solid #eee;margin-right:40px}
    .poo-chat-copiar{display:block;margin-top:6px;padding:3px 7px;border:1px solid #ccc;border-radius:4px;
      background:#fff;font-size:11px;cursor:pointer}
    .poo-chat-copiar:hover{background:#eee}
    #poo-chat-area-input{display:flex;gap:6px;padding:7px;border-top:1px solid #ddd;background:#fafafa;flex-shrink:0}
    #poo-chat-input{flex:1;height:42px;resize:none;padding:7px;border:1px solid #ccc;border-radius:6px;outline:none;
      font-family:Arial,Helvetica,sans-serif;font-size:13px;box-sizing:border-box}
    #poo-chat-input:focus{border-color:#888}
    #poo-chat-enviar{width:65px;border:1px solid #ccc;border-radius:6px;background:#fff;cursor:pointer;font-size:12px}
    #poo-chat-enviar:hover{background:#eee}
    #poo-chat-enviar:disabled{opacity:.5;cursor:default}
    #poo-chat-anexar{width:36px;border:1px solid #ccc;border-radius:6px;background:#fff;cursor:pointer;font-size:16px}
    #poo-chat-anexar:hover{background:#eee}
    #poo-chat-chip{display:none;align-items:center;gap:6px;padding:4px 10px;background:#fafafa;
      border-top:1px solid #ddd;font-size:12px;flex-shrink:0}
    #poo-chat-chip-nome{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    #poo-chat-chip-x{border:none;background:transparent;cursor:pointer;font-size:16px}
  `;
  document.head.appendChild(estilo);

  // ---------------- PAINEL ----------------
  const painel = document.createElement("div");
  painel.id = "poo-chat-painel";
  painel.innerHTML = `
    <div id="poo-chat-cabecalho">
      <span>Assistente de POO</span>
      <button id="poo-chat-fechar" type="button" title="Fechar">×</button>
    </div>
    <div id="poo-chat-mensagens"></div>
    <div id="poo-chat-chip">
      <span id="poo-chat-chip-nome"></span>
      <button id="poo-chat-chip-x" type="button" title="Remover arquivo">×</button>
    </div>
    <div id="poo-chat-area-input">
      <input id="poo-chat-arquivo" type="file" accept="application/pdf,image/*" hidden>
      <button id="poo-chat-anexar" type="button" title="Anexar PDF ou imagem">📎</button>
      <textarea id="poo-chat-input" placeholder="Cole a questão ou anexe um PDF/imagem..." maxlength="${MAX_CARACTERES}"></textarea>
      <button id="poo-chat-enviar" type="button">Enviar</button>
    </div>`;
  document.body.appendChild(painel);

  const mensagens = document.getElementById("poo-chat-mensagens");
  const input = document.getElementById("poo-chat-input");
  const enviar = document.getElementById("poo-chat-enviar");
  const fechar = document.getElementById("poo-chat-fechar");
  const anexar = document.getElementById("poo-chat-anexar");
  const inputArquivo = document.getElementById("poo-chat-arquivo");
  const chip = document.getElementById("poo-chat-chip");
  const chipNome = document.getElementById("poo-chat-chip-nome");
  const chipX = document.getElementById("poo-chat-chip-x");

  // ---------------- ARQUIVO ANEXADO ----------------
  const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
  let arquivoAnexado = null;

  function definirArquivo(f) {
    if (!f) return;
    const ok = f.type === "application/pdf" || /^image\/(png|jpe?g|webp|heic|heif)$/.test(f.type);
    if (!ok) {
      adicionarMensagem("Formato não suportado. Envie PDF, PNG, JPG ou WEBP.", "assistente", false);
      return;
    }
    if (f.size > MAX_BYTES) {
      adicionarMensagem("Arquivo muito grande. O máximo é 10 MB.", "assistente", false);
      return;
    }
    arquivoAnexado = f;
    chipNome.textContent = "📎 " + f.name;
    chip.style.display = "flex";
  }

  function limparArquivo() {
    arquivoAnexado = null;
    inputArquivo.value = "";
    chip.style.display = "none";
  }

  function lerBase64(f) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.onload = () => resolve(String(leitor.result).split(",")[1]);
      leitor.onerror = () => reject(new Error("Não consegui ler o arquivo."));
      leitor.readAsDataURL(f);
    });
  }

  anexar.addEventListener("click", () => inputArquivo.click());
  inputArquivo.addEventListener("change", () => definirArquivo(inputArquivo.files[0]));
  chipX.addEventListener("click", limparArquivo);
  // Colar uma imagem (Ctrl+V) também anexa
  input.addEventListener("paste", function (e) {
    const arquivos = e.clipboardData && e.clipboardData.files;
    if (arquivos && arquivos.length) {
      e.preventDefault();
      definirArquivo(arquivos[0]);
    }
  });

  // Arrastar e soltar: solte o arquivo em qualquer lugar da página
  function temArquivos(e) {
    return e.dataTransfer && Array.from(e.dataTransfer.types || []).includes("Files");
  }
  document.addEventListener("dragover", function (e) {
    if (!temArquivos(e)) return;
    e.preventDefault(); // permite soltar e evita que o navegador abra o PDF
    painel.style.display = "flex";
    painel.style.outline = "3px dashed #000";
  });
  document.addEventListener("dragleave", function (e) {
    if (!e.relatedTarget) painel.style.outline = "";
  });
  document.addEventListener("drop", function (e) {
    if (!temArquivos(e)) return;
    e.preventDefault();
    painel.style.outline = "";
    const arquivos = e.dataTransfer.files;
    if (arquivos.length > 1) {
      adicionarMensagem("Só dá para anexar um arquivo por vez. Usei o primeiro: " + arquivos[0].name, "assistente", false);
    }
    definirArquivo(arquivos[0]);
    input.focus();
  });

  // ---------------- MENSAGENS ----------------
  function adicionarMensagem(texto, tipo, mostrarBotaoCopiar) {
    const mensagem = document.createElement("div");
    mensagem.className = "poo-chat-mensagem " + (tipo === "usuario" ? "poo-chat-usuario" : "poo-chat-assistente");

    const textoElemento = document.createElement("div");
    textoElemento.textContent = String(texto);
    mensagem.appendChild(textoElemento);

    if (mostrarBotaoCopiar && tipo === "assistente") {
      const botaoCopiar = document.createElement("button");
      botaoCopiar.className = "poo-chat-copiar";
      botaoCopiar.type = "button";
      botaoCopiar.textContent = "Copiar";
      botaoCopiar.addEventListener("click", async function () {
        try {
          if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("sem clipboard");
          await navigator.clipboard.writeText(String(texto));
          botaoCopiar.textContent = "Copiado!";
        } catch (erro) {
          const area = document.createElement("textarea");
          area.value = String(texto);
          area.style.position = "fixed";
          area.style.left = "-9999px";
          document.body.appendChild(area);
          area.focus();
          area.select();
          try { document.execCommand("copy"); botaoCopiar.textContent = "Copiado!"; }
          catch (e) { botaoCopiar.textContent = "Não foi possível copiar"; }
          area.remove();
        }
        setTimeout(() => { botaoCopiar.textContent = "Copiar"; }, 1200);
      });
      mensagem.appendChild(botaoCopiar);
    }

    mensagens.appendChild(mensagem);
    mensagens.scrollTop = mensagens.scrollHeight;
    return mensagem;
  }

  for (const m of historico) {
    if (!m || typeof m.texto !== "string") continue;
    adicionarMensagem(m.texto, m.tipo, m.tipo === "assistente");
  }

  // ---------------- ABRIR / FECHAR ----------------
  botao.addEventListener("click", function (evento) {
    evento.stopPropagation();
    if (painel.style.display === "flex") {
      painel.style.display = "none";
    } else {
      painel.style.display = "flex";
      setTimeout(() => input.focus(), 50);
    }
  });
  fechar.addEventListener("click", () => { painel.style.display = "none"; });
  document.addEventListener("pointerdown", function (evento) {
    if (painel.style.display !== "flex") return;
    if (!painel.contains(evento.target) && !botao.contains(evento.target)) painel.style.display = "none";
  }, true);

  // ---------------- ENVIAR ----------------
  async function enviarPergunta() {
    const digitado = input.value.trim();
    if (!digitado && !arquivoAnexado) return;
    if (digitado.length > MAX_CARACTERES) {
      adicionarMensagem("A pergunta é muito grande (máximo " + MAX_CARACTERES + " caracteres).", "assistente", false);
      return;
    }

    const arquivo = arquivoAnexado;
    const pergunta =
      (arquivo ? "[Arquivo anexado: " + arquivo.name + "]\n" : "") +
      (digitado || "Resolva a atividade do arquivo anexado.");
    limparArquivo();
    input.value = "";
    adicionarMensagem(pergunta, "usuario", false);
    historico.push({ tipo: "usuario", texto: pergunta });
    salvarHistorico();

    enviar.disabled = true;
    const carregando = adicionarMensagem("Pensando...", "assistente", false);

    try {
      const msgs = montarMensagens();
      let anexo = null;
      if (arquivo) {
        anexo = { mimeType: arquivo.type, nome: arquivo.name, data: await lerBase64(arquivo) };
      }

      const resposta = await fetch(WORKER_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ messages: msgs, arquivo: anexo })
      });

      const textoRecebido = await resposta.text();
      let dados = null;
      try { dados = JSON.parse(textoRecebido); } catch (e) { dados = null; }

      if (!resposta.ok) {
        const motivo = (dados && dados.error) ? dados.error : textoRecebido.substring(0, 300);
        throw new Error("HTTP " + resposta.status + (motivo ? " — " + motivo : ""));
      }
      if (!dados) throw new Error("O Worker não retornou JSON válido: " + textoRecebido.substring(0, 300));

      let textoResposta = "";
      for (const campo of ["reply", "resposta", "answer", "message", "response", "content"]) {
        if (typeof dados[campo] === "string" && dados[campo].trim()) { textoResposta = dados[campo].trim(); break; }
      }
      if (!textoResposta) throw new Error("Resposta sem texto. JSON recebido: " + JSON.stringify(dados).substring(0, 300));

      carregando.remove();
      adicionarMensagem(textoResposta, "assistente", true);
      historico.push({ tipo: "assistente", texto: textoResposta });
      salvarHistorico();
    } catch (erro) {
      console.error("Erro no chat:", erro);
      carregando.remove();
      // Remove a pergunta que falhou do histórico, para não atrapalhar as próximas.
      if (historico.length && historico[historico.length - 1].tipo === "usuario") {
        historico.pop();
        salvarHistorico();
      }
      if (arquivo) definirArquivo(arquivo); // devolve o arquivo para tentar de novo
      adicionarMensagem("Erro ao conectar com o assistente.\n\n" + (erro && erro.message ? erro.message : ""), "assistente", false);
    } finally {
      enviar.disabled = false;
      input.focus();
    }
  }

  enviar.addEventListener("click", enviarPergunta);
  input.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter" && !evento.shiftKey) {
      evento.preventDefault();
      enviarPergunta();
    }
  });
})();
