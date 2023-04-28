interface LibraryFileConfig {
    type: 'js' | 'css';
    url: string;
    module: string;
    dependencies?: LibraryFileConfig[];
    with?: LibraryFileConfig[];
    attribute?: Record<string, string>;
}
type SuccessCallback = (...args: any[]) => void;
/**
   * js和css文件加载器
   * @param files - 文件配置
   * @param callback - 加载成功回调
   */
export default function libraryFile(files: LibraryFileConfig | LibraryFileConfig[], callback: SuccessCallback): void;
export {};
