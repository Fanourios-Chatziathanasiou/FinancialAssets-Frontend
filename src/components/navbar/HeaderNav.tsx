import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import useWindowDimensions from "../../tools/useWindowDimensions";
const HeaderNav: React.FC<{}> = () => {
	const [isMenu, setMenu] = useState<boolean>(false);

	const width = useWindowDimensions();
	useEffect(() => {
		if (width >= 768) {
			setMenu(false);
		}
	}, [width]);
	return (
		<nav className="bg-[rgb(248,248,248)] border-gray-200 px-2 sm:px-4 py-2.5 rounded-lg dark:bg-gray-900  m-auto">
			<div className="container flex flex-wrap justify-between items-center mx-auto">
				<Link href="/">
					<a className="flex items-center" onClick={() => setMenu(false)}>
						<span className="self-center text-xl  font-[600] text-FA-Primary-blue-grey-900 whitespace-nowrap dark:text-white">
							FA Analyst
						</span>
					</a>
				</Link>

				<button
					onClick={() => {
						setMenu((prevstate) => !prevstate);
					}}
					data-collapse-toggle="navbar-default"
					type="button"
					className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					aria-controls="navbar-default"
					aria-expanded="false"
				>
					<span className="sr-only">Open main menu</span>
					<svg
						className="w-10 h-10"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
				<div className={(isMenu ? "" : "hidden") + " w-full md:block md:w-auto"} id="navbar-default">
					<ul className="flex flex-col p-4 mt-4 bg-FA-neutral-yellow-grey-100 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-[rgb(248,248,248)] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 mobile:bg-FA-Primary-blue-grey-100">
						<li>
							<Link href="/">
								<a
									onClick={() => setMenu(false)}
									className="block py-2 pr-4 pl-3 text-gray-700 font-[400] rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
								mobile:hover:bg-FA-Primary-purple-900 mobile:hover:text-FA-Primary-red-vivid-050"
								>
									Charts
								</a>
							</Link>
						</li>
						<li className="">
							<Link href="/Datasets">
								<a
									onClick={() => setMenu(false)}
									className="  block py-2 pr-4 pl-3 text-gray-700 font-[400] rounded-md md:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white
								mobile:hover:bg-FA-Primary-purple-900 mobile:hover:text-FA-Primary-red-vivid-050"
									aria-current="page"
								>
									Datasets
								</a>
							</Link>
						</li>

						<li>
							<Link href="/MarketAnalysis">
								<a
									onClick={() => setMenu(false)}
									className="block py-2 pr-4 pl-3 text-gray-700 font-[400] rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
								mobile:hover:bg-FA-Primary-purple-900 mobile:hover:text-FA-Primary-red-vivid-050"
								>
									Market Analysis
								</a>
							</Link>
						</li>

						<li>
							<Link href="/About">
								<a
									onClick={() => setMenu(false)}
									className="block py-2 pr-4 pl-3 text-gray-700 font-[400] rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
								mobile:hover:bg-FA-Primary-purple-900 mobile:hover:text-FA-Primary-red-vivid-050"
								>
									About
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default HeaderNav;
