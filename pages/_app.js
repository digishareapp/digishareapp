import "../styles/globals.css";
import "./index.css";
import "./globals.css";
//INTERNAL IMPORT
import { CONTEXT_Provider } from "../context/context";
import toast, { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CONTEXT_Provider>
        <Component {...pageProps} />
      </CONTEXT_Provider>
      <Toaster />

      <script src="assets/js/backend-bundle.min.js"></script>
      <script src="assets/js/customizer.js"></script>
      <script src="assets/js/chart-custom.js"></script>
      <script src="assets/vendor/doc-viewer/include/pdf/pdf.js"></script>
      <script src="assets/vendor/doc-viewer/include/docx/jszip-utils.js"></script>
      <script src="assets/vendor/doc-viewer/include/docx/mammoth.browser.min.js"></script>
      <script src="assets/vendor/doc-viewer/include/PPTXjs/js/filereader.js"></script>
      <script src="assets/vendor/doc-viewer/include/PPTXjs/js/d3.min.js"></script>
      <script src="assets/vendor/doc-viewer/include/PPTXjs/js/nv.d3.min.js"></script>
      <script src="assets/vendor/doc-viewer/include/PPTXjs/js/pptxjs.js"></script>
      <script src="assets/vendor/doc-viewer/include/PPTXjs/js/divs2slides.js"></script>
      <script src="assets/vendor/doc-viewer/include/SheetJS/handsontable.full.min.js"></script>
      <script src="assets/vendor/doc-viewer/include/SheetJS/xlsx.full.min.js"></script>
      <script src="assets/vendor/doc-viewer/include/verySimpleImageViewer/js/jquery.verySimpleImageViewer.js"></script>
      <script src="assets/vendor/doc-viewer/include/officeToHtml/officeToHtml.js"></script>
      <script src="assets/js/app.js"></script>
      <script src="assets/js/doc-viewer.js"></script>
    </>
  );
}
