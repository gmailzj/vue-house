var ImageTool = {
  /*
       * @param rawImageArray{ArrayBuffer|Array|Blob}
       */
  getSegments: function(rawImage, callback) {
    if (rawImage instanceof Blob) {
      var that = this;
      var fileReader = new FileReader();
      fileReader.onload = function() {
        that.getSegments(fileReader.result, callback);
      };
      fileReader.readAsArrayBuffer(rawImage);
    } else {
      if (!rawImage.length && !rawImage.byteLength) {
        return [];
      }
      var head = 0,
        segments = [];
      var length, endPoint, seg;
      var arr = [].slice.call(new Uint8Array(rawImage), 0);

      while (1) {
        if (arr[head] === 0xff && arr[head + 1] === 0xda) {
          // Start of Scan 0xff 0xda  SOS
          break;
        }

        if (arr[head] === 0xff && arr[head + 1] === 0xd8) {
          // Start of Image 0xff 0xd8  SOI
          head += 2;
        } else {
          // 找到每个marker
          length = arr[head + 2] * 256 + arr[head + 3]; // 每个marker 后 的两个字节为 该marker信息的长度
          endPoint = head + length + 2;
          seg = arr.slice(head, endPoint); // 截取信息
          head = endPoint;
          segments.push(seg); // 将每个marker + 信息 push 进去。
        }
        if (head > arr.length) {
          break;
        }
      }
      callback(segments);
    }
  },
  /*
       * @param resizedImg{ArrayBuffer|Blob}
       * @param exifArr{Array|Uint8Array}
       */
  insertEXIF: function(resizedImg, exifArr, callback) {
    if (resizedImg instanceof Blob) {
      var that = this;
      var fileReader = new FileReader();
      fileReader.onload = function() {
        that.insertEXIF(fileReader.result, exifArr, callback);
      };
      fileReader.readAsArrayBuffer(resizedImg);
    } else {
      var arr = [].slice.call(new Uint8Array(resizedImg), 0);
      if (arr[2] !== 0xff || arr[3] !== 0xe0) {
        // throw new Error("Couldn't find APP0 marker from resized image data.");
        return resizedImg; // 不是标准的JPEG文件
      }

      var app0_length = arr[4] * 256 + arr[5]; // 两个字节

      var newImage = [0xff, 0xd8].concat(exifArr, arr.slice(4 + app0_length)); // 合并文件 SOI + EXIF + 去除APP0的图像信息

      callback(new Uint8Array(newImage));
    }
  },
  /*
       * @param segments{Array|Uint8Array}
       */
  getEXIF: function(segments) {
    if (!segments.length) {
      return [];
    }
    var seg = [];
    for (var x = 0; x < segments.length; x++) {
      var s = segments[x];
      // TODO segments
      if (s[0] === 0xff && s[1] === 0xe1) {
        // app1 exif 0xff 0xe1
        seg = seg.concat(s);
      }
    }
    return seg;
  },
  /*
       *@param base64{String}
       */
  decode64: function(base64) {
    var b64 = "data:image/jpeg;base64,";
    if (base64.slice(0, 23) !== b64) {
      return [];
    }
    var binStr = window.atob(base64.replace(b64, ""));
    var buf = new Uint8Array(binStr.length);
    for (var i = 0, len = binStr.length; i < len; i++) {
      buf[i] = binStr.charCodeAt(i);
    }
    return buf;
  },
  /*
       *@param arr{Array}
       */
  encode64: function(arr) {
    var data = "";
    for (var i = 0, len = arr.length; i < len; i++) {
      data += String.fromCharCode(arr[i]);
    }
    return "data:image/jpeg;base64," + window.btoa(data);
  }
};
const methods = {};

/* 通过一个图片的url加载所需要的图片对象
   * url参数传入图片的url
   * fn为回调方法包含，一个Image对象的参数
   */
methods.urltoImage = function(url, fn) {
  var img = new Image();
  img.src = url;
  img.onload = function() {
    fn(img);
  };
};

/* 将一个Image对象转变为一个Canvas类型对象
   * image参数传入一个Image对象
   */
methods.imagetoCanvas = function(image, width) {
  var cvs = document.createElement("canvas");
  var ctx = cvs.getContext("2d");
  // cvs.width = image.width;
  // cvs.height = image.height;
  var widthSet = 1280;
  var sizeCalced = scaleSize(image.width, image.height, widthSet);
  cvs.width = sizeCalced.widthTo;
  cvs.height = sizeCalced.heightTo;
  ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
  return cvs;
};

function scaleSize(widthCurr, heightCurr, widthSet) {
  var widthTo, heightTo;
  if (widthCurr <= widthSet) {
    widthTo = widthCurr;
    heightTo = heightCurr;
  } else {
    widthTo = widthSet;
    heightTo = widthSet * heightCurr / widthCurr;
  }

  return { widthTo: widthTo, heightTo: heightTo };
}

/* 将一个Canvas对象压缩转变为一个Blob类型对象
   * canvas参数传入一个Canvas对象
   * quality参数传入一个0-1的number类型，表示图片压缩质量
   * fn为回调方法，包含一个Blob对象的参数
   */
methods.canvasResizetoFile = function(canvas, quality, fn) {
  canvas.toBlob(
    function(blob) {
      fn(blob);
    },
    "image/jpeg",
    quality
  );
};

/* 将一个Canvas对象压缩转变为一个dataURL字符串
   * canvas参数传入一个Canvas对象
   * quality参数传入一个0-1的number类型，表示图片压缩质量
   */
methods.canvasResizetoDataURL = function(canvas, quality) {
  return canvas.toDataURL("image/jpeg", quality);
};

/* 将File（Blob）类型文件转变为dataURL字符串
   * file参数传入一个File（Blob）类型文件
   * fn为回调方法，包含一个dataURL字符串的参数
   */
methods.filetoDataURL = function(file, fn) {
  var reader = new FileReader();
  reader.onloadend = function(e) {
    fn(e.target.result);
  };
  reader.readAsDataURL(file);
};

/* 将一串dataURL字符串转变为Image类型文件
   * dataurl参数传入一个dataURL字符串
   * fn为回调方法，包含一个Image类型文件的参数
   */
methods.dataURLtoImage = function(dataurl, fn) {
  var img = new Image();
  img.onload = function() {
    fn(img);
  };
  img.src = dataurl;
};

/* 将一串dataURL字符串转变为Blob类型对象
   * dataurl参数传入一个dataURL字符串
   */
methods.dataURLtoFile = function(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

/** *以下是进一步封装** */

/* 将File（Blob）类型文件压缩后再返回Blob类型对象
   * file参数传入一个File（Blob）类型文件
   * quality参数传入一个0-1的number类型，表示图片压缩质量
   * fn为回调方法，包含一个Blob类型文件的参数
   * 使用示例：
   * var file = document.getElementById('demo').files[0];
   * fileResizetoFile(file,0.6,function(res){
   *     console.log(res);
   *     //做出你要上传的操作;
   * })
   */
methods.fileResizetoFile2 = function(file, quality, fn, width) {
  methods.filetoDataURL(file, function(dataurl) {
    methods.dataURLtoImage(dataurl, function(image) {
      methods.canvasResizetoFile(
        methods.imagetoCanvas(image, width),
        quality,
        fn
      );
    });
  });
};

methods.fileResizetoBase64 = function(file, quality, fn, width) {
  methods.filetoDataURL(file, function(dataurl) {
    methods.dataURLtoImage(dataurl, function(image) {
      var base64 = methods.canvasResizetoDataURL(
        methods.imagetoCanvas(image, width),
        quality
      );
      fn(base64);
    });
  });
};

methods.fileResizetoFile = function(file, quality, fn, width) {
  methods.filetoDataURL(file, function(dataurl) {
    methods.dataURLtoImage(dataurl, function(image) {
      ImageTool.getSegments(file, function(segments) {
        var exif = ImageTool.getEXIF(segments); // 获取exif信息
        console.log(exif);
        methods.canvasResizetoFile(
          methods.imagetoCanvas(image, width),
          quality,
          function(blob) {
            ImageTool.insertEXIF(blob, exif, function(newImage) {
              var blobIn = new Blob([newImage], {
                type: "image/jpeg"
              });
              fn(blobIn);
              // fn.apply(null, newImage);
            });
          }
        );
      });
    });
  });
};

export default methods;
// imageResizeTool
