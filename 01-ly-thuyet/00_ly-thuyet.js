// Dùng chung cho các file lý thuyết.
// - Mỗi mục (section có id) có ô "Đã học" + ghi chú riêng, lưu localStorage kèm ngày giờ.
//   thcs-dtc:toan9:hoc:bai07:can-bac-hai      = ISO thời điểm đánh dấu đã học
//   thcs-dtc:toan9:ghichu:bai07:can-bac-hai   = nội dung ghi chú
//   thcs-dtc:toan9:ghichu-luc:bai07:can-bac-hai = ISO lần sửa ghi chú cuối
//   thcs-dtc:toan9:hoc:bai07                  = ISO khi mọi mục đã học (trang hướng dẫn giải đọc khóa này)
// - Tự bọc màu: h3 "Khi nào dùng" → .dung, "Quy trình" → .qt (gom cả nội dung đi sau).
// - ?print=1 trên URL: tự mở hộp thoại in.
(function () {
  if (window.self !== window.top) document.body.classList.add("embedded");
  const nv = document.querySelector("header nav"); if (nv) nv.insertAdjacentHTML("afterbegin", `<a href="../../index.html" title="Trang điều khiển học tập lớp 9/6">🏠 Học tập</a> `);
  const fmt = iso => { if (!iso) return ""; const d = new Date(iso); if (isNaN(d)) return ""; return d.toLocaleDateString("vi-VN") + " " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }); };

  // Bọc màu các phần "Khi nào dùng", "Quy trình"
  document.querySelectorAll("main section h3").forEach(h => {
    const t = h.textContent.trim().toLowerCase();
    const cls = t.startsWith("khi nào dùng") ? "dung" : t.startsWith("quy trình") ? "qt" : null;
    if (!cls) return;
    const wrap = document.createElement("div"); wrap.className = cls; h.parentNode.insertBefore(wrap, h); wrap.appendChild(h);
    let n = wrap.nextSibling;
    while (n && !(n.nodeType === 1 && (n.tagName === "H3" || n.classList.contains("sgk") || n.classList.contains("vd") || n.classList.contains("loi") || n.classList.contains("hocbar")))) { const x = n; n = n.nextSibling; wrap.appendChild(x); }
  });

  const m = document.body.dataset.bai ? [null, document.body.dataset.bai] : location.pathname.match(/\/(\d{2})-[^/]*\.html$/);   // data-bai: khi nhúng vào file đơn lẻ (srcdoc)
  if (!m) return;
  const BAI = "bai" + m[1];
  const K = { hoc: u => `thcs-dtc:toan9:hoc:${BAI}${u ? ":" + u : ""}`, ghichu: u => `thcs-dtc:toan9:ghichu:${BAI}:${u}`, luc: u => `thcs-dtc:toan9:ghichu-luc:${BAI}:${u}` };
  const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
               set: (k, v) => { try { v == null || v === "" ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} } };
  const units = Array.from(document.querySelectorAll("main > section[id]"));
  const head = document.getElementById("daHoc");

  units.forEach(sec => {
    const u = sec.id;
    const bar = document.createElement("div"); bar.className = "hocbar";
    bar.innerHTML = `<label><input type="checkbox" class="chk"> Đã học mục này</label><span class="luc"></span>
      <span class="saved"></span>
      <textarea class="note" placeholder="Ghi chú của em cho mục này…"></textarea>`;
    sec.appendChild(bar);
    const chk = bar.querySelector(".chk"), ta = bar.querySelector(".note"), saved = bar.querySelector(".saved"), luc = bar.querySelector(".luc");
    const paint = () => { const v = ls.get(K.hoc(u)); chk.checked = !!v; sec.classList.toggle("da-hoc", !!v); luc.textContent = v ? "lúc " + fmt(v) : "";
      ta.value = ls.get(K.ghichu(u)) || ""; saved.textContent = ta.value ? "ghi chú lưu " + fmt(ls.get(K.luc(u))) : ""; };
    paint();
    chk.addEventListener("change", () => { ls.set(K.hoc(u), chk.checked ? new Date().toISOString() : null); paint(); paintAll(); });
    let t; ta.addEventListener("input", () => { clearTimeout(t); saved.textContent = "đang gõ…"; t = setTimeout(() => {
      const v = ta.value.trim(); ls.set(K.ghichu(u), v); ls.set(K.luc(u), v ? new Date().toISOString() : null); saved.textContent = v ? "ghi chú lưu " + fmt(ls.get(K.luc(u))) : ""; }, 400); });
    sec._paint = paint;
  });

  function paintAll() {
    const all = units.length > 0 && units.every(s => ls.get(K.hoc(s.id)));
    const cur = ls.get(K.hoc(""));
    if (all && !cur) ls.set(K.hoc(""), new Date().toISOString()); if (!all && cur) ls.set(K.hoc(""), null);
    if (head) head.checked = all;
    document.body.classList.toggle("da-hoc", all);
    const n = units.filter(s => ls.get(K.hoc(s.id))).length;
    const cnt = document.getElementById("hocCount"); if (cnt) cnt.textContent = `${n}/${units.length} mục` + (all ? " · xong " + fmt(ls.get(K.hoc(""))) : "");
  }
  if (head) head.addEventListener("change", () => { const now = new Date().toISOString(); units.forEach(s => { if (head.checked) { if (!ls.get(K.hoc(s.id))) ls.set(K.hoc(s.id), now); } else ls.set(K.hoc(s.id), null); }); units.forEach(s => s._paint()); paintAll(); });
  paintAll();
  window.addEventListener("storage", () => { units.forEach(s => s._paint()); paintAll(); });

  const btn = document.getElementById("btnIn"); if (btn) btn.addEventListener("click", () => window.print());
  if (/[?&]print=1/.test(location.search)) window.addEventListener("load", () => setTimeout(() => window.print(), 300));
})();

// ===== Âm thanh từng mục: mp3 (edge-tts) theo data-audio, dự phòng giọng trình duyệt theo data-say =====
(function () {
  const secs = Array.from(document.querySelectorAll("main > section[id][data-say]")); if (!secs.length) return;
  const rate = document.getElementById("rate"), note = document.getElementById("voiceNote");
  const audio = new Audio(); let cur = null; const synth = window.speechSynthesis;
  const r = () => rate ? parseFloat(rate.value) : 1;
  function reset() { document.querySelectorAll(".speak.on").forEach(b => { b.classList.remove("on"); b.textContent = b.dataset.label; }); cur = null; }
  function stop() { audio.pause(); audio.removeAttribute("src"); audio.load(); if (synth) synth.cancel(); reset(); }
  function fallback(sec, b) {
    if (!synth) { if (note) note.textContent = "Không phát được âm thanh."; reset(); return; }
    const u = new SpeechSynthesisUtterance(sec.dataset.say); u.lang = "vi-VN"; u.rate = r();
    const v = synth.getVoices().find(x => /^vi/i.test(x.lang)); if (v) u.voice = v;
    u.onend = u.onerror = reset; if (note) note.textContent = "Thiếu file mp3, đang dùng giọng của trình duyệt."; synth.speak(u);
  }
  function play(sec, b) {
    stop(); cur = b; b.classList.add("on"); b.textContent = "■ Dừng";
    audio.src = sec.dataset.audio; audio.playbackRate = r(); audio.onended = reset; audio.onerror = () => fallback(sec, b);
    audio.play().catch(() => fallback(sec, b));
  }
  secs.forEach(sec => {
    const b = document.createElement("button"); b.type = "button"; b.className = "speak"; b.textContent = b.dataset.label = "🔊 Nghe mục này";
    const h2 = sec.querySelector("h2"); h2.insertAdjacentElement("afterend", b);
    b.addEventListener("click", () => { if (cur === b) stop(); else play(sec, b); });
  });
  if (rate) rate.addEventListener("change", () => { audio.playbackRate = r(); });
  const all = document.getElementById("readAll"); if (all) all.addEventListener("click", () => { stop(); let i = 0; const next = () => { if (i >= secs.length) return; const s = secs[i++]; s.scrollIntoView({ behavior: "smooth", block: "start" }); const b = s.querySelector(".speak"); play(s, b); audio.onended = () => { reset(); next(); }; }; next(); });
})();
