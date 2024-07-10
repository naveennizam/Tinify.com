/* eslint-disable */

import { useState, useEffect } from "react";

function App() {
  let [result, setResult] = useState([]);

  const changeHandler = (e) => {
    let images = [];
    let filed = [];
    console.log("e.target.files.length", e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      filed.push(e.target.files[i]);
      images.push(URL.createObjectURL(e.target.files[i]));
    }
    setResult({
      filed,
      images,
    });
  };

  const handleSubmission = async (event) => {
    event.preventDefault();
    console.log("result.filed.length", result.filed.length);

    var formData = new FormData();

    for (var i = 0; i < result.filed.length; i++) {
      formData.append("file", result.filed[i]);
    }

    var request = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
      },
      body: formData,
    };

    const res = await fetch(
      `${process.env.REACT_APP_APP_URL}/profile`,
      request
    );

    const uploadedImage = await res.json();

    if (uploadedImage) {
      alert(uploadedImage.response);
      document.getElementById("formFileLg").value = "";
      setResult([]);
    } else {
      alert("Something Wrong");
    }
  };

  useEffect(() => {
    let data = async () => {
      (function (t, e, n, r) {
        function a() {
          return e && e.now ? e.now() : null;
        }
        if (!n.version) {
          n._events = [];
          n._errors = [];
          n._metadata = {};
          n._urlGroup = null;
          window.RM = n;
          n.install = function (e) {
            n._options = e;
            var a = t.createElement("script");
            a.async = true;
            a.crossOrigin = "anonymous";
            a.src = r;
            var o = t.getElementsByTagName("script")[0];
            o.parentNode.insertBefore(a, o);
          };
          n.identify = function (t, e) {
            n._userId = t;
            n._identifyOptions = e;
          };
          n.sendEvent = function (t, e) {
            n._events.push({ eventName: t, metadata: e, time: a() });
          };
          n.setUrlGroup = function (t) {
            n._urlGroup = t;
          };
          n.track = function (t, e) {
            n._errors.push({ error: t, metadata: e, time: a() });
          };
          n.addMetadata = function (t) {
            n._metadata = Object.assign(n._metadata, t);
          };
        }
      })(
        document,
        window.performance,
        window.RM || {},
        "https://cdn.requestmetrics.com/agent/current/rm.js"
      );
      RM.install({
        token: "t9ac5ua:y2hw6hb",
      });
    };

    data();
  }, [result]);
  return (
    <>
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6 my-5">
          <form
            action="/profile"
            encType="multipart/form-data"
            method="post"
            onSubmit={handleSubmission}
          >
            <label htmlFor="formFileLg" className="form-label">
              <h2>Compress the images through TINIFY</h2>
              <p>Smart WebP, PNG and JPEG Compression for Faster Websites</p>
            </label>
            <input
              className="form-control form-control mt-5"
              style={{ width: 500 }}
              id="formFileLg"
              multiple
              type="file"
              onChange={changeHandler}
            />

            <button
              type="submit"
              className="btn btn-outline-primary  mx-5 col-6 my-5 "
              disabled={result.length == []}
            >
              Download
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
/* eslint-disable */
