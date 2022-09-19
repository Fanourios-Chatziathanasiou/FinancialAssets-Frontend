import { useRouter } from "next/router";
import React from "react";
import { useGetSearchAssetsByNameQuery } from "../../src/services/searchAssetsApi";
import SearchResultsCard from "../../src/components/searchResults/SearchResultsCard";
import { searchAssetsType } from "../../src/types/typesCollection";
const SearchResults = () => {
	const router = useRouter();
	const { SearchResults } = router.query;
	//@ts-ignore
	const { data } = useGetSearchAssetsByNameQuery(SearchResults);

	return (
		<div className="max-w-[100%] grid grid-cols-auto-fit justify-items-center align-center py-24" style={{ gap: "30px" }}>
			{data?.slice(0, 20).map((searchResultElement: searchAssetsType, index: number) => {
				return (
					<SearchResultsCard
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
	);
};

export default SearchResults;
