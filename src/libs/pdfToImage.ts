import libraryFile from "./libraryFile";

interface IPluginSrc {
  /** .mjs结尾的主文件 */
  index: string,
  /** .mjs结尾的worker文件 */
  worker: string
}

async function loadPdfPlugin (address: IPluginSrc) {
  return new Promise(function (resolve) {
    libraryFile({
      type: 'js',
      module: 'pdfjsLib',
      attribute: {
        type: 'module'
      },
      url: address.index,
      interceptor: function (ret) {
        ret.GlobalWorkerOptions.workerSrc = address.worker;
      }
    }, resolve)
  })
}

export default async function pdfToImage (url: string, canvas: HTMLCanvasElement, src: IPluginSrc) {
  const pdfjsLib: any = await loadPdfPlugin(src)
  return new Promise(function (resolve) {
    pdfjsLib.getDocument(url).promise.then(function(pdf: any) {
      console.log("pdf", pdf)
      pdf.getPage(1).then(function(page: any) {
        var scale = 1;
        var viewport = page.getViewport({scale: scale});
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;  
        
        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          resolve({
            width: viewport.width,
            height: viewport.height
          })
        });
      });
  
    }, function (reason: any) {
      console.error(reason);
      resolve({
        width: 0,
        height: 0
      })
    });
  })
}