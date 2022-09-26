import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import EmaIndicator from "../chart/technical Indicators/chart internal Indicators/EmaIndicator";
import React, { useState } from "react";
import uuid from "react-uuid";
import IndicatorsDb from "../chart/technical Indicators/IndicatorsDb";

const IndicatorsModal = (props: any) => {
	const [isShowing, setIsShowing] = useState<boolean>(false);

	const onClick = () => {
		setIsShowing(true);
	};

	const onClose = () => {
		setIsShowing(false);
	};
	function enforceMinMax(el: any) {
		if (el.value != "") {
			if (parseInt(el.value) < parseInt(el.min)) {
				el.value = el.min;
			}
			if (parseInt(el.value) > parseInt(el.max)) {
				el.value = el.max;
			}
		}
	}
	const [indicatorParams, setIndicatorParams] = useState<Record<string, any>>({});
	const handleApply = () => {
		const generatedComponent = IndicatorsDb({
			name: indicatorParams.name,
			color: indicatorParams.color,
			period: indicatorParams.period,
			lineWidth: indicatorParams.lineWidth,
			chartParameters: props.chartParameters,
			positionMultiplier: props.internalIndicatorsArray.length,
			id: uuid(),
		});

		if (generatedComponent !== undefined) {
			props.setInternalIndicatorsArray((prevState: JSX.Element[]) => prevState.concat(generatedComponent));
		} else {
			console.log("This Combination does not exist in the database");
		}
		setIsShowing(false);
	};

	const handleChange = (e: any) => {
		console.log(e);
		const id = e.target.id;
		const value = e.target.value;
		setIndicatorParams({ ...indicatorParams, [id]: value });
		console.log(indicatorParams);
	};

	const handleChangeNumber = (e: any) => {
		console.log(e);
		const id = e.target.id;
		const value = e.target.valueAsNumber;
		setIndicatorParams({ ...indicatorParams, [id]: value });
		console.log(indicatorParams);
	};

	return (
		<React.Fragment>
			<Button
				style={{ paddingBlock: "0.1rem", paddingInline: "1.2rem", border: "0.2rem solid white", background: "none" }}
				onClick={onClick}
			>
				Indicators
			</Button>
			<Modal show={isShowing} size="4xl" popup={true} onClose={onClose}>
				<Modal.Header />
				<Modal.Body>
					<div className="relative p-4 w-full  h-full md:h-auto m-auto ">
						<div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Technical Indicators</h3>
						</div>

						<div className="p-6 ">
							<label htmlFor="name" className="block  text-sm font-medium text-gray-900 dark:text-gray-400">
								Select Indicator
							</label>
							<select
								id="name"
								className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5  leading-[150%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								onChange={handleChange}
							>
								<option selected value="">
									Select Technical Indicator
								</option>
								<option value="EMA">Exponential Moving Average</option>
								<option value="SMA">Simple Moving Average</option>
								<option value="RSI">Relative Strength Index</option>
								<option value="MACD">MACD</option>
							</select>
							{/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to
                ensure a common set of data rights in the European Union. It requires organizations to notify users as soon
                as possible of high-risk data breaches that could personally affect them.
            </p> */}
						</div>
						<div className="p-6 ">
							<label htmlFor="period" className="block  text-sm font-medium text-gray-900 dark:text-gray-300">
								EMA Length
							</label>
							<input
								type="number"
								id="period"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder=""
								min={0}
								max={500}
								required
								onChange={handleChangeNumber}
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
								placeholder=""
								min={0}
								max={500}
								required
								onChange={handleChangeNumber}
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
								placeholder=""
								onChange={handleChange}
								required
							/>
						</div>
						<div className="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
							<button
								data-modal-toggle="defaultModal"
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								onClick={handleApply}
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
					</div>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
};

export default IndicatorsModal;
