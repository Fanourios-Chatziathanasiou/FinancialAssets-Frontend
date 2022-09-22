import type { NextPage } from "next";
import Head from "next/head";
import { PriceChart } from "../src/components/chart/PriceChart";
import Searchbar from "../src/components/searchBar/SearchBar";
import SearchResultsCard from "../src/components/searchResults/SearchResultsCard";

const Home: NextPage = () => {
	return (
		<div className="w-[100%] h-[100vh] flex flex-col justify-center items-center m-auto">
			<Head>
				<title>Financial Assets Analyst</title>
				<meta name="description" content="Financial Assets Tracker for the US" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className=" flex flex-col w-[100%] h-[100%]  justify-evenly items-center  justify-self-start">
				<h1 className="text-white text-2xl font-[700]">Financial Assets Analyst</h1>
				<h1 className="text-white text-lg font-[200] animate-pulse">Insights and Data for the US Markets</h1>
			</div>

			<Searchbar />
		</div>
	);
};

export default Home;
