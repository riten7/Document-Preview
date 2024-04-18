import React, { memo, useCallback, useMemo, useState } from "react";
import { Button, message } from "antd";
import { useDocPreviewContext } from "../../context/DocPreviewProvider";
import {
  SidebarBottom,
  SidebarWrapper,
} from "../../styles";
import SidebarContainer from "./SidebarContainer";
import { Field } from "../../types";

const ConfirmationModal = React.lazy(() => import("../ConfirmationModal"));

const Sidebar: React.FC = memo(() => {
  const {
    fieldsData: fields,
    setFieldsData,
    checkedFields,
    setCheckedFields,
  } = useDocPreviewContext();

  const [showModal, setShowModal] = useState<boolean>(false);

  const multipleFieldsSelected = useMemo(
    () => checkedFields.length > 1,
    [checkedFields]
  );

  const atLeastOneFieldSelected = useMemo(() => checkedFields.length > 0, [
    checkedFields,
  ]);

  const onFieldSelect = useCallback(
    (field: Field) => {
      const isAlreadyChecked = checkedFields.find(
        (chkField: Field) => chkField.id === field.id
      );
      if (isAlreadyChecked) {
        setCheckedFields(checkedFields.filter(({ id }) => id !== field.id));
      } else {
        setCheckedFields([...checkedFields, field]);
      }
    },
    [checkedFields, setCheckedFields]
  );

  const onFieldRemove = useCallback(
    (fieldId: number) => {
      const filteredFields = fields.filter((field) => field.id !== fieldId);
      setFieldsData(filteredFields);
      },
    [fields, setFieldsData]
  );

  const handleSelectAll = () => setCheckedFields(fields);

  const handleClearAll = () => setCheckedFields([]);

  const openConfirmation = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const resetFields = useCallback(() => {
    setShowModal(!showModal);
    setCheckedFields([]);
  }, [setCheckedFields, showModal])

  const handleFieldConfirmation = useCallback(() => {
    resetFields();
    message.success("Fields confirmed and processed successfully!");
  }, [resetFields]);

  const handleCancelConfirmation = useCallback(() => {
    resetFields();
  }, [resetFields]);

  return (
    <>
      <SidebarWrapper>
        <div className="field-title">Fields</div>
        
        <SidebarContainer
          onFieldSelect={onFieldSelect}
          onFieldRemove={onFieldRemove}
        />

        <SidebarBottom>
          <Button onClick={handleSelectAll}>Select all</Button>
          <Button disabled={!atLeastOneFieldSelected} onClick={handleClearAll}>Clear all</Button>
          <Button disabled={!multipleFieldsSelected} onClick={openConfirmation}>
            Confirm
          </Button>
        </SidebarBottom>
      </SidebarWrapper>

      <ConfirmationModal
        open={showModal}
        title="Confirmation"
        content="Are you sure you want to confirm the selected fields ?"
        onOk={handleFieldConfirmation}
        onCancel={handleCancelConfirmation}
      />
    </>
  );
});

export default Sidebar;
