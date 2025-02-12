import "../styles/globals.css";
import { RecoilRoot } from "recoil";

function DebugObserver(): any {
    return null;
}



export default function RecoidContextProvider({ children }: { children: React.ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>;
}

