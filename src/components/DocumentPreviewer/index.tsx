import React, {
  useRef,
  useCallback,
  memo,
  useEffect,
  useMemo,
} from "react";
import ReviewImage from "../../assets/images/review.jpg";
import { useDocPreviewContext } from "../../context/DocPreviewProvider";
import LazyImage from "../helpers/LazyImage";
import { Select } from "antd";
import { getZoomLevels } from "../../utils";
import { DocumentPreviewerProps, Field } from "../../types";
import { DocumentPreviewerWrapper, HighlightedElementBox, PreviewContainer, ZoomOptions } from "../../styles";

const DocumentPreviewer: React.FC<DocumentPreviewerProps> = memo(() => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const {
    zoomLevel,
    setZoomLevel,
    fieldsData: fields,
    checkedFields,
    setCheckedFields,
    highlightedElement,
    setHighlightedElement,
  } = useDocPreviewContext();

  const zoomLevels = getZoomLevels();

  const handleChangeZoom = (value: string) => {
    setCheckedFields([]);
    setZoomLevel(value);
  };

  const calculateScalingFactors = () => {
    const originalWidth = 1700; // original image width
    const originalHeight = 2200; // original image height
    const displayedWidth = imageRef.current?.clientWidth ?? 0;
    const displayedHeight = imageRef.current?.clientHeight ?? 0;

    const widthScaleFactor = originalWidth / displayedWidth;
    const heightScaleFactor = originalHeight / displayedHeight;

    return { widthScaleFactor, heightScaleFactor };
  };

  const { widthScaleFactor, heightScaleFactor } = calculateScalingFactors();

  const checkedElements = useMemo(() => {
    const container = imageRef.current?.parentElement;

    const scrollLeft = container?.scrollLeft ?? 0;
    const scrollTop = container?.scrollTop ?? 0;

    const newElements = checkedFields.map((field) => {
      const [x1, y1, x2, y2] = field.position;

      return {
        id: field.id,
        position: [
          (x1 - scrollLeft) / widthScaleFactor,
          (y1 - scrollTop) / heightScaleFactor,
          (x2 - scrollLeft) / widthScaleFactor,
          (y2 - scrollTop) / heightScaleFactor,
        ],
      };
    });
    return newElements;
  }, [checkedFields, heightScaleFactor, widthScaleFactor]);

  const updateHighlightedElementOnHover = useCallback(
    (matchedElement: Field) => {
      const container = imageRef.current?.parentElement;

      const scrollLeft = container?.scrollLeft ?? 0;
      const scrollTop = container?.scrollTop ?? 0;

      const [x1, y1, x2, y2] = matchedElement.position;

      setHighlightedElement([
        ...checkedElements,
        {
          id: matchedElement.id,
          position: [
            (x1 - scrollLeft) / widthScaleFactor,
            (y1 - scrollTop) / heightScaleFactor,
            (x2 - scrollLeft) / widthScaleFactor,
            (y2 - scrollTop) / heightScaleFactor,
          ],
        },
      ]);
    },
    [
      checkedElements,
      heightScaleFactor,
      setHighlightedElement,
      widthScaleFactor,
    ]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      const imgRect = imageRef.current?.getBoundingClientRect();
      const container = imageRef.current?.parentElement;
      const containerRect = container?.getBoundingClientRect();

      if (checkedFields.length === fields.length) return;
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
        updateHighlightedElementOnHover(matchedElement);
      } else {
        setHighlightedElement(checkedElements);
      }
    },
    [
      checkedElements,
      checkedFields.length,
      fields,
      heightScaleFactor,
      setHighlightedElement,
      updateHighlightedElementOnHover,
      widthScaleFactor,
    ]
  );

  useEffect(() => {
    if (checkedFields.length === 0) {
      setHighlightedElement(null);
    } else {
      setHighlightedElement(checkedElements);
    }
  }, [checkedElements, checkedFields, setHighlightedElement]);

  return (
    <DocumentPreviewerWrapper>
      <ZoomOptions>
        <Select
          value={zoomLevel}
          onChange={handleChangeZoom}
          options={zoomLevels} />
      </ZoomOptions>
      <PreviewContainer onMouseMove={handleMouseMove}>
        <LazyImage
          ref={imageRef}
          src={ReviewImage}
          alt="Document Preview"
          style={{ width: zoomLevel }}
        />
        {highlightedElement &&
          highlightedElement.length > 0 &&
          highlightedElement.map((element) => (
            <HighlightedElementBox
              top={element.position?.[1] ?? 0}
              left={element.position?.[0] ?? 0}
              width={
                (element.position?.[2] ?? 0) - (element.position?.[0] ?? 0)
              }
              height={
                (element.position?.[3] ?? 0) - (element.position?.[1] ?? 0)
              }
            />
          ))}
      </PreviewContainer>
    </DocumentPreviewerWrapper>
  );
});

export default DocumentPreviewer;
