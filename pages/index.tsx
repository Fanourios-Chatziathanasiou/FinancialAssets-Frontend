import type { NextPage } from "next";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../src/app/hooks";

import Searchbar from "../src/components/searchBar/SearchBar";
import { updateIsFocused } from "../src/features/isFocusedSlice";

const Home: NextPage = () => {
	const dispatch = useAppDispatch();
	const isFocused = useAppSelector((state) => state.isFocused);

	return (
		<div
			className="w-[100%] h-[100vh] flex flex-col justify-center items-center m-auto animate-appear"
			onClick={() => {
				if (isFocused.value === true) {
					if (!(document.activeElement?.tagName.toLowerCase() === "input")) {
						dispatch(updateIsFocused(false));
					}
				}
			}}
		>
			<Head>
				<title>Financial Assets Analyst</title>
				<meta name="description" content="Financial Assets Tracker for the US" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className=" flex flex-col w-[100%] h-[100%]  justify-evenly items-center  justify-self-start">
				<h1 className="text-white text-2xl font-[700] opacity-90">Financial Assets Analyst</h1>
				<h1 className="text-white text-lg font-[200] animate-pulse">Insights and Data for the US Markets</h1>
			</div>

			<Searchbar RouterPathName={"search/"} />
		</div>
	);
};

export default Home;
