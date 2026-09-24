import artwork from "./artwork/officers.json";

type Portrait = {src:string; thumbnail:string; width:number; height:number; alt:string};
const portraits:Record<string,Portrait> = artwork;

export function OfficerPortrait({id,name,mark,hero=false}:{id:string;name:string;mark:string;hero?:boolean}) {
  const portrait=portraits[id];
  if(!portrait)return <span className="portrait-fallback" aria-label={name}>{mark}</span>;
  // Pre-sized local WebP assets are served directly by the Sites asset binding.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="officer-artwork" src={hero?portrait.src:portrait.thumbnail}
    srcSet={`${portrait.thumbnail} 480w, ${portrait.src} ${portrait.width}w`}
    sizes={hero?"(max-width: 700px) 88vw, (max-width: 1000px) 42vw, 440px":"(max-width: 650px) 88vw, (max-width: 1000px) 43vw, 310px"}
    width={portrait.width} height={portrait.height} alt={portrait.alt}
    loading={hero?"eager":"lazy"} fetchPriority={hero?"high":"auto"} decoding="async"/>
}
