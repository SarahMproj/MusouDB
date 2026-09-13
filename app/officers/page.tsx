import OfficerGrid from "./officer-grid";
import {loadArchive} from "../lib/archive";
export const dynamic="force-dynamic";
export default async function Officers(){return <OfficerGrid {...await loadArchive()}/>;}
