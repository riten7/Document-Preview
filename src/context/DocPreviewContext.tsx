import React, { createContext, useContext, useMemo, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

interface ContextValue {
  zoomLevel: string;
  setZoomLevel: React.Dispatch<React.SetStateAction<string>>;
  fieldsData: Field[];
  setFieldsData: React.Dispatch<React.SetStateAction<Field[]>>;
  checkedFields: Field[];
  setCheckedFields: React.Dispatch<React.SetStateAction<Field[]>>;
  highlightedElement: HighlightedElement[] | null;
  setHighlightedElement: React.Dispatch<React.SetStateAction<HighlightedElement[] | null>>;
}

export interface Field {
  title: string;
  id: number;
  value: string | number;
  position: number[];
}

const initialContextValue: ContextValue = {
  zoomLevel: "fit",
  setZoomLevel: () => {},
  fieldsData: [],
  setFieldsData: () => {},
  checkedFields: [],
  setCheckedFields: () => {},
  highlightedElement: null,
  setHighlightedElement: () => {}
};

interface HighlightedElement {
  position: number[];
  id: number;
}

const DocPreviewContext = createContext<ContextValue>(initialContextValue);

const DocPreviewContextProvider: React.FC<IProps> = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState<string>("fit");
  const [fieldsData, setFieldsData] = useState<Field[]>([]);
  const [checkedFields, setCheckedFields] = useState<Field[]>([]);
  const [highlightedElement, setHighlightedElement] = useState<HighlightedElement[] | null>(null);

  const value = useMemo(
    () => ({
      zoomLevel,
      setZoomLevel,
      fieldsData,
      setFieldsData,
      checkedFields,
      setCheckedFields,
      highlightedElement,
      setHighlightedElement
    }),
    [zoomLevel, fieldsData, checkedFields, highlightedElement]
  );

  return (
    <DocPreviewContext.Provider value={value}>
      {children}
    </DocPreviewContext.Provider>
  );
};

const useDocPreviewContext = () => useContext(DocPreviewContext);

export { DocPreviewContextProvider, useDocPreviewContext };
