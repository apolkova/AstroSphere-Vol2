import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AstroSphere',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, 
      backgroundColor: "#000000", 
      androidScaleType: "CENTER_CROP",
      showSpinner: false
    }
  }
};

export default config;
