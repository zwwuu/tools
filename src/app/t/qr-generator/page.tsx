"use client";

import { useRef, useState } from "react";
import { IconDownload, IconPhoto } from "@tabler/icons-react";
import { QRCodeCanvas } from "qrcode.react";

import Main from "~/app/t/components/Main";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import FileUpload from "~/components/FileUpload";
import Checkbox from "~/components/Form/Checkbox";
import ColorPicker from "~/components/Form/ColorPicker";
import Input from "~/components/Form/Input";
import Select from "~/components/Form/Select";
import Textarea from "~/components/Form/Textarea";
import { Slider } from "~/components/Slider";
import Heading from "~/components/Typography/Heading";

export default function QrGeneratorPage() {
  const [value, setValue] = useState("");
  const [size, setSize] = useState(128);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState("L");
  const [includeMargin, setIncludeMargin] = useState(false);
  const [includeImage, setIncludeImage] = useState(false);
  const [imageH, setImageH] = useState(24);
  const [imageW, setImageW] = useState(24);
  const [imageX, setImageX] = useState(0);
  const [imageY, setImageY] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [imageExcavate, setImageExcavate] = useState(true);
  const [centerImage, setCenterImage] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Main>
      <Card>
        <CardBody>
          <form className={"space-y-4"}>
            <div>
              <label htmlFor={"value"}>Value</label>
              <Textarea
                className={"block w-full"}
                id={"value"}
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor={"size"}>Size (px)</label>
              <Input
                className={"block w-full"}
                id={"size"}
                min={1}
                type={"number"}
                value={size}
                onChange={(event) => {
                  setSize(parseInt(event.target.value, 10));
                }}
              />
            </div>
            <div>
              <div className={"-m-4 flex flex-wrap"}>
                <div className={"m-4"}>
                  <label htmlFor={"bg"}>Background Color</label>
                  <ColorPicker
                    className={"block"}
                    id={"bg"}
                    type={"color"}
                    value={bgColor}
                    onChange={(event) => {
                      setBgColor(event.target.value);
                    }}
                  />
                </div>
                <div className={"m-4"}>
                  <label htmlFor={"fg"}>Foreground Color</label>
                  <ColorPicker
                    className={"block"}
                    id={"fg"}
                    type={"color"}
                    value={fgColor}
                    onChange={(event) => {
                      setFgColor(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor={"level"}>Error Level</label>
              <Select
                className={"block"}
                data={[
                  { label: "L", value: "L" },
                  { label: "M", value: "M" },
                  { label: "Q", value: "Q" },
                  { label: "H", value: "H" },
                ]}
                id={"level"}
                value={level}
                onChange={(event) => {
                  setLevel(event.target.value);
                }}
              />
            </div>
            <div>
              <label>
                <Checkbox
                  checked={includeMargin}
                  className={"mr-2"}
                  onChange={() => {
                    setIncludeMargin(!includeMargin);
                  }}
                />
                Include Margin
              </label>
            </div>
            <div>
              <label>
                <Checkbox
                  checked={includeImage}
                  className={"mr-2"}
                  onChange={() => {
                    setIncludeImage(!includeImage);
                  }}
                />
                Include Image
              </label>
              <fieldset className={"border px-4 pb-4"} disabled={!includeImage}>
                <legend>Image Settings</legend>
                <div className={"space-y-2"}>
                  <div>
                    <label htmlFor={"src"}>Source</label>
                    <FileUpload
                      dropzoneProps={{
                        onDropAccepted: ([file]) => {
                          setImage(file);
                          setError(null);
                        },
                        onDropRejected: () => {
                          setError("Invalid file type.");
                        },
                        maxFiles: 1,
                        accept: { "image/*": [] },
                      }}
                      name={"image"}
                    >
                      <div className={"flex flex-col items-center space-y-2"}>
                        <p>
                          <IconPhoto className={"mr-2 inline-block"} size={"2em"} aria-hidden />
                          Drag and drop an image here, or click to select an image.
                        </p>
                        {image && (
                          <figure>
                            <img
                              alt={"Uploaded image"}
                              className={"mx-auto max-h-96 max-w-full"}
                              src={URL.createObjectURL(image)}
                            />
                            <figcaption className={"break-all opacity-80 text-xs"}>{image.name}</figcaption>
                          </figure>
                        )}
                      </div>
                    </FileUpload>
                    {error && (
                      <span className={"text-red-500"} role={"alert"}>
                        {error}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor={"width"}>Width</label>
                    <Input
                      className={"block w-full"}
                      id={"width"}
                      type={"number"}
                      value={imageW}
                      onChange={(event) => {
                        setImageW(parseInt(event.target.value, 10));
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor={"height"}>Height</label>
                    <Input
                      className={"block w-full"}
                      id={"height"}
                      type={"number"}
                      value={imageH}
                      onChange={(event) => {
                        setImageH(parseInt(event.target.value, 10));
                      }}
                    />
                  </div>
                  <div>
                    <div>
                      <label>
                        <Checkbox
                          checked={centerImage}
                          className={"mr-2"}
                          onChange={() => {
                            setCenterImage(!centerImage);
                          }}
                        />
                        Center Image
                      </label>
                    </div>
                    <fieldset className={"border-sm px-4 pb-4"} disabled={centerImage}>
                      <legend>Position</legend>
                      <div className={"space-y-2"}>
                        <div>
                          <label htmlFor={"x"}>{`X=${imageX}`}</label>
                          <Slider
                            id={"x"}
                            max={size - imageW}
                            min={0}
                            step={1}
                            value={[imageX]}
                            onValueChange={([value]) => {
                              setImageX(value);
                            }}
                          />
                        </div>
                        <div>
                          <label htmlFor={"y"}>{`Y=${imageY}`}</label>
                          <Slider
                            id={"y"}
                            max={size - imageH}
                            min={0}
                            step={1}
                            value={[imageY]}
                            onValueChange={([value]) => {
                              setImageY(value);
                            }}
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div>
                    <label>
                      <Checkbox
                        checked={imageExcavate}
                        className={"mr-2"}
                        onChange={() => {
                          setImageExcavate(!imageExcavate);
                        }}
                      />
                      Excavate
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardBody className={"space-y-4"}>
          <Heading as={"h2"}>Result</Heading>
          <div>
            <Button
              type={"button"}
              onClick={() => {
                const canvas = canvasContainerRef.current?.querySelector("canvas");
                if (!canvas) {
                  return;
                }
                const link = document.createElement("a");
                link.download = "qrcode.png";
                link.href = canvas.toDataURL("image/png");
                link.click();
                link.remove();
              }}
            >
              <IconDownload className={"mr-2"} size={"1em"} aria-hidden /> Download
            </Button>
          </div>

          <div className={"overflow-x-auto"} ref={canvasContainerRef}>
            <QRCodeCanvas
              bgColor={bgColor}
              fgColor={fgColor}
              imageSettings={
                includeImage && image
                  ? {
                      src: URL.createObjectURL(image),
                      x: centerImage ? undefined : imageX,
                      y: centerImage ? undefined : imageY,
                      height: imageH,
                      width: imageW,
                      excavate: imageExcavate,
                    }
                  : undefined
              }
              includeMargin={includeMargin}
              level={level}
              size={size}
              value={value}
            />
          </div>
        </CardBody>
      </Card>
    </Main>
  );
}
