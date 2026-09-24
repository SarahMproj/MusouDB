"use client";
import { useEffect, useState } from "react";
import { readOfficers, readGameProgress, toggleOfficer, setGameProgress } from "./local-record";

export function Header({active}:{active?:string}) {
  return <header className="site-header"><a className="brand" href="/"><span className="brand-seal">無</span><span><strong>MusouDB</strong><small>One database to unite the Three Kingdoms</small></span></a><nav aria-label="Main navigation"><a className={active==="officers"?"active":""} href="/officers">Officers</a><a className={active==="games"?"active":""} href="/games">Games</a><a className={active==="battles"?"active":""} href="/battles">Battles</a><a className={active==="community"?"active":""} href="/community">Community</a></nav><a className="record-button" href="/account"><span>◈</span> My Warrior Record</a></header>;
}

export function Footer(){return <footer><div className="brand"><span className="brand-seal">無</span><span><strong>MusouDB</strong><small>A fan-built, open-source archive</small></span></div><p>Unofficial and not affiliated with or endorsed by KOEI TECMO. Community-authored data and AI-generated original portraits.</p><a href="https://github.com/SarahMproj/MusouDB" target="_blank" rel="noreferrer">Contribute on GitHub ↗</a></footer>}

export function SaveButton({kind,id,label}:{kind:"officers"|"games",id:string,label:string}){
  const [saved,setSaved]=useState(false);
  const [ready,setReady]=useState(false);
  const [error,setError]=useState("");
  useEffect(()=>{
    function refresh(){try{setSaved(kind==="officers"?readOfficers(localStorage).includes(id):!!readGameProgress(localStorage)[id]);setReady(true)}catch{setError("Device storage is unavailable.")}}
    refresh();window.addEventListener("storage",refresh);
    return()=>window.removeEventListener("storage",refresh);
  },[id,kind]);
  function toggle(){try{
    const next=kind==="officers"?toggleOfficer(localStorage,id).includes(id):!!setGameProgress(localStorage,id,readGameProgress(localStorage)[id]?undefined:"owned")[id];
    setSaved(next);setError("");
  }catch{setError("Could not save on this device. Check your browser storage settings.")}}
  return <><button className={`save-action ${saved?"saved":""}`} disabled={!ready} aria-pressed={saved} onClick={toggle}>{saved?"Saved on this device ✓":`Save ${label}`}</button><a className="public-link" href="/record">View device record →</a>{error&&<p role="alert">{error}</p>}</>;
}
