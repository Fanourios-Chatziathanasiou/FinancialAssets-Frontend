import { Button, Modal } from "flowbite-react";
import React, { useRef, useState } from "react";
import uuid from "react-uuid";
import IndicatorsInitialValuesDb from "../chart/technical Indicators/IndicatorsInitialValuesDb";
import IndicatorsModalDb from "../chart/technical Indicators/IndicatorsModalDb";
import indicatorsModalGeneratedComponentDb from "./indicatorsModalGeneratedComponentDb";

const IndicatorsModal = (props: any) => {
	const [isShowing, setIsShowing] = useState<boolean>(false);
	const [indicatorParams, setIndicatorParams] = useState<Record<string, any>>({ name: "" });
	const selectRef = useRef<HTMLSelectElement>(null);
	const handleApply = () => {
		const generatedComponent = indicatorsModalGeneratedComponentDb({
			...indicatorParams,
			chartParameters: props.chartParameters,
		});
		const checkDuplicates = props.indicatorsArray.filter((indicator: any) => {
			return indicator.name === indicatorParams.name + " - " + indicatorParams.period;
		});

		const isGeneratedComponentParameterUndefined = Object.values(generatedComponent).findIndex((el) => el === undefined);
		if (checkDuplicates.length > 0 || isGeneratedComponentParameterUndefined !== -1) {
			selectRef.current!.selectedIndex = 0;
			setIndicatorParams({ name: "" });
			setIsShowing(false);
			return;
		}

		if (generatedComponent !== undefined) {
			props.setindicatorsArray((prevState: any) => [...prevState, generatedComponent]);
			selectRef.current!.selectedIndex = 0;
			setIndicatorParams({ name: "" });
		} else {
			console.log("This Combination does not exist in the database");
		}
		setIsShowing(false);
	};

	const handleChange = (e: any) => {
		const positionMultiplier = props.indicatorsArray.length;
		const valuesJSON = JSON.parse(e.target.value);
		const initialValues = IndicatorsInitialValuesDb({ ...valuesJSON, positionMultiplier: positionMultiplier });
		setIndicatorParams(initialValues);
	};
	const handleChangeColor = (e: any) => {
		const colorObject = {
			[e.target.id]: e.target.value,
		};

		setIndicatorParams({ ...indicatorParams, ...colorObject });
	};

	const handleChangeNumber = (e: any) => {
		console.log(e);
		const id = e.target.id;
		const value = e.target.valueAsNumber;
		setIndicatorParams({ ...indicatorParams, [id]: value });
	};

	const onClick = () => {
		setIsShowing(true);
	};

	const onClose = () => {
		selectRef.current!.selectedIndex = 0;
		setIndicatorParams({ name: "" });
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
	const allFunctions = {
		handleChangeNumber: handleChangeNumber,
		handleChangeColor: handleChangeColor,
		handleApply: handleApply,
	};

	return (
		<React.Fragment>
			<Button
				style={{
					paddingBlock: "0.1rem",
					paddingInline: "1.2rem",
					border: "0.2rem solid white",
					background: "none",
				}}
				onClick={onClick}
			>
				Indicators
			</Button>
			<Modal show={isShowing} size="4xl" popup={true} onClose={onClose} style={{ height: "100%" }}>
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
								ref={selectRef}
								id="name"
								className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5  leading-[150%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								onChange={handleChange}
							>
								<option defaultChecked selected value='{"name":"none"}'>
									Select Technical Indicator
								</option>
								<option value='{"name":"Exponential Moving Average", "indicatorType":"internalIndicator"}'>
									Exponential Moving Average
								</option>
								<option value='{"name":"Simple Moving Average", "indicatorType":"internalIndicator"}'>
									Simple Moving Average
								</option>
								<option value="RSI">Relative Strength Index</option>
								<option value="MACD">MACD</option>
							</select>
							{IndicatorsModalDb(indicatorParams, allFunctions)}
							{/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to
                ensure a common set of data rights in the European Union. It requires organizations to notify users as soon
                as possible of high-risk data breaches that could personally affect them.
            </p> */}
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
};

export default IndicatorsModal;
