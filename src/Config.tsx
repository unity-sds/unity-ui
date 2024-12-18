const Config = {

   ['general']: {
      version: import.meta.env.VITE_UNITY_UI_VERSION,
      unity_admin_email: import.meta.env.VITE_ADMIN_EMAIL,
      www_domain: import.meta.env.VITE_WWW_DOMAIN,
      base_path: import.meta.env.VITE_BASE_PATH,
      project: import.meta.env.VITE_PROJECT,
      venue: import.meta.env.VITE_VENUE
   },
   
   ['auth']: {
      //oauth_client_id: import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID,
      oauth_redirect_uri: import.meta.env.VITE_AUTH_OAUTH_REDIRECT_URI,
      oauth_logout_endpoint: import.meta.env.VITE_AUTH_OAUTH_LOGOUT_ENDPOINT,
      oauth_provider_url: import.meta.env.VITE_AUTH_OAUTH_PROVIDER_URL,
      app_admin_group_name: import.meta.env.VITE_AUTH_APP_ADMIN_GROUP_NAME,
      app_viewer_group_name: import.meta.env.VITE_AUTH_APP_APP_VIEWER_GROUP_NAME,
   },

   ['cs']: {
      health_endpoint: import.meta.env.VITE_HEALTH_API_ENDPOINT
   },

   ['ads']: {
      url: import.meta.env.VITE_ADS_URL
   },

   ['sps']: {
      endpoint: import.meta.env.VITE_SPS_WPST_ENDPOINT
   },

}

if( import.meta.env.DEV ) {
  // Output Configuration on every call to help with debugging only in DEV mode
  console.log(Config)
}

export default Config;