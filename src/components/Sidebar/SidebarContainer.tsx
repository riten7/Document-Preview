import { Button, Checkbox, Popover, message } from "antd";
import {
  Badge,
  SideBarItem,
  SideBarLeftSection,
  SideBarRightSection,
  SidebarContent,
} from "../../styles";
import { memo, useCallback } from "react";
import { generateColor } from "../../utils";
import { useDocPreviewContext } from "../../context/DocPreviewProvider";
import { MoreOutlined } from "@ant-design/icons";
import { SidebarContainerProps } from "../../types";

const SidebarContainer: React.FC<SidebarContainerProps> = memo(
  ({ onFieldSelect, onFieldRemove }) => {
    const {
      fieldsData: fields,
      checkedFields,
      highlightedElement,
    } = useDocPreviewContext();

    const isHighLighted = useCallback(
      (id: number) => {
        return highlightedElement?.some((element) => element.id === id);
      },
      [highlightedElement]
    );

    return (
      <>
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
                  <Button onClick={() => { 
                    if (checkedFields.some(
                      (chkField) => chkField.id === field.id
                    )) {
                      message.error("Please unselect the field before removing");
                      return;
                    }
                    onFieldRemove(field.id)
                  }}>
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
      </>
    );
  }
);

export default SidebarContainer;
