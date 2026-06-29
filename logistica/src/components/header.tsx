import { createClient } from "@/prismicio";
import NavBar from "@/components/navbar";

export default async function Header() {

    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <header className="fixed top-0 left-0 z-50 w-full transition-all duration-300">
            <NavBar settings={settings} />
        </header>
    );
}