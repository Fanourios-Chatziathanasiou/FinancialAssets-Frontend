import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className=" rounded-lg p-4 w-full max-w-[2240px] m-auto bg-[rgb(248,248,248)]   md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
			<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© 2022{" "}
				<Link href="https://www.unipi.gr/unipi/en/">
					<a target={"_blank"} className="hover:underline">
						University of Piraeus
					</a>
				</Link>
			</span>
			<ul className="  flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 gap-8">
				<li>
					<Link href="https://www.unipi.gr/unipi/en/">
						<a target={"_blank"} className="hover:underline">
							About
						</a>
					</Link>
				</li>
				<li>
					<Link href="https://www.linkedin.com/in/fanourios-chatziathanasiou/">
						<a target={"_blank"} className="hover:underline">
							LinkedIn Profile
						</a>
					</Link>
				</li>
				<li>
					<Link href="https://github.com/Fanourios-Chatziathanasiou">
						<a target={"_blank"} className="hover:underline">
							Github Profile
						</a>
					</Link>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
