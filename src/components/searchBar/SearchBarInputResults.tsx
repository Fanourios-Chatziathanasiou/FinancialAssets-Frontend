import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import internal from "stream";
import { useAppSelector } from "../../app/hooks";
import { updateIsFocused } from "../../features/isFocusedSlice";
import { searchAssetsType } from "../../types/typesCollection";

type searchBaInputTypes = {
	data: searchAssetsType[] | undefined;
	// isFocused: boolean;
	inputValue: string;
	inputClickedPath: string;
	focusedIndex: number;
	routerPathName: string;
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
						{isFocused.value && props.data && props.data.length > 0 && props.inputValue !== ""
							? props.data.map((obj: any, index: number) => {
									return (
										<Link
											href={
												props.inputClickedPath === `/Datasets/search/`
													? `${props.routerPathName}/${obj.name}`
													: `${props.routerPathName}/${obj.symbol}`
											}
											onClick={() => {
												dispatch(updateIsFocused(false));
											}}
										>
											<li
												style={{
													backgroundColor: index === props.focusedIndex ? "rgba(0,0,0,0.1)" : "",
												}}
												key={index}
												className=" p-3  text-sm font-[600] text-FA-Primary-blue-grey-900  hover:bg-FA-Primary-blue-grey-600 hover:text-white cursor-pointer"
											>
												<a>
													{obj.name} - Symbol: {obj.symbol}
												</a>
											</li>
										</Link>
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
