import {Footer,Header} from "../components";import {requireChatGPTUser} from "../chatgpt-auth";import EditorClient from "./editor-client";
export const dynamic="force-dynamic";
async function Queue(){await requireChatGPTUser("/editor");return <EditorClient/>}
export default function EditorPage(){return <main><Header/><section className="archive-hero"><p className="eyebrow"><span/>EDITORIAL WORKSPACE</p><h1>Review the archive</h1><p>Verify sources, protect readers from spoilers, and turn community knowledge into attributable revisions.</p></section><section className="archive-body"><Queue/></section><Footer/></main>}
