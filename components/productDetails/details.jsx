"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stage, Layer, Text, Image as KonvaImage, Transformer } from 'react-konva';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import getColors from 'get-svg-colors';
import { HexColorPicker } from 'react-colorful';
import { Button, Offcanvas } from 'react-bootstrap';
import useImage from 'use-image';


const cardData = [{
    imageSrc: "/images/jersey.svg",
    alt: "jersey",
    label: "BA3",
}, {
    imageSrc: "/images/jersey1.svg",
    alt: "jersey",
    label: "BA4",
}, {
    imageSrc: "/images/jersey2.svg",
    alt: "jersey",
    label: "BA5",
}, {
    imageSrc: "/images/jersey3.svg",
    alt: "jersey",
    label: "BA6",
}];

const jerseyData = [{
    imageSrc: "/images/jerseyShort.svg",
    alt: "jersey",
    label: "Jersey",
}, {
    imageSrc: "/images/jerseyShort1.svg",
    alt: "jersey",
    label: "Reversible Jersey",
}, {
    imageSrc: "/images/jerseyShort2.svg",
    alt: "jersey",
    label: "Uniform",
}, {
    imageSrc: "/images/jerseyShort3.svg",
    alt: "jersey",
    label: "Reversible Uniform",
}];

const Details = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeIndexJersey, setActiveIndexJersey] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState("/images/jersey.svg");
    const [url, setNewUrl] = useState(selectedProduct);
    const [colors, setColors] = useState([]);

    const [selectedSVG] = useImage("data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(url))));

    const handleCardClick = (index, imageSrc) => {
        setActiveIndex(index);
        setSelectedProduct(imageSrc);
        setActiveIndexJersey(null);
    };

    const handleJerseyCardClick = (index, imageSrc) => {
        setSelectedProduct(imageSrc);
        setActiveIndexJersey(index);
    };

    const [stepOneTab, setStepOneTab] = useState(["Custom Design", "Most Popular", "Abstract", "Animal", "Camo", "Lines", "Nature", "League", "College", "Racerback", "Shapes", "Solid"]);
    const stageRef = useRef(null);
    const [selectedId, selectShape] = useState(null);
    const imageRef = useRef();
    const [image, setImage] = useState({
        id: "image",
        width: 50,
        height: 50,
        src: '/images/jersey.svg',
        scaleX: 1,
        scaleY: 1,
        x: 100,
        y: 60,
    });
    const containerRef = useRef(null);
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setContainerDimensions({ width, height });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions(); // Initial dimensions

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);


    const fetchSvg = async () => {
        const svg = await fetch(selectedProduct);
        const svgText = await svg.text();   
        setNewUrl(svgText)
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const styleElement = xmlDoc.querySelector('style');
        if (styleElement) {
            const styleText = styleElement.textContent;
            const classAndColorsRegex = /\.(\S+)\s*\{fill:(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3});\}/g;
            const matchClassAndColors = [...styleText.matchAll(classAndColorsRegex)];
            const classAndColors = matchClassAndColors.map(match => ({
              className: match[1],
              fillColor: match[2],
            }));
            console.log(classAndColors)
            setColors(classAndColors);

        } else {
            console.error('No style element found in the SVG.');
        }
    };

    useEffect(() => {
        fetchSvg();
    }, [selectedProduct]);
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getRandomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    const randomColors = Array.from({ length: 10 }, () => getRandomColor());
    const [colorPickerSelectedColor, setColorPickerSelectedColor] = useState({
        className: '',
        fillColor: '',
      });
    const showColorPicker = (toggle, oldColor) => {
        console.log("oldColor",oldColor.className, oldColor.fillColor)
        setColorPickerSelectedColor({
            className: oldColor.className,
            fillColor: oldColor.fillColor,
          });
    };
    const colorChange = async(newColor) => {
        const re = new RegExp(`\\.${colorPickerSelectedColor.className}\\s*\\{fill:${colorPickerSelectedColor.fillColor};\\}`, 'gi');
        const newSvgCode = url.replace(re, `.${colorPickerSelectedColor.className}{fill:${newColor};}`);
        setColorPickerSelectedColor(colorPickerSelectedColor.className, newColor);
        setNewUrl(newSvgCode);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(newSvgCode, 'image/svg+xml');
        const styleElement = xmlDoc.querySelector('style');
        if (styleElement) {
            const styleText = styleElement.textContent;
            const classAndColorsRegex = /\.(\S+)\s*\{fill:(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3});\}/g;
            const matchClassAndColors = [...styleText.matchAll(classAndColorsRegex)];
            const classAndColors = matchClassAndColors.map(match => ({
              className: match[1],
              fillColor: match[2],
            }));
            console.log(classAndColors)
            setColors(classAndColors);

        } else {
            console.error('No style element found in the SVG.');
        }
    };
    return (
        <div className='canvas-section'>
            <Offcanvas style={{ width: "40%" }} placement={"end"} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>PMS Color Picker</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <input type="text" style={{ width: "100%" }} placeholder='Search PMS Color' />

                    <div className='color-section-sidebar'>
                        {randomColors.map((color, index) => (
                            <div key={index} onClick={() => {colorChange(color);
                                handleClose()}} style={{ backgroundColor: color, height: '50px', width: '50px', margin: '5px', cursor: "pointer" }}>
                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            <div className='left-section' >
                <div style={{ display: "block" }}>
                    <div className='canvas-body'>
                        <div className='left-body' style={{position:"fixed", marginLeft:"6%"}}>
                            <div className='related-img-wrapper'>
                                <div className='canvas-col'>
                                    <div className='editor-preview-container' ref={containerRef}>
                                        <Stage
                                            ref={stageRef}
                                            width={containerDimensions.width} height={containerDimensions.height}
                                        >
                                            <Layer>
                                                <KonvaImage
                                                    image={selectedSVG}
                                                    ref={imageRef}
                                                    width={containerDimensions.width} height={containerDimensions.height}
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
                                            </Layer>
                                        </Stage>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='right-section'>
                <div className='right-inner-section'>
                    <form className='editor-list'>
                        <div className='upload-custom-design-step'>
                            <div className='design-heading' style={{ backgroundColor: "rgb(103, 58, 183)" }}>
                                <div className='step-number' >
                                    <p className='step-number-text'>STEP 1</p>
                                </div>
                                <div className='step-title'>
                                    <p className='step-title-text'>Choose Your Style</p>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='card-tabs'>
                                    <div className='tabs'>
                                        {
                                            stepOneTab.map((item, index) => (
                                                <p key={index} className='tab-item'>{item}</p>
                                            ))
                                        }
                                    </div>
                                    <div className='icons'>
                                        <FontAwesomeIcon icon={faEllipsis} className='icon-ellipse' />
                                    </div>

                                </div>
                                <div className='card-body-image'>
                                    {cardData.map((cardData, index) => (
                                        <div
                                            className={`card-content ${index === activeIndex ? 'stepone-active' : ''}`}
                                            key={index}
                                            onClick={() => handleCardClick(index, cardData.imageSrc)}
                                        >
                                            <div className='image-card-item'>
                                                <Image src={cardData.imageSrc} alt={cardData.alt} className="card-images" width="100" height="150" />
                                                <p>{cardData.label}</p>
                                            </div>
                                            <div className="tick-active"><span role="img" aria-label="check" className="anticon anticon-check"><svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></span></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='upload-custom-design-step'>
                            <div className='design-heading' style={{ backgroundColor: "rgb(124, 155, 93)" }}>
                                <div className='step-number'>
                                    <p className='step-number-text'>STEP 2</p>
                                </div>
                                <div className='step-title'>
                                    <p className='step-title-text'>Choose Your Apparel</p>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='card-body-image-second'>
                                    {jerseyData.map((data, index) => (
                                        <div
                                            className={`card-content-second ${index === activeIndexJersey ? 'steptwo-active' : ''}`}
                                            key={index}
                                            onClick={() => handleJerseyCardClick(index, data.imageSrc)}
                                        >
                                            <div className='image-card-item-second'>
                                                <Image src={data.imageSrc} alt={data.alt} className="card-images" width="50" height="150" />
                                                <p>{data.label}</p>
                                            </div>
                                            <div className="tick-active"><span role="img" aria-label="check" className="anticon anticon-check"><svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></span></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='upload-custom-design-step'>
                            <div className='design-heading' style={{ backgroundColor: "rgb(254, 195, 4)" }}>
                                <div className='step-number'>
                                    <p className='step-number-text'>STEP 3</p>
                                </div>
                                <div className='step-title'>
                                    <p className='step-title-text'>Choose Your Colors</p>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='card-body-image-third'>
                                    <div className='color-section'>
                                        <div className='outside-jersey'>
                                            <p className='heading-jersey-color'>JERSEY OUTSIDE</p>
                                            <div className='color-selection'>
                                                <div className='color-list'>
                                                    {colors.map((color, index) => (
                                                        <>  <span className="color-1" key={index}>
                                                            <span className="inner-color">
                                                                <input disabled className="input-color" type="text" value="COLOR 1 (PMS 1505 C)" />
                                                                <button color="#FF6900" type="button" onClick={() => { showColorPicker(true, color); handleShow() }} style={{ backgroundColor: color.fillColor }} className="color-button">
                                                                    <div className="ant-image"  >
                                                                        <img className="ant-image-img" style={{ color: "gray" }} src="https://img.sportsgearswag.com/assets/Jersey.svg" />
                                                                    </div>
                                                                </button>
                                                            </span>
                                                        </span>
                                                        </>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Details