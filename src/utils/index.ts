import jsonData from "../json/sections.json";

interface Field {
  title: string;
  id: number;
  value: string | number;
  position: number[];
}

export const fieldsData: Field[] = jsonData.data.sections.flatMap((section) => {
  const fields: Field[] = section.children.map((child) => ({
    title: child.label,
    id: child.id,
    value: child.content?.value ?? '',
    position: child.content?.position ?? [],
  }));

  return fields;
});


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
