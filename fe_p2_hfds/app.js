const API = "http://localhost:3000";
const $ = (id) => document.getElementById(id);
const state = { recintos: [], eventos: [] };
function toast(msg) {
  $("toast").textContent = msg;
  $("toast").style.display = "block";
  setTimeout(() => ($("toast").style.display = "none"), 2600);
}
async function api(path, options = {}) {
  const res = await fetch(API + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    let e = {};
    try {
      e = await res.json();
    } catch {}
    throw Error(e.message || "No se pudo completar la operación");
  }
  return res.status === 204 ? null : res.json();
}
function reset(form) {
  form.reset();
  form.classList.add("hidden");
  form.querySelector("input[type=hidden]").value = "";
}
function escapar(valor) {
  return String(valor).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function renderRecintos() {
  $("recintos").innerHTML = state.recintos.length
    ? state.recintos
        .map(
          (r) =>
            `<article class="card"><div><h3>${escapar(r.nombre)}</h3><div class="muted">${escapar(r.ciudad)} · Aforo: ${r.aforo_maximo ?? "No indicado"}</div></div><div class="actions"><button data-edit-r="${r.id}" class="secondary">Editar</button><button data-del-r="${r.id}" class="danger">Eliminar</button></div></article>`,
        )
        .join("")
    : '<p class="muted">No hay recintos registrados.</p>';
  $("evento-recinto").innerHTML = state.recintos
    .map(
      (r) =>
        `<option value="${r.id}">${escapar(r.nombre)} · ${escapar(r.ciudad)}</option>`,
    )
    .join("");
}
function renderEventos() {
  $("eventos").innerHTML = state.eventos.length
    ? state.eventos
        .map(
          (e) =>
            `<article class="card"><div><h3>${escapar(e.titulo)}</h3><div class="muted">${escapar(e.fecha_evento)} · ${escapar(e.recinto?.nombre || "Recinto #" + e.id_recinto)} · ${escapar(e.estado)} · ${escapar(e.categoria_evento)}</div><div>${escapar(e.artista_principal)} · Bs ${escapar(e.precio_entrada)}</div></div><div class="actions"><button data-edit-e="${e.id}" class="secondary">Editar</button><button data-del-e="${e.id}" class="danger">Eliminar</button></div></article>`,
        )
        .join("")
    : '<p class="muted">No hay eventos registrados.</p>';
}
async function load() {
  try {
    [state.recintos, state.eventos] = await Promise.all([
      api("/recintos"),
      api("/eventos"),
    ]);
    renderRecintos();
    renderEventos();
  } catch (e) {
    toast(e.message + " · ¿Está ejecutándose la API?");
  }
}
function fillRecinto(r) {
  $("recinto-id").value = r.id;
  $("recinto-nombre").value = r.nombre;
  $("recinto-ciudad").value = r.ciudad;
  $("recinto-aforo").value = r.aforo_maximo ?? "";
  $("recinto-form").classList.remove("hidden");
}
function fillEvento(e) {
  $("evento-id").value = e.id;
  $("evento-recinto").value = e.id_recinto;
  $("evento-titulo").value = e.titulo;
  $("evento-artista").value = e.artista_principal;
  $("evento-duracion").value = e.duracion_minutos;
  $("evento-precio").value = e.precio_entrada;
  $("evento-fecha").value = e.fecha_evento;
  $("evento-estado").value = e.estado;
  $("evento-categoria").value = e.categoria_evento;
  $("evento-form").classList.remove("hidden");
}
$("nuevo-recinto").onclick = () => {
  reset($("recinto-form"));
  $("recinto-form").classList.remove("hidden");
  $("recinto-nombre").focus();
};
$("nuevo-evento").onclick = () => {
  reset($("evento-form"));
  $("evento-form").classList.remove("hidden");
  $("evento-titulo").focus();
};
document
  .querySelectorAll(".cancelar")
  .forEach((b) => (b.onclick = () => reset(b.closest("form"))));
$("recinto-form").onsubmit = async (ev) => {
  ev.preventDefault();
  const id = $("recinto-id").value;
  const body = {
    nombre: $("recinto-nombre").value,
    ciudad: $("recinto-ciudad").value,
    aforo_maximo: $("recinto-aforo").value
      ? Number($("recinto-aforo").value)
      : null,
  };
  try {
    await api(id ? "/recintos/" + id : "/recintos", {
      method: id ? "PATCH" : "POST",
      body: JSON.stringify(body),
    });
    reset($("recinto-form"));
    await load();
    toast("Recinto guardado");
  } catch (e) {
    toast(e.message);
  }
};
$("evento-form").onsubmit = async (ev) => {
  ev.preventDefault();
  const id = $("evento-id").value;
  const body = {
    id_recinto: Number($("evento-recinto").value),
    titulo: $("evento-titulo").value,
    artista_principal: $("evento-artista").value,
    duracion_minutos: Number($("evento-duracion").value),
    precio_entrada: Number($("evento-precio").value),
    fecha_evento: $("evento-fecha").value,
    estado: $("evento-estado").value,
    categoria_evento: $("evento-categoria").value,
  };
  try {
    await api(id ? "/eventos/" + id : "/eventos", {
      method: id ? "PATCH" : "POST",
      body: JSON.stringify(body),
    });
    reset($("evento-form"));
    await load();
    toast("Evento guardado");
  } catch (e) {
    toast(e.message);
  }
};
document.addEventListener("click", async (ev) => {
  const b = ev.target;
  if (b.dataset.editR)
    fillRecinto(state.recintos.find((x) => x.id == b.dataset.editR));
  if (b.dataset.editE)
    fillEvento(state.eventos.find((x) => x.id == b.dataset.editE));
  for (const [key, path, label] of [
    ["delR", "/recintos/", "recinto"],
    ["delE", "/eventos/", "evento"],
  ])
    if (b.dataset[key] && confirm("¿Eliminar este " + label + "?"))
      try {
        await api(path + b.dataset[key], { method: "DELETE" });
        await load();
        toast(label[0].toUpperCase() + label.slice(1) + " eliminado");
      } catch (e) {
        toast(e.message);
      }
});
load();
