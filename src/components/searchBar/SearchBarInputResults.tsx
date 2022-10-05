import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { updateIsFocused } from "../../features/isFocusedSlice";
import { searchAssetsType } from "../../types/typesCollection";

type searchBaInputTypes = {
	data: searchAssetsType[] | undefined;
	// isFocused: boolean;
	inputValue: string;
	inputClickedPath: string;
};

export const SearchBarInputResults = React.memo(
	(props: searchBaInputTypes) => {
		const isFocused = useAppSelector((state) => state.isFocused);
		const dispatch = useDispatch();
		return (
			<>
				{isFocused.value && props.data && props.data.length > 0 && props.inputValue !== "" ? (
					<ul
						id="searchResults"
						className="p-0  max-h-96  rounded-b-lg w-[100%] bg-FA-Primary-blue-grey-050 overflow-y-scroll "
					>
						{isFocused.value && props.data && props.data.length > 0
							? props.data.map((obj: any, index: number) => {
									return (
										<li
											key={index}
											className=" p-3  text-sm font-[600] text-FA-Primary-blue-grey-900  hover:bg-FA-Primary-blue-grey-600 hover:text-white cursor-pointer"
										>
											<Link
												href={
													props.inputClickedPath === `/Datasets/search/`
														? `/Datasets/search/${obj.name}`
														: `/chart/${obj.exchange}/${obj.symbol}`
												}
												onClick={() => {
													dispatch(updateIsFocused(false));
												}}
											>
												<a>
													{obj.name} - Symbol: {obj.symbol}
												</a>
											</Link>
										</li>
									);
							  })
							: ""}
					</ul>
				) : (
					""
				)}
			</>
		);
	},
	(prevProps, nextProps) => JSON.stringify(prevProps) === JSON.stringify(nextProps)
);

export default SearchBarInputResults;
