import Head from "next/head";
import HeaderNav from "../src/components/navbar/HeaderNav";

export default function Layout({ children }: any) {
	return (
		// max-w-[1440px]
		<div className="lg:px-[2rem]  m-auto bg-[#191c27] min-h-[100rem]    ">
			<HeaderNav />

			<main className="w-[100%] h-[100%]   flex flex-col items-center justify-center mobile:px-6 m-auto   ">{children}</main>
		</div>
	);
}
//
