// document previewer types
export interface DocumentPreviewerProps {
  imageUrl?: string;
}

export interface IProps {
  children: React.ReactNode;
}

export interface ContextValue {
  zoomLevel: string;
  setZoomLevel: React.Dispatch<React.SetStateAction<string>>;
  fieldsData: Field[];
  setFieldsData: React.Dispatch<React.SetStateAction<Field[]>>;
  checkedFields: Field[];
  setCheckedFields: React.Dispatch<React.SetStateAction<Field[]>>;
  highlightedElement: HighlightedElement[] | null;
  setHighlightedElement: React.Dispatch<
    React.SetStateAction<HighlightedElement[] | null>
  >;
}

export interface Field {
  title: string;
  id: number;
  value: string | number;
  position: number[];
}

export interface HighlightedElement {
  position: number[];
  id: number;
}

// side bar types
export interface SidebarContainerProps {
  onFieldSelect: (field: Field) => void;
  onFieldRemove: (fieldId: number) => void;
}

// modal types
export type ConfirmationModalProps = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  title?: string;
  content?: string;
};

// image types
export interface LazyImageProps {
    src: string;
    alt: string;
    style: React.CSSProperties;
  }
  
