export const formatToDateTime = (timeString) => {
  const splitedTimeArray = timeString.split("T");
  return `${splitedTimeArray[0]} ${splitedTimeArray[1].slice(0, 5)}`;
};

export const formatToTimeAgo = (string) => {
  const timeCreated = Date.parse(string);

  var diff = Math.floor((Date.now() - timeCreated) / 1000);
  var interval = Math.floor(diff / 31536000);

  if (interval >= 1) {
    return interval + " year ago";
  }

  interval = Math.floor(diff / 2592000);
  if (interval >= 1) {
    return interval + " month ago";
  }
  interval = Math.floor(diff / 604800);
  if (interval >= 1) {
    return interval + " week ago";
  }
  interval = Math.floor(diff / 86400);
  if (interval >= 1) {
    return interval + " day ago";
  }
  interval = Math.floor(diff / 3600);
  if (interval >= 1) {
    return interval + " hour ago";
  }
  interval = Math.floor(diff / 60);
  if (interval >= 1) {
    return interval + " min ago";
  }
  return "just now";
};
