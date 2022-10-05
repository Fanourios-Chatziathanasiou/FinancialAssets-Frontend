import { Button, Modal } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import { IndicatorsEditorModalTypes } from "../../../types/typesCollection";
import IndicatorsInitialValuesDb from "../../chart/technical Indicators/IndicatorsInitialValuesDb";
import IndicatorsModalDb from "../../chart/technical Indicators/IndicatorsModalDb";
import indicatorsModalGeneratedComponentDb from "./../indicatorsModalGeneratedComponentDb";

//This Component is the "Edit" part of the IndicatorsListModal. When the user wants to edit an existing
//indicator this component handles the parameters that need to appear in order to edit the specific indicator.
const IndicatorsEditorModal = (props: IndicatorsEditorModalTypes): JSX.Element => {
	//indicatorParams stores the specific indicator object that contains all the parameters
	const [indicatorParams, setIndicatorParams] = useState<Record<string, any>>({ ...props?.editedIndicator });
	useEffect(() => {
		const editedIndicatorCopy = { ...props.editedIndicator };
		editedIndicatorCopy.name = editedIndicatorCopy.indicatorName;
		setIndicatorParams(editedIndicatorCopy);
	}, [props.editedIndicator]);

	//Apply method for the Modal.
	const handleApply = () => {
		//The generated component indicator wutg the specified parameters.
		const generatedComponent = indicatorsModalGeneratedComponentDb({
			...indicatorParams,
		});
		// console.log("Generated component", generatedComponent);

		const isGeneratedComponentParameterUndefined = Object.values(generatedComponent).findIndex((el) => el === undefined);
		if (isGeneratedComponentParameterUndefined !== -1) {
			props.setIsEditorModalShowing(false);
			return;
		}

		if (generatedComponent !== undefined) {
			const indicatorsArrayCopy = [...props.indicatorsArray];
			const editedIndicatorIndex = indicatorsArrayCopy.findIndex((object) => {
				return object.id === props.editedIndicator.id;
			});
			indicatorsArrayCopy[editedIndicatorIndex] = generatedComponent;
			props.setIndicatorsArray(indicatorsArrayCopy);
		} else {
			alert("This Combination does not exist in the database");
		}
		props.setIsEditorModalShowing(false);
	};

	const handleChange = (e: any) => {
		const positionMultiplier = props.indicatorsArray.length;
		const valuesJSON = JSON.parse(e.target.value);

		const initialValues = IndicatorsInitialValuesDb({ ...valuesJSON, positionMultiplier: positionMultiplier });
		setIndicatorParams(initialValues);
		// console.log(initialValues);
	};
	const handleChangeColor = (e: any) => {
		const colorObject = {
			[e.target.id]: e.target.value,
		};

		setIndicatorParams({ ...indicatorParams, ...colorObject });
	};

	const handleChangeNumber = (e: any) => {
		// console.log(e);
		const id = e.target.id;
		const value = e.target.valueAsNumber;
		setIndicatorParams({ ...indicatorParams, [id]: value });
	};

	const onClick = () => {
		props.setIsEditorModalShowing(false);
	};

	const onClose = () => {
		// setIndicatorParams({ name: "" });
		props.setIsEditorModalShowing(false);
		props.setEditedIndicator(null);
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
			{/* <button className="border-2 rounded-lg p-0 m-0 " onClick={onClick}>
				Indicators
			</button> */}

			<Modal show={props.isEditorModalShowing} size="4xl" popup={true} onClose={onClose} style={{ height: "100%" }}>
				<Modal.Header />
				<Modal.Body>
					<div className="relative p-4 w-full  h-full md:h-auto m-auto ">
						<div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Indicators Editor</h3>
						</div>

						{props.editedIndicator ? IndicatorsModalDb(props.editedIndicator, allFunctions) : ""}

						{/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to
                ensure a common set of data rights in the European Union. It requires organizations to notify users as soon
                as possible of high-risk data breaches that could personally affect them.
            </p> */}
					</div>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
};

export default IndicatorsEditorModal;
