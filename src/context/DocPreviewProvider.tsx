import React, { createContext, useContext, useMemo, useState } from "react";
import { ContextValue, Field, HighlightedElement, IProps } from "../types";

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

const DocPreviewContext = createContext<ContextValue>(initialContextValue);

const DocPreviewContextProvider: React.FC<IProps> = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState<string>("Fit");
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
