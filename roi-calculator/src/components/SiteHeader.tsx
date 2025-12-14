'use client';

import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
    return (
        <header className="site-header">
            <a href="https://www.actarion.com" className="site-header__logo">
                <Image
                    src="/actarion-logo.png"
                    alt="ActARion"
                    width={32}
                    height={32}
                    priority
                />
                <span className="site-header__logo-text">ActARion</span>
            </a>

            <nav className="site-header__nav">
                <Link href="/" className="site-header__link">
                    Quick Calculator
                </Link>
                <Link href="/calculator" className="site-header__link">
                    Detailed Calculator
                </Link>
                <a
                    href="https://www.actarion.com/en/contact"
                    className="site-header__cta"
                >
                    Contact Us
                </a>
            </nav>
        </header>
    );
}
