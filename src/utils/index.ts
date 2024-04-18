import jsonData from "../json/sections.json";
import { Field } from "../types";

// mapping through original data to get the required fields
export const fieldsData: Field[] = jsonData.data.sections.flatMap((section) => {
  const fields: Field[] = section.children.map((child) => ({
    title: child.label,
    id: child.id,
    value: child.content?.value ?? '',
    position: child.content?.position ?? [],
  }));

  return fields;
});

// to get the color based on the text
export const generateColor = (text: string) =>  {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
    let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  return color;
}

export const getZoomLevels = () => {
  return [
    { value: 'fit-content', label: 'Fit' },
    { value: '75%', label: '75%' },
    { value: '100%', label: '100%' },
  ];
}
