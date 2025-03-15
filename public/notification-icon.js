// Android notification icon helper
function getNotificationIconPath() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isAndroid = userAgent.indexOf('android') > -1;
  
  if (isAndroid) {
    return '/only_these/android/android-launchericon-96-96.png';
  }
  
  return null;
}

window.getNotificationIconPath = getNotificationIconPath;
