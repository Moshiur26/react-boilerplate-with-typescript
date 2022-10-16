import { Console } from "console";
import moment from "moment";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setSeletedPage } from "@/store/global/globalReducer";

export const capitalize = (str: string = "") => {
  const lower = str?.toLocaleLowerCase();
  return str?.charAt(0).toUpperCase() + lower?.slice(1);
};

export const titleCase = (str: string) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const getFormattedDate = (date?: Date, format?: string) => {
  return date ? moment(date).utcOffset("+0600")?.format(format) : "";
};

export const commaRemover = (value: string) => {
  return value.replace(/\,/g, "");
};

export const getDate = (date: string) => {
  return moment(date).utcOffset("+0600");
};

export const refreshPage = (url: string, callback: any) => {
  setTimeout(() => {
    callback();
    window.location.replace(url);
  }, 1000);
};

export const humanize = (str: string) => {
  let humanizedStr = "";
  if (str) {
    humanizedStr = str
      .replace(/^[\s_]+|[\s_]+$/g, "")
      .replace(/[_\s]+/g, " ")
      .replace(/^[a-z]/, function (m) {
        return m.toUpperCase();
      });
  }
  return humanizedStr;
};

export const objectToFormData = (obj: any) => {
  let formData = new FormData();
  Object.keys(obj).forEach((key) => formData.append(key, obj[key]));
  return formData;
};

export const setHeaderTitle = (title: string) => {
  const dispatch = useAppDispatch();
  localStorage.setItem("seletedPage", title);
  useEffect(() => {
    dispatch(setSeletedPage(title));
  }, [title]);
};

export const getAllCookies = () => {
  const authToken = Cookies.get("token") || "";
  return { authToken };
};

export const avatarFormatter = (name: string = "AD") => {
  let formattedStr = "";
  const strArr = name.split(" ");
  if (strArr.length === 1) {
    formattedStr = strArr[0].slice(0, 2).toUpperCase();
  } else if (strArr.length > 1) {
    formattedStr =
      strArr[0].slice(0, 1).toUpperCase() + strArr[1].slice(0, 1).toUpperCase();
  } else {
    formattedStr = "AD";
  }
  return formattedStr;
};

export const getRole = (role: number) => {
  switch (role) {
    case 0:
      return "Member";
    case 1:
      return "Admin";
    case 2:
      return "Super Admin";
    case 3:
      return "Manager";
    default:
      return "";
  }
};

export const urlMatcher = () => {
  return /((http|https)?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
};

export const getImageDimensions = async (file: File, cb: any) =>{
// export const getImageDimensions = async (file: File) =>{
  let img = new Image()
  img.src = window.URL.createObjectURL(file)
  img.onload = async () => {
    cb({width: img.width, height: img.height})
    // await return {width: img.width, height: img.height}
  }
}

export const imageWidthAndHeight = (file: any) => {
  const imgDimensions = { width: 0, height: 0 };

  return new Promise(resolve => {
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onload = function () {
          const img = new Image();
          img.src = window.URL.createObjectURL(file)

          img.onload = function () {
              imgDimensions.width = img.width;
              imgDimensions.height = img.height;

              resolve(imgDimensions);
          }
      };
  });
}

export const generateExternalLink = (url: string) => {
  if (url.includes("http") || url.includes("https")) {
    return url;
  } else {
    return `http://${url}`;
  }
}

export const validUrlRegEx = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

