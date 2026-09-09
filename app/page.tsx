import Home from "./home-client";
import {loadArchive} from "./lib/archive";
export const dynamic="force-dynamic";
export default async function Page(){return <Home {...await loadArchive()}/>;}
