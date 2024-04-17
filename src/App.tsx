import { useEffect } from "react";
import DocumentPreviewer from "./components/DocumentPreviewer";
import Sidebar from "./components/Sidebar";
import {
  useDocPreviewContext,
} from "./context/DocPreviewContext";
import { fieldsData } from "./utils";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  border: 2px solid gray;
`

function App() {
  const { setFieldsData } = useDocPreviewContext();

  useEffect(() => {
    setFieldsData(fieldsData);
  }, [setFieldsData]);

  return (
    <AppContainer>
      <DocumentPreviewer />
      <Sidebar />
    </AppContainer>
  );
}

export default App;
