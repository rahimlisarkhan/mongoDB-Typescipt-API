import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/client'

type Props = {

}

export const Header: React.FC = (Props) => {

    const [session, loading] = useSession()


    const handleLogout = () => {
        signOut()
    }

    return (
        <header>
            <div className="logo">
                Codio
            </div>
            <nav className='nav-content'>
                {session &&
                    <ul>
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <a>About</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/feedback">
                                <a>Feedback</a>
                            </Link>
                        </li>
                        <li>

                        </li>
                    </ul>}
                <button onClick={handleLogout} >
                    Logout
                </button>
            </nav>
        </header>

    )
}
