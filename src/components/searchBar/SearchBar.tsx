import Router from "next/router";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateInput } from "../../features/searchInputSlice";
import { useGetSearchAssetsByNameQuery } from "../../services/searchAssetsApi";
import SearchBarInputResults from "./SearchBarInputResults";

const SearchBar: React.FC<{}> = (props) => {
	const timer = useRef<any>(null);
	const inputValue = useAppSelector((state) => state.searchInput.value);
	const { data } = useGetSearchAssetsByNameQuery(inputValue, {
		skip: inputValue === "",
	});
	const dispatch = useAppDispatch();
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => {
			dispatch(updateInput(e.target.value));
		}, 50);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && inputValue !== "") {
			dispatch(updateInput(""));
			Router.push("/search/" + inputValue);
		}
	};

	return (
		<div className=" flex flex-col w-[100%] max-w-4xl h-screen max-h-[1280px]  items-center justify-center">
			<h1>Financial Assets.</h1>
			<div
				className="relative w-[100%] "
				onFocus={() => {
					if (isFocused === false) {
						setIsFocused(true);
					}
				}}
				tabIndex={0}
				onBlur={() => {
					if (isFocused === true) {
						setIsFocused(false);
					}
				}}
			>
				<input
					className=" w-[100%] p-2 rounded-lg text-base  font-poppins font-[400] border-[1px] border-black"
					type="text"
					defaultValue={""}
					name=""
					id=""
					placeholder="Search FA by Ticker or Name..."
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
				<button type="button" className="p-0 absolute right-0  h-[100%]  ">
					<img src="Assets/searchIcon.png" alt="asd" className="h-[100%] rounded-lg " />
				</button>
				<SearchBarInputResults data={data} inputValue={inputValue} isFocused={isFocused} />
			</div>
		</div>
	);
};

export default SearchBar;
