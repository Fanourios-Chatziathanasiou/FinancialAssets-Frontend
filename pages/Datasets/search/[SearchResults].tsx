import { useRouter } from "next/router";
import React from "react";
import { useGetSearchAssetsByNameQuery } from "../../../src/services/searchAssetsApi";
import SearchResultsCard from "../../../src/components/searchResults/SearchResultsCard";
import { searchAssetsType } from "../../../src/types/typesCollection";
import DatasetSearchResultsCard from "../../../src/components/searchResults/DatasetSearchResultsCard";
const SearchResults = () => {
	const router = useRouter();
	const { SearchResults } = router.query;
	let data: searchAssetsType[] | undefined = [];
	if (SearchResults !== undefined) {
		data = useGetSearchAssetsByNameQuery(SearchResults as string).data;
	}

	return (
		<>
			<h1 className="text-white text-xl p-10 font-[400]">
				Search results for{" "}
				<span className="font-[300] italic text-xl text-FA-Primary-yellow-vivid-400">{SearchResults}</span>
			</h1>
			<div className="max-w-[1440px] w-[100%] grid grid-cols-auto-fit justify-items-center align-center  gap-36">
				{data?.slice(0, 20).map((searchResultElement: searchAssetsType, index: number) => {
					return (
						<DatasetSearchResultsCard
							country={searchResultElement.country}
							currency={searchResultElement.currency}
							exchange={searchResultElement.exchange}
							name={searchResultElement.name}
							type={searchResultElement.type}
							mic_code={searchResultElement.mic_code}
							symbol={searchResultElement.symbol}
							key={index}
						/>
					);
				})}
			</div>
		</>
	);
};

export default SearchResults;
