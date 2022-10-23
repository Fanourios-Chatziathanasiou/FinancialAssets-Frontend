import { keys } from "@mui/system";
import next from "next";
import Link from "next/link";
import Router from "next/router";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsFocused, updateIsFocused } from "../../features/isFocusedSlice";
import { updateInput } from "../../features/searchInputSlice";
import { useGetSearchAssetsByNameQuery } from "../../services/searchAssetsApi";
import SearchBarInputResults from "./SearchBarInputResults";

const SearchBar: React.FC<{ RouterPathName: string }> = ({ RouterPathName }) => {
	const isFocused = useAppSelector((state) => state.isFocused);
	const timer = useRef<any>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		dispatch(updateInput(""));
	}, []);
	const inputValue = useAppSelector((state) => state.searchInput.value);
	let { data } = useGetSearchAssetsByNameQuery(inputValue, {
		skip: inputValue === "",
	});
	const dispatch = useAppDispatch();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => {
			dispatch(updateInput(e.target.value));
		}, 50);
	};

	const [focusedIndex, setFocusedIndex] = useState(-1);
	const resetSearchComplete = useCallback(() => {
		setFocusedIndex(-1);
		dispatch(updateIsFocused(false));
	}, []);
	const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
		const { key } = e;
		let nextIndexCount = -1;

		// move down
		if (key === "ArrowDown") {
			e.preventDefault();
			data ? (nextIndexCount = (focusedIndex + 1) % data.length) : "";
		}

		// move up
		if (key === "ArrowUp") {
			e.preventDefault();
			if (focusedIndex === -1 && data) {
				setFocusedIndex(data.length - 1);
				return;
			}

			data ? (nextIndexCount = (focusedIndex + data.length - 1) % data.length) : "";
		}

		// hide search results
		if (key === "Escape") {
			resetSearchComplete();
		}

		// select the current item
		if (key === "Enter") {
			e.preventDefault();
			if (inputValue !== "") {
				if (focusedIndex == -1) {
					Router.push(RouterPathName + inputValue);
				} else if (data) {
					Router.push(RouterPathName + data[focusedIndex].symbol);
				}
			}
		}

		setFocusedIndex(nextIndexCount);
	};

	return (
		<div className=" flex flex-col w-[100%] h-[100%] max-w-4xl  items-center justify-center ">
			<div
				className="relative w-[100%] h-[100%] justify-self-start"
				onClick={() => {
					if (isFocused.value === false) {
						dispatch(updateIsFocused(true));
					}
					setFocusedIndex(-1);
				}}
				tabIndex={1}
				onKeyDown={handleKeyDown}
			>
				<div className={"w-[100%] flex flex-col  rounded-lg shadow-customwhite"}>
					<div
						className={
							"flex flex-row w-[100%] bg-[rgb(248,248,248)]  rounded-lg  " +
							(isFocused.value == true && data && data?.length > 0 && inputValue && inputValue.length > 0
								? "rounded-br-none "
								: "")
						}
					>
						<input
							ref={inputRef}
							className={
								" w-[92%] p-l-2  text-[2.6rem]  font-[300] rounded-l-lg border-none bg-[rgb(248,248,248)] " +
								(isFocused.value == true && data && data?.length > 0 && inputValue && inputValue.length > 0
									? "rounded-b-none rounded-r-none "
									: "")
							}
							type="text"
							defaultValue={""}
							name="searchInput"
							autoComplete="off"
							id=""
							maxLength={30}
							placeholder="Search FA by Ticker or Name..."
							onChange={handleInputChange}

							// onKeyDown={handleKeyDownForSearch}
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
					<SearchBarInputResults
						data={data}
						inputValue={inputValue}
						inputClickedPath={RouterPathName}
						focusedIndex={focusedIndex}
						routerPathName={RouterPathName}
					/>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
