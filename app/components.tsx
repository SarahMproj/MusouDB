"use client";
import { useEffect, useState } from "react";

export function Header({active}:{active?:string}) {
  return <header className="site-header"><a className="brand" href="/"><span className="brand-seal">無</span><span><strong>MusouDB</strong><small>One database to unite the Three Kingdoms</small></span></a><nav aria-label="Main navigation"><a className={active==="officers"?"active":""} href="/officers">Officers</a><a className={active==="games"?"active":""} href="/games">Games</a><a className={active==="battles"?"active":""} href="/battles">Battles</a><a className={active==="community"?"active":""} href="/community">Community</a></nav><a className="record-button" href="/account"><span>◈</span> My Warrior Record</a></header>;
}

export function Footer(){return <footer><div className="brand"><span className="brand-seal">無</span><span><strong>MusouDB</strong><small>A fan-built, open-source archive</small></span></div><p>Unofficial and not affiliated with or endorsed by KOEI TECMO. Community-authored data; no publisher-owned imagery.</p><a href="https://github.com/SarahMproj/MusouDB" target="_blank" rel="noreferrer">Contribute on GitHub ↗</a></footer>}

export function SaveButton({kind,id,label}:{kind:"officers"|"games",id:string,label:string}){
  const key=`musoudb-${kind}`; const [saved,setSaved]=useState(false);
  useEffect(()=>{try{setSaved(JSON.parse(localStorage.getItem(key)||"[]").includes(id))}catch{}},[id,key]);
  function toggle(){const values:string[]=JSON.parse(localStorage.getItem(key)||"[]");const next=values.includes(id)?values.filter(v=>v!==id):[...values,id];localStorage.setItem(key,JSON.stringify(next));setSaved(!saved)}
  return <button className={`save-action ${saved?"saved":""}`} onClick={toggle}>{saved?"Saved to your record ✓":`Save ${label}`}</button>
}
