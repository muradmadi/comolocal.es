import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.svg';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Venues', href: '/venues/' },
    { name: 'Events', href: '/events/' },
    { name: 'Map', href: '/map/' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <a href="/" className="block text-primary hover:opacity-90 transition-opacity">
                            <span className="sr-only">Comolocal</span>
                            <svg
                                viewBox="0 900 2400 600"
                                className="h-10 w-auto md:h-12"
                                preserveAspectRatio="xMidYMid meet"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <g transform="translate(0,2400) scale(0.1,-0.1)">
                                    <path d="M13300 12160 l0 -1390 27 0 c14 0 143 -2 286 -4 143 -2 266 -2 274 1 11 4 13 245 13 1394 l0 1389 -300 0 -300 0 0 -1390z" />
                                    <path d="M21550 12160 l0 -1390 303 2 c234 2 302 6 301 16 -1 6 -2 631 -2 1387 l-2 1375 -300 0 -300 0 0 -1390z" />
                                    <path d="M3155 13483 c-309 -20 -552 -108 -782 -282 -259 -196 -443 -496 -510 -829 -24 -121 -25 -412 -1 -537 105 -549 510 -947 1092 -1073 104 -22 145 -26 296 -26 151 0 192 4 300 27 156 33 230 57 348 112 277 131 504 373 618 662 20 48 38 94 41 101 4 9 -64 12 -323 12 -181 0 -334 -4 -339 -8 -6 -4 -16 -19 -23 -33 -65 -126 -238 -259 -392 -303 -102 -28 -228 -36 -342 -21 -189 25 -320 87 -444 210 -122 121 -197 264 -223 426 -16 95 -13 285 5 380 50 267 208 475 438 579 99 45 185 62 321 62 278 0 473 -95 625 -302 27 -39 56 -70 63 -70 85 -2 632 1 634 4 7 7 -89 224 -129 291 -117 198 -298 365 -516 474 -82 41 -246 96 -347 115 -78 15 -300 37 -340 34 -11 -1 -42 -3 -70 -5z" />
                                    <path d="M15086 12974 c-290 -57 -568 -241 -734 -486 -52 -76 -131 -237 -157 -321 -130 -411 -15 -873 295 -1178 256 -252 593 -374 948 -341 260 23 460 109 673 288 167 142 306 364 366 591 23 87 26 117 27 273 1 193 -9 264 -56 400 -141 403 -490 703 -902 775 -110 19 -363 19 -460 -1z m271 -504 c760 0 795 -1 780 -18 -14 -15 -90 -168 -232 -467 -23 -49 -84 -175 -134 -279 -50 -103 -91 -189 -91 -191 0 -1 -71 -148 -158 -326 -87 -178 -164 -339 -172 -357 -17 -45 -25 -35 -93 113 -30 66 -129 271 -219 455 -90 184 -202 416 -248 515 -47 99 -126 263 -177 364 -51 101 -90 188 -87 193 3 5 13 7 21 4 8 -3 373 -6 810 -6z" />
                                    <path d="M15245 12227 c-130 -63 -178 -190 -121 -314 30 -64 87 -108 161 -123 79 -16 151 8 211 72 46 49 64 90 64 150 -1 122 -89 217 -216 233 -40 5 -59 1 -99 -18z" />
                                    <path d="M5705 12890 c-173 -14 -341 -68 -477 -153 -143 -90 -241 -187 -348 -346 -235 -350 -215 -883 45 -1221 56 -73 191 -200 268 -252 88 -60 233 -124 344 -154 132 -34 337 -43 470 -20 272 47 515 174 660 344 236 279 325 608 258 957 -18 94 -38 153 -91 262 -193 403 -622 624 -1129 583z m237 -531 c179 -37 324 -182 373 -373 72 -283 -40 -564 -267 -671 -151 -70 -291 -71 -433 -1 -187 92 -289 268 -289 496 1 125 19 204 71 303 66 125 189 222 313 246 65 13 171 13 232 0z" />
                                    <path d="M19835 12890 c-210 -17 -373 -91 -535 -246 -142 -136 -258 -345 -304 -549 -64 -279 -37 -545 80 -802 64 -142 199 -305 330 -399 154 -111 287 -154 494 -161 128 -5 157 -3 233 17 165 41 294 115 396 226 32 36 61 61 64 57 3 -5 1 -64 -4 -132 -6 -68 -9 -125 -7 -127 3 -3 430 -6 581 -4 l27 0 0 1040 0 1040 -290 0 c-159 0 -293 0 -297 0 -5 0 -8 -56 -8 -125 0 -69 -1 -125 -3 -125 -1 0 -34 31 -72 69 -173 173 -391 243 -685 221z m345 -541 c335 -53 522 -468 361 -804 -78 -164 -263 -279 -446 -278 -233 2 -446 179 -494 411 -27 131 -3 314 56 425 41 78 139 172 216 207 102 48 185 59 307 39z" />
                                    <path d="M8210 12874 c-36 -7 -103 -32 -150 -55 -68 -34 -103 -60 -174 -131 -49 -49 -91 -86 -94 -83 -3 3 -4 59 -3 125 l2 120 -300 0 -301 0 0 -1040 0 -1040 305 0 304 0 3 658 3 657 31 65 c36 77 116 163 177 190 106 47 264 46 369 -3 108 -50 189 -168 209 -304 7 -42 9 -297 7 -663 l-3 -595 295 -6 c162 -3 298 -4 303 -2 4 3 7 278 7 612 0 365 4 630 10 662 25 132 127 268 230 306 202 75 419 2 507 -171 50 -99 53 -133 53 -793 0 -336 3 -613 8 -615 4 -2 139 -2 300 0 l292 3 0 647 c0 356 -5 688 -10 738 -39 371 -276 643 -620 714 -88 18 -128 21 -245 17 -157 -5 -230 -23 -350 -85 -78 -41 -235 -189 -270 -254 -11 -21 -22 -38 -25 -38 -3 0 -20 24 -38 54 -17 30 -63 83 -101 118 -111 102 -227 163 -370 193 -89 19 -273 18 -361 -1z" />
                                    <path d="M11672 12870 c-396 -86 -693 -371 -809 -780 -37 -128 -43 -356 -13 -499 79 -384 335 -671 715 -800 140 -47 259 -64 400 -58 439 21 767 217 968 578 54 97 86 192 108 317 43 252 9 478 -103 694 -143 274 -393 470 -688 540 -131 31 -451 35 -578 8z m401 -515 c142 -37 246 -124 315 -265 50 -101 67 -202 57 -325 -26 -301 -223 -495 -501 -495 -147 0 -281 55 -370 151 -108 116 -161 308 -134 484 35 233 167 397 362 449 70 19 200 20 271 1z" />
                                    <path d="M17516 12874 c-272 -54 -503 -206 -651 -429 -139 -208 -194 -417 -183 -692 6 -149 26 -242 79 -371 132 -323 430 -561 794 -633 89 -18 326 -18 425 0 346 61 612 257 754 555 48 98 86 203 78 211 -3 3 -146 5 -318 5 l-314 0 -21 -42 c-12 -24 -49 -69 -81 -100 -129 -124 -330 -150 -506 -66 -122 58 -229 191 -263 328 -22 85 -17 300 8 377 48 145 147 268 260 321 54 25 68 27 188 27 121 0 134 -2 189 -28 83 -38 138 -87 187 -162 l42 -65 313 0 c256 0 314 2 314 13 0 22 -35 117 -73 199 -138 299 -388 486 -736 552 -104 20 -386 20 -485 0z" />
                                </g>
                            </svg>
                        </a>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <a
                            href="/contact/"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                        >
                            <MessageCircle className="h-4 w-4" />
                            Send us a message
                        </a>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus:outline-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden animate-in slide-in-from-top-5 fade-in duration-200">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-background border-b border-border">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                {item.name}
                            </a>
                        ))}
                        {/* Mobile CTA */}
                        <a
                            href="/contact/"
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-accent"
                        >
                            <MessageCircle className="h-4 w-4" />
                            Send us a message
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}

