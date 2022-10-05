import { Button, Checkbox, Label, Modal, Table, TextInput } from "flowbite-react";
import React, { useState } from "react";
import uuid from "react-uuid";
import { IndicatorsListModalTypes, IndicatorTypes } from "../../../types/typesCollection";
import IndicatorsEditorModal from "../indicatorsModal/indicatorsEditorModal/IndicatorsEditorModal";

const IndicatorsListModal = (props: IndicatorsListModalTypes): JSX.Element => {
	const [isShowing, setIsShowing] = useState<boolean>(false);
	const [isEditorModalShowing, setIsEditorModalShowing] = useState<boolean>(false);
	const [editedIndicator, setEditedIndicator] = useState<any>();

	const setEditedIndicatorFunc = (editedIndicator: IndicatorTypes | null): void => {
		setEditedIndicator(editedIndicator);
	};
	const setIsEditorModalShowingFunc = (isShowing: boolean): void => {
		setIsEditorModalShowing(isShowing);
	};

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

	const handleDelete = (currentIndicator: any) => {
		const filteredArray = props.indicatorsArray.filter((indicator: any) => {
			// console.log("clicked indicator", currentIndicator);
			return indicator.id !== currentIndicator.id;
		});
		props.setIndicatorsArray(filteredArray);
	};

	const handleEdit = (currentIndicator: any) => {
		setEditedIndicator(currentIndicator);
		setIsEditorModalShowing(true);
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
				Indicators List
			</Button>
			<Modal show={isShowing} popup={true} onClose={onClose} style={{ height: "100%", paddingInline: "25%" }}>
				<Modal.Header />
				<Modal.Body>
					<Table hoverable={true} className="w-[100%]">
						<Table.Head>
							<Table.HeadCell>Indicator Name</Table.HeadCell>
							<Table.HeadCell>
								<span className="sr-only">Edit</span>
							</Table.HeadCell>
							<Table.HeadCell>
								<span className="sr-only">Remove</span>
							</Table.HeadCell>
						</Table.Head>
						<Table.Body className="divide-y">
							{props.indicatorsArray.map((indicator: any) => {
								return (
									<React.Fragment key={uuid()}>
										<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center leading-[220%]">
											<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-start">
												{indicator.name}
											</Table.Cell>

											<Table.Cell>
												<span
													className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
													onClick={() => handleEdit(indicator)}
												>
													Edit
												</span>
											</Table.Cell>
											<Table.Cell>
												<span
													onClick={() => handleDelete(indicator)}
													className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
												>
													Delete
												</span>
											</Table.Cell>
										</Table.Row>
									</React.Fragment>
								);
							})}
						</Table.Body>
					</Table>
				</Modal.Body>
			</Modal>
			<IndicatorsEditorModal
				isEditorModalShowing={isEditorModalShowing}
				setIsEditorModalShowing={setIsEditorModalShowingFunc}
				editedIndicator={editedIndicator}
				setEditedIndicator={setEditedIndicatorFunc}
				indicatorsArray={props.indicatorsArray}
				setIndicatorsArray={props.setIndicatorsArray}
			/>
		</React.Fragment>
	);
};

export default IndicatorsListModal;
