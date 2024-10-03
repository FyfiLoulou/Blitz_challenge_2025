import { FC, PropsWithChildren, ReactNode } from 'react';
import type { Tick } from './types';
interface BlitzViewerProps {
    game?: string | Tick[];
    children?: ReactNode;
}
export declare const BlitzViewer: FC<BlitzViewerProps> & {
    DownloadGameLogs: typeof DownloadGameLogs;
    DownloadBotLogs: typeof DownloadBotLogs;
    MapName: typeof MapName;
};
declare const DownloadGameLogs: FC<PropsWithChildren>;
declare const DownloadBotLogs: FC<PropsWithChildren>;
declare const MapName: FC<PropsWithChildren>;
export {};
