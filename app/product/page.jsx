"use client"
import React, { startTransition, useCallback, Fragment, useEffect, useState, useRef } from 'react';
import { Stage, Layer, Text, Image as KonvaImage, Transformer } from 'react-konva';
import Image from 'next/image';
import path from 'path'
import getColors from 'get-svg-colors';
import { HexColorPicker } from 'react-colorful';
import useImage from 'use-image';
import { exportStageSVG } from 'react-konva-to-svg';

const iconDelete =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIGZpbGw9IiMwMDAwMDAiIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgDQoJIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDQ4Mi40MjggNDgyLjQyOSINCgkgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM4MS4xNjMsNTcuNzk5aC03NS4wOTRDMzAyLjMyMywyNS4zMTYsMjc0LjY4NiwwLDI0MS4yMTQsMGMtMzMuNDcxLDAtNjEuMTA0LDI1LjMxNS02NC44NSw1Ny43OTloLTc1LjA5OA0KCQkJYy0zMC4zOSwwLTU1LjExMSwyNC43MjgtNTUuMTExLDU1LjExN3YyLjgyOGMwLDIzLjIyMywxNC40Niw0My4xLDM0LjgzLDUxLjE5OXYyNjAuMzY5YzAsMzAuMzksMjQuNzI0LDU1LjExNyw1NS4xMTIsNTUuMTE3DQoJCQloMjEwLjIzNmMzMC4zODksMCw1NS4xMTEtMjQuNzI5LDU1LjExMS01NS4xMTdWMTY2Ljk0NGMyMC4zNjktOC4xLDM0LjgzLTI3Ljk3NywzNC44My01MS4xOTl2LTIuODI4DQoJCQlDNDM2LjI3NCw4Mi41MjcsNDExLjU1MSw1Ny43OTksMzgxLjE2Myw1Ny43OTl6IE0yNDEuMjE0LDI2LjEzOWMxOS4wMzcsMCwzNC45MjcsMTMuNjQ1LDM4LjQ0MywzMS42NmgtNzYuODc5DQoJCQlDMjA2LjI5MywzOS43ODMsMjIyLjE4NCwyNi4xMzksMjQxLjIxNCwyNi4xMzl6IE0zNzUuMzA1LDQyNy4zMTJjMCwxNS45NzgtMTMsMjguOTc5LTI4Ljk3MywyOC45NzlIMTM2LjA5Ng0KCQkJYy0xNS45NzMsMC0yOC45NzMtMTMuMDAyLTI4Ljk3My0yOC45NzlWMTcwLjg2MWgyNjguMTgyVjQyNy4zMTJ6IE00MTAuMTM1LDExNS43NDRjMCwxNS45NzgtMTMsMjguOTc5LTI4Ljk3MywyOC45NzlIMTAxLjI2Ng0KCQkJYy0xNS45NzMsMC0yOC45NzMtMTMuMDAxLTI4Ljk3My0yOC45Nzl2LTIuODI4YzAtMTUuOTc4LDEzLTI4Ljk3OSwyOC45NzMtMjguOTc5aDI3OS44OTdjMTUuOTczLDAsMjguOTczLDEzLjAwMSwyOC45NzMsMjguOTc5DQoJCQlWMTE1Ljc0NHoiLz4NCgkJPHBhdGggZD0iTTE3MS4xNDQsNDIyLjg2M2M3LjIxOCwwLDEzLjA2OS01Ljg1MywxMy4wNjktMTMuMDY4VjI2Mi42NDFjMC03LjIxNi01Ljg1Mi0xMy4wNy0xMy4wNjktMTMuMDcNCgkJCWMtNy4yMTcsMC0xMy4wNjksNS44NTQtMTMuMDY5LDEzLjA3djE0Ny4xNTRDMTU4LjA3NCw0MTcuMDEyLDE2My45MjYsNDIyLjg2MywxNzEuMTQ0LDQyMi44NjN6Ii8+DQoJCTxwYXRoIGQ9Ik0yNDEuMjE0LDQyMi44NjNjNy4yMTgsMCwxMy4wNy01Ljg1MywxMy4wNy0xMy4wNjhWMjYyLjY0MWMwLTcuMjE2LTUuODU0LTEzLjA3LTEzLjA3LTEzLjA3DQoJCQljLTcuMjE3LDAtMTMuMDY5LDUuODU0LTEzLjA2OSwxMy4wN3YxNDcuMTU0QzIyOC4xNDUsNDE3LjAxMiwyMzMuOTk2LDQyMi44NjMsMjQxLjIxNCw0MjIuODYzeiIvPg0KCQk8cGF0aCBkPSJNMzExLjI4NCw0MjIuODYzYzcuMjE3LDAsMTMuMDY4LTUuODUzLDEzLjA2OC0xMy4wNjhWMjYyLjY0MWMwLTcuMjE2LTUuODUyLTEzLjA3LTEzLjA2OC0xMy4wNw0KCQkJYy03LjIxOSwwLTEzLjA3LDUuODU0LTEzLjA3LDEzLjA3djE0Ny4xNTRDMjk4LjIxMyw0MTcuMDEyLDMwNC4wNjcsNDIyLjg2MywzMTEuMjg0LDQyMi44NjN6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+";
const iconFlip = "data:image/png;base64,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"

function downloadURI(uri, name) {
  let link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const Product = () => {
  const [isLoading, setLoading] = useState();
  const [selectedProduct, setSelectedProduct] = useState("/images/download.svg");
  const [selectedId, selectShape] = useState(null);
  const [downloadImage, setDownloadImage] = useState();
  const [image, setImage] = useState({
    id: "image",
    width: 50,
    height: 50,
    src: '',
    scaleX: 1,
    scaleY: 1,
    x: 100,
    y: 60,
  });
  const [text, setText] = useState({
    x: 100,
    y: 60,
    text: '',
    id: "text",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'green',
    width: 0,
    length: 0,
    scaleX: 1,
    scaleY: 1
  });
  const [url, setNewUrl] = useState(selectedProduct);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colorPickerSelectedColor, setColorPickerSelectedColor] = useState("#ffffff");
  const [uniqColors, setUniqColors] = useState([])
  const imageRef = useRef();
  const textRef = useRef(null);
  const trRef = useRef();
  const stageRef = useRef(null);
  const [iconDeleteImage] = useImage(iconDelete);
  const [iconFlipImage] = useImage(iconFlip);
  const [selectedSVG] = useImage("data:image/svg+xml;base64," + btoa(url));

  const handleFlip = () => {
    if (selectedId === "text") {
      setText({
        ...text,
        scaleX: -text.scaleX || -1,
        x: text.scaleX === 1 ? text.x : text.x,
      });
    }
    else if (selectedId === "image") {
      setImage({
        ...image,
        scaleX: -image.scaleX || -1,
      });
    }
  };

  useEffect(() => {
    setText({
      ...text,
      text: '',
      width: textRef.current.textWidth
    });
  }, [selectedProduct]);

  const handleTextChange = (event) => {
    if (text.length > event.target.value.length) {
      setText({
        ...text,
        text: event.target.value,
        width: Math.abs(text.width - textRef.current.textWidth),
        length: text.length - 1
      });
    }
    else {
      setText({
        ...text,
        text: event.target.value,
        width: Math.abs(text.width + textRef.current.textWidth),
        length: text.length + 1
      });
    }
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  useEffect(() => {
    if (selectedId === "text") {
      trRef.current.nodes([textRef.current]);
      setText({
        ...text,
        width: Math.abs(textRef.current.textWidth)
      });
      trRef.current.getLayer().batchDraw();
    }
    else if (selectedId === "image") {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.src = e.target.result;
        img.onload = () => {
          setImage({
            ...image,
            src: img
          });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    if (selectedId === "text") {
      setText({
        ...text,
        text: '',
        width: 0,
        length: 0,
        scaleX: 1,
        scaleY: 1,
        x: 100,
        y: 60,
      });
      selectShape('')
    }
    else if (selectedId === "image") {
      setImage({
        ...image,
        src: '',
        width: 50,
        height: 50,
        scaleX: 1,
        scaleY: 1,
        x: 100,
        y: 60,
      });
      selectShape('')
    }
  };

  const setNewColor = (oldColor, newColor) => {
    const re = new RegExp(oldColor, "gi");
    const newSvgCode = url.replaceAll(re, `${newColor}`);
    setColorPickerSelectedColor(newColor);
    setNewUrl(newSvgCode)
    const colors = getColors(url, { flat: true });
    const allColors = colors.map((color) => color.hex());
    const uniqColors1 = Array.from(new Set(allColors));
    setUniqColors(uniqColors1)
  };

  const showColorPicker = (toggle, oldColor) => {
    setDisplayColorPicker(toggle);
    setColorPickerSelectedColor(oldColor);
  };

  const fetchSvg = async () => {
    const svg = await fetch(selectedProduct);
    const svgText = await svg.text();
    setNewUrl(svgText)
    const colors = getColors(svgText, { flat: true });
    const allColors = colors.map((color) => color.hex());
    const uniqColors1 = Array.from(new Set(allColors));
    setUniqColors(uniqColors1)
  };

  useEffect(() => {
    fetchSvg();
  }, [selectedProduct]);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 3 });
    downloadURI(uri, 'stage.jpg');
  };

  const handleExportSVG = useCallback(async () => {
    startTransition(() => {
      setLoading(true);
    })
    const svg = await exportStageSVG(stageRef.current);
    setDownloadImage(svg);
    setLoading(false);
    downloadSVG();
  }, [setDownloadImage])

  const downloadSVG = () => {
    const fileName = 'stageSVG.svg';
    const blob = new Blob([downloadImage], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Qty</th>
              <th>1+</th>
              <th>5+</th>
              <th>10+</th>
              <th>20+</th>
              <th>50+</th>
              <th>100+</th>
              <th>250+</th>
              <th>500+</th>
              <th>1000+</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price</td>
              <td>$23.99</td>
              <td>$23.89</td>
              <td>$23.79</td>
              <td>$23.69</td>
              <td>$22.99</td>
              <td>$22.49</td>
              <td>$21.99</td>
              <td>$21.49</td>
              <td>$19.99</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='product d-flex flex-row w-[100%]'>
        <div className='w-[40%] '>
          <div className='w-[24%] fixed ml-[5%] mt-2 border '>
            <Fragment>
              <button id="buttons" onClick={handleExport}>Export as JPG</button>
              <button id="buttons" onClick={handleExportSVG}>Export as SVG</button>
              <Stage
                ref={stageRef}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                width={500} height={400}>
                <Layer>
                  <KonvaImage shadowForStrokeEnabled={true} width={400} height={400} image={selectedSVG} />
                  {image && (
                    <KonvaImage
                      image={image.src}
                      ref={imageRef}
                      width={image.width}
                      height={image.height}
                      scaleX={image.scaleX}
                      draggable
                      onClick={() => {
                        selectShape("image");
                      }}
                      onTap={() => {
                        selectShape("image");
                      }}
                      onDragEnd={(e) => {
                        setImage({
                          ...image,
                          x: e.target.x(),
                          y: e.target.y(),
                        });
                      }}
                      onTransformEnd={(e) => {
                        const node = imageRef.current;
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();
                        node.scaleX(1);
                        node.scaleY(1);
                        setImage({
                          ...image,
                          x: node.x(),
                          y: node.y(),
                          width: Math.max(5, node.width() * scaleX),
                          height: Math.max(node.height() * scaleY),
                        });
                      }}
                    />
                  )}
                  <Text
                    {...text}
                    ref={textRef}
                    width={textRef.width}
                    onClick={() => {
                      selectShape(text.id);
                    }}
                    onTap={() => {
                      selectShape(text.id)
                    }}
                    draggable
                    onDragEnd={(e) => {
                      setText({
                        ...text,
                        x: e.target.x(),
                        y: e.target.y(),
                      });
                    }}
                    onTransformEnd={(e) => {
                      const node = textRef.current;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();
                      const actualWidth = Math.max(5, node.width() * scaleX);
                      setText({
                        ...text,
                        x: node.x(),
                        y: node.y(),
                        scaleX: e.target.scaleX(),
                        scaleY: e.target.scaleY(),
                        width: actualWidth
                      });
                    }}
                  />
                  {selectedId && (
                    <>
                      <Transformer
                        ref={trRef}
                        flipEnabled={true}
                        enabledAnchors={['middle-left', 'bottom-center', 'middle-right', 'bottom-left', 'bottom-right']}
                        boundBoxFunc={(oldBox, newBox) => {
                          if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                            return oldBox;
                          }
                          return newBox;
                        }}
                      >
                        <KonvaImage
                          image={iconDeleteImage}
                          fill='white'
                          width={20}
                          height={20}
                          onClick={handleDelete}
                          name="top-left"
                          offsetX={10}
                          offsetY={10}
                        />
                        <KonvaImage
                          width={20}
                          height={20}
                          image={iconFlipImage}
                          offsetX={selectedId === "text" ? -(Number(text.width)) : -(Number(image.width))}
                          offsetY={10}
                          onDragEnd={(e) => {
                            e.cancelBubble = true;
                          }}
                          onClick={() => handleFlip()}
                          name="top-right"
                        />
                      </Transformer>
                    </>
                  )}
                </Layer>
              </Stage>
            </Fragment>
          </div>

        </div>

        <div className='w-[70%] bg-gray'>
          <div className='bg-color-gray flex-row flex'>
            <p className='bg-blue bg-color-blue text-white bold text-center p-3 w-[11%] h-10 flex'> STEP 1</p>
            <p className='bg-gray bg-color-gray w-[80%] pl-5 bold h-10 flex'> Choose Your Style</p>
          </div>

          <div className='w-100 bg-color-gray  flex flex-row flex-wrap overflow-auto'>
            <Image src="/images/blue.svg" onClick={() => setSelectedProduct("/images/blue.svg")} className='bg-white m-2 border w-[420px] h-[200px]' width="420" height="200" alt="main" />
            <Image src="/images/cloth.svg" onClick={() => setSelectedProduct("/images/cloth.svg")} className='bg-white m-2 border w-[420px] h-[200px]' width="420" height="200" alt="main" />
            <Image src="/images/download.svg" onClick={() => setSelectedProduct("/images/download.svg")} className='bg-white m-2 border w-[420px] h-[200px]' width="420" height="200" alt="main" />
          </div>

          <div className='bg-color-gray mt-5 flex-row flex'>
            <p className='bg-blue bg-[green] text-white bold text-center p-3 w-[11%] h-10 flex'> STEP 2</p>
            <p className='bg-gray bg-color-gray pl-5 w-[80%] h-10 flex'> Choose Your Apparel</p>
          </div>

          <div className='w-100  bg-color-gray  flex flex-row flex-wrap overflow-auto'>
            <Image src="/images/blue.png" onClick={() => setSelectedProduct("/images/blue.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
            <Image src="/images/green.png" onClick={() => setSelectedProduct("/images/green.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
            <Image src="/images/pink.png" onClick={() => setSelectedProduct("/images/pink.png")} className='bg-white m-2  border' width="300" height="200" alt="main" />
            <Image src="/images/black.png" onClick={() => setSelectedProduct("/images/black.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
          </div>

          <div className='bg-color-gray mt-5 flex-row flex'>
            <p className='bg-blue bg-[yellow] text-white bold text-center p-3 w-[11%] h-10 flex'>STEP 3</p>
            <p className='bg-gray bg-color-gray pl-5 w-[80%] h-10 flex'> Choose Your Colors</p>
          </div>

          <div className='w-100   flex flex-row flex-wrap overflow-auto'>
            <div className='w-[30%] h-[90%] m-5 border'>
              <div>
                <p className='border text-center'>JERSEY OUTSIDE</p>
                <div className='p-5'>
                  {uniqColors && uniqColors.map((color, index) => (
                    <p
                      key={index}
                      className='m-1 border text-center'
                      style={{
                        content: "",
                        height: "30px",
                        cursor: "pointer",
                        backgroundColor: color,
                        marginRight: "10px",
                        border: "1px dashed black"
                      }}
                      onClick={() => showColorPicker(true, color)}
                    > Color {index}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className='w-[30%] h-[90%] m-5 border'>
              <>
                {displayColorPicker && (
                  <HexColorPicker
                    color={colorPickerSelectedColor}
                    onChange={(e) => setNewColor(colorPickerSelectedColor, e)}
                  />
                )}
              </>
            </div>
          </div>

          <div className='bg-color-gray mt-5 flex-row flex'>
            <p className='bg-blue bg-[pink] text-white bold text-center p-3 w-[11%] h-10 flex'> STEP 4</p>
            <p className='bg-gray bg-color-gray pl-5 w-[80%] h-10 flex'> Choose Your Print</p>
          </div>

          <div className='w-100  flex flex-row flex-wrap overflow-auto'>
            <Image src="/images/blue.png" onClick={() => setSelectedProduct("/images/blue.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
            <Image src="/images/green.png" onClick={() => setSelectedProduct("/images/green.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
          </div>

          <div className='bg-color-gray mt-5 flex-row flex'>
            <p className='bg-blue bg-[red] text-white bold text-center p-3 w-[11%] h-10 flex'> STEP 5</p>
            <p className='bg-gray bg-color-gray pl-5 w-[80%] h-10 flex'> Choose Your Fabric</p>
          </div>

          <div className='w-100 h-[11%]   flex flex-row flex-wrap overflow-auto'>
            <div>
              <Image src="/images/blue.png" onClick={() => setSelectedProduct("/images/blue.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
              <table>
                <tbody>
                  <tr>
                    <td>Economy+</td>
                  </tr>
                  <tr>
                    <td>150 GSM</td>
                  </tr>
                  <tr>
                    <td>Solid Finish</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>

              <Image src="/images/green.png" onClick={() => setSelectedProduct("/images/green.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
              <table>
                <tbody>
                  <tr>
                    <td>Sub Premium</td>
                  </tr>
                  <tr>
                    <td>180 GSM</td>
                  </tr>
                  <tr>
                    <td>Micro-Mesh Finish</td>
                  </tr>
                </tbody>
              </table>

            </div> <div>
              <Image src="/images/blue.png" onClick={() => setSelectedProduct("/images/blue.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
              <table>
                <tbody>
                  <tr>
                    <td>Ultra Premium</td>
                  </tr>
                  <tr>
                    <td>Laminated 220 GSM</td>
                  </tr>
                  <tr>
                    <td>Solid Finish</td>
                  </tr>
                </tbody>
              </table>

            </div> <div>
              <Image src="/images/green.png" onClick={() => setSelectedProduct("/images/green.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
              <table>
                <tbody>
                  <tr>
                    <td>Elite Performance</td>
                  </tr>
                  <tr>
                    <td>Laminated 240 GSM</td>
                  </tr>
                  <tr>
                    <td>Solid Finish</td>
                  </tr>
                </tbody>
              </table>

            </div> </div>
          <div className='bg-color-gray mt-5 flex-row flex'>
            <p className='bg-blue bg-[blue] text-white bold text-center p-3 w-[11%] h-10 flex'> STEP 6</p>
            <p className='bg-gray bg-color-gray pl-5 w-[80%] h-10 flex'> Choose Your Neckline</p>
          </div>

          <div className='w-100 h-[10%]   flex flex-row flex-wrap overflow-auto'>
            <Image src="/images/blue.png" onClick={() => setSelectedProduct("/images/blue.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
            <Image src="/images/green.png" onClick={() => setSelectedProduct("/images/green.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
            <Image src="/images/green.png" onClick={() => setSelectedProduct("/images/green.png")} className='bg-white m-2 border' width="300" height="200" alt="main" />
          </div>

          <div className='bg-color-gray mt-5 flex-row flex'>
            <p className='bg-blue bg-[purple] text-white bold text-center p-3 w-[11%] h-10 flex'> STEP 7</p>
            <p className='bg-gray bg-color-gray pl-5 w-[80%] h-10 flex'> Choose Your Sized</p>
          </div>

          <div className='w-100   flex flex-row flex-wrap overflow-auto'>
            <div>
              <h6 className='text-center'>Men</h6>
              <div className='flex flex-row flex-wrap overflow-auto'>
                <div className='w-[24%] m-1 flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">S</label>
                  <input className='border' type="text" />
                </div>
                <div className=' w-[24%] m-1 flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">M</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">L</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">XL</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">2XL (+10%)</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">3XL (+10%)</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">4XL (+10%)</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">CUSTOM (+20%)</label>
                  <input className='border' type="text" />
                </div>
              </div>
            </div>
            <div>
              <h6 className='text-center'>Women</h6>
              <div className='flex flex-row flex-wrap overflow-auto'>
                <div className='w-[24%] m-1 flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">WXS</label>
                  <input className='border' type="text" />
                </div>
                <div className=' w-[24%] m-1 flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">WS</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">WM</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">WL</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">WXL</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">W2XL (+10%)</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">W3XL (+10%)</label>
                  <input className='border' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">CUSTOM (+20%)</label>
                  <input className='border' type="text" />
                </div>
              </div>
            </div>
            <div>
              <h6 className='text-center'>Youth</h6>
              <div className='flex flex-row flex-wrap overflow-auto'>
                <div className='w-[16%] m-1 flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">YXS</label>
                  <input className='border  w-[100%]' type="text" />
                </div>
                <div className=' w-[16%] m-1 flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">YS</label>
                  <input className='border  w-[100%]' type="text" />
                </div>
                <div className='w-[16%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">YM</label>
                  <input className='border  w-[100%]' type="text" />
                </div>
                <div className='w-[16%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">YL</label>
                  <input className='border  w-[100%]' type="text" />
                </div>
                <div className='w-[16%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">YXL</label>
                  <input className='border  w-[100%]' type="text" />
                </div>
                <div className='w-[16%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">CUSTOM (+20%)</label>
                  <input className='border  w-[100%]' type="text" />
                </div>
              </div>
            </div>
            <div>
              <h6 className='text-center w-[100%]'>Toddler</h6>
              <div className='flex flex-row flex-wrap overflow-auto'>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">T2T</label>
                  <input className='border  w-[100%]' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">T3T</label>
                  <input className='border  w-[100%]' type="text" />
                </div>
                <div className='w-[24%] m-1  flex flex-col flex-wrap overflow-auto text-center'>
                  <label htmlFor="s">T4T</label>
                  <input className='border  w-[100%]' type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className='w-100 mt-5 flex-row flex'>
            <p className='bg-blue bg-[orange] text-white bold text-center p-3 w-[11%] h-10 flex'> STEP 9</p>
            <p className='bg-gray bg-color-gray pl-5 w-[80%] h-10 flex'> Customize Your Apparel</p>
          </div>

          <div className='w-[100%] h-[10%] bg-[white]'>
            <div className='p-2 w-[100%] flex flex-row'>
              <div className='p-2 w-[59%]'>
                <div>
                  <p className='text-center border'>EDIT TEXT</p>
                </div>
                <div className='border'>
                  <div>
                    <div>
                      <p>Font Family</p>
                      <input type="text" />
                    </div>
                    <div>
                      <p>Font Size</p>
                      <input type="text" />
                    </div>
                    <div>
                      <p>Color</p>
                      <input type="color" name="" id="" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>Font Style</p>
                      <p ><span className='p-2 border bg-[white] m-2'>B</span>
                        <span className='p-2 border bg-[white] m-2'>I</span>
                        <span className='p-2 border bg-[white] m-2'>U</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-2 w-[40%]'>
                <div>
                  Add Text & Numbers
                  <input type="text" className='input-style border-1' value={text.text} onChange={handleTextChange} />
                </div>
                <div>
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='bg-color-gray mt-5 flex-row flex'>
            <p className='bg-blue bg-[red] text-white bold text-center p-3 w-[11%] h-10 flex'> STEP 12</p>
            <p className='bg-gray bg-color-gray pl-5 w-[80%] h-10 flex'> Review Order Details</p>
          </div>
          
          <div className='w-[100%] h-[15%] flex flex-row flex-wrap overflow-auto'>
            <div className='w-[100%] border m-1 '>
              <div className='text-center w-100'>
                <p className='p-3'>Total Amount</p>
                <h1 className='bold p-3 text-[red]'>$0.00</h1>
                <table>
                  <thead>
                    <tr>
                      <td className='border-0'>Jersey</td>
                      <td className='border-0'>$0.00/Jersey</td>
                      <td className='border-0'>0 Jersey</td>
                      <td className='border-0'>$0.00</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border-0'>
                        Jersey Cost Breakdown
                      </td>
                      <td colSpan={3}>
                      </td>
                    </tr>
                    <tr>
                      <td className='border-0'>
                        Base Price
                      </td>
                      <td colSpan={2}>

                      </td><td>$0.00
                      </td>
                    </tr>
                    <tr>
                      <td className='border-0'>
                        Roster (Add-on)
                      </td>
                      <td colSpan={2}>
                      </td><td>$0.00
                      </td>
                    </tr>
                    <tr>
                      <td className='border-0'>
                        Neckline (Add-on)
                      </td>
                      <td colSpan={2}>
                      </td><td>$0.00
                      </td>
                    </tr>
                    <tr>
                      <td>Delivery Charges</td>
                    </tr>
                    <tr>
                      <td>Shipping Cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='bg-[gray] text-center w-100 text-white'>
                <button className='bg-[green] py-5 px-[40px] my-[30px]'>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
