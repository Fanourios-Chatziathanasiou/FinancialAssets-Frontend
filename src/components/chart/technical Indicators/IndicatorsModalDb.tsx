import React from "react";

//This file will contain all the parameters required for an indicator to render.
//Different Select options from the popup modal will end up providing different Incicator
//components
const IndicatorsModalDb = (props: Record<string, any>, allFunctions: any) => {
	switch (true) {
		case props.name.startsWith("Exponential Moving Average"):
			return (
				<>
					<div className="p-6 ">
						<label htmlFor="period" className="block  text-sm font-medium text-gray-900 dark:text-gray-300">
							EMA Length
						</label>
						<input
							type="number"
							id="period"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder={props.period}
							defaultValue={props.period}
							min={1}
							max={500}
							required
							onChange={allFunctions.handleChangeNumber}
						/>
					</div>
					<div className="p-6 ">
						<label htmlFor="visitors" className="block  text-sm font-medium text-gray-900 dark:text-gray-300">
							Line Width
						</label>
						<input
							type="number"
							id="lineWidth"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							min={1}
							defaultValue={props.lineWidth}
							placeholder={props.lineWidth}
							max={500}
							required
							onChange={allFunctions.handleChangeNumber}
						/>
					</div>
					<div className="p-6 ">
						<label htmlFor="color" className="  text-sm font-medium text-gray-900 dark:text-gray-300">
							Line Color
						</label>
						<input
							type="color"
							id="color"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[6rem] h-[3rem] p-0 m-0 border-none hover:cursor-pointer"
							placeholder={props.color}
							defaultValue={props.color}
							onChange={allFunctions.handleChangeColor}
							required
						/>
					</div>
					<div className="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
						<button
							data-modal-toggle="defaultModal"
							type="button"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={allFunctions.handleApply}
						>
							Apply
						</button>
						{/* <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
                Decline
            </button> */}
					</div>
				</>
			);
		case props.name.startsWith("Simple Moving Average"):
			return (
				<>
					<div className="p-6 ">
						<label htmlFor="period" className="block  text-sm font-medium text-gray-900 dark:text-gray-300">
							SMA Length
						</label>
						<input
							type="number"
							id="period"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder={props.period}
							defaultValue={props.period}
							min={1}
							max={500}
							required
							onChange={allFunctions.handleChangeNumber}
						/>
					</div>
					<div className="p-6 ">
						<label htmlFor="visitors" className="block  text-sm font-medium text-gray-900 dark:text-gray-300">
							Line Width
						</label>
						<input
							type="number"
							id="lineWidth"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							min={1}
							defaultValue={props.lineWidth}
							placeholder={props.lineWidth}
							max={500}
							required
							onChange={allFunctions.handleChangeNumber}
						/>
					</div>
					<div className="p-6 ">
						<label htmlFor="color" className="  text-sm font-medium text-gray-900 dark:text-gray-300">
							Line Color
						</label>
						<input
							type="color"
							id="color"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[6rem] h-[3rem] p-0 m-0 border-none hover:cursor-pointer"
							placeholder="#FFFFFF"
							defaultValue={"#FFFFFF"}
							onChange={allFunctions.handleChangeColor}
							required
						/>
					</div>
					<div className="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
						<button
							data-modal-toggle="defaultModal"
							type="button"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={allFunctions.handleApply}
						>
							Apply
						</button>
						{/* <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
                Decline
            </button> */}
					</div>
				</>
			);
		case props.name.startsWith("Relative Strength Index"):
			return (
				<>
					<div className="p-6 ">
						<label htmlFor="period" className="block  text-sm font-medium text-gray-900 dark:text-gray-300">
							RSI Length
						</label>
						<input
							type="number"
							id="period"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder={props.period}
							defaultValue={props.period}
							min={1}
							max={500}
							required
							onChange={allFunctions.handleChangeNumber}
						/>
					</div>
					<div className="p-6 ">
						<label htmlFor="visitors" className="block  text-sm font-medium text-gray-900 dark:text-gray-300">
							Line Width
						</label>
						<input
							type="number"
							id="lineWidth"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							min={1}
							defaultValue={props.lineWidth}
							placeholder={props.lineWidth}
							max={500}
							required
							onChange={allFunctions.handleChangeNumber}
						/>
					</div>
					<div className="p-6 ">
						<label htmlFor="color" className="  text-sm font-medium text-gray-900 dark:text-gray-300">
							Line Color
						</label>
						<input
							type="color"
							id="color"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[6rem] h-[3rem] p-0 m-0 border-none hover:cursor-pointer"
							placeholder="#FFFFFF"
							defaultValue={"#FFFFFF"}
							onChange={allFunctions.handleChangeColor}
							required
						/>
					</div>
					<div className="p-6 ">
						<label htmlFor="overboughtThreshold" className="  text-sm font-medium text-gray-900 dark:text-gray-300">
							Overbought Threshold
						</label>
						<input
							type="number"
							id="overboughtThreshold"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							min={1}
							defaultValue={props.overboughtThreshold}
							placeholder={props.overboughtThreshold}
							max={100}
							maxLength={3}
							required
							onChange={allFunctions.handleChangeNumber}
						/>
					</div>
					<div className="p-6 ">
						<label htmlFor="oversoldThreshold" className="  text-sm font-medium text-gray-900 dark:text-gray-300">
							Oversold Threshold
						</label>
						<input
							type="number"
							id="oversoldThreshold"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							min={1}
							defaultValue={props.oversoldThreshold}
							placeholder={props.oversoldThreshold}
							max={100}
							maxLength={3}
							required
							onChange={allFunctions.handleChangeNumber}
						/>
					</div>
					<div className="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
						<button
							data-modal-toggle="defaultModal"
							type="button"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={allFunctions.handleApply}
						>
							Apply
						</button>
						{/* <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
                Decline
            </button> */}
					</div>
				</>
			);

		default:
			break;
	}
};

export default IndicatorsModalDb;
