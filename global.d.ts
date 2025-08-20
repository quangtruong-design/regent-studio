declare module 'react-pdf' {
  import * as React from 'react';
  export const pdfjs: any;
  export interface DocumentProps {
    file: string | Uint8Array | URL | { url: string };
    onLoadSuccess?: (info: { numPages: number }) => void;
    children?: React.ReactNode;
  }
  export interface PageProps {
    pageNumber: number;
    width?: number;
    renderTextLayer?: boolean;
    renderAnnotationLayer?: boolean;
  }
  export const Document: React.FC<DocumentProps>;
  export const Page: React.FC<PageProps>;
}




