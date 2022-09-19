import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { searchAssetsType } from "../../types/typesCollection";

type searchBaInputTypes = {
	data: searchAssetsType[] | undefined;
	isFocused: boolean;
	inputValue: string;
};

export const SearchBarInputResults = React.memo(
	(props: searchBaInputTypes) => {
		const rendercount = useRef<any>(0);
		return (
			<>
				{props.isFocused == true && props.data && props.data.length > 0 && props.inputValue !== "" ? (
					<ul className="p-0  max-h-60 absolute mt-1 rounded-lg w-[100%] bg-white border-[1px] border-FA-Primary-blue-grey-900 overflow-y-scroll ">
						{props.isFocused == true && props.data && props.data.length > 0
							? props.data.slice(0, 10).map((obj: any, index: number) => {
									return (
										<Link
											href={{
												pathname: `/search/${obj.name}`,
											}}
										>
											<li
												key={index}
												className=" p-2 border-[1px]  font-[300] border-FA-Primary-blue-grey-400 text-sm hover:bg-FA-Primary-purple-300 hover:text-white cursor-pointer"
											>
												{obj.name}-{obj.symbol}
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
