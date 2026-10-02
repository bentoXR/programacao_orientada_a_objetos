// Chat de IA para o site de POO em Java.
// Troque WORKER_URL pela URL do seu Cloudflare Worker.
(function () {
  const WORKER_URL = "https://floral-shadow-0a19.bentoxrxr.workers.dev/";
  const MAX_HISTORICO = 10;
  const historico = [];

  const css = `
  #poo-chat-btn{position:fixed;right:20px;bottom:20px;z-index:9999;border:0;border-radius:24px;
    padding:12px 18px;background:#b8442a;color:#fff;font:600 15px system-ui,sans-serif;cursor:pointer;
    box-shadow:0 2px 10px rgba(0,0,0,.25)}
  #poo-chat-btn:focus-visible,#poo-chat-form button:focus-visible{outline:3px solid #222;outline-offset:2px}
  #poo-chat{position:fixed;right:20px;bottom:76px;z-index:9999;width:min(380px,calc(100vw - 40px));
    height:min(520px,calc(100vh - 110px));display:none;flex-direction:column;background:#fff;color:#222;
    border:1px solid #ccc;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.25);font:15px/1.45 system-ui,sans-serif}
  #poo-chat.aberto{display:flex}
  #poo-chat header{padding:12px 14px;border-bottom:1px solid #ddd;font-weight:600}
  #poo-chat-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
  .poo-msg{max-width:88%;padding:8px 11px;border-radius:8px;white-space:pre-wrap;word-wrap:break-word}
  .poo-msg.user{align-self:flex-end;background:#b8442a;color:#fff}
  .poo-msg.ia{align-self:flex-start;background:#f0efed}
  .poo-msg.erro{align-self:flex-start;background:#fde8e4;color:#7a1f10}
  .poo-msg code,.poo-msg pre{font-family:ui-monospace,Consolas,monospace;font-size:13px}
  #poo-chat-form{display:flex;gap:6px;padding:10px;border-top:1px solid #ddd}
  #poo-chat-form input{flex:1;padding:8px 10px;border:1px solid #bbb;border-radius:6px;font:inherit}
  #poo-chat-form button{border:0;border-radius:6px;padding:8px 14px;background:#b8442a;color:#fff;font:inherit;font-weight:600;cursor:pointer}
  #poo-chat-form button:disabled{opacity:.5;cursor:default}
  @media (prefers-color-scheme:dark){#poo-chat{background:#1e1e1e;color:#eee;border-color:#444}
    #poo-chat header,#poo-chat-form{border-color:#444}.poo-msg.ia{background:#2c2c2c}
    #poo-chat-form input{background:#2c2c2c;color:#eee;border-color:#555}}`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.id = "poo-chat-btn";
  btn.textContent = "Tirar dúvida com a IA";
  btn.setAttribute("aria-expanded", "false");

  const painel = document.createElement("section");
  painel.id = "poo-chat";
  painel.setAttribute("aria-label", "Chat com a IA");
  painel.innerHTML = `<header>Assistente de POO em Java</header>
    <div id="poo-chat-msgs" aria-live="polite"></div>
    <form id="poo-chat-form"><input type="text" placeholder="Pergunte sobre a aula..." aria-label="Sua pergunta" maxlength="1000" required>
    <button type="submit">Enviar</button></form>`;
  document.body.append(btn, painel);

  const msgs = painel.querySelector("#poo-chat-msgs");
  const form = painel.querySelector("#poo-chat-form");
  const input = form.querySelector("input");
  const enviar = form.querySelector("button");

  function add(tipo, texto) {
    const d = document.createElement("div");
    d.className = "poo-msg " + tipo;
    d.textContent = texto; // textContent evita injeção de HTML
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  add("ia", "Olá! Pergunte sobre qualquer tema das aulas: classes, herança, interfaces, exceções, coleções...");

  btn.addEventListener("click", () => {
    const aberto = painel.classList.toggle("aberto");
    btn.setAttribute("aria-expanded", aberto);
    if (aberto) input.focus();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (!texto) return;
    input.value = "";
    add("user", texto);
    historico.push({ role: "user", content: texto });
    enviar.disabled = true;
    const aguarde = add("ia", "Pensando...");
    try {
      const r = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: historico.slice(-MAX_HISTORICO),
          pagina: location.pathname,
        }),
      });
      const dados = await r.json();
      if (!r.ok) throw new Error(dados.error || "Erro " + r.status);
      aguarde.textContent = dados.reply;
      historico.push({ role: "assistant", content: dados.reply });
    } catch (err) {
      aguarde.className = "poo-msg erro";
      aguarde.textContent = "Não consegui responder agora. Tente de novo em instantes.";
      historico.pop();
    } finally {
      enviar.disabled = false;
      input.focus();
    }
  });
})();
