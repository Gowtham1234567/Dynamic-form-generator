declare module 'jsonlint' {
    const jsonlint: {
      parse(jsonString: string): any;
      validate(jsonString: string): string[];
    };
  
    export default jsonlint;
  }