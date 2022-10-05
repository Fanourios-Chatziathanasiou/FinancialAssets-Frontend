import { AnyMap } from "immer/dist/internal";
import Link from "next/link";
import React from "react";
import { useGetAssetDataByNameQuery } from "../../services/assetDataApi";
import { searchAssetsType } from "../../types/typesCollection";

const DatasetSearchResultsCard = (props: searchAssetsType) => {
	async function generateCSV() {
		const tempcsv = [];

		const req = await fetch(`${process.env.NEXT_PUBLIC_ASSETDATA_API_ENDPOINT}/symbol=${props.symbol}&interval=1day`);
		const data = await req.json();

		const headers = Object.keys(data.values[0]);
		tempcsv.push(headers.join(","));

		for (const row of data.values) {
			const values = headers.map((header) => {
				const escaped = ("" + row[header]).replace(/"/g, '\\"');
				return `"${escaped}"`;
			});
			tempcsv.push(values.join(","));
		}
		download(tempcsv.join("\n"));
	}

	function download(data: any) {
		const blob = new Blob([data], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.setAttribute("hidden", "");
		a.setAttribute("href", url);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	return (
		<div className="bg-[#f8ffff] flex flex-col w-[100%] px-5  max-w-md  rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700   ">
			<h1 className=" text-2xl inline-flex justify-center items-center mobile:text-xl  ">{props.symbol}</h1>
			<div className="p-5">
				<a href="#">
					<h5 className="mb-2 text-base text-center  font-[400] tracking-tight text-gray-900 dark:text-white underline">
						{props.name} - {props.currency.toUpperCase()}
					</h5>
				</a>
			</div>
			<div className="flex flex-col h-[100%] justify-end  pb-6">
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Exchange: {props.exchange}</p>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Type: {props.type}</p>
				<p className="mb-6 font-normal text-gray-700 dark:text-gray-400">Country: {props.country}</p>
			</div>
			<div className="flex flex-col justify-end  pb-6" onClick={generateCSV}>
				<a className=" w-[100%] flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer ">
					Download
					<svg
						aria-hidden="true"
						className="ml-2 -mr-1 w-4 h-4"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
				</a>
			</div>
		</div>
	);
};

export default DatasetSearchResultsCard;
