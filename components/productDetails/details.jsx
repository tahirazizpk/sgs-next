"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stage, Layer, Text, Image as KonvaImage, Transformer } from 'react-konva';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import getColors from 'get-svg-colors';
import { HexColorPicker } from 'react-colorful';
import { Button, Offcanvas } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
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
},
, {
    imageSrc: "/images/jersey4.svg",
    alt: "jersey",
    label: "BA7",
},
, {
    imageSrc: "/images/jersey5.svg",
    alt: "jersey",
    label: "BA8",
},
, {
    imageSrc: "/images/jersey6.svg",
    alt: "jersey",
    label: "BA9",
}];

const jerseyData = [{
    id:"BA3",
    imageSrc: "/images/jersey.svg",
    alt: "jersey",
    label: "Jersey",
    labelReversible: "Reversible Jersey"
}, {
    id:"BA3",
    imageSrc: "/images/short.svg",
    alt: "shorts",
    label: "Shorts",
    labelReversible: "Reversible Shorts",
},
{
    id:"BA4",
    imageSrc: "/images/jersey1.svg",
    alt: "jersey",
    label: "Jersey",
    labelReversible: "Reversible Jersey"
}, {
    id:"BA4",
    imageSrc: "/images/short1.svg",
    alt: "shorts",
    label: "Shorts",
    labelReversible: "Reversible Shorts",
},
{
    id:"BA5",
    imageSrc: "/images/jersey2.svg",
    alt: "jersey",
    label: "Jersey",
    labelReversible: "Reversible Jersey"
}, {
    id:"BA5",
    imageSrc: "/images/short2.svg",
    alt: "shorts",
    label: "Shorts",
    labelReversible: "Reversible Shorts",
},
{
    id:"BA6",
    imageSrc: "/images/jersey3.svg",
    alt: "jersey",
    label: "Jersey",
    labelReversible: "Reversible Jersey"
}, {
    id:"BA6",
    imageSrc: "/images/short3.svg",
    alt: "shorts",
    label: "Shorts",
    labelReversible: "Reversible Shorts",
},
{
    id:"BA7",
    imageSrc: "/images/jersey4.svg",
    alt: "jersey",
    label: "Jersey",
    labelReversible: "Reversible Jersey"
}, {
    id:"BA7",
    imageSrc: "/images/short4.svg",
    alt: "shorts",
    label: "Shorts",
    labelReversible: "Reversible Shorts",
},
{
    id:"BA8",
    imageSrc: "/images/jersey5.svg",
    alt: "jersey",
    label: "Jersey",
    labelReversible: "Reversible Jersey"
}, {
    id:"BA8",
    imageSrc: "/images/short5.svg",
    alt: "shorts",
    label: "Shorts",
    labelReversible: "Reversible Shorts",
},
{
    id:"BA9",
    imageSrc: "/images/jersey6.svg",
    alt: "jersey",
    label: "Jersey",
    labelReversible: "Reversible Jersey"
}, {
    id:"BA9",
    imageSrc: "/images/short6.svg",
    alt: "shorts",
    label: "Shorts",
    labelReversible: "Reversible Shorts",
}];

const necklineData = [{
    imageSrc: "/images/neckline-v-shape-real.png",
    alt: "neckline",
    label: "V Shape",
}, {
    imageSrc: "/images/neckline-round-real.png",
    alt: "neckline",
    label: "Round Shape",
}, {
    imageSrc: "/images/neckline-y-shape2-real.png",
    alt: "neckline",
    label: "Y Shape",
}];

const printData = [{
    imageSrc: "/images/choose-print-EMBROIDERED.png",
    alt: "embroidered",
    label: "Embroidered",
}, {
    imageSrc: "/images/choose-print-SUBLIMATED.png",
    alt: "sublimated",
    label: "Sublimated",
}];

const fabricData = [{
    imageSrc: "/images/fabric-poly-knit-new.png",
    alt: "fabric-poly-knit",
    label: "Poly-Knit",
    pointOne: "Economy+",
    pointTwo: "150 GSM",
    pointThree: "Solid Finish"
}, {
    imageSrc: "/images/fabric-poly-mesh-new.png",
    alt: "fabric-poly-mesh",
    label: "Poly-Mesh",
    pointOne: "Sub Premium",
    pointTwo: "180 GSM",
    pointThree: "Micro-Mesh Finish"
}, {
    imageSrc: "/images/new-fabric-pro-wick.png",
    alt: "fabric-pro-wick",
    label: "PRO-Wick",
    pointOne: "Ultra Premium",
    pointTwo: "Laminated 220 GSM",
    pointThree: "Solid Finish"
}, {
    imageSrc: "/images/fabric-pro-elite.png",
    alt: "fabric-pro-elite",
    label: "PRO-Elite",
    pointOne: "Elite Performance",
    pointTwo: "Laminated 240 GSM",
    pointThree: "Solid Finish"
}];

const Details = () => {
    const [activeIndex, setActiveIndex] = useState("BA3");
    const [reversible, setReversible] = useState([]);
    const [activeIndexJersey, setActiveIndexJersey] = useState(["Jersey"])
    const [activeIndexPrint, setActiveIndexPrint] = useState(null);
    const [activeIndexFabric, setActiveIndexFabric] = useState(null);
    const [activeIndexNeckline, setActiveIndexNeckline] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState("/images/jersey.svg");
    const [url, setNewUrl] = useState(selectedProduct);
    const [colors, setColors] = useState([]);
    const [selectedSVG] = useImage("data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(url))));

    const handleCardClick = (index, imageSrc) => {
        if(index !== activeIndex)
     {   setActiveIndex(index);
        setSelectedProduct(imageSrc);
        setActiveIndexJersey(["Jersey"]);
    }
    };
    useEffect(() => {
        if (!Array.isArray(activeIndexJersey)) {
          setActiveIndexJersey([]);
        }
      }, [activeIndexJersey]);
    const handlePrintCardClick = (index) => {
        setActiveIndexPrint(index);
    };

    const handleFabricCardClick = (index) => {
        setActiveIndexFabric(index);
    };
    const handleNecklineCardClick = (index) => {
        setActiveIndexNeckline(index);
    };

    const handleJerseyCardClick = (index, imageSrc) => {
        const indexAsString = index.toString();
        const isItemInList = activeIndexJersey.includes(indexAsString);
        if (isItemInList) {
          setActiveIndexJersey(prevState => prevState.filter(itemIndex => itemIndex !== indexAsString));
        } else {
          setActiveIndexJersey(prevState => [...prevState, indexAsString]);
        }
    
        setSelectedProduct(imageSrc);
      };
      const handleJerseyReversibleCardClick = (index) => {
        const indexAsString = index.toString();
        const isItemInList = activeIndexJersey.includes(indexAsString);
        if (isItemInList) {
          setActiveIndexJersey(prevState => prevState.filter(itemIndex => itemIndex !== indexAsString));
        } else {
          setActiveIndexJersey(prevState => [...prevState, indexAsString]);
        }
      };
    // const handleJerseyCardClick = (index, imageSrc) => {
    //     setSelectedProduct(imageSrc);
    //     setActiveIndexJersey(index);
    // };
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
        x: 20,
        y: 30,
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
        updateDimensions();
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
            // setColors(classAndColors);

           
            const jerseyGroup = xmlDoc.getElementById('Jersey');
          
            if (jerseyGroup) {
              const nestedInfoInsideJersey = [];
          
              Array.from(jerseyGroup.children).forEach((element) => {
                const elementId = element.id;
                const { classes, idWithoutClasses } = parseClassesFromId(elementId);
                  if(/^color_/i.test(idWithoutClasses)){
                    const pathsInsideElement = element.querySelectorAll('path');
                    const classesSet = new Set();
                    pathsInsideElement.forEach((path) => {
                        const pathClasses = Array.from(path.classList);
                        pathClasses.forEach((cls) => {
                          classesSet.add(cls);
                        });
                      });
                
                      const elementInfo = {
                        id: elementId || null,
                        idTrim: idWithoutClasses,
                        classes: Array.from(classesSet), // Convert Set to Array
                      };
                   
                        const colorInfo = classAndColors.find(color => color.className === elementInfo.classes[0]);
                        colorInfo ? colorInfo.fillColor : null;
                      
          
                      elementInfo.fillColors = colorInfo;
                      nestedInfoInsideJersey.push(elementInfo);
                  
                  }
                });
             
                console.log(nestedInfoInsideJersey)
                setColors(nestedInfoInsideJersey);
            } 


        } else {
            console.error('No style element found in the SVG.');
        }
    };
    const parseClassesFromId = (id) => {
        const classRegex = /Color_\d+_(.*)/;
        const match = id.match(classRegex);
        if (match) {
          const classes = match[1].split('_');
          const idWithoutClasses = id.replace(`_${match[1]}`, '');
          return { classes, idWithoutClasses };
        } else {
          return { classes: [], idWithoutClasses: id };
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
            const jerseyGroup = xmlDoc.getElementById('Jersey');
          
            if (jerseyGroup) {
              const nestedInfoInsideJersey = [];
          
              Array.from(jerseyGroup.children).forEach((element) => {
                const elementId = element.id;
                const { classes, idWithoutClasses } = parseClassesFromId(elementId);
                  if(/^color_/i.test(idWithoutClasses)){
                    const pathsInsideElement = element.querySelectorAll('path');
                    const classesSet = new Set();
                    pathsInsideElement.forEach((path) => {
                        const pathClasses = Array.from(path.classList);
                        pathClasses.forEach((cls) => {
                          classesSet.add(cls);
                        });
                      });
                
                      const elementInfo = {
                        id: elementId || null,
                        idTrim: idWithoutClasses,
                        classes: Array.from(classesSet), // Convert Set to Array
                      };
                   
                        const colorInfo = classAndColors.find(color => color.className === elementInfo.classes[0]);
                        colorInfo ? colorInfo.fillColor : null;
                      
          
                      elementInfo.fillColors = colorInfo;
                      nestedInfoInsideJersey.push(elementInfo);
                  
                  }
                });
             
                console.log(nestedInfoInsideJersey)
                setColors(nestedInfoInsideJersey);
            } 

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
                            <div key={index} onClick={() => {
                                colorChange(color);
                                handleClose()
                            }} style={{ backgroundColor: color, height: '50px', width: '50px', margin: '5px', cursor: "pointer" }}>
                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            <div className='left-section' >
                <div style={{ display: "block" }}>
                    <div className='canvas-body'>
                        <div className='left-body' style={{ position: "fixed", marginLeft: "6%" }} ref={containerRef}>
                            <div className='related-img-wrapper'>
                                <div className='canvas-col'>
                                    <div className='editor-preview-container' >
                                        <Stage
                                            ref={stageRef}
                                            width={containerDimensions.width} height={containerDimensions.height}
                                        >
                                            <Layer>
                                                <KonvaImage
                                                    image={selectedSVG}
                                                    ref={imageRef}
                                                    y={image.y}
                                                    width={containerDimensions.width} height={containerDimensions.height - 40}
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
                                            className={`card-content ${cardData.label === activeIndex ? 'stepone-active' : ''}`}
                                            key={index}
                                            onClick={() => handleCardClick(cardData.label, cardData.imageSrc)}
                                        >
                                            <div className='image-card-item'>
                                                <Image src={cardData.imageSrc} alt={cardData.alt} className="card-images-one" width="100" height="150" />
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
                                        <>
                                        {
                                            activeIndex === data.id &&
                                            <div className='second-width' key={index}>

                                             <div
                                                 className={`card-content-second ${activeIndexJersey?.includes(data.label) ? 'steptwo-active' : ''}`}
                                                
                                                 onClick={() => handleJerseyCardClick(data.label, data.imageSrc)}
                                             >
                                                 <div className='image-card-item-second'>
                                                     <Image src={data.imageSrc} alt={data.alt}   className={`card-images-second ${data.label === 'Shorts' ? 'shorts-image' : ''}`} width="100" height="150" />
                                                    <p className=''>{data.label}</p>
                                                     
                                                 </div>
                                                 <div className={`tick-active ${activeIndexJersey?.includes(data.label) ? '' : 'd-none'}`} ><span role="img" aria-label="check" className="anticon anticon-check"><svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></span>
                                                 </div>
                                            

                                             </div>
                                             <div onClick={() => handleJerseyReversibleCardClick(data.labelReversible)} className='point-fabric'>
                                                 <p>{data.labelReversible}</p>
                                                 <div className={`tick-active ${activeIndexJersey?.includes(data.labelReversible) ? '' : 'd-none'}`} ><span role="img" aria-label="check" className="anticon anticon-check"><svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></span>
                                                 </div>
                                             </div>
                                         </div>
                                        }
                                         

                                     </>
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
                                                                <input disabled className="input-color" type="text" value={`(${color.idTrim})`} />
                                                                <button color="#FF6900" type="button" onClick={() => { showColorPicker(true, color.fillColors); handleShow() }} style={{ backgroundColor: color.fillColors.fillColor }} className="color-button">
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


                    



                        <div className='upload-custom-design-step'>
                            <div className='design-heading' style={{ backgroundColor: "rgb(243, 5, 33)" }}>
                                <div className='step-number' >
                                    <p className='step-number-text'>STEP 4</p>
                                </div>
                                <div className='step-title'>
                                    <p className='step-title-text'>Choose Your Fabric</p>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='card-body-image-fifth'>
                                    {fabricData.map((cardData, index) => (
                                        <>
                                            <div className='fifth-width' key={index}>

                                                <div
                                                    className={`card-content-fifth ${index === activeIndexFabric ? 'stepfifth-active' : ''}`}
                                                    
                                                    onClick={() => handleFabricCardClick(index)}
                                                >
                                                    <div className='image-card-item-fifth'>
                                                        <Image src={cardData.imageSrc} alt={cardData.alt} className="card-images-fifth" width="100" height="150" />
                                                        <div className='d-flex flex-row-reverse '>

                                                            <span role="img" aria-label="question-circle" className="anticon anticon-question-circle align-content-center d-flex" style={{ alignItems: "center", fontSize: "13px", color: "rgb(227, 33, 27)", marginLeft: "23%", marginRight: "5%", flexWrap: "nowrap" }}><svg viewBox="64 64 896 896" focusable="false" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg></span>
                                                            <p className=''>{cardData.label}</p>
                                                        </div>
                                                    </div>
                                                    <div className={`tick-active ${activeIndexFabric === index ? '' : 'd-none'}`} ><span role="img" aria-label="check" className="anticon anticon-check"><svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></span>
                                                    </div>
                                                    <div className="tick-active-free" ><span className="anticon-free anticon-check">FREE</span>
                                                    </div>


                                                </div>
                                                <div className='point-fabric'>
                                                    <p>{cardData.pointOne}</p>
                                                    <hr />
                                                    <p>{cardData.pointTwo}</p>
                                                    <hr />
                                                    {cardData.pointThree}
                                                </div>
                                            </div>

                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='upload-custom-design-step'>
                            <div className='design-heading' style={{ backgroundColor: "rgb(206, 74, 145)" }}>
                                <div className='step-number' >
                                    <p className='step-number-text'>STEP 5</p>
                                </div>
                                <div className='step-title'>
                                    <p className='step-title-text'>Choose Your Neckline</p>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='card-body-image-sixth'>
                                    {necklineData.map((cardData, index) => (
                                        <div
                                            className={`card-content-sixth ${index === activeIndexNeckline ? 'stepsixth-active' : ''}`}
                                            key={index}
                                            onClick={() => handleNecklineCardClick(index)}
                                        >
                                            <div className='image-card-item-sixth'>
                                                <Image src={cardData.imageSrc} alt={cardData.alt} className="card-images-sixth" width="100" height="150" />

                                                <p>{cardData.label}</p>

                                            </div>
                                            <div className={`tick-active ${activeIndexNeckline === index ? '' : 'd-none'}`} ><span role="img" aria-label="check" className="anticon anticon-check"><svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></span>
                                            </div>

                                            <div className="tick-active-free" ><span className="anticon-free anticon-check">FREE</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        <div className='upload-custom-design-step'>
                            <div className='design-heading' style={{ backgroundColor: "rgb(200, 9, 217)" }}>
                                <div className='step-number' >
                                    <p className='step-number-text'>STEP 6</p>
                                </div>
                                <div className='step-title justify-content-between '>
                                    <p className='step-title-text'>Choose Your Sizes</p>
                                    <button className='chart-button'><a className="button-pdf" href="https://img.sportsgearswag.com/size-charts/022978e2aec5688c68b561352cbeeb7693161498.pdf" target="_blank">Size Chart</a></button>
                                </div>


                            </div>
                            <div className='card-body'>
                                <div className='card-body-image-seventh'>
                                    {/* {necklineData.map((cardData, index) => (
                                        <div
                                            className={`card-content-sixth ${index === activeIndexNeckline ? 'stepsixth-active' : ''}`}
                                            key={index}
                                            onClick={() => handleNecklineCardClick(index)}
                                        >
                                            <div className='image-card-item-sixth'>
                                                <Image src={cardData.imageSrc} alt={cardData.alt} className="card-images-sixth" width="100" height="150" />
                                          
                                                    <p>{cardData.label}</p>
                                               
                                            </div>
                                            <div className={`tick-active ${activeIndexNeckline === index ? '' : 'd-none'}`} ><span role="img" aria-label="check" className="anticon anticon-check"><svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></span>
                                            </div>

                                            <div className="tick-active-free" ><span className="anticon-free anticon-check">FREE</span>
                                            </div>
                                        </div>
                                    ))} */}
                                    {/* <Accordion defaultActiveKey={['0','1','2','3']} alwaysOpen>
                                        <Accordion.Item  eventKey="0">
                                            <Accordion.Header >Men</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Women</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do

                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>Youth</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do

                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>Toddler</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion> */}
                                    <div className='accordian-list'>
                                        <div className='accordian-one'>
                                            <div className='accordian-header'>
                                                <span role="img" aria-label="right" className="collapse-arrow"><svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" ><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></span>
                                                <span>Men</span>
                                            </div>
                                            <div className='accordian-body'>
                                                <div className='input-quantity-list'>
                                                    <div className='input-quantity-label'>
                                                        <p>S</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>M</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>L</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>XL</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>2XL <small>(+10%)</small></p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>3XL <small>(+10%)</small></p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>4XL <small>(+10%)</small></p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>CUSTOM <small>(+20%)</small></p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='accordian-one'>
                                            <div className='accordian-header'>
                                                <span role="img" aria-label="right" className="collapse-arrow"><svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" ><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></span>
                                                <span>Women</span>
                                            </div>
                                            <div className='accordian-body'>
                                                <div className='input-quantity-list'>
                                                    <div className='input-quantity-label'>
                                                        <p>WXS</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>WS</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>WM</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>WL</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>WXL</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>W2XL <small>(+10%)</small></p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>W3XL <small>(+10%)</small></p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>CUSTOM <small>(+20%)</small></p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='accordian-one'>
                                            <div className='accordian-header'>
                                                <span role="img" aria-label="right" className="collapse-arrow"><svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" ><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></span>
                                                <span>Youth</span>
                                            </div>
                                            <div className='accordian-body'>
                                                <div className='input-quantity-list'>
                                                    <div className='input-quantity-label-youth'>
                                                        <p>YXS</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label-youth'>
                                                        <p>YS</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label-youth'>
                                                        <p>YM</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label-youth'>
                                                        <p>YL</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label-youth'>
                                                        <p>YXL</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label-youth'>
                                                        <p>CUSTOM <small>(+20%)</small></p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='accordian-one'>
                                            <div className='accordian-header'>
                                                <span role="img" aria-label="right" className="collapse-arrow"><svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" ><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></span>
                                                <span>Toddler</span>
                                            </div>
                                            <div className='accordian-body'>
                                                <div className='input-quantity-list'>
                                                    <div className='input-quantity-label'>
                                                        <p>T2T</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>T3T</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />
                                                    </div>
                                                    <div className='input-quantity-label'>
                                                        <p>T4T</p>
                                                        <input className='input-qty' type="quantity" placeholder='Qty' />


                                                    </div>

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