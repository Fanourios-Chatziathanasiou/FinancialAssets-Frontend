import type { NextPage } from "next";
import Head from "next/head";
import Searchbar from "../src/components/searchBar/SearchBar";
import SearchResultsCard from "../src/components/searchResults/SearchResultsCard";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Financial Assets Analyst</title>
				<meta name="description" content="Financial Assets Tracker for the US" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Searchbar />
		</>
	);
};

export default Home;
