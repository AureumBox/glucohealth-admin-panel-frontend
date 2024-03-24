const config: TemplateConfig = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: "/",
  defaultPath: "/dashboard",
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
};

export interface TemplateConfig {
  basename: string;
  defaultPath: string;
  fontFamily: string;
  borderRadius: number;
}

export default config;
