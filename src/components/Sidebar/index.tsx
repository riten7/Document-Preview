import React, { memo, useCallback, useMemo, useState } from "react";
import { Button, Checkbox, Popover, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Field, useDocPreviewContext } from "../../context/DocPreviewContext";
import ConfirmationModal from "../ConfirmationModal";
import {
  Badge,
  SideBarItem,
  SideBarLeftSection,
  SideBarRightSection,
  SidebarBottom,
  SidebarContent,
  SidebarWrapper,
} from "../styles";
import { generateColor } from "../../utils";

interface SidebarProps {
  onFieldSelect?: (fieldId: string) => void;
  onFieldRemove?: (fieldId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = memo(() => {
  const {
    fieldsData: fields,
    setFieldsData,
    checkedFields,
    setCheckedFields,
    highlightedElement,
  } = useDocPreviewContext();

  const [showModal, setShowModal] = useState<boolean>(false);

  const multipleFieldsSelected = useMemo(
    () => checkedFields.length > 1,
    [checkedFields]
  );

  const onFieldSelect = useCallback(
    (field: Field) => {
      const isAlreadyChecked = checkedFields.find(
        (chkField) => chkField.id === field.id
      );
      if (isAlreadyChecked) {
        setCheckedFields(
          checkedFields.filter(({ id}) => id !== field.id)
        );
      } else {
        setCheckedFields([...checkedFields, field]);
      }
    },
    [checkedFields, setCheckedFields]
  );

  const onFieldRemove = useCallback(
    (fieldId: number) => {
      setFieldsData((fields) => fields.filter((field) => field.id !== fieldId));
    },
    [setFieldsData]
  );

  const handleSelectAll = useCallback(() => {
    setCheckedFields(fields);
  }, [fields, setCheckedFields]);

  const openConfirmation = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const handleFieldConfirmation = useCallback(() => {
    setShowModal(!showModal);
    message.success("Fields confirmed and processed successfully!");
    setCheckedFields([]);
  }, [setCheckedFields, showModal]);

  const handleCancelConfirmation = useCallback(() => {
    setShowModal(!showModal);
    setCheckedFields([]);
  }, [setCheckedFields, showModal]);

  const isHighLighted = useCallback(
    (id: number) => {
      return highlightedElement?.some((element) => element.id === id);
    },
    [highlightedElement]
  );

  return (
    <>
      <SidebarWrapper>
        <div className="field-title">Fields</div>
        <SidebarContent>
          {fields.map((field) => (
            <SideBarItem
              key={field.id}
              className={`${isHighLighted(field.id) ? "highlight" : ""}`}
            >
              <SideBarLeftSection>
                <Badge color={generateColor(field.title)}>
                  {field.title.charAt(0)}
                </Badge>
                <div className="title-and-value">
                  <div className="field-sub-title">{field.title}</div>
                  <div className="field-value">{field.value}</div>
                </div>
              </SideBarLeftSection>
              <SideBarRightSection>
                <Checkbox
                  checked={checkedFields.some(
                    (chkField) => chkField.id === field.id
                  )}
                  onChange={() => onFieldSelect(field)}
                />
                <Popover
                  overlayClassName="popover-remove"
                  placement="topLeft"
                  content={
                    <Button onClick={() => onFieldRemove(field.id)}>
                      Remove
                    </Button>
                  }
                  getPopupContainer={(triggerNode) =>
                    triggerNode?.parentNode as HTMLElement
                  }
                >
                  <MoreOutlined />
                </Popover>
              </SideBarRightSection>
            </SideBarItem>
          ))}
        </SidebarContent>

        <SidebarBottom>
          <Button onClick={() => handleSelectAll()}>Select all</Button>
          <Button disabled={!multipleFieldsSelected} onClick={openConfirmation}>
            Confirm
          </Button>
        </SidebarBottom>
      </SidebarWrapper>
      <ConfirmationModal
        open={showModal}
        onOk={() => handleFieldConfirmation()}
        onCancel={() => handleCancelConfirmation()}
      />
    </>
  );
});

export default Sidebar;
