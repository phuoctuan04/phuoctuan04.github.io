// Script dùng chung cho trang master (02_Huong-dan-giai.html) và trang từng câu (0x_cau-N.html) của mọi đề.
// Cần window.DE (từ 00_cau-hinh.js của đề): { id, tieuDe, lyThuyet: "../../../01-ly-thuyet/", caus: [[id, tên, [phần…], file, nộiDung]], bais: [[số, file, tên, [[idMục, tênMục]…]]] }
// Dữ liệu lưu localStorage, khóa tiền tố thcs-dtc:toan9:
//   hoc:<đề>:<câu><phần> = ISO lúc đánh dấu · ghichu / ghichu-luc:<đề>:<câu><phần> · anloigiai:<đề>:<câu> · hs:ten|lop|nam
//   hoc:bai07:<mục> (do trang lý thuyết ghi) · hoc:bai07 = ISO khi cả bài xong
(function () {
  const DE = window.DE; if (!DE) { console.error("Thiếu 00_cau-hinh.js"); return; }
  const P = "thcs-dtc:toan9:";
  const K = { hoc: id => `${P}hoc:${DE.id}:${id}`, an: id => `${P}anloigiai:${DE.id}:${id}`, ghichu: id => `${P}ghichu:${DE.id}:${id}`, luc: id => `${P}ghichu-luc:${DE.id}:${id}` };
  const HS = { ten: `${P}hs:ten`, lop: `${P}hs:lop`, nam: `${P}hs:nam` };
  const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
               set: (k, v) => { try { v == null || v === "" ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} } };
  const fmt = iso => { if (!iso) return ""; const d = new Date(iso); if (isNaN(d)) return ""; return d.toLocaleDateString("vi-VN") + " " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }); };
  const now = () => new Date().toISOString();
  const esc = s => (s || "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const partId = (cau, p) => cau + p;
  const $ = id => document.getElementById(id);
  const cauDone = ([id, , parts]) => parts.filter(p => ls.get(K.hoc(partId(id, p)))).length;

  // ===== Menu điều hướng trong header (mọi trang) =====
  const nav = document.querySelector("header nav");
  if (nav) {
    const here = location.pathname.split("/").pop();
    nav.innerHTML = `<a href="../../../index.html" title="Trang điều khiển học tập lớp 9/6">🏠 Học tập</a><a href="02_Huong-dan-giai.html" class="${here === "02_Huong-dan-giai.html" ? "cur" : ""}">☰ Tổng quan</a>` +
      DE.caus.map(c => { const n = cauDone(c), all = n === c[2].length; return c[3] ? `<a href="${c[3]}" class="${here === c[3] ? "cur" : ""} ${all ? "ok" : ""}">${c[1]}${c[2].length > 1 && !all && n ? ` ${n}/${c[2].length}` : ""}</a>` : `<span class="small">${c[1]} (chưa có)</span>`; }).join("");
  }

  // ===== Khung lý thuyết bên phải (trang câu) =====
  const side = $("side"), frame = $("theory"), pick = $("pick"), openNew = $("openNew"), printTheory = $("printTheory"), toggle = $("toggle");
  let cur = "";
  function show(rel) {
    if (!frame) { window.open(DE.lyThuyet + rel, "_blank"); return; }
    const url = DE.lyThuyet + rel;
    if (frame.getAttribute("src") === url) { frame.src = "about:blank"; setTimeout(() => { frame.src = url; }, 0); } else { frame.src = url; }
    cur = url; side.classList.add("loaded", "open"); openNew.href = url; printTheory.href = DE.lyThuyet + rel.split("#")[0] + "?print=1";
    pick.value = rel.split("#")[0];
  }
  if (pick) {
    DE.bais.forEach(([n, file, ten]) => { const o = document.createElement("option"); o.value = file; o.textContent = ten; pick.appendChild(o); });
    pick.addEventListener("change", () => { if (pick.value) show(pick.value); });
    toggle.addEventListener("click", () => { if (!cur) show(DE.bais[0][1]); else side.classList.toggle("open"); });
    [openNew, printTheory].forEach(a => a.addEventListener("click", e => { if (!cur) e.preventDefault(); }));
  }
  document.querySelectorAll("a.ref[href]").forEach(a => {
    if (a.getAttribute("href") === "#") return;
    a.addEventListener("click", e => { e.preventDefault(); document.querySelectorAll("a.ref.on").forEach(x => x.classList.remove("on")); a.classList.add("on"); show(a.getAttribute("href")); });
  });

  // ===== Thẻ câu: đã học, ghi chú, ẩn lời giải =====
  const secs = {};
  function setupBar(bar, cau) {
    const p = bar.dataset.part, id = partId(cau, p), noteOnly = p === "";
    bar.innerHTML = (noteOnly ? `<b>${bar.dataset.label}</b>` : `<label><input type="checkbox" class="chk"> Đã học ${bar.dataset.label}</label><span class="luc"></span>`)
      + ` <span class="saved"></span><textarea class="note" placeholder="Ghi chú của em cho ${bar.dataset.label.toLowerCase()} (chỗ hay sai, câu hỏi cho thầy cô, mẹo nhớ…)"></textarea>`;
    const chk = bar.querySelector(".chk"), ta = bar.querySelector(".note"), saved = bar.querySelector(".saved"), luc = bar.querySelector(".luc");
    const paint = () => { if (chk) { const v = ls.get(K.hoc(id)); chk.checked = !!v; bar.classList.toggle("da-hoc", !!v); luc.textContent = v ? "lúc " + fmt(v) : ""; }
      ta.value = ls.get(K.ghichu(id)) || ""; saved.textContent = ta.value ? "ghi chú lưu " + fmt(ls.get(K.luc(id))) : ""; };
    paint();
    if (chk) chk.addEventListener("change", () => { ls.set(K.hoc(id), chk.checked ? now() : null); paint(); paintCau(cau); refreshAll(); });
    let t; ta.addEventListener("input", () => { clearTimeout(t); saved.textContent = "đang gõ…"; t = setTimeout(() => {
      const v = ta.value.trim(); ls.set(K.ghichu(id), v); ls.set(K.luc(id), v ? now() : null); saved.textContent = v ? "ghi chú lưu " + fmt(ls.get(K.luc(id))) : ""; }, 400); });
    bar._paint = paint;
  }
  function paintCau(cau) {
    const sec = secs[cau], parts = sec.dataset.parts.split(",");
    const all = parts.every(p => ls.get(K.hoc(partId(cau, p))));
    const c = ls.get(K.hoc(cau)); if (all && !c) ls.set(K.hoc(cau), now()); if (!all && c) ls.set(K.hoc(cau), null);
    sec.querySelector(".chkHoc").checked = all; sec.classList.toggle("da-hoc", all);
    sec.querySelector(".head .luc").textContent = all ? "xong " + fmt(ls.get(K.hoc(cau))) : "";
  }
  document.querySelectorAll("section.cau").forEach(sec => {
    const cau = sec.dataset.id; secs[cau] = sec;
    sec.querySelectorAll(".hocbar").forEach(b => setupBar(b, cau));
    const chk = sec.querySelector(".chkHoc"), btn = sec.querySelector(".btnAn");
    chk.addEventListener("change", () => { const t = now(); sec.dataset.parts.split(",").forEach(p => { const k = K.hoc(partId(cau, p)); if (chk.checked) { if (!ls.get(k)) ls.set(k, t); } else ls.set(k, null); });
      sec.querySelectorAll(".hocbar").forEach(b => b._paint()); paintCau(cau); refreshAll(); });
    const paintAn = () => { const an = ls.get(K.an(cau)) === "1"; sec.classList.toggle("an-loi-giai", an); btn.textContent = an ? "Hiện lời giải" : "Ẩn lời giải"; };
    paintAn(); btn.addEventListener("click", () => { ls.set(K.an(cau), sec.classList.contains("an-loi-giai") ? null : "1"); paintAn(); });
    paintCau(cau);
  });

  // ===== Âm thanh =====
  (function () {
    const btns = Array.from(document.querySelectorAll("button.speak[data-say]")); if (!btns.length) return;
    const rate = $("rate"), note = $("voiceNote"), audio = new Audio(); let curB = null; const synth = window.speechSynthesis;
    const r = () => rate ? parseFloat(rate.value) : 1;
    function reset() { btns.forEach(b => { b.classList.remove("on"); b.textContent = b.dataset.label; }); curB = null; }
    function stop() { audio.pause(); audio.removeAttribute("src"); audio.load(); if (synth) synth.cancel(); reset(); }
    function fallback(b) {
      if (!synth) { if (note) note.textContent = "Không phát được âm thanh."; reset(); return; }
      const u = new SpeechSynthesisUtterance(b.dataset.say); u.lang = "vi-VN"; u.rate = r();
      const v = synth.getVoices().find(x => /^vi/i.test(x.lang)); if (v) u.voice = v;
      u.onend = u.onerror = reset; if (note) note.textContent = "Thiếu file mp3, đang dùng giọng của trình duyệt."; synth.speak(u);
    }
    function play(b) { stop(); curB = b; b.classList.add("on"); b.textContent = "■ Dừng"; audio.src = b.dataset.audio; audio.playbackRate = r(); audio.onended = reset; audio.onerror = () => fallback(b); audio.play().catch(() => fallback(b)); }
    btns.forEach(b => { b.dataset.label = b.textContent; b.addEventListener("click", () => { if (curB === b) stop(); else play(b); }); });
    if (rate) rate.addEventListener("change", () => { audio.playbackRate = r(); });
    const s = $("stopAll"); if (s) s.addEventListener("click", stop);
  })();

  // ===== Master: thông tin học sinh, tiến độ, menu, in, xuất nhập =====
  const hsIn = { ten: $("hsTen"), lop: $("hsLop"), nam: $("hsNam") };
  function paintHS() { const el = $("hsTomTat"); if (!el) return; const t = (ls.get(HS.ten) || "").trim(); el.textContent = t ? `${t}${ls.get(HS.lop) ? " – lớp " + ls.get(HS.lop) : ""}${ls.get(HS.nam) ? " – " + ls.get(HS.nam) : ""}` : "(chưa nhập tên)"; }
  if (hsIn.ten) Object.keys(hsIn).forEach(k => { hsIn[k].value = ls.get(HS[k]) || (k === "nam" ? "2026–2027" : ""); hsIn[k].addEventListener("input", () => { ls.set(HS[k], hsIn[k].value.trim()); paintHS(); }); });
  paintHS();

  function paintTienDo() {
    if (!$("tdCau")) return;
    let done = 0, total = 0;
    $("tdCau").innerHTML = DE.caus.map(c => { const [id, t, parts, file] = c; const n = cauDone(c); done += n; total += parts.length;
      const cls = n === parts.length ? "ok" : n > 0 ? "half" : "";
      return `<a class="chip ${cls} ${file ? "" : "todo"}" href="${file || "#"}">${n === parts.length ? "✓ " : ""}${t}${parts.length > 1 ? ` ${n}/${parts.length}` : ""}${file ? "" : " (chưa có)"}</a>`; }).join(" ");
    $("tdBai").innerHTML = DE.bais.map(([n, file, t, units]) => { const k = units.filter(([u]) => ls.get(`${P}hoc:bai${n}:${u}`)).length; const cls = k === units.length ? "ok" : k > 0 ? "half" : "";
      return `<a class="chip ${cls}" href="${DE.lyThuyet + file}" target="_blank" title="${t}">${k === units.length ? "✓ " : ""}${t.split(".")[0]} ${k}/${units.length}</a>`; }).join(" ");
    $("tdBar").style.width = Math.round(done / total * 100) + "%"; $("tdText").textContent = `${done}/${total} câu nhỏ`;
    const menu = $("menu"); if (menu) menu.innerHTML = DE.caus.map(c => { const [id, t, parts, file, nd] = c; const n = cauDone(c), all = n === parts.length;
      const gc = parts.map(p => ls.get(K.ghichu(partId(id, p)))).filter(Boolean).concat([ls.get(K.ghichu(id))].filter(Boolean)).join(" · ");
      const st = all ? "✓ xong " + fmt(ls.get(K.hoc(id))) : n ? `${n}/${parts.length} câu nhỏ` : file ? "chưa học" : "chưa biên soạn";
      return `<a href="${file || "#"}" class="${all ? "ok" : n ? "half" : ""} ${file ? "" : "todo"}"><b>${t}</b><span class="nd">${nd || ""}</span><span class="st">${st}</span>${gc ? `<span class="gc">✎ ${esc(gc)}</span>` : ""}</a>`; }).join("");
  }
  const btnIn = $("btnInTienDo"); if (btnIn) btnIn.addEventListener("click", () => {
    let h = `<h1>Tiến độ ôn tập – ${esc(DE.tieuDe)}</h1><p><b>Học sinh:</b> ${esc(ls.get(HS.ten)) || "…………………………"} &nbsp; <b>Lớp:</b> ${esc(ls.get(HS.lop)) || "………"} &nbsp; <b>Năm học:</b> ${esc(ls.get(HS.nam)) || "………"} &nbsp; <b>In lúc:</b> ${fmt(now())}</p>`;
    h += `<h2>Đề thi</h2><table><tr><th>Câu nhỏ</th><th>Đã học lúc</th><th class="l">Ghi chú (lưu lúc)</th></tr>`;
    DE.caus.forEach(([id, t, parts]) => { parts.forEach(p => { const pid = partId(id, p);
      h += `<tr><td>${t}${p}</td><td>${fmt(ls.get(K.hoc(pid))) || "–"}</td><td class="l"><div class="note">${esc(ls.get(K.ghichu(pid)))}</div>${ls.get(K.luc(pid)) ? `<span class="small">(${fmt(ls.get(K.luc(pid)))})</span>` : ""}</td></tr>`; });
      const g = ls.get(K.ghichu(id)); if (g) h += `<tr><td>${t} chung</td><td></td><td class="l"><div class="note">${esc(g)}</div><span class="small">(${fmt(ls.get(K.luc(id)))})</span></td></tr>`; });
    h += `</table><h2>Lý thuyết</h2><table><tr><th>Bài / mục</th><th>Đã học lúc</th><th class="l">Ghi chú (lưu lúc)</th></tr>`;
    DE.bais.forEach(([n, file, t, units]) => { h += `<tr><td class="l" colspan="3"><b>${t}</b>${ls.get(`${P}hoc:bai${n}`) ? " – xong " + fmt(ls.get(`${P}hoc:bai${n}`)) : ""}</td></tr>`;
      units.forEach(([u, tm]) => { h += `<tr><td class="l">&nbsp;&nbsp;${tm}</td><td>${fmt(ls.get(`${P}hoc:bai${n}:${u}`)) || "–"}</td><td class="l"><div class="note">${esc(ls.get(`${P}ghichu:bai${n}:${u}`))}</div>${ls.get(`${P}ghichu-luc:bai${n}:${u}`) ? `<span class="small">(${fmt(ls.get(`${P}ghichu-luc:bai${n}:${u}`))})</span>` : ""}</td></tr>`; }); });
    $("baoCao").innerHTML = h + "</table>"; document.body.classList.add("in-tiendo");
    const off = () => { document.body.classList.remove("in-tiendo"); window.removeEventListener("afterprint", off); };
    window.addEventListener("afterprint", off); window.print(); setTimeout(off, 2000);
  });
  const bx = $("btnXuat"); if (bx) bx.addEventListener("click", () => {
    const data = {}; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith(P)) data[k] = localStorage.getItem(k); } } catch (e) {}
    const blob = new Blob([JSON.stringify({ xuatLuc: now(), data }, null, 1)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "toan9-tien-do-ghi-chu.json"; a.click(); URL.revokeObjectURL(a.href);
  });
  const bn = $("btnNhap"); if (bn) { bn.addEventListener("click", () => $("fileNhap").click());
    $("fileNhap").addEventListener("change", e => { const f = e.target.files[0]; if (!f) return;
      f.text().then(txt => { const j = JSON.parse(txt); const d = j.data || j; let n = 0; for (const k in d) if (k.startsWith(P)) { ls.set(k, d[k]); n++; } alert("Đã nhập " + n + " mục."); location.reload(); }).catch(() => alert("File không đúng định dạng.")); }); }

  function refreshAll() { document.querySelectorAll(".hocbar").forEach(b => b._paint && b._paint()); Object.keys(secs).forEach(paintCau); paintTienDo(); paintHS();
    if (nav) { const here = location.pathname.split("/").pop(); nav.querySelectorAll("a").forEach(a => { const c = DE.caus.find(c => c[3] === a.getAttribute("href")); if (c) a.classList.toggle("ok", cauDone(c) === c[2].length); }); } }
  paintTienDo();
  window.addEventListener("storage", refreshAll); window.addEventListener("focus", refreshAll);
})();
