import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    thumbsContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 16,
    },
    thumb: {
      display: "inline-flex",
      borderRadius: 2,
      border: "1px solid #eaeaea",
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: "border-box",
    },

    thumbInner: {
      display: "flex",
      minWidth: 0,
      overflow: "hidden",
    },
    img: {
      display: "block",
      width: "auto",
      height: "100%",
    },
  })
);

function Previews(props: any) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [parsedImages, setparsedImages] = useState([]);
  //  console.log(props);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) => {
          getBase64(file);
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
      console.log("parsedImages1");
      console.log(parsedImages);
      props.newImages(parsedImages);
    },
  });

  function getBase64(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const image = reader.result;
      const newparsedImages: any = [image, ...parsedImages];
      if (parsedImages.length > 5) {
        newparsedImages.pop();
      }
      setparsedImages(newparsedImages);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const thumbs = files.map((file: any) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img src={file.preview} className={classes.img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
      console.log("parsedImages2");
      console.log(parsedImages);
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className={classes.thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default Previews;
