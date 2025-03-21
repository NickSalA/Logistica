/* import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link"; */

export default async function Footer(){
/*     const client = createClient();
    const settings = await client.getSingle("settings");
 */
    return (
        <footer>
            {/* <Link href="/">{settings.data.title}</Link>
            <nav>
                <ul>
                    {settings.data.nav.map(({link, label}) => (
                        <li key={label}>
                            <PrismicNextLink field={link}>
                            {label}
                            </PrismicNextLink>
                        </li>
                    ))}
                </ul>
            </nav> */}
        </footer>
    )
}

