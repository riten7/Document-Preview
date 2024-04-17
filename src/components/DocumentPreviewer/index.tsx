import React, { ChangeEvent, useRef, useCallback, memo, useEffect } from "react";
import ReviewImage from "../../assets/images/review.jpg";
import { Field, useDocPreviewContext } from "../../context/DocPreviewContext";
import { DocumentPreviewerWrapper, PreviewContainer, ZoomOptions } from "../styles";

interface DocumentPreviewerProps {
  imageUrl?: string;
}

const DocumentPreviewer: React.FC<DocumentPreviewerProps> = memo(() => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const {
    zoomLevel,
    setZoomLevel,
    fieldsData: fields,
    checkedFields,
    highlightedElement,
    setHighlightedElement,
  } = useDocPreviewContext();

  const handleChangeZoom = (event: ChangeEvent<HTMLSelectElement>) => {
    setZoomLevel(event.target.value);
  };

  const calculateScalingFactors = () => {
    const originalWidth = 1700;
    const originalHeight = 2200;
    const displayedWidth = imageRef.current?.clientWidth ?? 0;
    const displayedHeight = imageRef.current?.clientHeight ?? 0;

    const widthScaleFactor = originalWidth / displayedWidth;
    const heightScaleFactor = originalHeight / displayedHeight;

    return { widthScaleFactor, heightScaleFactor };
  };

  const { widthScaleFactor, heightScaleFactor } = calculateScalingFactors();

  console.log({ checkedFields })

  const updateHighlightedElement = useCallback((matchedElement: Field) => {
    const container = imageRef.current?.parentElement;

    const scrollLeft = container?.scrollLeft ?? 0;
    const scrollTop = container?.scrollTop ?? 0;

    const [x1, y1, x2, y2] = matchedElement.position;

    setHighlightedElement((prevElements) => {
      const existingElement = prevElements?.find((element) => element.id === matchedElement.id);
      if (existingElement) {
        return prevElements; // Return the existing array if an element with the same id already exists
      }
    
      return [
        ...prevElements ?? [],
        {
          id: matchedElement.id,
          position: [
            (x1 - scrollLeft) / widthScaleFactor,
            (y1 - scrollTop) / heightScaleFactor,
            (x2 - scrollLeft) / widthScaleFactor,
            (y2 - scrollTop) / heightScaleFactor,
          ],
        },
      ];
    });

  }, [heightScaleFactor, setHighlightedElement, widthScaleFactor]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      const imgRect = imageRef.current?.getBoundingClientRect();
      const container = imageRef.current?.parentElement;
      const containerRect = container?.getBoundingClientRect();

      if (!imgRect || !containerRect) return;

      const x = event.clientX - (imgRect?.left ?? 0);
      const y = event.clientY - (imgRect?.top ?? 0);

      const scaledX = Math.round(x * widthScaleFactor);
      const scaledY = Math.round(y * heightScaleFactor);

      const matchedElement = fields.find((element) => {
        const [x1, y1, x2, y2] = element.position;
        return scaledX >= x1 && scaledX <= x2 && scaledY >= y1 && scaledY <= y2;
      });
      if (matchedElement) {
        updateHighlightedElement(matchedElement);
      } else {
        setHighlightedElement(null);
      }
    },
    [fields, heightScaleFactor, setHighlightedElement, updateHighlightedElement, widthScaleFactor]
  );

  useEffect(() => {
    if (checkedFields.length === 0) {
      setHighlightedElement(null);
    } else {
      checkedFields.map((field) => updateHighlightedElement(field));
    }
  }, [checkedFields, setHighlightedElement, updateHighlightedElement]);


  console.log({ highlightedElement })

  return (
    <DocumentPreviewerWrapper>
      <ZoomOptions>
        <select value={zoomLevel} onChange={handleChangeZoom}>
          <option value="fit">Fit</option>
          <option value="75%">75%</option>
          <option value="100%">100%</option>
        </select>
      </ZoomOptions>
      <PreviewContainer>
        <img
          ref={imageRef}
          src={ReviewImage}
          loading="lazy"
          alt="Document Preview"
          style={{ width: zoomLevel }}
          onMouseMove={handleMouseMove}
        />
        {highlightedElement &&
          highlightedElement.length > 0 &&
          highlightedElement.map((element) => (
            <div
              className="highlighted-element"
              style={{
                position: "absolute",
                top: element.position?.[1] ?? 0,
                left: element.position?.[0] ?? 0,
                width:
                  (element.position?.[2] ?? 0) - (element.position?.[0] ?? 0),
                height:
                  (element.position?.[3] ?? 0) - (element.position?.[1] ?? 0),
                background: "#FF7A59",
                opacity: .6,
              }}
            />
          ))}
      </PreviewContainer>
    </DocumentPreviewerWrapper>
  );
});

export default DocumentPreviewer;
