# Document Preview Application

This application is a document previewer that allows users to view documents in a structured format. It is built using React, Ant design and styled-components for the frontend.

## Project Structure

The project is structured as follows:

- `main.tsx` and `App.tsx`: These are the main entry point of the application. It sets up the application layout and initializes the document fields data. The `DocumentPreviewer` and `Sidebar` components are rendered inside the `AppContainer`.

- `components/`: This directory contains all the React components used in the application.
  - `DocumentPreviewer.tsx`: This component is responsible for rendering the document preview. It fetches the fields data from the context and displays it in a structured format.
  - `Sidebar.tsx`: This component represents the sidebar of the application. It provides additional options and controls for the user.
  - `ConfirmationModal.tsx` displays a modal dialog to the user. It asks user whether to confirm all the selected fields to be processed or cancel the current user flow.
  - `LazyImage.tsx` provides a way to lazily load images to improve performance. It uses the forwardRef function to allow a parent component to access the ref of the img element.

- `context/`: This directory contains the React context providers used in the application.
  - `DocPreviewProvider.tsx`: This is the context provider for the document preview. It provides the fields data to the rest of the application and exposes a `setFieldsData` function to update the fields data.

- `utils/`: This directory contains utility functions and data for the application.

- `styles.ts`: The styles file contains all the styled-components and CSS styles used across the application.

- `types.ts`: The types file contains TypeScript type definitions and interfaces used across the application. These types provide a way to ensure consistent structure and data types for objects and variables throughout the codebase.

- `public`: This folder contains public assets like index.html and favicon.ico.

- `package.json`: This file contains the list of project dependencies and scripts.

- `tsconfig.json`: This file is used to specify the root files and the compiler options required to compile the project.
 
## Libraries Used

- `antd` : Ant Design (AntD) is a React UI library that contains a set of high quality components and demos for building rich, interactive user interfaces.

- `styled-components`: This is a library used for styling the components in the application. It allows for CSS-in-JS styling, which provides more flexibility and modularity in styling components.

## Running the Application

To run the application, follow these steps:

1. Install the project dependencies with `yarn`.
2. Start the application with `yarn dev`.
