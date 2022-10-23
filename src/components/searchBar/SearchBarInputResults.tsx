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
		const resultContainer = useRef<HTMLLIElement>(null);
		useEffect(() => {
			if (!resultContainer.current) return;

			resultContainer.current.scrollIntoView({
				block: "nearest",
			});
		}, [props.focusedIndex]);
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
												ref={index === props.focusedIndex ? resultContainer : null}
												style={{
													backgroundColor: index === props.focusedIndex ? "rgb(72 101 129 / var(--tw-bg-opacity))" : "",
													color: index === props.focusedIndex ? "white" : "",
												}}
												key={index}
												className=" p-3  text-sm font-[600] text-FA-Primary-blue-grey-900  hover:bg-FA-Primary-blue-grey-400 hover:text-white cursor-pointer"
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
