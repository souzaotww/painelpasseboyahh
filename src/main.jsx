import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const nav=[
  ["Visão geral","⌂"],
  ["Entregar Passe","◈"],
  ["Estoque","▣"],
  ["Histórico","◷"],
  ["Configurações","⚙"]
];

const stats=[
  {label:"Passes disponíveis",value:"128",meta:"+12 hoje",tone:"green",icon:"▣"},
  {label:"Entregas hoje",value:"42",meta:"+18,4% vs ontem",tone:"red",icon:"◈"},
  {label:"Entregas pendentes",value:"3",meta:"Nenhuma atrasada",tone:"amber",icon:"◷"},
  {label:"Clientes atendidos",value:"86",meta:"+9 hoje",tone:"green",icon:"♙"}
];

function App(){
  const [active,setActive]=useState("Visão geral");
  const [notice,setNotice]=useState("");
  const [player,setPlayer]=useState("");
  const [server,setServer]=useState("Brasil");
  const [amount,setAmount]=useState("1");

  const action=(msg)=>{setNotice(msg);setTimeout(()=>setNotice(""),2600)};

  return <div className="app">
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">SP</div>
        <div><strong>SouzaPass</strong><span>BOOYAH</span></div>
      </div>
      <div className="nav-group">
        <div className="group-title">PAINEL</div>
        {nav.map(([label,icon])=><button key={label} className={"nav-item "+(active===label?"active":"")} onClick={()=>setActive(label)}><span>{icon}</span>{label}</button>)}
      </div>
      <div className="sidebar-bottom">
        <button className="store-btn" onClick={()=>action("Área de loja disponível em breve.")}>↗ <span>Ver loja</span></button>
        <div className="status"><i/> API pronta para conectar</div>
      </div>
    </aside>

    <main className="main">
      <header className="topbar">
        <div><h1>{active}</h1><p>{active==="Visão geral"?"Resumo das entregas em tempo real":"Gerencie as operações do SouzaPassBooyah"}</p></div>
        <div className="top-actions">
          <button className="icon-btn" onClick={()=>action("Painel atualizado.")}>↻</button>
          <div className="profile"><b>S</b><span><strong>Souza</strong><small>Gerente</small></span></div>
        </div>
      </header>

      <section className="content">
        {active==="Visão geral" && <>
          <div className="hero">
            <div>
              <div className="live"><i/> Ao vivo <b>14:25</b><span>• atualiza sozinho</span></div>
              <h2>Boa tarde, Souza</h2>
              <p className="attention">⚡ <b>3 entregas</b> aguardam processamento.</p>
              <div className="hero-actions"><button onClick={()=>setActive("Entregar Passe")}>◈ Entregar passe</button><button onClick={()=>setActive("Estoque")}>▣ Ver estoque</button></div>
            </div>
            <div className="goal">
              <div className="ring"><strong>82%</strong><span>meta mensal</span></div>
              <div><small>META DE OUTUBRO</small><strong>128 passes</strong><p>18 entregas restantes para a meta</p></div>
            </div>
          </div>

          <div className="stats">{stats.map(s=><div className="card stat" key={s.label}><div className={"stat-icon "+s.tone}>{s.icon}</div><span>{s.label}</span><strong>{s.value}</strong><small className={s.tone}>{s.meta}</small><div className="spark"><i/><i/><i/><i/><i/><i/><i/><i/></div></div>)}</div>

          <div className="card priorities">
            <div className="section-head"><div><h3>Central de prioridades</h3><p>O sistema mostra o que precisa ser feito primeiro</p></div><span className="badge">2 itens • 1 urgente</span></div>
            <div className="priority-grid">
              <div className="priority danger"><span className="picon">!</span><div><b>3 entregas pendentes</b><p>Solicitações aguardando envio pelo bot.</p></div><button onClick={()=>setActive("Entregar Passe")}>Processar →</button></div>
              <div className="priority info"><span className="picon">▣</span><div><b>Estoque em bom nível</b><p>128 passes disponíveis para entrega.</p></div><button onClick={()=>setActive("Estoque")}>Ver estoque →</button></div>
            </div>
          </div>

          <div className="card performance">
            <div className="section-head"><div><h3>Desempenho</h3><p>21/09/2026 a 04/10/2026 • comparado com os 14 dias anteriores</p></div><div className="tabs"><button className="selected">Entregas</button><button>Clientes</button><button>Taxa</button><button>7D</button><button className="selected">14D</button><button>30D</button></div></div>
            <div className="chart"><div className="ylabels"><span>60</span><span>45</span><span>30</span><span>15</span><span>0</span></div><div className="chart-area"><div className="gridline"/><div className="gridline"/><div className="gridline"/><div className="gridline"/><svg viewBox="0 0 700 190" preserveAspectRatio="none"><path d="M0 154 C55 150 72 145 120 150 S190 112 235 124 S295 105 345 116 S420 85 465 98 S520 63 570 74 S625 39 700 48" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M0 154 C55 150 72 145 120 150 S190 112 235 124 S295 105 345 116 S420 85 465 98 S520 63 570 74 S625 39 700 48 L700 190 L0 190 Z" fill="currentColor" opacity=".08"/></svg><div className="xlabel"><span>21/09</span><span>24/09</span><span>27/09</span><span>30/09</span><span>03/10</span><span>04/10</span></div></div></div>
          </div>
        </>}

        {active==="Entregar Passe" && <div className="single">
          <div className="card form-card"><h2>Entregar Passe</h2><p>Envie uma solicitação de entrega através da API do bot Telegram.</p><form onSubmit={e=>{e.preventDefault();action("Solicitação preparada. A API será conectada na próxima etapa.")}}><label>ID do jogador<input value={player} onChange={e=>setPlayer(e.target.value)} placeholder="Ex.: 123456789" required/></label><label>Servidor<select value={server} onChange={e=>setServer(e.target.value)}><option>Brasil</option><option>LATAM</option><option>Outros</option></select></label><label>Quantidade<select value={amount} onChange={e=>setAmount(e.target.value)}><option>1</option><option>2</option><option>3</option></select></label><button className="primary">Solicitar entrega →</button></form></div></div>}

        {active==="Estoque" && <div className="single"><div className="card inventory"><div className="section-head"><div><h2>Estoque</h2><p>Controle dos passes disponíveis.</p></div><span className="stock-number">128</span></div><div className="progress"><i style={{width:"76%"}}/></div><div className="stock-row"><span>Estoque atual</span><b>128 / 168</b></div><button className="primary" onClick={()=>action("Integração de reposição será adicionada depois.")}>Configurar reposição →</button></div></div>}

        {active==="Histórico" && <div className="card table-card"><div className="section-head"><div><h2>Histórico de entregas</h2><p>Últimas movimentações do painel.</p></div></div><div className="table"><div className="tr head"><span>Jogador</span><span>Quantidade</span><span>Status</span><span>Horário</span></div>{[["#83920184","1","Concluída","14:18"],["#72938401","1","Concluída","14:07"],["#50128472","2","Pendente","13:54"],["#41023891","1","Concluída","13:41"]].map(r=><div className="tr" key={r[0]}>{r.map((x,i)=><span key={i} className={i===2?(x==="Concluída"?"ok":"pending"):""}>{x}</span>)}</div>)}</div></div>}

        {active==="Configurações" && <div className="card settings"><h2>Configurações</h2><p>Área reservada para a conexão com o bot Telegram e a API autorizada.</p><div className="setting"><div><b>Bot Telegram</b><span>Token e endpoint serão configurados na integração.</span></div><button onClick={()=>action("Configuração da API será adicionada na próxima etapa.")}>Configurar</button></div><div className="setting"><div><b>Status da API</b><span className="connected">● Aguardando configuração</span></div></div></div>}
      </section>
    </main>
    {notice && <div className="toast">✓ {notice}</div>}
  </div>
}

createRoot(document.getElementById("root")).render(<App/>);