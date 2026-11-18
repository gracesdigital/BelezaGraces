const WHATSAPP_NUMBER = "5511916788446";
const INSTAGRAM_URL = "https://www.instagram.com/digitalgraces/";

const services = [
{name:"Corte feminino",category:"cabelo",label:"CABELO",description:"Corte pensado para valorizar seu estilo, formato de rosto e personalidade.",price:"A partir de R$ 70",image:"assets/cabelo1"},
{name:"Escova",category:"cabelo",label:"CABELO",description:"Finalização com movimento, brilho e acabamento profissional.",price:"A partir de R$ 55",image:"assets/cabelo2"},
{name:"Hidratação capilar",category:"cabelo",label:"CABELO",description:"Tratamento para devolver maciez, brilho e vitalidade aos fios.",price:"A partir de R$ 90",image:"assets/cabelo3"},
{name:"Coloração",category:"cabelo",label:"CABELO",description:"Cor personalizada com cuidado e atenção à saúde dos fios.",price:"Sob consulta",image:"assets/cabelo4"},
{name:"Manicure",category:"unhas",label:"UNHAS",description:"Cuidado completo para as mãos, cutículas e esmaltação.",price:"A partir de R$ 35",image:"assets/unha1"},
{name:"Pedicure",category:"unhas",label:"UNHAS",description:"Um momento de cuidado e bem-estar para seus pés.",price:"A partir de R$ 40",image:"assets/unha2"},
{name:"Alongamento de unhas",category:"unhas",label:"UNHAS",description:"Alongamento com acabamento delicado e formato personalizado.",price:"A partir de R$ 160",image:"assets/unha3"},
{name:"Design de sobrancelhas",category:"sobrancelhas",label:"SOBRANCELHAS",description:"Design personalizado para valorizar a harmonia do seu olhar.",price:"A partir de R$ 45",image:"assets/sobrancelha1"},
{name:"Design com henna",category:"sobrancelhas",label:"SOBRANCELHAS",description:"Definição e preenchimento para um resultado natural e elegante.",price:"A partir de R$ 60",image:"assets/sobrancelha2"},
{name:"Extensão de cílios",category:"cilios",label:"CÍLIOS",description:"Realce do olhar com técnica escolhida de acordo com seu estilo.",price:"A partir de R$ 180",image:"assets/cilios1"},
{name:"Lifting de cílios",category:"cilios",label:"CÍLIOS",description:"Curvatura e destaque para os cílios naturais.",price:"A partir de R$ 120",image:"assets/cilios2"},
{name:"Limpeza de pele",category:"estetica",label:"ESTÉTICA FACIAL",description:"Cuidado facial para uma pele limpa, renovada e bem cuidada.",price:"A partir de R$ 150",image:"assets/limpeza"}
];
const grid=document.getElementById("service-grid");
function renderServices(filter="todos"){
 const list=filter==="todos"?services:services.filter(s=>s.category===filter);
 grid.innerHTML=list.map(s=>`<article class="service-card"><img src="${s.image}" alt="${s.name}" loading="lazy"><div class="service-copy"><small>${s.label}</small><h3>${s.name}</h3><p>${s.description}</p><div class="service-bottom"><b>${s.price}</b><button data-index="${services.indexOf(s)}">Detalhes ↗</button></div></div></article>`).join("");
}
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b===btn));renderServices(btn.dataset.filter)}));

const modal=document.getElementById("service-modal");
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-index]");if(!b)return;const s=services[+b.dataset.index];document.getElementById("modal-img").src=s.image;document.getElementById("modal-cat").textContent=s.label;document.getElementById("modal-title").textContent=s.name;document.getElementById("modal-desc").textContent=s.description;document.getElementById("modal-price").textContent=s.price;document.getElementById("modal-book").href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de agendar "+s.name+" no Beleza Graces.")}`;modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"});
modal.querySelector(".close").addEventListener("click",closeModal);modal.querySelector("[data-close]").addEventListener("click",closeModal);

// Menu responsivo
const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!open));nav.classList.toggle("open",!open)});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false")}));

// Links de contato
document.querySelectorAll("[data-whatsapp]").forEach(a=>a.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de informações sobre os serviços do Beleza Graces.")}`);
document.querySelectorAll("[data-instagram]").forEach(a=>{a.href=INSTAGRAM_URL;a.target="_blank";a.rel="noopener noreferrer"});

// Formulário: abre WhatsApp com os dados preenchidos.
const form=document.getElementById("booking-form"),dateField=form.querySelector('[name="data"]');
const now=new Date();dateField.min=new Date(now-now.getTimezoneOffset()*60000).toISOString().slice(0,10);
form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const msg=["Olá! Gostaria de solicitar um agendamento no Beleza Graces.","",`Nome: ${d.get("nome")}`,`Telefone: ${d.get("telefone")}`,`Serviço: ${d.get("servico")}`,`Profissional: ${d.get("profissional")}`,`Data desejada: ${d.get("data")}`,`Horário desejado: ${d.get("horario")}`,"","Aguardo a confirmação da disponibilidade. Obrigada!"].join("\n");document.getElementById("feedback").textContent="Abrindo o WhatsApp com os dados do agendamento...";window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener,noreferrer")});

// Filtros e ampliação da galeria
document.querySelectorAll("[data-gallery]").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll("[data-gallery]").forEach(b=>b.classList.toggle("active",b===btn));document.querySelectorAll(".gallery-grid button").forEach(item=>item.hidden=btn.dataset.gallery!=="todos"&&item.dataset.cat!==btn.dataset.gallery)}));
const lightbox=document.getElementById("lightbox"),lightImg=lightbox.querySelector("img");
document.querySelectorAll(".gallery-grid button").forEach(item=>item.addEventListener("click",()=>{lightImg.src=item.dataset.full;lightImg.alt=item.querySelector("img").alt;lightbox.classList.add("open");document.body.style.overflow="hidden"}));
function closeLight(){lightbox.classList.remove("open");document.body.style.overflow=""}
lightbox.querySelector("button").addEventListener("click",closeLight);lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLight()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();closeLight()}});
document.querySelectorAll(".faq-list details").forEach(d=>d.addEventListener("toggle",()=>{d.querySelector("summary b").textContent=d.open?"×":"+"}));

// Animações suaves com acessibilidade para quem prefere movimento reduzido.
if("IntersectionObserver"in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el))}else{document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"))}
document.getElementById("year").textContent=new Date().getFullYear();
renderServices();
