import Link from "next/link";
import Router from "next/router";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateIsFocused } from "../../features/isFocusedSlice";
import { updateInput } from "../../features/searchInputSlice";
import { useGetSearchAssetsByNameQuery } from "../../services/searchAssetsApi";
import SearchBarInputResults from "./SearchBarInputResults";

const SearchBar: React.FC<{ RouterPathName: string }> = ({ RouterPathName }) => {
	const isFocused = useAppSelector((state) => state.isFocused);
	const timer = useRef<any>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const inputValue = useAppSelector((state) => state.searchInput.value);
	const { data } = useGetSearchAssetsByNameQuery(inputValue, {
		skip: inputValue === "",
	});
	const dispatch = useAppDispatch();
	// const [isFocused, setIsFocused] = useState<boolean>(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => {
			dispatch(updateInput(e.target.value));
		}, 50);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && inputValue !== "") {
			dispatch(updateIsFocused(false));
			Router.push(RouterPathName + inputValue);
		}
		if (e.key === "ArrowDown") {
			console.log(document.activeElement?.attributes);
		}
		if (e.key === "ArrowUp") {
			e.preventDefault;
		}
	};

	return (
		<div className=" flex flex-col w-[100%] h-[100%] max-w-4xl  items-center justify-center ">
			<div
				className="relative w-[100%] h-[100%] justify-self-start"
				onClick={() => {
					if (isFocused.value === false) {
						dispatch(updateIsFocused(true));
					}
				}}
				tabIndex={0}
			>
				<div className={"w-[100%] flex flex-col  rounded-lg shadow-customwhite"}>
					<div
						className={
							"flex flex-row w-[100%] bg-[rgb(248,248,248)]  rounded-lg  " +
							(isFocused.value == true &&
							data &&
							data?.length > 0 &&
							inputRef.current?.value &&
							inputRef.current?.value.length > 0
								? "rounded-br-none "
								: "")
						}
					>
						<input
							ref={inputRef}
							className={
								" w-[92%] p-l-2  text-[2.6rem]  font-[300] rounded-l-lg border-none bg-[rgb(248,248,248)] " +
								(isFocused.value == true &&
								data &&
								data?.length > 0 &&
								inputRef.current?.value &&
								inputRef.current?.value.length > 0
									? "rounded-b-none rounded-r-none "
									: "")
							}
							type="text"
							defaultValue={inputValue}
							name="searchInput"
							autoComplete="off"
							id=""
							maxLength={30}
							placeholder="Search FA by Ticker or Name..."
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
						/>
						<button
							type="button"
							className={
								"rounded-r-lg m-auto w-[5%]  border-none " +
								(isFocused.value == true &&
								data &&
								data?.length > 0 &&
								inputRef.current?.value &&
								inputRef.current?.value.length > 0
									? "rounded-b-none rounded-r-none "
									: "")
							}
							onClick={() => {
								inputRef.current?.value ? dispatch(updateIsFocused(false)) : "";
								inputRef.current?.value ? Router.push(RouterPathName + inputRef.current.value) : "";
							}}
						>
							<img src="Assets/searchIcon.png" alt="searchIcon" className="w-[100%] p-0 border-none bg-none " />
						</button>
					</div>
					<SearchBarInputResults data={data} inputValue={inputValue} inputClickedPath={RouterPathName} />
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
