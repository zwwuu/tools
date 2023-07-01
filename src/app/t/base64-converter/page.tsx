"use client";

import { useState } from "react";
import { IconFile, IconFileUpload } from "@tabler/icons-react";
import clsx from "clsx";

import { MODES, TYPES } from "~/app/t/base64-converter/data";
import Main from "~/app/t/components/Main";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import FileUpload from "~/components/FileUpload";
import Checkbox from "~/components/Form/Checkbox";
import Select from "~/components/Form/Select";
import Textarea from "~/components/Form/Textarea";
import { RadioGroup, RadioGroupItem } from "~/components/RadioGroup";

export default function Base64ConverterPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<(typeof MODES)[number]["value"]>(MODES[0].value);
  const [type, setType] = useState<(typeof TYPES)[number]["value"]>(TYPES[0].value);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [download, setDownload] = useState<string | null>(null);

  return (
    <Main>
      <Card>
        <CardBody>
          <form
            className={"space-y-4"}
            onSubmit={(event) => {
              event.preventDefault();
              if (mode === "encode") {
                if (type === "text") {
                  setResult(Buffer.from(input, "utf-8").toString("base64"));
                  return;
                }

                new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file!);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = (error) => reject(error);
                })
                  .then((result) => {
                    const res = result as string;
                    setResult(Buffer.from(res, "utf-8").toString("base64"));
                  })
                  .catch((error) => {
                    setError(error.message);
                  });
              } else {
                const base64 = Buffer.from(input, "base64").toString();
                setResult(base64);
                setDownload(() => {
                  return base64.startsWith("data:") ? base64.split(";base64,")[0].split(":")[1] : null;
                });
              }
            }}
          >
            <div className={"flex justify-end"}>
              <RadioGroup
                className={"divide-x-sm border-sm shadow-sm"}
                defaultValue={"encode"}
                onValueChange={(value) => {
                  setResult("");
                  setError(null);
                  setMode(value);
                }}
              >
                <RadioGroupItem className={"px-4 py-2"} value={"encode"}>
                  Encode
                </RadioGroupItem>
                <RadioGroupItem className={"px-4 py-2"} value={"decode"}>
                  Decode
                </RadioGroupItem>
              </RadioGroup>
            </div>

            {mode === "encode" && (
              <>
                <div>
                  <label htmlFor={"data"}>Data type</label>
                  <Select
                    className={"block w-full"}
                    data={TYPES}
                    id={"data"}
                    value={type}
                    onChange={(event) => {
                      setType(event.target.value);
                    }}
                  />
                </div>
                {type === "text" ? (
                  <div>
                    <label htmlFor={"input"}>Text</label>
                    <Textarea
                      autoSize={false}
                      className={"block w-full break-all font-mono"}
                      id={"input"}
                      rows={4}
                      value={input}
                      required
                      onChange={(event) => {
                        setInput(event.target.value);
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <FileUpload
                      dropzoneProps={{
                        onDropAccepted: ([file]) => {
                          setFile(file);
                          setError(null);
                        },
                        onDropRejected: () => {
                          setError("Invalid file type.");
                        },
                        maxFiles: 1,
                      }}
                      name={"file"}
                    >
                      <div className={"flex flex-col items-center"}>
                        {file && (
                          <div className={"mb-2 flex flex-col items-center"}>
                            <IconFile size={"2em"} aria-hidden />
                            <p className={"break-all text-sm"}>{file.name}</p>
                            <p className={"break-all text-xs"}>{file.type}</p>
                          </div>
                        )}
                        <p className={clsx(file && "opacity-60 text-xs")}>
                          <IconFileUpload className={"mr-2 inline-block"} size={"2em"} aria-hidden />
                          Drag and drop a file here, or click to select an file.
                        </p>
                      </div>
                    </FileUpload>
                    {error && (
                      <span className={"text-red-500"} role={"alert"}>
                        {error}
                      </span>
                    )}
                  </div>
                )}
              </>
            )}

            {mode === "decode" && (
              <div>
                <label htmlFor={"input"}>Base64</label>
                <Textarea
                  autoSize={false}
                  className={"block w-full"}
                  id={"input"}
                  rows={4}
                  value={input}
                  required
                  onChange={(event) => {
                    setInput(event.target.value);
                  }}
                />
              </div>
            )}

            <div>
              <div className={"-m-4 flex flex-wrap"}>
                <Button className={"m-4"} type={"submit"}>
                  Convert
                </Button>
                <Button
                  className={"m-4"}
                  type={"reset"}
                  variant={"warning"}
                  onClick={(event) => {
                    event.preventDefault();
                    if (type === "text") {
                      setInput("");
                    } else {
                      setFile(null);
                      setError(null);
                    }
                    setResult("");
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      {result && (
        <Card>
          <CardBody>
            <output className={"block"}>
              <label htmlFor={"result"}>{mode === "encode" ? "Base64" : "Text"}</label>
              <div className={"space-y-4"}>
                <Textarea
                  autoSize={false}
                  className={"block w-full break-all font-mono"}
                  id={"result"}
                  rows={4}
                  value={result}
                  readOnly
                  withCopy
                />

                {download && mode === "decode" && (
                  <div>
                    <p>
                      Detected data type: <span className={"font-bold"}>{download}</span>
                    </p>
                    <Button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.download = `base64.${download.split("/")[1]}`;
                        link.href = result;
                        link.click();
                        link.remove();
                      }}
                    >
                      Download {download}
                    </Button>
                  </div>
                )}
              </div>
            </output>
          </CardBody>
        </Card>
      )}
    </Main>
  );
}
