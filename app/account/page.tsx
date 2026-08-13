import {Footer,Header} from "../components";import {requireChatGPTUser,chatGPTSignOutPath} from "../chatgpt-auth";import AccountClient from "./account-client";
export const dynamic="force-dynamic";
async function Account(){const user=await requireChatGPTUser("/account");return <><section className="record-hero"><p className="eyebrow"><span/>SIGNED-IN RECORD</p><h1>Your Warrior Record</h1><p>Welcome, {user.displayName}. Your profile and progress now travel with you.</p><a className="signout-link" href={chatGPTSignOutPath("/")}>Sign out</a></section><section className="account-body"><AccountClient fallbackName={user.displayName}/></section></>}
export default function AccountPage(){return <main><Header/><Account/><Footer/></main>}
