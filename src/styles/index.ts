import styled from "styled-components";

// Document Preview styles
export const DocumentPreviewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-right: 10px;
  overflow-y: auto;
`;

export const PreviewContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const ZoomOptions = styled.div`
  margin: 10px;

  .ant-select  {
    height: 32px;
    width: 80px;
  }
`;

type HighlightedElementBoxProps = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export const HighlightedElementBox = styled.div<HighlightedElementBoxProps>`
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  background: #ff7a59;
  opacity: 0.6;
`;

// Sidebar styles
export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex: 0 0 20%;
  border-left: 2px solid gray;

  .field-title {
    margin: 10px;
  }

  .highlight {
    border: 2px solid #ff7a59;
  }
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const SideBarItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 10px;
  background: #313336;
  margin: 2px;
`;

export const SideBarLeftSection = styled.div`
  display: flex;
  align-items: center;

  .title-and-value {
    display: flex;
    flex-direction: column;
  }

  .field-sub-title {
    font-weight: bold;
    margin-bottom: 8px;
  }
`;

export const SideBarRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    font-size: 16px;
  }
`;

export const Badge = styled.div`
  min-width: 30px;
  height: 30px;
  background-color: ${({ color }) => `${color}30`};
  border-radius: 5px;
  border-left: ${({ color }) => `2px solid ${color}`};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const SidebarBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-top: 2px solid gray;

  .ant-btn-default {
    background: #313336;
    color: #fff;
  }

  .ant-btn-default:hover {
    background: #313336 !important;
    color: #fff !important;
    border-color: #fff !important;
  }

  .ant-btn-default:disabled {
    opacity: 0.5;
  }
`;
