import { Sonsie_One } from 'next/font/google';
import Link from 'next/link';
import { name } from './layout'

const sonsie = Sonsie_One({
    subsets: ['latin'],
    weight: '400'
  })

export default function NavBar() {
    return (
        <nav className='nav'>
            <ul className='nav-list'>
                <li className='logo'>
                    <Link href="/">
                    <div className='logo-fw'><div className='logo-f'><div className={sonsie.className}>F</div></div></div>
                    <div className='logo-link'>{name}</div>
                    </Link>
                </li>
                <li className='menu'>
                    <Link href="/blog/">
                        Blog
                    </Link>
                </li>
            </ul>
        </nav>
    )
}