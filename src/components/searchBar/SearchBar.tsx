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
		<div className=" flex flex-col w-[100%] h-[100%] max-w-4xl items-center justify-center  ">
			<div
				className="relative w-[100%] h-[100%] justify-self-start"
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
				<div className="w-[100%] flex bg-[rgb(248,248,248)] rounded-lg shadow-customwhite">
					<input
						className=" w-[92%] p-l-2  text-[2.6rem]  font-poppins font-[400]  rounded-l-lg border-none bg-[rgb(248,248,248)] "
						type="text"
						defaultValue={""}
						name=""
						id=""
						placeholder="Search FA by Ticker or Name..."
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
					/>
					<button type="button" className="rounded-r-lg m-auto w-[6%]  border-none bg-none">
						<img src="Assets/searchIcon.png" alt="asd" className="w-[100%] p-0 border-none bg-none " />
					</button>
				</div>

				<SearchBarInputResults data={data} inputValue={inputValue} isFocused={isFocused} />
			</div>
		</div>
	);
};

export default SearchBar;
